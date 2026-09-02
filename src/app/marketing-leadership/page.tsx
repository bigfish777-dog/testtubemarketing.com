import type { Metadata } from "next";
import styles from "@/styles/path.module.css";
import { Arrival } from "@/components/arrival";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_LABEL, whatsappHref } from "@/content/contact";
import { Intro, BillLine, CtaLine } from "./intro";
import { PRICING, PRICING_FOOTNOTE } from "@/content/proof";

/*
 * /marketing-leadership - "I'm after someone to run my marketing".
 *
 * The offer page. Built around the two-room split that the whole business
 * model rests on: heads on retainer, hands by the project.
 *
 * COPY PROVENANCE:
 *   - The confession, the two rooms, the retainer year, the pull quote and
 *     every pricing line are VERBATIM from a6d4dd2. Do not edit them. The
 *     figures in particular are load-bearing: £2,500 + VAT for a standalone
 *     half-day, from £2,500 a month for the retainer, execution quoted per
 *     project. There is no full-day figure and one must never be invented.
 *   - The personalised opener and section framing are Claude's draft.
 */


const RETAINER_YEAR = [
  {
    label: "Annual session",
    detail: "One annual session, up to a full day, to set the year.",
  },
  {
    label: "Q1 sit-down",
    detail:
      "A quarterly half-day to review the last 90 days and map the next 90.",
  },
  {
    label: "Q2 sit-down",
    detail:
      "A quarterly half-day to review the last 90 days and map the next 90.",
  },
  {
    label: "Q3 sit-down",
    detail:
      "A quarterly half-day to review the last 90 days and map the next 90.",
  },
] as const;

