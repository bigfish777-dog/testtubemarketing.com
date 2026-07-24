import type { Metadata } from "next";
import { AuditForm } from "./audit-form";
import "./audit.css";

/*
 * AI STRATEGY SESSION - application page (warm-list play, Jul 2026).
 * Private/unlisted (noindex): the link goes out by email to Fish's warm
 * list, not to search. Shares the /ai-ladder thesis and framing rule:
 * DEPTH not adoption - almost everyone now uses AI, hardly anyone gets
 * real leverage from it. Never claim business owners don't use AI. No
 * invented statistics.
 *
 * Copy drafted in Fish's voice for his review. Real numbers only:
 * 7 slots, £499 + VAT (usually £1,250), case-study framing.
 */

export const metadata: Metadata = {
  title: "Apply: AI Strategy Session - Test Tube Marketing",
  description:
    "One session to find the one thing holding your business back, and exactly where AI moves the needle on it.",
  robots: { index: false, follow: false },
};

const walkaway: { label: string; body: string }[] = [
  {
    label: "Your real constraint, named",
    body: "The one bottleneck holding the whole thing back. Most people are guessing at it. We find it.",
  },
  {
    label: "Where AI actually earns its keep",
    body: "For your business, not in general. The handful of places it's genuinely worth it, and the places it's a waste of your afternoon.",
  },
  {
    label: "A staged plan, today to six months",
    body: "What to put in place today, what to line up next, and what to build towards over the next six months. Sequenced, so you're never guessing what comes next.",
  },
  {
    label: "A full guide, built for you",
    body: "A web-based strategy guide made for your business: custom instructions to drop straight into your AI, maps, breakdowns, and the pros and cons of each route. The lot, written up.",
  },
];

export default function AiAudit() {
  return (
    <>
      <a href="#apply" className="skip-link">
        Skip to the application
      </a>

      {/* HEADER */}
      <header className="site" id="siteHeader">
        <div className="container nav">
          <a
            href="https://www.testtubemarketing.com"
            className="brand"
            aria-label="Test Tube Marketing"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/ttm-secondary.png"
              alt=""
              width={6621}
              height={1899}
            />
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="band audit-hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="hero-bg-mesh" />
            <div className="hero-bloom" />
            <div className="hero-bg-grain" />
          </div>
          <div className="container audit-hero-inner">
            <p className="mono">{"// AI STRATEGY SESSION"}</p>
            <h1 className="display audit-hero-title">
              Everyone&apos;s using AI now.{" "}
              <span className="accent">
                Hardly anyone&apos;s making more money from it.
              </span>
            </h1>
            <p className="audit-hero-sub">
              Usually the tools are fine. The problem is where they&apos;re
              pointed: more capacity poured into the work that was never moving
              the needle. This session fixes that. 90 minutes, just the two of
              us. Whether you&apos;re barely scratching the surface with AI or
              already knee-deep in it, we work out the one thing actually
              holding your business back, and where you can use AI to get it
              done faster and better. Then I show you how, step by step.
            </p>
            <div className="audit-hero-actions">
              <p className="mono audit-offer">
                7 slots over the next fortnight &nbsp;&middot;&nbsp; &pound;499 +
                VAT{" "}
                <span className="audit-offer-was">(usually &pound;1,250)</span>
              </p>
              <a href="#apply" className="btn btn-primary lg audit-hero-cta">
                Apply for a slot
              </a>
            </div>
          </div>
        </section>

        {/* WHAT YOU WALK OUT WITH */}
        <section className="band-tight audit-walk">
          <div className="container">
            <p className="mono audit-eyebrow">{"// WHAT YOU WALK OUT WITH"}</p>
            <ul className="audit-rows">
              {walkaway.map((w) => (
                <li className="audit-row" key={w.label}>
                  <h2 className="h3 audit-row-label">{w.label}</h2>
                  <p className="audit-row-body">{w.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SESSION MONTAGE (anonymised) */}
        <section className="band-tight audit-proof">
          <div className="container">
            <p className="mono audit-eyebrow">{"// FROM A RECENT SESSION"}</p>
            <p className="audit-proof-lead">
              I had a call a while back with a guy who&apos;d enquired about
              working with us. It became clear he wanted to crack it himself
              rather than hand it over. So he paid for my time, we sat down and
              worked out where AI could actually pay off for his business, and I
              turned it into an instruction manual he could follow, step by
              step. Here&apos;s a look at what he walked out with.
            </p>
            {/* Anonymised montage of a real session's output (identifying
                frames dropped, hero frame cropped). Source frames + build
                script in scratchpad/montage. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="audit-montage"
              src="/assets/audit/session-montage.gif"
              alt="A montage of the work produced in a recent AI strategy session"
              width={920}
              height={575}
              loading="lazy"
            />
          </div>
        </section>

        {/* APPLICATION */}
        <section className="band audit-apply night" id="apply">
          <div className="container audit-apply-inner">
            <p className="mono audit-eyebrow">{"// APPLY"}</p>
            <h2 className="h2 audit-apply-title">Apply for a slot.</h2>
            <p className="audit-apply-lead">
              7 slots, first come first served. Fill this in and I&apos;ll see
              where you&apos;re at with AI so I can turn up prepped, then
              I&apos;ll WhatsApp you to lock in a time.
            </p>
            <AuditForm />
          </div>
        </section>
      </main>

      {/* FOOTER (night) */}
      <footer className="site night">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/ttm-secondary-wht.png"
                alt="Test Tube Marketing"
                width={1600}
                height={467}
              />
              <p>
                Marketing leadership on retainer. Execution by the project.
                Test. Measure. Scale.
              </p>
            </div>
            <div className="footer-right mono">
              <div>
                TEST TUBE MARKETING LTD &nbsp;&middot;&nbsp; REG NO. 15388084
              </div>
              <div>
                HOLLY GRANGE &nbsp;&middot;&nbsp; HOLLY LANE
                &nbsp;&middot;&nbsp; BALSALL COMMON &nbsp;&middot;&nbsp; CV7 7EB
              </div>
              <div>
                <a href="mailto:hello@testtubemarketing.com">
                  HELLO@TESTTUBEMARKETING.COM
                </a>
              </div>
              <div className="links">
                <a href="/privacy">Privacy Policy</a>
                <a href="mailto:hello@testtubemarketing.com">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="footer-strip mono">
            <div>&copy; 2026 TEST TUBE MARKETING LTD. ALL RIGHTS RESERVED.</div>
            <div>{"// TEST. MEASURE. SCALE."}</div>
          </div>
        </div>
        <div className="footer-signature" aria-hidden="true" />
      </footer>
    </>
  );
}
