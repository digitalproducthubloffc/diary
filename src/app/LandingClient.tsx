"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Lock, Search, SplitSquareHorizontal, History, CheckCircle2, Flame, Command, Palette, Cloud, Terminal, Bold, Italic, Underline, List, ListOrdered, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function AnimatedNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * easeOut));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return <span ref={nodeRef}>{count}</span>;
}

export default function LandingClient() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", overflowX: "hidden", position: "relative" }}>
      
      {/* Global Mouse Glow */}
      <div 
        style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: "none", zIndex: 9999,
          background: "radial-gradient(circle 800px at 50% 50%, rgba(16,185,129,0.03), transparent 80%)"
        }}
      />

      {/* Aurora Background */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "100vh", overflow: "hidden", zIndex: -1 }}>
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "#10B981", filter: "blur(150px)", opacity: "var(--aurora-opacity)", borderRadius: "50%" }}
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "20%", right: "-10%", width: "40%", height: "60%", background: "#3B82F6", filter: "blur(150px)", opacity: "var(--aurora-opacity)", borderRadius: "50%" }}
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "-20%", left: "20%", width: "60%", height: "40%", background: "#8B5CF6", filter: "blur(150px)", opacity: "var(--aurora-opacity)", borderRadius: "50%" }}
        />
      </div>

      {/* Navbar */}
      <Navbar rightContent={
        <>
          <Link href="/login" className="btn-secondary" style={{ border: "none", backgroundColor: "transparent", padding: "0.5rem 1rem", borderRadius: "99px", fontSize: "0.875rem" }}>Log In</Link>
          <Link href="/register" className="btn-primary" style={{ boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.3)", borderRadius: "99px", padding: "0.6rem 1.5rem", fontSize: "0.875rem" }}>Sign Up</Link>
        </>
      } />

      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "6rem 2rem 6rem", maxWidth: "1000px", position: "relative", zIndex: 1 }}>
        {/* Floating Pills */}
        <motion.div 
          animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "10%", left: "-5%", padding: "0.75rem 1.25rem", borderRadius: "99px", background: "var(--mockup-header)", backdropFilter: "blur(20px)", border: "1px solid var(--card-border)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", boxShadow: "var(--shadow-pill)" }}
        >
          ✍️ Writing Flow Active
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: "absolute", top: "30%", right: "-15%", padding: "0.75rem 1.25rem", borderRadius: "99px", background: "var(--mockup-header)", backdropFilter: "blur(20px)", border: "1px solid var(--card-border)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", boxShadow: "var(--shadow-pill)" }}
        >
          🔒 Private & Secure
        </motion.div>

        <motion.div 
          animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ position: "absolute", bottom: "10%", left: "5%", padding: "0.75rem 1.25rem", borderRadius: "99px", background: "var(--mockup-header)", backdropFilter: "blur(20px)", border: "1px solid var(--card-border)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", boxShadow: "var(--shadow-pill)" }}
        >
          ⚡ Instant Search
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ position: "absolute", bottom: "20%", right: "10%", padding: "0.75rem 1.25rem", borderRadius: "99px", background: "var(--mockup-header)", backdropFilter: "blur(20px)", border: "1px solid var(--card-border)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", boxShadow: "var(--shadow-pill)" }}
        >
          🔥 14 Day Streak
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "99px", background: "var(--mockup-header)", border: "1px solid var(--card-border)", marginBottom: "2rem", fontSize: "0.875rem", color: "var(--text-secondary)", backdropFilter: "blur(10px)" }}>
            ✨ Modern Private Journaling
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: "5rem", fontWeight: "800", letterSpacing: "-0.05em", marginBottom: "1rem", lineHeight: "1.1", background: "var(--hero-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          Your Mind's Private Vault
        </motion.h1>

        <motion.h3 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: "1.5rem", color: "var(--text-secondary)", marginBottom: "3rem", fontWeight: "500", letterSpacing: "-0.02em" }}
        >
          Private. Searchable. Always Yours.
        </motion.h3>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Link href="/register" className="btn-primary" style={{ padding: "1rem 2.5rem", fontSize: "1.25rem", borderRadius: "12px" }}>
            Start Writing Free
          </Link>
        </motion.div>
      </section>

      {/* Built For */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 0.6, y: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "8rem" }}
      >
        <div style={{ display: "flex", gap: "3rem", justifyContent: "center", flexWrap: "wrap", fontSize: "1.25rem", fontWeight: "500", color: "var(--text-secondary)" }}>
          <span>Capture Ideas</span>
          <span>•</span>
          <span>Reflect Daily</span>
          <span>•</span>
          <span>Track Growth</span>
          <span>•</span>
          <span>Remember Everything</span>
        </div>
      </motion.section>

      {/* Product Showcase */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.7 }}
        style={{ width: "100%", maxWidth: "1200px", padding: "0 2rem", marginBottom: "10rem" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          
          {/* Left: Text */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 16, background: "var(--card)", border: "1px solid rgba(16, 185, 129, 0.3)", boxShadow: "0 8px 20px rgba(16, 185, 129, 0.15)", marginBottom: "2rem" }}>
              <SplitSquareHorizontal color="#10B981" size={28} />
            </div>
            <h3 style={{ fontSize: "2.5rem", fontWeight: "bold", letterSpacing: "-0.02em", marginBottom: "1rem", color: "var(--text-primary)" }}>Everything, Exactly Where You Left It</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.25rem", lineHeight: 1.7 }}>
              Your thoughts are automatically organized into a searchable timeline. Revisit ideas, memories, and breakthroughs months later in seconds.
            </p>
          </div>

          {/* Right: Mockup */}
          <div style={{ backgroundColor: "var(--card)", borderRadius: "16px", border: "1px solid var(--card-border)", overflow: "hidden", boxShadow: "var(--shadow-heavy)", display: "flex", flexDirection: "column", height: "500px" }}>
            <div style={{ padding: "1rem", backgroundColor: "var(--mockup-header)", borderBottom: "1px solid var(--card-border)", display: "flex", gap: "0.5rem" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }}></div>
            </div>
            
            <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "var(--background)" }}>
              <div style={{ padding: "2.5rem", height: "100%" }}>
                <div style={{ background: "var(--card)", padding: "2rem", borderRadius: 12, border: "1px solid var(--card-border)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "4px", background: "#10B981", borderRadius: "12px 0 0 12px" }}></div>
                  <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1rem" }}>October 12, 2026</div>
                  <h3 style={{ fontSize: "1.75rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>A Weekend in the Mountains</h3>
                  <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "2rem", fontWeight: "500" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle2 size={16} color="#10B981"/> 14 Day Streak</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle2 size={16} color="#10B981"/> 3 Tags</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle2 size={16} color="#10B981"/> Mood: Peaceful</span>
                  </div>
                  <p style={{ color: "var(--text-primary)", fontSize: "1.1rem", lineHeight: 1.6 }}>
                    The air is incredibly crisp this morning. We spent the afternoon hiking the trails near the lake, totally disconnected from everything...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Mini-UI Bento Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.7 }}
        style={{ width: "100%", maxWidth: "1200px", padding: "0 2rem", marginBottom: "10rem" }}
      >
        <h2 style={{ fontSize: "3rem", fontWeight: "bold", background: "var(--hero-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "3rem", textAlign: "center" }}>
          Everything you need.
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(2, 200px)", gap: "1.5rem" }}>
          
          {/* Card 1: Command Palette */}
          <div className="card" style={{ gridColumn: "span 2", background: "var(--section-bg)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
            <div style={{ flex: 1, padding: "1.5rem", zIndex: 1 }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Lightning Fast Navigation</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", maxWidth: "60%" }}>Built entirely on Next.js Server Actions, your vault is instantly responsive.</p>
            </div>
            {/* Mini UI */}
            <div style={{ position: "absolute", bottom: -20, right: 20, width: "200px", background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: "8px 8px 0 0", padding: "1rem", boxShadow: "0 -10px 30px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.75rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
                <Search size={12}/> Search...
              </div>
              <div style={{ background: "rgba(16, 185, 129, 0.1)", padding: "0.5rem", borderRadius: 4, fontSize: "0.75rem", color: "var(--text-primary)" }}>Recent Entry</div>
            </div>
          </div>

          {/* Card 2: Streak */}
          <div className="card" style={{ background: "var(--section-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #F59E0B, #EF4444)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", boxShadow: "0 10px 20px rgba(245, 158, 11, 0.3)" }}>
              <Flame color="white" size={32} />
            </div>
            <h3 style={{ fontSize: "1.25rem" }}><AnimatedNumber target={14} /> Day Streak</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Keep the momentum going.</p>
          </div>

          {/* Card 3: Backups */}
          <div className="card" style={{ background: "var(--section-bg)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Rolling Backups</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Never lose a keystroke.</p>
            </div>
            {/* Mini UI Timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} /> Now
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "var(--text-secondary)", opacity: 0.7 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--card-border)" }} /> 10 mins ago
              </div>
            </div>
          </div>

          {/* Card 4: Tenant Isolation */}
          <div className="card" style={{ gridColumn: "span 2", background: "var(--section-bg)", display: "flex", flexDirection: "row", alignItems: "center", overflow: "hidden", position: "relative" }}>
             <div style={{ flex: 1, padding: "1.5rem", zIndex: 1 }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>True Tenant Isolation</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", maxWidth: "80%" }}>We utilize strict MongoDB indexing to guarantee that your data can never be accessed by another user.</p>
            </div>
            <div style={{ padding: "2rem", display: "flex", gap: "1rem" }}>
              <div style={{ padding: "1rem", background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: 8, opacity: 0.5 }}>User A</div>
              <div style={{ width: 2, background: "linear-gradient(to bottom, transparent, var(--accent), transparent)" }} />
              <div style={{ padding: "1rem", background: "var(--card)", border: "1px solid var(--accent)", borderRadius: 8, color: "var(--accent)", display: "flex", alignItems: "center", gap: "0.5rem" }}><Lock size={14}/> Your Vault</div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* Trust Badges instead of Fake Numbers */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.7 }}
        style={{ textAlign: "center", marginBottom: "10rem" }}
      >
        <div style={{ display: "flex", gap: "4rem", justifyContent: "center", flexWrap: "wrap", maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", display: "flex", justifyContent: "center", color: "var(--text-primary)" }}>
              <Lock size={36} color="#10B981" />
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Private By Design</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>Your entries belong only to you, encrypted and protected behind strict isolation rules.</div>
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", display: "flex", justifyContent: "center", color: "var(--text-primary)" }}>
              <Search size={36} color="#3B82F6" />
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "var(--text-primary)" }}>Lightning Fast</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>Find any thought instantly across thousands of entries with advanced database indexing.</div>
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", display: "flex", justifyContent: "center", color: "var(--text-primary)" }}>
              <Cloud size={36} color="#8B5CF6" />
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "var(--text-primary)" }}>End-to-End Sync</div>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>Seamlessly backed up in real-time. Write from anywhere, never lose a memory.</div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.7 }}
        style={{ padding: "0 2rem", marginBottom: "6rem", width: "100%", maxWidth: "1000px", textAlign: "center" }}
      >
        
        <div className="card" style={{ maxWidth: "450px", margin: "0 auto", padding: "2rem", position: "relative", overflow: "hidden", border: "1px solid var(--card-border)", boxShadow: "0 0 40px rgba(16, 185, 129, 0.1)", transform: "scale(1)", transition: "transform 0.3s ease" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(to right, #10B981, #3B82F6)" }}></div>
          <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "rgba(16,185,129,0.1)", color: "#10B981", padding: "0.25rem 0.75rem", borderRadius: 99, fontSize: "0.75rem", fontWeight: "bold", letterSpacing: "1px" }}>MOST POPULAR</div>
          
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--text-primary)", fontWeight: "bold", textAlign: "left" }}>Free Forever</h3>
          
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left", marginBottom: "2.5rem", marginTop: "2rem" }}>
            <li style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-secondary)" }}><CheckCircle2 size={18} color="#10B981" /> <span style={{ fontSize: "1rem" }}>Unlimited Entries</span></li>
            <li style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-secondary)" }}><CheckCircle2 size={18} color="#10B981" /> <span style={{ fontSize: "1rem" }}>Advanced Search</span></li>
            <li style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-secondary)" }}><CheckCircle2 size={18} color="#10B981" /> <span style={{ fontSize: "1rem" }}>Mood Tracking</span></li>
            <li style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-secondary)" }}><CheckCircle2 size={18} color="#10B981" /> <span style={{ fontSize: "1rem" }}>Streak Tracking</span></li>
            <li style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-secondary)" }}><CheckCircle2 size={18} color="#10B981" /> <span style={{ fontSize: "1rem" }}>Dark & Light Themes</span></li>
            <li style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-secondary)" }}><CheckCircle2 size={18} color="#10B981" /> <span style={{ fontSize: "1rem" }}>Secure Accounts</span></li>
          </ul>
          
          <Link href="/register" className="btn-primary" style={{ display: "flex", justifyContent: "center", width: "100%", padding: "1rem", fontSize: "1rem", borderRadius: "12px" }}>
            Start Writing Free
          </Link>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-50px" }} transition={{ duration: 0.7 }}
        style={{ width: "100%", padding: "6rem 2rem", textAlign: "center", borderTop: "1px solid var(--card-border)", backgroundColor: "var(--section-bg)" }}
      >
        <h2 style={{ fontSize: "3.5rem", fontWeight: "bold", marginBottom: "1rem", background: "var(--hero-text)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ready to build your second brain?</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.25rem", marginBottom: "2rem" }}>Start writing today. No credit card required.</p>
        <Link href="/register" className="btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.25rem", borderRadius: "12px" }}>
          Get Started
        </Link>
      </motion.section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
