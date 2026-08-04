import type { Metadata } from "next";
import { Bodoni_Moda, Raleway } from "next/font/google";
import "./astrea.css";

/* Astrea's display face is Hatton, a Pangram Pangram commercial licence, so it
   cannot be used here. Bodoni Moda is a licence-safe Didone stand-in at the same
   weight and tracking. Raleway is genuinely their body face. */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Astrea London | Pre-meeting brief",
  robots: { index: false, follow: false, nocache: true },
};

const levels = [
  {
    lv: "One",
    nm: "Capture",
    now: "Your better built account. The new lab grown intent search campaign and the entry piece Shopping campaign are both live, on £6 and £2 a day.",
    cost: "The only level with real machinery behind it, and it's running on pocket change.",
  },
  {
    lv: "Two",
    nm: "Create",
    now: "Your strongest asset, pointed at the wrong destination. The Bloomberg piece comparing a $6,000 pair of lab grown earrings to a $60,000 mined equivalent is the clearest argument anyone in this category has written.",
    cost: "It sends people to your Instagram profile. The best argument you own is generating followers rather than customers.",
  },
  {
    lv: "Three",
    nm: "Consider",
    now: "Almost nothing. No reviews or customer proof anywhere on the site. No financing option. No warranty stated. Returns at 14 days.",
    cost: "This is the level where a five thousand pound purchase is actually won, and a buyer who wants the piece is given no permission to act.",
  },
  {
    lv: "Four",
    nm: "Convert",
    now: "The appointment page is a standard Shopify form. No calendar, no availability, no confirmation.",
    cost: "So there is no booked appointment event for either platform to optimise toward. That single gap is why neither account can learn, whatever is spent.",
  },
  {
    lv: "Five",
    nm: "Continue",
    now: "Klaviyo has been collecting subscribers since May and has never sent an email. Roughly £12,500 of abandoned baskets went unanswered in July alone.",
    cost: "The fastest recoverable revenue in the whole account, and it's not even paid media.",
  },
];

const findings = [
  {
    i: "01",
    t: "There is no customer proof anywhere on the site.",
    n: "No reviews, no ratings, no testimonials, on a catalogue with a median price above five thousand pounds. Every competitor we looked at leads with review counts and guarantees.",
  },
  {
    i: "02",
    t: "There is no financing.",
    n: "No Klarna, no Clearpay, no instalments. Brands selling at a fifth of your price all offer it. At your price point it's often the difference between a considered yes and an indefinite maybe.",
  },
  {
    i: "03",
    t: "Booking an appointment is not a booking flow.",
    n: "It's a contact form. For a purchase of this size the appointment is the real conversion, and right now it cannot be measured, confirmed or optimised toward.",
  },
  {
    i: "04",
    t: "Three products are priced at zero.",
    n: "Including The French Riviera and The Heart Of The City Diamond Ring. Products at zero will break a Shopping feed and a catalogue campaign as soon as either is scaled.",
  },
  {
    i: "05",
    t: "The store locator in your own footer returns a 404.",
    n: "And the boutique list, the appointment form and your press coverage each name a different set of locations.",
  },
  {
    i: "06",
    t: "The engagement ring collections do not filter.",
    n: "Around two hundred generated collection pages all return the same 168 products. That costs you search visibility, and it makes proper feed segmentation impossible.",
  },
];

const questions = [
  {
    n: "One",
    q: "When a piece over three thousand pounds sells, what actually happened first? A boutique visit, a call, a referral, a press moment, or something else?",
  },
  {
    n: "Two",
    q: "How much of the £1.5m first half came through the boutiques and the network, and how much online? That ratio decides where the budget should point.",
  },
  {
    n: "Three",
    q: "What happens today when someone requests an appointment? Who sees it, how fast do they respond, and is any of it recorded?",
  },
  {
    n: "Four",
    q: "Do you know which pieces repeat buyers come back for, and does anyone see a customer's history before they speak to them?",
  },
  {
    n: "Five",
    q: "New York opens in the fourth quarter. Is the advertising expected to support that, and from when?",
  },
  {
    n: "Six",
    q: "What would make the next six months feel like a success to you, in numbers you would actually use?",
  },
];

