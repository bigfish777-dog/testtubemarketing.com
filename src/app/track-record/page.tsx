import type { Metadata } from "next";
import styles from "@/styles/path.module.css";
import { Arrival } from "@/components/arrival";
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

const BOOK_URL = "https://book.testtubemarketing.com";

export const metadata: Metadata = {
  title: "Our Record - Test Tube Marketing",
  description:
    "A sample of just eight of our engagements, from 153+ campaigns since 2014. Real businesses, real numbers, real outcomes.",
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
              Fish's amend 2026-08-31: frame the list as a sample rather than a
              total. He asked for "a sample of just ten"; the list holds EIGHT
              rows, so the number follows the list. Flagged to him. If he
              supplies two more engagements this becomes ten and the count moves
              with it. The count and the rows must never disagree on the page
              whose entire job is standing up to a check.
            */}
            <p className={styles.dropLine}>
              A sample of just eight of our engagements, from 153+ campaigns
              since 2014. Real businesses, real numbers, real outcomes.
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
              <span>// on the record / 7 verified statements</span>
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
         * Both bios verbatim. Adam owns the Expert Empires / Vaynerchuk /
         * Cardone story; Fish's bio has none of it. Locked fact.
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
              <article className={styles.person}>
                <figure className={styles.portrait}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/founders/nick-fisher.jpg"
                    alt="Nick Fisher, co-founder of Test Tube Marketing, mid-sentence with a microphone in hand, gesturing, against a dark grey wall"
                    width={1200}
                    height={1500}
                  />
                </figure>
                <div className={styles.nameBar}>
                  <h3 className={styles.h3}>Nick &ldquo;Fish&rdquo; Fisher</h3>
                  <span className={styles.role}>
                    Co-founder / Systems &amp; Strategy
                  </span>
                </div>
                <p className={styles.bio}>
                  Fish is a marketer by accident. He dropped out of uni, fell
                  into the nearest job going, and realised he was good at it.
                  Direct response is his lane: emails, offers, funnels, the
                  words that make people buy. He spent years as the
                  behind-the-scenes strategist and copywriter on big launches,
                  the name you never saw on the sales page. Here in the lab he
                  runs systems and strategy, the engine behind every client
                  account. He&apos;s also dad to two kids, which he&apos;ll tell
                  you is the harder of the two jobs.
                </p>
              </article>

              <article className={styles.person}>
                <figure className={styles.portrait}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/founders/adam-ashburn.jpg"
                    alt="Adam Ashburn, co-founder of Test Tube Marketing, seated relaxed in a navy polo shirt against a blue stage curtain"
                    width={1000}
                    height={1250}
                  />
                </figure>
                <div className={styles.nameBar}>
                  <h3 className={styles.h3}>Adam Ashburn</h3>
                  <span className={styles.role}>
                    Co-founder / Chief Experimenter
                  </span>
                </div>
                <p className={styles.bio}>
                  Adam was meant to be a golf pro. Then he got run over, and
                  marketing got him instead. He spent years as Head of Marketing
                  at Expert Empires, the events business that put names like
                  Gary Vaynerchuk and Grant Cardone on UK stages. Around the
                  office he was known as the founder&apos;s no.2, steering
                  marketing across the group&apos;s businesses, including Elite
                  Closing Academy, as they grew. Strategy is where he&apos;s
                  strongest: positioning, offers, and the plan that decides
                  what&apos;s worth doing before anyone touches an ad account.
                  Here in the lab he&apos;s our Chief Experimenter, testing
                  ideas with our own money before they go anywhere near yours.
                  Two kids at home, and yes, he still plays golf.
                </p>
              </article>
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
              <a className={styles.book} href={BOOK_URL}>
                <span aria-hidden="true">&gt;</span> Book a call
              </a>
              <p className={styles.ctaNote}>// no pitch, no pressure</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.night}>
        <div className={styles.container}>
          <div className={styles.foot}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.footLogo}
              src="/assets/ttm-secondary-wht.png"
              alt="Test Tube Marketing"
              width={1600}
              height={467}
            />
            <span>
              Test Tube Marketing Ltd &nbsp;&middot;&nbsp; Reg no. 15388084
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
