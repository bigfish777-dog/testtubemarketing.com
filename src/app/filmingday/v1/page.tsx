import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { InterestForm } from "../interest-form";
import { ReelRing } from "../reel-ring";
import { hero, sheet, why, how, invest, unknowns, form, foot } from "../content";
import s from "./v1.module.css";

// Variant 1, "Premiere": a white gallery page that reads like the invite to a
// film premiere. Light display serif at very large sizes, one pink accent,
// and the ring of client clips as a wide screen wall under the hero.

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--fd1-serif",
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--fd1-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Client Filming Day 2027 - Test Tube Marketing",
  description:
    "One day at a spa hotel in the Midlands. We plan your shoot with you, a professional videographer films it, and you get it back edited and ready to use.",
  robots: { index: false, follow: false },
};

export default function FilmingDayPremiere() {
  return (
    <div className={`${s.page} ${serif.variable} ${sans.variable}`}>
      <header className={s.nav}>
        <Link href="/" className={s.logo} aria-label="Test Tube Marketing home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/ttm-secondary.png" alt="Test Tube Marketing" />
        </Link>
        <a href="#interested" className={s.navCta}>
          {hero.navCta}
        </a>
      </header>

      <main>
        <section className={s.hero}>
          <h1 className={s.h1}>
            {hero.h1Lead} <em className={s.accent}>{hero.h1Accent}</em>
          </h1>
          <div className={s.heroAside}>
            <p className={s.sub}>{hero.sub}</p>
            <div className={s.ctaRow}>
              <a href="#interested" className={s.btn}>
                {hero.cta}
              </a>
              <span className={s.ctaNote}>{hero.ctaNote}</span>
            </div>
          </div>
        </section>

        <ReelRing skin={s}>
          <p className={s.caption}>{hero.tag}</p>
        </ReelRing>

        <section className={s.programme} aria-label="The day at a glance">
          <div className={s.progHead}>
            <h2 className={s.progTitle}>{sheet.head[0]}</h2>
            <span className={s.smallcaps}>{sheet.head[1]}</span>
          </div>
          <dl className={s.progList}>
            {sheet.rows.map((r) => (
              <div key={r.k} className={s.progRow}>
                <dt className={s.smallcaps}>{r.k}</dt>
                <dd>
                  {r.v}
                  {r.note && <span className={s.progNote}>{r.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <div className={s.progFoot}>
            <span className={s.smallcaps}>{sheet.foot[0]}</span>
            <span className={s.smallcaps}>{sheet.foot[1]}</span>
          </div>
        </section>

        <section className={s.why}>
          <h2 className={s.h2}>{why.h2}</h2>
          <div className={s.prose}>
            {why.paras.map((p, i) => (
              <p key={i} className={i === 0 ? s.dropcap : undefined}>
                {p}
              </p>
            ))}
          </div>
          <p className={s.sign}>
            <span className={s.signName}>{why.sign}</span>
            <span className={s.smallcaps}>{why.signRole}</span>
          </p>
        </section>

        <section className={s.how}>
          <div className={s.howHead}>
            <h2 className={s.h2}>{how.h2}</h2>
            <p className={s.howIntro}>{how.intro}</p>
          </div>
          <ol className={s.posters}>
            {how.steps.map((st, i) => (
              <li key={st.when} className={s.poster}>
                <span className={s.numeral} aria-hidden="true">
                  {i + 1}
                </span>
                <div className={s.posterBody}>
                  <p className={s.smallcaps}>{st.when}</p>
                  <h3 className={s.h3}>{st.title}</h3>
                  <p className={s.posterText}>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className={s.inkBand}>
        <section className={s.invest}>
          <div className={s.investHead}>
            <h2 className={s.h2}>{invest.h2}</h2>
            <p className={s.investIntro}>{invest.intro}</p>
          </div>
          <div className={s.investBody}>
            {invest.paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <dl className={s.tiers}>
              {invest.tiers.map((t) => (
                <div key={t.k}>
                  <dt>{t.k}</dt>
                  <dd>{t.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className={s.policy}>
            <span className={s.policyLine}>{invest.policyLead}</span>
            <em className={s.policyQuote}>&ldquo;{invest.policyQuote}&rdquo;</em>
            <span className={s.policyLine}>{invest.policyTail}</span>
          </p>
        </section>
        </div>

        <section id="interested" className={s.formBand}>
          <div className={s.formInner}>
            <div className={s.formIntro}>
              <h2 className={s.h2}>{form.h2}</h2>
              <p>{form.intro}</p>
              <div className={s.unknowns}>
                <h3 className={s.unknownsTitle}>{unknowns.h2}</h3>
                <dl className={s.unknownList}>
                  {unknowns.rows.map((r) => (
                    <div key={r.k}>
                      <dt className={s.smallcaps}>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className={s.formCard}>
              <InterestForm skin={s} button={s.btn} />
            </div>
          </div>
        </section>
      </main>

      <footer className={s.foot}>
        <span>{foot.company}</span>
        <Link href="/privacy">{foot.privacy}</Link>
      </footer>
    </div>
  );
}
