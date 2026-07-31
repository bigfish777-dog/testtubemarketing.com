"use client";

import { useEffect, useState } from "react";

/*
 * STUB. Temporary landing target so the boot sequence completes and the name
 * capture can be judged end to end. The real branded path pages come once
 * Fish supplies the brand direction for the post-boot site.
 *
 * Deliberately unstyled beyond the minimum: this is not a design proposal.
 */

export default function PathStub({ title }: { title: string }) {
  const [who, setWho] = useState<{ n?: string; c?: string } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("ttm.visitor");
      if (raw) setWho(JSON.parse(raw));
    } catch {
      /* nothing stored, which is a supported state */
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#060b08",
        color: "#2bff6e",
        fontFamily: "var(--font-plex-mono), ui-monospace, monospace",
        padding: "clamp(1.5rem, 6vw, 4rem)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
        lineHeight: 1.8,
      }}
    >
      <p style={{ margin: 0, opacity: 0.7 }}>
        [ok] booted into: {title}
      </p>
      <p style={{ margin: 0 }}>
        {who?.n
          ? `Name carried through: ${who.n}${who.c ? ` at ${who.c}` : ""}`
          : "No name given, which is a fully supported route."}
      </p>
      <p style={{ margin: 0, opacity: 0.7, maxWidth: "60ch" }}>
        This is a stub, not a design. The real page appears here once the brand
        direction for the booted site is settled. Nothing on this screen is a
        proposal.
      </p>
      <p style={{ margin: 0 }}>
        <a href="/next" style={{ color: "#b6ffcd" }}>
          Back to the terminal
        </a>
      </p>
    </main>
  );
}
