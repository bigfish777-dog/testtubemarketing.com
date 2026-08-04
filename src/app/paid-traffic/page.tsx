import type { Metadata } from "next";
import { PaidTrafficEffects } from "./effects";
import "./paid-traffic.css";

export const metadata: Metadata = {
  title: "Paid Traffic | Test Tube Marketing",
  description:
    "We build and run paid advertising across every level of intent, not just the last one. And you see the numbers every day, not once a month.",
};

const BOOK = "https://book.testtubemarketing.com";

/* -------------------------------------------------------------------------
   THE RIG
   ------------------------------------------------------------------------- */

const levels = [
  {
    code: "LV.01",
    name: "Capture",
    state: "Already looking. Ready to buy now.",
    job: "Be present on high intent. Search, shopping, and defending your own brand terms.",
    measure: "Sales, direct and fast.",
  },
  {
    code: "LV.02",
    name: "Create",
    state: "Doesn't know the category exists, or doesn't believe it.",
    job: "Educate. Kill the objection before it has a chance to form.",
    measure: "Reach into the right audience. Depth of engagement.",
  },
  {
    code: "LV.03",
    name: "Consider",
    state: "Wants it. Isn't sure yet.",
    job: "Build trust. Proof, permission, and a way to see it properly.",
    measure: "Assisted conversions. Return visits. Saves.",
  },
  {
    code: "LV.04",
    name: "Convert",
    state: "Ready, and needs a next step that fits the price.",
    job: "Give them the right mechanism. Above a certain price that's rarely add to cart.",
    measure: "Booked calls, consultations, enquiries.",
  },
  {
    code: "LV.05",
    name: "Continue",
    state: "Has bought once.",
    job: "Bring them back. Most high-value categories are repeat over a lifetime.",
    measure: "Repeat rate. Second purchase value. Referral.",
  },
];

/* -------------------------------------------------------------------------
   THE FINDINGS
   Every figure here is as reported by the ad platform for the stated window.
   ------------------------------------------------------------------------- */

const records = [
  {
    code: "REC-01",
    logo: "/assets/logos/young-driver-ink.svg",
    anon: null,
    name: "Young Driver",
    what: "Driving lessons for 9 to 17 year olds, from £54.99 to £99.99, across 69 UK venues. Bought by parents and grandparents, usually as a gift.",
    did: "We took the account off the previous agency and rebuilt the funnel onto our own stack, with its own checkout, so every sale ties back to the ad that made it. We wrote the A/B decision rule before the test ran rather than after it. Five creative angle sets, one per buyer we could actually name. Reporting to the client from day one.",
    figures: [
      { n: "8x", l: "Blended return on ad spend across the account" },
      {
        n: "9.4x",
        l: "On the best performing audience, Target Audience Interests",
        sub: true,
      },
      {
        n: "1,005 purchases",
        l: "From £3,356 spend, £26,857 in tracked value",
        sub: true,
      },
    ],
    source: "Meta, 9 Feb to 6 May 2026",
    quote: {
      text: "I wish I'd found them years earlier!",
      cite: "Ian Mulligani, Founder and MD, Young Driver",
    },
  },
  {
    code: "REC-02",
    logo: null,
    anon: "Client named on request",
    name: "A certification programme with a £497 deposit",
    what: "A certification business selling to women aged 35 to 64. A free three day training, running into an offer taken with a £497 deposit.",
    did: "Full launch architecture: cold prospecting segmented by niche across the UK and Europe, a lookalike ladder, and structured retargeting. We built a server-side bridge from their CRM into Meta so a registration was counted once and only once, and backfilled the registrations the old setup had been dropping.",
    figures: [
      { n: "1,672", l: "Registrations at £15.11 each" },
      { n: "11.9%", l: "Click to registration, from £25,265 spend", sub: true },
      {
        n: "86% women 35-64",
        l: "Men were effectively zero. Cheapest segment was women 55-64 at £13.72",
        sub: true,
      },
    ],
    source: "Meta, 1 to 25 June 2026, reconciled against the CRM",
    quote: null,
  },
  {
    code: "REC-03",
    logo: "/assets/logos/optineck.png",
    anon: null,
    name: "OptiNeck",
    what: "A £55 patented neck wedge, designed by a chartered physiotherapist with 25+ years in clinic. Made in Britain.",
    did: "A 26 ad, 7 ad set campaign built entirely from scripted API calls, with a dated snapshot before every push and a paste-ready rollback on every script that changed live objects. Pixel and conversions API across two separate storefronts, deduplicated on event ID. We built him his own ad review app, so every ad went through his review and nothing ran that he had not signed off. And we set a documented claims ceiling, cutting statistics he was perfectly entitled to use because they weren't evidenced well enough to defend.",
    figures: [
      { n: "26 ads", l: "Across 7 ad sets, every one through client review" },
      { n: "Zero", l: "Unreviewed ads. Zero unevidenced claims.", sub: true },
      {
        n: "Built and approved",
        l: "Client paused before delivery began, so there is no performance to report",
        sub: true,
      },
    ],
    source: "Build record, July to August 2026",
    quote: null,
  },  {
    code: "REC-04",
    logo: "/assets/logos/thrive-navy.png",
    anon: null,
    name: "Thrive Business Coaching",
    what: "Coaching for clinic and studio owners. A £3.95 book funnel that had been running since April 2025, and a £997 + VAT course.",
    did: "We were brought in to rebuild it, and the audit came first. The account was reporting £4.39 a purchase, and we showed the client why that number could not be trusted. Then we rebuilt the funnel onto our stack with its own checkout and a server-side webhook as the single source of truth. In the process we found a broken fulfilment chain where buyers coming through the new checkout were receiving nothing at all, and fixed it. Then cart abandon capture, and a reconciliation script that puts all four layers side by side.",
    figures: [
      {
        n: "£4.39",
        l: "What the account was reporting per purchase when we inherited it",
      },
      {
        n: "1,336 purchases",
        l: "Lifetime from April 2025, before our rebuild",
        sub: true,
      },
      {
        n: "Rebuilt",
        l: "Own checkout, server-side source of truth, fulfilment chain fixed",
        sub: true,
      },
    ],
    source: "Meta, inherited account, lifetime from April 2025",
    quote: {
      text: "There was no real strategy, no real project plan, no bigger picture thinking. It was just, okay, we'll try a few Facebook ads or a few emails.",
      cite: "Katie Bell, Thrive Business Coaching, on life before TTM",
    },
  },
];