const steps = [
  {
    ph: "First",
    t: "Finish the measurement, then judge nothing until it works",
    d: "Complete the outstanding backend items, place a live test order, and confirm it lands in all three places. Until a real purchase can be traced end to end, no budget decision can be made on evidence, and no promise about return would be worth making.",
  },
  {
    ph: "Second",
    t: "Decide the purchase mechanism, per price band",
    d: "Entry pieces are genuine e-commerce and should be optimised to purchase. Above roughly three thousand pounds the conversion event is a booked consultation, and a person closes it. These are two different businesses and right now they are advertised as one.",
  },
  {
    ph: "Third",
    t: "Take the revenue that is already sitting there",
    d: "Turn on the three drafted email flows. Roughly £12,500 of abandoned baskets went unanswered in July. Convert the Instagram following into captured intent rather than passive reach. None of this needs new ad budget.",
  },
  {
    ph: "Fourth",
    t: "Build levels two and three properly",
    d: "Put your best category argument in front of cold audiences and send it somewhere that can convert. Add the proof and the permission a considered buyer needs before they will act.",
  },
  {
    ph: "Fifth",
    t: "Then, and only then, restore the budget",
    d: "With working measurement, a defined mechanism and a funded top of funnel, the approved four thousand a month has something to prove. A rebuilt account needs six to eight weeks at a real budget before its performance means anything.",
  },
];

