"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveEntryAction } from "@/actions/entry.actions";
import { Pin } from "lucide-react";

interface EditorProps {
  initialSlug: string;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  initialMood?: string;
  initialPinned?: boolean;
}

export default function Editor({ 
  initialSlug, 
  initialTitle = "", 
  initialContent = "", 
  initialTags = [], 
  initialMood = "😐 Normal", 
  initialPinned = false 
}: EditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [slug, setSlug] = useState(initialSlug);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tagsInput, setTagsInput] = useState(initialTags.join(", "));
  const [mood, setMood] = useState(initialMood);
  const [pinned, setPinned] = useState(initialPinned);

  const cleanContent = content.replace(/[#*`~>]/g, '').trim();
  const wordCount = cleanContent.length > 0 ? cleanContent.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  // Auto-save to LocalStorage
  useEffect(() => {
    const draftKey = `v2_draft_${slug}`;
    const timeoutId = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify({ title, content, tags: tagsInput, mood, pinned }));
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [slug, title, content, tagsInput, mood, pinned]);

  const handleSave = () => {
    startTransition(async () => {
      try {
        const tagsArray = tagsInput.split(",").map(t => t.trim()).filter(t => t.length > 0);
        
        const res = await saveEntryAction({
          slug,
          title,
          content,
          tags: tagsArray,
          mood,
          pinned
        });

        if (res?.success) {
          localStorage.removeItem(`v2_draft_${slug}`);
          router.push(`/entry/${res.slug}`);
        } else {
          alert("Failed to save entry");
        }
      } catch (error) {
        console.error("Save error", error);
        alert("Failed to save entry");
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)", gap: "1rem" }}>
      
      {/* Top Bar */}
      <div className="card" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <button 
          onClick={() => setPinned(!pinned)}
          style={{ padding: "0.5rem", borderRadius: "8px", backgroundColor: pinned ? "var(--accent)" : "var(--background)", color: pinned ? "white" : "var(--text-secondary)", border: "1px solid var(--card-border)", display: "flex", alignItems: "center", justifyContent: "center" }}
          title={pinned ? "Unpin Entry" : "Pin Entry"}
        >
          <Pin size={20} fill={pinned ? "currentColor" : "none"} />
        </button>

        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          placeholder="Entry Title"
          style={{ flex: 1, minWidth: "200px", fontSize: "1.25rem", fontWeight: "bold", border: "none", backgroundColor: "transparent", borderBottom: "1px solid var(--card-border)", borderRadius: 0, paddingLeft: 0 }}
        />
        <select 
          value={mood}
          onChange={e => setMood(e.target.value)}
          style={{ padding: "0.75rem", borderRadius: "8px", backgroundColor: "var(--background)", color: "var(--text-primary)", border: "1px solid var(--card-border)" }}
        >
          <option value="😊 Great">😊 Great</option>
          <option value="😐 Normal">😐 Normal</option>
          <option value="😔 Bad">😔 Bad</option>
        </select>
        <input 
          type="text" 
          value={tagsInput} 
          onChange={e => setTagsInput(e.target.value)}
          placeholder="Tags (comma separated)"
          style={{ flex: 1, minWidth: "150px" }}
        />
        <button onClick={handleSave} disabled={isPending} className="btn-primary">
          {isPending ? "Saving..." : "Save Entry"}
        </button>
      </div>

      {/* Split View Editor */}
      <div style={{ display: "flex", flex: 1, gap: "1rem", overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", fontWeight: "bold", color: "var(--text-secondary)" }}>
            <span>Markdown</span>
            <span style={{ fontSize: "0.875rem", fontWeight: "normal" }}>
              Words: {wordCount} | Reading Time: {readingTime} min
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ flex: 1, resize: "none", fontFamily: "monospace", padding: "1.5rem", lineHeight: "1.6" }}
            placeholder="Start writing your thoughts here..."
          />
        </div>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "var(--card)", borderRadius: "8px", border: "1px solid var(--card-border)" }}>
          <div style={{ padding: "0.5rem", fontWeight: "bold", color: "var(--text-secondary)", borderBottom: "1px solid var(--card-border)" }}>Live Preview</div>
          <div className="prose" style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {content || <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>Preview will appear here...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
