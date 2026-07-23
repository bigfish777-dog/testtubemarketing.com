import { ClientEffects } from "./client-effects";

/*
 * Reserved slots (Fish gate): these ship HIDDEN until Fish supplies real
 * content. Flip the flag AND fill the array with verbatim quotes/assets.
 * Never draft placeholder content for real named people.
 */
const SHOW_TESTIMONIALS = true;
const SHOW_RECOMMENDATIONS = false;
const SHOW_TRUSTED_BY_ADDITIONS = false;

// Verbatim quotes from the Drive doc "TTM Testimonials" (fetched 2026-07-23).
// Trimmed with ellipsis only, never rewritten.
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
// Verbatim one-liners only. Ships empty on purpose.
const recommendations: { quote: string; name: string; descriptor: string }[] =
  [];
// Pending assets: Entrepreneurs Network (Fish to supply logo), Josiah brand.
const trustedByAdditions: { label: string }[] = [];

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

const BOOK_URL = "https://book.testtubemarketing.com";

export default function Home() {
  return (
    <>
      <ClientEffects />

      <a href="#top" className="skip-link">Skip to content</a>

      {/* HEADER */}
      <header className="site" id="siteHeader">
        <div className="container nav">
          <a href="#top" className="brand" aria-label="Test Tube Marketing">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/ttm-secondary.png"
              alt=""
              width={6621}
              height={1899}
            />
          </a>
          <a href={BOOK_URL} className="btn btn-outline">
            See If We&apos;re A Fit
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO (cream, typographic) */}
        <section className="hero" aria-labelledby="hero-h">
          <div className="container hero-inner">
            <p className="mono eyebrow">
              {"// TEST TUBE MARKETING  /  BALSALL COMMON, UK"}
            </p>
            <h1 className="display hero-display" id="hero-h">
              <span className="stage" style={{ ["--i" as string]: 0 }}>Your</span>{" "}
              <span className="stage" style={{ ["--i" as string]: 1 }}>marketing</span>{" "}
              <span className="stage" style={{ ["--i" as string]: 2 }}>brains,</span>
              <br />
              <span className="stage swipe-wrap" style={{ ["--i" as string]: 3 }}>
                <span className="swipe" aria-hidden="true" />
                <span className="swipe-text">on retainer.</span>
              </span>
            </h1>
            <p className="sub hero-sub">
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
            </div>
            <p className="mono hero-trust">
              FOR CORPORATES, COACHES, AND CONSULTANTS WHO SELL INTO CORPORATES
            </p>
            <p className="mono hero-margin-label" aria-hidden="true">
              SPECIMEN A &amp; B / SUBJECTS: ASHBURN, A. / FISHER, N. /
              EXP-2026-001
            </p>
          </div>
        </section>

        {/* RETAINER STORY (cream) */}
        <section className="block" id="confession" aria-labelledby="confession-h">
          <div className="container">
            <p className="mono-tag reveal">01 / A Confession</p>
            <h2 className="display xl split-head reveal" id="confession-h">
              We used to sell <span className="pink">big retainers.</span>
              <br />
              Then we noticed how they felt.
            </h2>
            <div className="story-grid">
              <div className="story-copy reveal">
                <p>
                  Big, big monthly fees, everything bundled in. And that was
                  fine when there was lots of stuff happening. But every client
                  has months where they&apos;re on holiday, or between launches,
                  or heads-down delivering the work we helped them sell. Then
                  the invoice lands, and it feels like a big bill for a month
                  where nothing much seemed to move. We&apos;d been active the
                  whole time. The feeling still didn&apos;t match the number.
                </p>
                <p>
                  <strong>So we tore the model up.</strong>
                </p>
                <p>
                  Now our clients pay a smaller retainer to be a client. That
                  buys our time, our thinking, and a plan we&apos;re accountable
                  to. Then they pay for deliverables when they need them. Busy
                  quarter, bigger invoice, lots shipped. Slow month, small
                  invoice, and nobody pretending otherwise.
                </p>
              </div>
              <figure className="story-photo reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="duotone"
                  src="/assets/eruption.jpg"
                  alt="A test tube knocked over with pink smoke erupting"
                  width={1672}
                  height={941}
                  loading="lazy"
                />
                <figcaption className="mono figcap">
                  <span>FIG. 01 / THE OLD MODEL, MID-REACTION</span>
                  <span>PLATE 01</span>
                </figcaption>
              </figure>
            </div>
            <blockquote className="pullquote display reveal">
              &ldquo;They pay a smaller retainer to get our time. Then they pay
              for the deliverables when they need them.&rdquo;
            </blockquote>
            <div className="story-grid flip">
              <figure className="story-photo reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="duotone"
                  src="/assets/specimen.jpg"
                  alt="A cluster of beakers with pink and amber liquids"
                  width={1672}
                  height={940}
                  loading="lazy"
                />
                <figcaption className="mono figcap">
                  <span>FIG. 02 / SPECIMENS IN PROGRESS</span>
                  <span>PLATE 02</span>
                </figcaption>
              </figure>
              <div className="story-copy reveal">
                <p>
                  The part clients say they value most: we don&apos;t need
                  briefing, because we&apos;re already on the inside. We sit in
                  the planning, we know the numbers, we know what&apos;s coming
                  next quarter. Fewer suppliers, no ramp-up, no re-explaining
                  your business to a new account manager every six months.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (cream, burette fork) */}
        <section className="block" id="how" aria-labelledby="how-h">
          <div className="container">
            <p className="mono-tag reveal">02 / How It Works</p>
            <h2 className="display xl reveal" id="how-h">
              Our heads are on retainer.{" "}
              <span className="pink">Our hands are by the project.</span>
            </h2>
            <p className="lead reveal">Two ways we work, deliberately kept apart.</p>
          </div>

          <div className="container fork-wrap" id="fork">
            {/* The burette line: a graduated stem that fills on scroll, then
                forks where the two offers split. Renders fully drawn with
                zero JS; the scroll fill is progressive enhancement. */}
            <div className="fork-split" aria-hidden="true">
              <svg
                className="burette"
                viewBox="0 0 100 240"
                preserveAspectRatio="none"
              >
                <path className="b-base" d="M 0.1 0 L 0.1 240" vectorEffect="non-scaling-stroke" />
                <path className="b-base" d="M 0.1 120 L 52.9 216 L 52.9 240" vectorEffect="non-scaling-stroke" />
                <path className="b-fill" data-burette d="M 0.1 0 L 0.1 240" vectorEffect="non-scaling-stroke" />
                <path className="b-fill" data-burette d="M 0.1 120 L 52.9 216 L 52.9 240" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="burette-ticks mono">
                <span>100 ML</span>
                <span>50 ML</span>
                <span>0 ML</span>
              </div>
            </div>

            <div className="fork-cols">
              <div className="fork-col">
                <p className="mono col-label">THE RETAINER / ALWAYS ON</p>
                <h3 className="subheading">
                  What the monthly fee buys: our heads.
                </h3>
                <ul className="ledger">
                  <li className="reveal">
                    <strong>Four in-person planning sessions a year.</strong>{" "}
                    One annual session, up to a full day, to set the year. Three
                    quarterly half-days to review the last 90 days and map the
                    next 90. At our place or yours.
                  </li>
                  <li className="reveal">
                    <strong>Always-on access.</strong> Drop us a WhatsApp, send
                    us a voice note, give us a call. No monthly-call ceremony,
                    no usage meter.
                  </li>
                  <li className="reveal">
                    <strong>Accountability.</strong>{" "}We hold the plan, we chase
                    the plan, we tell you when you&apos;re drifting off it.
                  </li>
                  <li className="reveal">
                    <strong>Light touches in between.</strong>{" "}The tweaks, the
                    gut-checks, the &ldquo;should we do this?&rdquo; answers.
                    Included.
                  </li>
                </ul>
              </div>
              <div className="fork-col alt">
                <p className="mono col-label">EXECUTION / BY THE PROJECT</p>
                <h3 className="subheading">What gets quoted: our hands.</h3>
                <ul className="ledger">
                  <li className="reveal">
                    Ad campaigns. Video shoots. Landing pages. Funnels. Print.
                    Launches.
                  </li>
                  <li className="reveal">
                    Each one scoped, quoted, and invoiced separately. You see
                    the price before anything starts.
                  </li>
                  <li className="reveal">
                    Take any quote of ours out to tender if you like.
                    We&apos;ll advise you on the bids either way, because the
                    retainer means we&apos;re on your side of the table.
                  </li>
                </ul>
              </div>
            </div>
            <p className="fork-caption reveal">
              <strong>
                Simple version: the retainer pays for our heads and our
                planning. Projects pay for our hands.
              </strong>
            </p>
          </div>
        </section>

        {/* AI SECTION (night band 1) */}
        <section className="block night" id="ai" aria-labelledby="ai-h">
          <div className="container">
            <p className="mono-tag reveal">03 / The Lab, Now</p>
            <h2 className="display xl reveal" id="ai-h">
              Everyone&apos;s using AI.{" "}
              <span className="pink">Almost nobody&apos;s using it properly.</span>
            </h2>
            <div className="ai-grid">
              <div className="ai-copy reveal">
                <p>
                  If you&apos;re using AI at all, you&apos;re already in the top
                  half of business owners. But if it stops at a chat window and
                  a blank prompt, you&apos;re leaving most of it on the table.
                </p>
                <p>
                  Here&apos;s where we actually are: we run MCP connections
                  between our tools, so the AI can see the CRM, the ad
                  accounts, and the reporting instead of guessing. We build
                  automations that run without anyone remembering to press go.
                  We run agent workflows that draft, check, and ship work with a
                  human signing off at the end. Deliverables that took a team a
                  week now take a day, and the savings land in your quote,
                  because execution is priced per project.
                </p>
                <p>
                  That&apos;s the real shift. AI made the deliverables cheap.
                  Judgement about which deliverables to make, in what order,
                  aimed at whom, got more valuable. The retainer buys the
                  judgement.
                </p>
                <p>
                  What we do with clients on this: we map where you&apos;re at
                  now against where you could get to, then make the in-between
                  actually happen, step by step, rather than chasing the big
                  shiny target and never arriving.
                </p>
                <p className="smallprint">
                  One thing we don&apos;t do: SEO. If you need it, we&apos;ll
                  say so and point you at people who do.
                </p>
              </div>
              <figure className="ai-art reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/ai-glassware.jpg"
                  alt="Light passing through etched laboratory glassware with magenta traces"
                  width={1600}
                  height={1062}
                  loading="lazy"
                />
                <figcaption className="mono figcap">
                  <span>PLATE 03 / SIGNAL THROUGH GLASS</span>
                  <span>CONCEPT</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* FINDINGS (cream ledger) */}
        <section className="block" id="findings" aria-labelledby="findings-h">
          <div className="container">
            <div className="findings-head reveal">
              <div>
                <p className="mono-tag">04 / The Archive</p>
                <h2 className="display xl" id="findings-h">
                  Every finding was once an{" "}
                  <span className="pink">experiment.</span>
                </h2>
                <p className="lead">
                  Real expert businesses. Real numbers. Real outcomes.
                </p>
              </div>
              <div className="mono findings-meta">
                <div>VOL. I&nbsp;&nbsp;/&nbsp;&nbsp;2014 - 2026</div>
                <div>10 OF 153+ ENTRIES</div>
              </div>
            </div>
            <ol className="findings-ledger">
              {findings.map((f) => (
                <li key={f.code} className="finding-row reveal">
                  <span className="mono code">{f.code}</span>
                  <span className="who">
                    <span className="name">{f.name}</span>
                    <span className="biz">{f.biz}</span>
                  </span>
                  <span className="result">{f.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* STAT BAR (cream) */}
        <section className="block stats" id="numbers" aria-labelledby="numbers-h">
          <div className="container">
            <p className="mono-tag reveal">05 / By The Numbers</p>
            <h2 className="visually-hidden" id="numbers-h">
              By the numbers
            </h2>
            <div className="stats-row">
              <div className="stat reveal">
                <span className="mono idx">001</span>
                <div
                  className="num"
                  data-countup
                  data-prefix="£"
                  data-target="36.2"
                  data-decimals="1"
                  data-suffix="m+"
                >
                  £36.2m+
                </div>
                <div className="lbl">Generated for clients</div>
              </div>
              <div className="stat reveal">
                <span className="mono idx">002</span>
                <div
                  className="num"
                  data-countup
                  data-target="153"
                  data-decimals="0"
                  data-suffix="+"
                >
                  153+
                </div>
                <div className="lbl">Campaigns run since 2014</div>
              </div>
              <div className="stat reveal">
                <span className="mono idx">003</span>
                <div className="mono num-word">In-Person</div>
                <div className="lbl">Four planning sessions a year, in the room</div>
              </div>
              <div className="stat reveal">
                <span className="mono idx">004</span>
                <div className="mono num-word">Founder-Led</div>
                <div className="lbl">Both of us in every account</div>
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDERS (cream) */}
        <section className="block" id="founders" aria-labelledby="founders-h">
          <div className="container">
            <p className="mono-tag reveal">06 / The Researchers</p>
            <h2 className="display xl reveal" id="founders-h">
              The people <span className="pink">in the lab.</span>
            </h2>
            <p className="lead reveal">
              Two founders. Both in every client account. Nothing gets delegated
              to someone you&apos;ve never met.
            </p>

            <article className="founder-feature">
              <figure className="founder-photo reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/founders/nick-fisher-award.jpg"
                  alt="Nick Fisher, co-founder of Test Tube Marketing"
                  width={647}
                  height={1024}
                  loading="lazy"
                />
                <figcaption className="mono figcap">
                  <span>FIG. 03 / FISHER, N.</span>
                  <span>MIDLANDS STARTUP AWARDS 2026</span>
                </figcaption>
              </figure>
              <div className="founder-copy reveal">
                <h3 className="heading">Nick &ldquo;Fish&rdquo; Fisher</h3>
                <p className="mono founder-role">
                  CO-FOUNDER / SYSTEMS &amp; STRATEGY
                </p>
                <p>
                  Fish is a marketer by accident. He dropped out of uni, fell
                  into the nearest job going, and realised he was good at it.
                  That job turned into years inside Expert Empires, the events
                  business that put names like Gary Vaynerchuk and Grant
                  Cardone on UK stages, where he wrote the copy and built the
                  launches through years of rapid growth. Direct response is
                  his lane: emails, offers, funnels, the words that make people
                  buy. Here in the lab he runs systems and strategy, the
                  behind-the-scenes engine for every client account. He&apos;s
                  also dad to two kids, which he&apos;ll tell you is the harder
                  of the two jobs.
                </p>
              </div>
            </article>

            <article className="founder-feature flip">
              <figure className="founder-photo small reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/founders/adam-ashburn.png"
                  alt="Adam Ashburn, co-founder of Test Tube Marketing"
                  width={271}
                  height={286}
                  loading="lazy"
                />
                <figcaption className="mono figcap">
                  <span>FIG. 04 / ASHBURN, A.</span>
                  <span>CHIEF EXPERIMENTER</span>
                </figcaption>
              </figure>
              <div className="founder-copy reveal">
                <h3 className="heading">Adam Ashburn</h3>
                <p className="mono founder-role">
                  CO-FOUNDER / CHIEF EXPERIMENTER
                </p>
                <p>
                  Adam was meant to be a golf pro. Then he got run over, and
                  marketing got him instead. He spent years as Head of
                  Marketing at Expert Empires, known around the office as the
                  founder&apos;s no.2, steering the marketing across the
                  group&apos;s businesses, including Elite Closing Academy, as
                  they grew. Strategy is where he&apos;s strongest:
                  positioning, offers, and the plan that decides what&apos;s
                  worth doing before anyone touches an ad account. Here in the
                  lab he&apos;s our Chief Experimenter, testing ideas with our
                  own money before they go anywhere near yours. Two kids at
                  home, and yes, he still plays golf.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* PROOF (paper-2 band) */}
        <section className="block proof" id="proof" aria-labelledby="proof-h">
          <div className="container">
            <p className="mono-tag reveal">07 / Independently Checked</p>
            <h2 className="visually-hidden" id="proof-h">
              Independently checked
            </h2>
            <div className="award reveal">
              <p className="award-line display lg">
                Marketing &amp; Advertising StartUp of the Year
              </p>
              <p className="mono award-sub">MIDLANDS STARTUP AWARDS 2026</p>
            </div>
            <hr className="rule" />
            <div className="trusted reveal">
              <p className="mono trusted-label">WORKED WITH</p>
              <ul className="trusted-row">
                <li>Tess Cope / The Transformation Agency</li>
                <li>DigitalMarketer</li>
                <li>Keap (formerly Infusionsoft)</li>
                <li>Young Driver</li>
                {SHOW_TRUSTED_BY_ADDITIONS &&
                  trustedByAdditions.map((t) => <li key={t.label}>{t.label}</li>)}
              </ul>
              <p className="trusted-caption">
                Including Young Driver, whose ads run at approximately 12x ROI.
              </p>
            </div>

            {/* Testimonials: verbatim quotes from the Drive doc
                "TTM Testimonials". Editorial pull-quote strata, no cards. */}
            {SHOW_TESTIMONIALS && testimonials.length > 0 && (
              <>
                <hr className="rule" />
                <div className="testimonials-block reveal">
                  <p className="mono trusted-label">
                    ON THE RECORD / 7 VERIFIED STATEMENTS
                  </p>
                  <div className="testimonials">
                    {testimonials.map((t) => (
                      <blockquote key={t.name} className="testimonial">
                        <p className="mono t-kicker">{t.kicker}</p>
                        <p className="t-quote">&ldquo;{t.quote}&rdquo;</p>
                        <footer className="mono">
                          {t.name} / {t.biz}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* RESERVED: recommendations - hidden until Fish supplies verbatim
                one-liners (Jay Alderton, Steve Keane, James Sinclair). */}
            {SHOW_RECOMMENDATIONS && recommendations.length > 0 && (
              <>
                <hr className="rule" />
                <div className="recommendations">
                  {recommendations.map((r) => (
                    <blockquote key={r.name} className="recommendation">
                      <p>&ldquo;{r.quote}&rdquo;</p>
                      <footer className="mono">
                        {r.name} / {r.descriptor}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* PRICING (night band 2) */}
        <section className="block night" id="pricing" aria-labelledby="pricing-h">
          <div className="container">
            <p className="mono-tag reveal">08 / What It Costs</p>
            <h2 className="display xl reveal" id="pricing-h">
              Priced like we <span className="pink">mean it.</span>
            </h2>
            <div className="pricing-copy reveal">
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
              <p className="smallprint">
                Standalone sessions: plus 7.5% expenses within the UK.
                International sessions quoted individually.
              </p>
            </div>
            <a href={BOOK_URL} className="btn btn-primary reveal">
              See If We&apos;re A Fit <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* SPEAKING STRIP (cream) */}
        <div className="speaking">
          <div className="container">
            <p className="mono">
              {"// ALSO: WE SPEAK. CONFERENCES, TEAM DAYS, OFFSITES. ASK US ON THE CALL."}
            </p>
          </div>
        </div>

        {/* FINAL CTA (cream) */}
        <section className="block" id="book" aria-labelledby="book-h">
          <div className="container">
            <figure className="final-image-wrap reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/aftermath.jpg"
                alt="An extinguished test tube on a scorched surface"
                width={1672}
                height={941}
                loading="lazy"
              />
              <figcaption className="mono figcap">
                <span>{"// PLATE 04 / POST-EXPERIMENT"}</span>
                <span>EXP-2026-022</span>
              </figcaption>
            </figure>
            <div className="final-cta">
              <p className="mono-tag reveal">09 / Initiate</p>
              <h2 className="display xxl reveal" id="book-h">
                Want to be our next <span className="pink">breakthrough?</span>
              </h2>
              <p className="lead reveal">
                Book a Marketing Growth Call. 40 minutes. No pitch, no
                pressure. Just a conversation about whether what we do would
                work for your business.
              </p>
              <a href={BOOK_URL} className="btn btn-primary lg reveal">
                Book Your Marketing Growth Call{" "}
                <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="mono final-note reveal">
                {"// NO OBLIGATION / EXPERT BUSINESSES ONLY"}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER (night band 3) */}
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
