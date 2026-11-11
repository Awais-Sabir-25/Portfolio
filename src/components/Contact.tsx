"use client";

import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { copyText, spotlight } from "@/lib/ui";
import { Reveal, SectionHead } from "./Reveal";

const icon = (path: ReactNode) => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden>
    {path}
  </svg>
);

const channels = [
  {
    label: "Email",
    value: profile.email,
    color: "#00d4ff",
    href: `mailto:${profile.email}`,
    action: "Send email",
    external: false,
    icon: icon(
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </>,
    ),
  },
  {
    label: "LinkedIn",
    value: profile.linkedinLabel,
    color: "#3b82f6",
    href: profile.linkedin,
    action: "Open profile",
    external: true,
    icon: icon(
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7" strokeLinecap="round" />
      </>,
    ),
  },
  {
    label: "Phone",
    value: profile.phone,
    color: "#10b981",
    href: profile.phoneHref,
    action: "Call",
    external: false,
    icon: icon(
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinejoin="round" />,
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHead
          index="05"
          tag="contact"
          title="Get In Touch"
          lead={`Based in ${profile.location}. The fastest way to reach me is email or LinkedIn.`}
        />

        <Reveal className="contact-grid">
          {channels.map((c) => (
            <div
              key={c.label}
              className="card contact-card"
              onMouseMove={spotlight}
              style={{ "--c": c.color } as React.CSSProperties}
            >
              <div className="contact-icon">{c.icon}</div>
              <div className="contact-label">{c.label}</div>
              <div className="contact-value">{c.value}</div>
              <div className="contact-actions">
                <a
                  className="btn btn-ghost btn-sm"
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {c.action}
                </a>
                <button className="btn btn-ghost btn-sm" onClick={() => copyText(c.value, c.label)}>
                  Copy
                </button>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <div className="card cta" onMouseMove={spotlight}>
            <h3>
              Have a platform to build, migrate or <span className="gradient-text">make smarter</span>?
            </h3>
            <p>
              I&apos;m happy to talk about enterprise backends, workflow automation, AI products, or
              forward-deployed work with your clients.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                Say hello
              </a>
              <a className="btn btn-ghost" href={profile.cv} target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
