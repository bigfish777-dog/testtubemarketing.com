import type { Metadata } from "next";
import localFont from "next/font/local";

const outfit = localFont({
  src: [
    { path: "./fonts/Outfit-Thin.ttf", weight: "100", style: "normal" },
    { path: "./fonts/Outfit-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/Outfit-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Outfit-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Outfit-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Outfit-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Outfit-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Outfit-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/Outfit-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-outfit",
  display: "swap",
});

const domaine = localFont({
  src: [
    { path: "./fonts/DomaineSansText-Light.otf", weight: "300", style: "normal" },
    { path: "./fonts/DomaineSansText-LightItalic.otf", weight: "300", style: "italic" },
    { path: "./fonts/DomaineSansText-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/DomaineSansText-Italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/DomaineSansText-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/DomaineSansText-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "./fonts/DomaineSansText-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/DomaineSansText-BoldItalic.otf", weight: "700", style: "italic" },
    { path: "./fonts/DomaineSansText-Black.otf", weight: "900", style: "normal" },
    { path: "./fonts/DomaineSansText-BlackItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-domaine",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Belief Coding\u00AE \u2014 Watch the free training",
  description:
    "Watch the free 45-minute training from Jess Cunningham and discover exactly how 2,500+ certified practitioners are using Belief Coding to move beyond session-based pricing.",
};

export default function BeliefCodingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${outfit.variable} ${domaine.variable} bc-root`}>
      {children}
    </div>
  );
}
