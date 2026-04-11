import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Awais Sabir — Software Engineer II",
  description:
    "Full-Stack Software Engineer II specializing in .NET, Angular, and MERN Stack. Expert in enterprise backend systems, workflow automation with Camunda 8, and scalable API design.",
  keywords: [
    "Awais Sabir",
    "Software Engineer",
    "Full Stack Developer",
    ".NET",
    "Angular",
    "React",
    "TypeScript",
    "Camunda 8",
    "RabbitMQ",
  ],
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
