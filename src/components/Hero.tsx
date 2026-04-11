"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Software Engineer II",
  "Full-Stack Developer",
  ".NET & Angular Expert",
  "Backend Architect",
];

const terminalLines = [
  { type: "prompt", text: "whoami" },
  { type: "output", text: "awais-sabir" },
  { type: "blank", text: "" },
  { type: "prompt", text: "cat role.txt" },
  { type: "output", text: "Software Engineer II @ AZM Development" },
  { type: "blank", text: "" },
  { type: "prompt", text: "ls tech-stack/" },
  { type: "output", text: ".NET/   Angular/   React/   Node.js/" },
  { type: "output", text: "Camunda8/   RabbitMQ/   TypeScript/   SQL/" },
  { type: "blank", text: "" },
  { type: "prompt", text: "git log --oneline -3" },
  { type: "git", text: "a7b3c2d feat: Camunda 8 workflow automation" },
  { type: "git", text: "3f8e1a0 feat: RabbitMQ message brokering" },
  { type: "git", text: "9c2d4b7 perf: 40% query optimization" },
  { type: "blank", text: "" },
  { type: "prompt", text: "echo $STATUS" },
  { type: "success", text: "Open to opportunities ✓" },
];

function useTypewriter(strings: string[], typeSpeed = 75, deleteSpeed = 40, pause = 2000) {
  const [text, setText] = useState("");
  const [sIdx, setSIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[sIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && cIdx < current.length) {
      timer = setTimeout(() => {
        setText(current.slice(0, cIdx + 1));
        setCIdx((c) => c + 1);
      }, typeSpeed);
    } else if (!deleting && cIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && cIdx > 0) {
      timer = setTimeout(() => {
        setText(current.slice(0, cIdx - 1));
        setCIdx((c) => c - 1);
      }, deleteSpeed);
    } else {
      setDeleting(false);
      setSIdx((s) => (s + 1) % strings.length);
    }

    return () => clearTimeout(timer);
  }, [cIdx, deleting, sIdx, strings, typeSpeed, deleteSpeed, pause]);

  return text;
}

