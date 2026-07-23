import { MotionV2 } from "./motion-v2";

/*
 * TWO SPEEDS rebuild (design-direction-v2.md + site-copy-v2.md, 2026-07-23).
 * All copy verbatim from site-copy-v2.md. Recommendation placeholders are
 * PREVIEW-ONLY: "[quote coming]" / "[slot reserved]" are the only permitted
 * placeholder strings; never invented quote words for real people. This
 * section CANNOT go to production with placeholders in it.
 */

const BOOK_URL = "https://book.testtubemarketing.com";

// Verbatim testimonials, carried unchanged from branch rebuild-2026-07.
const testimonials: {
  kicker: string;
  quote: string;
  name: string;
  biz: string;
}[] = [
  {
    kicker: "“$6K PER MONTH”",
    quote:
      "When I heard the guys were starting a marketing agency, I KNEW I wanted to work with them. They’ve not only helped provide me with the strategic insights I was looking for, but helped me launch my membership programme which now generates over $6,000 per month - Thanks Ad and Fish!",
    name: "Mike Maher",
    biz: "Take A Deep Breath",
  },
  {
    kicker: "“£30K IN RECURRING REVENUE”",
    quote:
      "On my first launch, Fish’s emails performed so well, we not only had to open up more spots, we also had to ‘close doors’ early due to selling out. A few months later, the guys helped me launch my mobile app, and within 30 days, we’d signed up over 1,000 members paying £29.99 each.",
    name: "Steve Keane",
    biz: "Kraft Coaching",
  },
  {
    kicker: "“WAY MORE ENQUIRIES”",
    quote:
      "I turned to Ad and Fish when my marketing manager took a new role, because I wanted to keep up my regular emails. I was stunned when the first 4 emails they wrote generated more calls and replies than anything we’d done previously! I can’t recommend them enough.",
    name: "Kirsty Darkins",
    biz: "KD Commercial",
  },
  {
    kicker: "“THEY JUST GET IT”",
    quote:
      "It’s safe to say that our ‘basement pump’ business isn’t the most exciting, and is quite technical in its nature. But the team at TTM have been able to rapidly understand our offering, and craft compelling marketing that makes people take action. In fact, we had more replies to the first couple of emails they sent, than we’d had in all the emails in the entire 2 years prior.",
    name: "Ian Davis",
    biz: "PPS Pumps",
  },
  {
    kicker: "“6 FIGURES IN REVENUE”",
    quote:
      "The first launch Ad, Fish and the team worked on with us generated over £30,000 in sales from a 5-Day Facebook Challenge. Better yet, we were able to leverage the assets they created and re-run the challenge multiple times, and generate a total of 6 figures in revenue.",
    name: "Aran Curry",
    biz: "Insight Education",
  },
  {
    kicker: "“250 CALLS BOOKED!”",
    quote:
      "On the first campaign Fish and Ad ran for us, we’d set a target of booking 50 calls. The first 2 emails they sent exceeded our target, and we had over 250 calls booked in total. Plus we’ve been able to re-run the campaign since, and get even more calls booked!",
    name: "Michelle Clarke",
    biz: "Veblen Directors",
  },
  {
    kicker: "“A TOTAL JOY TO WORK WITH!”",
    quote:
      "What an amazing impact the Test Tube Marketing team has had on our business and more importantly on our thinking. Ad, Fish and Grace have been a total joy to work with and we all feel very inspired walking away from a session with these guys. We love their copywriting style and they get our tone of voice absolutely right. We’re only a few months into working together, but we can’t wait to see what the next few years look like with them onboard!",
    name: "Richard Parsons",
    biz: "Platinum Commercial Academy",
  },
];

