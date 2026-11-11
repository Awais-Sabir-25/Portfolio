import type { MouseEvent } from "react";

/** Feeds the cursor position to the `.card` spotlight gradient. */
export function spotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export function goTo(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** Fire a transient toast (rendered by <Shell />). */
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("portfolio:toast", { detail: message }));
}

export function openPalette() {
  window.dispatchEvent(new Event("portfolio:palette"));
}

/** Ask the Experience section to show a given role, then scroll to it. */
export function showExperience(id: string) {
  window.dispatchEvent(new CustomEvent("portfolio:experience", { detail: id }));
  goTo("experience");
}

export async function copyText(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast(`${label} copied to clipboard`);
  } catch {
    toast(`Couldn't copy. ${label}: ${text}`);
  }
}
