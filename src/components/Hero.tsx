"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile, roles } from "@/data/portfolio";
import { goTo, openPalette } from "@/lib/ui";
import ParticleField from "./ParticleField";
import Terminal from "./Terminal";

function useTypewriter(strings: string[], typeSpeed = 70, deleteSpeed = 35, pause = 1900) {
  const [sIdx, setSIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[sIdx];
    let delay = deleting ? deleteSpeed : typeSpeed;
    let step: () => void;

    if (!deleting && cIdx < current.length) step = () => setCIdx((c) => c + 1);
    else if (!deleting) {
      delay = pause;
      step = () => setDeleting(true);
    } else if (cIdx > 0) step = () => setCIdx((c) => c - 1);
    else {
      step = () => {
        setDeleting(false);
        setSIdx((s) => (s + 1) % strings.length);
      };
    }

    const timer = setTimeout(step, delay);
    return () => clearTimeout(timer);
  }, [cIdx, deleting, sIdx, strings, typeSpeed, deleteSpeed, pause]);

  return strings[sIdx].slice(0, cIdx);
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55 },
});

export default function Hero() {
  const role = useTypewriter(roles);

  return (
    <section className="hero">
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} aria-hidden />
      <ParticleField />
      <div className="hero-fade" aria-hidden />

      <div className="container hero-grid">
        <div>
          <motion.div {...fadeUp(0.15)} className="hero-badge">
            <span className="live-dot" />
            {profile.currentRole} @ {profile.company}
          </motion.div>

          <motion.h1 {...fadeUp(0.25)} className="hero-name">
            Awais <span className="gradient-text">Sabir</span>
          </motion.h1>

          <motion.div {...fadeUp(0.35)} className="hero-role" aria-label={roles.join(", ")}>
            <span style={{ color: "var(--accent-cyan)" }}>&gt; </span>
            <span aria-hidden>{role}</span>
            <span className="cursor-blink" aria-hidden />
          </motion.div>

          <motion.p {...fadeUp(0.45)} className="hero-copy">
            I build enterprise platforms in <strong>.NET</strong> and <strong>Angular</strong>, and now ship{" "}
            <strong>AI products</strong> on top of them. Currently leading the{" "}
            <strong>SASO-Maneh</strong> migration in Saudi Arabia and building <strong>Vantage Board</strong>,
            an AI productivity dashboard.
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="hero-actions">
            <button className="btn btn-primary" onClick={() => goTo("projects")}>
              See what I&apos;m building
            </button>
            <a className="btn btn-ghost" href={profile.cv} target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download CV
            </a>
            <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
              Get in touch
            </a>
          </motion.div>

          <motion.div {...fadeUp(0.7)} className="hero-hint">
            <span>Try the terminal, or press</span>
            <button
              onClick={openPalette}
              style={{ background: "none", border: "none", padding: 0 }}
              aria-label="Open command palette"
            >
              <kbd>Ctrl</kbd> <kbd>K</kbd>
            </button>
            <span>to jump anywhere.</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
          style={{ minWidth: 0 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
