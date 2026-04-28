"use client";

import { useEffect } from "react";

export function ClientEffects() {
  useEffect(() => {
    // Header scroll state
    const header = document.getElementById("siteHeader");
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 12) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Reveal on scroll
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
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // Parallax
    const parallaxEls = [
      ...document.querySelectorAll<HTMLElement>("[data-parallax]"),
    ];
    const onParallax = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax || "0.1");
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
    };
    window.addEventListener("scroll", onParallax, { passive: true });
    window.addEventListener("resize", onParallax);
    onParallax();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onParallax);
      window.removeEventListener("resize", onParallax);
      io.disconnect();
    };
  }, []);

  return null;
}
