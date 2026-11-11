"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "@/lib/ui";

type Source = "JIRA" | "Gmail" | "Outlook";

const sourceColor: Record<Source, string> = {
  JIRA: "#3b82f6",
  Gmail: "#f87171",
  Outlook: "#00d4ff",
};

const labelColor: Record<string, string> = {
  "Action required": "#f59e0b",
  "Needs reply": "#a78bfa",
  FYI: "#64748b",
};

// Mock data for the demo only.
const items: {
  id: number;
  source: Source;
  title: string;
  from: string;
  label: keyof typeof labelColor;
  draft: string | null;
}[] = [
  {
    id: 1,
    source: "JIRA",
    title: "PROJ-482: Export fails for large reports",
    from: "Assigned to you",
    label: "Action required",
    draft:
      "Picking this up now. I can reproduce it with larger reports and will have a fix up for review today.",
  },
  {
    id: 2,
    source: "Gmail",
    title: "Can we move Thursday's demo to Friday?",
    from: "Client project manager",
    label: "Needs reply",
    draft: "Friday works on our side. Does 11:00 suit your team? I'll update the invite once you confirm.",
  },
  {
    id: 3,
    source: "Outlook",
    title: "Reminder: weekly status report due",
    from: "Automated reminder",
    label: "FYI",
    draft: null,
  },
  {
    id: 4,
    source: "Gmail",
    title: "Access request for the staging environment",
    from: "QA engineer",
    label: "Action required",
    draft: "Access granted. You should be able to sign in to staging now. Let me know if anything is missing.",
  },
  {
    id: 5,
    source: "Outlook",
    title: "Sprint review moved to 3 PM",
    from: "Calendar update",
    label: "FYI",
    draft: null,
  },
];

function TypedText({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setN((c) => (c < text.length ? c + 2 : c)), 22);
    return () => clearInterval(timer);
  }, [text]);
  const done = n >= text.length;
  return (
    <>
      {text.slice(0, n)}
      {!done && <span className="cursor-blink" />}
    </>
  );
}

export default function VantageDemo() {
  const [started, setStarted] = useState(false);
  const [classified, setClassified] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [resolved, setResolved] = useState<Record<number, "sent" | "dismissed">>({});

  const classifying = started && classified < items.length;
  const ready = started && !classifying;

  useEffect(() => {
    if (!classifying) return;
    const timer = setTimeout(() => setClassified((c) => c + 1), 420);
    return () => clearTimeout(timer);
  }, [classifying, classified]);

  const selected = items.find((i) => i.id === selectedId) ?? null;
  const handled = Object.keys(resolved).length;

  const resolve = (id: number, how: "sent" | "dismissed") => {
    const next = { ...resolved, [id]: how };
    setResolved(next);
    toast(how === "sent" ? "Reply approved and sent (demo)" : "Item dismissed (demo)");
    const upcoming = items.find((i) => !next[i.id]);
    setSelectedId(upcoming ? upcoming.id : null);
  };

  const reset = () => {
    setStarted(false);
    setClassified(0);
    setSelectedId(null);
    setResolved({});
  };

  return (
    <div className="demo">
      <div className="demo-bar">
        <span className="demo-note">concept demo · mock data, not the product UI</span>
        {!started ? (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              setStarted(true);
              setSelectedId(items[0].id);
            }}
          >
            ✦ Run AI classification
          </button>
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="demo-note">
              {classifying ? "classifying…" : `${handled}/${items.length} handled`}
            </span>
            <button className="btn btn-ghost btn-sm" onClick={reset}>
              Reset
            </button>
          </span>
        )}
      </div>
      {classifying && (
        <motion.div
          className="scan"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: classified / items.length }}
          transition={{ duration: 0.4 }}
        />
      )}

      <div className="demo-body inbox">
        <div className="inbox-list">
          {items.map((item, i) => {
            const isClassified = started && i < classified;
            return (
              <button
                key={item.id}
                className={`inbox-item ${selectedId === item.id ? "selected" : ""} ${
                  resolved[item.id] ? "resolved" : ""
                }`}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="inbox-meta">
                  <span className="src-tag" style={{ "--c": sourceColor[item.source] } as React.CSSProperties}>
                    {item.source}
                  </span>
                  {isClassified && (
                    <motion.span
                      className="chip"
                      style={{ "--c": labelColor[item.label], fontSize: "0.66rem" } as React.CSSProperties}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {resolved[item.id] === "sent" ? "✓ sent" : resolved[item.id] ? "dismissed" : item.label}
                    </motion.span>
                  )}
                </div>
                <div className="inbox-title">{item.title}</div>
                <div className="inbox-from">{item.from}</div>
              </button>
            );
          })}
        </div>

        <div className="inbox-pane">
          {!started && (
            <p>
              Five items from three tools, all in one list. Run the classifier to sort what needs action
              from what&apos;s just noise, then review the AI-drafted replies.
            </p>
          )}
          {started && !selected && (
            <p style={{ color: "var(--accent-green)" }}>
              ✓ Inbox zero. Everything was triaged without leaving the dashboard.
            </p>
          )}
          {started && selected && (
            <>
              <div>
                <span className="src-tag" style={{ "--c": sourceColor[selected.source] } as React.CSSProperties}>
                  {selected.source}
                </span>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, marginTop: 6 }}>
                  {selected.title}
                </div>
              </div>
              {!ready ? (
                <p className="demo-note">waiting for classification…</p>
              ) : resolved[selected.id] ? (
                <p>
                  {resolved[selected.id] === "sent" ? "Reply approved and sent." : "Dismissed."} Pick another
                  item.
                </p>
              ) : selected.draft ? (
                <>
                  <div className="demo-note">AI-drafted response · awaiting your approval</div>
                  <div className="draft">
                    <TypedText key={selected.id} text={selected.draft} />
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: "auto", flexWrap: "wrap" }}>
                    <button className="btn btn-primary btn-sm" onClick={() => resolve(selected.id, "sent")}>
                      Approve &amp; send
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => resolve(selected.id, "dismissed")}>
                      Discard
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>Classified as FYI. No reply needed, so nothing was drafted.</p>
                  <div style={{ marginTop: "auto" }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => resolve(selected.id, "dismissed")}>
                      Mark as read
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
