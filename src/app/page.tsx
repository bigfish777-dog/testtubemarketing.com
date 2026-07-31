import { MotionV2 } from "./motion-v2";
import { CaptureForm } from "./capture-form";
import { BeakerScrub } from "./beaker-scrub";
import { AwardViewer } from "./award-viewer";
import { CoffeeTicker } from "./coffee-ticker";
import FieldLoader from "./field/field-loader";
import HomepageFieldRegions from "./field/hero-field-region";

// Fish can flip this to true to restore the pouring beaker.
const SHOW_HERO_BEAKER = false;

/*
 * TWO SPEEDS rebuild (design-direction-v2.md + site-copy-v2.md, 2026-07-23).
 * All copy verbatim from site-copy-v2.md. Recommendation placeholders are
 * PREVIEW-ONLY: "[quote coming]" / "[slot reserved]" are the only permitted
 * placeholder strings; never invented quote words for real people. This
 * section CANNOT go to production with placeholders in it.
 */

const BOOK_URL = "https://book.testtubemarketing.com";

/*
 * Worked-with marquee (round 4, item 8): dual streams, monochrome ink.
 * Image logos render as CSS-mask silhouettes in ink so mixed-quality
 * assets cohere; brands with no usable asset get styled-type wordmarks
 * (manifest: Fast Funnels has no asset anywhere; MBS is a type-only
 * brand; Jossiah's live site is a type wordmark, truer than the square
 * mark). ar = intrinsic aspect ratio; h = optical height override.
 */
type MarqueeItem =
  | { kind: "img"; src: string; label: string; ar: number; h?: number }
  | { kind: "word"; label: string; href?: string };

const marqueeRow1: MarqueeItem[] = [
  { kind: "img", src: "/assets/logos/digitalmarketer.png", label: "DigitalMarketer", ar: 1042 / 367, h: 44 },
  { kind: "img", src: "/assets/logos/keap.svg", label: "Keap (formerly Infusionsoft)", ar: 86 / 42, h: 40 },
  { kind: "img", src: "/assets/logos/young-driver-ink.svg", label: "Young Driver", ar: 100 / 37, h: 44 },
  { kind: "img", src: "/assets/logos/lexisnexis.svg", label: "LexisNexis", ar: 1024 / 239, h: 30 },
  { kind: "img", src: "/assets/logos/tess-cope-tta.png", label: "Tess Cope - The Transformation Agency", ar: 2111 / 942, h: 58 },
  { kind: "img", src: "/assets/logos/vo2-master.png", label: "VO2 Master", ar: 1223 / 354, h: 34 },
  { kind: "img", src: "/assets/logos/expert-empires-white.png", label: "Expert Empires", ar: 1919 / 329, h: 30 },
  { kind: "img", src: "/assets/logos/coaches-congress.svg", label: "Coaches Congress", ar: 1000 / 341, h: 38 },
  { kind: "img", src: "/assets/logos/thrive-navy.png", label: "Thrive", ar: 1000 / 247, h: 36 },
  { kind: "img", src: "/assets/logos/me-and-my-golf.svg", label: "Me and My Golf", ar: 120 / 112, h: 50 },
  { kind: "img", src: "/assets/logos/biceps-and-banter.png", label: "Biceps & Banter", ar: 1000 / 574, h: 48 },
  { kind: "img", src: "/assets/logos/the-avenue.svg", label: "The Avenue", ar: 1000 / 633.6, h: 54 },
  { kind: "img", src: "/assets/logos/halsa.svg", label: "Halsa", ar: 360 / 115, h: 36 },
  { kind: "img", src: "/assets/logos/retail-fest.png", label: "Retail Fest", ar: 412 / 205, h: 44 },
  { kind: "img", src: "/assets/logos/corporate-connections.png", label: "Corporate Connections", ar: 218 / 68, h: 34 },
  { kind: "img", src: "/assets/logos/cp-r.svg", label: "CP+R", ar: 192 / 78, h: 42 },
];

