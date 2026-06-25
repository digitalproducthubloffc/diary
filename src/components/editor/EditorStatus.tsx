"use client";
import { useEditor } from "./EditorContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function EditorStatus() {
  const { content, saveStatus } = useEditor();
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState(1);
  const [lastMilestone, setLastMilestone] = useState(0);
  const [showSyncTime, setShowSyncTime] = useState(false);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    setReadTime(Math.max(1, Math.ceil(words / 200)));

    if (Math.floor(words / 50) > lastMilestone) {
      setLastMilestone(Math.floor(words / 50));
    }
  }, [content, lastMilestone]);

  useEffect(() => {
    if (saveStatus === "saved" || saveStatus === "synced") {
      setShowSyncTime(false);
      const t = setTimeout(() => setShowSyncTime(true), 3000);
      return () => clearTimeout(t);
    }
  }, [saveStatus]);

  let statusText = "";
  if (saveStatus === "saving") statusText = "⟳ Saving...";
  else if (saveStatus === "saved" && !showSyncTime) statusText = "✓ Saved";
  else if (saveStatus === "saved" && showSyncTime) statusText = "Synced just now";
  else if (saveStatus === "synced") statusText = "✓ Synced";
  else statusText = "● Editing";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", color: "var(--theme-text-secondary)", fontSize: "0.75rem", fontWeight: 500 }}>
      
      {/* Milestone Animated Word Count */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={lastMilestone}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: "flex", gap: "1.5rem" }}
        >
          <span>{wordCount} words</span>
          <span>{readTime} min read</span>
        </motion.div>
      </AnimatePresence>

      <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "var(--theme-border)" }} />

      {/* Save Status */}
      <div style={{ position: "relative", width: "100px", display: "flex", alignItems: "center" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={statusText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            style={{ position: "absolute" }}
          >
            {statusText}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
