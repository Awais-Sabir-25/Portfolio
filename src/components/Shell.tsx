"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import CommandPalette from "./CommandPalette";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden />;
}

function Toaster() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2400);
    };
    window.addEventListener("portfolio:toast", onToast);
    return () => {
      window.removeEventListener("portfolio:toast", onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          role="status"
          initial={{ opacity: 0, y: 16, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 16, x: "-50%" }}
          transition={{ duration: 0.2 }}
        >
          <span style={{ color: "var(--accent-green)" }}>✓</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      {children}
      <CommandPalette />
      <Toaster />
    </MotionConfig>
  );
}
