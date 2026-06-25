import { getEntriesAction } from "@/actions/entry.actions";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Link from "next/link";
import { Plus, Flame, BookOpen, PenTool, ArrowRight } from "lucide-react";
import DashboardClient from "./DashboardClient";
import Navbar from "@/components/Navbar";

export default async function DashboardPage() {
  const session = await auth();
  
  let streak = 0;
  let userName = "Writer";
  if (session?.user?.id) {
    await connectDB();
    const userDoc = await User.findById(session.user.id).lean();
    if (userDoc) {
      streak = (userDoc as any).streak || 0;
      userName = userDoc.name?.split(' ')[0] || "Writer";
    }
  }

  const entries = await getEntriesAction();
  const allTags = Array.from(new Set(entries.flatMap((e: any) => e.tags || []))).sort();
  
  const totalEntries = entries.length;
  const totalWords = entries.reduce((acc: number, entry: any) => acc + (entry.wordCount || 0), 0);
  const formattedWords = totalWords > 1000 ? `${(totalWords / 1000).toFixed(1)}k` : totalWords;

  const lastEntry = entries[0];

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
            {/* Greeting */}
            <div>
              <div style={{ fontSize: "1rem", color: "var(--theme-text-secondary)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>Good Evening, {userName}</span> <span style={{ fontSize: "1.2rem" }}>🌙</span>
              </div>
              <h1 className="hero-title">
                Continue your story.
              </h1>
            </div>

            {/* Featured Continue & Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              
              {/* Continue Writing Featured Card */}
              <Link href={lastEntry ? `/entry/${lastEntry.slug}` : "/write"} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "1.5rem", borderRadius: "var(--radius-xl)", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", boxShadow: "var(--shadow-md)", textDecoration: "none", transition: "all var(--transition-normal)", position: "relative", overflow: "hidden" }} className="hover-lift">
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, var(--accent), transparent)" }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    <PenTool size={14} /> Resume Draft
                  </div>
                  <h3 style={{ fontSize: "1.25rem", color: "var(--theme-text-primary)", fontWeight: 700, marginBottom: "0.5rem" }}>
                    {lastEntry ? (lastEntry.title || "Untitled") : "Start your first entry"}
                  </h3>
                  {lastEntry && (
                    <p style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {lastEntry.content || "No content yet..."}
                    </p>
                  )}
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 500 }}>
                  <span>{lastEntry ? `Last edited: ${new Date(lastEntry.createdAt).toLocaleDateString()}` : "Ready when you are"}</span>
                  <ArrowRight size={16} />
                </div>
              </Link>

              {/* Quick Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ padding: "1.5rem", borderRadius: "var(--radius-xl)", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Flame size={14} color="var(--accent)" /> Current Streak
                  </div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--theme-text-primary)", lineHeight: 1 }}>{streak}</div>
                </div>
                <div style={{ padding: "1.5rem", borderRadius: "var(--radius-xl)", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <BookOpen size={14} /> Entries
                  </div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--theme-text-primary)", lineHeight: 1 }}>{totalEntries}</div>
                </div>
              </div>

            </div>
          </header>

          <div style={{ width: "100%", height: "1px", backgroundColor: "var(--theme-border)", marginBottom: "var(--spacing-section)" }} />

          {/* Client Component for Interactive Dashboard */}
          <DashboardClient initialEntries={entries} allTags={allTags as string[]} />

        </div>
      </main>
    </>
  );
}
