import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer style={{ width: "100%", padding: "4rem 2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", color: "var(--text-secondary)", borderTop: "1px solid var(--card-border)", backgroundColor: "var(--background)", maxWidth: "1200px", margin: "0 auto" }}>
      <div>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-primary)", marginBottom: "1rem" }}>Private Diary</div>
        <p style={{ marginBottom: "2rem", maxWidth: "250px" }}>A beautifully crafted vault for your deepest thoughts and boldest ideas.</p>
      </div>
      <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>Product</span>
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/changelog">Changelog</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>Company</span>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>Legal</span>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{ fontWeight: "bold", color: "var(--text-primary)" }}>Social</span>
          <Link href="#">Twitter</Link>
          <Link href="#">GitHub</Link>
          <Link href="#">Discord</Link>
        </div>
      </div>
      <div style={{ width: "100%", borderTop: "1px solid var(--card-border)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
        <span>© 2026 Private Diary. All rights reserved.</span>
        <span>Status: All systems operational</span>
      </div>
    </footer>
  );
}
