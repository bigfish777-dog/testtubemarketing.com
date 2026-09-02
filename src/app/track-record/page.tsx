import type { Metadata } from "next";
import styles from "@/styles/path.module.css";
import { Arrival } from "@/components/arrival";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_LABEL, whatsappHref } from "@/content/contact";
import { FOUNDERS } from "@/content/founders";
import { Intro, StatementsLine, CtaLine } from "./intro";
import {
  AWARD,
  RECORD,
  TESTIMONIALS,
  FLEX_QUOTES,
} from "@/content/proof";

/*
 * /track-record - "I want to check you two are legit".
 *
 * Takes first position in the chooser and the densest concentration of proof.
 * Post-referral due diligence is the most common reason someone types an
 * agency domain directly, and it is the intent a normal agency site serves
 * worst (ROUTER-BRIEF 3c).
 *
 * COPY PROVENANCE:
 *   - The award, the seven record rows, the seven testimonials and the twelve
 *     unprompted lines are all VERBATIM from a6d4dd2 via src/content/proof.ts.
 *     Real people, real numbers, real attributions. Never edited.
 *   - Both founder bios are Fish's, verbatim.
 *   - The personalised opener and section framing are Claude's draft.
 *
 * The award line says StartUp of the Year but it is a QUALIFIER, not a win.
 * The wording here matches what was signed off; do not promote it to a win.
 */


export const metadata: Metadata = {
  title: "Our Record - Test Tube Marketing",
  description:
    "A sample of just a handful of our engagements, across 153+ campaigns we've run since 2014. Real businesses, real numbers, real outcomes.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={styles.page}>
      <Arrival />

      <header className={styles.hero}>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <p className={styles.sys}>
            <span>// due diligence</span>
          </p>

          <h1 className={`${styles.display} ${styles.heroHead}`}>
            Go on then. Check.
          </h1>

          <Intro />

          <div className={styles.award}>
            <p className={styles.h3}>{AWARD.title}</p>
            <span className={styles.awardSub}>{AWARD.body}</span>
          </div>
        </div>
      </header>

      <main>
        {/* ---------- the record ---------- */}
        <section className={styles.band} aria-labelledby="record-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// our record</span>
            </p>
            <h2 className={styles.h2} id="record-h">
              Our Record.
            </h2>
            {/*
              Fish's line, verbatim 2026-09-01. "A handful" replaces the counted
              version and settles the problem underneath it: a stated number has
              to match the rows, and it did not. This does not state one, so the
              list can grow or shrink without the copy going stale or wrong.
            */}
            <p className={styles.dropLine}>
              A sample of just a handful of our engagements, across 153+
              campaigns we&apos;ve run since 2014. Real businesses, real
              numbers, real outcomes.
            </p>

            <ol className={styles.recordList}>
              {RECORD.map((r) => (
                <li className={styles.recordRow} key={r.idx}>
                  <span className={styles.recordIdx}>[{r.idx}]</span>
                  <span className={styles.recordWho}>
                    <span className={styles.recordName}>{r.name}</span>
                    <span className={styles.recordBiz}>{r.biz}</span>
                  </span>
                  <span className={styles.recordResult}>{r.text}</span>
                </li>
              ))}
            </ol>

            {/*
              DRAFT COPY - Claude's wording of Fish's instruction 2026-08-31,
              not his prose. He asked for an offer to introduce the visitor to
              anyone on the list, plus the point that they are welcome to go
              round us and ask them directly. That second half is the part that
              carries the weight: offering an introduction is what everyone
              says, inviting someone to check without us in the room is not.
            */}
            <p className={styles.recordOffer}>
              Want to speak to any of them? Say the word and we’ll make the
              introduction. Or go and find them online and ask them yourself,
              without us in the room. They’ll tell you the same thing.
            </p>
          </div>
        </section>

        {/* ---------- what they said ---------- */}
        <section className={styles.band} aria-labelledby="said-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              {/* Count comes from the data. A hand-typed one is how the record
                  lede ended up claiming ten against seven rows. */}
              <span>
                // on the record / {TESTIMONIALS.length} verified statements
              </span>
            </p>
            <h2 className={styles.h2} id="said-h">
              In their words, not ours.
            </h2>
            <StatementsLine />

            <div className={styles.quotes}>
              {TESTIMONIALS.map((t) => (
                <blockquote className={styles.quote} key={t.name}>
                  <div>
                    <p className={styles.quotePull}>{t.kicker}</p>
                    <cite className={styles.quoteCite}>
                      {t.name} / {t.biz}
                    </cite>
                  </div>
                  <p className={styles.quoteBody}>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- unprompted ---------- */}
        <section className={styles.band} aria-labelledby="unprompted-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// unprompted</span>
            </p>
            <h2 className={styles.h2} id="unprompted-h">
              Things people say when nobody asked.
            </h2>

            <div className={styles.flex}>
              {FLEX_QUOTES.map((f) => (
                <blockquote className={styles.flexQuote} key={f.name}>
                  <p className={styles.flexLine}>
                    &ldquo;{f.quote}&rdquo;
                    {f.note ? <sup className={styles.star}>*</sup> : null}
                  </p>
                  <cite className={styles.flexCite}>
                    {f.name} / {f.descriptor}
                  </cite>
                  {f.note ? (
                    <p className={styles.flexNote}>* {f.note}</p>
                  ) : null}
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- founders ---------- */}
        {/*
         * Bios come from src/content/founders.ts so an edit reaches every page
         * that shows them. Adam owns the Vaynerchuk / Cardone story; Fish's bio
         * has none of it. Locked fact.
         */}
        <section className={styles.band} aria-labelledby="who-h">
          <div className={styles.container}>
            <p className={styles.sys}>
              <span>// who you would actually get</span>
            </p>
            <h2 className={styles.h2} id="who-h">
              Two founders. Both in every client account.
            </h2>
            {/* Fish's line, verbatim. */}
            <p className={styles.dropLine}>
              Nothing gets delegated to someone you&apos;ve never met.
            </p>

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
            <h2 className={`${styles.h2} ${styles.ctaHead}`} id="cta-h">
              Seen enough?
            </h2>
            <CtaLine />
            <div className={styles.ctaRow}>
              <a className={styles.book} href={whatsappHref("the due diligence page")}>
                <span aria-hidden="true">&gt;</span> {CONTACT_LABEL}
              </a>
              {/*
                DRAFT - Claude's, not Fish's. It used to read "// no pitch, no
                pressure", which worked while the lead above it said "Forty
                minutes, no pitch, no pressure". Dropping the forty minutes,
                since there is no call to book, left the two saying the same six
                words one under the other. This says something the lead does
                not, and it is true of a WhatsApp in a way it was never true of
                a booking form.
              */}
              <p className={styles.ctaNote}>// straight to us, not a form</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