// The Record: result text verbatim; plain chronological index, no codes.
const record = [
  { idx: "01", name: "Kirsty Darkins", biz: "KD Commercial", text: "£130,000+ in new business within 90 days of engagement." },
  { idx: "02", name: "Tess Cope", biz: "The Transformation Agency", text: "40% year-on-year growth. Past 7 figures for the first time." },
  { idx: "03", name: "Katie Bell", biz: "Thrive Business Coaching", text: "Business grew while founder was on maternity leave." },
  { idx: "04", name: "Steve Keane", biz: "Kraft Coaching", text: "1,000 members signed up within 30 days of launch. £29.99/month each." },
  { idx: "05", name: "Mike Maher", biz: "Take A Deep Breath", text: "Membership programme generating $6k per month." },
  { idx: "06", name: "Aran Curry", biz: "Insight Education", text: "6 figures in revenue from a 5-day Facebook challenge." },
  { idx: "07", name: "Michelle Clarke", biz: "Veblen Directors", text: "250 calls booked from a first campaign, target was 50." },
  { idx: "08", name: "Richard Parsons", biz: "Platinum Commercial Academy", text: "Full marketing rebuild. Went from ad-hoc to systemised." },
  { idx: "09", name: "Ian Davis", biz: "PPS Pumps", text: "More email replies in 2 days than the previous 2 years combined." },
  { idx: "10", name: "Steve Hindley", biz: "iNarrator", text: "Massive new contract landed after TTM took over email database." },
];

/*
 * Recommendations: PREVIEW-ONLY placeholder rows per Fish's explicit
 * instruction. "[quote coming]" / "[slot reserved]" only. HARD GATE:
 * this stratum cannot ship to production with placeholders in it.
 */
const recommendations: { name: string; descriptor: string }[] = [
  { name: "Jay Alderton", descriptor: "Fitness and mindset coach" },
  { name: "Steve Keane", descriptor: "Kraft Coaching" },
  { name: "James Sinclair", descriptor: "Founder, Partyman Group" },
];
const RESERVED_SLOTS = 6;

