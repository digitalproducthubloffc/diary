"use client";
import { useEditor } from "./EditorContext";
import { Share, Printer, Download } from "lucide-react";

export default function EditorPreview() {
  const { title, content } = useEditor();

  const isEmpty = content.trim().length === 0;

  const renderContent = () => {
    if (isEmpty) {
      return (
        <div style={{ color: "var(--theme-text-primary)" }}>
          <p style={{ color: "var(--theme-text-secondary)", fontStyle: "italic", marginBottom: "2rem" }}>No content yet. Start writing to see your formatted journal.</p>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem", fontFamily: "var(--font-inter)", fontWeight: "bold" }}>Heading</h1>
          <p style={{ marginBottom: "1rem" }}>This is how your text will look when rendered. You can use <strong>bold</strong> or <em>italic</em> text.</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li>Bullet list item one</li>
            <li>Bullet list item two</li>
          </ul>
          <blockquote style={{ borderLeft: "4px solid var(--accent)", paddingLeft: "1rem", color: "var(--theme-text-secondary)", fontStyle: "italic", marginBottom: "1rem" }}>
            "Every great story starts with one sentence..."
          </blockquote>
        </div>
      );
    }

    return content.split('\n\n').map((paragraph, i) => (
      <p key={i} style={{ marginBottom: "1rem" }}>{paragraph}</p>
    ));
  };

  return (
    <div style={{ width: "100%", maxWidth: "var(--editor-width)", fontFamily: "var(--font-newsreader)", fontSize: "clamp(18px, 5vw, 20px)", lineHeight: "2.0", letterSpacing: "-0.01em", margin: "0 auto", paddingBottom: "8rem" }}>
      
      {/* Preview Header (Kindle Style) */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", fontFamily: "var(--font-inter)", borderBottom: "1px solid var(--theme-border)", paddingBottom: "1rem", marginTop: "2rem" }}>
        <div style={{ fontSize: "0.875rem", color: "var(--theme-text-secondary)" }}>
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button style={{ color: "var(--theme-text-secondary)", transition: "color var(--transition-fast)" }} className="hover-bounce"><Share size={16} /></button>
          <button style={{ color: "var(--theme-text-secondary)", transition: "color var(--transition-fast)" }} className="hover-bounce"><Printer size={16} /></button>
          <button style={{ color: "var(--theme-text-secondary)", transition: "color var(--transition-fast)" }} className="hover-bounce"><Download size={16} /></button>
        </div>
      </div>

      {/* Document Title */}
      <h1 style={{ fontSize: "clamp(2rem, 8vw, 44px)", lineHeight: 1.2, fontWeight: "bold", fontFamily: "var(--font-inter)", marginBottom: "1rem", color: "var(--theme-text-primary)", letterSpacing: "-0.02em" }}>
        {title || "Untitled"}
      </h1>

      {/* Metadata (Tags & Pinned) */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem", alignItems: "center" }}>
        {useEditor().pinned && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--accent)", backgroundColor: "rgba(16, 185, 129, 0.1)", padding: "0.25rem 0.75rem", borderRadius: "99px", fontSize: "0.875rem", fontWeight: 600 }}>
            ★ Pinned
          </div>
        )}
        {useEditor().tags.map(tag => (
          <span key={tag} className="tag" style={{ fontSize: "0.875rem", padding: "0.25rem 0.75rem" }}>
            #{tag}
          </span>
        ))}
      </div>

      {/* Rendered Content */}
      <div style={{ color: "var(--theme-text-primary)" }}>
        {renderContent()}
      </div>

    </div>
  );
}
