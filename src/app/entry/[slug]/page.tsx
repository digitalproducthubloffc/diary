import { getEntryBySlugAction } from "@/actions/entry.actions";
import EditorShell from "@/components/editor/EditorShell";
import { notFound } from "next/navigation";

export default async function EntryViewer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryBySlugAction(slug);

  if (!entry) {
    notFound();
  }

  const initialData = {
    slug: entry.slug,
    title: entry.title,
    content: entry.content,
    tags: entry.tags || [],
    mood: entry.mood || "😐 Normal",
    pinned: entry.pinned || false
  };

  return <EditorShell initialData={initialData} initialViewMode="preview" />;
}
