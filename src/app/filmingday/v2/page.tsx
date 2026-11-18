import type { Metadata } from "next";
import Link from "next/link";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
import { InterestForm } from "../interest-form";
import { ReelRing } from "../reel-ring";
import { hero, sheet, why, how, invest, unknowns, form, foot } from "../content";
import { Timecode } from "./timecode";
import s from "./v2.module.css";

// Variant 2, "Production office": the page as the paperwork on the morning
// of the shoot. Call sheet grid with the ring in a camera viewfinder, scene
// slates, a budget sheet, a departure board, a release form.

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--v2-display",
  display: "swap",
});
const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--v2-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Client Filming Day 2027 - Test Tube Marketing",
  robots: { index: false, follow: false },
};

function Flaps({ text }: { text: string }) {
  return (
    <>
      <span className={s.srOnly}>{text}</span>
      <span className={s.flaps} aria-hidden="true">
        {text
          .toUpperCase()
          .split("")
          .map((c, i) => (
            <span key={i} className={c === " " ? `${s.flap} ${s.flapGap}` : s.flap}>
              {c === " " ? "" : c}
            </span>
          ))}
      </span>
    </>
  );
}

export default function FilmingDayV2() {
  return (
    <div className={`${s.page} ${display.variable} ${plex.variable}`}>
      <header className={s.top}>
        <div className={s.wrap}>
          <Link href="/" className={s.logo} aria-label="Test Tube Marketing home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/ttm-secondary.png" alt="Test Tube Marketing" />
          </Link>
          <span className={s.topRef}>{sheet.head[1]}</span>
          <a href="#interested" className={s.navCta}>
            {hero.navCta}
          </a>
        </div>
      </header>

      <main>
        {/* Hero: the call sheet itself */}
        <section className={s.wrap}>
          <div className={s.doc}>
            <div className={s.docHead}>
              <span>{sheet.head[0]}</span>
              <span className={s.docTag}>{hero.tag}</span>
              <span>{sheet.head[1]}</span>
            </div>

            <div className={s.titleCell}>
              <h1 className={s.h1}>
                {hero.h1Lead} <span className={s.accent}>{hero.h1Accent}</span>
              </h1>
            </div>

            <div className={s.leadCell}>
              <p className={s.sub}>{hero.sub}</p>
              <div className={s.ctaBlock}>
                <a href="#interested" className={s.cta}>
                  {hero.cta}
                  <span aria-hidden="true" className={s.ctaArrow}>
                    &rarr;
                  </span>
                </a>
                <span className={s.ctaNote}>{hero.ctaNote}</span>
              </div>
            </div>

            <div className={s.finderCell}>
              <ReelRing skin={s}>
                <div className={s.finder} aria-hidden="true">
                  <span className={`${s.crop} ${s.cropTL}`} />
                  <span className={`${s.crop} ${s.cropTR}`} />
                  <span className={`${s.crop} ${s.cropBL}`} />
                  <span className={`${s.crop} ${s.cropBR}`} />
                  <span className={s.cross} />
                  <span className={s.rec}>
                    <i />
                    REC
                  </span>
                  <Timecode className={s.tc} />
                  <span className={s.cam}>CAM A</span>
                </div>
              </ReelRing>
            </div>

            <dl className={s.sheet}>
              {sheet.rows.map((r) => (
                <div key={r.k} className={s.sheetCell}>
                  <dt>{r.k}</dt>
                  <dd>
                    {r.v}
                    {r.note && <span className={s.note}>{r.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>

            <div className={s.docFoot}>
              <span>{sheet.foot[0]}</span>
              <span className={s.docFootLive}>
                <i aria-hidden="true" />
                {sheet.foot[1]}
              </span>
            </div>
          </div>
        </section>

        {/* Why: the producer's note */}
        <section className={`${s.wrap} ${s.why}`}>
          <div className={s.whyHead}>
            <h2 className={s.h2}>{why.h2}</h2>
          </div>
          <div className={s.prose}>
            {why.paras.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className={s.sign}>
              {why.sign}
              <span>{why.signRole}</span>
            </p>
          </div>
        </section>

        {/* How: four scenes as clapperboard slates */}
        <section className={s.how}>
          <div className={`${s.wrap} ${s.howHead}`}>
            <h2 className={s.h2}>{how.h2}</h2>
            <p className={s.howIntro}>{how.intro}</p>
          </div>
          <div className={s.slatesScroll}>
            <ol className={s.slates}>
              {how.steps.map((st, i) => (
                <li key={st.when} className={s.slate}>
                  <div className={s.slateBar} aria-hidden="true" />
                  <div className={s.slateFields}>
                    <div className={s.slateField}>
                      <span>Scene</span>
                      <strong>{String(i + 1).padStart(2, "0")}</strong>
                    </div>
                    <div className={s.slateField}>
                      <span>When</span>
                      <strong>{st.when}</strong>
                    </div>
                  </div>
                  <h3 className={s.h3}>{st.title}</h3>
                  <p className={s.slateText}>{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Investment: the budget sheet, figures still TBC */}
        <section className={`${s.wrap} ${s.invest}`}>
          <div className={s.investHead}>
            <h2 className={s.h2}>{invest.h2}</h2>
            <p className={s.investIntro}>{invest.intro}</p>
          </div>
          <div className={s.budget}>
            <div className={s.budgetProse}>
              {invest.paras.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">Tier</th>
                  <th scope="col">Detail</th>
                  <td />
                </tr>
              </thead>
              <tbody>
                {invest.tiers.map((t) => (
                  <tr key={t.k}>
                    <th scope="row">{t.k}</th>
                    <td>{t.v}</td>
                    <td className={s.fig}>
                      <span className={s.chip}>TBC</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={s.stamp}>
              {invest.policyLead} &ldquo;{invest.policyQuote}&rdquo; {invest.policyTail}
            </p>
          </div>
        </section>

        {/* Unknowns: the departure board */}
        <section className={s.board}>
          <div className={s.wrap}>
            <h2 className={`${s.h2} ${s.boardH2}`}>{unknowns.h2}</h2>
            <dl className={s.boardRows}>
              {unknowns.rows.map((r) => (
                <div key={r.k} className={s.boardRow}>
                  <dt>
                    <Flaps text={r.k} />
                  </dt>
                  <dd>{r.v}</dd>
                  <dd className={s.boardStatus}>TBC</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Form: the release form */}
        <section id="interested" className={s.formBand}>
          <div className={`${s.wrap} ${s.formSection}`}>
            <div className={s.formIntro}>
              <h2 className={s.h2}>{form.h2}</h2>
              <p>{form.intro}</p>
            </div>
            <div className={s.release}>
              <div className={s.releaseHead}>
                <span>{sheet.head[1]}</span>
                <span>{sheet.foot[1]}</span>
              </div>
              <InterestForm skin={s} button={s.submit} />
            </div>
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
