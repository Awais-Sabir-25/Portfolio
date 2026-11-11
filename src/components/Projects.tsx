"use client";

import { spotlight } from "@/lib/ui";
import PipelineDemo from "./PipelineDemo";
import { Reveal, SectionHead } from "./Reveal";
import VantageDemo from "./VantageDemo";

function Chips({ items }: { items: string[] }) {
  return (
    <div className="chip-row">
      {items.map((t) => (
        <span key={t} className="chip">
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead
          index="02"
          tag="projects"
          title="What I'm Building"
          lead="Two things take up my days right now. Both demos below are interactive, so go ahead and click around."
        />

        <Reveal>
          <article className="card project" onMouseMove={spotlight}>
            <div>
              <div className="project-kicker">Enterprise platform · Saudi Arabia</div>
              <h3 className="project-title">SASO-Maneh</h3>
              <p className="project-desc">
                A large-scale enterprise platform where I lead the migration workstream and own backend
                design and delivery in .NET, working with the client as a Forward Deployed Engineer.
              </p>
              <div className="project-metrics">
                <div className="project-metric">
                  <b className="gradient-text">1,600+</b>
                  <span>requests migrated</span>
                </div>
                <div className="project-metric">
                  <b className="gradient-text">2,000+</b>
                  <span>users moved off Jeem</span>
                </div>
                <div className="project-metric">
                  <b className="gradient-text">100+</b>
                  <span>APIs in production</span>
                </div>
              </div>
              <ul className="project-points">
                <li>Moving requests and users from the legacy Jeem system while keeping the platform stable, accurate and on schedule.</li>
                <li>Automated 10+ business processes with Camunda 8 and decoupled 5+ services with RabbitMQ.</li>
                <li>Deployed onsite as 1 of 3 engineers, resolving production issues directly with the client.</li>
              </ul>
              <Chips items={[".NET", "Angular", "Camunda 8", "Zeebe .NET Client", "RabbitMQ"]} />
            </div>
            <PipelineDemo />
          </article>
        </Reveal>

        <Reveal>
          <article className="card project" onMouseMove={spotlight}>
            <div>
              <div className="project-kicker">AI productivity product</div>
              <h3 className="project-title">Vantage Board</h3>
              <p className="project-desc">
                A unified dashboard that aggregates JIRA, Gmail and Outlook work into one actionable view,
                with AI classification and AI-drafted responses that wait for the user&apos;s approval.
              </p>
              <ul className="project-points">
                <li>Building it as an AI Full Stack Engineer across .NET and Angular.</li>
                <li>Developed the Gmail connector, bringing Gmail items into the dashboard to be classified and acted on alongside work from other tools.</li>
                <li>AI proposes, the user decides: every drafted response is reviewed before it goes out.</li>
              </ul>
              <Chips items={[".NET", "Angular", "TypeScript", "AI classification", "Gmail connector"]} />
            </div>
            <VantageDemo />
          </article>
        </Reveal>
      </div>
    </section>
  );
}
