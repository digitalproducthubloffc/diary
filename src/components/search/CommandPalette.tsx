"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, FileText, Calendar, Star, Settings } from "lucide-react";

import { useTheme } from "next-themes";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "10vh" }}
        onClick={() => setOpen(false)}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.95, opacity: 0 }} 
          style={{ width: "100%", maxWidth: "600px", backgroundColor: "var(--theme-card)", borderRadius: "12px", border: "1px solid var(--theme-border)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", overflow: "hidden" }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ display: "flex", alignItems: "center", padding: "1rem", borderBottom: "1px solid var(--theme-border)" }}>
            <Search size={20} color="var(--theme-text-secondary)" />
            <input 
              autoFocus 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              placeholder="Search entries or type 'Theme'..." 
              style={{ flex: 1, backgroundColor: "transparent", border: "none", outline: "none", color: "var(--theme-text-primary)", fontSize: "1rem", paddingLeft: "1rem" }} 
            />
            <span style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)", backgroundColor: "var(--theme-bg)", padding: "0.25rem 0.5rem", borderRadius: "4px" }}>ESC</span>
          </div>

          <div style={{ padding: "0.5rem", maxHeight: "400px", overflowY: "auto" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)", padding: "0.5rem", fontWeight: 600 }}>Navigation</div>
            
            <button onClick={() => { router.push("/write"); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", padding: "0.75rem", borderRadius: "8px", color: "var(--theme-text-primary)", transition: "background 0.2s", textAlign: "left" }}>
              <FileText size={18} color="var(--theme-text-secondary)" /> Create New Entry
            </button>
            <button onClick={() => { router.push("/dashboard"); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", padding: "0.75rem", borderRadius: "8px", color: "var(--theme-text-primary)", transition: "background 0.2s", textAlign: "left" }}>
              <Home size={18} color="var(--theme-text-secondary)" /> Dashboard
            </button>
            <button onClick={() => { router.push("/settings"); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", padding: "0.75rem", borderRadius: "8px", color: "var(--theme-text-primary)", transition: "background 0.2s", textAlign: "left" }}>
              <Settings size={18} color="var(--theme-text-secondary)" /> Settings
            </button>

            <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)", padding: "0.5rem", fontWeight: 600, marginTop: "1rem" }}>Themes</div>
            {['midnight', 'paper', 'forest', 'ocean', 'sepia', 'nord'].map(t => (
              <button key={t} onClick={() => { setTheme(t); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%", padding: "0.75rem", borderRadius: "8px", color: "var(--theme-text-primary)", transition: "background 0.2s", textAlign: "left", textTransform: "capitalize" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid var(--theme-border)", backgroundColor: theme === t ? "var(--accent)" : "transparent" }} /> {t}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
