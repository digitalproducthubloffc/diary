"use client";
import { useEditor } from "./EditorContext";
import { motion } from "framer-motion";

const MOODS = [
  { label: "Great", emoji: "😊", color: "#10b981" },
  { label: "Calm", emoji: "😌", color: "#3b82f6" },
  { label: "Reflective", emoji: "🤔", color: "#a855f7" },
  { label: "Motivated", emoji: "🔥", color: "#ef4444" },
  { label: "Difficult", emoji: "😔", color: "#f97316" }
];

export default function MoodPopover({ onClose }: { onClose: () => void }) {
  const { mood, setMood } = useEditor();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "1rem", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", borderRadius: "var(--radius-lg)", padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem", boxShadow: "var(--shadow-xl)", minWidth: "150px" }}
    >
      {MOODS.map(m => {
        const isSelected = mood.includes(m.label);
        return (
          <button 
            key={m.label} 
            onClick={() => { setMood(`${m.emoji} ${m.label}`); onClose(); }}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", backgroundColor: isSelected ? "var(--theme-bg)" : "transparent", color: isSelected ? m.color : "var(--theme-text-primary)", transition: "all var(--transition-fast)", fontWeight: isSelected ? 600 : 400, textAlign: "left" }}
          >
            <span>{m.emoji}</span> {m.label}
          </button>
        );
      })}
    </motion.div>
  );
}
