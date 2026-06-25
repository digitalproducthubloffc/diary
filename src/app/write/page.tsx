import EditorShell from "@/components/editor/EditorShell";
import { generateSlug } from "@/lib/utils";

export default async function WritePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const editSlug = resolvedParams.edit;
  
  // If editing an existing entry from dashboard (fallback)
  if (editSlug) {
    // Actually, editing is handled by /entry/[slug] now.
    // We can redirect or just render it. But for new entries:
  }

  const initialData = {
    slug: generateSlug(new Date().toISOString().split('T')[0]),
    title: "",
    content: "",
    tags: [] as string[],
    mood: "😐 Normal",
    pinned: false,
  };

  return <EditorShell initialData={initialData} />;
}