function Terminal() {
  const [visibleLines, setVisibleLines] = useState<typeof terminalLines>([]);
  const [typingLine, setTypingLine] = useState("");
  const [typingIdx, setTypingIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [done, setDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIdx >= terminalLines.length) {
      setDone(true);
      return;
    }

    const line = terminalLines[lineIdx];

    if (line.type === "blank") {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setLineIdx((i) => i + 1);
      }, 120);
      return () => clearTimeout(t);
    }

    if (line.type === "output" || line.type === "git" || line.type === "success") {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setLineIdx((i) => i + 1);
      }, 80);
      return () => clearTimeout(t);
    }

    // prompt line — type it
    if (typingIdx <= line.text.length) {
      if (typingIdx === line.text.length) {
        const t = setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
          setTypingLine("");
          setTypingIdx(0);
          setLineIdx((i) => i + 1);
        }, 150);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setTypingLine(line.text.slice(0, typingIdx + 1));
        setTypingIdx((i) => i + 1);
      }, 55);
      return () => clearTimeout(t);
    }
  }, [lineIdx, typingIdx]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [visibleLines, typingLine]);

  const renderLine = (line: (typeof terminalLines)[0], key: string | number) => {
    if (line.type === "blank") return <div key={key} style={{ height: "8px" }} />;
    if (line.type === "prompt")
      return (
        <div key={key} style={{ display: "flex", gap: "8px" }}>
          <span className="terminal-prompt">$</span>
          <span className="terminal-command">{line.text}</span>
        </div>
      );
    if (line.type === "git")
      return (
        <div key={key} style={{ paddingLeft: "0", color: "#f59e0b", fontFamily: "inherit" }}>
          {line.text}
        </div>
      );
    if (line.type === "success")
      return (
        <div key={key} style={{ color: "#10b981" }}>
          {line.text}
        </div>
      );
    return (
      <div key={key} className="terminal-output">
        {line.text}
      </div>
    );
  };

  return (
    <div className="terminal-window" style={{ width: "100%", maxWidth: "520px" }}>
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: "#ff5f57" }} />
        <div className="terminal-dot" style={{ background: "#febc2e" }} />
        <div className="terminal-dot" style={{ background: "#28c840" }} />
        <span
          style={{
            marginLeft: "12px",
            color: "#475569",
            fontSize: "0.78rem",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          awais@portfolio: ~
        </span>
      </div>
      <div
        ref={bodyRef}
        className="terminal-body"
        style={{ minHeight: "320px", maxHeight: "380px", overflowY: "auto" }}
      >
        {visibleLines.map((line, i) => renderLine(line, i))}
        {!done && lineIdx < terminalLines.length && (
          <div style={{ display: "flex", gap: "8px" }}>
            {terminalLines[lineIdx].type === "prompt" && (
              <>
                <span className="terminal-prompt">$</span>
                <span className="terminal-command">{typingLine}</span>
                <span className="cursor-blink" />
              </>
            )}
          </div>
        )}
        {done && (
          <div style={{ display: "flex", gap: "8px" }}>
            <span className="terminal-prompt">$</span>
            <span className="cursor-blink" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const role = useTypewriter(ROLES);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        className="grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 24px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "100px",
              border: "1px solid rgba(0, 212, 255, 0.25)",
              background: "rgba(0, 212, 255, 0.05)",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#10b981",
                animation: "glowPulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#00d4ff",
                letterSpacing: "0.08em",
              }}
            >
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "8px",
              color: "#e2e8f0",
            }}
          >
            Awais
            <br />
            <span className="gradient-text">Sabir</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              fontWeight: 500,
              color: "#94a3b8",
              marginBottom: "24px",
              minHeight: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ color: "#00d4ff" }}>&gt;</span>{" "}
            <span>{role}</span>
            <span className="cursor-blink" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              color: "#64748b",
              lineHeight: 1.7,
              fontSize: "1rem",
              maxWidth: "460px",
              marginBottom: "40px",
            }}
          >
            Building enterprise-grade systems with{" "}
            <span style={{ color: "#94a3b8" }}>.NET</span>,{" "}
            <span style={{ color: "#94a3b8" }}>Angular</span>, and{" "}
            <span style={{ color: "#94a3b8" }}>MERN Stack</span>. Specializing
            in workflow automation, message brokering, and scalable API design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
          >
            <motion.button
              onClick={scrollToAbout}
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(0, 212, 255, 0.25)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.01em",
              }}
            >
              View My Work
            </motion.button>
            <motion.a
              href="mailto:awais0.sabir@gmail.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 28px",
                borderRadius: "8px",
                background: "transparent",
                color: "#e2e8f0",
                fontWeight: 600,
                fontSize: "0.95rem",
                border: "1px solid #2d4a6a",
                cursor: "pointer",
                textDecoration: "none",
                letterSpacing: "0.01em",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Quick tech preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "40px",
            }}
          >
            {[".NET", "Angular", "TypeScript", "React", "Camunda 8", "RabbitMQ"].map((t) => (
              <span
                key={t}
                style={{
                  padding: "4px 12px",
                  borderRadius: "100px",
                  border: "1px solid #1e2d3d",
                  color: "#475569",
                  fontSize: "0.78rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  background: "rgba(14, 25, 35, 0.5)",
                }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          style={{ display: "flex", justifyContent: "center" }}
          className="terminal-hero"
        >
          <Terminal />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={scrollToAbout}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ color: "#475569", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{
            width: "20px",
            height: "32px",
            borderRadius: "10px",
            border: "1px solid #2d4a6a",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <div style={{ width: "3px", height: "8px", borderRadius: "2px", background: "#00d4ff" }} />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .terminal-hero {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
