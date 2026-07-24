import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Public_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

/*
 * Type candidate 3 (approved 2026-07): Bricolage Grotesque carries
 * display/h2/h3 (variable, opsz axis on, used at 400/500 only - the
 * weight-restraint rule caps everything at 500), Public Sans carries
 * body/UI at 400/500, JetBrains Mono unchanged for labels.
 */
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const body = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#F7F3EC",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.testtubemarketing.com"),
  title: "Test Tube Marketing - Your marketing brains, on retainer",
  description:
    "We're the marketing leadership you keep and the execution team you hire. You get our heads... and when you need our hands, we can take care of the 'doing' too.",
  openGraph: {
    title: "Test Tube Marketing - Your marketing brains, on retainer",
    description:
      "We're the marketing leadership you keep and the execution team you hire. You get our heads... and when you need our hands, we can take care of the 'doing' too.",
    images: [{ url: "/assets/founders/two-shot-stage.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
