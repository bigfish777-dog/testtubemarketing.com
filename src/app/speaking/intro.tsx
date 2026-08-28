"use client";

import { useVisitor, shapeOf } from "@/personalisation/use-visitor";
import styles from "@/styles/path.module.css";

/*
 * The personalised opener.
 *
 * COPY PROVENANCE. The "both" variant is FISH'S OWN COPY, supplied 2026-08-28,
 * verbatim. The other three are minimal derivations of it: same jokes, same
 * rhythm, the fewest words changed that still make sense when we are missing a
 * name, a company, or both. They are Claude's wording and Fish should overwrite
 * them.
 *
 * Every variant keeps the Ant & Dec beat, because that gag is the reason the
 * paragraph works. The no-name variant has to be a joke in its own right, per
 * ROUTER-BRIEF locked decision 6: missing-name states are never blanks.
 *
 * The no-name variant is what the server renders and what the first client
 * paint shows. It swaps once, when useVisitor reports ready. So a stranger sees
 * the joke, someone we know sees their name, and nobody sees a flash of "null".
 */

export function Intro() {
  const visitor = useVisitor();
  const shape = visitor.ready ? shapeOf(visitor) : "neither";
  const { name, company } = visitor;

  if (shape === "both") {
    return (
      <div className={styles.intro}>
        <p>
          A little birdy told us that {company}{" "}are looking for a handsome,
          charming double-act to grace the stage at their next event.
        </p>
        <p>
          Unfortunately, Ant &amp; Dec were busy, so they&apos;ve had to move to
          the next name on their list...
        </p>
        <p>
          And look, {name}, we might not have the same Geordie appeal as the
          famed presenter duo. But we&apos;d hazard a bet we know more about
          marketing - plus neither of us have been arrested for drink-driving
          after crashing our car.
        </p>
      </div>
    );
  }

  if (shape === "company") {
    return (
      <div className={styles.intro}>
        <p>
          A little birdy told us that {company}{" "}are looking for a handsome,
          charming double-act to grace the stage at their next event.
        </p>
        <p>
          Unfortunately, Ant &amp; Dec were busy, so they&apos;ve had to move to
          the next name on their list...
        </p>
        <p>
          And look, we might not have the same Geordie appeal as the famed
          presenter duo. But we&apos;d hazard a bet we know more about marketing
          - plus neither of us have been arrested for drink-driving after
          crashing our car.
        </p>
      </div>
    );
  }

  if (shape === "name") {
    return (
      <div className={styles.intro}>
        <p>
          A little birdy told us you&apos;re looking for a handsome, charming
          double-act to grace the stage at your next event.
        </p>
        <p>
          Unfortunately, Ant &amp; Dec were busy, so you&apos;ve had to move to
          the next name on the list...
        </p>
        <p>
          And look, {name}, we might not have the same Geordie appeal as the
          famed presenter duo. But we&apos;d hazard a bet we know more about
          marketing - plus neither of us have been arrested for drink-driving
          after crashing our car.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.intro}>
      <p>
        A little birdy told us somebody out there is looking for a handsome,
        charming double-act to grace the stage at their next event. The birdy
        didn&apos;t catch a name and you didn&apos;t fancy leaving one, which is
        fair enough.
      </p>
      <p>
        Unfortunately, Ant &amp; Dec were busy, so they&apos;ve had to move to
        the next name on their list...
      </p>
      <p>
        And look, whoever you are, we might not have the same Geordie appeal as
        the famed presenter duo. But we&apos;d hazard a bet we know more about
        marketing - plus neither of us have been arrested for drink-driving
        after crashing our car.
      </p>
    </div>
  );
}

/*
 * Second drop. Sits above the stage list so the company name lands again a
 * screen further down without the page feeling like a mail merge.
 */
export function RoomsLine() {
  const visitor = useVisitor();
  const shape = visitor.ready ? shapeOf(visitor) : "neither";

  // DRAFT COPY - Claude's placeholder, not Fish's.
  const line =
    shape === "both" || shape === "company"
      ? `Rooms we've stood in before ${visitor.company} came calling.`
      : "Rooms we've stood in before you came calling.";

  return <p className={styles.dropLine}>{line}</p>;
}

/*
 * Third drop, on the closing ask. Uses the first name if we have one, because
 * a direct address is what a close wants.
 */
export function CtaLine() {
  const visitor = useVisitor();
  const shape = visitor.ready ? shapeOf(visitor) : "neither";

  // DRAFT COPY - Claude's placeholder, not Fish's.
  if (shape === "both" || shape === "name") {
    return (
      <p className={styles.lead}>
        Go on then, {visitor.name}. Date, audience, and what you want them
        walking out believing. Forty minutes, no pitch, no pressure.
      </p>
    );
  }

  return (
    <p className={styles.lead}>
      Date, audience, and what you want them walking out believing. Forty
      minutes, no pitch, no pressure.
    </p>
  );
}
