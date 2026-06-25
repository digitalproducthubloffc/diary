"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("midnight");

  useEffect(() => {
    const storedTheme = localStorage.getItem("diary_theme") || "midnight";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "midnight" ? "paper" : "midnight";
    setTheme(newTheme);
    localStorage.setItem("diary_theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Prevent hydration mismatch by not rendering the icon until mounted,
  // but we can render a placeholder to keep layout stable.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div style={{ width: 24, height: 24 }} />;
  }

  return (
    <button 
      onClick={toggleTheme} 
      style={{ 
        display: "flex", alignItems: "center", justifyContent: "center", 
        color: "var(--theme-text-secondary)",
        padding: "0.4rem",
        borderRadius: "var(--radius-full)",
        border: "1px solid transparent",
        transition: "all var(--transition-fast)",
        background: "transparent",
        cursor: "pointer"
      }}
      className="hover-bounce"
      title={`Switch to ${theme === "midnight" ? "Light" : "Dark"} mode`}
    >
      {theme === "midnight" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