/* -------------------------------------------------------------------------
   INSTRUMENTS
   ------------------------------------------------------------------------- */

const instruments = [
  {
    num: "01",
    title: "Campaign architecture",
    desc: "Built across all five levels, with the structure and the kill rules written down before anything spends.",
  },
  {
    num: "02",
    title: "Creative",
    desc: "Angle sets, not one-offs. Built from what your audience already responds to, in the sizes each placement actually needs.",
  },
  {
    num: "03",
    title: "Pages and funnels",
    desc: "Designed and built by us. Our own checkout where it matters, so the sale ties back to the ad that made it.",
  },
  {
    num: "04",
    title: "Tracking and attribution",
    desc: "Pixel, conversions API, server-side events, deduplication, UTMs. The part that decides whether anything else can be judged at all.",
  },
  {
    num: "05",
    title: "Compliance",
    desc: "Platform policy and advertising standards checked before launch. We cut claims that can't be evidenced, including ones you're allowed to make.",
  },
  {
    num: "06",
    title: "Reporting",
    desc: "Daily, automatic, and the same numbers we're looking at. Never a monthly summary written after the money's gone.",
  },
];

/* Logo wall. Order is deliberate: recognisable marks first. */
const logos = [
  "young-driver-ink.svg",
  "thrive-navy.png",
  "keap.svg",
  "lexisnexis.svg",
  "digitalmarketer.png",
  "me-and-my-golf.svg",
  "optineck.png",
  "expert-empires-white.png",
  "retail-fest.png",
  "wtm-london.png",
  "entrepreneurs-network-white.png",
  "coaches-congress.svg",
  "will-polston.svg",
  "tess-cope-tta.png",
  "oynb.png",
  "the-avenue.svg",
  "vo2-master.png",
  "millbank-property.png",
  "cp-r.svg",
  "halsa.svg",
  "team-global.png",
  "corporate-connections.png",
  "exela.png",
  "5ive.png",
  "ppp.svg",
  "inspire-kbb.png",
  "dc-practice-growth.png",
  "biceps-and-banter.png",
  "voiceover-cafe.png",
  "upa-stamp-auctions.png",
  "proactive-approaches.png",
  "jossiah-gets-leads.png",
  "ovl.png",
  "tilt-affinity.png",
  "mbs.png",
];

