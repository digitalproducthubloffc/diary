"use client";
import { useEditor } from "./EditorContext";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlashCommandMenu from "./SlashCommandMenu";

const PROMPTS = [
  "What happened today?",
  "What surprised you today?",
  "What's on your mind?",
  "Describe today in three words.",
  "What are you grateful for?",
  "What's one thing you learned?"
];

export default function EditorContent() {
  const { title, setTitle, content, setContent } = useEditor();
  const [formattedDate, setFormattedDate] = useState({ day: "", full: "", time: "" });
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [showSlash, setShowSlash] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("☀ Morning");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const today = new Date();
    setFormattedDate({
      day: today.toLocaleDateString('en-US', { weekday: 'long' }),
      full: today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: today.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    });
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    
    // Slash command trigger
    if (val.endsWith("\n/") || val === "/") {
      setShowSlash(true);
    } else {
      setShowSlash(false);
    }
  };

  const handleSlashSelect = (prefix: string) => {
    // replace the trailing '/' with the command prefix
    const newContent = content.slice(0, -1) + prefix;
    setContent(newContent);
    setShowSlash(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const TIME_OPTIONS = ["☀ Morning", "🌤 Afternoon", "🌆 Evening", "🌙 Night"];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ width: "100%", maxWidth: "var(--editor-width)", display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "4rem" }}
    >
      <AnimatePresence>
        {showSlash && <SlashCommandMenu onSelect={handleSlashSelect} />}
      </AnimatePresence>

      {/* Date & Timeline */}
      <motion.div variants={itemVariants as any} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <div style={{ position: "relative", color: "var(--theme-text-secondary)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          
          {/* Custom Time Picker */}
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => setShowTimePicker(!showTimePicker)}
              style={{ background: "transparent", border: "none", color: "inherit", fontSize: "inherit", fontWeight: "inherit", textTransform: "inherit", letterSpacing: "inherit", padding: 0, cursor: "pointer" }}
              className="hover-opacity"
            >
              {timeOfDay}
            </button>
            
            <AnimatePresence>
              {showTimePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  style={{ position: "absolute", top: "100%", left: 0, marginTop: "0.5rem", backgroundColor: "var(--theme-card)", border: "1px solid var(--theme-border)", borderRadius: "var(--radius-md)", padding: "0.25rem", zIndex: 50, boxShadow: "var(--shadow-lg)", display: "flex", flexDirection: "column" }}
                >
                  {TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setTimeOfDay(opt); setShowTimePicker(false); }}
                      style={{ padding: "0.5rem 1rem", textAlign: "left", background: "transparent", border: "none", color: "var(--theme-text-primary)", fontSize: "0.75rem", fontWeight: 600, borderRadius: "var(--radius-sm)", cursor: "pointer", whiteSpace: "nowrap" }}
                      className="hover-bg-accent"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          • <span>{formattedDate.time}</span>
        </div>
        <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>
          <span style={{ color: "var(--accent)" }}>{formattedDate.day}</span>
          <br/>
          <span style={{ color: "var(--theme-text-secondary)" }}>{formattedDate.full}</span>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div variants={itemVariants}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={prompt}
          style={{
            fontSize: "clamp(2rem, 8vw, 44px)",
            lineHeight: 1.2,
            fontWeight: "bold",
            letterSpacing: "-0.02em",
            color: "var(--theme-text-primary)",
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            padding: 0,
            fontFamily: "var(--font-inter)",
            width: "100%"
          }}
          className="title-input"
        />
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants} style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          placeholder="Every great story starts with one sentence..."
          style={{
            flex: 1,
            minHeight: "50vh",
            paddingBottom: "50vh", // Typewriter mode: pad the bottom so you can scroll past it
            fontSize: "clamp(18px, 5vw, 20px)",
            lineHeight: "2.0",
            color: "var(--theme-text-primary)",
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            padding: 0,
            fontFamily: "var(--font-newsreader)",
            resize: "none",
            width: "100%"
          }}
        />
        {content.length === 0 && (
          <div style={{ position: "absolute", top: "2px", left: "370px", pointerEvents: "none" }}>
            <span className="typewriter-cursor" style={{ height: "1.2em", backgroundColor: "var(--accent)" }} />
          </div>
        )}
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        .title-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        [data-theme='paper'] .title-input::placeholder,
        [data-theme='sepia'] .title-input::placeholder {
          color: rgba(0, 0, 0, 0.3);
        }
      `}} />
    </motion.div>
  );
}
