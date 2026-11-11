"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences, skillGroups } from "@/data/portfolio";
import { showExperience, spotlight } from "@/lib/ui";
import { Reveal, SectionHead } from "./Reveal";

const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => ({ ...s, group: g })));

export default function Skills() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState(".NET");

  const q = query.trim().toLowerCase();
  const groups = skillGroups.filter((g) => category === "all" || g.id === category);
  const selected = allSkills.find((s) => s.name === selectedName) ?? allSkills[0];
  const usedIn = experiences.filter((e) => e.tech.includes(selected.name));
  const matchCount = q ? allSkills.filter((s) => s.name.toLowerCase().includes(q)).length : allSkills.length;

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionHead
          index="04"
          tag="skills"
          title="Tech Stack"
          lead="Pick any skill to see which roles I used it in, then jump straight to that role."
        />

        <Reveal>
          <div className="skills-controls">
            <div className="chip-row" role="group" aria-label="Filter by category">
              {[{ id: "all", title: "All" }, ...skillGroups].map((g) => (
                <button
                  key={g.id}
                  className={`pill-btn ${category === g.id ? "active" : ""}`}
                  aria-pressed={category === g.id}
                  onClick={() => setCategory(g.id)}
                >
                  {g.title}
                </button>
              ))}
            </div>
            <input
              className="skills-search"
              type="search"
              placeholder="grep skills…"
              aria-label="Search skills"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {q && (
              <span className="demo-note" aria-live="polite">
                {matchCount} match{matchCount === 1 ? "" : "es"}
              </span>
            )}
          </div>

          <div className="skills-layout">
            <div className="skill-groups">
              <AnimatePresence mode="popLayout" initial={false}>
                {groups.map((g) => (
                  <motion.div
                    key={g.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="card skill-group"
                    onMouseMove={spotlight}
                    style={{ "--c": g.color } as React.CSSProperties}
                  >
                    <div className="skill-group-title">
                      <i />
                      {g.title}
                      <span>{g.skills.length} skills</span>
                    </div>
                    <div className="chip-row" style={{ gap: 8 }}>
                      {g.skills.map((s) => {
                        const dim = q !== "" && !s.name.toLowerCase().includes(q);
                        return (
                          <button
                            key={s.name}
                            className={`skill-btn ${selected.name === s.name ? "selected" : ""} ${
                              dim ? "dim" : ""
                            }`}
                            aria-pressed={selected.name === s.name}
                            onClick={() => setSelectedName(s.name)}
                          >
                            {s.name}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <aside
              className="card skill-panel"
              onMouseMove={spotlight}
              style={{ "--c": selected.group.color } as React.CSSProperties}
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.16 }}
                >
                  <span className="chip">{selected.group.title}</span>
                  <h3 style={{ marginTop: 12 }}>{selected.name}</h3>
                  {selected.note && <p>{selected.note}</p>}
                  {usedIn.length > 0 ? (
                    <>
                      <p>
                        Used in {usedIn.length} role{usedIn.length === 1 ? "" : "s"}. Select one to open it
                        in the timeline.
                      </p>
                      <div className="skill-usage">
                        {usedIn.map((e) => (
                          <button
                            key={e.id}
                            onClick={() => showExperience(e.id)}
                            style={{ "--c": e.color } as React.CSSProperties}
                          >
                            <i />
                            <span>
                              <b>{e.role}</b>
                              <small>
                                {e.companyShort} · {e.period}
                              </small>
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p>Part of my wider toolkit, used outside the headline work listed in my timeline.</p>
                  )}
                </motion.div>
              </AnimatePresence>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
