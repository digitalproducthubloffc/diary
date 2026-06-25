"use client";
import { EditorProvider, useEditor } from "./EditorContext";
import EditorHeader from "./EditorHeader";
import EditorContent from "./EditorContent";
import EditorToolbar from "./EditorToolbar";
import EditorPreview from "./EditorPreview";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function DraftRecoveryBanner() {
  const { slug, setContent, setTitle, setTags, setMood, setPinned } = useEditor();
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    const draftKey = `v4_draft_${slug}`;
    const draft = localStorage.getItem(draftKey);
    if (draft) setHasDraft(true);
  }, [slug]);

  if (!hasDraft) return null;

  const recover = () => {
    const draftKey = `v4_draft_${slug}`;
    const draft = JSON.parse(localStorage.getItem(draftKey) || '{}');
    if(draft.content) setContent(draft.content);
    if(draft.title) setTitle(draft.title);
    if(draft.tags) setTags(draft.tags);
    if(draft.mood) setMood(draft.mood);
    if(draft.pinned) setPinned(draft.pinned);
    setHasDraft(false);
  };

  const discard = () => {
    localStorage.removeItem(`v4_draft_${slug}`);
    setHasDraft(false);
  };

  return (
    <div style={{ backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", borderLeft: "4px solid var(--accent)", color: "var(--theme-text-primary)", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.875rem", marginTop: "4rem", marginX: "1rem", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)", zIndex: 30, position: "relative" }}>
      <span>An unsaved draft was recovered.</span>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={recover} style={{ fontWeight: "bold", color: "var(--accent)" }} className="hover-opacity">Restore</button>
        <button onClick={discard} style={{ color: "var(--theme-text-secondary)" }} className="hover-opacity">Discard</button>
      </div>
    </div>
  );
}

function EditorLayout() {
  const { isZenMode, viewMode, mood } = useEditor();
  const [isHoveringTop, setIsHoveringTop] = useState(false);
  const [splitRatio, setSplitRatio] = useState(0.5);

  // Dynamic mood accent color mapping
  let accentClass = "";
  if (mood.includes("Great")) accentClass = "accent-emerald";
  else if (mood.includes("Calm")) accentClass = "accent-blue";
  else if (mood.includes("Reflective")) accentClass = "accent-purple";
  else if (mood.includes("Difficult")) accentClass = "accent-orange";

  return (
    <div 
      className={accentClass} 
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--theme-bg)", color: "var(--theme-text-primary)", transition: "background-color var(--transition-slow)", position: "relative", overflow: "hidden" }}
      onMouseMove={(e) => {
        if (isZenMode) setIsHoveringTop(e.clientY < 60);
      }}
    >
      
      {/* Premium 4-Layer Ambient Background */}
      <div style={{ position: "absolute", top: "-10%", left: "10%", right: "10%", height: "40vh", pointerEvents: "none", background: "radial-gradient(ellipse at top, var(--theme-aurora), transparent 70%)", zIndex: 0, filter: "blur(60px)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 50% 40%, var(--theme-spotlight) 0%, transparent 60%)", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(circle at center, transparent 40%, var(--theme-vignette) 150%)`, zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: "var(--theme-noise-opacity)", backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')", zIndex: 0 }} />

      <AnimatePresence>
        {(!isZenMode || isHoveringTop) && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} style={{ zIndex: 40, position: "absolute", top: 0, left: 0, right: 0 }}>
            <EditorHeader />
          </motion.div>
        )}
      </AnimatePresence>

      <DraftRecoveryBanner />

      <div style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative", zIndex: 10, paddingTop: isZenMode ? "2rem" : "4.5rem", width: "100%" }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={viewMode}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="editor-split-container"
            style={{ width: "100%", display: "flex", justifyContent: "center", height: "100%", flexDirection: "row" }}
          >
            {viewMode === "write" || viewMode === "split" ? (
              <div className="editor-pane" style={{ width: viewMode === "write" ? "100%" : `${splitRatio * 100}%`, height: "100%", display: "flex", justifyContent: "center", padding: "0 2rem 2rem 2rem", flexShrink: 0, transition: "width 0.1s linear" }}>
                <EditorContent />
              </div>
            ) : null}

            {viewMode === "split" && (
              <div 
                className="editor-split-divider"
                style={{ width: "12px", cursor: "col-resize", display: "flex", justifyContent: "center", alignItems: "center", margin: "2rem 0", flexShrink: 0, zIndex: 60 }}
                onDoubleClick={() => setSplitRatio(0.5)}
                title="Drag to resize, Double-click to reset"
              >
                <div style={{ width: "2px", height: "100%", backgroundColor: "var(--theme-border)", transition: "background-color var(--transition-fast)" }} className="hover-bg-accent" />
              </div>
            )}

            {viewMode === "preview" || viewMode === "split" ? (
              <div className="editor-pane" style={{ width: viewMode === "preview" ? "100%" : `${(1 - splitRatio) * 100}%`, height: "100%", display: "flex", justifyContent: "center", padding: "0 2rem 2rem 2rem", overflowY: "auto", flexShrink: 0, transition: "width 0.1s linear" }}>
                <EditorPreview />
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!isZenMode && (
          <div className="editor-toolbar-wrapper">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: 0.3 }}>
              <EditorToolbar />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function EditorShell({ initialData, initialViewMode = "write" }: { initialData: any, initialViewMode?: "write" | "preview" | "split" }) {
  return (
    <EditorProvider initialData={initialData} initialViewMode={initialViewMode}>
      <EditorLayout />
    </EditorProvider>
  );
}
