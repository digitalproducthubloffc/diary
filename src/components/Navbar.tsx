import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import React from "react";
import { Search, LayoutDashboard, Calendar, BarChart3, User as UserIcon } from "lucide-react";

export default function Navbar({ rightContent }: { rightContent?: React.ReactNode }) {
  const navLinkStyle = { display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 500, padding: "0.4rem 0.75rem", borderRadius: "var(--radius-full)", transition: "all var(--transition-fast)", textDecoration: "none" };

  return (
    <>
      <header className="nav-container">
        <nav style={{ width: "100%", maxWidth: "1200px", padding: "0.5rem", paddingLeft: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", backdropFilter: "var(--glass-blur)", background: "var(--theme-card)", border: "1px solid var(--theme-border)", borderRadius: "99px", boxShadow: "var(--shadow-lg)" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Link href="/" style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--theme-text-primary)", textDecoration: "none", letterSpacing: "-0.02em" }}>
              My Diary
            </Link>
            
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-only">
              <Link href="/dashboard" style={navLinkStyle} className="hover-bg-accent" title="Dashboard">
                <LayoutDashboard size={16} /> <span>Dashboard</span>
              </Link>
              <Link href="/calendar" style={navLinkStyle} className="hover-bg-accent" title="Calendar">
                <Calendar size={16} /> <span>Calendar</span>
              </Link>
              <Link href="/insights" style={navLinkStyle} className="hover-bg-accent" title="Insights">
                <BarChart3 size={16} /> <span>Insights</span>
              </Link>
            </div>
          </div>

          {/* Desktop Right Side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-only">
            <ThemeToggle />
            <div style={{ width: "1px", height: "16px", backgroundColor: "var(--theme-border)", margin: "0 0.25rem" }} />
            <Link href="/settings" style={navLinkStyle} className="hover-bg-accent" title="Profile">
              <UserIcon size={16} /> <span>Profile</span>
            </Link>
            {rightContent}
          </div>

          {/* Mobile Right Side (Just the Log In button if present) */}
          <div className="mobile-only" style={{ alignItems: "center", gap: "0.5rem" }}>
            {rightContent}
          </div>

        </nav>
      </header>

      {/* Fixed Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <Link href="/dashboard" style={{ color: "var(--theme-text-secondary)", padding: "0.5rem" }} className="hover-bounce">
          <LayoutDashboard size={20} />
        </Link>
        <Link href="/calendar" style={{ color: "var(--theme-text-secondary)", padding: "0.5rem" }} className="hover-bounce">
          <Calendar size={20} />
        </Link>
        <Link href="/insights" style={{ color: "var(--theme-text-secondary)", padding: "0.5rem" }} className="hover-bounce">
          <BarChart3 size={20} />
        </Link>
        <div style={{ padding: "0.5rem" }} className="hover-bounce">
          <ThemeToggle />
        </div>
        <Link href="/settings" style={{ color: "var(--theme-text-secondary)", padding: "0.5rem" }} className="hover-bounce">
          <UserIcon size={20} />
        </Link>
      </div>
    </>
  );
}
