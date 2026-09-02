import type { Metadata } from "next";
import styles from "@/styles/path.module.css";
import { Arrival } from "@/components/arrival";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_LABEL, whatsappHref } from "@/content/contact";
import { FOUNDERS } from "@/content/founders";
import { Intro, RoomsLine, CtaLine } from "./intro";

/*
 * /speaking - "I want you to speak at my event".
 *
 * First real path page. Static, server-rendered, complete on its own: someone
 * arriving here from a search result or a forwarded link gets the whole thing
 * with no chooser and no boot, per ROUTER-BRIEF section 2 point 3.
 *
 * COPY PROVENANCE, because this matters more than the design:
 *   - The stage paragraph and both founder bios are FISH'S OWN WORDS, carried
 *     verbatim from a6d4dd2. Do not edit, tighten or "improve" them.
 *   - Everything marked DRAFT below is Claude's placeholder and does not ship.
 *   - The stage list is DELIBERATELY UNPOPULATED. See the note above it.
 */


export const metadata: Metadata = {
  title: "Speaking - Test Tube Marketing",
  description:
    "Big rooms, a few different countries, other people's events. If you want one of us at yours, that starts at £15,000 plus expenses.",
  // Stays out of the index until Fish's real copy lands.
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={styles.page}>
      <Arrival />

      {/* ---------- hero ---------- */}
      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <p className={styles.sys}>
            <span>// from the stage</span>
          </p>

          <h1 className={`${styles.display} ${styles.heroHead}`}>
            We&apos;re more often on someone else&apos;s stage.
          </h1>

          {/* Fish's copy, personalised. See intro.tsx for provenance. */}
          <Intro />
        </div>

        <figure className={styles.heroShot}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/founders/two-shot-stage.jpg"
            alt="Nick Fisher and Adam Ashburn on stage at an Education and Coaching Academy event, both holding microphones in front of an ECA backdrop"
            width={2000}
            height={1148}
          />
        </figure>
      </header>

      <main>
        {/* ---------- the ask ---------- */}
        {/*
         * Fish's paragraph, verbatim from a6d4dd2. The fifteen grand is the
         * whole point of the section: it anchors the retainer as the sane
         * option, which is the job this content was written to do.
         */}
        <section className={styles.band} aria-labelledby="ask-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// what it costs</span>
            </p>
            <h2 className={styles.srOnly} id="ask-h">
              Booking us to speak
            </h2>
            <p className={styles.ask}>
              Big rooms, a few different countries, other people&apos;s events.
              If you want one of us at yours, that starts at{" "}
              <strong className={styles.figure}>&pound;15,000</strong>
              {" plus expenses. "}
              Most people don&apos;t come to us that way though. They
              come because they saw us do it, or because someone who did told
              them to. Put that same thinking to work inside your business and
              you&apos;re into retainer territory, which is a good deal less
              than fifteen grand for a morning.
            </p>
          </div>
        </section>

        {/* ---------- stages ---------- */}
        {/*
         * DELIBERATELY EMPTY. The logo marquee on the old homepage is a CLIENT
         * list (LexisNexis, Keap, Young Driver, Millbank Property and so on),
         * not a list of stages either founder has spoken from. Dressing those
         * marks up as speaking credits would be inventing a credential.
         *
         * The only stage fact verifiable from what is in this repo is the ECA
         * event in the photograph above. Fish supplies the real list, or this
         * section comes out before launch. Never populate it by guessing.
         */}
        <section className={styles.band} aria-labelledby="stages-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// rooms</span>
            </p>
            <h2 className={styles.h2} id="stages-h">
              Where we&apos;ve stood.
            </h2>
            <RoomsLine />
            <ul className={styles.stageList}>
              <li className={styles.stageRow}>
                <span className={styles.stageIdx}>[01]</span>
                <span className={styles.stageName}>
                  The Education &amp; Coaching Academy, Belfast
                </span>
                <span className={styles.stageIdx}>verified</span>
              </li>
              <li className={styles.stageRow}>
                <span className={styles.stageIdx}>[..]</span>
                <span className={styles.stageName}>
                  Awaiting Fish&apos;s real list. Nothing invented here.
                </span>
                <span className={styles.stageIdx}>draft</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ---------- who actually turns up ---------- */}
        {/*
         * Both bios verbatim from a6d4dd2. Adam owns the Expert Empires /
         * Vaynerchuk / Cardone story; Fish's bio has none of it. That split is
         * a locked fact and must not drift.
         */}
        <section className={styles.band} aria-labelledby="who-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// who turns up</span>
            </p>
            <h2 className={styles.h2} id="who-h">
              Both of us are in every room.
            </h2>

            <div className={styles.who}>
              {FOUNDERS.map((f) => (
                <article className={styles.person} key={f.key}>
                  <figure className={styles.portrait}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={f.photo}
                      alt={f.alt}
                      width={f.width}
                      height={f.height}
                    />
                  </figure>
                  <div className={styles.nameBar}>
                    <h3 className={styles.h3}>{f.name}</h3>
                    <span className={styles.role}>{f.role}</span>
                  </div>
                  <p className={styles.bio}>{f.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- cta ---------- */}
        <section
          className={`${styles.band} ${styles.night}`}
          aria-labelledby="cta-h"
        >
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// next</span>
            </p>
            {/* DRAFT COPY - Claude's placeholder, not Fish's. */}
            <h2 className={`${styles.h2} ${styles.ctaHead}`} id="cta-h">
              Tell us about the room.
            </h2>
            <CtaLine />
            <div className={styles.ctaRow}>
              <a className={styles.book} href={whatsappHref("the speaking page")}>
                <span aria-hidden="true">&gt;</span> {CONTACT_LABEL}
              </a>
              <p className={styles.ctaNote}>
                // from &pound;15,000 plus expenses
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
