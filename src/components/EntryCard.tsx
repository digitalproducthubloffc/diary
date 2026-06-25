"use client";

import Link from "next/link";
import { Pin, Trash2, Heart } from "lucide-react";
import { deleteEntryAction, toggleFavoriteAction } from "@/actions/entry.actions";
import { useTransition, useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface EntryCardProps {
  entry: any; // Mongoose Entry Document
  onTagClick?: (tag: string) => void;
}

export default function EntryCard({ entry, onTagClick }: EntryCardProps) {
  const { title, slug, createdAt, tags, mood, readingTime, wordCount, pinned, favorite, content } = entry;
  const [isPending, startTransition] = useTransition();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const executeDelete = () => {
    setIsDeleteModalOpen(false);
    startTransition(() => {
      deleteEntryAction(slug, false); // Soft delete
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      toggleFavoriteAction(slug);
    });
  };

  // Convert Mood string (e.g. "🙂 Normal" or "Normal") to a beautiful pill
  const getMoodPill = (moodString: string) => {
    if (!moodString) return null;
    const cleanMood = moodString.replace(/[^a-zA-Z]/g, '').trim().toLowerCase();
    let color = "var(--theme-text-secondary)";
    let bg = "var(--theme-bg)";
    let dot = "gray";

    if (["calm", "peaceful", "relaxed"].includes(cleanMood)) { color = "#10b981"; bg = "rgba(16,185,129,0.1)"; dot = "#10b981"; }
    else if (["happy", "great", "joyful", "excited"].includes(cleanMood)) { color = "#10b981"; bg = "rgba(16,185,129,0.1)"; dot = "#10b981"; }
    else if (["sad", "difficult", "angry", "stressed"].includes(cleanMood)) { color = "#ef4444"; bg = "rgba(239,68,68,0.1)"; dot = "#ef4444"; }
    else if (["motivated", "focused", "productive"].includes(cleanMood)) { color = "#f97316"; bg = "rgba(249,115,22,0.1)"; dot = "#f97316"; }
    else if (["reflective", "thoughtful", "curious"].includes(cleanMood)) { color = "#8b5cf6"; bg = "rgba(139,92,246,0.1)"; dot = "#8b5cf6"; }

    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.2rem 0.6rem", borderRadius: "99px", backgroundColor: bg, color: color, fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize", letterSpacing: "0.02em" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: dot }} />
        {cleanMood || "Normal"}
      </span>
    );
  };

  return (
    <Link href={`/entry/${slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div 
        className="hover-lift" 
        style={{ 
          display: "flex", flexDirection: "column", gap: "1rem", position: "relative", height: "100%", padding: "var(--spacing-card)", 
          borderRadius: "var(--radius-xl)", backgroundColor: "var(--theme-card)", 
          border: "1px solid var(--theme-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" 
        }}
      >
        {/* Layered Backgrounds */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100px", background: "linear-gradient(180deg, rgba(var(--accent-rgb), 0.05) 0%, transparent 100%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.02, backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')", zIndex: 0 }} />

        {/* Content Wrapper */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
          
          {/* Header Row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {pinned && <Pin size={14} fill="var(--accent)" color="var(--accent)" />}
              {mood && getMoodPill(mood)}
              <button suppressHydrationWarning onClick={handleFavorite} disabled={isPending} style={{ color: favorite ? "var(--accent)" : "var(--theme-text-secondary)", background: "none", border: "none", cursor: "pointer", transition: "color var(--transition-fast)" }} className="hover-bounce">
                <Heart size={16} fill={favorite ? "currentColor" : "none"} />
              </button>
              <button suppressHydrationWarning onClick={handleDeleteClick} disabled={isPending} style={{ color: "var(--theme-text-secondary)", background: "none", border: "none", cursor: "pointer", transition: "color var(--transition-fast)" }} className="hover-bounce hover-opacity">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Title & Preview */}
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--theme-text-primary)", marginBottom: "0.75rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {title || "Untitled"}
            </h2>
            <p style={{ color: "var(--theme-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "1.5rem", fontFamily: "var(--font-newsreader)" }}>
              {content || "No content yet..."}
            </p>
          </div>
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)", backgroundColor: "var(--theme-bg)", padding: "0.2rem 0.6rem", borderRadius: "6px", border: "1px solid var(--theme-border)", cursor: "pointer", transition: "all var(--transition-fast)" }}
                  className="hover-bg-accent hover-lift"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onTagClick) onTagClick(tag);
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div style={{ width: "100%", height: "1px", backgroundColor: "var(--theme-border)", marginBottom: "1rem" }} />

          {/* Reading Progress Footer */}
          <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.75rem", fontWeight: 500, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <span>{readingTime || 1} min read</span>
              <span>{wordCount || 0} words</span>
            </div>
            <span>Updated {new Date(createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
          </div>

        </div>
      </div>

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        title="Delete Entry"
        message={`Are you sure you want to delete "${title || "Untitled"}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={executeDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </Link>
  );
}
