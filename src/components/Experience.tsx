"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/data/portfolio";
import { spotlight } from "@/lib/ui";
import { Reveal, SectionHead } from "./Reveal";

export default function Experience() {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const [project, setProject] = useState("All");

  const select = (id: string) => {
    setActiveId(id);
    setProject("All");
  };

  // Lets the Skills section deep-link to a role.
  useEffect(() => {
    const onShow = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (experiences.some((x) => x.id === id)) {
        setActiveId(id);
        setProject("All");
      }
    };
    window.addEventListener("portfolio:experience", onShow);
    return () => window.removeEventListener("portfolio:experience", onShow);
  }, []);

  const exp = experiences.find((e) => e.id === activeId) ?? experiences[0];
  const projectNames = Array.from(new Set(exp.bullets.flatMap((b) => (b.project ? [b.project] : []))));
  const bullets = exp.bullets.filter((b) => project === "All" || b.project === project);

  const onRailKey = (e: React.KeyboardEvent) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const idx = experiences.findIndex((x) => x.id === activeId);
    const next = experiences[(idx + dir + experiences.length) % experiences.length];
    select(next.id);
    document.getElementById(`exp-tab-${next.id}`)?.focus();
  };

  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHead
          index="03"
          tag="experience"
          title="Career Timeline"
          lead="From Java intern to Senior Software Engineer. Pick a role to see what I did there."
        />

        <Reveal className="exp-layout">
          <div className="exp-rail" role="tablist" aria-label="Roles" onKeyDown={onRailKey}>
            {experiences.map((e) => (
              <button
                key={e.id}
                id={`exp-tab-${e.id}`}
                role="tab"
                aria-selected={e.id === activeId}
                tabIndex={e.id === activeId ? 0 : -1}
                className={`exp-tab ${e.id === activeId ? "active" : ""}`}
                style={{ "--c": e.color } as React.CSSProperties}
                onClick={() => select(e.id)}
              >
                <span className="exp-node" />
                <span>
                  <span className="exp-tab-role">{e.role}</span>
                  <span className="exp-tab-meta" style={{ display: "block" }}>
                    {e.companyShort} · {e.period}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div
            className="card exp-panel"
            role="tabpanel"
            onMouseMove={spotlight}
            style={{ "--c": exp.color } as React.CSSProperties}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                <div className="exp-panel-top">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    {exp.note && <div className="exp-note">{exp.note}</div>}
                    <div className="exp-company">{exp.company}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    {exp.current && (
                      <span className="chip" style={{ "--c": "#10b981" } as React.CSSProperties}>
                        <span className="live-dot" style={{ width: 6, height: 6 }} /> current
                      </span>
                    )}
                    <span className="chip" style={{ "--c": "#94a3b8" } as React.CSSProperties}>
                      {exp.period}
                    </span>
                  </div>
                </div>

                {projectNames.length > 1 && (
                  <div className="exp-filter" aria-label="Filter by project">
                    {["All", ...projectNames].map((p) => (
                      <button
                        key={p}
                        className={`pill-btn ${project === p ? "active" : ""}`}
                        aria-pressed={project === p}
                        onClick={() => setProject(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}

                <ul className="exp-bullets">
                  {bullets.map((b, i) => (
                    <motion.li
                      key={b.text}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.25 }}
                    >
                      <span>
                        {b.project && <span className="exp-proj">{b.project}: </span>}
                        {b.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div className="chip-row">
                  {exp.tech.map((t) => (
                    <span key={t} className="chip" style={{ "--c": exp.color } as React.CSSProperties}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
