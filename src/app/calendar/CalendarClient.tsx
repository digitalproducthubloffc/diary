"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, PenTool, Flame } from "lucide-react";
import Link from "next/link";

export default function CalendarClient({ initialEntries }: { initialEntries: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Group entries by YYYY-MM-DD
  const entriesByDate = useMemo(() => {
    const map: Record<string, any[]> = {};
    initialEntries.forEach(entry => {
      if (!entry.createdAt) return;
      const dateStr = new Date(entry.createdAt).toISOString().split("T")[0];
      if (!map[dateStr]) map[dateStr] = [];
      map[dateStr].push(entry);
    });
    return map;
  }, [initialEntries]);

  // Generate Calendar Grid
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getMoodColor = (moodString?: string) => {
    if (!moodString) return "var(--accent)";
    const cleanMood = moodString.replace(/[^a-zA-Z]/g, '').trim().toLowerCase();
    if (["calm", "peaceful", "relaxed"].includes(cleanMood)) return "#10b981";
    if (["happy", "great", "joyful", "excited"].includes(cleanMood)) return "#10b981";
    if (["sad", "difficult", "angry", "stressed"].includes(cleanMood)) return "#ef4444";
    if (["motivated", "focused", "productive"].includes(cleanMood)) return "#f97316";
    if (["reflective", "thoughtful", "curious"].includes(cleanMood)) return "#8b5cf6";
    return "var(--accent)";
  };

  // Timeline entries
  const timelineEntries = selectedDate ? entriesByDate[selectedDate] || [] : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-section)", width: "100%", overflowX: "hidden" }}>
      
      {/* 1. Monthly Calendar Grid */}
      <div style={{ backgroundColor: "var(--theme-card)", borderRadius: "var(--radius-xl)", padding: "var(--spacing-card)", border: "1px solid var(--theme-border)", boxShadow: "var(--shadow-md)" }}>
        
        {/* Calendar Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--theme-text-primary)" }}>
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={prevMonth} style={{ padding: "0.5rem", backgroundColor: "var(--theme-bg)", border: "1px solid var(--theme-border)", borderRadius: "var(--radius-md)", color: "var(--theme-text-primary)", cursor: "pointer" }} className="hover-lift">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextMonth} style={{ padding: "0.5rem", backgroundColor: "var(--theme-bg)", border: "1px solid var(--theme-border)", borderRadius: "var(--radius-md)", color: "var(--theme-text-primary)", cursor: "pointer" }} className="hover-lift">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.25rem", marginBottom: "1rem", textAlign: "center", color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 600 }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <div key={d}>{d}</div>)}
        </div>

        {/* Days Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.25rem", gridAutoRows: "minmax(60px, auto)" }}>
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} style={{ padding: "0.5rem", borderRadius: "var(--radius-lg)", backgroundColor: "transparent" }} />
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEntries = entriesByDate[dateStr] || [];
            const hasEntry = dayEntries.length > 0;
            const primaryColor = hasEntry ? getMoodColor(dayEntries[0].mood) : "var(--theme-border)";
            const isSelected = selectedDate === dateStr;

            return (
              <motion.div 
                key={day}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                style={{ 
                  padding: "0.5rem", borderRadius: "var(--radius-lg)", cursor: "pointer", 
                  backgroundColor: isSelected ? "var(--theme-bg)" : "transparent",
                  border: isSelected ? `1px solid ${primaryColor}` : "1px solid transparent",
                  position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", transition: "all var(--transition-fast)" 
                }}
                className="hover-bg-accent"
              >
                <span style={{ fontSize: "1.1rem", fontWeight: 600, color: hasEntry ? "var(--theme-text-primary)" : "var(--theme-text-secondary)" }}>
                  {day}
                </span>
                
                {/* Entry Indicator Dots */}
                {hasEntry && (
                  <div style={{ display: "flex", gap: "0.2rem" }}>
                    {dayEntries.slice(0, 3).map((e, idx) => (
                      <div key={idx} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: getMoodColor(e.mood), boxShadow: `0 0 8px ${getMoodColor(e.mood)}` }} />
                    ))}
                    {dayEntries.length > 3 && <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "var(--theme-text-secondary)", alignSelf: "center" }} />}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Daily Timeline (Appears when a date is selected) */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "var(--spacing-card)", backgroundColor: "var(--theme-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--theme-border)", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--theme-text-primary)", marginBottom: "2rem" }}>
                Entries for {new Date(selectedDate).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              
              {timelineEntries.length === 0 ? (
                <p style={{ color: "var(--theme-text-secondary)" }}>No entries on this day.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", borderLeft: "2px solid var(--theme-border)", paddingLeft: "2rem", marginLeft: "1rem" }}>
                  {timelineEntries.map((entry) => (
                    <div key={entry._id} style={{ position: "relative" }}>
                      {/* Timeline Dot */}
                      <div style={{ position: "absolute", left: "-2rem", top: "0.5rem", transform: "translateX(-50%)", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: getMoodColor(entry.mood), border: "3px solid var(--theme-card)", zIndex: 10, boxShadow: `0 0 10px ${getMoodColor(entry.mood)}` }} />
                      
                      <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                        {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      
                      <Link href={`/entry/${entry.slug}`} style={{ textDecoration: "none", display: "block", backgroundColor: "var(--theme-bg)", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--theme-border)" }} className="hover-lift">
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--theme-text-primary)", marginBottom: "0.5rem" }}>{entry.title || "Untitled"}</h4>
                        <p style={{ color: "var(--theme-text-secondary)", fontSize: "0.9rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {entry.content || "No content."}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. GitHub-style Heatmap (Writing Activity) */}
      <div style={{ padding: "2rem", backgroundColor: "var(--theme-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--theme-border)", boxShadow: "var(--shadow-md)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--theme-text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Flame size={18} color="var(--accent)" /> Writing Activity
          </h3>
          <span style={{ fontSize: "0.875rem", color: "var(--theme-text-secondary)", fontWeight: 500 }}>
            Last 52 Weeks
          </span>
        </div>

        <div style={{ width: "100%", overflowX: "auto", paddingBottom: "1rem" }} className="hide-scroll">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(52, 1fr)", gap: "4px", minWidth: "800px" }}>
            {Array.from({ length: 52 }).map((_, weekIdx) => (
              <div key={`week-${weekIdx}`} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const mockDate = new Date();
                  mockDate.setDate(mockDate.getDate() - (52 * 7) + (weekIdx * 7) + dayIdx);
                  const dateStr = mockDate.toISOString().split("T")[0];
                  const count = (entriesByDate[dateStr] || []).length;
                  
                  let opacity = 0.05;
                  if (count === 1) opacity = 0.4;
                  if (count === 2) opacity = 0.7;
                  if (count > 2) opacity = 1;

                  return (
                    <div 
                      key={`day-${weekIdx}-${dayIdx}`} 
                      title={`${count} entries on ${dateStr}`}
                      style={{ 
                        width: "100%", aspectRatio: "1/1", borderRadius: "3px", 
                        backgroundColor: count > 0 ? "var(--accent)" : "var(--theme-text-primary)", 
                        opacity: count > 0 ? opacity : 0.05,
                        cursor: "pointer", transition: "transform var(--transition-fast)"
                      }} 
                      className="hover-bounce"
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {/* Heatmap Legend */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.5rem", marginTop: "1rem", fontSize: "0.75rem", color: "var(--theme-text-secondary)", fontWeight: 500 }}>
          <span>Less</span>
          <div style={{ display: "flex", gap: "4px" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "var(--theme-text-primary)", opacity: 0.05 }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "var(--accent)", opacity: 0.4 }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "var(--accent)", opacity: 0.7 }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "var(--accent)", opacity: 1 }} />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
