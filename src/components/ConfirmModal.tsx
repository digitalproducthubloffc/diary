"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCancel(); }}
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ 
              position: "relative", 
              backgroundColor: "var(--theme-card)", 
              border: "1px solid var(--theme-border)", 
              borderRadius: "var(--radius-xl)", 
              boxShadow: "var(--shadow-xl)", 
              width: "100%", 
              maxWidth: "400px", 
              overflow: "hidden" 
            }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          >
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: isDestructive ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)", color: isDestructive ? "var(--danger)" : "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--theme-text-primary)", marginBottom: "0.5rem" }}>
                    {title}
                  </h3>
                  <p style={{ color: "var(--theme-text-secondary)", fontSize: "0.875rem", lineHeight: 1.5 }}>
                    {message}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button 
                  onClick={onCancel}
                  style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "transparent", color: "var(--theme-text-secondary)", border: "1px solid var(--theme-border)", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "all var(--transition-fast)" }}
                  className="hover-bg-accent"
                >
                  {cancelText}
                </button>
                <button 
                  onClick={onConfirm}
                  style={{ padding: "0.5rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: isDestructive ? "var(--danger)" : "var(--theme-text-primary)", color: isDestructive ? "white" : "var(--theme-bg)", border: "none", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", transition: "all var(--transition-fast)" }}
                  className="hover-lift"
                >
                  {confirmText}
                </button>
              </div>
            </div>
            
            <button 
              onClick={onCancel}
              style={{ position: "absolute", top: "1rem", right: "1rem", color: "var(--theme-text-secondary)", backgroundColor: "transparent", border: "none", cursor: "pointer", padding: "0.25rem", borderRadius: "var(--radius-sm)" }}
              className="hover-bg-accent"
            >
              <X size={16} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
