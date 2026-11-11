"use client";

import { useEffect, useRef, useState } from "react";
import { education, experiences, profile, sasoLinks, sasoLinksNote, sections, skillGroups } from "@/data/portfolio";
import { goTo } from "@/lib/ui";

type Kind = "cmd" | "out" | "ok" | "err" | "accent" | "head" | "blank";
type Line = { kind: Kind; text: string };

const out = (text: string): Line => ({ kind: "out", text });
const head = (text: string): Line => ({ kind: "head", text });
const blank: Line = { kind: "blank", text: "" };

const HELP: [string, string][] = [
  ["about", "who I am, in a paragraph"],
  ["experience", "career history"],
  ["projects", "what I'm building right now"],
  ["skills", "tech stack by category"],
  ["education", "degree"],
  ["contact", "how to reach me"],
  ["goto <section>", "jump to a section of the page"],
  ["cv", "open my CV (PDF)"],
  ["linkedin", "open my LinkedIn profile"],
  ["clear", "clear the screen"],
];

const COMMAND_NAMES = [
  ...HELP.map(([name]) => name.split(" ")[0]),
  "help",
  "whoami",
  "ls",
  "sudo hire-me",
];

const QUICK = ["help", "about", "experience", "projects", "skills", "contact"];

/** Runs a command and returns the lines to print (null means "clear the screen"). */
function execute(raw: string): Line[] | null {
  const input = raw.trim();
  const [name, ...args] = input.toLowerCase().split(/\s+/);

  switch (name) {
    case "":
      return [];
    case "help":
      return [
        head("Available commands"),
        ...HELP.map(([cmd, desc]) => out(`  ${cmd.padEnd(16)} ${desc}`)),
        blank,
        out("Tip: Tab autocompletes, ↑/↓ walks history."),
      ];
    case "whoami":
      return [
        { kind: "ok", text: profile.handle },
        out(`${profile.currentRole} @ ${profile.company}`),
        out(`${profile.title} · ${profile.subtitle}`),
      ];
    case "about":
      return [out(profile.summary)];
    case "experience":
      return [
        head("Career"),
        ...experiences.map((e) => ({
          kind: (e.current ? "ok" : "out") as Kind,
          text: `  ${e.period.padEnd(22)} ${e.role} · ${e.companyShort}`,
        })),
        blank,
        out("Run 'goto experience' for the details."),
      ];
    case "projects":
      return [
        head("SASO-Maneh"),
        out("  Enterprise platform in Saudi Arabia. Leading the migration of 1,600+ requests and 2,000+ users off the legacy Jeem system."),
        ...sasoLinks.map((l) => out(`  ${l.url}${l.restricted ? " *" : ""}`)),
        out(`  * ${sasoLinksNote}`),
        head("Vantage Board"),
        out("  AI productivity dashboard unifying JIRA, Gmail and Outlook, with AI classification and AI-drafted replies."),
        blank,
        out("Run 'goto projects' to try the interactive demos."),
      ];
    case "skills":
      return skillGroups.flatMap((g) => [
        head(g.title),
        out(`  ${g.skills.map((s) => s.name).join(" · ")}`),
      ]);
    case "education":
      return [head(education.degree), out(`  ${education.school} · ${education.period}`)];
    case "contact":
      return [
        out(`  email     ${profile.email}`),
        out(`  phone     ${profile.phone}`),
        out(`  linkedin  ${profile.linkedinLabel}`),
        out(`  location  ${profile.location}`),
      ];
    case "ls":
      return [{ kind: "accent", text: sections.map((s) => `${s.id}/`).join("   ") }];
    case "goto":
    case "cd": {
      const target = (args[0] ?? "").replace(/[#/]/g, "");
      if (target === "top" || target === "home" || target === "~") {
        goTo("top");
        return [{ kind: "ok", text: "→ top" }];
      }
      const section = sections.find((s) => s.id === target);
      if (!section) {
        return [
          { kind: "err", text: `unknown section: ${target || "(none)"}` },
          out(`try one of: ${sections.map((s) => s.id).join(", ")}`),
        ];
      }
      goTo(section.id);
      return [{ kind: "ok", text: `→ scrolling to ${section.label}` }];
    }
    case "cv":
      window.open(profile.cv, "_blank", "noopener,noreferrer");
      return [{ kind: "ok", text: "Opening CV…" }];
    case "linkedin":
      window.open(profile.linkedin, "_blank", "noopener,noreferrer");
      return [{ kind: "ok", text: "Opening LinkedIn…" }];
    case "email":
      window.open(`mailto:${profile.email}`, "_self");
      return [{ kind: "ok", text: `Opening mail client → ${profile.email}` }];
    case "sudo":
      if (args.join(" ") === "hire-me") {
        window.open(`mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`, "_self");
        return [
          { kind: "accent", text: "[sudo] permission granted." },
          { kind: "ok", text: "Excellent decision. Opening your mail client…" },
        ];
      }
      return [{ kind: "err", text: "Nice try. The only sudo command here is 'sudo hire-me'." }];
    case "clear":
      return null;
    default:
      return [
        { kind: "err", text: `command not found: ${name}` },
        out("Type 'help' to see what's available."),
      ];
  }
}

const INTRO = "whoami";

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [booting, setBooting] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Type the intro command once, then hand the prompt over to the visitor.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= INTRO.length; i++) {
      timers.push(setTimeout(() => setInput(INTRO.slice(0, i)), 500 + i * 90));
    }
    timers.push(
      setTimeout(() => {
        setInput("");
        setLines([
          { kind: "cmd", text: INTRO },
          ...(execute(INTRO) ?? []),
          blank,
          out("This terminal is live. Type 'help' or tap a command below."),
        ]);
        setBooting(false);
      }, 500 + INTRO.length * 90 + 350),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    if (booting) return;
    const result = execute(raw);
    if (result === null) setLines([]);
    else setLines((prev) => [...prev, { kind: "cmd", text: raw }, ...result]);
    if (raw.trim()) setHistory((h) => [...h, raw.trim()]);
    setHistoryIdx(-1);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
    } else if (e.key === "Tab") {
      const q = input.trim().toLowerCase();
      if (!q) return;
      const match = COMMAND_NAMES.find((c) => c.startsWith(q) && c !== q);
      if (match) {
        e.preventDefault();
        setInput(match);
      }
    } else if (e.key === "ArrowUp") {
      if (!history.length) return;
      e.preventDefault();
      const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      if (historyIdx === -1) return;
      e.preventDefault();
      const idx = historyIdx + 1;
      if (idx >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="terminal"
      onClick={() => {
        // Don't steal focus while the visitor is selecting output text.
        if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
      }}
    >
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: "#ff5f57" }} />
        <div className="terminal-dot" style={{ background: "#febc2e" }} />
        <div className="terminal-dot" style={{ background: "#28c840" }} />
        <span className="terminal-title">awais@portfolio: ~</span>
      </div>

      <div ref={bodyRef} className="terminal-body" aria-live="polite">
        {lines.map((line, i) =>
          line.kind === "blank" ? (
            <div key={i} style={{ height: 8 }} />
          ) : line.kind === "cmd" ? (
            <div key={i} className="t-line">
              <span className="t-prompt">$ </span>
              <span className="t-cmd">{line.text}</span>
            </div>
          ) : (
            <div key={i} className={`t-line t-${line.kind}`}>
              {line.text}
            </div>
          ),
        )}
        <div className="terminal-input-row">
          <span className="t-prompt">$</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            readOnly={booting}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={booting ? "" : "type a command…"}
            aria-label="Terminal input"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </div>

      <div className="terminal-chips">
        {QUICK.map((cmd) => (
          <button
            key={cmd}
            className="terminal-chip"
            onClick={(e) => {
              e.stopPropagation();
              run(cmd);
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