export const metadata: Metadata = {
  title: "Marketing leadership on retainer - Test Tube Marketing",
  description:
    "One simple monthly fee covers our heads and our planning. Projects pay for our hands.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={styles.page}>
      <Arrival />

      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <p className={styles.sys}>
            <span>// the offer</span>
          </p>

          {/* Fish's strapline, his own line, confirmed 2026-08-26. */}
          <h1 className={`${styles.display} ${styles.heroHead}`}>
            Your marketing brains, on retainer.
          </h1>

          <Intro />
        </div>
      </header>

      <main>
        {/* ---------- the confession ---------- */}
        {/* Every word of this section is Fish's, verbatim from a6d4dd2. */}
        <section className={styles.band} aria-labelledby="confession-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// why we changed it</span>
            </p>
            <h2 className={styles.h2} id="confession-h">
              We used to sell big retainers. Then we noticed how they felt.
            </h2>

            <div className={styles.prose}>
              <p>
                Big, big monthly fees, everything bundled in. And that was fine
                when there was lots of stuff happening. But every client has
                months where they&apos;re on holiday, or between launches, or
                heads-down delivering the work we helped them sell. Then the
                invoice lands, and it feels like a big bill for a month where
                nothing much seemed to move. We&apos;d been active the whole
                time. The feeling still didn&apos;t match the number.
              </p>
              <p>
                <strong>So we tore the model up.</strong>
              </p>
              <p>
                Now our clients pay a smaller retainer to be a client. That buys
                our time, our thinking, and a plan we&apos;re accountable to.
                Then they pay for deliverables when they need them. Busy
                quarter, bigger invoice, lots shipped. Slow month, small
                invoice, and nobody pretending otherwise.
              </p>
            </div>

            <blockquote className={styles.pull}>
              &ldquo;I used to pay an agency the best part of £8k per month and
              could never really measure the output. Now, Ad and Fish run my
              marketing, and I only pay for the deliverables I want, when I want
              them.&rdquo;
              <cite className={styles.pullCite}>What clients tell us</cite>
            </blockquote>

            <div className={styles.prose}>
              <p>
                The part clients say they value most: we don&apos;t need
                briefing, because we&apos;re already on the inside. We sit in
                the planning, we know the numbers, we know what&apos;s coming
                next quarter. Fewer suppliers, no ramp-up, no re-explaining your
                business to a new account manager every six months.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- the two rooms ---------- */}
        <section className={styles.band} aria-labelledby="rooms-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// how it works</span>
            </p>
            <h2 className={styles.h2} id="rooms-h">
              Our heads are on retainer. Our hands are by the project.
            </h2>
            <p className={styles.dropLine}>
              Two ways we work, deliberately kept apart. One never switches off.
              The other moves in bursts, when there&apos;s something to build.
            </p>

            <div className={styles.rooms}>
              <div className={styles.room}>
                <p className={styles.roomLabel}>The retainer / always on</p>
                <h3 className={styles.h3}>
                  One simple monthly fee. You get our heads.
                </h3>
                <ul className={styles.roomList}>
                  <li>
                    <strong>Four in-person planning sessions a year.</strong>{" "}
                    One annual session, up to a full day, to set the year. Three
                    quarterly half-days to review the last 90 days and map the
                    next 90. At our place or yours.
                  </li>
                  <li>
                    <strong>Always-on access.</strong>{" "}Drop us a WhatsApp, send
                    us a voice note, give us a call. No monthly-call ceremony,
                    no usage meter.
                  </li>
                  <li>
                    <strong>Accountability.</strong>{" "}We hold the plan, we chase
                    the plan, we tell you when you&apos;re drifting off it.
                  </li>
                  <li>
                    <strong>Light touches in between.</strong>{" "}The tweaks, the
                    gut-checks, the &ldquo;should we do this?&rdquo; answers.
                    Included.
                  </li>
                </ul>
              </div>

              <div className={styles.room}>
                <p className={styles.roomLabel}>Execution / by the project</p>
                <h3 className={styles.h3}>
                  When you need our hands, we take care of the doing.
                </h3>
                <ul className={styles.roomList}>
                  <li>
                    Ad campaigns. Video shoots. Landing pages. Funnels. Print.
                    Launches.
                  </li>
                  <li>
                    Each one scoped, quoted, and invoiced separately. You see
                    the price before anything starts.
                  </li>
                  <li>
                    Take any quote of ours out to tender if you like.
                    We&apos;ll advise you on the bids either way, because the
                    retainer means we&apos;re on your side of the table.
                  </li>
                </ul>
              </div>
            </div>

            <blockquote className={styles.pull}>
              Simple version: one simple monthly fee covers our heads and our
              planning. Projects pay for our hands.
            </blockquote>
          </div>
        </section>

        {/* ---------- the retainer year ---------- */}
        <section className={styles.band} aria-labelledby="ry-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// the retainer year</span>
            </p>
            <h2 className={styles.h2} id="ry-h">
              Four in-person planning sessions a year.
            </h2>

            <ol className={styles.recordList}>
              {RETAINER_YEAR.map((s) => (
                <li className={styles.recordRow} key={s.label}>
                  <span className={styles.recordIdx}>[ok]</span>
                  <span className={styles.recordWho}>
                    <span className={styles.recordName}>{s.label}</span>
                  </span>
                  <span className={styles.recordResult}>{s.detail}</span>
                </li>
              ))}
              <li className={styles.recordRow}>
                <span className={styles.recordIdx}>[on]</span>
                <span className={styles.recordWho}>
                  <span className={styles.recordName}>Always-on access</span>
                </span>
                <span className={styles.recordResult}>
                  Drop us a WhatsApp, send us a voice note, give us a call. No
                  monthly-call ceremony, no usage meter.
                </span>
              </li>
            </ol>

            <p className={styles.dropLine}>At our place or yours.</p>
          </div>
        </section>

        {/* ---------- the bill ---------- */}
        {/* Every figure verbatim. No full-day figure exists; never invent one. */}
        <section
          className={`${styles.band} ${styles.night}`}
          aria-labelledby="bill-h"
        >
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// the bill</span>
            </p>
            <h2 className={`${styles.h2} ${styles.ctaHead}`} id="bill-h">
              The bill.
            </h2>
            <p className={styles.priceSupport}>
              We hate when businesses hide their pricing (and the stats show
              we&apos;re not alone). So here&apos;s exactly what having us
              inside your business looks like commercially.
            </p>
            <BillLine />

            <ul className={styles.ledger}>
              {PRICING.map((p) => (
                <li className={styles.priceRow} key={p.room}>
                  <span className={styles.priceRoom}>{p.room}</span>
                  <p className={styles.priceFig}>{p.figure}</p>
                  <p className={styles.priceSupport}>{p.support}</p>
                </li>
              ))}
            </ul>

            <p className={styles.priceFootnote}>{PRICING_FOOTNOTE}</p>
          </div>
        </section>

        {/* ---------- cta ---------- */}
        <section className={styles.band} aria-labelledby="cta-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// next</span>
            </p>
            <h2 className={styles.h2} id="cta-h">
              See if we&apos;re a fit.
            </h2>
            <CtaLine />
            <div className={styles.ctaRow}>
              <a className={styles.book} href={whatsappHref("the retainer page")}>
                <span aria-hidden="true">&gt;</span> {CONTACT_LABEL}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
