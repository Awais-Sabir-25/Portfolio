"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    title: "Backend",
    icon: "⚙️",
    color: "#00d4ff",
    skills: [
      { name: ".NET / C#", level: 95 },
      { name: "Java Spring Boot", level: 78 },
      { name: "Node.js", level: 75 },
      { name: "REST API Design", level: 92 },
      { name: "SQL", level: 88 },
    ],
  },
  {
    title: "Frontend",
    icon: "🎨",
    color: "#7c3aed",
    skills: [
      { name: "Angular", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "React JS", level: 78 },
      { name: "JavaScript", level: 85 },
      { name: "HTML / CSS", level: 82 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "🔧",
    color: "#f59e0b",
    skills: [
      { name: "Camunda 8 / Zeebe", level: 85 },
      { name: "RabbitMQ", level: 82 },
      { name: "Git", level: 90 },
      { name: "Power BI", level: 75 },
      { name: "MongoDB", level: 72 },
    ],
  },
  {
    title: "Languages & Other",
    icon: "💻",
    color: "#10b981",
    skills: [
      { name: "C / C++", level: 78 },
      { name: "Python", level: 65 },
      { name: "Java", level: 80 },
      { name: "Java Swing", level: 68 },
      { name: "C# / MFC", level: 75 },
    ],
  },
];

const techBadges = [
  { name: ".NET", color: "#00d4ff" },
  { name: "C#", color: "#00d4ff" },
  { name: "Angular", color: "#7c3aed" },
  { name: "React JS", color: "#7c3aed" },
  { name: "TypeScript", color: "#7c3aed" },
  { name: "JavaScript", color: "#7c3aed" },
  { name: "Node.js", color: "#10b981" },
  { name: "MongoDB", color: "#10b981" },
  { name: "SQL", color: "#10b981" },
  { name: "Camunda 8", color: "#f59e0b" },
  { name: "RabbitMQ", color: "#f59e0b" },
  { name: "Zeebe .NET Client", color: "#f59e0b" },
  { name: "Power BI", color: "#f59e0b" },
  { name: "Git", color: "#f59e0b" },
  { name: "Java", color: "#3b82f6" },
  { name: "Java Spring Boot", color: "#3b82f6" },
  { name: "C/C++", color: "#3b82f6" },
  { name: "Python", color: "#3b82f6" },
  { name: "HTML/CSS", color: "#3b82f6" },
  { name: "DirectX", color: "#94a3b8" },
  { name: "Unity", color: "#94a3b8" },
  { name: "Java Swing", color: "#94a3b8" },
];

function SkillBar({
  name,
  level,
  color,
  delay,
  inView,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <span style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 500 }}>
          {name}
        </span>
        <span
          style={{
            color: "#475569",
            fontSize: "0.75rem",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: "4px",
          background: "#1e2d3d",
          borderRadius: "100px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          style={{
            height: "100%",
            borderRadius: "100px",
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}

function SkillGroupCard({
  group,
  index,
  inView,
}: {
  group: (typeof skillGroups)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      style={{
        background: "#0f1923",
        border: "1px solid #1e2d3d",
        borderRadius: "14px",
        padding: "28px",
        transition: "border-color 0.3s ease, transform 0.3s ease",
      }}
      whileHover={{ borderColor: group.color + "40", y: -3 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: `${group.color}12`,
            border: `1px solid ${group.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.3rem",
          }}
        >
          {group.icon}
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
            {group.title}
          </div>
          <div
            style={{
              width: "28px",
              height: "2px",
              borderRadius: "1px",
              background: group.color,
              marginTop: "4px",
            }}
          />
        </div>
      </div>

      {group.skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          color={group.color}
          delay={0.2 + index * 0.1 + i * 0.07}
          inView={inView}
        />
      ))}
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: "100px 0", position: "relative" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <span className="section-tag">03 / skills</span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#e2e8f0",
              marginTop: "12px",
            }}
          >
            Tech Stack
          </h2>
          <div className="section-line" />
        </motion.div>

        {/* Skill groups grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            marginBottom: "64px",
          }}
          className="skills-grid"
        >
          {skillGroups.map((group, i) => (
            <SkillGroupCard key={group.title} group={group} index={i} inView={inView} />
          ))}
        </div>

        {/* All tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                color: "#475569",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              // full_tech_list
            </span>
          </div>
          <motion.div
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.04, delayChildren: 0.6 },
              },
            }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {techBadges.map((badge) => (
              <motion.span
                key={badge.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 10 },
                  show: { opacity: 1, scale: 1, y: 0 },
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                style={{
                  padding: "6px 14px",
                  borderRadius: "100px",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  fontFamily: "'JetBrains Mono', monospace",
                  border: `1px solid ${badge.color}28`,
                  color: badge.color,
                  background: `${badge.color}0e`,
                  cursor: "default",
                  transition: "all 0.2s ease",
                }}
              >
                {badge.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
