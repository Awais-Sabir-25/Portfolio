"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 2, suffix: "+", label: "Years Experience", icon: "📅" },
  { value: 100, suffix: "+", label: "APIs Built", icon: "⚡" },
  { value: 8, suffix: "", label: "Engineers Led", icon: "👥" },
  { value: 3, suffix: "+", label: "Major Releases", icon: "🚀" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "120px 0 80px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <span className="section-tag">01 / about</span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#e2e8f0",
              marginTop: "12px",
            }}
          >
            Who I Am
          </h2>
          <div className="section-line" />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              style={{
                color: "#94a3b8",
                lineHeight: 1.85,
                fontSize: "1.05rem",
                marginBottom: "24px",
              }}
            >
              I&apos;m a{" "}
              <span style={{ color: "#e2e8f0", fontWeight: 600 }}>
                Full-Stack Software Engineer II
              </span>{" "}
              with expertise in building enterprise-grade applications. Currently
              at{" "}
              <span style={{ color: "#00d4ff" }}>AZM Development</span>, I lead
              backend architecture and workflow automation for the{" "}
              <span style={{ color: "#e2e8f0" }}>SASO-Maneh</span> enterprise
              platform in Saudi Arabia.
            </p>
            <p
              style={{
                color: "#64748b",
                lineHeight: 1.85,
                fontSize: "1rem",
                marginBottom: "32px",
              }}
            >
              I specialize in{" "}
              <span style={{ color: "#94a3b8" }}>
                .NET backend services, Angular frontends
              </span>
              , and{" "}
              <span style={{ color: "#94a3b8" }}>
                distributed systems design
              </span>
              . I&apos;ve integrated{" "}
              <span style={{ color: "#7c3aed" }}>Camunda 8 workflows</span> to
              automate 10+ critical business processes end-to-end, and
              implemented{" "}
              <span style={{ color: "#7c3aed" }}>RabbitMQ</span> to decouple
              services and improve system reliability at scale.
            </p>

            {/* Education card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                background: "#0f1923",
                border: "1px solid #1e2d3d",
                borderRadius: "12px",
                padding: "20px 24px",
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(0, 212, 255, 0.1)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.3rem",
                  flexShrink: 0,
                }}
              >
                🎓
              </div>
              <div>
                <div
                  style={{
                    color: "#e2e8f0",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    marginBottom: "3px",
                  }}
                >
                  Bachelors in Computer Science
                </div>
                <div style={{ color: "#00d4ff", fontSize: "0.85rem" }}>
                  FAST-NUCES, Islamabad
                </div>
                <div
                  style={{
                    color: "#475569",
                    fontSize: "0.8rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    marginTop: "2px",
                  }}
                >
                  Aug 2019 – June 2023
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="stat-card"
                >
                  <div style={{ fontSize: "1.6rem", marginBottom: "8px" }}>
                    {s.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      background:
                        "linear-gradient(135deg, #00d4ff, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: "0.82rem",
                      marginTop: "4px",
                    }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{
                background: "#0f1923",
                border: "1px solid #1e2d3d",
                borderRadius: "12px",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.8rem",
                  color: "#475569",
                  marginBottom: "12px",
                  letterSpacing: "0.05em",
                }}
              >
                // quick_facts.json
              </div>
              {[
                { key: "location", value: '"Islamabad, Pakistan"' },
                { key: "current_role", value: '"SE II @ AZM Development"' },
                { key: "languages", value: '["Urdu", "English"]' },
                { key: "open_to_remote", value: "true" },
              ].map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    gap: "8px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.82rem",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ color: "#7c3aed" }}>"{item.key}"</span>
                  <span style={{ color: "#475569" }}>:</span>
                  <span style={{ color: "#10b981" }}>{item.value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