const marqueeRow2: MarqueeItem[] = [
  { kind: "img", src: "/assets/logos/jossiah-gets-leads.png", label: "Jossiah Gets Leads", ar: 1088 / 1536, h: 50 },
  { kind: "img", src: "/assets/logos/entrepreneurs-network-white.png", label: "Entrepreneurs Network", ar: 2191 / 597, h: 34 },
  { kind: "img", src: "/assets/logos/mbs.png", label: "Media Buyer Systems", ar: 752 / 249, h: 36 },
  { kind: "img", src: "/assets/logos/inspire-kbb.png", label: "Inspire KBB", ar: 1269 / 318, h: 34 },
  { kind: "img", src: "/assets/logos/will-polston.svg", label: "Will Polston", ar: 145.029 / 30, h: 26 },
  { kind: "img", src: "/assets/logos/5ive.png", label: "5ive", ar: 679 / 277, h: 40 },
  { kind: "img", src: "/assets/logos/team-global.png", label: "Team Global", ar: 3751 / 1012, h: 32 },
  { kind: "img", src: "/assets/logos/ppp.svg", label: "PPP", ar: 896.01 / 268.6, h: 34 },
  { kind: "img", src: "/assets/logos/optineck.png", label: "Optineck", ar: 508 / 266, h: 44 },
  { kind: "img", src: "/assets/logos/ovl.png", label: "OVL", ar: 320 / 151, h: 40 },
  { kind: "img", src: "/assets/logos/millbank-property.png", label: "Millbank Property", ar: 1024 / 480, h: 40 },
  { kind: "img", src: "/assets/logos/voiceover-cafe.png", label: "Voiceover.Cafe", ar: 535 / 150, h: 34 },
  { kind: "img", src: "/assets/logos/wtm-london.png", label: "World Travel Market", ar: 1044 / 374, h: 40 },
  { kind: "img", src: "/assets/logos/upa-stamp-auctions.png", label: "UPA Stamp Auctions", ar: 1024 / 931, h: 50 },
  { kind: "img", src: "/assets/logos/exela.png", label: "Exela", ar: 1401 / 596, h: 40 },
  { kind: "img", src: "/assets/logos/proactive-approaches.png", label: "Proactive Approaches", ar: 810 / 91, h: 22 },
  { kind: "img", src: "/assets/logos/dc-practice-growth.png", label: "DC Practice Growth", ar: 150 / 47, h: 32 },
  { kind: "img", src: "/assets/logos/oynb.png", label: "OYNB", ar: 292 / 138, h: 40 },
  { kind: "img", src: "/assets/logos/tilt-affinity.png", label: "Tilt Affinity", ar: 151 / 60, h: 38 },
  { kind: "word", label: "Fast Funnels" },
];

function MarqueeHalf({
  items,
  hidden,
}: {
  items: MarqueeItem[];
  hidden?: boolean;
}) {
  return (
    <div className="mq-half" aria-hidden={hidden ? "true" : undefined}>
      {items.map((item, i) =>
        item.kind === "img" ? (
          <span
            key={i}
            className="mq-logo"
            role={hidden ? undefined : "img"}
            aria-label={hidden ? undefined : item.label}
            style={{
              width: `${Math.round((item.h ?? 28) * item.ar)}px`,
              height: `${item.h ?? 28}px`,
              WebkitMaskImage: `url(${item.src})`,
              maskImage: `url(${item.src})`,
            }}
          />
        ) : item.href && !hidden ? (
          <a
            key={i}
            className="mq-word"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.label}
          </a>
        ) : (
          <span key={i} className="mq-word">
            {item.label}
          </span>
        )
      )}
    </div>
  );
}