export default function Home() {
  return (
    <>
      <MotionV2 />

      <a href="#top" className="skip-link">Skip to content</a>

      {/* HEADER */}
      <header className="site" id="siteHeader">
        <div className="container nav">
          <a href="#top" className="brand" aria-label="Test Tube Marketing">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/ttm-secondary.png" alt="" width={6621} height={1899} />
          </a>
          <a href={BOOK_URL} className="btn btn-outline">
            See If We&apos;re A Fit
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO: kinetic masthead over the ink-bloom texture (V1) */}
        <section className="hero" id="hero" aria-labelledby="hero-h">
          <div className="hero-media" data-hero-media aria-hidden="true">
            <video
              className="texture-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/v2/ink-bloom-poster.jpg"
              src="/assets/v2/ink-bloom.mp4"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="texture-poster"
              src="/assets/v2/ink-still.jpg"
              alt=""
              width={1800}
              height={1018}
            />
          </div>
          <div className="container hero-inner">
            <p className="mono hero-eyebrow">
              {"// TEST TUBE MARKETING  /  BALSALL COMMON, UK"}
            </p>
            <h1 className="display hero-display" id="hero-h">
              <span className="mask-line">
                <span>Your marketing brains,</span>
              </span>
              <span className="mask-line">
                <span>
                  <span className="swipe-block">on retainer.</span>
                </span>
              </span>
            </h1>
            <p className="hero-sub">
              <strong>
                We&apos;re the marketing leadership you keep and the execution
                team you hire.
              </strong>{" "}
              A retainer buys our heads: planning, judgement, accountability.
              Projects are quoted when you want our hands.
            </p>
            <div className="hero-cta-row">
              <a href={BOOK_URL} className="btn btn-primary">
                Book a Call <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="mono hero-note">{"// FOR ESTABLISHED BUSINESSES"}</p>
            </div>
          </div>
          <div className="stat-strip">
            <div className="stat">
              <div
                className="stat-num"
                data-countup
                data-prefix="£"
                data-target="36.2"
                data-decimals="1"
                data-suffix="m+"
              >
                £36.2m+
              </div>
              <span className="mono stat-lbl">Generated for clients</span>
            </div>
            <div className="stat">
              <div
                className="stat-num"
                data-countup
                data-target="153"
                data-decimals="0"
                data-suffix="+"
              >
                153+
              </div>
              <span className="mono stat-lbl">Campaigns run since 2014</span>
            </div>
            <div className="stat">
              <div className="h3 stat-word">In-Person</div>
              <span className="mono stat-lbl">
                Four planning sessions a year, in the room
              </span>
            </div>
            <div className="stat">
              <div className="h3 stat-word">Founder-Led</div>
              <span className="mono stat-lbl">Both of us in every account</span>
            </div>
          </div>
        </section>

        {/* CONFESSION */}
        <section className="band" id="confession" aria-labelledby="confession-h">
          <div className="container">
            <h2 className="h2 confession-head" id="confession-h">
              We used to sell{" "}
              <span className="scrub-swipe-wrap">
                <span className="scrub-swipe-base">big retainers.</span>
                <span className="scrub-swipe" aria-hidden="true" />
                <span className="scrub-swipe-text" aria-hidden="true">
                  big retainers.
                </span>
              </span>{" "}
              Then we noticed how they felt.
            </h2>
            <div className="confession-grid">
              {/* Body paragraphs carry the scroll-scrubbed text fill
                  (data-fill): the story inks itself in as you read.
                  No data-fade here; the fill IS the entrance. */}
              <div className="confession-copy" data-fill-scope>
                <p data-fill>
                  Big, big monthly fees, everything bundled in. And that was
                  fine when there was lots of stuff happening. But every client
                  has months where they&apos;re on holiday, or between launches,
                  or heads-down delivering the work we helped them sell. Then
                  the invoice lands, and it feels like a big bill for a month
                  where nothing much seemed to move. We&apos;d been active the
                  whole time. The feeling still didn&apos;t match the number.
                </p>
                <p data-fill>
                  <strong>So we tore the model up.</strong>
                </p>
                <p data-fill>
                  Now our clients pay a smaller retainer to be a client. That
                  buys our time, our thinking, and a plan we&apos;re accountable
                  to. Then they pay for deliverables when they need them. Busy
                  quarter, bigger invoice, lots shipped. Slow month, small
                  invoice, and nobody pretending otherwise.
                </p>
              </div>
              <figure className="insert-photo" data-fade>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/v2/ink-still.jpg"
                  alt="Magenta ink blooming in clear water against warm cream"
                  width={1800}
                  height={1018}
                  loading="lazy"
                />
              </figure>
            </div>
            <blockquote className="pullquote" data-fade>
              &ldquo;They pay a smaller retainer to get our time. Then they pay
              for the deliverables when they need them.&rdquo;
            </blockquote>
            <p className="body-soft" data-fade>
              The part clients say they value most: we don&apos;t need
              briefing, because we&apos;re already on the inside. We sit in the
              planning, we know the numbers, we know what&apos;s coming next
              quarter. Fewer suppliers, no ramp-up, no re-explaining your
              business to a new account manager every six months.
            </p>
          </div>
        </section>

        {/* THE SPLIT: the pinned two-room centrepiece */}
        <section className="split" id="how" aria-labelledby="split-h">
          <div className="split-stage" data-split-stage>
            <div className="split-statement" data-split-statement>
              <div className="container">
                <h2 className="h2" id="split-h">
                  Our heads are on retainer.{" "}
                  <span className="accent">Our hands are by the project.</span>
                </h2>
                <p>
                  Two ways we work, deliberately kept apart. One never switches
                  off. The other moves in bursts, when there&apos;s something
                  to build.
                </p>
              </div>
            </div>
            {/* Mobile-only band divider: the concept in one frame */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="split-divider"
              src="/assets/v2/split-key-art.jpg"
              alt=""
              width={2000}
              height={1130}
              loading="lazy"
            />
            <div className="split-rooms">
              <div className="room room-retainer" data-room-left>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="room-texture"
                  src="/assets/v2/paper-plate.jpg"
                  alt=""
                  width={1800}
                  height={1018}
                  loading="lazy"
                />
                <div className="room-inner">
                  <p className="mono room-label">THE RETAINER / ALWAYS ON</p>
                  <h3 className="h3">What the monthly fee buys: our heads.</h3>
                  <ul className="room-list">
                    <li data-retainer-item>
                      <strong>Four in-person planning sessions a year.</strong>{" "}
                      One annual session, up to a full day, to set the year.
                      Three quarterly half-days to review the last 90 days and
                      map the next 90. At our place or yours.
                    </li>
                    <li data-retainer-item>
                      <strong>Always-on access.</strong> Drop us a WhatsApp,
                      send us a voice note, give us a call. No monthly-call
                      ceremony, no usage meter.
                    </li>
                    <li data-retainer-item>
                      <strong>Accountability.</strong>{" "}We hold the plan, we
                      chase the plan, we tell you when you&apos;re drifting off
                      it.
                    </li>
                    <li data-retainer-item>
                      <strong>Light touches in between.</strong>{" "}The tweaks,
                      the gut-checks, the &ldquo;should we do this?&rdquo;
                      answers. Included.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="room room-exec" data-room-right>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="room-texture"
                  src="/assets/v2/light-ribbon.jpg"
                  alt=""
                  width={2000}
                  height={1130}
                  loading="lazy"
                />
                <div className="room-inner">
                  <p className="mono room-label">EXECUTION / BY THE PROJECT</p>
                  <h3 className="h3">What gets quoted: our hands.</h3>
                  <ul className="room-list">
                    <li data-exec-item>
                      Ad campaigns. Video shoots. Landing pages. Funnels.
                      Print. Launches.
                    </li>
                    <li data-exec-item>
                      Each one scoped, quoted, and invoiced separately. You see
                      the price before anything starts.
                    </li>
                    <li data-exec-item>
                      Take any quote of ours out to tender if you like.
                      We&apos;ll advise you on the bids either way, because the
                      retainer means we&apos;re on your side of the table.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="split-caption">
            <div className="container">
              <p data-fade>
                <strong>
                  Simple version: the retainer pays for our heads and our
                  planning. Projects pay for our hands.
                </strong>
              </p>
              <p className="mono" data-fade>
                EXECUTION IS NEVER BUNDLED OR ASSUMED. EVERY PROJECT IS QUOTED
                FIRST.
              </p>
            </div>
          </div>
        </section>

        {/* THE RETAINER YEAR: scroll-scrubbed stage timeline (Steady).
            Stage copy verbatim from site-copy-v2.md how-it-works content.
            No-JS / reduced-motion: every bar rendered filled, every
            detail visible (CSS default; JS sets the empty states). */}
        <section className="ry" id="retainer-year" aria-labelledby="ry-h">
          <div className="ry-tall" data-ry>
            <div className="ry-sticky">
              <div className="container">
                <p className="mono ry-eyebrow">THE RETAINER YEAR</p>
                <h2 className="h2" id="ry-h">
                  Four in-person planning sessions{" "}
                  <span className="accent">a year.</span>
                </h2>
                <ol className="ry-stages">
                  <li className="ry-stage" data-ry-stage>
                    <div className="ry-stage-head">
                      <span className="mono ry-label">Annual session</span>
                      <span className="ry-track" aria-hidden="true">
                        <span className="ry-fill" data-ry-fill />
                      </span>
                    </div>
                    <p className="ry-detail" data-ry-detail>
                      One annual session, up to a full day, to set the year.
                    </p>
                  </li>
                  <li className="ry-stage" data-ry-stage>
                    <div className="ry-stage-head">
                      <span className="mono ry-label">Q1 sit-down</span>
                      <span className="ry-track" aria-hidden="true">
                        <span className="ry-fill" data-ry-fill />
                      </span>
                    </div>
                    <p className="ry-detail" data-ry-detail>
                      A quarterly half-day to review the last 90 days and map
                      the next 90.
                    </p>
                  </li>
                  <li className="ry-stage" data-ry-stage>
                    <div className="ry-stage-head">
                      <span className="mono ry-label">Q2 sit-down</span>
                      <span className="ry-track" aria-hidden="true">
                        <span className="ry-fill" data-ry-fill />
                      </span>
                    </div>
                    <p className="ry-detail" data-ry-detail>
                      A quarterly half-day to review the last 90 days and map
                      the next 90.
                    </p>
                  </li>
                  <li className="ry-stage" data-ry-stage>
                    <div className="ry-stage-head">
                      <span className="mono ry-label">Q3 sit-down</span>
                      <span className="ry-track" aria-hidden="true">
                        <span className="ry-fill" data-ry-fill />
                      </span>
                    </div>
                    <p className="ry-detail" data-ry-detail>
                      A quarterly half-day to review the last 90 days and map
                      the next 90.
                    </p>
                  </li>
                </ol>
                <p className="mono ry-footnote">AT OUR PLACE OR YOURS.</p>
                <div className="ry-always">
                  <span className="ry-track ry-track-always" aria-hidden="true">
                    <span className="ry-fill" data-ry-always />
                  </span>
                  <p className="mono ry-always-label">ALWAYS-ON ACCESS</p>
                  <p className="ry-always-line">
                    Drop us a WhatsApp, send us a voice note, give us a call.
                    No monthly-call ceremony, no usage meter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI (night band 1) */}
        <section className="band night" id="ai" aria-labelledby="ai-h">
          <video
            className="band-texture texture-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/v2/caustic-drift-poster.jpg"
            src="/assets/v2/caustic-drift.mp4"
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="band-texture texture-poster"
            src="/assets/v2/caustic-drift-poster.jpg"
            alt=""
            width={1280}
            height={720}
            loading="lazy"
          />
          <div className="container" style={{ position: "relative" }}>
            <p className="mono">THE LAB, NOW</p>
            {/* Poster statement carries the cream-fill variant of the
                scrubbed text fill (faint cream to full cream / fushia). */}
            <h2 className="display ai-head" id="ai-h" data-fill-night>
              Everyone&apos;s using AI.{" "}
              <span className="accent">
                Almost nobody&apos;s using it properly.
              </span>
            </h2>
            <div className="ai-grid">
              <div className="ai-copy">
                <p data-fade>
                  If you&apos;re using AI at all, you&apos;re already in the
                  top half of business owners. But if it stops at a chat window
                  and a blank prompt, you&apos;re leaving most of it on the
                  table.
                </p>
                <p data-fade>
                  Here&apos;s where we actually are: we run MCP connections
                  between our tools, so the AI can see the CRM, the ad
                  accounts, and the reporting instead of guessing. We build
                  automations that run without anyone remembering to press go.
                  We run agent workflows that draft, check, and ship work with
                  a human signing off at the end. Deliverables that took a team
                  a week now take a day, and the savings land in your quote,
                  because execution is priced per project.
                </p>
                <p data-fade>
                  That&apos;s the real shift. AI made the deliverables cheap.
                  Judgement about which deliverables to make, in what order,
                  aimed at whom, got more valuable. The retainer buys the
                  judgement.
                </p>
                <p data-fade>
                  What we do with clients on this: we map where you&apos;re at
                  now against where you could get to, then make the in-between
                  actually happen, step by step, rather than chasing the big
                  shiny target and never arriving.
                </p>
              </div>
              <figure className="ai-art" data-ai-art>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/v2/prism.jpg"
                  alt="Light travelling through a clear prism as thin magenta traces"
                  width={1600}
                  height={1194}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* THE RECORD */}
        <section className="band" id="record" aria-labelledby="record-h">
          <div className="container">
            <h2 className="h2" id="record-h">The Record.</h2>
            <p className="body-soft">
              Ten engagements from 153+ campaigns since 2014. Real businesses,
              real numbers, real outcomes.
            </p>
            <div className="record-grid">
              <div className="record-rail">
                <p className="mono">10 ENGAGEMENTS / VERIFIED</p>
                <p className="record-rail-index" aria-hidden="true">
                  <span data-rail-index>01</span>
                  <span className="record-rail-total">{" / 10"}</span>
                </p>
                <span
                  className="mono record-rail-name"
                  data-rail-name
                  aria-hidden="true"
                >
                  Kirsty Darkins
                </span>
              </div>
              <ol className="record-rows" data-burst-rows>
                {record.map((r) => (
                  <li
                    key={r.idx}
                    className="record-row"
                    data-record-row
                    data-idx={r.idx}
                    data-name={r.name}
                  >
                    <span className="mono idx">{r.idx}</span>
                    <span className="who">
                      <span className="name">{r.name}</span>
                      <span className="mono biz">{r.biz}</span>
                    </span>
                    <span className="result">{r.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FOUNDERS: attribution welded into hairline-bound units */}
        <section className="band" id="founders" aria-labelledby="founders-h">
          <div className="container">
            <h2 className="h2" id="founders-h">
              The people <span className="accent">in the lab.</span>
            </h2>
            <p className="founders-lead">
              Two founders. Both in every client account. Nothing gets
              delegated to someone you&apos;ve never met.
            </p>
            <div className="founders-grid">
              <article className="founder-unit" data-founder-unit>
                <figure className="founder-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/founders/nick-fisher.jpg"
                    alt="Nick Fisher, co-founder of Test Tube Marketing, mid-sentence with a microphone in hand, gesturing, against a dark grey wall"
                    width={1200}
                    height={1500}
                  />
                </figure>
                <div className="founder-name-bar">
                  <h3 className="h3">Nick &ldquo;Fish&rdquo; Fisher</h3>
                  <span className="mono">CO-FOUNDER / SYSTEMS &amp; STRATEGY</span>
                </div>
                <div className="founder-bio">
                  <p>
                    Fish is a marketer by accident. He dropped out of uni, fell
                    into the nearest job going, and realised he was good at it.
                    Direct response is his lane: emails, offers, funnels, the
                    words that make people buy. He spent years as the
                    behind-the-scenes strategist and copywriter on big
                    launches, the name you never saw on the sales page. Here in
                    the lab he runs systems and strategy, the engine behind
                    every client account. He&apos;s also dad to two kids, which
                    he&apos;ll tell you is the harder of the two jobs.
                  </p>
                </div>
              </article>
              {/* Unit: Adam. Adam owns the EE / Vaynerchuk / Cardone story. */}
              <article className="founder-unit" data-founder-unit>
                <figure className="founder-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/founders/adam-ashburn.jpg"
                    alt="Adam Ashburn, co-founder of Test Tube Marketing, seated relaxed in a navy polo shirt against a blue stage curtain"
                    width={1000}
                    height={1250}
                  />
                </figure>
                <div className="founder-name-bar">
                  <h3 className="h3">Adam Ashburn</h3>
                  <span className="mono">CO-FOUNDER / CHIEF EXPERIMENTER</span>
                </div>
                <div className="founder-bio">
                  <p>
                    Adam was meant to be a golf pro. Then he got run over, and
                    marketing got him instead. He spent years as Head of
                    Marketing at Expert Empires, the events business that put
                    names like Gary Vaynerchuk and Grant Cardone on UK stages.
                    Around the office he was known as the founder&apos;s no.2,
                    steering marketing across the group&apos;s businesses,
                    including Elite Closing Academy, as they grew. Strategy is
                    where he&apos;s strongest: positioning, offers, and the
                    plan that decides what&apos;s worth doing before anyone
                    touches an ad account. Here in the lab he&apos;s our Chief
                    Experimenter, testing ideas with our own money before they
                    go anywhere near yours. Two kids at home, and yes, he
                    still plays golf.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* PROOF BAND: four hairline strata, no cards */}
        <section className="band proof" id="proof" aria-labelledby="proof-h">
          <div className="container">
            <h2 className="visually-hidden" id="proof-h">Proof</h2>
            <div className="award" data-fade>
              <div>
                <p className="h3">
                  Marketing &amp; Advertising StartUp of the Year
                </p>
                <span className="mono award-sub">
                  MIDLANDS STARTUP AWARDS 2026
                </span>
              </div>
              <figure className="award-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/proof/award-group.jpg"
                  alt="The Marketing and Advertising StartUp of the Year trophy held on stage at the Midlands StartUp Awards 2026"
                  width={900}
                  height={1106}
                  loading="lazy"
                />
              </figure>
            </div>
            <hr className="rule-hr" />
            <div data-fade>
              <p className="mono workedwith-label">WORKED WITH</p>
              <p className="workedwith">
                Tess Cope / The Transformation Agency
                <span className="dot" aria-hidden="true">&middot;</span>
                DigitalMarketer
                <span className="dot" aria-hidden="true">&middot;</span>
                Keap (formerly Infusionsoft)
                <span className="dot" aria-hidden="true">&middot;</span>
                Young Driver
                <span className="dot" aria-hidden="true">&middot;</span>
                <a
                  href="https://jossiahgetsleads.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jossiah Gets Leads
                </a>
              </p>
              <p className="workedwith-caption">
                Including Young Driver, whose ads run at approximately 12x ROI.
              </p>
            </div>
            <hr className="rule-hr" />
            <div>
              <p className="mono workedwith-label">
                ON THE RECORD / 7 VERIFIED STATEMENTS
              </p>
              {testimonials.map((t, i) => (
                <blockquote
                  key={t.name}
                  className={`testimonial ${i % 2 === 0 ? "wide" : "narrow"}`}
                  data-fade
                >
                  <span className="mono t-kicker">{t.kicker}</span>
                  <p className="t-quote">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mono">
                    {t.name} / {t.biz}
                  </footer>
                </blockquote>
              ))}
            </div>
            <hr className="rule-hr" />
            <div data-fade>
              <p className="mono workedwith-label">RECOMMENDATIONS</p>
              <ul className="rec-rows">
                {recommendations.map((r) => (
                  <li key={r.name} className="rec-row">
                    <span className="name">{r.name}</span>
                    <span className="body-soft">{r.descriptor}</span>
                    <span className="mono">[quote coming]</span>
                  </li>
                ))}
                {Array.from({ length: RESERVED_SLOTS }).map((_, i) => (
                  <li key={`reserved-${i}`} className="rec-row reserved">
                    <span className="mono">[slot reserved]</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PRICING (night band 2) */}
        <section className="band night" id="pricing" aria-labelledby="pricing-h">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="band-texture"
            src="/assets/v2/caustic-drift-poster.jpg"
            alt=""
            width={1280}
            height={720}
            loading="lazy"
          />
          <div className="container" style={{ position: "relative" }}>
            <h2 className="h2 pricing-head" id="pricing-h">What it costs.</h2>
            <div className="pricing-copy" data-burst-rows>
              <p>
                A standalone half-day session with the two of us starts at
                £2,500 + VAT. Some businesses book exactly that: one room, one
                afternoon, one plan, off you go.
              </p>
              <p>
                The retainer starts from £2,500 a month. For that you get four
                in-person planning sessions a year, us on tap in between, and
                two people who already know your business holding you to the
                plan. Do the maths against the half-day and you&apos;ll see why
                most clients pick the retainer.
              </p>
              <p>
                Execution is quoted per project on top, so you always see the
                price before anything starts.
              </p>
              <p className="mono">
                STANDALONE SESSIONS: PLUS 7.5% EXPENSES WITHIN THE UK.
                INTERNATIONAL SESSIONS QUOTED INDIVIDUALLY.
              </p>
            </div>
            <a href={BOOK_URL} className="btn btn-outline pricing-cta">
              See If We&apos;re A Fit <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* SPEAKING STRIP */}
        <div className="speaking">
          <div className="container">
            <p className="mono">
              {"// ALSO: WE SPEAK. CONFERENCES, TEAM DAYS, OFFSITES. ASK US ON THE CALL."}
            </p>
          </div>
        </div>

        {/* FINAL CTA: asset E backdrop, magnetic pill */}
        <section className="band cta" id="book" aria-labelledby="book-h">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cta-backdrop"
            src="/assets/v2/light-ribbon.jpg"
            alt=""
            width={2000}
            height={1130}
            loading="lazy"
          />
          <div className="container cta-inner">
            <h2 className="display cta-head" id="book-h">
              Want to be our next{" "}
              <span className="accent">breakthrough?</span>
            </h2>
            <p className="cta-lead">
              Book a Marketing Growth Call. 40 minutes. No pitch, no pressure.
              Just a conversation about whether what we do would work for your
              business.
            </p>
            <span className="magnet-wrap">
              <a href={BOOK_URL} className="btn btn-primary lg" data-magnetic>
                Book Your Marketing Growth Call{" "}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </span>
            <p className="mono cta-note">
              {"// NO OBLIGATION / EXPERT BUSINESSES ONLY"}
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER (night) */}
      <footer className="site night">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/ttm-secondary-wht.png"
                alt="Test Tube Marketing"
                width={1600}
                height={467}
              />
              <p>
                Marketing leadership on retainer. Execution by the project.
                Test. Measure. Scale.
              </p>
            </div>
            <div className="footer-right mono">
              <div>
                TEST TUBE MARKETING LTD &nbsp;&middot;&nbsp; REG NO. 15388084
              </div>
              <div>
                HOLLY GRANGE &nbsp;&middot;&nbsp; HOLLY LANE
                &nbsp;&middot;&nbsp; BALSALL COMMON &nbsp;&middot;&nbsp; CV7
                7EB
              </div>
              <div>
                <a href="mailto:hello@testtubemarketing.com">
                  HELLO@TESTTUBEMARKETING.COM
                </a>
              </div>
              <div className="links">
                <a href="/privacy">Privacy Policy</a>
                <a href="mailto:hello@testtubemarketing.com">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="footer-strip mono">
            <div>&copy; 2026 TEST TUBE MARKETING LTD. ALL RIGHTS RESERVED.</div>
            <div>{"// TEST. MEASURE. SCALE."}</div>
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
              <b>[3]</b> Earnings figures are based on the experiences of our
              own company or our best customers and do not constitute a
              guarantee.
            </div>
          </div>
        </div>
        <div className="footer-signature" aria-hidden="true" />
      </footer>
    </>
  );
}
