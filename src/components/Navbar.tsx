"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, sections } from "@/data/portfolio";
import { goTo, openPalette } from "@/lib/ui";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id: string) => {
    setMenuOpen(false);
    goTo(id);
  };

  return (
    <motion.header
      className={`nav ${scrolled || menuOpen ? "scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container nav-inner">
        <button className="logo" onClick={() => navigate("top")} aria-label="Back to top">
          <span className="logo-mark">AS</span>
          <span>{profile.name}</span>
        </button>

        <nav className="nav-links" aria-label="Primary">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => navigate(s.id)}
              className={`nav-link ${active === s.id ? "active" : ""}`}
              aria-current={active === s.id ? "true" : undefined}
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {s.label}
            </button>
          ))}
          <button className="palette-trigger" onClick={openPalette} aria-label="Open command palette">
            Search
            <kbd>Ctrl K</kbd>
          </button>
          <a className="btn btn-primary btn-sm" href={`mailto:${profile.email}`} style={{ marginLeft: 8 }}>
            Hire Me
          </a>
        </nav>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="container" style={{ paddingTop: 12, paddingBottom: 22 }}>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigate(s.id)}
                  className={`mobile-link ${active === s.id ? "active" : ""}`}
                >
                  {s.label}
                </button>
              ))}
              <a
                className="btn btn-primary"
                href={`mailto:${profile.email}`}
                style={{ width: "100%", marginTop: 18 }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
