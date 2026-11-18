"use client";

import { useEffect, useRef } from "react";

// Running camera timecode (HH:MM:SS:FF at 25 fps) counting real time since
// the page opened. Writes straight to the DOM so React doesn't re-render 25
// times a second. Under reduced motion it only ticks once a second.
const FPS = 25;
const pad = (n: number) => String(n).padStart(2, "0");

function format(ms: number, frames: boolean) {
  const total = Math.floor(ms / 1000);
  const ff = frames ? Math.floor(((ms % 1000) / 1000) * FPS) : 0;
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor(total / 60) % 60)}:${pad(total % 60)}:${pad(ff)}`;
}

export function Timecode({ className }: { className?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    let timer = 0;
    const write = () => {
      if (el.current) el.current.textContent = format(performance.now() - start, !reduce);
    };
    if (reduce) {
      timer = window.setInterval(write, 1000);
    } else {
      const loop = () => {
        write();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <span ref={el} className={className} aria-hidden="true">
      00:00:00:00
    </span>
  );
}
