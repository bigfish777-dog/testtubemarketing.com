"use client";

import { useVisitor, shapeOf } from "@/personalisation/use-visitor";
import styles from "@/styles/path.module.css";
import { TESTIMONIALS } from "@/content/proof";

/*
 * Spelt out, because "8 of them, in full" reads like a spec sheet in the middle
 * of a sentence. Derived from the data rather than typed, so adding a ninth
 * statement cannot leave the prose claiming eight. Falls back to the numeral
 * past twelve, at which point the sentence needs rewriting anyway.
 */
const NUMBER_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six",
  "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
];
const statementCount =
  NUMBER_WORDS[TESTIMONIALS.length] ?? String(TESTIMONIALS.length);

/*
 * DRAFT COPY throughout. Claude's wording, written to Fish's register from the
 * /speaking opener he supplied 2026-08-28: name and company doing comedic work
 * inside the prose, self-deprecating, British, never a mail merge.
 *
 * Fish owns all of this and should overwrite it. It exists so the page can be
 * judged at real length with the personalisation actually firing.
 *
 * Four states, because a missing company must never render "at ." and a
 * missing name must never address nobody. The no-name state is what the server
 * renders and what the first paint shows, so it has to be a joke in its own
 * right (ROUTER-BRIEF locked decision 6).
 */

export function Intro() {
  const visitor = useVisitor();
  const shape = visitor.ready ? shapeOf(visitor) : "neither";
  const { name, company } = visitor;

  if (shape === "both") {
    return (
      <div className={styles.intro}>
        <p>
          So somebody has mentioned us to {company}, and now you&apos;re doing
          the sensible thing: checking whether we&apos;re any good, or just two
          blokes who can talk a good game, but don&apos;t know an open rate from an open bar.
        </p>
        <p>
          Good instinct. We&apos;d do the same. It&apos;s a bit awkward being
          the ones marking our own homework, so we haven&apos;t.
        </p>
        <p>
          Everything below is a real client, a real number, and a real name you
          can go and ring. Take your time, {name}. We&apos;ll wait.
        </p>
      </div>
    );
  }

  if (shape === "company") {
    return (
      <div className={styles.intro}>
        <p>
          So somebody has mentioned us to {company}, and now you&apos;re doing
          the sensible thing: checking whether we&apos;re any good, or just two
          blokes who can talk a good game, but don&apos;t know an open rate from an open bar.
        </p>
        <p>
          Good instinct. We&apos;d do the same. It&apos;s a bit awkward being
          the ones marking our own homework, so we haven&apos;t.
        </p>
        <p>
          Everything below is a real client, a real number, and a real name you
          can go and ring. Take your time. We&apos;ll wait.
        </p>
      </div>
    );
  }

  if (shape === "name") {
    return (
      <div className={styles.intro}>
        <p>
          So somebody has mentioned us to you, {name}, and now you&apos;re doing
          the sensible thing: checking whether we&apos;re any good, or just two
          blokes who can talk a good game, but don&apos;t know an open rate from an open bar.
        </p>
        <p>
          Good instinct. We&apos;d do the same. It&apos;s a bit awkward being
          the ones marking our own homework, so we haven&apos;t.
        </p>
        <p>
          Everything below is a real client, a real number, and a real name you
          can go and ring. Take your time. We&apos;ll wait.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.intro}>
      <p>
        So somebody has mentioned us to you, and now you&apos;re doing the
        sensible thing: checking whether we&apos;re any good, or just two blokes
        who can talk a good game, but don&apos;t know an open rate from an open bar.
      </p>
      <p>
        Good instinct. We&apos;d do the same. You didn&apos;t fancy telling us
        who you are, which honestly makes you better at due diligence than most.
      </p>
      <p>
        Everything below is a real client, a real number, and a real name you
        can go and ring. Take your time. We&apos;ll wait.
      </p>
    </div>
  );
}

/* Second drop, above the testimonials. DRAFT. */
export function StatementsLine() {
  const visitor = useVisitor();
  const shape = visitor.ready ? shapeOf(visitor) : "neither";

  const line =
    shape === "both" || shape === "company"
      ? `${statementCount} of them, in full, with names attached. Nothing trimmed to make us look better to ${visitor.company}.`
      : `${statementCount} of them, in full, with names attached. Nothing trimmed to make us look better.`;

  return <p className={styles.dropLine}>{line}</p>;
}

/* Third drop, on the closing ask. DRAFT. */
export function CtaLine() {
  const visitor = useVisitor();
  const shape = visitor.ready ? shapeOf(visitor) : "neither";

  if (shape === "both" || shape === "name") {
    return (
      <p className={styles.lead}>
        Satisfied, {visitor.name}? Then the next bit is a conversation. No pitch, no pressure.
      </p>
    );
  }

  return (
    <p className={styles.lead}>
      Satisfied? Then the next bit is a conversation. No pitch,
      no pressure.
    </p>
  );
}
