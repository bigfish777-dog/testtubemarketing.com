import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

/*
 * Round 4 font system (Fish's hard swap, work order item 1):
 * Horas carries ALL headlines/display (local woff2, Medium 500 +
 * SemiBold 600; weight restraint keeps everything at 500 on-page).
 * RNS Estero Medium is the body face - the ONLY body weight supplied,
 * and it IS the body weight; globals.css sets font-synthesis: none so
 * nothing ever fake-bolds it. JetBrains Mono stays for data labels.
 */
const display = localFont({
  src: [
    { path: "../fonts/Horas-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Horas-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display",
});

const body = localFont({
  src: "../fonts/RNSEstero-Medium.woff2",
  weight: "500",
  variable: "--font-body",
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
