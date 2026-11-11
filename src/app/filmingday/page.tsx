import type { Metadata } from "next";
import Link from "next/link";
import { InterestForm } from "./interest-form";
import s from "./filmingday.module.css";

// Interest page for the spring 2027 client filming day. Self-contained on
// purpose (own styles, own form handler at /api/filmingday) so it can be
// carried across to the rebuild-2026-07 branch when that ships.

export const metadata: Metadata = {
  title: "Client Filming Day 2027 - Test Tube Marketing",
  description:
    "One day at a spa hotel in the Midlands. We plan your shoot with you, a professional videographer films it, and you get it back edited and ready to use.",
};

const sheet = [
  { k: "Production", v: "TTM client filming day" },
  { k: "When", v: "Late March or April 2027", note: "date to be confirmed" },
  { k: "Where", v: "A spa hotel in the Midlands", note: "venue to be confirmed" },
  { k: "Cast", v: "TTM clients, and a few friends of TTM" },
  { k: "Crew", v: "A professional videographer, plus Ad and Fish from TTM" },
  { k: "Wrap", v: "Dinner together, then stay over" },
];

const steps = [
  {
    when: "Before the day",
    title: "We plan your shoot with you",
    text: "We'll get on a call and work out exactly what you're filming: the ads you need now, the ones you'll want later in the year, and some social content to keep you going in between. We'll help you with the scripts too, so you're not making it up on the spot.",
  },
  {
    when: "On the day",
    title: "Your slot with the videographer",
    text: "You get your own time on camera, filmed around the house and grounds, with us there to keep it on track. When you're not filming, there's the spa, and a room full of other business owners we rate.",
  },
  {
    when: "In the evening",
    title: "Dinner, and a bed for the night",
    text: "We all eat together. Most people will stay over, so nobody's racing home straight after.",
  },
  {
    when: "Afterwards",
    title: "Your content, edited and ready",
    text: "Your footage comes back edited and ready to use. There'll be a sensible limit on how much each person films, so everyone gets a proper turn.",
  },
];

// Frames from ads we've already made, picked by Fish (11 Nov 2026). Labelled
// by business, not by person. wide = a landscape frame.
const reel = [
  { src: "/assets/filmingday/reel-fish.jpg", who: "Test Tube Marketing" },
  { src: "/assets/filmingday/reel-tess.jpg", who: "Tess Cope" },
  { src: "/assets/filmingday/reel-evoke.jpg", who: "Evoke Tree Services", wide: true },
  { src: "/assets/filmingday/reel-thrive.jpg", who: "Thrive" },
  { src: "/assets/filmingday/reel-ad.jpg", who: "Test Tube Marketing" },
];

