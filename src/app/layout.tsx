import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/*
 * Display + body face: Primeform Pro is the brand face (licence owned).
 * The only local files found are PrimeformProDemo cuts with a 76-glyph
 * character set (no pound sign, %, &, /, :) so they cannot carry a site
 * that quotes prices in pounds. Poppins is the guideline-named fallback.
 * SWAP: when the licensed Primeform Pro webfont files land, replace the
 * Poppins import below with next/font/local and keep the same
 * `--font-display` variable. Nothing else changes.
 */
const display = Poppins({
  variable: "--font-display",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.testtubemarketing.com"),
  title: "Test Tube Marketing - Your marketing brains, on retainer",
  description:
    "We're the marketing leadership you keep and the execution team you hire. A retainer buys our heads: planning, judgement, accountability. Projects are quoted when you want our hands.",
  openGraph: {
    title: "Test Tube Marketing - Your marketing brains, on retainer",
    description:
      "We're the marketing leadership you keep and the execution team you hire. A retainer buys our heads: planning, judgement, accountability. Projects are quoted when you want our hands.",
    images: [{ url: "/assets/v2/og-split.jpg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
