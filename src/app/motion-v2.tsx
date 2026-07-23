"use client";

/*
 * TWO SPEEDS motion system (design-direction-v2.md section 2).
 * Two tempo families only:
 *   Steady = slow, linear, scroll-scrubbed (the retainer).
 *   Burst  = fast staggered snaps, fired once on entry (execution).
 * Every tween animates transform/opacity only. Reduced motion: nothing
 * runs, everything renders at rest. No-JS: content fully visible (all
 * hidden initial states are set from JS, never CSS).
 * Presets: GSAP-3 (magnetic CTA), GSAP-4 (fade-rise), GSAP-5 (standard
 * reveal), GSAP-6 (pin+scrub Split), GSAP-7 (stagger rows), GSAP-9
 * (hero line masks, hand-rolled SplitText fallback), GSAP-13 (parallax).
 */

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function MotionV2() {
  useGSAP(() => {
    // Header scroll state (runs regardless of motion preference)
    const header = document.getElementById("siteHeader");
    const onScroll = () =>
      header?.classList.toggle("scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Lenis smooth scroll: desktop pointer-fine only (scrub feels welded
    // to the wheel); native scroll everywhere else.
    let lenis: Lenis | null = null;
    const pointerFine = window.matchMedia("(pointer: fine)").matches;
    const desktopNow = window.matchMedia("(min-width: 900px)").matches;
    let raf: ((time: number) => void) | null = null;
    if (pointerFine && desktopNow) {
      lenis = new Lenis({ lerp: 0.12 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // ---------- shared: count-ups (Burst, once on first intersection)
    const fmt = (n: number, decimals: number) =>
      decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-GB");
    document.querySelectorAll<HTMLElement>("[data-countup]").forEach((el) => {
      const target = parseFloat(el.dataset.target || "0");
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      const state = { v: 0 };
      gsap.to(state, {
        v: target,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${fmt(state.v, decimals)}${suffix}`;
        },
      });
    });

    // ---------- shared: fade-rise entrances (Steady family, GSAP-4)
    gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 12,
        duration: 0.35,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    // ---------- shared: burst row groups (Burst family, GSAP-7)
    gsap.utils.toArray<HTMLElement>("[data-burst-rows]").forEach((group) => {
      gsap.from(group.children, {
        opacity: 0,
        y: 8,
        duration: 0.3,
        stagger: 0.03,
        ease: "power1.out",
        scrollTrigger: { trigger: group, start: "top 85%", once: true },
      });
    });

    const mm = gsap.matchMedia();

    // ================= DESKTOP =================
    mm.add("(min-width: 900px)", () => {
      // Hero masthead build (Burst, once on load): line-mask reveals
      // from alternating sides. Hand-rolled SplitText fallback (GSAP-9).
      const maskInners = gsap.utils.toArray<HTMLElement>(".mask-line > span");
      maskInners.forEach((el, i) => {
        gsap.from(el, {
          xPercent: i % 2 === 0 ? -102 : 102,
          duration: 0.6,
          ease: "expo.out",
          delay: 0.15 + i * 0.12,
        });
      });

      // Hero ink-bloom drift (Steady, GSAP-13): decorative layer only
      gsap.to("[data-hero-media]", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Confession marker swipe (Steady, scrubbed draw)
      const swipeWrap = document.querySelector<HTMLElement>(".scrub-swipe-wrap");
      if (swipeWrap) {
        const block = swipeWrap.querySelector(".scrub-swipe");
        const overlay = swipeWrap.querySelector(".scrub-swipe-text");
        const st = {
          trigger: "#confession-h",
          start: "top 85%",
          end: "top 45%",
          scrub: true,
        };
        if (block)
          gsap.fromTo(block, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
        if (overlay)
          gsap.fromTo(
            overlay,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: st }
          );
      }

      // ===== THE SPLIT (GSAP-6: the page's single pinned scrub section)
      const stage = document.querySelector<HTMLElement>("[data-split-stage]");
      if (stage) {
        stage.classList.add("split-active");
        const execItems = gsap.utils.toArray<HTMLElement>("[data-exec-item]");
        gsap.set(execItems, { opacity: 0, y: 24 });
        let burstFired = false;
        const fireBurst = () => {
          if (burstFired) return;
          burstFired = true;
          // Burst room: fast stagger snap (GSAP-5 timing)
          gsap.to(execItems, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.06,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=180%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (self.progress > 0.58) fireBurst();
            },
          },
        });
        // Beat 1 (0-25%): the statement alone. Beat 2 (25-55%): the
        // viewport shears into two rooms driven by the wheel.
        tl.to("[data-split-statement]", { opacity: 0, y: -40, duration: 0.12 }, 0.25)
          .fromTo("[data-room-left]", { xPercent: -100 }, { xPercent: 0, duration: 0.3 }, 0.25)
          .fromTo("[data-room-right]", { xPercent: 100 }, { xPercent: 0, duration: 0.3 }, 0.25);
        // Beat 3 (55-90%): retainer inclusions drift up slowly and evenly
        // (Steady, scrub-linked); execution snaps via fireBurst above.
        tl.fromTo(
          "[data-retainer-item]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.09, duration: 0.26 },
          0.56
        );
      }

      // AI artifact rise (Steady, GSAP-13)
      gsap.to("[data-ai-art]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: "#ai",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // The Record: sticky rail crossfade as rows pass
      const railIndex = document.querySelector<HTMLElement>("[data-rail-index]");
      const railName = document.querySelector<HTMLElement>("[data-rail-name]");
      if (railIndex && railName) {
        gsap.utils.toArray<HTMLElement>("[data-record-row]").forEach((row) => {
          const update = () => {
            const idx = row.dataset.idx || "01";
            const name = row.dataset.name || "";
            if (railIndex.textContent === idx) return;
            railIndex.textContent = idx;
            railName.textContent = name;
            gsap.fromTo(
              [railIndex, railName],
              { opacity: 0, y: 6 },
              { opacity: 1, y: 0, duration: 0.2, ease: "power1.out", overwrite: "auto" }
            );
          };
          ScrollTrigger.create({
            trigger: row,
            start: "top center",
            end: "bottom center",
            onEnter: update,
            onEnterBack: update,
          });
        });
      }

      // Founders (Burst, once): mask-wipe clip on the photo, name-bar rises
      gsap.utils.toArray<HTMLElement>("[data-founder-unit]").forEach((unit) => {
        const photo = unit.querySelector(".founder-photo img");
        const bar = unit.querySelector(".founder-name-bar");
        const tlF = gsap.timeline({
          scrollTrigger: { trigger: unit, start: "top 80%", once: true },
        });
        if (photo)
          tlF.fromTo(
            photo,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power2.out" }
          );
        if (bar)
          tlF.from(bar, { opacity: 0, y: 16, duration: 0.4, ease: "power2.out" }, "-=0.2");
      });

      // Magnetic CTA (GSAP-3, one focal element, pull clamped 0.3)
      if (pointerFine) {
        const magnet = document.querySelector<HTMLElement>("[data-magnetic]");
        if (magnet) {
          const xTo = gsap.quickTo(magnet, "x", { duration: 0.4, ease: "elastic.out(1,0.4)" });
          const yTo = gsap.quickTo(magnet, "y", { duration: 0.4, ease: "elastic.out(1,0.4)" });
          const move = (e: MouseEvent) => {
            const r = magnet.getBoundingClientRect();
            xTo((e.clientX - r.left - r.width / 2) * 0.3);
            yTo((e.clientY - r.top - r.height / 2) * 0.3);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          const zone = magnet.closest(".magnet-wrap") || magnet;
          (zone as HTMLElement).addEventListener("mousemove", move);
          (zone as HTMLElement).addEventListener("mouseleave", leave);
          return () => {
            (zone as HTMLElement).removeEventListener("mousemove", move);
            (zone as HTMLElement).removeEventListener("mouseleave", leave);
          };
        }
      }
    });

    // ================= MOBILE (simplified, non-pinned) =================
    mm.add("(max-width: 899px)", () => {
      // Hero masks at smaller travel (16px), same alternating directions
      const maskInners = gsap.utils.toArray<HTMLElement>(".mask-line > span");
      maskInners.forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -16 : 16,
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
          delay: 0.15 + i * 0.12,
        });
      });
      // The Split: stacked bands with opposing 12px slide-ins on entry
      const left = document.querySelector("[data-room-left]");
      const right = document.querySelector("[data-room-right]");
      if (left)
        gsap.from(left, {
          x: -12,
          opacity: 0,
          duration: 0.4,
          ease: "power1.out",
          scrollTrigger: { trigger: left, start: "top 88%", once: true },
        });
      if (right)
        gsap.from(right, {
          x: 12,
          opacity: 0,
          duration: 0.4,
          ease: "power1.out",
          scrollTrigger: { trigger: right, start: "top 88%", once: true },
        });
      // Founders: simple fade-rise, units stay whole
      gsap.utils.toArray<HTMLElement>("[data-founder-unit]").forEach((unit) => {
        gsap.from(unit, {
          opacity: 0,
          y: 12,
          duration: 0.35,
          ease: "power1.out",
          scrollTrigger: { trigger: unit, start: "top 90%", once: true },
        });
      });
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      mm.revert();
    };
  });

  return null;
}
