import type { Metadata } from "next";
import { PaidTrafficEffects } from "./effects";
import "./paid-traffic.css";

export const metadata: Metadata = {
  // Set here rather than in the shared root layout: this project serves the
  // paidtraffic subdomain, and without it the OG image URL resolves to
  // localhost when the link is shared.
  metadataBase: new URL("https://paidtraffic.testtubemarketing.com"),
  title: "Paid Traffic | Test Tube Marketing",
  description:
    "We take care of paid traffic end to end. Strategy, creative, pages, tracking, reporting. You get on with running the business, and you see the numbers every day.",
};

/* No call booking. The enquiry goes straight to the inbox. */
const BOOK =
  "mailto:hello@testtubemarketing.com?subject=Paid%20traffic%20-%20my%20account";
const CTA = "Send Us Your Account";

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
      { n: "11.85x", l: "Return on ad spend" },
      {
        n: "83% lower",
        l: "Cost per sale, against what the account was doing under the previous agency",
        sub: true,
      },
    ],
    source:
      "Meta, current account performance against the previous agency baseline",
    quote: {
      text: "I wish I'd found them years earlier!",
      cite: "Ian Mulligani, Founder and MD, Young Driver",
    },
  },
  {
    code: "REC-02",
    logo: null,
    anon: "Details protected under NDA",
    name: "A premium certification programme",
    what: "A £5,000 certification, sold to women aged 35 to 64 off the back of a free three day training.",
    did: "Full launch architecture: cold prospecting segmented by niche across the UK and Europe, a lookalike ladder, and structured retargeting. We built a server-side bridge from the CRM into Meta, so every sale was counted once and counted properly.",
    figures: [
      { n: "5.73x", l: "Return on ad spend" },
      { n: "£146,798", l: "Revenue generated", sub: true },
      { n: "£25,625", l: "Ad spend", sub: true },
    ],
    source: "Meta, reconciled against the CRM",
    quote: null,
  },
  {
    code: "REC-03",
    logo: "/assets/logos/optineck.png",
    anon: null,
    name: "OptiNeck",
    what: "A £55 patented neck wedge, designed by a chartered physiotherapist with 25+ years in clinic. Made in Britain.",
    did: "We built him the whole campaign. We wrote the copy and produced the creative ourselves, working from his product shots, and we built out real variation rather than one idea in three sizes, so there was something genuine to test from day one. Every ad cut to every placement it would run in. He got his own review app, so he saw and approved each one before it went live. Written, built and shipped in weeks.",
    figures: [
      {
        n: "26 ads",
        l: "Written, designed and built in-house, across 7 ad sets",
      },
      {
        n: "Every placement",
        l: "Each ad cut to the sizes its placement actually needs",
        sub: true,
      },
      { n: "Zero", l: "Ads that ran without his sign off", sub: true },
    ],
    source: "Build record, July to August 2026",
    quote: null,
  },  {
    code: "REC-04",
    logo: "/assets/logos/thrive-navy.png",
    anon: null,
    name: "Thrive Business Coaching",
    what: "Coaching for clinic and studio owners, sold through a £3.95 book funnel into a £997 + VAT course.",
    did: "We rebuilt the funnel onto our own stack with its own checkout, so every sale ties back to the ad that made it. The front end pays for itself: the book funds the traffic that sells it, which means the advertising isn't waiting on the back end to justify itself. The real money is made after the book, and that's where it's been made.",
    figures: [
      { n: "1,000+ books", l: "Sold through a self liquidating funnel" },
      {
        n: "£100,000+",
        l: "Back end revenue generated off the back of them",
        sub: true,
      },
    ],
    source: "Funnel performance to date",
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

/* -------------------------------------------------------------------------
   THE OPERATORS
   Fish's and Adam's bios and alt text are carried verbatim from the main
   site's founder section. Chris's is Fish's own copy. A null photo renders
   a plate rather than a broken image, so a portrait can be dropped in later
   without touching the markup.
   ------------------------------------------------------------------------- */

const founders = [
  {
    name: "Nick “Fish” Fisher",
    role: "CO-FOUNDER / SYSTEMS & STRATEGY",
    photo: "/assets/founders/nick-fisher.jpg",
    alt: "Nick Fisher, co-founder of Test Tube Marketing, mid-sentence with a microphone in hand, gesturing, against a dark grey wall",
    bio: "Fish is a marketer by accident. He dropped out of uni, fell into the nearest job going, and realised he was good at it. Direct response is his lane: emails, offers, funnels, the words that make people buy. He spent years as the behind-the-scenes strategist and copywriter on big launches, the name you never saw on the sales page. Here in the lab he runs systems and strategy, the engine behind every client account. He's also dad to two girls, which he'll tell you is the harder of the two jobs.",
  },
  {
    name: "Adam Ashburn",
    role: "CO-FOUNDER / CHIEF EXPERIMENTER",
    photo: "/assets/founders/adam-ashburn.jpg",
    alt: "Adam Ashburn, co-founder of Test Tube Marketing, seated relaxed in a navy polo shirt against a blue stage curtain",
    bio: "Adam was meant to be a golf pro. Then he got run over, and marketing got him instead. He spent years as Head of Marketing at Expert Empires, the events business that put names like Gary Vaynerchuk and Grant Cardone on UK stages. Around the office he was known as the founder's no.2, steering marketing across the group's businesses, including Elite Closing Academy, as they grew. Strategy is where he's strongest: positioning, offers, and the plan that decides what's worth doing before anyone touches an ad account. Here in the lab he's our Chief Experimenter, testing ideas with our own money before they go anywhere near yours. Two young boys at home, and yes, he still plays golf.",
  },
  {
    name: "Chris Black",
    role: "STRATEGIC ADVISOR",
    /* Square source, so the 4:5 crop takes it from the sides. Head is
       centred, so nothing important is lost. */
    photo: "/assets/founders/chris-black.jpg",
    alt: "Chris Black, strategic advisor at Test Tube Marketing, in a black and white head and shoulders portrait against a plain grey background",
    bio: "Having started, scaled, and exited multiple businesses, Chris has a deep insight into customer psychology and how to turn browsers into buyers. He's profitably run over £1m in paid traffic for clients and is on the cutting edge of advertising technology. His unique abilities enable us to scale accounts quickly and run profitable campaigns for our clients.",
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
  "voiceover-cafe.png",
  "proactive-approaches.png",
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
            {CTA}
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
                  We run the ads.
                  <br />
                  You get the{" "}
                  <span className="pink">customers.</span>
                </h1>
                <p className="pt-sub">
                  <b>
                    We take care of paid traffic end to end. Strategy, creative,
                    pages, tracking, reporting.
                  </b>{" "}
                  You get on with running the business. And you see the numbers
                  every day, not once a month.
                </p>
                <div>
                  <a href={BOOK} className="btn btn-primary">
                    {CTA} <span aria-hidden="true">&rarr;</span>
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
                  {/* The physical device. Screen is the same render the real
                      panel serves, composited back on so the type is real
                      rather than drawn. eslint-disable-next-line */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="pt-device-shot"
                    src="/assets/pt-device.webp"
                    alt="The desk instrument: a reflective display showing a specimen account's revenue of one thousand two hundred and eighty four pounds and seventy one pence today, with 19 sales, £86.00 spend and £4.53 cost per sale"
                    width={1500}
                    height={1089}
                  />
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
            Empires and World Travel Market London.
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
                  <strong>Run an ad, get a customer.</strong> That works when
                  the thing you sell is cheap, familiar and impulsive. One good
                  ad, a working checkout, done. We&rsquo;ve run exactly that, and it
                  did 8x.
                </p>
                <p>
                  The moment price, risk or unfamiliarity goes up, it stops
                  working. Your buyer stops being one person taking one action.
                  They become the same person at five different stages, months
                  apart, needing five different things.
                </p>
                <p>
                  Advertise at just one of those stages and three things happen, in
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
              <h2 className="display xl" style={{ maxWidth: "14ch" }}>
                Clients we&rsquo;ve helped in{" "}
                <span className="pink">the past three months.</span>
              </h2>
              <p className="pt-lede">
                Four different problems, not four versions of the same campaign.
                Every figure below is as reported by the ad platform, for the
                window stated underneath it.
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
            06 / THE OPERATORS
            Bios are the main site's own founder copy, carried verbatim.
            --------------------------------------------------------------- */}
        <section className="pt-band tight pt-alt" id="operators">
          <div className="container">
            <div className="pt-head pt-rv">
              <div className="mono-tag">06 / The Operators</div>
              <h2 className="display xl" style={{ maxWidth: "17ch" }}>
                The people you meet are{" "}
                <span className="pink">the people who run it.</span>
              </h2>
              <p className="pt-lede">
                Not an account manager, not a junior, not a network of
                freelancers you never meet. Whoever you speak to on the first
                call is still there on the hundredth day.
              </p>
            </div>

            <div className="pt-operators">
              {founders.map((f) => (
                <article className="pt-operator pt-rv" key={f.name}>
                  <figure className="pt-operator-photo">
                    {f.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={f.photo}
                        alt={f.alt ?? ""}
                        width={1200}
                        height={1500}
                        loading="lazy"
                      />
                    ) : (
                      <span className="pt-operator-plate" aria-hidden="true">
                        {f.name
                          .replace(/[^A-Za-z ]/g, "")
                          .split(" ")
                          .filter(Boolean)
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    )}
                  </figure>
                  <div className="pt-operator-body">
                    <div className="pt-operator-bar">
                      <h3>{f.name}</h3>
                      <span className="mono">{f.role}</span>
                    </div>
                    <p>{f.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------
            07 / INITIATE
            --------------------------------------------------------------- */}
        <section className="pt-band pt-night-band" id="book">
          <div className="container">
            <div className="pt-cta pt-rv">
              <div className="mono" style={{ display: "block" }}>
                07 / Initiate
              </div>
              <h2 className="display xxl">
                Let&rsquo;s look at{" "}
                <span style={{ whiteSpace: "nowrap" }}>
                  your <span className="pink">account.</span>
                </span>
              </h2>
              <p className="pt-lede" style={{ color: "var(--pt-on-night-soft)" }}>
                Tell us what you sell and what&rsquo;s running. We&rsquo;ll go
                through it and tell you which of the five levels you&rsquo;re
                actually covered on, and what&rsquo;s missing. No pitch, no
                pressure.
              </p>
              <a href={BOOK} className="btn btn-primary lg">
                {CTA} <span aria-hidden="true">&rarr;</span>
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
