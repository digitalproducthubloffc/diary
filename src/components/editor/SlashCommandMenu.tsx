"use client";
import { motion } from "framer-motion";
import { Heading1, List, Quote, Code, Image, Minus } from "lucide-react";

const COMMANDS = [
  { id: "h1", label: "Heading 1", icon: Heading1, prefix: "# " },
  { id: "h2", label: "Heading 2", icon: Heading1, prefix: "## " },
  { id: "list", label: "Checklist", icon: List, prefix: "- [ ] " },
  { id: "quote", label: "Quote", icon: Quote, prefix: "> " },
  { id: "code", label: "Code Block", icon: Code, prefix: "```\n\n```" },
  { id: "divider", label: "Divider", icon: Minus, prefix: "---\n" },
  { id: "image", label: "Image", icon: Image, prefix: "![alt text](url)" }
];

export default function SlashCommandMenu({ onSelect }: { onSelect: (prefix: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "var(--theme-card)",
        border: "1px solid var(--theme-border)",
        borderRadius: "var(--radius-lg)",
        padding: "0.5rem",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        zIndex: 100,
        width: "240px",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem"
      }}
    >
      <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)", padding: "0.5rem", fontWeight: 600 }}>Basic Blocks</div>
      
      {COMMANDS.map((cmd) => (
        <button
          key={cmd.id}
          onClick={() => onSelect(cmd.prefix)}
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem", borderRadius: "var(--radius-md)", color: "var(--theme-text-primary)", textAlign: "left", transition: "background var(--transition-fast)" }}
          className="hover-bg-accent"
        >
          <cmd.icon size={16} color="var(--theme-text-secondary)" />
          {cmd.label}
        </button>
      ))}
    </motion.div>
  );
}
