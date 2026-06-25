"use client";
import { createContext, useContext, useState, ReactNode, useEffect, useTransition } from "react";
import { saveEntryAction } from "@/actions/entry.actions";
import { useRouter } from "next/navigation";

export type ViewMode = "write" | "preview" | "split";
export type SaveStatus = "idle" | "saving" | "saved" | "synced";

interface EditorState {
  slug: string;
  title: string;
  setTitle: (t: string) => void;
  content: string;
  setContent: (c: string) => void;
  tags: string[];
  setTags: (t: string[]) => void;
  mood: string;
  setMood: (m: string) => void;
  pinned: boolean;
  setPinned: (p: boolean) => void;
  isZenMode: boolean;
  setZenMode: (z: boolean) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  saveStatus: SaveStatus;
  saveEntry: () => void;
  wordCount: number;
  readingTime: number;
}

const EditorContext = createContext<EditorState | undefined>(undefined);

export function EditorProvider({ children, initialData, initialViewMode = "write" }: { children: ReactNode, initialData: any, initialViewMode?: ViewMode }) {
  const router = useRouter();
  const [slug] = useState(initialData.slug);
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [mood, setMood] = useState(initialData.mood || "😐 Normal");
  const [pinned, setPinned] = useState(initialData.pinned || false);
  const [isZenMode, setZenMode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [isPending, startTransition] = useTransition();

  const cleanContent = content.replace(/[#*`~>]/g, '').trim();
  const wordCount = cleanContent.length > 0 ? cleanContent.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  useEffect(() => {
    const draftKey = `v4_draft_${slug}`;
    const timeoutId = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify({ title, content, tags, mood, pinned }));
      if (content.length > 0 || title.length > 0) {
        setSaveStatus("saved");
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [slug, title, content, tags, mood, pinned]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === '.' || e.key === '>')) {
        setZenMode(prev => !prev);
      }
      if (e.key === 'Escape' && isZenMode) {
        setZenMode(false);
      }
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveEntry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZenMode, title, content, tags, mood, pinned]);

  const saveEntry = () => {
    setSaveStatus("saving");
    startTransition(async () => {
      try {
        const res = await saveEntryAction({ slug, title, content, tags, mood, pinned });
        if (res?.success) {
          localStorage.removeItem(`v4_draft_${slug}`);
          setSaveStatus("synced");
          setTimeout(() => setSaveStatus("idle"), 5000);
          if (res.slug !== slug) {
             router.push(`/entry/${res.slug}`);
          }
        }
      } catch (err) {
        setSaveStatus("idle");
      }
    });
  };

  return (
    <EditorContext.Provider value={{ slug, title, setTitle, content, setContent, tags, setTags, mood, setMood, pinned, setPinned, isZenMode, setZenMode, viewMode, setViewMode, saveStatus, saveEntry, wordCount, readingTime }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}
