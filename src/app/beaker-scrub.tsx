"use client";

/* Hero beaker (round 4e): Apple-style scroll-scrubbed image sequence.
   A locked-camera clip of a glass beaker tipping and pouring pink liquid,
   exploded to 97 WebP frames. Scroll progress across the hero maps to a
   frame index drawn on a canvas, so the beaker pours as you scroll.

   - Frames are on a pure white bg; the canvas is composited with
     mix-blend-mode: multiply (see globals.css) so the white drops out over
     the cream hero and only the glass + liquid + soft shadow remain.
   - Desktop only: nothing is fetched below 1024px (CSS hides it; the effect
     guards on the same media query and returns early, so mobile never loads
     1.4MB of frames).
   - Reduced motion: paints the upright first frame and never scrubs. */

import { useEffect, useRef } from "react";

const FRAME_COUNT = 97;
const SIZE = 760; // native frame size in px
const framePath = (i: number) =>
  `/assets/beaker/frames/f${String(i + 1).padStart(3, "0")}.webp`;

export function BeakerScrub() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    if (!desktop.matches) return; // never fetch frames on narrow/mobile layouts

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hero = wrap.closest<HTMLElement>(".hero");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let current = -1;

    const draw = (idx: number) => {
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.drawImage(img, 0, 0, SIZE, SIZE);
      current = idx;
    };

    // Load frame 0 first so the upright beaker paints immediately, then the rest.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      images[i] = img;
      if (i === 0) img.onload = () => draw(0);
    }

    const progress = () => {
      if (!hero) return 0;
      const rect = hero.getBoundingClientRect();
      // 0 at page top (hero top aligned), 1 after scrolling one hero height.
      const scrolled = -rect.top;
      const range = Math.max(1, rect.height - window.innerHeight * 0.35);
      return Math.max(0, Math.min(1, scrolled / range));
    };

    let ticking = false;
    const update = () => {
      ticking = false;
      // Ease-in on the frame index: the source clip holds the beaker upright
      // for its first frames, so a linear map feels like a delay before it
      // tips. Raising progress to a <1 power advances the early frames faster,
      // so the tip/pour begins the moment you start scrolling.
      const eased = Math.pow(progress(), 0.6);
      const idx = Math.min(
        FRAME_COUNT - 1,
        Math.round(eased * (FRAME_COUNT - 1)),
      );
      if (idx !== current) draw(idx);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    if (reduce.matches) {
      const img = images[0];
      if (img.complete) draw(0);
      else img.onload = () => draw(0);
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="hero-beaker" ref={wrapRef} aria-hidden="true">
      <canvas className="hero-beaker-canvas" ref={canvasRef} />
    </div>
  );
}
