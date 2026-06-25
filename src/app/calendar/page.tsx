import { getEntriesAction } from "@/actions/entry.actions";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Navbar from "@/components/Navbar";
import CalendarClient from "./CalendarClient";
import { Flame, PenTool, Calendar as CalendarIcon } from "lucide-react";

export const metadata = {
  title: "Calendar | My Diary",
  description: "Your writing journey, one day at a time.",
};

export default async function CalendarPage() {
  const session = await auth();
  
  let streak = 0;
  if (session?.user?.id) {
    await connectDB();
    const userDoc = await User.findById(session.user.id).lean();
    if (userDoc) streak = userDoc.streak || 0;
  }

  const entries = await getEntriesAction();
  const totalEntries = entries.length;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
        
        {/* Ambient Hero Background */}
        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "40vh", pointerEvents: "none", background: "radial-gradient(ellipse at top, var(--theme-aurora), transparent 70%)", zIndex: 0, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100vh", pointerEvents: "none", background: "radial-gradient(circle at 50% 0%, var(--theme-spotlight) 0%, transparent 60%)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100vh", pointerEvents: "none", opacity: "var(--theme-noise-opacity)", backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')", zIndex: 0 }} />

        <div className="container" style={{ position: "relative", zIndex: 10, paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)" }}>
          
          <header style={{ marginBottom: "var(--spacing-section)", display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <div style={{ fontSize: "1rem", color: "var(--theme-text-secondary)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>Journal Calendar</span> <span style={{ fontSize: "1.2rem" }}>📅</span>
              </div>
              <h1 className="hero-title">
                Your writing journey,<br/>one day at a time.
              </h1>
              
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--accent)", borderRadius: "99px", fontWeight: 600, fontSize: "0.875rem" }}>
                  <Flame size={16} /> {streak} Day Streak
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", color: "var(--theme-text-primary)", borderRadius: "99px", fontWeight: 600, fontSize: "0.875rem" }}>
                  <PenTool size={16} /> {totalEntries} Entries
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", color: "var(--theme-text-primary)", borderRadius: "99px", fontWeight: 600, fontSize: "0.875rem" }}>
                  <CalendarIcon size={16} /> {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
          </header>

          <div style={{ width: "100%", height: "1px", backgroundColor: "var(--theme-border)", marginBottom: "var(--spacing-section)" }} />

          {/* Client Component for Interactive Calendar */}
          <CalendarClient initialEntries={entries} />

        </div>
      </main>
    </>
  );
}
