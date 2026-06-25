"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search entries..." }: SearchBarProps) {
  return (
    <div style={{ position: "relative", marginBottom: "2rem" }}>
      <div style={{
        position: "absolute",
        left: "1rem",
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-secondary)",
        pointerEvents: "none",
        display: "flex"
      }}>
        <Search size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          paddingLeft: "3rem",
          backgroundColor: "var(--card)",
          border: "1px solid var(--card-border)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      />
    </div>
  );
}
