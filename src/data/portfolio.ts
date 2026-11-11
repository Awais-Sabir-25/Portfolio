// Single source of truth for the portfolio content. Update this file when the CV changes.

export const profile = {
  name: "Awais Sabir",
  handle: "awais-sabir",
  title: "AI Full Stack Software Engineer",
  subtitle: "Forward Deployed Engineer",
  currentRole: "Senior Software Engineer",
  company: "AZM Development",
  location: "Islamabad, Pakistan",
  email: "awais0.sabir@gmail.com",
  phone: "+92 321 9844654",
  phoneHref: "tel:+923219844654",
  linkedin: "https://www.linkedin.com/in/awais-sabir-dev",
  linkedinLabel: "linkedin.com/in/awais-sabir-dev",
  cv: "/Awais_Sabir_CV.pdf",
  summary:
    "Senior Software Engineer with 3+ years building enterprise full-stack applications in .NET and Angular, now working as an AI Full Stack Engineer and Forward Deployed Engineer. Leading the SASO-Maneh migration (1,600+ requests, 2,000+ users) in Saudi Arabia and building Vantage Board, an AI productivity product.",
};

export const roles = [
  "Senior Software Engineer",
  "AI Full Stack Engineer",
  "Forward Deployed Engineer",
  ".NET & Angular Engineer",
];

export const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export type Stat = {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  detail: string;
};

export const stats: Stat[] = [
  { value: 3, suffix: "+", label: "Years in production", detail: "Enterprise full-stack work in .NET and Angular" },
  { value: 100, suffix: "+", label: "REST APIs shipped", detail: "Core business logic for the SASO platform" },
  { value: 2000, suffix: "+", label: "Users migrated", detail: "From the legacy Jeem system onto SASO-Maneh" },
  { value: 1600, suffix: "+", label: "Requests migrated", detail: "Kept stable, accurate and on schedule" },
  { value: 10, suffix: "+", label: "Processes automated", detail: "End to end with Camunda 8 and RabbitMQ" },
  { value: 40, prefix: "~", suffix: "%", label: "Faster queries", detail: "Schema design and tuning across 10+ modules" },
];

export type Bullet = { text: string; project?: string };

