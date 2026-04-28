import { ClientEffects } from "./client-effects";

const findings = [
  { code: "TTM-0001", name: "Kirsty Darkins", biz: "KD Commercial", text: "£130,000+ in new business within 90 days of engagement." },
  { code: "TTM-0002", name: "Tess Cope", biz: "The Transformation Agency", text: "40% year-on-year growth. Past 7 figures for the first time." },
  { code: "TTM-0003", name: "Katie Bell", biz: "Thrive Business Coaching", text: "Business grew while founder was on maternity leave." },
  { code: "TTM-0004", name: "Steve Keane", biz: "Kraft Coaching", text: "1,000 members signed up within 30 days of launch. £29.99/month each." },
  { code: "TTM-0005", name: "Mike Maher", biz: "Take A Deep Breath", text: "Membership programme generating $6k per month." },
  { code: "TTM-0006", name: "Aran Curry", biz: "Insight Education", text: "6 figures in revenue from a 5-day Facebook challenge." },
  { code: "TTM-0007", name: "Michelle Clarke", biz: "Veblen Directors", text: "250 calls booked from a first campaign, target was 50." },
  { code: "TTM-0008", name: "Richard Parsons", biz: "Platinum Commercial Academy", text: "Full marketing rebuild. Went from ad-hoc to systemised." },
  { code: "TTM-0009", name: "Ian Davies", biz: "PPS Pumps", text: "More email replies in 2 days than the previous 2 years combined." },
  { code: "TTM-0010", name: "Steve Hindley", biz: "iNarrator", text: "Massive new contract landed after TTM took over email database." },
];

const researchers = [
  { name: "Adam Ashburn", role: "Co-founder, Chief Experimenter", id: "ID: 001 / UK", k9: false, photo: "/assets/team/adam-ashburn.png" },
  { name: 'Nick "Fish" Fisher', role: "Co-founder, Systems & Strategy", id: "ID: 002 / UK", k9: false, photo: "/assets/team/nick-fisher.png" },
  { name: "Grace Harrold", role: "Head of Client Happiness", id: "ID: 003 / UK", k9: false, photo: "/assets/team/grace-harrold.png" },
  { name: "Gabriella Neocleous", role: "Head of Copywriting", id: "ID: 004 / UK", k9: false, photo: "/assets/team/gabriella-neocleous.png" },
  { name: "Wayne Naldo", role: "Head of Design", id: "ID: 005 / UK", k9: false, photo: "/assets/team/wayne-naldo.png" },
  { name: "Emma Garcia", role: "Head of Finance", id: "ID: 006 / UK", k9: false, photo: "/assets/team/emma-garcia.png" },
  { name: "Cooper", role: "Head of Security", id: "ID: K9-01 / UK", k9: true, photo: "/assets/team/cooper.png" },
  { name: "Thula", role: "Head of Treats", id: "ID: K9-02 / UK", k9: true, photo: "/assets/team/thula.png" },
];

function FindingCard({ f }: { f: (typeof findings)[number] }) {
  return (
    <article className="card-finding">
      <div className="code">
        <span>#{f.code}</span>
        <span className="pill" />
      </div>
      <div>
        <div className="name">{f.name}</div>
        <div className="biz">{f.biz}</div>
      </div>
      <hr />
      <div className="finding">{f.text}</div>
    </article>
  );
}

const rowA = findings.filter((_, i) => i % 2 === 0);
const rowB = findings.filter((_, i) => i % 2 === 1);

