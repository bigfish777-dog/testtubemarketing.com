"use client";

import { useEffect } from "react";

/**
 * Scroll behaviour for the paid traffic page.
 * Self-contained so the page does not depend on the homepage effects module.
 *  - header condenses once scrolled
 *  - .pt-rv elements fade up once
 *  - .pt-level rows ink their spine in sequence as the rig enters view
 *
 * Adding ?still=1 to the URL settles everything immediately. That exists so
 * the page can be screenshotted and verified without waiting on scroll state.
 */
export function PaidTrafficEffects() {
  useEffect(() => {
    const header = document.getElementById("siteHeader");
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 12) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still =
      new URLSearchParams(window.location.search).get("still") === "1";

    const settle = () => {
      document.querySelectorAll(".pt-rv").forEach((el) => el.classList.add("in"));
      document
        .querySelectorAll(".pt-level")
        .forEach((el) => el.classList.add("lit"));
    };

    if (still) {
      document.documentElement.classList.add("pt-still");
      settle();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            reveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".pt-rv").forEach((el) => reveal.observe(el));

    // The rig: light each level's spine in order, so the eye reads top to bottom.
    const rig = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const order = Number(el.dataset.order || 0);
          window.setTimeout(() => el.classList.add("lit"), reduce ? 0 : order * 90);
          rig.unobserve(el);
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".pt-level").forEach((el) => rig.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      reveal.disconnect();
      rig.disconnect();
    };
  }, []);

  return null;
}
