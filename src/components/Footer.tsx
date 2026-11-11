"use client";

import { profile } from "@/data/portfolio";
import { goTo, openPalette } from "@/lib/ui";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="logo-mark" style={{ width: 30, height: 30, fontSize: "0.75rem", borderRadius: 7 }}>
            AS
          </span>
          <span>
            <span style={{ color: "var(--text-secondary)" }}>{profile.name}</span> &copy;{" "}
            {new Date().getFullYear()}
          </span>
        </div>

        <div className="mono" style={{ fontSize: "0.75rem" }}>
          Built with Next.js + TypeScript + Framer Motion
        </div>

        <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <button className="linklike" onClick={openPalette}>
            Commands
          </button>
          <button className="linklike" onClick={() => goTo("top")}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
