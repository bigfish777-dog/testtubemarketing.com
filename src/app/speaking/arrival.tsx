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
 * The name used to be shown here as a mono system label. It now does real work
 * inside the opening prose instead (see intro.tsx), which is Fish's call of
 * 2026-08-28: the personalisation should carry a joke, not sit in a tag.
 */
