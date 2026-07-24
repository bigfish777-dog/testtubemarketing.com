import type { Metadata } from "next";

/*
 * THE AI LEVERAGE LADDER (round 4 opt-in asset).
 * Unlisted (noindex), print-friendly, no motion. Content framing per the
 * ai-skill-lead-research memory: DEPTH not adoption - never claim
 * "business owners don't use AI"; the defensible line is that almost
 * everyone now uses AI but very few operate past casual use. No
 * invented statistics: qualitative framing only.
 */

export const metadata: Metadata = {
  title: "The AI Leverage Ladder - Test Tube Marketing",
  description:
    "The five rungs of AI leverage, where most established businesses actually sit, and what one rung up looks like.",
  robots: { index: false, follow: false },
};

const rungs: { n: string; label: string; body: string }[] = [
  {
    n: "01",
    label: "NOT USING IT",
    body: "No AI in the business at all. Rarer than the headlines suggest, and shrinking by the month. If this is you, the good news is the first rung up is the easiest climb on the whole ladder.",
  },
  {
    n: "02",
    label: "THE CASUAL USER",
    body: "A chat window and a blank prompt. Ask a question, copy the answer out, close the tab. Genuinely useful, and a fraction of what the tool can do. This is where most established businesses actually sit, whatever their LinkedIn says.",
  },
  {
    n: "03",
    label: "THE DAILY DRIVER",
    body: "AI is in the weekly routine: drafts, summaries, content, the odd formula. Still one tool, still a chat window, still starting from a blank page every time. Faster work, same shape of work.",
  },
  {
    n: "04",
    label: "THE POWER USER",
    body: "The AI knows the business. Saved context, proper prompt systems, your documents and numbers loaded in, a second and third tool doing specialist jobs. Outputs land close to finished, and small repeatable systems start forming around them.",
  },
  {
    n: "05",
    label: "THE ORCHESTRATOR",
    body: "AI wired into the tools themselves, so it can see the CRM, the ad accounts and the reporting instead of guessing. Automations that run without anyone pressing go. Agent workflows that draft, check and ship work, with a human signing off at the end. Deliverables that took a team a week take a day. This is where the leverage lives, and almost nobody is here.",
  },
];

export default function AiLadder() {
  return (
    <main className="ladder-page">
      <div className="ladder-wrap">
        <header className="ladder-head">
          <p className="mono">{"// TEST TUBE MARKETING"}</p>
          <h1 className="display ladder-title">
            The AI <span className="accent">Leverage Ladder.</span>
          </h1>
          <p className="ladder-intro">
            Almost every business owner we meet now uses AI. Hardly any of
            them are getting real leverage from it. The gap between those two
            sentences is this ladder: five rungs, from not touching the tools
            at all to running them the way we run our own agency.
          </p>
        </header>

        <section className="ladder-rungs" aria-label="The five rungs">
          <ol className="rung-list">
            {rungs.map((r) => (
              <li key={r.n} className="rung">
                <div className="rung-marker" aria-hidden="true">
                  <span className="mono rung-n">{r.n}</span>
                </div>
                <div className="rung-body">
                  <h2 className="h3 rung-label">{r.label}</h2>
                  <p>{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="ladder-notes">
          <h2 className="h2">Where you sit.</h2>
          <p>
            Be honest, not aspirational. Most established businesses we speak
            to are on rung two, maybe three. Not because anyone is behind on
            adoption: nearly everyone has the tool open. What separates the
            top of the ladder from the middle is depth, and depth is where
            the leverage is.
          </p>

          <h2 className="h2">The Everest.</h2>
          <p>
            Rung five can sound like science fiction, so here is what it
            looks like in an ordinary working week at our place: the AI reads
            the actual reporting rather than a pasted screenshot. Routine
            deliverables assemble themselves overnight and wait for a human
            yes. One person does what used to take a team, and the saved time
            goes into the thinking that a machine genuinely cannot do. None
            of that needed a developer on staff. It needed someone to climb
            deliberately.
          </p>

          <h2 className="h2">The in-between.</h2>
          <p>
            Nobody climbs from two to five in one go, and you should be
            suspicious of anyone selling that jump. The move is one rung at a
            time: make the next rung boring and normal, then look up again.
          </p>
          <ul className="climb-list">
            <li>
              <strong>Two to three:</strong> give AI a standing slot in the
              week. Same tasks, every week, until reaching for it becomes
              automatic.
            </li>
            <li>
              <strong>Three to four:</strong> stop starting from blank. Load
              your context in once (what you do, who you sell to, how you
              sound, your numbers) so every output starts three-quarters
              done.
            </li>
            <li>
              <strong>Four to five:</strong> wire it in. Connect the AI to
              the systems that hold the truth, automate the runs, keep a
              human on the sign-off. This is the rung where the compounding
              starts.
            </li>
          </ul>

          <p className="ladder-close">
            If you want a second pair of eyes on where your business sits and
            which rung to take next, that&apos;s a conversation we have with
            clients every week.{" "}
            <a className="ladder-link" href="https://book.testtubemarketing.com">
              Book a Marketing Growth Call <span aria-hidden="true">&rarr;</span>
            </a>{" "}
            <span className="body-soft">
              40 minutes, no pitch, no pressure.
            </span>
          </p>
        </section>

        <footer className="ladder-foot">
          <p className="mono">
            &copy; 2026 TEST TUBE MARKETING LTD &nbsp;&middot;&nbsp;{" "}
            <a href="https://www.testtubemarketing.com">
              TESTTUBEMARKETING.COM
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
