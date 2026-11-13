"use client";

import { useEffect, useRef, useState } from "react";
import s from "./filmingday.module.css";

// Clips from ads we've already made, picked by Fish (11 Nov 2026), labelled by
// business, not by person. Each clip appears twice, on opposite sides of the
// ring, so the same face is never in front twice at once.
const clips = [
  { src: "/assets/filmingday/fd-ttm-a", who: "Test Tube Marketing" },
  { src: "/assets/filmingday/fd-tess", who: "Tess Cope" },
  { src: "/assets/filmingday/fd-evoke", who: "Evoke Tree Services" },
  { src: "/assets/filmingday/fd-thrive", who: "Thrive" },
  { src: "/assets/filmingday/fd-ttm-b", who: "Test Tube Marketing" },
];
const cards = [...clips, ...clips];
const STEP = 360 / cards.length;
const SECONDS_PER_TURN = 48;

export function ReelRing() {
  const stage = useRef<HTMLDivElement>(null);
  const spinner = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLLIElement | null)[]>([]);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let angle = 0;
    let last = 0;
    let raf = 0;
    let inView = false;

    // Fade cards as they turn away, and only play the ones facing us.
    const paint = () => {
      if (spinner.current)
        spinner.current.style.transform = `rotateY(${angle}deg)`;
      cards.forEach((_, i) => {
        const facing = Math.cos(((i * STEP + angle) * Math.PI) / 180);
        const el = cardEls.current[i];
        if (el) el.style.setProperty("--facing", facing.toFixed(3));
        const v = videos.current[i];
        if (!v) return;
        const shouldPlay =
          inView && !pausedRef.current && !reduce && facing > -0.15;
        if (shouldPlay && v.paused) v.play().catch(() => {});
        if (!shouldPlay && !v.paused) v.pause();
      });
    };

    const tick = (t: number) => {
      if (last && !pausedRef.current && !reduce)
        angle -= ((t - last) / 1000) * (360 / SECONDS_PER_TURN);
      last = t;
      paint();
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        cancelAnimationFrame(raf);
        last = 0;
        if (inView) raf = requestAnimationFrame(tick);
        else paint();
      },
      { rootMargin: "120px 0px" },
    );
    if (stage.current) io.observe(stage.current);
    paint();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // The copies on the far side start half way through, so the pairs never sync.
  const offset = (i: number) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (i >= clips.length && e.currentTarget.currentTime < 0.1)
      e.currentTarget.currentTime = 3;
  };

  return (
    <section
      className={s.reel}
      aria-label="Clips from ads we've made with clients"
    >
      <div className={s.stage} ref={stage}>
        <div className={s.tilt}>
          <div className={s.spinner} ref={spinner}>
            <ul className={s.ring}>
              {cards.map((c, i) => (
                <li
                  key={i}
                  ref={(el) => {
                    cardEls.current[i] = el;
                  }}
                  className={s.card}
                  style={{ "--i": i } as React.CSSProperties}
                  aria-hidden={i >= clips.length ? true : undefined}
                >
                  <div className={s.face}>
                    <video
                      ref={(el) => {
                        videos.current[i] = el;
                      }}
                      src={`${c.src}.mp4`}
                      poster={`${c.src}.jpg`}
                      muted
                      loop
                      playsInline
                      preload="none"
                      onLoadedMetadata={offset(i)}
                      aria-label={`A clip from a ${c.who} ad`}
                    />
                    <span className={s.who}>{c.who}</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={s.back}
                    src={`${c.src}.jpg`}
                    alt=""
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={s.floor} aria-hidden="true" />
      </div>
      {/* Hidden under reduced motion, where nothing moves (see CSS) */}
      <button
        type="button"
        className={s.ringToggle}
        aria-pressed={paused}
        onClick={() => {
          pausedRef.current = !paused;
          setPaused(!paused);
        }}
      >
        <span aria-hidden="true" className={paused ? s.icoPlay : s.icoPause} />
        {paused ? "Play" : "Pause"}
      </button>
    </section>
  );
}
