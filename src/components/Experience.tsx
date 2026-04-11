"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const experiences = [
  {
    id: 1,
    role: "Software Engineer II",
    company: "AZM Development",
    period: "July 2025 – Present",
    type: "current",
    color: "#10b981",
    icon: "⚡",
    bullets: [
      "Integrated Camunda 8 Workflow with the .NET backend on SASO-Maneh via the Zeebe .NET client, automating 10+ critical business processes end-to-end.",
      "Implemented RabbitMQ for message brokering and notifications publishing, decoupling 5+ services across the application and improving reliability.",
      "Led a team of 8 engineers for a time-boxed feature delivery, coordinating across backend, frontend, and QA to ship on schedule.",
      "Deployed onsite in Saudi Arabia as 1 of 3 engineers (full-stack + BA/QA), triaging and resolving production issues and hot fixes directly with the client.",
    ],
    tech: [".NET", "Angular", "TypeScript", "Camunda 8", "RabbitMQ", "Zeebe .NET Client"],
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "AZM Development",
    period: "Feb 2024 – June 2025",
    type: "past",
    color: "#00d4ff",
    icon: "🔧",
    bullets: [
      "Designed and built 100+ backend APIs in .NET across a 20-person engineering team, covering core business logic for the SASO enterprise platform.",
      "Owned database schema design and optimization across 10+ modules, reducing query execution times by ~40% and improving long-term maintainability.",
      "Developed and maintained complex full-stack features spanning .NET backend services and Angular frontend, contributing to 3+ major product releases.",
      "Created client-facing dashboards and reports for 5+ services using Power BI, enabling data-driven decisions for stakeholders.",
    ],
    tech: [".NET", "Angular", "TypeScript", "JavaScript", "Power BI", "SQL"],
  },
  {
    id: 3,
    role: "Software Developer",
    company: "NASTP (National Aerospace Science & Technology Park)",
    period: "Dec 2023 – Jan 2024",
    type: "past",
    color: "#7c3aed",
    icon: "🛡️",
    bullets: [
      "Contributed to a defence-domain simulation system within a 22-person cross-functional engineering team, working across C++, C#, and MFC.",
      "Diagnosed and resolved performance and logic issues in an existing C++ codebase, improving stability of critical simulation modules.",
      "Developed and maintained MFC-based desktop UI components, ensuring consistent behaviour across simulation states.",
      "Authored and maintained technical documentation covering module behaviour, integration points, and known constraints.",
    ],
    tech: ["C++", "C#", "MFC", "DirectX", "Unity"],
  },
  {
    id: 4,
    role: "Java Backend Developer",
    company: "Machine Intelligence 6",
    period: "Sept 2023 – Oct 2023",
    type: "past",
    color: "#f59e0b",
    icon: "☕",
    bullets: [
      "Worked across 2 concurrent client projects: a school management system for Army Public School (APS) and a POS system for a retail client.",
      "Designed and built RESTful APIs in Java Spring Boot for the APS platform, handling student data processing, records management, and reporting endpoints.",
      "Developed and integrated backend endpoints for the POS system, including third-party payment integration with Square UP for transaction processing.",
      "Built desktop UI components using Java Swing for internal tooling used alongside the backend services.",
    ],
    tech: ["Java", "Java Spring Boot", "Java Swing", "REST APIs", "Square UP", "HTML"],
  },
  {
    id: 5,
    role: "Java Intern",
    company: "Business Analytics",
    period: "Sept 2022 – Oct 2022",
    type: "past",
    color: "#3b82f6",
    icon: "🌱",
    bullets: [
      "Completed the Sun Certified Java Programmer (SCP) course within a 10+ person team, building a structured foundation in core Java, OOP principles, and the Java Collections Framework.",
      "Implemented a CRUD demo application using Java Servlet, covering full request-response lifecycle, servlet mapping, and basic data persistence.",
      "Participated in team standups and requirement walkthroughs, gaining early exposure to professional software development workflows.",
    ],
    tech: ["Java", "Java Servlet", "OOP", "Java Collections Framework"],
  },
];

function TechTag({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: "100px",
        fontSize: "0.75rem",
        fontWeight: 500,
        fontFamily: "'JetBrains Mono', monospace",
        border: `1px solid ${color}30`,
        color: color,
        background: `${color}10`,
      }}
    >
      {label}
    </span>
  );
}

function ExpCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      style={{ position: "relative", paddingLeft: "40px" }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "28px",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: exp.color,
          border: "2px solid #050a12",
          boxShadow: `0 0 12px ${exp.color}60`,
          zIndex: 2,
          transform: "translateX(-7px)",
        }}
      />

      <div
        className="exp-card"
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        {/* Card top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: `${exp.color}15`,
                border: `1px solid ${exp.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                flexShrink: 0,
              }}
            >
              {exp.icon}
            </div>
            <div>
              <div
                style={{
                  color: "#e2e8f0",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {exp.role}
              </div>
              <div style={{ color: exp.color, fontSize: "0.88rem", fontWeight: 500 }}>
                {exp.company}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#475569",
                }}
              >
                {exp.period}
              </div>
              {exp.type === "current" && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "4px",
                    padding: "2px 8px",
                    borderRadius: "100px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    fontSize: "0.7rem",
                    color: "#10b981",
                  }}
                >
                  <div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#10b981",
                    }}
                  />
                  Current
                </div>
              )}
            </div>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
                border: "1px solid #2d4a6a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#475569",
                transition: "transform 0.2s ease",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingTop: "16px", borderTop: "1px solid #1e2d3d", marginTop: "16px" }}>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: "12px",
                        color: "#94a3b8",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                        marginBottom: "10px",
                      }}
                    >
                      <span style={{ color: exp.color, flexShrink: 0, marginTop: "4px" }}>▹</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {exp.tech.map((t) => (
                    <TechTag key={t} label={t} color={exp.color} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: "100px 0",
        position: "relative",
      }}
    >
      {/* Subtle separator */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "80px",
          background: "linear-gradient(180deg, transparent, #1e2d3d)",
        }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <span className="section-tag">02 / experience</span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#e2e8f0",
              marginTop: "12px",
            }}
          >
            Work History
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "7px",
              top: "28px",
              bottom: "0",
              width: "1px",
              background: "linear-gradient(180deg, #00d4ff, #7c3aed, #1e2d3d)",
              opacity: 0.4,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {experiences.map((exp, i) => (
              <ExpCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
