"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const contacts = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "awais0.sabir@gmail.com",
    href: "mailto:awais0.sabir@gmail.com",
    color: "#00d4ff",
    desc: "Best way to reach me",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+92 (321) 9844654",
    href: "tel:+923219844654",
    color: "#10b981",
    desc: "Available during business hours",
  },
  {
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/awais-sabir-dev",
    href: "https://www.linkedin.com/in/awais-sabir-dev",
    color: "#7c3aed",
    desc: "Connect professionally",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: "100px 0 120px", position: "relative" }}
    >
      {/* Top separator */}
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
          style={{ marginBottom: "24px" }}
        >
          <span className="section-tag">04 / contact</span>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#e2e8f0",
              marginTop: "12px",
            }}
          >
            Get In Touch
          </h2>
          <div className="section-line" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{
            color: "#64748b",
            fontSize: "1rem",
            lineHeight: 1.7,
            maxWidth: "540px",
            marginBottom: "52px",
          }}
        >
          I&apos;m open to new opportunities, collaborations, or just a good
          technical conversation. Whether you have a project in mind or want to
          chat about engineering — my inbox is always open.
        </motion.p>

        {/* Contact cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.label === "LinkedIn" ? "_blank" : undefined}
              rel={c.label === "LinkedIn" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ x: 6, borderColor: c.color + "60" }}
              className="contact-card"
              style={{
                border: "1px solid #1e2d3d",
                borderRadius: "12px",
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                textDecoration: "none",
                background: "#0f1923",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  background: `${c.color}12`,
                  border: `1px solid ${c.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: c.color,
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#475569",
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "2px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    color: "#e2e8f0",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    marginBottom: "2px",
                  }}
                >
                  {c.value}
                </div>
                <div style={{ color: "#475569", fontSize: "0.82rem" }}>
                  {c.desc}
                </div>
              </div>
              <div style={{ color: "#2d4a6a", flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            marginTop: "52px",
            padding: "36px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)",
            border: "1px solid rgba(0, 212, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem",
              color: "#475569",
              marginBottom: "12px",
            }}
          >
            // let&apos;s_build_something_great.sh
          </div>
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: "#e2e8f0",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            Ready to collaborate?
          </h3>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "24px" }}>
            Drop me a line and let&apos;s discuss your next project.
          </p>
          <motion.a
            href="mailto:awais0.sabir@gmail.com"
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(0, 212, 255, 0.25)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-block",
              padding: "12px 32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            Send a Message
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
