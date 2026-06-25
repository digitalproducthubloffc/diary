"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Flame, PenTool, Clock, Award, Lock, CheckCircle, TrendingUp, Calendar as CalendarIcon, Tag as TagIcon, Smile } from "lucide-react";

interface InsightsClientProps {
  initialEntries: any[];
  streak: number;
  longestStreak: number;
}

export default function InsightsClient({ initialEntries, streak, longestStreak }: InsightsClientProps) {
  
  // Data Computation
  const totalEntries = initialEntries.length;
  const totalWords = initialEntries.reduce((acc, entry) => acc + (entry.wordCount || 0), 0);
  const totalTime = initialEntries.reduce((acc, entry) => acc + (entry.readingTime || 1), 0);
  const avgSession = totalEntries > 0 ? Math.ceil(totalTime / totalEntries) * 5 : 0; // rough estimation of writing time

  // Weekly Trend
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyCounts = new Array(7).fill(0);
  let maxWeekCount = 0;

  // Moods & Tags
  const moodCounts: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};
  
  // Habits (Time of day)
  const timeOfDayCounts: Record<string, number> = { "Morning": 0, "Afternoon": 0, "Evening": 0, "Night": 0 };

  // Current Month Stats
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  let currentMonthEntries = 0;
  let currentMonthWords = 0;

  initialEntries.forEach(entry => {
    if (!entry.createdAt) return;
    const date = new Date(entry.createdAt);
    
    // Weekly Trend
    const day = date.getDay();
    weeklyCounts[day]++;
    if (weeklyCounts[day] > maxWeekCount) maxWeekCount = weeklyCounts[day];

    // Moods
    if (entry.mood) {
      const cleanMood = entry.mood.replace(/[^a-zA-Z]/g, '').trim();
      moodCounts[cleanMood] = (moodCounts[cleanMood] || 0) + 1;
    }

    // Tags
    if (entry.tags && Array.isArray(entry.tags)) {
      entry.tags.forEach((tag: string) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }

    // Time of Day
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) timeOfDayCounts["Morning"]++;
    else if (hour >= 12 && hour < 17) timeOfDayCounts["Afternoon"]++;
    else if (hour >= 17 && hour < 22) timeOfDayCounts["Evening"]++;
    else timeOfDayCounts["Night"]++;

    // Monthly
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      currentMonthEntries++;
      currentMonthWords += (entry.wordCount || 0);
    }
  });

  const topMoods = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  
  const mostFrequentTime = Object.entries(timeOfDayCounts).sort((a, b) => b[1] - a[1])[0];
  const mostFrequentTimePercent = totalEntries > 0 ? Math.round((mostFrequentTime[1] / totalEntries) * 100) : 0;

  // Render Helpers
  const formatNumber = (num: number) => num > 1000 ? `${(num / 1000).toFixed(1)}k` : num;
  
  const cardStyle = {
    backgroundColor: "var(--theme-card)", borderRadius: "var(--radius-xl)", padding: "var(--spacing-card)", 
    border: "1px solid var(--theme-border)", boxShadow: "var(--shadow-md)"
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "var(--spacing-section)" }}>
      
      {/* 1. Primary Analytics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
        
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column", justifyContent: "center" }} className="hover-lift">
          <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Flame size={16} color="#f97316" /> Longest Streak
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--theme-text-primary)", lineHeight: 1, marginBottom: "0.5rem" }}>{longestStreak} <span style={{ fontSize: "1rem", color: "var(--theme-text-secondary)", fontWeight: 500 }}>Days</span></div>
          <div style={{ width: "100%", height: "4px", backgroundColor: "var(--theme-bg)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: `${Math.min(100, (streak / Math.max(longestStreak, 1)) * 100)}%`, height: "100%", backgroundColor: "#f97316" }} />
          </div>
        </div>

        <div style={{ ...cardStyle, display: "flex", flexDirection: "column", justifyContent: "center" }} className="hover-lift">
          <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <PenTool size={16} color="var(--accent)" /> Words Written
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--theme-text-primary)", lineHeight: 1 }}>{totalWords.toLocaleString()}</div>
        </div>

        <div style={{ ...cardStyle, display: "flex", flexDirection: "column", justifyContent: "center" }} className="hover-lift">
          <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Clock size={16} color="#8b5cf6" /> Average Session
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--theme-text-primary)", lineHeight: 1 }}>{avgSession} <span style={{ fontSize: "1rem", color: "var(--theme-text-secondary)", fontWeight: 500 }}>min</span></div>
        </div>

        <div style={{ ...cardStyle, display: "flex", flexDirection: "column", justifyContent: "center" }} className="hover-lift">
          <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <CalendarIcon size={16} color="#3b82f6" /> Total Entries
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--theme-text-primary)", lineHeight: 1 }}>{totalEntries}</div>
        </div>

      </div>

      {/* 2. Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        
        {/* Weekly Trend (Native CSS Bar Chart) */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            <TrendingUp size={18} color="var(--accent)" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--theme-text-primary)" }}>Weekly Trend</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {weekDays.map((day, i) => {
              const count = weeklyCounts[i];
              const percent = maxWeekCount > 0 ? (count / maxWeekCount) * 100 : 0;
              return (
                <div key={day} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "30px", fontSize: "0.875rem", color: "var(--theme-text-secondary)", fontWeight: 500 }}>{day}</div>
                  <div style={{ flex: 1, height: "16px", backgroundColor: "var(--theme-bg)", borderRadius: "8px", overflow: "hidden", display: "flex" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1, delay: i * 0.1 }} style={{ height: "100%", backgroundColor: "var(--accent)", borderRadius: "8px" }} />
                  </div>
                  <div style={{ width: "30px", textAlign: "right", fontSize: "0.875rem", color: "var(--theme-text-primary)", fontWeight: 600 }}>{count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Most Used Moods */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            <Smile size={18} color="#f97316" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--theme-text-primary)" }}>Most Used Moods</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {topMoods.length === 0 ? <p style={{ color: "var(--theme-text-secondary)" }}>Not enough data yet.</p> : null}
            {topMoods.map(([mood, count], i) => {
              const percent = Math.round((count / totalEntries) * 100);
              return (
                <div key={mood}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--theme-text-primary)", textTransform: "capitalize" }}>{mood}</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--theme-text-secondary)" }}>{percent}%</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", backgroundColor: "var(--theme-bg)", borderRadius: "4px", overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1, delay: i * 0.2 }} style={{ height: "100%", backgroundColor: i === 0 ? "#10b981" : i === 1 ? "#8b5cf6" : "#f97316", borderRadius: "4px" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Habits & Tags Row */}
      <div className="grid-1-2" style={{ gap: "1.5rem" }}>
        
        {/* Writing Habits */}
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", backgroundColor: "var(--theme-bg)", border: "none" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--theme-text-secondary)", marginBottom: "1rem" }}>You write most often</h3>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
            {mostFrequentTime[0] === "Morning" ? "🌅" : mostFrequentTime[0] === "Afternoon" ? "☀️" : mostFrequentTime[0] === "Evening" ? "🌙" : "🌌"}
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--theme-text-primary)" }}>{mostFrequentTime[0]}</div>
          <div style={{ fontSize: "1rem", color: "var(--accent)", fontWeight: 600, marginTop: "0.5rem" }}>{mostFrequentTimePercent}% of the time</div>
        </div>

        {/* Most Used Tags */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <TagIcon size={18} color="#3b82f6" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--theme-text-primary)" }}>Top Subjects</h3>
          </div>
          {topTags.length === 0 ? (
             <p style={{ color: "var(--theme-text-secondary)" }}>No tags used yet.</p>
          ) : (
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {topTags.map(([tag, count], i) => (
                <div key={tag} style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--theme-bg)", border: "1px solid var(--theme-border)", padding: "0.5rem 1rem", borderRadius: "99px", transition: "all var(--transition-fast)" }} className="hover-lift">
                  <span style={{ color: "var(--theme-text-primary)", fontWeight: 600 }}>{tag}</span>
                  <span style={{ color: "var(--theme-text-secondary)", fontSize: "0.75rem", backgroundColor: "var(--theme-card)", padding: "0.1rem 0.4rem", borderRadius: "99px" }}>{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 4. Achievements */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          <Award size={20} color="#eab308" />
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--theme-text-primary)" }}>Achievements</h3>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          
          {/* First Entry */}
          <div style={{ padding: "1rem", backgroundColor: totalEntries > 0 ? "rgba(16, 185, 129, 0.05)" : "var(--theme-bg)", border: totalEntries > 0 ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--theme-border)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: totalEntries > 0 ? "rgba(16, 185, 129, 0.1)" : "var(--theme-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {totalEntries > 0 ? <CheckCircle size={20} color="#10b981" /> : <Lock size={20} color="var(--theme-text-secondary)" />}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: totalEntries > 0 ? "var(--theme-text-primary)" : "var(--theme-text-secondary)" }}>First Entry</div>
              <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)" }}>Write your first journal</div>
            </div>
          </div>

          {/* 7 Day Streak */}
          <div style={{ padding: "1rem", backgroundColor: longestStreak >= 7 ? "rgba(249, 115, 22, 0.05)" : "var(--theme-bg)", border: longestStreak >= 7 ? "1px solid rgba(249, 115, 22, 0.3)" : "1px solid var(--theme-border)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: longestStreak >= 7 ? "rgba(249, 115, 22, 0.1)" : "var(--theme-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {longestStreak >= 7 ? <Flame size={20} color="#f97316" /> : <Lock size={20} color="var(--theme-text-secondary)" />}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: longestStreak >= 7 ? "var(--theme-text-primary)" : "var(--theme-text-secondary)" }}>On Fire</div>
              <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)" }}>Reach a 7 day streak</div>
            </div>
          </div>

          {/* 100 Entries */}
          <div style={{ padding: "1rem", backgroundColor: totalEntries >= 100 ? "rgba(59, 130, 246, 0.05)" : "var(--theme-bg)", border: totalEntries >= 100 ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid var(--theme-border)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: totalEntries >= 100 ? "rgba(59, 130, 246, 0.1)" : "var(--theme-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {totalEntries >= 100 ? <CalendarIcon size={20} color="#3b82f6" /> : <Lock size={20} color="var(--theme-text-secondary)" />}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: totalEntries >= 100 ? "var(--theme-text-primary)" : "var(--theme-text-secondary)" }}>Century Club</div>
              <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)" }}>Write 100 entries</div>
            </div>
          </div>

          {/* 10k Words */}
          <div style={{ padding: "1rem", backgroundColor: totalWords >= 10000 ? "rgba(139, 92, 246, 0.05)" : "var(--theme-bg)", border: totalWords >= 10000 ? "1px solid rgba(139, 92, 246, 0.3)" : "1px solid var(--theme-border)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: totalWords >= 10000 ? "rgba(139, 92, 246, 0.1)" : "var(--theme-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {totalWords >= 10000 ? <PenTool size={20} color="#8b5cf6" /> : <Lock size={20} color="var(--theme-text-secondary)" />}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: totalWords >= 10000 ? "var(--theme-text-primary)" : "var(--theme-text-secondary)" }}>Novelist</div>
              <div style={{ fontSize: "0.75rem", color: "var(--theme-text-secondary)" }}>Write 10,000 words</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
