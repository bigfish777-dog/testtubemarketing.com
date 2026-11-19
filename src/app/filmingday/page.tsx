import type { Metadata } from "next";
import Link from "next/link";
import { Caveat, Figtree } from "next/font/google";
import { InterestForm } from "./interest-form";
import { ReelRing } from "./reel-ring";
import { hero, sheet, why, how, invest, unknowns, form, foot } from "./content";
import s from "./zine.module.css";

// Variant 3: "Wrap party zine". White canvas, colour arrives as big rounded
// tone-on-tone pastel blocks. The ring sits in the hero on a pink panel, its
// clips framed as polaroids with the business names handwritten underneath.

const body = Figtree({ subsets: ["latin"], variable: "--v3-body", display: "swap" });
const hand = Caveat({ subsets: ["latin"], variable: "--v3-hand", display: "swap" });

export const metadata: Metadata = {
  title: "Client Filming Day 2027 - Test Tube Marketing",
  description:
    "One day at a spa hotel in the Midlands. We plan your shoot with you, a professional videographer films it, and you get it back edited and ready to use.",
};

const tones = [s.tPink, s.tMint, s.tButter, s.tLilac];

export default function FilmingDayV3() {
  return (
    <div className={`${s.page} ${body.variable} ${hand.variable}`}>
      <header className={s.top}>
        <div className={`${s.wrap} ${s.topInner}`}>
          <Link href="/" className={s.logo} aria-label="Test Tube Marketing home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/ttm-secondary.png" alt="Test Tube Marketing" />
          </Link>
          <a href="#interested" className={s.navCta}>
            {hero.navCta}
          </a>
        </div>
      </header>

      <main>
        <section className={`${s.wrap} ${s.hero}`}>
          <h1 className={s.h1}>
            {hero.h1Lead} <span className={s.swash}>{hero.h1Accent}</span>
          </h1>
          <div className={s.heroCopy}>
            <p className={s.sub}>{hero.sub}</p>
            <a href="#interested" className={s.cta}>
              {hero.cta}
            </a>
            <p className={s.ctaNote}>{hero.ctaNote}</p>
          </div>
          <div className={s.panel}>
            <p className={s.panelTag}>{hero.tag}</p>
            <ReelRing skin={s} />
          </div>
        </section>

        <section className={`${s.wrap} ${s.letterRow}`}>
          <div className={s.letter}>
            <h2 className={s.h2}>{why.h2}</h2>
            {why.paras.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className={s.sign}>
              <span className={s.signName}>{why.sign}</span>
              <span className={s.signRole}>{why.signRole}</span>
            </p>
          </div>

          <aside className={s.ticket} aria-label="The day at a glance">
            <div className={s.stub}>
              <span className={s.stubTitle}>{sheet.head[0]}</span>
              <span className={s.stubRef}>{sheet.head[1]}</span>
            </div>
            <div className={s.ticketMain}>
              <dl className={s.rows}>
                {sheet.rows.map((r) => (
                  <div key={r.k} className={s.row}>
                    <dt>{r.k}</dt>
                    <dd>
                      {r.v}
                      {r.note && <span className={s.tbc}>{r.note}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className={s.ticketFoot}>
                <span>{sheet.foot[0]}</span>
                <span>{sheet.foot[1]}</span>
              </div>
            </div>
          </aside>
        </section>

        <section className={`${s.wrap} ${s.how}`}>
          <div className={s.howHead}>
            <h2 className={s.h2}>{how.h2}</h2>
            <p>{how.intro}</p>
          </div>
          <ol className={s.collage}>
            {how.steps.map((st, i) => (
              <li key={st.when} className={`${s.sticker} ${tones[i]}`}>
                <span className={s.num} aria-hidden="true">
                  {i + 1}
                </span>
                <p className={s.when}>{st.when}</p>
                <h3 className={s.h3}>{st.title}</h3>
                <p className={s.stepText}>{st.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.wrap}>
          <div className={`${s.block} ${s.invest}`}>
            <div className={s.investCopy}>
              <h2 className={s.h2}>{invest.h2}</h2>
              <p className={s.lead}>{invest.intro}</p>
              {invest.paras.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className={s.investSide}>
              <dl className={s.tiers}>
                {invest.tiers.map((t) => (
                  <div key={t.k} className={s.tier}>
                    <dt>{t.k}</dt>
                    <dd>{t.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className={s.policy}>
              <span>{invest.policyLead}</span>
              <span className={s.badge}>
                <span>&ldquo;{invest.policyQuote}&rdquo;</span>
              </span>
              <span>{invest.policyTail}</span>
            </p>
          </div>
        </section>

        <section className={s.wrap}>
          <div className={`${s.block} ${s.unknown}`}>
            <h2 className={s.h2}>{unknowns.h2}</h2>
            <dl className={s.chips}>
              {unknowns.rows.map((r) => (
                <div key={r.k} className={s.chip}>
                  <dt>{r.k}</dt>
                  <dd>{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="interested" className={`${s.wrap} ${s.formWrap}`}>
          <div className={`${s.block} ${s.formBlock}`}>
            <div className={s.formIntro}>
              <h2 className={`${s.h2} ${s.formH2}`}>{form.h2}</h2>
              <p>{form.intro}</p>
            </div>
            <InterestForm skin={s} button={s.submit} />
          </div>
        </section>
      </main>

      <footer className={`${s.wrap} ${s.foot}`}>
        <span>{foot.company}</span>
        <Link href="/privacy">{foot.privacy}</Link>
      </footer>
    </div>
  );
}