export default function PaidTraffic() {
  return (
    <div className="pt">
      {/* Runs before first paint. Only once this lands does the reveal CSS
          hide anything, so a visitor without JavaScript gets the whole page
          as a plain readable document rather than a blank screen. */}
      <script
        dangerouslySetInnerHTML={{
          __html: "document.documentElement.classList.add('pt-js')",
        }}
      />
      <PaidTrafficEffects />

      {/* HEADER */}
      <header className="site" id="siteHeader">
        <div className="container nav">
          <a
            href="https://www.testtubemarketing.com"
            className="brand"
            aria-label="Test Tube Marketing"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/ttm-secondary.png" alt="Test Tube Marketing" />
          </a>
          <a href={BOOK} className="btn btn-outline">
            Book a Call
          </a>
        </div>
      </header>

      <main id="top">
        {/* ---------------------------------------------------------------
            HERO
            --------------------------------------------------------------- */}
        <section className="pt-hero">
          <div className="container">
            <div className="pt-hero-grid">
              <div className="pt-rv">
                <div className="mono">
                  // PAID TRAFFIC&nbsp;&nbsp;/&nbsp;&nbsp;INSTRUMENT 03
                  <span className="pt-crumb-tail">
                    &nbsp;&nbsp;/&nbsp;&nbsp;TEST TUBE MARKETING
                  </span>
                </div>
                <h1 className="display xxl">
                  One ad doesn&rsquo;t
                  <br />
                  make a <span className="pink">customer.</span>
                </h1>
                <p className="pt-sub">
                  <b>
                    We build and run paid advertising across every level of
                    intent, not just the last one.
                  </b>{" "}
                  And you see the numbers every day, not once a month.
                </p>
                <div>
                  <a href={BOOK} className="btn btn-primary">
                    Book a Call <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
                <div className="pt-hero-trust mono">
                  FOR CONSIDERED PURCHASES, HIGH-VALUE SERVICES, AND BRANDS WITH
                  A REAL SALES PROCESS
                </div>
              </div>

              {/* the desk instrument, rendered as an artifact */}
              <div className="pt-rv" style={{ transitionDelay: ".12s" }}>
                <div className="pt-device-mount">
                <div className="pt-device">
                  <div className="pt-device-screen">
                    <div className="pt-device-top">
                      <span>Specimen account</span>
                      <span>Today</span>
                    </div>
                    <div className="pt-device-main">
                      <div className="k">Revenue</div>
                      <div className="v">&pound;1,284.71</div>
                    </div>
                    <div className="pt-device-row">
                      <div className="c">
                        <div className="k">Sales</div>
                        <div className="n">19</div>
                      </div>
                      <div className="c">
                        <div className="k">Spend</div>
                        <div className="n">&pound;86.00</div>
                      </div>
                      <div className="c">
                        <div className="k">Cost / sale</div>
                        <div className="n">&pound;4.53</div>
                      </div>
                    </div>
                    <div className="pt-device-foot">
                      <span className="live">Live 14:32</span>
                      <span>Sample readout</span>
                      <span>1 / 4</span>
                    </div>
                  </div>
                </div>
                </div>
                <div className="pt-device-cap">
                  <span>FIG. 01 / The instrument</span>
                  <span className="r">TTM-RLCD-01</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGO WALL */}
        <section className="pt-logos" aria-label="Selected clients">
          <p className="pt-sr">
            Selected clients include Young Driver, Thrive Business Coaching,
            Keap, LexisNexis, DigitalMarketer, Me and My Golf, OptiNeck, Expert
            Empires, Retail Fest and World Travel Market London.
          </p>
          <div className="pt-logos-inner">
            <div className="pt-logo-track">
              {[...logos, ...logos].map((file, i) => (
                <span
                  key={`${file}-${i}`}
                  className="pt-logo"
                  style={
                    { "--src": `url('/assets/logos/${file}')` } as React.CSSProperties
                  }
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </section>

        {/* PROOF STRIP. Both agency figures are carried verbatim from the
            main site, with their existing wording, so no new claim is made. */}
        <section className="stats" aria-label="By the numbers">
          <div className="container">
            <div className="stats-row">
              <div className="stat pt-rv">
                <span className="idx">001</span>
                <div className="num">&pound;36.2m+</div>
                <div className="lbl">Generated for clients</div>
              </div>
              <div className="stat pt-rv">
                <span className="idx">002</span>
                <div className="num">153+</div>
                <div className="lbl">Campaigns run since 2014</div>
              </div>
              <div className="stat pt-rv">
                <span className="idx">003</span>
                <div className="num word">Daily</div>
                <div className="lbl">Numbers in your inbox, not monthly</div>
              </div>
              <div className="stat pt-rv">
                <span className="idx">004</span>
                <div className="num word">In-House</div>
                <div className="lbl">UK team, founders in every account</div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            01 / THE DIAGNOSIS
            --------------------------------------------------------------- */}
        <section className="pt-band" id="diagnosis">
          <div className="container">
            <div className="pt-arg-grid">
              <div className="pt-arg-head">
                <div className="pt-rv">
                  <div className="mono-tag">01 / The Diagnosis</div>
                  <h2
                    className="display xl"
                    style={{ margin: "18px 0 0", maxWidth: "15ch" }}
                  >
                    &ldquo;The ads aren&rsquo;t working&rdquo; is usually{" "}
                    <span className="pink">the wrong diagnosis.</span>
                  </h2>
                </div>
              </div>

              <div className="pt-arg-body pt-rv" style={{ transitionDelay: ".08s" }}>
                <p>
                  Run an ad, get a customer. That works when the thing you sell
                  is cheap, familiar and impulsive. One good ad, a working
                  checkout, done. We have run exactly that, and it did 8x.
                </p>
                <p>
                  The moment price, risk or unfamiliarity goes up, it stops
                  working. Your buyer stops being one person taking one action.
                  They become the same person at five different stages, months
                  apart, needing five different things.
                </p>
                <p>
                  Advertise at one of those stages and three things happen, in
                  this order.
                </p>

                <div className="pt-consequences">
                  <div className="pt-consequence">
                    <span className="n">01</span>
                    <p>
                      You spend money on people who were never going to buy
                      today.
                    </p>
                  </div>
                  <div className="pt-consequence">
                    <span className="n">02</span>
                    <p>
                      The platform can&rsquo;t find your buyers, because
                      it&rsquo;s never been shown what one looks like.
                    </p>
                  </div>
                  <div className="pt-consequence">
                    <span className="n">03</span>
                    <p>
                      The account gets judged on a conversion rate it was never
                      capable of producing.
                    </p>
                  </div>
                </div>

                <p className="pt-kicker">
                  That&rsquo;s an architecture problem, and no amount of creative
                  testing fixes it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            02 / THE RIG  (signature)
            --------------------------------------------------------------- */}
        <section className="pt-band pt-night-band" id="rig">
          <div className="container">
            <div className="pt-head pt-rv">
              <div className="mono-tag">02 / The Rig</div>
              <h2 className="display xl" style={{ maxWidth: "16ch" }}>
                Five levels. <span className="pink">One rig.</span>
              </h2>
              <p className="pt-lede" style={{ color: "var(--pt-on-night-soft)" }}>
                Every considered purchase runs through all five. Most accounts
                are built for one. Here&rsquo;s what each level has to do, and
                what it should be judged on.
              </p>
            </div>

            <div className="pt-rig">
              {levels.map((lv, i) => (
                <div className="pt-level" key={lv.code} data-order={i}>
                  <div className="pt-level-code">
                    <span>{lv.code}</span>
                    <span className="nm">{lv.name}</span>
                  </div>
                  <dl>
                    <dt>Your buyer</dt>
                    <dd>{lv.state}</dd>
                  </dl>
                  <dl>
                    <dt>What the advertising has to do</dt>
                    <dd>{lv.job}</dd>
                  </dl>
                  <dl className="pt-measure">
                    <dt>Judged on</dt>
                    <dd>
                      <strong>{lv.measure}</strong>
                    </dd>
                  </dl>
                </div>
              ))}
            </div>

            <div className="pt-rig-base pt-rv">
              <div className="lbl">Base plate</div>
              <p>
                Underneath all five sits the layer nobody sells and everybody
                needs. <strong>Measurement.</strong> Without it, levels two to
                five are invisible. Invisible things get cut. So only level one
                survives, the account plateaus, and it looks like failure when
                it was really just a missing instrument.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            03 / THE FINDINGS
            --------------------------------------------------------------- */}
        <section className="pt-band" id="findings">
          <div className="container">
            <div className="pt-head pt-rv">
              <div className="mono-tag">03 / The Findings</div>
              <h2 className="display xl" style={{ maxWidth: "13ch" }}>
                Four accounts.{" "}
                <span className="pink">Four different problems.</span>
              </h2>
              <p className="pt-lede">
                Not four versions of the same campaign. Every figure below is as
                reported by the ad platform, for the window stated underneath it.
              </p>
            </div>

            <div className="pt-records">
              {records.map((r) => (
                <article className="pt-record pt-rv" key={r.code}>
                  <div className="pt-record-mark">
                    <span className="code">{r.code}</span>
                    {r.logo ? (
                      <span
                        className="logo"
                        style={
                          { "--src": `url('${r.logo}')` } as React.CSSProperties
                        }
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="anon">{r.anon}</span>
                    )}
                  </div>

                  <div className="pt-record-body">
                    <h3>{r.name}</h3>
                    <p className="what">{r.what}</p>
                    <p className="did">{r.did}</p>
                    {r.quote && (
                      <blockquote className="quote">
                        &ldquo;{r.quote.text}&rdquo;
                        <cite>{r.quote.cite}</cite>
                      </blockquote>
                    )}
                  </div>

                  <div className="pt-record-figures">
                    {r.figures.map((f) => (
                      <div
                        className={`pt-fig${f.sub ? " sub" : ""}`}
                        key={f.n}
                      >
                        <div className="n">{f.n}</div>
                        <div className="l">{f.l}</div>
                      </div>
                    ))}
                    <div className="pt-record-source">{r.source}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            04 / THE INSTRUMENTS
            --------------------------------------------------------------- */}
        <section className="pt-band tight pt-alt" id="instruments">
          <div className="container">
            <div className="pt-head pt-rv">
              <div className="mono-tag">04 / The Instruments</div>
              <h2 className="display xl" style={{ maxWidth: "16ch" }}>
                What we actually <span className="pink">build.</span>
              </h2>
              <p className="pt-lede">
                Most agencies do one or two of these and outsource the rest.
                We run all six in-house, which is why the levels connect to each
                other instead of sitting in separate silos.
              </p>
            </div>

            <div className="pt-instruments">
              {instruments.map((it) => (
                <article className="pt-inst pt-rv" key={it.num}>
                  <span className="num">INSTRUMENT {it.num}</span>
                  <h3>{it.title}</h3>
                  <p>{it.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            05 / THE READOUT
            --------------------------------------------------------------- */}
        <section className="pt-band" id="readout">
          <div className="container">
            <div className="pt-head pt-rv">
              <div className="mono-tag">05 / The Readout</div>
              <h2 className="display xl" style={{ maxWidth: "15ch" }}>
                You&rsquo;ll never have to ask{" "}
                <span className="pink">how it&rsquo;s going.</span>
              </h2>
              <p className="pt-lede">
                Most agencies report monthly. By the time the report lands, the
                month has gone and so has the money. We do it the other way
                round.
              </p>
            </div>

            <div className="pt-report-grid">
              <div className="pt-rv pt-report-sticky">
                <div className="pt-email">
                  <div className="pt-email-bar">
                    <span>Specimen account &middot; daily numbers</span>
                    <span>Sat, 2 Aug</span>
                  </div>
                  <div className="pt-email-tot">
                    <div>
                      <div className="k">Total sales</div>
                      <div className="v">24</div>
                    </div>
                    <div>
                      <div className="k">Total revenue</div>
                      <div className="v">&pound;1,612.44</div>
                    </div>
                  </div>
                  <div className="pt-email-block">
                    <span className="k">Meta &middot; paid ads</span>
                    <div className="cells">
                      <span>
                        <b>19</b>Sales
                      </span>
                      <span>
                        <b>&pound;1,284</b>Revenue
                      </span>
                      <span>
                        <b>&pound;86.00</b>Spend
                      </span>
                      <span>
                        <b>&pound;4.53</b>Cost / sale
                      </span>
                    </div>
                  </div>
                  <div className="pt-email-block">
                    <span className="k">Email &middot; database</span>
                    <div className="cells">
                      <span>
                        <b>3</b>Orders
                      </span>
                      <span>
                        <b>&pound;218</b>Revenue
                      </span>
                      <span>
                        <b>-</b>Spend
                      </span>
                      <span>
                        <b>-</b>Cost / sale
                      </span>
                    </div>
                  </div>
                  <div className="pt-email-block">
                    <span className="k">List building</span>
                    <div className="cells">
                      <span>
                        <b>41</b>New opt-ins
                      </span>
                      <span>
                        <b>3,904</b>Total to date
                      </span>
                    </div>
                  </div>
                  <div className="pt-email-foot">
                    Cost per sale uses paid bookings only, so the other channels
                    never flatter ad performance.
                  </div>
                </div>
                <div className="pt-email-cap">
                  <span>FIG. 02 / The email, every morning</span>
                  <span className="r">SENT EVERY MORNING</span>
                </div>
              </div>

              <div className="pt-report-notes pt-rv" style={{ transitionDelay: ".08s" }}>
                <div className="pt-note">
                  <h3>The instrument</h3>
                  <p>
                    We built a screen for your desk that shows what your account
                    did today. Revenue, sales, spend and cost per sale,
                    refreshed every minute. It&rsquo;s a reflective display, so
                    it reads like paper and never glows at you. No app to open,
                    no login, no dashboard to learn. You look up, and you know.
                  </p>
                </div>
                <div className="pt-note">
                  <h3>The daily email</h3>
                  <p>
                    Every morning, automatically. Revenue and sales come from
                    the payment processor, which is the only thing that knows
                    what actually got paid for. Spend comes from the platform.
                    Split by channel, so paid never takes the credit for
                    something another channel did.
                  </p>
                </div>
                <div className="pt-note">
                  <h3>Built to fail honestly</h3>
                  <p>
                    The screen and the email count off the same code, so neither can
                    can&rsquo;t disagree. If a data source goes down, the email
                    still sends with a warning on it rather than silently going
                    missing, and any figure the screen can&rsquo;t confirm shows as a
                    dash, never a zero. We get the alert. You still get the
                    number.
                  </p>
                </div>
                <div className="pt-note flag">
                  <h3>The obvious catch</h3>
                  <p>
                    Daily numbers mean you see the bad days as well as the good
                    ones. Most agencies avoid that, which is exactly why their
                    clients spend three weeks of every month wondering. We think
                    seeing it is the point.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            06 / INITIATE
            --------------------------------------------------------------- */}
        <section className="pt-band pt-night-band" id="book">
          <div className="container">
            <div className="pt-cta pt-rv">
              <div className="mono" style={{ display: "block" }}>
                06 / Initiate
              </div>
              <h2 className="display xxl">
                Let&rsquo;s look at{" "}
                <span style={{ whiteSpace: "nowrap" }}>
                  your <span className="pink">account.</span>
                </span>
              </h2>
              <p className="pt-lede" style={{ color: "var(--pt-on-night-soft)" }}>
                Book a call. 40 minutes. We&rsquo;ll go through what&rsquo;s
                running now, which of the five levels you&rsquo;re actually
                covered on, and what&rsquo;s missing. No pitch, no pressure.
              </p>
              <a href={BOOK} className="btn btn-primary lg">
                Book a Call <span aria-hidden="true">&rarr;</span>
              </a>
              <div className="pt-cta-trust">
                <span>
                  <span className="check">&#10003;</span> Limited capacity
                </span>
                <span>
                  <span className="check">&#10003;</span> No obligation
                </span>
                <span>
                  <span className="check">&#10003;</span> UK team, in-house
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/ttm-logo.png" alt="Test Tube Marketing" />
              <p>
                We build and run your marketing function. Strategy and
                execution. So you can scale your business without the marketing
                relying on you.
              </p>
            </div>
            <div className="footer-right">
              <div>
                TEST TUBE MARKETING LTD &nbsp;&middot;&nbsp; REG NO. 15388084
              </div>
              <div>
                HOLLY GRANGE &nbsp;&middot;&nbsp; HOLLY LANE &nbsp;&middot;&nbsp;
                BALSALL COMMON &nbsp;&middot;&nbsp; CV7 7EB
              </div>
              <div>
                <a href="mailto:hello@testtubemarketing.com">
                  HELLO@TESTTUBEMARKETING.COM
                </a>
              </div>
              <div className="links">
                <a href="https://www.testtubemarketing.com">Main Site</a>
                <a href="/privacy">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-strip">
            <div>&copy; 2026 TEST TUBE MARKETING LTD. ALL RIGHTS RESERVED.</div>
            <div>// DONE. NOT TAUGHT.</div>
          </div>
          <div className="footer-notes">
            <div>
              <b>[1]</b> This site is not a part of the Facebook website or
              Facebook Inc.
            </div>
            <div>
              <b>[2]</b> FACEBOOK is a trademark of FACEBOOK, Inc.
            </div>
            <div>
              <b>[3]</b> Performance figures are as reported by the advertising
              platform for the window stated, are based on the experiences of
              our own company or our clients, and do not constitute a guarantee.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
