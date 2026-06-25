"use client";
import { useEditor } from "./EditorContext";
import { Smile, Tag, Paperclip, Star, Save } from "lucide-react";
import MoodPopover from "./MoodPopover";
import TagPopover from "./TagPopover";
import AttachmentPopover from "./AttachmentPopover";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function EditorToolbar() {
  const { pinned, setPinned, saveEntry } = useEditor();
  const [moodOpen, setMoodOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [attachmentOpen, setAttachmentOpen] = useState(false);

  // Close others when one opens
  const toggleMood = () => { setMoodOpen(!moodOpen); setTagOpen(false); setAttachmentOpen(false); };
  const toggleTag = () => { setTagOpen(!tagOpen); setMoodOpen(false); setAttachmentOpen(false); };
  const toggleAttachment = () => { setAttachmentOpen(!attachmentOpen); setMoodOpen(false); setTagOpen(false); };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-full)", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", backdropFilter: "var(--glass-blur)", boxShadow: "var(--shadow-lg)" }}>
      
      {/* Group 1: Mood & Tags */}
      <div style={{ display: "flex", gap: "0.25rem" }}>
        <div style={{ position: "relative" }}>
          <button onClick={toggleMood} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: moodOpen ? "var(--accent)" : "var(--theme-text-secondary)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-full)", transition: "all var(--transition-fast)", fontSize: "0.875rem", fontWeight: 500 }} className="hover-bg-accent">
            <Smile size={16} /> <span className="hidden-sm">Mood</span>
          </button>
          <AnimatePresence>{moodOpen && <MoodPopover onClose={() => setMoodOpen(false)} />}</AnimatePresence>
        </div>

        <div style={{ position: "relative" }}>
          <button onClick={toggleTag} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: tagOpen ? "var(--accent)" : "var(--theme-text-secondary)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-full)", transition: "all var(--transition-fast)", fontSize: "0.875rem", fontWeight: 500 }} className="hover-bg-accent">
            <Tag size={16} /> <span className="hidden-sm">Tags</span>
          </button>
          <AnimatePresence>{tagOpen && <TagPopover onClose={() => setTagOpen(false)} />}</AnimatePresence>
        </div>
      </div>
      
      <div style={{ width: "1px", height: "16px", backgroundColor: "var(--theme-border)", margin: "0 0.5rem" }} />

      {/* Group 2: Attachments */}
      <div style={{ position: "relative" }}>
        <button onClick={toggleAttachment} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: attachmentOpen ? "var(--accent)" : "var(--theme-text-secondary)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-full)", transition: "all var(--transition-fast)", fontSize: "0.875rem", fontWeight: 500 }} className="hover-bg-accent">
          <Paperclip size={16} /> <span className="hidden-sm">Attach</span>
        </button>
        <AnimatePresence>{attachmentOpen && <AttachmentPopover onClose={() => setAttachmentOpen(false)} />}</AnimatePresence>
      </div>

      <div style={{ width: "1px", height: "16px", backgroundColor: "var(--theme-border)", margin: "0 0.5rem" }} />

      {/* Group 3: Favorite & Save */}
      <div style={{ display: "flex", gap: "0.25rem" }}>
        <button onClick={() => setPinned(!pinned)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: pinned ? "var(--accent)" : "var(--theme-text-secondary)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-full)", transition: "all var(--transition-fast)", fontSize: "0.875rem", fontWeight: 500 }} className="hover-bg-accent">
          <Star size={16} fill={pinned ? "currentColor" : "none"} /> <span className="hidden-sm">Favorite</span>
        </button>

        <button onClick={saveEntry} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--theme-text-secondary)", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-full)", transition: "all var(--transition-fast)", fontSize: "0.875rem", fontWeight: 500 }} className="hover-bg-accent">
          <Save size={16} /> <span className="hidden-sm">Save</span>
        </button>
      </div>

    </div>
  );
}
