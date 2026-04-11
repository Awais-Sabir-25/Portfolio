"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid #1e2d3d",
        padding: "40px 24px",
        background: "#0d1117",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Left — Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "7px",
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.75rem",
              color: "#fff",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            AS
          </div>
          <span style={{ color: "#475569", fontSize: "0.85rem" }}>
            <span style={{ color: "#94a3b8" }}>Awais Sabir</span> &copy; {year}
          </span>
        </div>

        {/* Center */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: "#2d4a6a",
          }}
        >
          Built with{" "}
          <span style={{ color: "#475569" }}>Next.js</span>
          {" + "}
          <span style={{ color: "#475569" }}>TypeScript</span>
          {" + "}
          <span style={{ color: "#475569" }}>Framer Motion</span>
        </div>

        {/* Right — Links */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <motion.a
            href="https://www.linkedin.com/in/awais-sabir-dev"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: "#00d4ff", y: -2 }}
            style={{
              color: "#475569",
              textDecoration: "none",
              fontSize: "0.82rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              transition: "color 0.2s ease",
            }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </motion.a>
          <motion.a
            href="mailto:awais0.sabir@gmail.com"
            whileHover={{ color: "#00d4ff", y: -2 }}
            style={{
              color: "#475569",
              textDecoration: "none",
              fontSize: "0.82rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              transition: "color 0.2s ease",
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
