"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  index,
  tag,
  title,
  lead,
}: {
  index: string;
  tag: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="section-head">
      <span className="section-tag">
        {index} / {tag}
      </span>
      <h2 className="section-title">{title}</h2>
      <div className="section-line" />
      {lead && <p className="section-lead">{lead}</p>}
    </Reveal>
  );
}
