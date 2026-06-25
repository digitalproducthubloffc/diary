"use client";

import { useState, useEffect } from "react";
import { getEntriesAction } from "@/actions/entry.actions";
import EntryCard from "@/components/EntryCard";
import { Search as SearchIcon, Grid, List as ListIcon, Clock, PenTool } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface DashboardClientProps {
  initialEntries: any[];
  allTags: string[];
}

export default function DashboardClient({ initialEntries, allTags }: DashboardClientProps) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [entries, setEntries] = useState(initialEntries);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "timeline">("grid");

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await getEntriesAction(query, selectedTag || "");
        setEntries(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, selectedTag]);

  const pinnedEntries = entries.filter(e => e.pinned);
  const regularEntries = entries.filter(e => !e.pinned);

  // Layout Styles based on viewMode
  const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" };
  const listStyle = { display: "flex", flexDirection: "column" as const, gap: "1rem" };
  const timelineStyle = { display: "flex", flexDirection: "column" as const, gap: "2rem", borderLeft: "2px solid var(--theme-border)", paddingLeft: "2rem", marginLeft: "1rem" };

  return (
    <div style={{ position: "relative" }}>
      
      {/* Tool Bar: Search & View Toggles */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        
        {/* Raycast-style Search Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", backgroundColor: "var(--theme-card)", padding: "0.75rem 1.25rem", borderRadius: "var(--radius-xl)", border: "1px solid var(--theme-border)", boxShadow: "var(--shadow-sm)", flex: 1, maxWidth: "500px", transition: "all var(--transition-normal)" }} className="focus-within-glow">
          <SearchIcon size={18} color="var(--theme-text-secondary)" />
          <input 
            type="text" 
            placeholder="Search your memories... ⌘K" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            style={{ border: "none", background: "transparent", color: "var(--theme-text-primary)", fontSize: "1rem", outline: "none", width: "100%", fontWeight: 500 }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ background: "var(--theme-bg)", border: "1px solid var(--theme-border)", borderRadius: "4px", padding: "0.2rem 0.4rem", fontSize: "0.7rem", color: "var(--theme-text-secondary)", cursor: "pointer" }}>
              ESC
            </button>
          )}
        </div>

        {/* View Switches */}
        <div style={{ display: "flex", gap: "0.25rem", backgroundColor: "var(--theme-card)", padding: "0.25rem", borderRadius: "var(--radius-xl)", border: "1px solid var(--theme-border)" }}>
          <button suppressHydrationWarning onClick={() => setViewMode("grid")} style={{ padding: "0.5rem", borderRadius: "var(--radius-md)", color: viewMode === "grid" ? "var(--theme-card)" : "var(--theme-text-secondary)", backgroundColor: viewMode === "grid" ? "var(--theme-text-primary)" : "transparent", border: "none", cursor: "pointer", transition: "all var(--transition-fast)" }} title="Grid View">
            <Grid size={18} />
          </button>
          <button suppressHydrationWarning onClick={() => setViewMode("list")} style={{ padding: "0.5rem", borderRadius: "var(--radius-md)", color: viewMode === "list" ? "var(--theme-card)" : "var(--theme-text-secondary)", backgroundColor: viewMode === "list" ? "var(--theme-text-primary)" : "transparent", border: "none", cursor: "pointer", transition: "all var(--transition-fast)" }} title="List View">
            <ListIcon size={18} />
          </button>
          <button suppressHydrationWarning onClick={() => setViewMode("timeline")} style={{ padding: "0.5rem", borderRadius: "var(--radius-md)", color: viewMode === "timeline" ? "var(--theme-card)" : "var(--theme-text-secondary)", backgroundColor: viewMode === "timeline" ? "var(--theme-text-primary)" : "transparent", border: "none", cursor: "pointer", transition: "all var(--transition-fast)" }} title="Timeline View">
            <Clock size={18} />
          </button>
        </div>
      </div>

      {/* Tags Filter Area */}
      {allTags.length > 0 && (
        <div style={{ marginBottom: "3rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", marginRight: "0.5rem", fontWeight: 600 }}>Filter by Tag:</span>
          <button 
            style={{ backgroundColor: selectedTag === undefined ? "var(--theme-text-primary)" : "var(--theme-bg)", color: selectedTag === undefined ? "var(--theme-card)" : "var(--theme-text-secondary)", border: "1px solid var(--theme-border)", padding: "0.3rem 0.8rem", borderRadius: "var(--radius-full)", fontSize: "0.875rem", cursor: "pointer", fontWeight: 500, transition: "all var(--transition-fast)" }}
            onClick={() => setSelectedTag(undefined)}
          >
            All
          </button>
          {allTags.map(tag => (
            <button 
              key={tag} 
              style={{ backgroundColor: selectedTag === tag ? "var(--theme-text-primary)" : "var(--theme-bg)", color: selectedTag === tag ? "var(--theme-card)" : "var(--theme-text-secondary)", border: "1px solid var(--theme-border)", padding: "0.3rem 0.8rem", borderRadius: "var(--radius-full)", fontSize: "0.875rem", cursor: "pointer", fontWeight: 500, transition: "all var(--transition-fast)" }}
              onClick={() => setSelectedTag(tag === selectedTag ? undefined : tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {loading && <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--theme-text-secondary)", fontWeight: 500, animation: "pulse 2s infinite" }}>Searching your memories...</div>}

      {/* Empty State */}
      {!loading && entries.length === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", padding: "6rem 2rem", backgroundColor: "var(--theme-card)", borderRadius: "var(--radius-xl)", border: "1px dashed var(--theme-border)", marginTop: "2rem" }}>
          <div style={{ width: "80px", height: "80px", backgroundColor: "var(--theme-bg)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", border: "1px solid var(--theme-border)" }}>
            <PenTool size={32} color="var(--accent)" />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--theme-text-primary)", marginBottom: "0.5rem" }}>Your story starts today.</h2>
          <p style={{ color: "var(--theme-text-secondary)", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem" }}>You haven't written any entries yet. Capture your thoughts, ideas, and memories.</p>
          <Link href="/write" className="btn-primary" style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>
            <PenTool size={18} /> Write your first journal
          </Link>
        </motion.div>
      )}

      {/* Pinned Carousel (Only shows in Grid/List mode, not Timeline) */}
      {!loading && pinnedEntries.length > 0 && viewMode !== "timeline" && (
        <div style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", color: "var(--theme-text-primary)", fontWeight: 700 }}>Pinned Entries</h2>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, var(--theme-border), transparent)" }} />
          </div>
          {/* Horizontal Scroller */}
          <div style={{ display: "flex", gap: "1.5rem", overflowX: "auto", paddingBottom: "1rem", scrollSnapType: "x mandatory", msOverflowStyle: "none", scrollbarWidth: "none" }} className="hide-scroll">
            {pinnedEntries.map(entry => (
              <div key={entry._id} style={{ minWidth: "350px", maxWidth: "400px", scrollSnapAlign: "start" }}>
                <EntryCard entry={entry} onTagClick={setSelectedTag} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Entries List */}
      {!loading && regularEntries.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div 
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={viewMode === "grid" ? gridStyle : viewMode === "list" ? listStyle : timelineStyle}
          >
            {regularEntries.map((entry, idx) => (
              <div key={entry._id} style={{ position: "relative" }}>
                {/* Timeline Dot & Line */}
                {viewMode === "timeline" && (
                  <div style={{ position: "absolute", left: "-2rem", top: "2rem", transform: "translateX(-50%)", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--accent)", border: "3px solid var(--theme-bg)", zIndex: 10 }} />
                )}
                <EntryCard entry={entry} onTagClick={setSelectedTag} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Floating Action Button (FAB) -> Expandable "New Entry" */}
      <Link href="/write" style={{ position: "fixed", bottom: "2rem", right: "2rem", display: "flex", alignItems: "center", gap: "0.5rem", padding: "1rem 1.5rem", borderRadius: "99px", backgroundColor: "var(--theme-text-primary)", color: "var(--theme-bg)", fontWeight: 600, boxShadow: "var(--shadow-xl)", textDecoration: "none", zIndex: 100, transition: "transform var(--transition-normal)" }} className="hover-lift">
        <PenTool size={20} />
        <span className="hidden-sm">New Entry</span>
      </Link>

    </div>
  );
}