export default function FilmingDay() {
  return (
    <div className={s.page}>
      <header className={s.top}>
        <div className={`container ${s.topInner}`}>
          <Link href="/" className="brand" aria-label="Test Tube Marketing home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/ttm-secondary.png" alt="Test Tube Marketing" />
          </Link>
          <a href="#interested" className="btn btn-outline">
            I&apos;m interested
          </a>
        </div>
      </header>

      <main>
        <section className={`container ${s.hero}`}>
          <div className={s.heroCopy}>
            <p className="mono-tag">Client filming day / Spring 2027</p>
            <h1 className={`display ${s.h1}`}>
              Get months of ads and content filmed in a <span className={s.pink}>single day.</span>
            </h1>
            <p className={s.sub}>
              One day at a spa hotel in the Midlands next spring. We plan your shoot with you first, a
              professional videographer films it, and you get it back edited and ready to use. Then
              dinner, and a bed for the night.
            </p>
            <div className={s.ctaRow}>
              <a href="#interested" className="btn btn-primary">
                I&apos;m interested <span aria-hidden="true">&rarr;</span>
              </a>
              <span className={s.ctaNote}>No booking and nothing to pay yet.</span>
            </div>
          </div>

          <aside className={s.sheet} aria-label="The day at a glance">
            <div className={s.sheetHead}>
              <span>Call sheet</span>
              <span>TTM-FD-01</span>
            </div>
            <dl className={s.sheetList}>
              {sheet.map((r) => (
                <div key={r.k} className={s.sheetRow}>
                  <dt>{r.k}</dt>
                  <dd>
                    {r.v}
                    {r.note && <span className={s.tbc}>{r.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
            <div className={s.sheetFoot}>
              <span>Places limited</span>
              <span className={s.rec}>
                <i aria-hidden="true" /> Taking names
              </span>
            </div>
          </aside>
        </section>

        <section className={`container ${s.why}`}>
          <figure className={s.photo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/hero-founders.jpg" alt="Ad and Fish, the founders of Test Tube Marketing" />
          </figure>
          <div className={s.prose}>
            <h2 className={s.h2}>Why we&apos;re doing this</h2>
            <p>
              We&apos;re making more ads and videos for our clients than ever. Most of them start the same
              way: a script from us, then you, a phone and a spare ten minutes.
            </p>
            <p>
              Most of our clients are brilliant in a room. Then the camera goes on and it all goes a bit wooden.
              That&apos;s normal, and it&apos;s why most ads filmed on a phone don&apos;t look like the
              person we know.
            </p>
            <p>
              Hiring a videographer for a day yourself costs a grand or more to do properly, and that&apos;s
              before anyone&apos;s planned what to film.
            </p>
            <p>
              So Ad and I are doing it once, for everyone. Somewhere lovely, a proper videographer,
              everybody&apos;s shoot planned in advance, and the lot filmed in one day.
            </p>
            <p className={s.sign}>
              Fish<span>Co-founder, Test Tube Marketing</span>
            </p>
          </div>
        </section>

        <section className={`container ${s.reel}`} aria-label="Frames from ads we've made with clients">
          <ul className={s.reelStrip}>
            {reel.map((r) => (
              <li key={r.src} className={r.wide ? s.reelWide : undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.src} alt={`A frame from a ${r.who} ad`} loading="lazy" />
                <span>{r.who}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`container ${s.how}`}>
          <div className={s.sideHead}>
            <h2 className={s.h2}>How the day works</h2>
            <p>Four parts. You only need to be on camera for one of them.</p>
          </div>
          <ol className={s.steps}>
            {steps.map((st, i) => (
              <li key={st.when} className={s.step}>
                <span className={s.stepNo}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className={s.stepWhen}>{st.when}</p>
                  <h3 className={s.h3}>{st.title}</h3>
                  <p>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.band}>
          <div className={`container ${s.tbcSection}`}>
          <h2 className={s.h2}>What we don&apos;t know yet</h2>
          <dl className={s.unknowns}>
            <div>
              <dt>The date</dt>
              <dd>Late March or April 2027. We&apos;ll confirm it as soon as the venue&apos;s booked.</dd>
            </div>
            <div>
              <dt>The venue</dt>
              <dd>We&apos;re talking to a shortlist of spa hotels in the Midlands now.</dd>
            </div>
            <div>
              <dt>The price</dt>
              <dd>There&apos;ll be a fee. We&apos;ll confirm it along with the date and venue.</dd>
            </div>
          </dl>
          </div>
        </section>

        <section id="interested" className={s.formBand}>
          <div className={`container ${s.formSection}`}>
          <div className={s.formIntro}>
            <h2 className={s.h2}>Interested?</h2>
            <p>
              Leave your details and Ad or I will be in touch once the date and venue are set. This
              isn&apos;t a booking, and there&apos;s nothing to pay yet.
            </p>
          </div>
          <InterestForm />
          </div>
        </section>
      </main>

      <footer className={`container ${s.foot}`}>
        <span>Test Tube Marketing Ltd, Balsall Common</span>
        <Link href="/privacy">Privacy policy</Link>
      </footer>
    </div>
  );
}