export default function AstreaBrief() {
  return (
    <div className={`as ${bodoni.variable} ${raleway.variable}`}>
      <main>
        {/* COVER */}
        <section className="as-cover">
          <div className="as-wrap">
            <div className="as-lockup">
              <div className="as-wordmark">
                Astrea
                <span>London</span>
              </div>
              <div className="as-x" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/ttm-secondary.png" alt="Test Tube Marketing" />
            </div>

            <p className="as-eyebrow">Pre-meeting brief</p>
            <h1>
              What we have
              <br />
              understood so far.
            </h1>
            <p className="as-lede">
              Written before we meet, so the call can be spent on the decisions
              rather than on background. Everything here comes from your own
              data and your own website. Where we're unsure, we've said so
              and turned it into a question.
            </p>

            <div className="as-cover-meta">
              <div className="as-meta-item">
                <div className="k">Meeting</div>
                <div className="v">
                  Wednesday 5 August 2026
                  <br />
                  1:00pm, Google Meet
                </div>
              </div>
              <div className="as-meta-item">
                <div className="k">Attending</div>
                <div className="v">
                  Nathalie Morrison
                  <br />
                  Chris Black, Arunabha Basak, Nick Fisher
                </div>
              </div>
              <div className="as-meta-item">
                <div className="k">Prepared by</div>
                <div className="v">
                  Test Tube Marketing
                  <br />4 August 2026
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE POSITION */}
        <section className="as-band">
          <div className="as-wrap">
            <p className="as-eyebrow">One / Where things stand</p>
            <h2>The numbers we were given.</h2>

            <div className="as-figures">
              <div className="as-figure">
                <div className="n">£1.5m</div>
                <div className="l">
                  First half 2026 sales, up 100% year on year
                </div>
              </div>
              <div className="as-figure">
                <div className="n">£44,475</div>
                <div className="l">
                  Spent on Google and Meta since March 2024
                </div>
              </div>
              <div className="as-figure">
                <div className="n">Zero</div>
                <div className="l">
                  Valued purchase conversions ever recorded by either platform
                </div>
              </div>
              <div className="as-figure">
                <div className="n">£71,668</div>
                <div className="l">
                  Lifetime online revenue, from 30 orders since October 2025
                </div>
              </div>
            </div>

            <div style={{ marginTop: "clamp(30px, 4vw, 48px)" }}>
              <p>
                Those four numbers are usually presented as a failure of
                advertising. We read them differently, and we think the
                difference matters.
              </p>
              <p>
                The first thing worth saying plainly is that for nineteen
                consecutive months the platforms were not measuring purchases at
                all. £22,227 was spent in that window against tracking that had
                stopped working. That is not poor performance being reported
                accurately. It's no performance data existing in the first
                place, which means nobody could have optimised anything, however
                good they were.
              </p>
              <p>
                The second is that your revenue has never tracked ad spend. It
                tracks brand moments. April this year was your best month at
                £20,793, from four orders, every one of them attributed to
                direct traffic during a week when the site was doing roughly
                seven times its normal volume off the back of press.
              </p>
            </div>

            <div className="as-pull">
              <p>
                Online is roughly five per cent of your business. The advertising
                has been judged as though it were all of it.
              </p>
            </div>

            <p>
              £1.5m in six months against £71,668 of lifetime online revenue says
              the overwhelming majority of what you sell closes somewhere a
              pixel cannot see. In a boutique, through the network, after a
              conversation, after a press moment. That is not a problem to be
              fixed. It's the shape of a considered luxury business, and it
              should be the starting point rather than an afterthought.
            </p>
          </div>
        </section>

        {/* THE QUESTION */}
        <section className="as-band tint">
          <div className="as-wrap">
            <p className="as-eyebrow">Two / The question we would ask instead</p>
            <h2>
              Nobody buys a five thousand pound ring
              <br />
              from a single advert.
            </h2>
            <p className="as-lede" style={{ marginBottom: 26 }}>
              A £50 product needs one good ad and a working checkout. A
              considered purchase does not work that way. Your buyer is not one
              person taking one action. She is the same person at five different
              stages, often months apart, needing five different things.
            </p>
            <p>
              When an account only advertises at one of those stages, the money
              goes to people who were never going to buy that day, the platform
              never learns what one of your buyers looks like, and the account
              gets judged on a conversion rate it was never built to produce.
              Here is what each stage looks like in your business today.
            </p>

            <div className="as-levels">
              {levels.map((l) => (
                <div className="as-level" key={l.lv}>
                  <div>
                    <div className="lv">Level {l.lv}</div>
                    <div className="nm">{l.nm}</div>
                  </div>
                  <dl>
                    <dt>What exists today</dt>
                    <dd>{l.now}</dd>
                  </dl>
                  <dl>
                    <dt>What it&rsquo;s costing</dt>
                    <dd className="cost">{l.cost}</dd>
                  </dl>
                </div>
              ))}
            </div>

            <div className="as-pull" style={{ marginTop: 40 }}>
              <p>
                Every advert running on your account today is an Instagram
                follow ad. There is not one conversion campaign live.
              </p>
            </div>
            <p>
              That is the whole picture in one fact. The catalogue is 684
              products deep, the pixel is installed, the Google conversion
              tracking is properly built, and none of it is being used to sell
              anything.
            </p>
          </div>
        </section>

        {/* THE SITE */}
        <section className="as-band">
          <div className="as-wrap">
            <p className="as-eyebrow">Three / What we found on the site</p>
            <h2>The advertising is not the only thing holding this back.</h2>
            <p className="as-lede">
              We reviewed astrealondon.com on 4 August. These are the things we
              would want fixed alongside any campaign work, because more traffic
              to a page that cannot convert it is exactly what the last
              £44,475 bought.
            </p>

            <ul className="as-list">
              {findings.map((f) => (
                <li key={f.i}>
                  <span className="i">{f.i}</span>
                  <div>
                    <p>
                      <b>{f.t}</b>
                    </p>
                    <p className="note">{f.n}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "clamp(30px, 4vw, 46px)" }}>
              <h3 style={{ marginBottom: 14 }}>
                One compliance note, because it&rsquo;s worth knowing early
              </h3>
              <p>
                In May the Advertising Standards Authority upheld complaints
                against two lab grown diamond brands, brought by the Natural
                Diamond Council. The rulings were about ads that did not make
                the stones&rsquo; origin clear inside the creative itself, and
                about unqualified sustainability claims.
              </p>
              <p>
                Your current adverts carry the line about diamonds not costing
                the earth, and the site uses sustainable luxury language without
                qualification. This is manageable and it isn&rsquo;t a criticism, but
                it does mean every piece of creative we build for you should be
                written with those two rulings in mind from the start. We would
                rather raise it now than after a complaint.
              </p>
            </div>
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="as-band tint">
          <div className="as-wrap">
            <p className="as-eyebrow">Four / What we would like to understand</p>
            <h2>The things we cannot learn from the data.</h2>
            <p className="as-lede">
              These are the questions we would most like answered on the call.
              Your answers will change what we recommend, so we would rather ask
              than assume.
            </p>

            <div className="as-questions">
              {questions.map((q) => (
                <div className="as-q" key={q.n}>
                  <div className="qn">Question {q.n}</div>
                  <p>{q.q}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEQUENCE */}
        <section className="as-band">
          <div className="as-wrap">
            <p className="as-eyebrow">Five / How we would sequence it</p>
            <h2>Order matters more than budget.</h2>
            <p className="as-lede">
              Deliberately without costs attached. We would rather agree the
              shape of the work with you first, and talk about what it&rsquo;s worth
              once you have seen the thinking.
            </p>

            <div className="as-steps">
              {steps.map((s) => (
                <div className="as-step" key={s.ph}>
                  <div className="ph">{s.ph}</div>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="as-pull" style={{ marginTop: 44 }}>
              <p>
                One more thing, said now rather than later. Reach and follower
                growth will look lower while the budget is held at pilot light.
                That is the freeze working, not a decline.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="as-foot">
          <div className="as-wrap">
            <p>
              Prepared by Test Tube Marketing for Astrea London, 4 August 2026.
              Confidential.
            </p>
            <p style={{ marginTop: 14 }}>
              Spend, conversion and revenue figures are taken from the paid
              media handover pack of 1 August 2026, which drew them from the
              Meta and Google APIs and from Shopify. Company and trading figures
              are from published trade coverage. Everything concerning the
              website, the live adverts and the competitive picture comes from
              our own review of astrealondon.com and the Meta Ad Library on 4
              August 2026. Where a figure could not be verified we have left it
              out rather than estimate it.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