export default function Home() {
  return (
    <>
      <ClientEffects />

      {/* HEADER */}
      <header className="site" id="siteHeader">
        <div className="container nav">
          <a href="#top" className="brand" aria-label="Test Tube Marketing">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/ttm-secondary.png" alt="Test Tube Marketing" />
          </a>
          <a href="https://book.testtubemarketing.com" className="btn btn-outline">
            See If We&apos;re A Fit
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-copy reveal">
                <div className="mono">
                  // TEST TUBE MARKETING&nbsp;&nbsp;/&nbsp;&nbsp;EST. 2023&nbsp;&nbsp;/&nbsp;&nbsp;BALSALL COMMON, UK
                </div>
                <h1 className="display xxl">
                  Your Marketing
                  <br />
                  <span className="pink">Laboratory.</span>
                </h1>
                <p className="sub">
                  <b>We build marketing machines and then operate them</b> - so
                  that our clients can have more impact, help more people, and
                  make more money.
                </p>
                <div className="hero-cta-row">
                  <a href="https://book.testtubemarketing.com" className="btn btn-primary">
                    Book a Call <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
                <div className="hero-trust mono">
                  FOR B2B SERVICE BUSINESSES WHO&apos;VE OUTGROWN WORD OF MOUTH
                  AND REFERRALS
                </div>
              </div>
              <div className="hero-image reveal" style={{ transitionDelay: ".15s" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/hero-founders.jpg"
                  alt="Adam Ashburn and Nick Fisher in soot-covered lab coats"
                />
                <div className="specimen-card">
                  <div className="l">
                    <span>
                      <span className="dot" />
                      SPECIMEN A &amp; B
                    </span>
                    <span>SUBJECTS: ASHBURN, A. / FISHER, N.</span>
                  </div>
                  <div>EXP-2026-001</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE METHOD */}
        <section className="block" id="method">
          <div className="container">
            <div className="method-grid">
              <div className="method-copy reveal">
                <div className="mono-tag">01 / The Method</div>
                <h2 className="display xl">
                  Most agencies hand you a strategy.{" "}
                  <span className="pink">
                    We build the machine that runs it - and then we run it.
                  </span>
                </h2>
                <p>
                  Most agencies sell you a strategy document and then f*ck off.
                  Coaching programmes give you clarity, then leave you to
                  implement it yourself. Hiring in-house means you end up
                  managing someone who needs you to tell them what to do.
                </p>
                <p>
                  We work differently. We&apos;re a fractional marketing
                  department. We embed with you like an in-house team, except
                  we&apos;re not one person, we&apos;re a full department. And
                  before anything gets near your business, we&apos;ve already
                  tested it. With our own money. In our own lab.
                </p>
                <p>
                  <strong>
                    That&apos;s why it works. Not because we&apos;re smarter.
                    Because we&apos;ve already paid the tuition.
                  </strong>
                </p>
              </div>
              <div className="reveal" style={{ transitionDelay: ".1s" }}>
                <div className="method-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/eruption.jpg"
                    alt="A test tube knocked over with pink smoke erupting"
                    data-parallax="0.06"
                  />
                </div>
                <div className="figcap">
                  <span>FIG. 01 / What happens when you skip testing</span>
                  <span className="right">PLATE 01</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STATS */}
        <section className="block stats" id="numbers" style={{ padding: 0 }}>
          <div className="container">
            <div style={{ padding: "56px 0 24px" }} className="reveal">
              <div className="mono-tag">02 / By The Numbers</div>
            </div>
            <div className="stats-row">
              <div className="stat reveal">
                <span className="idx">001</span>
                <div className="num">&pound;36.2m+</div>
                <div className="lbl">Generated for clients</div>
              </div>
              <div className="stat reveal" style={{ transitionDelay: ".05s" }}>
                <span className="idx">002</span>
                <div className="num">153+</div>
                <div className="lbl">Campaigns run since 2014</div>
              </div>
              <div className="stat reveal" style={{ transitionDelay: ".1s" }}>
                <span className="idx">003</span>
                <div className="num word">UK-Based</div>
                <div className="lbl">In-house team, no freelancers</div>
              </div>
              <div className="stat reveal" style={{ transitionDelay: ".15s" }}>
                <span className="idx">004</span>
                <div className="num word">Hands-On</div>
                <div className="lbl">Founders in every account</div>
              </div>
            </div>
          </div>
        </section>

        {/* FINDINGS */}
        <section className="block" id="findings">
          <div className="container">
            <div className="findings-head reveal">
              <div>
                <div className="mono-tag" style={{ marginBottom: 22 }}>
                  03 / The Archive
                </div>
                <h2 className="display xl" style={{ margin: "0 0 22px" }}>
                  Every finding was once an{" "}
                  <span className="pink">experiment</span>.
                </h2>
                <p className="lead" style={{ margin: 0 }}>
                  Real expert businesses. Real numbers. Real outcomes.
                </p>
              </div>
              <div className="right">
                <div className="mono">
                  VOL. I &nbsp;/&nbsp; 2014 &mdash; 2026
                </div>
                <div className="mono" style={{ marginTop: 6 }}>
                  10 OF 153+ ENTRIES
                </div>
              </div>
            </div>
          </div>

          <div className="marquee-stack" aria-label="Client findings, scrolling">
            <div className="marquee">
              <div className="marquee-track">
                {[...rowA, ...rowA].map((f, i) => (
                  <FindingCard key={`a-${i}`} f={f} />
                ))}
              </div>
            </div>
            <div className="marquee reverse">
              <div className="marquee-track">
                {[...rowB, ...rowB].map((f, i) => (
                  <FindingCard key={`b-${i}`} f={f} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* APPARATUS */}
        <section
          className="block"
          id="apparatus"
          style={{
            paddingTop: "clamp(56px, 7vw, 96px)",
            paddingBottom: "clamp(60px, 7vw, 96px)",
          }}
        >
          <div className="container">
            <div className="parallax-wrap reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/specimen.jpg"
                alt="A cluster of beakers with pink and amber liquids"
                data-parallax="0.18"
              />
              <div className="lab-overlay">
                <div className="mono">// PLATE 02 / SPECIMENS IN PROGRESS</div>
                <div className="mono">EXP-2026-014</div>
              </div>
            </div>

            <div className="section-head reveal">
              <div className="mono-tag">04 / The Apparatus</div>
              <h2 className="display xl">
                Six instruments. <span className="pink">One laboratory.</span>
              </h2>
              <p className="lead">
                Most agencies specialise in one or two of these. We run all six
                in-house. That&apos;s why the system works.
              </p>
            </div>

            <div className="apparatus-grid">
              {[
                { num: "01", glyph: "\u270E", title: "Copywriting", desc: "Emails, ads, landing pages, scripts. Written by humans who understand your voice." },
                { num: "02", glyph: "\u2699", title: "Tech & Automation", desc: "Funnels, CRMs, integrations, automations. Built and maintained." },
                { num: "03", glyph: "\u25CE", title: "Paid Advertising", desc: "Facebook, Google, LinkedIn. Managed, optimised, reported on." },
                { num: "04", glyph: "\u25C7", title: "Design", desc: "Landing pages, lead magnets, brand assets. Designed to convert." },
                { num: "05", glyph: "\u25B3", title: "Strategy", desc: "A clear plan based on what actually works, not guesswork." },
                { num: "06", glyph: "\u223F", title: "Reporting & Optimisation", desc: "Weekly execution. Monthly reviews. Constant improvement." },
              ].map((item, i) => (
                <article
                  key={item.num}
                  className="instrument reveal"
                  style={{ transitionDelay: `${(i % 3) * 0.05}s` }}
                >
                  <div className="top">
                    <span className="num">INSTRUMENT {item.num}</span>
                    <span className="glyph">{item.glyph}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>

            <div className="apparatus-caption reveal">
              Most agencies do one or two of these.{" "}
              <b>We do all six. That&apos;s why it works.</b>
            </div>
          </div>
        </section>

        {/* RESEARCHERS */}
        <section className="block" id="researchers">
          <div className="container">
            <div className="section-head reveal">
              <div className="mono-tag">05 / The Researchers</div>
              <h2 className="display xl">
                The people <span className="pink">in the lab.</span>
              </h2>
              <p className="lead">
                Real UK team. Real payroll. Real humans doing the work. No
                freelancers, no network, no account managers, no hand-offs.
              </p>
            </div>
            <div className="researchers-grid">
              {researchers.map((r, i) => (
                <article
                  key={r.id}
                  className={`researcher${r.k9 ? " k9" : ""} reveal`}
                  style={{ transitionDelay: `${(i % 4) * 0.05}s` }}
                >
                  <div className={`photo${r.photo ? " has-img" : ""}`}>
                    {r.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.photo} alt={r.name} loading="lazy" />
                    )}
                    <span className="ph-corner tl" />
                    <span className="ph-corner tr" />
                    <span className="ph-corner bl" />
                    <span className="ph-corner br" />
                    {!r.photo && (
                      <div className="ph-label">
                        PHOTO PLACEHOLDER
                        <small>{r.id}</small>
                      </div>
                    )}
                  </div>
                  <div className="researcher-name">{r.name}</div>
                  <div className="role">{r.role}</div>
                  <div className="id">{r.id}</div>
                </article>
              ))}
            </div>
            <div className="researchers-foot reveal">
              <b>
                No freelancers. No National Insurance overhead. No managing
                someone else&apos;s team.
              </b>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          className="block"
          id="book"
          style={{
            paddingTop: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(60px, 7vw, 96px)",
          }}
        >
          <div className="container">
            <div className="final-image-wrap reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/aftermath.jpg"
                alt="An extinguished test tube on a scorched surface"
                data-parallax="0.18"
              />
              <div
                className="lab-overlay"
                style={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  right: 18,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="mono"
                  style={{
                    color: "rgba(255,255,255,.85)",
                    textShadow: "0 1px 6px rgba(0,0,0,.5)",
                  }}
                >
                  // PLATE 03 / POST-EXPERIMENT
                </div>
                <div
                  className="mono"
                  style={{
                    color: "rgba(255,255,255,.85)",
                    textShadow: "0 1px 6px rgba(0,0,0,.5)",
                  }}
                >
                  EXP-2026-022
                </div>
              </div>
            </div>

            <div className="final-cta reveal">
              <div
                className="mono-tag"
                style={{ justifyContent: "center", display: "inline-flex" }}
              >
                06 / Initiate
              </div>
              <h2 className="display xxl" style={{ margin: "22px 0 28px" }}>
                Want to be our{" "}
                <span style={{ whiteSpace: "nowrap" }}>
                  next <span className="pink">breakthrough?</span>
                </span>
              </h2>
              <p className="lead">
                Book a Marketing Growth Call. 40 minutes. No pitch, no pressure.
                Just a conversation about whether what we do would work for your
                business.
              </p>
              <a href="https://book.testtubemarketing.com" className="btn btn-primary lg">
                Book Your Marketing Growth Call{" "}
                <span aria-hidden="true">&rarr;</span>
              </a>
              <div className="trust-row">
                <span>
                  <span className="check">&#10003;</span> Limited Capacity
                </span>
                <span>
                  <span className="check">&#10003;</span> No Obligation
                </span>
                <span>
                  <span className="check">&#10003;</span> Expert Businesses Only
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
                We build and run your marketing function. Strategy and execution.
                So you can scale your business without the marketing relying on
                you.
              </p>
              <div className="socials" aria-label="Social links">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 22v-8h2.7l.4-3H13V9.2c0-.9.3-1.5 1.5-1.5H16V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.7 1.4-3.7 4v2H7v3h3v8h3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-right">
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
                <a href="#">Privacy Policy</a>
                <a href="#">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="footer-strip">
            <div>
              &copy; 2026 TEST TUBE MARKETING LTD. ALL RIGHTS RESERVED.
            </div>
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
              <b>[3]</b> Earnings figures are based on the experiences of our own
              company or our best customers and do not constitute a guarantee.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
