"use client";

import { useEffect, useState } from "react";
import styles from "./arrival.module.css";

/*
 * The bridge between the terminal and the page.
 *
 * Fish's direction 2026-08-27: the tube resolves into a real site rather than
 * cutting to one. So this is a CRT unblanking, played in reverse of a
 * power-down: a single bright scan line opens vertically into a full frame,
 * the phosphor drains out of it, and the whole thing dissolves to reveal the
 * page underneath.
 *
 * It only plays for someone who actually came through the boot. A visitor who
 * lands on /speaking from a search result or a shared link gets the page with
 * no theatrics, which is what ROUTER-BRIEF requires of every path URL.
 */

const BOOT_FLAG = "ttm.booted";
const STORE_KEY = "ttm.visitor";

export function Arrival() {
  // "idle" renders nothing at all, so direct arrivals never get a black frame.
  const [state, setState] = useState<"idle" | "playing" | "done">("idle");

  useEffect(() => {
    let booted = false;
    try {
      booted = sessionStorage.getItem(BOOT_FLAG) === "1";
      // One play per boot. A refresh is not a fresh arrival.
      sessionStorage.removeItem(BOOT_FLAG);
    } catch {
      /* private mode: no flag, no transition, page still works */
    }

    if (!booted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setState("playing");
    const id = window.setTimeout(() => setState("done"), 1150);
    return () => window.clearTimeout(id);
  }, []);

  if (state === "idle" || state === "done") return null;

  return (
    <div className={styles.arrival} aria-hidden="true">
      <div className={styles.scan} />
      <div className={styles.lines} />
    </div>
  );
}

/*
 * The name, when there is one. Renders the no-name state on the server and
 * swaps on hydration, so the fallback is the default and nothing jumps.
 * The name is read from sessionStorage and never leaves the browser.
 */
export function Greeting() {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (!raw) return;
      const { n, c } = JSON.parse(raw) as { n?: string; c?: string };
      const name = (n ?? "").trim();
      if (!name) return;
      const co = (c ?? "").trim();
      setLine(co ? `${name} / ${co}` : name);
    } catch {
      /* nothing stored, which is a supported state */
    }
  }, []);

  // DRAFT COPY - Claude's placeholder, not Fish's.
  return (
    <p className={styles.greetLine}>
      <span className={styles.caret}>&gt;</span>{" "}
      {line ? `for ${line}` : "for whoever you are"}
    </p>
  );
}
