"use client";

import { useVisitor, shapeOf } from "@/personalisation/use-visitor";
import styles from "@/styles/path.module.css";

/*
 * DRAFT COPY throughout. Claude's wording, written to Fish's register from the
 * /speaking opener he supplied 2026-08-28.
 *
 * Deliberately carries NO invented figures. It would be easy to write "an
 * agency that bills you five grand a month for a PDF", and it would land, but
 * an invented number inside a comparison reads as a researched claim, and this
 * page already has three real ones on it further down. The joke works on
 * shapes instead.
 *
 * Contractions throughout: the uncontracted "it is / we are / you are" ban is
 * global across every client, not Fast Funnels only.
 *
 * Fish owns all of this and should overwrite it.
 */

export function Intro() {
  const visitor = useVisitor();
  const shape = visitor.ready ? shapeOf(visitor) : "neither";
  const { name, company } = visitor;

  if (shape === "both") {
    return (
      <div className={styles.intro}>
        <p>
          So {company}{" "}needs someone to run its marketing. Which usually means a
          choice between an agency that sends a lovely monthly report nobody
          reads, a freelancer who&apos;s brilliant right up until August, or
          hiring someone full-time and hoping they&apos;ve done it before.
        </p>
        <p>
          There&apos;s a fourth option, {name}, and it&apos;s the one we built
          the business around: two people who&apos;ve run this before, on
          retainer, sat in your planning and holding your plan. Then you pay for
          the doing separately, only when there&apos;s doing to be done.
        </p>
        <p>Here&apos;s exactly how that works, and exactly what it costs.</p>
      </div>
    );
  }

  if (shape === "company") {
    return (
      <div className={styles.intro}>
        <p>
          So {company}{" "}needs someone to run its marketing. Which usually means a
          choice between an agency that sends a lovely monthly report nobody
          reads, a freelancer who&apos;s brilliant right up until August, or
          hiring someone full-time and hoping they&apos;ve done it before.
        </p>
        <p>
          There&apos;s a fourth option, and it&apos;s the one we built the
          business around: two people who&apos;ve run this before, on retainer,
          sat in your planning and holding your plan. Then you pay for the doing
          separately, only when there&apos;s doing to be done.
        </p>
        <p>Here&apos;s exactly how that works, and exactly what it costs.</p>
      </div>
    );
  }

  if (shape === "name") {
    return (
      <div className={styles.intro}>
        <p>
          So you need someone to run your marketing, {name}. Which usually means
          a choice between an agency that sends a lovely monthly report nobody
          reads, a freelancer who&apos;s brilliant right up until August, or
          hiring someone full-time and hoping they&apos;ve done it before.
        </p>
        <p>
          There&apos;s a fourth option, and it&apos;s the one we built the
          business around: two people who&apos;ve run this before, on retainer,
          sat in your planning and holding your plan. Then you pay for the doing
          separately, only when there&apos;s doing to be done.
        </p>
        <p>Here&apos;s exactly how that works, and exactly what it costs.</p>
      </div>
    );
  }

  return (
    <div className={styles.intro}>
      <p>
        So you need someone to run your marketing. Which usually means a choice
        between an agency that sends a lovely monthly report nobody reads, a
        freelancer who&apos;s brilliant right up until August, or hiring someone
        full-time and hoping they&apos;ve done it before.
      </p>
      <p>
        There&apos;s a fourth option, and it&apos;s the one we built the
        business around: two people who&apos;ve run this before, on retainer,
        sat in your planning and holding your plan. Then you pay for the doing
        separately, only when there&apos;s doing to be done.
      </p>
      <p>
        You kept your name to yourself, which is fair enough. Here&apos;s
        exactly how it works, and exactly what it costs, anyway.
      </p>
    </div>
  );
}

/* Second drop, above the pricing ledger. DRAFT. */
export function BillLine() {
  const visitor = useVisitor();
  const shape = visitor.ready ? shapeOf(visitor) : "neither";

  const line =
    shape === "both" || shape === "company"
      ? `No "contact us for pricing", no discovery call before you're allowed a number. This is what ${visitor.company} would actually pay.`
      : `No "contact us for pricing", no discovery call before you're allowed a number. This is what you'd actually pay.`;

  return <p className={styles.priceSupport}>{line}</p>;
}

/* Third drop, on the closing ask. DRAFT. */
export function CtaLine() {
  const visitor = useVisitor();
  const shape = visitor.ready ? shapeOf(visitor) : "neither";

  if (shape === "both" || shape === "name") {
    return (
      <p className={styles.lead}>
        Worth a conversation, {visitor.name}? No pitch, no
        pressure, and we&apos;ll tell you if we&apos;re not the right fit.
      </p>
    );
  }

  return (
    <p className={styles.lead}>
      Worth a conversation? No pitch, no pressure, and
      we&apos;ll tell you if we&apos;re not the right fit.
    </p>
  );
}
