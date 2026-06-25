"use client";
import { useEditor } from "./EditorContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function TagPopover({ onClose }: { onClose: () => void }) {
  const { tags, setTags } = useEditor();
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "1rem", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", borderRadius: "var(--radius-lg)", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem", boxShadow: "var(--shadow-xl)", minWidth: "220px", zIndex: 100 }}
    >
      <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)", fontWeight: 600 }}>Tags</div>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: tags.length > 0 ? "0.5rem" : "0" }}>
        {tags.map(tag => (
          <div key={tag} style={{ display: "flex", alignItems: "center", gap: "0.25rem", backgroundColor: "var(--theme-bg)", color: "var(--theme-text-primary)", padding: "0.25rem 0.5rem", borderRadius: "var(--radius-sm)", fontSize: "0.75rem" }}>
            #{tag}
            <button onClick={() => removeTag(tag)} style={{ color: "var(--theme-text-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={12} /></button>
          </div>
        ))}
      </div>

      <input 
        autoFocus
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        onKeyDown={handleKeyDown}
        placeholder="Add tag and press Enter..." 
        style={{ width: "100%", backgroundColor: "var(--theme-bg)", border: "1px solid var(--theme-border)", borderRadius: "var(--radius-md)", padding: "0.5rem", color: "var(--theme-text-primary)", fontSize: "0.875rem", outline: "none" }}
      />
    </motion.div>
  );
}
