"use client";
import { motion } from "framer-motion";
import { Image as ImageIcon, Mic, FileText } from "lucide-react";

export default function AttachmentPopover({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: "1rem", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", borderRadius: "var(--radius-lg)", padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem", boxShadow: "var(--shadow-xl)", minWidth: "160px", zIndex: 100 }}
    >
      <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)", padding: "0.25rem 0.5rem", fontWeight: 600 }}>Attachments</div>
      
      <button onClick={() => { alert("Image upload coming soon!"); onClose(); }} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", color: "var(--theme-text-primary)", transition: "background var(--transition-fast)", textAlign: "left" }} className="hover-bg-accent">
        <ImageIcon size={16} color="var(--theme-text-secondary)" /> Image
      </button>
      
      <button onClick={() => { alert("Voice note recording coming soon!"); onClose(); }} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", color: "var(--theme-text-primary)", transition: "background var(--transition-fast)", textAlign: "left" }} className="hover-bg-accent">
        <Mic size={16} color="var(--theme-text-secondary)" /> Voice Note
      </button>

      <button onClick={() => { alert("PDF upload coming soon!"); onClose(); }} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-md)", color: "var(--theme-text-primary)", transition: "background var(--transition-fast)", textAlign: "left" }} className="hover-bg-accent">
        <FileText size={16} color="var(--theme-text-secondary)" /> PDF Document
      </button>
    </motion.div>
  );
}
