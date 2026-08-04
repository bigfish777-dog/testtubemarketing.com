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
  // Set explicitly so this page does not inherit the site-wide description,
  // which is TTM homepage copy and carries an em dash.
  description:
    "Prepared for Astrea London ahead of the meeting on 5 August 2026. Confidential.",
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
    now: "Almost nothing. No reviews, ratings or customer proof anywhere on the site. No warranty stated. Returns at 14 days. No staged payment terms of any kind.",
    cost: "This is the level where a five thousand pound purchase is actually won, and a buyer who wants the piece is given no permission to act.",
  },
  {
    lv: "Four",
    nm: "Convert",
    now: "Nothing is optimised to a purchase. The appointment page is a plain contact form, so it fires no event either.",
    cost: "Neither platform has ever been given a purchase to learn from. Until it is, spend cannot compound, and no amount of budget changes that.",
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
    n: "No reviews, no ratings, no testimonials, and no review platform installed, on a catalogue with a median price above five thousand pounds. There is no Trustpilot profile to point at either, so there is nothing to borrow. Every competitor we looked at leads with review counts and guarantees.",
  },
  {
    i: "02",
    t: "A buyer who wants the piece is given no way to stage the payment.",
    n: "Not a checkout finance widget. At this level that reads cheap and we would not put one on the site. What is missing is the private client version: staged payment on a commission, arranged by a person, mentioned once at the right moment. Handled that way it removes the objection without ever touching the positioning.",
  },
  {
    i: "03",
    t: "The appointment page is a contact form, so no appointment is ever recorded.",
    n: "There is no calendar, no availability and no confirmation, and nothing fires when someone submits it. Neither ad platform has ever received a single appointment signal, and internally there is no record to follow up against.",
  },
  {
    i: "04",
    t: "Products shown as Enquire now carry a price of zero in the data.",
    n: "The page does the right thing and shows no price. Underneath, the product data says 0.00, and Merchant Centre and the Meta catalogue read the data, not the button. Those pieces will be rejected or served wrongly the moment either feed is scaled.",
  },
  {
    i: "05",
    t: "Your story film is hosted on Google Drive.",
    n: "The video on the Our Story page links out to a Drive file, so a visitor lands on a Google sign-in screen rather than your site. It cannot be tracked, retargeted against, or used as an ad asset, and it is the single best piece of brand film you have.",
  },
  {
    i: "06",
    t: "The collections filter well, but not by price.",
    n: "Metal, band, shape and style are all there and they work properly. Price is the one a buyer at this level actually needs, on a catalogue running from seven hundred and fifty pounds to five figures, and it is also the split the campaigns need in order to separate an entry buyer from a high value one.",
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
    t: "Put three campaigns live and optimise for volume",
    d: "Awareness that is not asked to sell, a broad purchase campaign, and a second purchase campaign modelled off your own buyer data. Optimised for volume, not value, until there are enough purchases to teach it anything. This is the step that gives both platforms their first real conversion signal.",
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
    t: "Switch to value, then restore the budget",
    d: "Once there is enough purchase history, split high value from entry, move to value optimisation and set a target cost per sale so the platform chases the pieces worth chasing. That is also the point at which the booked consultation becomes worth building properly, and the approved four thousand a month finally has something to prove.",
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
              What &pound;44,475 bought,
              <br />
              and what it didn&rsquo;t.
            </h1>
            <p className="as-lede">
              Written before we meet, so the call can be spent on decisions
              rather than background. Everything here comes from your own data
              and your own website. Where we&rsquo;re unsure, we&rsquo;ve turned
              it into a question rather than a claim.
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
                Those numbers are usually presented as a failure of advertising.
                We read them differently, and the difference decides what we
                would do next.
              </p>
              <p>
                Your revenue has never tracked ad spend. It tracks brand
                moments. April was your best month at £20,793 from four orders,
                every one attributed to direct traffic, during a week the site
                ran at roughly seven times its normal volume off the back of
                press.
              </p>
            </div>

            <div className="as-pull">
              <p>
                Almost everything you sell closes somewhere the ad platforms
                cannot see. So they have never been shown what one of your
                buyers looks like.
              </p>
            </div>

            <p>
              £1.5m in six months against £71,668 of lifetime online revenue
              says the overwhelming majority of what you sell closes in a
              boutique, through the network, or after a conversation. That is
              the shape of a considered luxury business, not a fault. But it
              does mean the platforms have been optimising against roughly five
              per cent of the picture, and doing it with no purchase data at
              all.
            </p>
            <p>
              So the first job is not more budget. It is to make the part that
              does happen online measurable, and to feed the platforms real
              purchases until they can recognise a buyer. Everything below
              follows from that.
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

        {/* HOW WE WOULD BUILD IT */}
        <section className="as-band">
          <div className="as-wrap">
            <p className="as-eyebrow">Three / How we would build it</p>
            <h2>Three campaigns, not one.</h2>
            <p className="as-lede">
              This is the shape we would open with. It is deliberately
              unsophisticated at the start, because an account with no purchase
              history has nothing to be sophisticated about yet.
            </p>

            <div className="as-build">
              <article>
                <div className="k">Campaign one</div>
                <h3>Awareness, and it is not asked to sell</h3>
                <p>
                  Video led, mostly the real thing rather than studio work, and
                  the Sarah Jessica Parker story does the lifting. Broad, held
                  deliberately small, and pointed at your website rather than
                  your Instagram profile. Its job is to put the argument in
                  front of people and hand warm traffic to the campaigns below
                  it. Judged on reach and depth of engagement, never on sales.
                </p>
              </article>
              <article>
                <div className="k">Campaign two</div>
                <h3>Purchase, broad</h3>
                <p>
                  Meta finds the buyers, because on a cold account it is better
                  at it than we are. Age and location only, split by the markets
                  your own customer list says you already sell in rather than
                  everywhere at once. No interests, no stacked audiences. Every
                  extra signal at this stage narrows the pool before the
                  platform has learned anything.
                </p>
              </article>
              <article>
                <div className="k">Campaign three</div>
                <h3>Purchase, modelled on your own buyers</h3>
                <p>
                  This is where Klaviyo earns its place. Lookalikes built off
                  people who have actually bought, plus your browsers and your
                  abandoned baskets, split into warm and hot so the two are
                  never judged against each other. Warm is a page view. Hot is
                  someone who got as far as the basket, and it is also where
                  repeat buyers sit.
                </p>
              </article>
            </div>

            <div className="as-pull" style={{ marginTop: 40 }}>
              <p>
                Volume first, value second. You cannot ask a platform to find
                you high value buyers before it has been shown a single one.
              </p>
            </div>

            <p>
              Both purchase campaigns open optimised for volume. Once there is
              enough history, we split entry pieces from high value, move to
              value optimisation, and give the platform a target cost per sale
              so it stops chasing the cheap end of your catalogue.
            </p>
            <p>
              On budget, we would work backwards rather than pick a number.
              Awareness stays small on purpose. Purchase budget comes from what
              one sale costs and how many a day you want, and it goes up
              gradually so the campaign never falls back into learning.{" "}
              <b>
                Below four times return on Meta we would tell you it is not
                working.
              </b>{" "}
              Above that, the number we should actually be aiming at depends on
              your margin as much as your average order value, which is
              something we would need from you rather than guess.
            </p>
          </div>
        </section>

        {/* THE SITE */}
        <section className="as-band tint">
          <div className="as-wrap">
            <p className="as-eyebrow">Four / What we found on the site</p>
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
        <section className="as-band">
          <div className="as-wrap">
            <p className="as-eyebrow">Five / What we would like to understand</p>
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
        <section className="as-band tint">
          <div className="as-wrap">
            <p className="as-eyebrow">Six / How we would sequence it</p>
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
