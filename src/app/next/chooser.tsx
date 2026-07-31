"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./chooser.module.css";
import { DRAFT } from "./draft-copy";

/*
 * The chooser. See DESIGN-DIRECTION.md for the signature: the options are
 * sentences in the visitor's own voice, set at display size. Type is the
 * interface; there is no button chrome on the real options.
 *
 * The name never touches the network. It goes into sessionStorage and nowhere
 * else, so the "we won't store it anywhere" line stays literally true.
 */

const STORE_KEY = "ttm.visitor";

type Step = { kind: "choose" } | { kind: "name"; slug: string };

function remember(name: string, company: string) {
  try {
    sessionStorage.setItem(
      STORE_KEY,
      JSON.stringify({ n: name.trim(), c: company.trim() })
    );
  } catch {
    // Private mode or storage disabled. The paths all work without a name,
    // so failing to remember is not an error worth surfacing.
  }
}

export default function Chooser() {
  const router = useRouter();
  const [step, setStep] = useState<Step>({ kind: "choose" });
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [punchline, setPunchline] = useState(false);

  const gagRef = useRef<HTMLButtonElement>(null);
  const nudged = useRef(false);

  /*
   * The gag. Desktop dodges away from the pointer, mobile puffs on tap.
   * Under reduced motion it does neither and swaps to a static punchline.
   * It is aria-hidden and out of the tab order: a control that evades the
   * cursor is an accessibility failure if it is reachable any other way.
   */
  const dodge = useCallback(() => {
    const el = gagRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dir = nudged.current ? -1 : 1;
    nudged.current = !nudged.current;
    const x = dir * (window.innerWidth < 900 ? 90 : 190);
    el.style.transform = `translateX(${x}px)`;
  }, []);

  const puff = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPunchline(true);
      return;
    }
    const el = gagRef.current;
    if (el) el.classList.add(styles.gagPuffed);
    window.setTimeout(() => setPunchline(true), 340);
  }, []);

  const choose = useCallback((slug: string) => {
    setStep({ kind: "name", slug });
  }, []);

  const submit = useCallback(
    (slug: string, withName: boolean) => {
      if (withName) remember(name, company);
      router.push(`/${slug}`);
    },
    [company, name, router]
  );

  return (
    <main className={styles.room}>
      <header className={styles.masthead}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.logo}
          src="/assets/ttm-secondary-wht.png"
          alt="Test Tube Marketing"
        />
        <p className={styles.stamp}>
          {DRAFT.stamp[0]}
          <br />
          {DRAFT.stamp[1]}
        </p>
      </header>

      {step.kind === "choose" ? (
        <section className={styles.stage}>
          <p className={styles.instruction}>{DRAFT.instruction}</p>

          <ul className={styles.options}>
            {DRAFT.options.map((opt) => (
              <li className={styles.option} key={opt.slug}>
                {/*
                 * A real anchor so it crawls, works with JS off, and opens in
                 * a new tab. JS intercepts to run the name step first.
                 */}
                <a
                  href={`/${opt.slug}`}
                  className={styles.line}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                    e.preventDefault();
                    choose(opt.slug);
                  }}
                >
                  {opt.line}
                </a>
              </li>
            ))}

            {/*
             * The gag rides in the list so it reads as a fourth option worth
             * trying to press. aria-hidden and out of the tab order: a control
             * that evades the cursor must not be reachable by keyboard or
             * announced to a screen reader.
             */}
            <li className={styles.option} aria-hidden="true">
              <div className={styles.gagRow}>
                {punchline ? (
                  <p className={styles.punchline}>{DRAFT.gagPunchline}</p>
                ) : (
                  <button
                    ref={gagRef}
                    type="button"
                    className={styles.gag}
                    tabIndex={-1}
                    onMouseEnter={dodge}
                    onClick={puff}
                  >
                    {DRAFT.gag}
                  </button>
                )}
              </div>
            </li>
          </ul>
        </section>
      ) : (
        <section className={styles.nameStep}>
          <button
            type="button"
            className={styles.back}
            onClick={() => setStep({ kind: "choose" })}
          >
            Back
          </button>

          <h1 className={styles.prompt}>{DRAFT.namePrompt}</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(step.slug, true);
            }}
          >
            <div className={styles.fields}>
              <label className={styles.field}>
                <span className={styles.label}>{DRAFT.nameLabel}</span>
                <input
                  className={styles.input}
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>{DRAFT.companyLabel}</span>
                <input
                  className={styles.input}
                  type="text"
                  name="company"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </label>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.go}>
                {DRAFT.go}
              </button>
              <button
                type="button"
                className={styles.skip}
                onClick={() => submit(step.slug, false)}
              >
                {DRAFT.skip}
              </button>
              <p className={styles.reassure}>{DRAFT.reassure}</p>
            </div>
          </form>
        </section>
      )}

      <footer className={styles.foot}>
        <span>{DRAFT.footLeft}</span>
        <a
          className={styles.footLink}
          href="https://book.testtubemarketing.com"
        >
          {DRAFT.footRight}
        </a>
      </footer>

      <p className={styles.draftFlag}>Draft copy - Claude&apos;s, not Fish&apos;s</p>
    </main>
  );
}
