"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, sections } from "@/data/portfolio";
import { copyText, goTo } from "@/lib/ui";

type Command = { group: string; label: string; hint?: string; run: () => void };

const commands: Command[] = [
  { group: "Navigate", label: "Back to top", hint: "home", run: () => goTo("top") },
  ...sections.map((s) => ({
    group: "Navigate",
    label: `Go to ${s.label}`,
    hint: `#${s.id}`,
    run: () => goTo(s.id),
  })),
  {
    group: "Actions",
    label: "Copy email address",
    hint: profile.email,
    run: () => copyText(profile.email, "Email"),
  },
  {
    group: "Actions",
    label: "Send me an email",
    hint: "mailto",
    run: () => window.open(`mailto:${profile.email}`, "_self"),
  },
  {
    group: "Actions",
    label: "Open LinkedIn profile",
    hint: "↗",
    run: () => window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
  },
  {
    group: "Actions",
    label: "Download CV (PDF)",
    hint: "↓",
    run: () => window.open(profile.cv, "_blank", "noopener,noreferrer"),
  },
  {
    group: "Actions",
    label: "Copy phone number",
    hint: profile.phone,
    run: () => copyText(profile.phone, "Phone number"),
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const show = useCallback(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((wasOpen) => {
          if (!wasOpen) {
            setQuery("");
            setActive(0);
          }
          return !wasOpen;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("portfolio:palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("portfolio:palette", show);
    };
  }, [show]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint ?? ""} ${c.group}`.toLowerCase().includes(q));
  }, [query]);

  const execute = (cmd: Command | undefined) => {
    if (!cmd) return;
    setOpen(false);
    cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(results[active]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            onKeyDown={onKeyDown}
          >
            <input
              autoFocus
              className="palette-input"
              placeholder="Type a command or search…"
              aria-label="Search commands"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
            />
            <div className="palette-list">
              {results.length === 0 && <div className="palette-empty">No matching commands</div>}
              {results.map((cmd, i) => (
                <div key={cmd.label}>
                  {(i === 0 || results[i - 1].group !== cmd.group) && (
                    <div className="palette-group">{cmd.group}</div>
                  )}
                  <button
                    className={`palette-item ${i === active ? "active" : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => execute(cmd)}
                  >
                    <span>{cmd.label}</span>
                    {cmd.hint && <small>{cmd.hint}</small>}
                  </button>
                </div>
              ))}
            </div>
            <div className="palette-foot">
              <span>
                <kbd>↑</kbd> <kbd>↓</kbd> navigate
              </span>
              <span>
                <kbd>↵</kbd> run
              </span>
              <span>
                <kbd>esc</kbd> close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
