"use client";
import { useEditor } from "./EditorContext";
import Link from "next/link";
import { ChevronLeft, Moon } from "lucide-react";
import EditorStatus from "./EditorStatus";
import { motion } from "framer-motion";
import ThemeToggle from "../ThemeToggle";

export default function EditorHeader() {
  const { viewMode, setViewMode, setZenMode } = useEditor();

  const modes = [
    { id: "write", label: "Write" },
    { id: "split", label: "Split" },
    { id: "preview", label: "Preview" }
  ] as const;

  return (
    <header style={{ padding: "0.5rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--theme-border)", backgroundColor: "var(--theme-bg)", position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 500, transition: "color var(--transition-fast)" }} className="hover-bounce">
          <ChevronLeft size={16} /> <span className="desktop-only">Dashboard</span>
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        
        <div className="desktop-only">
          <EditorStatus />
        </div>

        {/* View Mode Sliding Pill */}
        <div style={{ display: "flex", backgroundColor: "var(--theme-card)", borderRadius: "var(--radius-full)", padding: "0.25rem", border: "1px solid var(--theme-border)", position: "relative" }}>
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              style={{
                position: "relative",
                padding: "0.3rem 0.75rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: viewMode === mode.id ? "var(--theme-text-primary)" : "var(--theme-text-secondary)",
                transition: "color var(--transition-fast)",
                border: "none",
                background: "transparent",
                zIndex: 1,
                cursor: "pointer"
              }}
            >
              {viewMode === mode.id && (
                <motion.div
                  layoutId="pill"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "var(--theme-bg)",
                    border: "1px solid var(--theme-border)",
                    borderRadius: "var(--radius-full)",
                    zIndex: -1
                  }}
                />
              )}
              {mode.label}
            </button>
          ))}
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
