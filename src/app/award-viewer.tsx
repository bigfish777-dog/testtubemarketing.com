"use client";

/* Award section 3D (round 4e): the physical "Marketing & Advertising
   StartUp of the Year" trophy, photographed hand-free from 3 angles and
   reconstructed to a GLB via Higgsfield multi-image-to-3D.

   The front and sides reconstructed cleanly; the back is a garbled mirror
   of the front, so both the auto-sway AND any user drag are CLAMPED to a
   front-facing arc (min/max-camera-orbit) and never reach the back.

   model-viewer only runs its camera loop when camera-controls is present,
   and only setAttribute('camera-orbit', ...) (not the .cameraOrbit
   property) actually moves it - so the sway is a rAF loop writing the
   attribute each frame. User drag pauses the sway; it resumes shortly
   after. Reduced motion holds a static angle. Nothing (viewer script or
   GLB) loads until the award nears the viewport. */

import { useEffect, useRef } from "react";

const GLB = "/assets/award/award.glb";
const VENDOR = "/vendor/model-viewer.min.js";

const SWAY_DEG = 28; // azimuth amplitude (inside the clamp below)
const PHI = 82; // vertical angle
const RADIUS = "104%";
const PERIOD = 9000; // ms per full sway cycle
const RESUME_DELAY = 2500; // ms sway stays paused after a drag

export function AwardViewer() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mv: any = null;
    let raf = 0;
    let started = false;
    let onScreen = true;
    let interacting = false;
    let resumeAt = 0;
    let t0 = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!mv || !onScreen || interacting || now < resumeAt) return;
      if (!t0) t0 = now;
      const theta = SWAY_DEG * Math.sin(((now - t0) / PERIOD) * Math.PI * 2);
      mv.setAttribute("camera-orbit", `${theta}deg ${PHI}deg ${RADIUS}`);
    };

    const create = () => {
      mv = document.createElement("model-viewer");
      mv.setAttribute("src", GLB);
      mv.setAttribute(
        "alt",
        "Marketing and Advertising StartUp of the Year 2026 trophy, Midlands StartUp Awards",
      );
      mv.setAttribute("camera-controls", "");
      mv.setAttribute("disable-zoom", "");
      mv.setAttribute("disable-pan", "");
      mv.setAttribute("disable-tap", "");
      mv.setAttribute("interaction-prompt", "none");
      mv.setAttribute("camera-orbit", "0deg 82deg 104%");
      mv.setAttribute("min-camera-orbit", "-32deg 66deg 104%");
      mv.setAttribute("max-camera-orbit", "32deg 96deg 104%");
      mv.setAttribute("field-of-view", "28deg");
      mv.setAttribute("min-field-of-view", "28deg");
      mv.setAttribute("max-field-of-view", "28deg");
      mv.setAttribute("interpolation-decay", "160");
      mv.setAttribute("environment-image", "neutral");
      mv.setAttribute("exposure", "1.05");
      mv.setAttribute("shadow-intensity", "0");
      mv.style.width = "100%";
      mv.style.height = "100%";
      mv.style.background = "transparent";
      mv.style.setProperty("--poster-color", "transparent");

      const hold = () => {
        interacting = true;
      };
      const release = () => {
        interacting = false;
        resumeAt = performance.now() + RESUME_DELAY;
        t0 = 0; // re-phase sway from the rested angle
      };
      mv.addEventListener("pointerdown", hold);
      mv.addEventListener("pointerup", release);
      mv.addEventListener("pointercancel", release);
      mv.addEventListener("pointerleave", release);

      wrap.appendChild(mv);

      if (reduce) {
        mv.setAttribute("camera-orbit", "15deg 80deg 104%");
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const build = () => {
      if (started) return;
      started = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).customElements?.get("model-viewer")) {
        create();
        return;
      }
      if (!document.querySelector("script[data-model-viewer]")) {
        const s = document.createElement("script");
        s.type = "module";
        s.src = VENDOR;
        s.setAttribute("data-model-viewer", "");
        document.head.appendChild(s);
      }
      customElements.whenDefined("model-viewer").then(create);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          onScreen = e.isIntersecting;
          if (e.isIntersecting) build();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(wrap);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (mv && mv.parentNode) mv.parentNode.removeChild(mv);
      mv = null;
    };
  }, []);

  return (
    <div
      className="award-viewer"
      ref={wrapRef}
      role="img"
      aria-label="Interactive 3D of the Marketing and Advertising StartUp of the Year 2026 trophy"
    />
  );
}
