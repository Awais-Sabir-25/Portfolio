"use client";

import { useEffect } from "react";

export default function FaviconForce() {
  useEffect(() => {
    // Remove every icon link Next.js / Vercel injected
    document
      .querySelectorAll("link[rel='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']")
      .forEach((el) => el.remove());

    // Re-insert ours as the sole favicon
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = "/favicon.svg";
    document.head.appendChild(link);
  }, []);

  return null;
}
