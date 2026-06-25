"use client";

import { useState } from "react";
import { logoutUser } from "@/actions/auth.actions";
import { User, Mail, Shield, LogOut, Download, Moon, Lock } from "lucide-react";
import ConfirmModal from "@/components/ConfirmModal";
import { motion } from "framer-motion";

interface SettingsClientProps {
  user: {
    name: string;
    email: string;
    createdAt: string;
  }
}

export default function SettingsClient({ user }: SettingsClientProps) {
  const [loading, setLoading] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    setIsLogoutModalOpen(false);
    setLoading(true);
    await logoutUser();
  };

  const memberSinceDate = new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const cardStyle = {
    backgroundColor: "var(--theme-card)",
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--theme-border)",
    padding: "2rem",
    boxShadow: "var(--shadow-md)",
    marginBottom: "2rem"
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      
      {/* Profile Section */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid var(--theme-border)" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
            <User size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--theme-text-primary)" }}>Your Profile</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--theme-text-secondary)" }}>Personal information</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div className="grid-1-2" style={{ alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "0.875rem", color: "var(--theme-text-secondary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <User size={16} /> Name
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--theme-text-primary)", fontWeight: 500 }}>{user.name}</span>
              <button disabled style={{ fontSize: "0.75rem", padding: "0.4rem 0.8rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--theme-bg)", color: "var(--theme-text-secondary)", border: "1px solid var(--theme-border)", cursor: "not-allowed" }}>Coming Soon</button>
            </div>
          </div>

          <div className="grid-1-2" style={{ alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "0.875rem", color: "var(--theme-text-secondary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Mail size={16} /> Email
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--theme-text-primary)", fontWeight: 500 }}>{user.email}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--accent)", backgroundColor: "rgba(16, 185, 129, 0.1)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>Verified</span>
            </div>
          </div>

          <div className="grid-1-2" style={{ alignItems: "center", gap: "1rem" }}>
            <div style={{ fontSize: "0.875rem", color: "var(--theme-text-secondary)", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Shield size={16} /> Account Status
            </div>
            <div style={{ color: "var(--theme-text-primary)", fontWeight: 500 }}>
              Member since {memberSinceDate}
            </div>
          </div>
          
        </div>
      </div>

      {/* Security & Preferences */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid var(--theme-border)" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(139, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6" }}>
            <Lock size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--theme-text-primary)" }}>Security & Preferences</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--theme-text-secondary)" }}>Manage passwords and data</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "var(--theme-text-primary)", fontWeight: 600, marginBottom: "0.25rem" }}>Change Password</div>
              <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem" }}>Update your account password securely.</div>
            </div>
            <button disabled style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--theme-bg)", color: "var(--theme-text-secondary)", border: "1px solid var(--theme-border)", fontSize: "0.875rem", fontWeight: 500, cursor: "not-allowed" }}>
              Coming Soon
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "var(--theme-text-primary)", fontWeight: 600, marginBottom: "0.25rem" }}>Export Data</div>
              <div style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem" }}>Download a copy of all your journal entries.</div>
            </div>
            <button disabled style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "var(--theme-bg)", color: "var(--theme-text-secondary)", border: "1px solid var(--theme-border)", fontSize: "0.875rem", fontWeight: 500, cursor: "not-allowed" }}>
              <Download size={16} /> Export
            </button>
          </div>

        </div>
      </div>

      {/* Danger Zone */}
      <div style={{ ...cardStyle, border: "1px solid rgba(239, 68, 68, 0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--danger)" }}>Danger Zone</h2>
        </div>
        
        <p style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", marginBottom: "2rem" }}>
          Logging out will clear your current session. You will need to enter your password next time you wish to access your encrypted diary.
        </p>
        
        <button 
          onClick={() => setIsLogoutModalOpen(true)} 
          disabled={loading}
          style={{ width: "100%", padding: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", backgroundColor: "rgba(239, 68, 68, 0.1)", color: "var(--danger)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "var(--radius-lg)", fontSize: "1rem", fontWeight: 600, cursor: "pointer", transition: "all var(--transition-fast)" }}
          className="hover-lift"
        >
          <LogOut size={18} /> {loading ? "Logging out..." : "Log Out of My Diary"}
        </button>
      </div>

      <ConfirmModal 
        isOpen={isLogoutModalOpen}
        title="Log Out"
        message="Are you sure you want to log out? You will need to sign back in to view your entries."
        confirmText="Log Out"
        isDestructive={true}
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />

    </motion.div>
  );
}
