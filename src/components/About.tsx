"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { animate, useInView } from "framer-motion";
import { education, profile, stats, type Stat } from "@/data/portfolio";
import { spotlight } from "@/lib/ui";
import { Reveal, SectionHead } from "./Reveal";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{value.toLocaleString("en-US")}</span>;
}

function StatCard({ stat }: { stat: Stat }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    spotlight(e);
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${(-py * 10).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg) translateZ(4px)`;
  };

  return (
    <div
      className="card stat-card"
      onMouseMove={onMove}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
    >
      <div className="stat-value gradient-text">
        {stat.prefix}
        <Counter value={stat.value} />
        {stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-detail">{stat.detail}</div>
    </div>
  );
}

const facts: [string, string][] = [
  ["location", `"${profile.location}"`],
  ["role", `"${profile.currentRole} @ ${profile.company}"`],
  ["focus", '["AI Full Stack", "Forward Deployed"]'],
  ["stack", '[".NET", "Angular", "Camunda 8", "RabbitMQ"]'],
  ["languages", '["Urdu", "English"]'],
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead index="01" tag="about" title="Who I Am" />

        <div className="about-grid">
          <Reveal className="about-text">
            <p>
              I&apos;m a <strong>Senior Software Engineer</strong> with 3+ years building enterprise
              full-stack applications in .NET and Angular. Today I work at{" "}
              <span className="hl">AZM Development</span> as an <strong>AI Full Stack Engineer</strong> and{" "}
              <strong>Forward Deployed Engineer</strong>.
            </p>
            <p>
              On <strong>SASO-Maneh</strong>, a large-scale enterprise platform in Saudi Arabia, I lead the
              migration workstream, moving 1,600+ requests and 2,000+ users off the legacy Jeem system. I
              work directly with clients: gathering their queries, resolving issues, and turning what they
              need into requirements and technical plans the team can build on.
            </p>
            <p>
              Alongside that I&apos;m building <strong>Vantage Board</strong>, an AI productivity product
              that pulls JIRA, Gmail and Outlook into one actionable view. Before this I delivered 100+
              production REST APIs, automated 10+ business processes with Camunda 8 and RabbitMQ, and led
              an 8-engineer feature team.
            </p>

            <div className="card edu-card" onMouseMove={spotlight}>
              <div className="edu-icon">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden>
                  <path d="M2 9l10-5 10 5-10 5-10-5z" strokeLinejoin="round" />
                  <path d="M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5M22 9v6" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{education.degree}</div>
                <div style={{ color: "var(--accent-cyan)", fontSize: "0.86rem" }}>{education.school}</div>
                <div className="mono" style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: 2 }}>
                  {education.period}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="stats-grid">
              {stats.map((s) => (
                <StatCard key={s.label} stat={s} />
              ))}
            </div>

            <div className="card facts" onMouseMove={spotlight}>
              <div style={{ color: "var(--text-muted)" }}>{"// quick_facts.json"}</div>
              {facts.map(([key, value]) => (
                <div key={key} style={{ whiteSpace: "nowrap" }}>
                  <span style={{ color: "var(--accent-violet)" }}>&quot;{key}&quot;</span>
                  <span style={{ color: "var(--text-muted)" }}>: </span>
                  <span style={{ color: "var(--accent-green)" }}>{value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
