import "./belief-coding.css";
import { LeadForm, VideoPreview, FAQSection } from "./components";

/* ============================================================
   Data
   ============================================================ */
const PAIN_ITEMS = [
  "You\u2019ve trained in three or four modalities, and you still find yourself stitching them together in sessions.",
  "Some clients shift dramatically and others don\u2019t, and you can\u2019t predict which is which.",
  "You\u2019re charging by the session, working flat out, and your income hasn\u2019t moved the way it should have by now.",
  "You\u2019ve spent \u00A315,000 to \u00A330,000 on training, masterminds and business coaching, and you\u2019re still not where you thought you\u2019d be.",
  "You\u2019ve had a client recently, maybe someone you love, that you couldn\u2019t quite reach, and it\u2019s been eating at you.",
  "You\u2019re watching practitioners less skilled than you charge four and five times what you charge, and you can\u2019t quite work out what they figured out.",
];

const DISCOVER_ITEMS = [
  {
    n: "01",
    title:
      "The third layer of the subconscious almost no modality in the UK is currently working at.",
    body: "You\u2019ll see exactly what makes belief-level work permanent in a way that symptom-level work never is, and why every modality you\u2019ve trained in has been stopping one layer too high.",
  },
  {
    n: "02",
    title:
      "The peer-reviewed clinical data just published in a medical journal.",
    body: "After a single session. With EEG brain scans showing exactly what shifts. You\u2019ll see the actual study.",
    stats: [
      "Anxiety \u2193 54.9%",
      "Depression \u2193 51.6%",
      "Panic disorder \u2193 59.4%",
    ],
  },
  {
    n: "03",
    title:
      "Why practitioners are moving from \u00A3120 sessions to \u00A31,250\u2013\u00A35,000 transformation packages.",
    body: "This isn\u2019t a sales tactic or a marketing trick. It\u2019s a structural change in how the work is delivered. You\u2019ll see the exact shift and what it looks like in practice.",
  },
  {
    n: "04",
    title:
      "The reason your last \u00A315,000 of training hasn\u2019t moved your income.",
    body: "The training wasn\u2019t bad. The mastermind wasn\u2019t a scam. There\u2019s one specific reason none of it has produced what it promised, and almost nobody in this industry is willing to name it out loud.",
  },
  {
    n: "05",
    title:
      "Three real practitioner stories of what changes when this clicks.",
    body: "You\u2019ll meet practitioners who started with less training and less experience than you currently have, and built six-figure transformation practices using this methodology in their first 12 months.",
  },
];

/* ============================================================
   Inline SVG helpers
   ============================================================ */