// Verbatim testimonials, carried unchanged from branch rebuild-2026-07.
const testimonials: {
  kicker: string;
  quote: string;
  name: string;
  biz: string;
}[] = [
  {
    kicker: "“$6k per month”",
    quote:
      "When I heard the guys were starting a marketing agency, I KNEW I wanted to work with them. They’ve not only helped provide me with the strategic insights I was looking for, but helped me launch my membership programme which now generates over $6,000 per month - Thanks Ad and Fish!",
    name: "Mike Maher",
    biz: "Take A Deep Breath",
  },
  {
    kicker: "“£30k in recurring revenue”",
    quote:
      "On my first launch, Fish’s emails performed so well, we not only had to open up more spots, we also had to ‘close doors’ early due to selling out. A few months later, the guys helped me launch my mobile app, and within 30 days, we’d signed up over 1,000 members paying £29.99 each.",
    name: "Steve Keane",
    biz: "Kraft Coaching",
  },
  {
    kicker: "“Way more enquiries”",
    quote:
      "I turned to Ad and Fish when my marketing manager took a new role, because I wanted to keep up my regular emails. I was stunned when the first 4 emails they wrote generated more calls and replies than anything we’d done previously! I can’t recommend them enough.",
    name: "Kirsty Darkins",
    biz: "KD Commercial",
  },
  {
    kicker: "“They just get it”",
    quote:
      "It’s safe to say that our ‘basement pump’ business isn’t the most exciting, and is quite technical in its nature. But the team at TTM have been able to rapidly understand our offering, and craft compelling marketing that makes people take action. In fact, we had more replies to the first couple of emails they sent, than we’d had in all the emails in the entire 2 years prior.",
    name: "Ian Davis",
    biz: "PPS Pumps",
  },
  {
    kicker: "“6 figures in revenue”",
    quote:
      "The first launch Ad, Fish and the team worked on with us generated over £30,000 in sales from a 5-Day Facebook Challenge. Better yet, we were able to leverage the assets they created and re-run the challenge multiple times, and generate a total of 6 figures in revenue.",
    name: "Aran Curry",
    biz: "Insight Education",
  },
  {
    kicker: "“250 calls booked!”",
    quote:
      "On the first campaign Fish and Ad ran for us, we’d set a target of booking 50 calls. The first 2 emails they sent exceeded our target, and we had over 250 calls booked in total. Plus we’ve been able to re-run the campaign since, and get even more calls booked!",
    name: "Michelle Clarke",
    biz: "Veblen Directors",
  },
  {
    kicker: "“A total joy to work with!”",
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
];

/*
 * Flex quotes (round 4d): short, oversized, almost offhand. All supplied
 * VERBATIM by Fish (2026-07-24) - never edit the words. Placeholders are
 * gone: every row here is a real, attributed quote.
 */
const flexQuotes: {
  quote: string;
  name: string;
  descriptor: string;
  note?: string;
}[] = [
  { quote: "Seriously, seriously smart", name: "John Parkes", descriptor: "CMO, ClickFunnels" },
  { quote: "Absolutely fucking genius", name: "James Sinclair", descriptor: "Founder, Partyman Group" },
  { quote: "In another league", name: "Jay Alderton", descriptor: "Fitness and mindset coach" },
  { quote: "Everyone needs an Ad & Fish", name: "Andy Proudman", descriptor: "Co-Founder, Me and My Golf" },
  { quote: "Absolutely golden ideas!", name: "Daniel Priestley", descriptor: "Dent" },
  { quote: "You guys are sick", name: "Frank Kern", descriptor: "Internet Marketer" },
  { quote: "I wish I’d found them years earlier!", name: "Ian Mulligani", descriptor: "CEO, Young Driver" },
  { quote: "These guys know marketing", name: "Marcus Murphy", descriptor: "Hot Juice Studios" },
  { quote: "Ice cold marketers", name: "Wim Hof", descriptor: "The Iceman" },
  { quote: "Two of the greatest", name: "Ryan Deiss", descriptor: "CEO, Scalable" },
  { quote: "Marketing maestros", name: "Dan Bradbury", descriptor: "Business Finance Expert" },
  { quote: "Are you my drivers", name: "Jay Abraham", descriptor: "Business Consultant", note: "In fairness, we were wearing suits." },
];

export default function Home() {
  return (
    <>
      <MotionV2 />
      <FieldLoader />
      <HomepageFieldRegions />

      <a href="#top" className="skip-link">Skip to content</a>

      {/* HEADER */}
      <header className="site over-hero" id="siteHeader">
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
        {/* HERO */}
        <section className="hero night" id="hero" aria-labelledby="hero-h">
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-copy-wash" aria-hidden="true" />
          {SHOW_HERO_BEAKER && <BeakerScrub />}
          <div className="container hero-inner">
            <h1 className="display hero-display" id="hero-h">
              <span className="mask-line">
                <span className="txt-grad-night">Your marketing brains,</span>
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
              You get our heads... and when you need our hands, we can take
              care of the &lsquo;doing&rsquo; too.
            </p>
            <div className="hero-capture">
              <p className="hero-capture-lead">
                Start with <strong>The AI Leverage Ladder</strong>: where your
                business actually sits with AI, and what the next rung up
                looks like. Leave your email and we&apos;ll send it over.
              </p>
              <CaptureForm idPrefix="hero" />
              <p className="mono hero-note">
                {"// FOR ESTABLISHED BUSINESSES"}{" "}
                <a className="quiet-link" href={BOOK_URL}>
                  OR BOOK A CALL <span aria-hidden="true">&rarr;</span>
                </a>
              </p>
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
              <div
                className="stat-num"
                data-countup
                data-target="1000"
                data-decimals="0"
                data-suffix="+"
              >
                1,000+
              </div>
              <span className="mono stat-lbl">Businesses consulted</span>
            </div>
            <div className="stat">
              <CoffeeTicker />
              <span className="mono stat-lbl">Cups of coffee since 2014</span>
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
                  src="/assets/founders/two-shot-stage.jpg"
                  alt="Fish and Adam on stage together in Test Tube Marketing shirts, mid-talk at a live event"
                  width={1999}
                  height={1198}
                  loading="lazy"
                />
              </figure>
            </div>
            <blockquote className="pullquote" data-fade>
              &ldquo;I used to pay an agency the best part of £8k per month and
              could never really measure the output. Now, Ad and Fish run my
              marketing, and I only pay for the deliverables I want, when I want
              them.&rdquo;
              <cite className="pullquote-cite mono">What clients tell us</cite>
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
            <div className="split-rooms">
              <div className="room room-retainer" data-room-left>
                <div className="room-inner">
                  <p className="mono room-label">THE RETAINER / ALWAYS ON</p>
                  <h3 className="h3">One simple monthly fee. You get our heads.</h3>
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
                <div className="room-inner">
                  <p className="mono room-label">EXECUTION / BY THE PROJECT</p>
                  <h3 className="h3">
                    When you need our hands, we take care of the doing.
                  </h3>
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
                  Simple version: one simple monthly fee covers our heads and
                  our planning. Projects pay for our hands.
                </strong>
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

        {/* AI (night band 1). Round 4: caustic texture video cut with the
            rest of the abstract imagery; the night surface and the fill
            choreography carry the band. */}
        <section className="band night" id="ai" aria-labelledby="ai-h">
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
                  aimed at whom, got more valuable. That judgement is what the
                  retainer keeps on tap.
                </p>
                <p data-fade>
                  What we do with clients on this: we map where you&apos;re at
                  now against where you could get to, then make the in-between
                  actually happen, step by step, rather than chasing the big
                  shiny target and never arriving.
                </p>
                <p data-fade>
                  That map has a name: <strong>The AI Leverage Ladder</strong>.
                  You can have it.{" "}
                  <a className="ladder-link" href="#ladder">
                    Grab it below <span aria-hidden="true">&darr;</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE RECORD */}
        <section className="band" id="record" aria-labelledby="record-h">
          <div className="container">
            <h2 className="h2 txt-grad" id="record-h">The Record.</h2>
            <p className="body-soft">
              Ten engagements from 153+ campaigns since 2014. Real businesses,
              real numbers, real outcomes.
            </p>
            <div className="record-grid">
              <div className="record-rail">
                <p className="mono">7 ENGAGEMENTS / VERIFIED</p>
                <p className="record-rail-index" aria-hidden="true">
                  <span data-rail-index>01</span>
                  <span className="record-rail-total">{" / 07"}</span>
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
              {/* Round 4e: interactive 3D of the physical trophy replaces the
                  flat stage photo (award-group.jpg kept on disk to revert).
                  Lazy-loaded, front-facing gentle sway. */}
              <figure className="award-photo">
                <AwardViewer />
              </figure>
            </div>
            <hr className="rule-hr" />
            <div data-fade>
              <p className="mono workedwith-label">TRUSTED BY</p>
              <div className="mq" aria-label="Brands we have worked with">
                <div className="mq-track mq-left">
                  <MarqueeHalf items={marqueeRow1} />
                  <MarqueeHalf items={marqueeRow1} hidden />
                </div>
              </div>
              <div className="mq">
                <div className="mq-track mq-right">
                  <MarqueeHalf items={marqueeRow2} />
                  <MarqueeHalf items={marqueeRow2} hidden />
                </div>
              </div>
            </div>
            <hr className="rule-hr" />
            <div>
              <p className="mono workedwith-label">
                ON THE RECORD / 7 VERIFIED STATEMENTS
              </p>
              {/* Round 4: the extracted headline does the lifting at
                  display scale; attribution + full verbatim quote support */}
              {testimonials.map((t, i) => (
                <blockquote
                  key={t.name}
                  className={`testimonial ${i % 2 === 0 ? "wide" : "narrow"}`}
                  data-fade
                >
                  <p className="t-pull">{t.kicker}</p>
                  <footer className="mono">
                    {t.name} / {t.biz}
                  </footer>
                  <p className="t-quote">&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
              ))}
            </div>
            <hr className="rule-hr" />
            <div data-fade>
              <p className="mono workedwith-label">{"// UNPROMPTED"}</p>
              <div className="flex-quotes">
                {flexQuotes.map((f) => (
                  <blockquote key={f.name} className="flex-quote">
                    <p className="flex-quote-line">
                      &ldquo;{f.quote}&rdquo;
                      {f.note ? <sup className="flex-quote-star">*</sup> : null}
                    </p>
                    <footer className="mono">
                      {f.name} / {f.descriptor}
                    </footer>
                    {f.note ? (
                      <p className="flex-quote-note mono">* {f.note}</p>
                    ) : null}
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING (night band 2): the Split's two-room identity restated
            as a hairline ledger. Room mono-labels, the figures promoted to
            the big mono objects, the original sentences demoted to support
            lines. Copy verbatim from site-copy-v2.md: every figure line is
            an exact substring of its support sentence, no new claims. */}
        <section className="band night" id="pricing" aria-labelledby="pricing-h">
          <div className="container" style={{ position: "relative" }}>
            <h2 className="h2 pricing-head txt-grad-night" id="pricing-h">
              The bill.
            </h2>
            <p className="pricing-preface">
              We hate when businesses hide their pricing (and the stats show
              we&apos;re not alone). So here&apos;s exactly what having us
              inside your business looks like commercially.
            </p>
            <ul className="price-ledger" data-burst-rows>
              <li className="price-row">
                <span className="mono price-room">Standalone session</span>
                <div>
                  <p className="price-fig">Starts at &pound;2,500 + VAT</p>
                  <p className="price-support">
                    A standalone half-day session with the two of us starts at
                    £2,500 + VAT. Some businesses book exactly that: one room,
                    one afternoon, one plan, off you go.
                  </p>
                </div>
              </li>
              <li className="price-row">
                <span className="mono price-room">The Retainer</span>
                <div>
                  <p className="price-fig accent">From &pound;2,500 a month</p>
                  <p className="price-support">
                    The retainer starts from £2,500 a month. For that you get
                    four in-person planning sessions a year, us on tap in
                    between, and two people who already know your business
                    holding you to the plan. Do the maths against the half-day
                    and you&apos;ll see why most clients pick the retainer.
                  </p>
                </div>
              </li>
              <li className="price-row">
                <span className="mono price-room">Execution</span>
                <div>
                  <p className="price-fig">Quoted per project</p>
                  <p className="price-support">
                    Execution is quoted per project on top, so you always see
                    the price before anything starts.
                  </p>
                </div>
              </li>
            </ul>
            <p className="mono price-footnote">
              STANDALONE SESSIONS: PLUS 7.5% EXPENSES WITHIN THE UK.
              INTERNATIONAL SESSIONS QUOTED INDIVIDUALLY.
            </p>
            <a href={BOOK_URL} className="btn btn-outline pricing-cta">
              See If We&apos;re A Fit <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* SPEAKING (round 4, orchestrator-written): a demand signal, not
            a throwaway line. Big-stage credibility plus the £15k anchor,
            which makes the retainer read as the deal. */}
        <section className="band speaking" aria-labelledby="speaking-h">
          <div className="container speaking-inner">
            <p className="mono speaking-kicker">{"// FROM THE STAGE"}</p>
            <h2 className="h2 txt-grad" id="speaking-h">
              We&apos;re more often on someone else&apos;s stage.
            </h2>
            <p className="speaking-body">
              Big rooms, a few different countries, other people&apos;s events.
              If you want one of us at yours, that starts at &pound;15,000 plus
              expenses. Most people don&apos;t come to us that way though. They
              come because they saw us do it, or because someone who did told
              them to. Put that same thinking to work inside your business and
              you&apos;re into retainer territory, which is a good deal less
              than fifteen grand for a morning.
            </p>
          </div>
        </section>

        {/* CLOSING CAPTURE (round 4): the opt-in is the primary CTA;
            book-a-call demoted to a quiet link underneath. */}
        <section className="band cta night" id="ladder" aria-labelledby="ladder-h">
          <div className="cta-field-scrim" aria-hidden="true" />
          <div className="cta-copy-wash" aria-hidden="true" />
          <div className="container cta-inner">
            <h2 className="display cta-head txt-grad-night" id="ladder-h">
              Where are you <span className="accent">on the ladder?</span>
            </h2>
            <p className="cta-lead">
              <strong>The AI Leverage Ladder</strong>{" "}is the map we use with
              clients: the five rungs from not touching AI to running it the
              way we do, where most established businesses actually sit, and
              what one rung up looks like for yours. Leave your email and
              we&apos;ll send it straight over.
            </p>
            <CaptureForm idPrefix="ladder" large />
            <p className="mono cta-note">
              {"// NO SPAM. UNSUBSCRIBE WHENEVER YOU LIKE."}
            </p>
            <p className="cta-book-line">
              Rather just talk to us? Book a Marketing Growth Call. 40
              minutes. No pitch, no pressure.{" "}
              <a className="ladder-link" href={BOOK_URL}>
                Book a call <span aria-hidden="true">&rarr;</span>
              </a>
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
