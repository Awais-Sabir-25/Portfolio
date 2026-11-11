import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FaviconForce from "@/components/FaviconForce";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Awais Sabir — AI Full Stack Software Engineer",
  description:
    "Senior Software Engineer, AI Full Stack Engineer and Forward Deployed Engineer. 3+ years building enterprise platforms in .NET and Angular, workflow automation with Camunda 8 and RabbitMQ, and AI products.",
  keywords: [
    "Awais Sabir",
    "Senior Software Engineer",
    "AI Full Stack Engineer",
    "Forward Deployed Engineer",
    ".NET",
    "Angular",
    "TypeScript",
    "Camunda 8",
    "RabbitMQ",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} style={{ scrollBehavior: "smooth" }}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <FaviconForce />
        {children}
      </body>
    </html>
  );
}
