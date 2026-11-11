"use client";

import { useEffect, useState } from "react";

const nodes = [
  {
    title: "Client",
    sub: "Angular UI",
    log: "request submitted from the front end",
    detail:
      "A request enters the platform from the Angular front end. I build front-end components here alongside the product and frontend teams.",
  },
  {
    title: ".NET API",
    sub: "REST",
    log: "validated · business rules applied",
    detail:
      "One of the 100+ REST APIs I designed and delivered handles it. I also reorganized the backend for modularity and tuned queries across 10+ modules for roughly 40% faster execution.",
  },
  {
    title: "Camunda 8",
    sub: "Zeebe client",
    log: "process instance started via Zeebe .NET client",
    detail:
      "The backend drives the business process in Camunda 8 through the Zeebe .NET client. I integrated this, automating 10+ critical business processes end to end.",
  },
  {
    title: "RabbitMQ",
    sub: "Message broker",
    log: "event published to the broker",
    detail:
      "Events are published to RabbitMQ instead of services calling each other directly. Introducing it decoupled 5+ services and improved reliability.",
  },
  {
    title: "Notify",
    sub: "Consumers",
    log: "notification published to the user",
    detail:
      "Consumers pick the events up and publish notifications to users, independently of the service that raised them.",
  },
];

const STEP_MS = 850;

export default function PipelineDemo() {
  // step: -1 idle, 0..n-1 running through nodes, n = finished
  const [step, setStep] = useState(-1);
  const [selected, setSelected] = useState(2);
  const [runs, setRuns] = useState(0);

  const running = step >= 0 && step < nodes.length;

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [step, running]);

  const shown = running ? step : selected;
  const requestId = `REQ-${String(1600 + runs).padStart(4, "0")}`;

  return (
    <div className="demo">
      <div className="demo-bar">
        <span className="demo-note">request lifecycle · simplified illustration</span>
        <button
          className="btn btn-primary btn-sm"
          disabled={running}
          style={running ? { opacity: 0.6, cursor: "wait" } : undefined}
          onClick={() => {
            setRuns((r) => r + 1);
            setStep(0);
          }}
        >
          {running ? "Running…" : step === -1 ? "▶ Send a request" : "↻ Send another"}
        </button>
      </div>
      <div className="demo-body">
        <div className="pipe">
          {nodes.map((node, i) => (
            <button
              key={node.title}
              className={`pipe-node ${running && step === i ? "active" : ""} ${
                step > i ? "done" : ""
              } ${!running && selected === i ? "selected" : ""}`}
              onClick={() => setSelected(i)}
              onMouseEnter={() => !running && setSelected(i)}
              aria-pressed={!running && selected === i}
            >
              <b>{node.title}</b>
              {node.sub}
            </button>
          ))}
        </div>

        <div className="pipe-detail">
          <b style={{ color: "var(--accent-cyan)" }}>{nodes[shown].title}</b> · {nodes[shown].detail}
        </div>

        <div className="pipe-log" aria-live="polite">
          {step === -1 ? (
            <div>{"// hover a stage to see my part in it, or send a request through"}</div>
          ) : (
            <>
              <div>$ trace {requestId}</div>
              {nodes.slice(0, Math.min(step + 1, nodes.length)).map((node, i) => (
                <div key={node.title}>
                  <span className={step > i ? "ok" : ""}>{step > i ? "✓" : "…"}</span>{" "}
                  [{node.title}] {node.log}
                </div>
              ))}
              {step >= nodes.length && <div className="ok">done · request completed end to end</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
