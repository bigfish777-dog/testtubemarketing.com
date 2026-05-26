"use client";

import { useState } from "react";

/* ============================================================
   Lead form — shared across hero, mid-page, and final CTA
   ============================================================ */
export function LeadForm({
  id,
  dark,
}: {
  id: string;
  dark?: boolean;
}) {
  const [first, setFirst] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (!first.trim()) errs.first = true;
    if (!email.includes("@")) errs.email = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bc-lead-form" id={id}>
        <div className="success">
          <strong>Got it, {first}.</strong>
          <br />
          Redirecting you to the training in 3 seconds&hellip;
        </div>
      </div>
    );
  }

  return (
    <form className="bc-lead-form" id={id} onSubmit={onSubmit} noValidate>
      <div className="row">
        <input
          type="text"
          placeholder="First name"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          className={errors.first ? "err" : ""}
          autoComplete="given-name"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? "err" : ""}
          autoComplete="email"
        />
      </div>
      <button type="submit" className="bc-cta">
        <span>Watch the free training now</span>
        <span className="arrow">&rarr;</span>
      </button>
      <div className={`bc-form-meta ${dark ? "on-dark" : ""}`}>
        We respect your inbox. Unsubscribe in one click.
      </div>
    </form>
  );
}

/* ============================================================
   Video preview — blurred "locked" VSL thumbnail
   ============================================================ */
export function VideoPreview() {
  const scrollToForm = () => {
    const el = document.querySelector<HTMLInputElement>(
      "#hero-form input[type='text']"
    );
    if (el) el.focus({ preventScroll: false });
  };

  return (
    <div
      className="bc-video-preview"
      role="button"
      tabIndex={0}
      onClick={scrollToForm}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") scrollToForm();
      }}
      aria-label="Preview the training — enter your name and email to watch"
    >
      <div className="vp-scene" aria-hidden="true">
        <div className="vp-grain" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/belief-coding/logos/star-gold.svg"
          className="vp-star vp-star-1"
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/belief-coding/logos/star-gold.svg"
          className="vp-star vp-star-2"
          alt=""
        />
        <div className="vp-figure">
          <div className="vp-fig-shape vp-fig-bg" />
          <div className="vp-fig-shape vp-fig-body" />
          <div className="vp-fig-shape vp-fig-head" />
          <div className="vp-fig-light" />
        </div>
        <div className="vp-vignette" />
        <div className="vp-blur" />
      </div>

      <div className="vp-overlay">
        <div className="vp-locked">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Free Training &middot; Locked</span>
        </div>

        <button className="vp-play" type="button" aria-label="Play preview">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <div className="vp-meta">
          <div className="vp-title">
            <span className="vp-eyebrow">The 45-Minute Training</span>
            <span className="vp-h">
              Beyond Session-Based Pricing:{" "}
              <em>The Belief-Layer Methodology</em>
            </span>
          </div>
          <div className="vp-stats">
            <span className="vp-dur">
              <span className="vp-rec" /> 44:38
            </span>
            <span className="vp-views">2,500+ practitioners watched</span>
          </div>
        </div>

        <div className="vp-progress">
          <span />
        </div>
      </div>

      <div className="vp-caption">
        Enter your details below to unlock the full training&nbsp;&rarr;
      </div>
    </div>
  );
}

/* ============================================================
   FAQ accordion
   ============================================================ */
const FAQ_ITEMS = [
  {
    q: "Is this another mindset course?",
    a: [
      "No. Mindset work operates at the conscious level. Affirmations, goal-setting, accountability.",
      "Belief Coding works at the subconscious belief layer, which sits underneath the conscious mind. They\u2019re different layers entirely. The training explains the distinction in detail, including the EEG brain scan data showing exactly where each layer is active.",
    ],
  },
  {
    q: "Do I need a clinical or therapy background to do this work?",
    a: [
      "No. Most of the 2,500+ certified Belief Coding practitioners came from existing modalities. Reiki, NLP, hypnotherapy, EFT, RTT, coaching certifications.",
      "A clinical background is not required. Existing practice experience is recommended.",
    ],
  },
];

export function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bc-faq bc-section">
      <div className="bc-container narrow">
        <div className="heading">
          <span className="bc-eyebrow center">Your questions, answered</span>
          <h2 className="bc-display smaller">
            The most common questions we hear.
          </h2>
        </div>

        <div className="bc-faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div
              className={`bc-faq-item ${open === i ? "open" : ""}`}
              key={i}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="caret" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              <div className="answer">
                <div className="answer-inner">
                  {item.a.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