export type Experience = {
  id: string;
  role: string;
  note?: string;
  company: string;
  companyShort: string;
  period: string;
  current?: boolean;
  color: string;
  bullets: Bullet[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    id: "senior",
    role: "Senior Software Engineer",
    note: "AI Full Stack & Forward Deployed Engineer",
    company: "AZM Development",
    companyShort: "AZM",
    period: "July 2026 – Present",
    current: true,
    color: "#10b981",
    bullets: [
      {
        project: "SASO-Maneh",
        text: "Leading the migration workstream for this large-scale enterprise platform in Saudi Arabia, moving 1,600+ requests and 2,000+ users from the legacy Jeem system onto the new platform while keeping it stable, accurate and on schedule.",
      },
      {
        project: "SASO-Maneh",
        text: "Working directly with clients as a Forward Deployed Engineer: gathering their queries, resolving issues, and making sure the platform fits how their teams actually work.",
      },
      {
        project: "SASO-Maneh",
        text: "Turning client needs into clear business requirements and technical plans the team can build on.",
      },
      {
        project: "SASO-Maneh",
        text: "Continuing to own backend design and delivery in .NET, building on the 100+ APIs and Camunda 8 / RabbitMQ workflows already in production.",
      },
      {
        project: "Vantage Board",
        text: "Building an AI productivity product as an AI Full Stack Engineer (.NET, Angular): a unified dashboard that aggregates JIRA, Gmail and Outlook work into one actionable view, with AI classification and AI-drafted responses for user approval.",
      },
      {
        project: "Vantage Board",
        text: "Developed the Gmail connector, bringing Gmail items into the dashboard so they can be classified and acted on alongside work from other tools.",
      },
    ],
    tech: [
      ".NET",
      "C#",
      "Angular",
      "TypeScript",
      "Camunda 8",
      "RabbitMQ",
      "REST APIs",
      "AI-driven development",
      "AI product development",
      "Connector integration",
      "Workflow automation",
    ],
  },
  {
    id: "se2",
    role: "Software Engineer II",
    company: "AZM Development",
    companyShort: "AZM",
    period: "Aug 2025 – June 2026",
    color: "#00d4ff",
    bullets: [
      {
        text: "Integrated Camunda 8 with the .NET backend on SASO-Maneh through the Zeebe .NET client, automating 10+ critical business processes end to end.",
      },
      {
        text: "Implemented RabbitMQ for message brokering and notification publishing, decoupling 5+ services and improving reliability.",
      },
      {
        text: "Led a team of 8 engineers on a time-boxed feature delivery, coordinating backend, frontend and QA to ship on schedule.",
      },
      {
        text: "Deployed onsite in Saudi Arabia as 1 of 3 engineers (full-stack plus BA/QA), resolving production issues and hot fixes directly with the client.",
      },
      {
        text: "Designed scalable .NET REST APIs, reorganized the backend for modularity and maintainability, and built Angular front-end components with product and frontend teams.",
      },
    ],
    tech: [
      ".NET",
      "C#",
      "Camunda 8",
      "Zeebe .NET Client",
      "RabbitMQ",
      "REST APIs",
      "Angular",
      "TypeScript",
      "Workflow automation",
    ],
  },
  {
    id: "se",
    role: "Software Engineer",
    company: "AZM Development",
    companyShort: "AZM",
    period: "Feb 2024 – July 2025",
    color: "#3b82f6",
    bullets: [
      {
        text: "Designed and delivered 100+ backend REST APIs in .NET across a 20-engineer team, covering core business logic for the SASO enterprise SaaS platform.",
      },
      {
        text: "Owned database schema design and query optimization across 10+ modules, reducing average query execution time by about 40%.",
      },
      {
        text: "Built full-stack features spanning .NET services and Angular, contributing to 3+ major product releases.",
      },
      {
        text: "Developed Power BI dashboards and reports for 5+ services, enabling data-driven decisions for stakeholders.",
      },
    ],
    tech: [".NET", "C#", "REST APIs", "SQL", "Angular", "TypeScript", "Power BI"],
  },
  {
    id: "nastp",
    role: "Software Developer",
    company: "National Aerospace Science and Technology Park (NASTP)",
    companyShort: "NASTP",
    period: "Dec 2023 – Jan 2024",
    color: "#a78bfa",
    bullets: [
      {
        text: "Contributed to a defence-domain simulation system within a 22-person team using C++, C# and MFC, building MFC desktop UI components and technical documentation.",
      },
      {
        text: "Diagnosed and resolved performance and logic issues in an existing C++ codebase, improving the stability of critical simulation modules.",
      },
    ],
    tech: ["C/C++", "C#", "MFC"],
  },
  {
    id: "mi6",
    role: "Java Backend Developer",
    company: "Machine Intelligence 6",
    companyShort: "Machine Intelligence 6",
    period: "Sept 2023 – Nov 2023",
    color: "#f59e0b",
    bullets: [
      {
        text: "Delivered backend work on 2 concurrent client projects: a school management system for Army Public School and a retail POS system.",
      },
      {
        text: "Built RESTful APIs in Java Spring Boot, integrated Square UP payments, and built Java Swing tooling UIs.",
      },
    ],
    tech: ["Java", "Spring Boot", "REST APIs", "Square UP", "Java Swing"],
  },
  {
    id: "intern",
    role: "Java Intern",
    company: "Business Analytics (Pvt.) Ltd.",
    companyShort: "Business Analytics",
    period: "July 2022 – Aug 2022",
    color: "#f472b6",
    bullets: [
      {
        text: "Completed Sun Certified Java Programmer (SCP) coursework and built a CRUD demo application with Java Servlet within a 10+ person team.",
      },
    ],
    tech: ["Java", "Java Servlet"],
  },
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "FAST-NUCES, Islamabad",
  period: "Aug 2019 – June 2023",
};

export type SkillGroup = {
  id: string;
  title: string;
  color: string;
  skills: { name: string; note?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI & Automation",
    color: "#10b981",
    skills: [
      { name: "AI-driven development" },
      { name: "AI product development" },
      { name: "Connector integration", note: "Third-party connectors (Gmail)" },
      { name: "Workflow automation" },
      { name: "Camunda 8" },
      { name: "Zeebe .NET Client" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    color: "#00d4ff",
    skills: [
      { name: "C#" },
      { name: ".NET" },
      { name: ".NET in Azure" },
      { name: "REST APIs" },
      { name: "RabbitMQ" },
      { name: "Java" },
      { name: "Spring Boot" },
      { name: "Node.js" },
      { name: "Python" },
      { name: "C/C++" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    color: "#a78bfa",
    skills: [
      { name: "Angular" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "React JS" },
      { name: "HTML/CSS" },
    ],
  },
  {
    id: "data",
    title: "Data & Tools",
    color: "#f59e0b",
    skills: [{ name: "SQL" }, { name: "MongoDB" }, { name: "Power BI" }, { name: "Git" }],
  },
];
