"use client";

import { useEffect } from "react";

export function ClientEffects() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Header scroll state
    const header = document.getElementById("siteHeader");
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 12) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Reveal on scroll (opacity/transform only)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (!reducedMotion) {
      // Only hide-for-reveal once the observer is live (see globals.css)
      document.documentElement.classList.add("js");
      document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    }

    // Stat count-up: runs once on first intersection, mono-set, no decoration
    const fmt = (n: number, decimals: number) =>
      decimals > 0
        ? n.toFixed(decimals)
        : Math.round(n).toLocaleString("en-GB");
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          countIo.unobserve(el);
          const target = parseFloat(el.dataset.target || "0");
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          const prefix = el.dataset.prefix || "";
          const suffix = el.dataset.suffix || "";
          const dur = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = `${prefix}${fmt(target * eased, decimals)}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 }
    );
    if (!reducedMotion) {
      document
        .querySelectorAll<HTMLElement>("[data-countup]")
        .forEach((el) => countIo.observe(el));
    }

    // Burette fill: fushia paths draw with scroll progress through the
    // fork section. Without JS (or with reduced motion) the markup renders
    // the lines fully drawn, so the information survives regardless.
    const fills = document.querySelectorAll<SVGPathElement>("[data-burette]");
    const fork = document.getElementById("fork");
    let onBurette: (() => void) | null = null;
    if (fork && fills.length && !reducedMotion) {
      const lengths: number[] = [];
      fills.forEach((p, i) => {
        const len = p.getTotalLength();
        lengths[i] = len;
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      onBurette = () => {
        const rect = fork.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the section top hits 80% viewport, 1 when its bottom
        // reaches 40% viewport
        const total = rect.height + vh * 0.4;
        const progress = Math.min(
          Math.max((vh * 0.8 - rect.top) / total, 0),
          1
        );
        fills.forEach((p, i) => {
          p.style.strokeDashoffset = `${lengths[i] * (1 - progress)}`;
        });
      };
      window.addEventListener("scroll", onBurette, { passive: true });
      window.addEventListener("resize", onBurette);
      onBurette();
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (onBurette) {
        window.removeEventListener("scroll", onBurette);
        window.removeEventListener("resize", onBurette);
      }
      io.disconnect();
      countIo.disconnect();
    };
  }, []);

  return null;
}