function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function VSLLanderPage() {
  return (
    <main className="bc-page">
      {/* ======== HERO ======== */}
      <section className="bc-hero bc-section">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/belief-coding/logos/star-gold.svg"
          className="star-bg"
          alt=""
          aria-hidden="true"
        />
        <div className="bc-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/belief-coding/logos/belief-coding-wordmark-black.svg"
            alt="Belief Coding"
            className="wordmark"
          />

          <span className="pre-headline">
            For the practitioner who knows they&apos;re meant to charge more,
            reach more, and mean more
          </span>

          <h1 className="bc-display">
            <span className="revealed" style={{ fontWeight: 700 }}>
              Revealed:
            </span>{" "}
            The Methodology Replacing Session-Based Pricing With{" "}
            <span className="accent">
              &pound;1,250&ndash;&pound;5,000 Transformation Packages
            </span>
            <em className="line2">
              Especially If That Number Sounds Impossible For Your Clients Today
            </em>
          </h1>

          <p className="subhead">
            Watch the free 45-minute training from Jess Cunningham, founder of
            the UK&apos;s first peer-reviewed, PubMed-indexed belief
            methodology, and discover exactly how 2,500+ certified practitioners
            are using it to move beyond session-based pricing&mdash;without
            adding another modality to their toolkit.
          </p>

          <VideoPreview />

          <div className="form-block">
            <LeadForm id="hero-form" />
          </div>

          <div className="bc-trust-strip">
            <span>PubMed Indexed</span>
            <span className="sep">&middot;</span>
            <span>Peer-Reviewed</span>
            <span className="sep">&middot;</span>
            <span>CPD Accredited</span>
            <span className="sep">&middot;</span>
            <span>2,500+ Certified Practitioners</span>
          </div>
        </div>
      </section>

      {/* ======== PAIN QUALIFIER ======== */}
      <section className="bc-pain bc-section">
        <div className="bc-container">
          <div className="heading">
            <span className="bc-eyebrow center">Sound familiar?</span>
            <h2 className="bc-display smaller">
              Most practitioners hit the same wall around year four. The wall
              isn&apos;t your skill.{" "}
              <em>It&apos;s the layer you&apos;ve been working at.</em>
            </h2>
          </div>

          <div className="bc-pain-grid">
            {PAIN_ITEMS.map((text, i) => (
              <div className="bc-pain-item" key={i}>
                <span className="marker" aria-hidden="true">
                  <XIcon />
                </span>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="closing">
            <p>
              If any of these sound like where you are right now, you&apos;re
              not alone.
            </p>
            <p className="emphasis">
              The 45-minute training explains exactly why.
            </p>
          </div>
        </div>
      </section>

      {/* ======== DISCOVER ======== */}
      <section className="bc-discover bc-section">
        <div className="bc-container">
          <div className="heading">
            <span className="bc-eyebrow center">What you&apos;ll discover</span>
            <h2 className="bc-display smaller">
              Inside the free 45-minute training,{" "}
              <em>Jess reveals:</em>
            </h2>
          </div>

          <div className="bc-discover-list">
            {DISCOVER_ITEMS.map((item) => (
              <div className="bc-discover-row" key={item.n}>
                <div className="num">{item.n}</div>
                <div className="content">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  {item.stats && (
                    <div className="stat-row">
                      {item.stats.map((s) => (
                        <span className="stat" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== MID CTA ======== */}
      <section className="bc-midcta bc-section tight">
        <div className="bc-container narrow">
          <h3>Ready to see it?</h3>
          <p className="sub">
            Drop your name and email below. The training opens immediately.
          </p>
          <div className="form-block">
            <LeadForm id="mid-form" />
          </div>
        </div>
      </section>

      {/* ======== ABOUT ======== */}
      <section className="bc-about bc-section">
        <div className="bc-container">
          <span
            className="bc-eyebrow center"
            style={{ textAlign: "center", display: "block", marginBottom: 28 }}
          >
            About this work
          </span>
          <div className="bc-about-card">
            <div className="text-col">
              <h2>
                Jess Cunningham &mdash; founder of{" "}
                <em>Belief Coding&reg;</em>.
              </h2>
              <div className="sig">
                The UK&apos;s first peer-reviewed, PubMed-indexed belief
                methodology.
              </div>

              <p>
                In four years, she&apos;s trained over{" "}
                <strong>2,500 certified practitioners</strong> across the UK and
                internationally. The methodology she built is now published in a
                medical journal alongside research from Harvard, Oxford, and
                NHS-affiliated institutions. Scientists at research centres are
                running ongoing studies on it.
              </p>
              <p>
                Four of her facilitators recently had their own paper on
                menopause work published, making certified Belief Coders not just
                deliverers of the methodology but{" "}
                <strong>
                  contributors to its growing body of published research
                </strong>
                .
              </p>
              <p>
                She built it because she&apos;d trained in everything. NLP,
                hypnotherapy, CBT, EFT, somatic work, neuroscience. And every
                modality she&apos;d invested in stopped at the same point. None
                of them reached the layer underneath, where the belief that
                creates the symptom actually lives.
              </p>
              <p>
                The 45-minute training walks you through what she figured out,
                the research backing it up, and what it means for your practice.
              </p>

              <div className="creds">
                <span className="pill">PubMed Indexed</span>
                <span className="pill">Peer-Reviewed</span>
                <span className="pill">2,500+ Practitioners</span>
                <span className="pill">CPD Accredited</span>
              </div>
            </div>

            <div className="photo-wrap">
              <div className="photo-placeholder">
                <span className="label">Jess Cunningham</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/belief-coding/logos/star-gold.svg"
                  className="star"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== FINAL CTA ======== */}
      <section className="bc-final-cta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/belief-coding/logos/star-gold.svg"
          className="star-bg tl"
          alt=""
          aria-hidden="true"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/belief-coding/logos/star-gold.svg"
          className="star-bg br"
          alt=""
          aria-hidden="true"
        />

        <div className="bc-container narrow">
          <span className="bc-eyebrow center on-dark">
            The training is free &middot; 45 minutes
          </span>
          <h2>
            The methodology is here. The research is published. 2,500+
            practitioners are already using it.
            <em className="question">
              The only question left is whether you&apos;re going to see it.
            </em>
          </h2>
          <p className="sub">Watch the free 45-minute training now.</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 18,
            }}
          >
            <LeadForm id="final-form" dark />
          </div>
        </div>
      </section>

      {/* ======== FAQ ======== */}
      <FAQSection />

      {/* ======== FOOTER ======== */}
      <footer className="bc-footer">
        <div className="row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/belief-coding/logos/star-gold.svg"
            className="star"
            alt=""
          />
          <span className="brand">Belief Coding&reg;</span>
          <span>&middot;</span>
          <a href="#">belief-coding.com</a>
        </div>
        <div>
          &copy; 2026 Belief Coding Ltd &middot; All rights reserved &middot;{" "}
          <a href="#">Privacy Policy</a> &middot; <a href="#">Terms</a>
        </div>
        <p className="trademark">
          Belief Coding&reg; is a registered trademark of Belief Coding Ltd,
          Companies House #15991483
        </p>
      </footer>
    </main>
  );
}
