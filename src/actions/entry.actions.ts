"use server";

import connectDB from "@/lib/mongodb";
import Entry from "@/models/Entry";
import Backup from "@/models/Backup";
import User from "@/models/User";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

function computeStats(content: string) {
  const cleanContent = content.replace(/[#*`~>]/g, '').trim();
  const wordCount = cleanContent.length > 0 ? cleanContent.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200) || 1;
  return { wordCount, readingTime };
}

async function getUniqueSlug(baseSlug: string, userId: string): Promise<string> {
  let slug = baseSlug;
  let counter = 2;
  while (true) {
    const existing = await Entry.findOne({ slug, userId });
    if (!existing) return slug;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function saveEntryAction(data: { slug: string; title: string; content: string; tags: string[]; mood: string; pinned: boolean }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  
  await connectDB();
  
  const { wordCount, readingTime } = computeStats(data.content);

  let entry = await Entry.findOne({ slug: data.slug, userId: session.user.id });

  if (entry) {
    // Create Backup before updating
    await Backup.create({
      entryId: entry._id,
      userId: session.user.id,
      content: entry.content
    });

    // Keep only last 10 backups per entry
    const backups = await Backup.find({ entryId: entry._id }).sort({ createdAt: -1 });
    if (backups.length > 10) {
      const backupsToDelete = backups.slice(10).map(b => b._id);
      await Backup.deleteMany({ _id: { $in: backupsToDelete } });
    }

    entry.title = data.title;
    entry.content = data.content;
    entry.tags = data.tags;
    entry.mood = data.mood;
    entry.pinned = data.pinned;
    entry.wordCount = wordCount;
    entry.readingTime = readingTime;
    await entry.save();
  } else {
    // It's a new entry, generate unique slug scoped to userId
    const uniqueSlug = await getUniqueSlug(data.slug, session.user.id);
    
    entry = await Entry.create({
      userId: session.user.id,
      slug: uniqueSlug,
      title: data.title,
      content: data.content,
      tags: data.tags,
      mood: data.mood,
      pinned: data.pinned,
      wordCount,
      readingTime
    });
  }

  // Update dynamic streak
  const user = await User.findById(session.user.id);
  if (user) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (user.lastEntryDate) {
      const lastDate = new Date(user.lastEntryDate);
      lastDate.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Increment streak if last entry was exactly yesterday
        user.streak += 1;
      } else if (diffDays > 1) {
        // Reset streak if more than 1 day passed
        user.streak = 1;
      }
      // If diffDays === 0, same day, do nothing to streak
    } else {
      // First entry ever
      user.streak = 1;
    }
    
    user.lastEntryDate = new Date();
    await user.save();
  }

  revalidatePath('/dashboard');
  revalidatePath(`/entry/${entry.slug}`);
  
  return { success: true, slug: entry.slug };
}

export async function toggleFavoriteAction(slug: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await connectDB();
  const entry = await Entry.findOne({ slug, userId: session.user.id });
  if (entry) {
    entry.favorite = !entry.favorite;
    await entry.save();
    revalidatePath('/dashboard');
    revalidatePath(`/entry/${slug}`);
  }
}

export async function deleteEntryAction(slug: string, hardDelete = false) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await connectDB();
  if (hardDelete) {
    await Entry.deleteOne({ slug, userId: session.user.id });
  } else {
    // Backup before soft delete
    const entry = await Entry.findOne({ slug, userId: session.user.id });
    if (entry) {
      await Backup.create({ entryId: entry._id, userId: session.user.id, content: entry.content });
      entry.deleted = true;
      await entry.save();
    }
  }
  revalidatePath('/dashboard');
}

export async function restoreEntryAction(slug: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await connectDB();
  await Entry.updateOne({ slug, userId: session.user.id }, { deleted: false });
  revalidatePath('/dashboard');
}

export async function getEntriesAction(query = "", tagFilter = "") {
  const session = await auth();
  if (!session?.user?.id) return [];
  
  await connectDB();

  let filter: any = { userId: session.user.id, deleted: false };
  
  if (tagFilter) {
    filter.tags = tagFilter;
  }

  if (query) {
    filter.$text = { $search: query };
  }

  const entries = await Entry.find(filter)
    .sort(query ? { score: { $meta: "textScore" } } : { createdAt: -1 })
    .lean();

  const serialized = entries.map((e: any) => ({
    ...e,
    _id: e._id.toString(),
    userId: e.userId.toString(),
    // Strip basic markdown symbols and truncate
    content: e.content ? e.content.replace(/[#*`~>\[\]]/g, '').substring(0, 150) + (e.content.length > 150 ? "..." : "") : ""
  }));

  return JSON.parse(JSON.stringify(serialized));
}

export async function getEntryBySlugAction(slug: string) {
  const session = await auth();
  if (!session?.user?.id) return null;
  
  await connectDB();

  const entry = await Entry.findOne({ slug, userId: session.user.id, deleted: false }).lean();
  return entry ? JSON.parse(JSON.stringify(entry)) : null;
}
