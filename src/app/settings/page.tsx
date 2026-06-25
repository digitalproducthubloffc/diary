import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Navbar from "@/components/Navbar";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const session = await auth();
  
  let userData = {
    name: "User",
    email: "user@example.com",
    createdAt: new Date().toISOString()
  };

  if (session?.user?.id) {
    await connectDB();
    const userDoc = await User.findById(session.user.id).lean();
    if (userDoc) {
      userData = {
        name: (userDoc as any).name || "User",
        email: (userDoc as any).email || "user@example.com",
        createdAt: (userDoc as any).createdAt ? new Date((userDoc as any).createdAt).toISOString() : new Date().toISOString()
      };
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
        
        {/* Ambient Hero Background */}
        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "40vh", pointerEvents: "none", background: "radial-gradient(ellipse at top, var(--theme-aurora), transparent 70%)", zIndex: 0, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100vh", pointerEvents: "none", background: "radial-gradient(circle at 50% 0%, var(--theme-spotlight) 0%, transparent 60%)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100vh", pointerEvents: "none", opacity: "var(--theme-noise-opacity)", backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')", zIndex: 0 }} />

        <div className="container" style={{ position: "relative", zIndex: 10, paddingTop: "var(--spacing-section)", paddingBottom: "var(--spacing-section)", maxWidth: "800px" }}>
          
          <header style={{ marginBottom: "var(--spacing-section)", textAlign: "center" }}>
            <h1 className="hero-title">
              Settings
            </h1>
            <p style={{ color: "var(--theme-text-secondary)", fontSize: "1.1rem" }}>
              Manage your preferences and account details.
            </p>
          </header>

          <SettingsClient user={userData} />

        </div>
      </main>
    </>
  );
}
