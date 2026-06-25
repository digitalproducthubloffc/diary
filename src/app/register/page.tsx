"use client";

import { useState } from "react";
import { registerUser } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await registerUser(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div className="card" style={{ width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <h1 style={{ fontSize: "2rem", textAlign: "center", marginBottom: "1rem" }}>Create Account</h1>
        
        {error && <div style={{ color: "var(--accent)", textAlign: "center", padding: "0.5rem", border: "1px solid var(--accent)", borderRadius: "8px" }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--card-border)", backgroundColor: "var(--background)", color: "var(--text-primary)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--card-border)", backgroundColor: "var(--background)", color: "var(--text-primary)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--card-border)", backgroundColor: "var(--background)", color: "var(--text-primary)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--card-border)", backgroundColor: "var(--background)", color: "var(--text-primary)" }} />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: "1rem" }}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "var(--text-secondary)", marginTop: "1rem" }}>
          Already have an account? <Link href="/login" style={{ color: "var(--accent)" }}>Sign In</Link>
        </p>
      </div>
    </main>
  );
}
