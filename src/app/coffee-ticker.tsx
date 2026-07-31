"use client";

/* Hero stat 4 (round 4e): a live "cups of coffee" counter. The base is a
   real, honest figure - 8 cups/day between the two founders since Jan 2014,
   computed fresh on every load so it grows over time. It counts up when the
   stat strip scrolls into view, then ticks up by one every few seconds
   while you watch: clearly playful, never pretending to be a real-time
   feed. Reduced motion holds the number still. */

import { useEffect, useRef, useState } from "react";

const START = Date.UTC(2014, 0, 1); // 1 Jan 2014
const CUPS_PER_DAY = 8;
const TICK_MS = 6000; // playful live increment cadence
const COUNTUP_MS = 1400;

function baseCount() {
  const days = (Date.now() - START) / 86_400_000;
  return Math.floor(CUPS_PER_DAY * days);
}

const fmt = (n: number) => n.toLocaleString("en-GB");

export function CoffeeTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState<number>(baseCount);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = baseCount();

    if (reduce) {
      return;
    }

    let raf = 0;
    let interval = 0;
    let started = false;

    const startTicking = () => {
      interval = window.setInterval(() => setDisplay((d) => d + 1), TICK_MS);
    };

    const run = () => {
      if (started) return;
      started = true;
      const from = Math.max(0, target - 1200);
      let t0 = 0;
      const step = (now: number) => {
        if (!t0) t0 = now;
        const p = Math.min(1, (now - t0) / COUNTUP_MS);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(from + (target - from) * eased));
        if (p < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setDisplay(target);
          startTicking();
        }
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) run();
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="stat-num"
      ref={ref}
      suppressHydrationWarning
      aria-label={`${fmt(display)} cups of coffee and counting`}
    >
      {fmt(display)}
    </div>
  );
}
