"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./terminal.module.css";
import { DRAFT } from "./draft-copy";

/*
 * The terminal. Fish's direction, 2026-07-31: the site assembles itself in
 * front of the visitor, then boots into the real page.
 *
 * Phases: intro (lines type, then the options appear) -> name (command-line
 * capture) -> assemble (boot) -> navigate.
 *
 * The name never touches the network. sessionStorage only, so the "we won't
 * store it anywhere" line stays literally true.
 */

const STORE_KEY = "ttm.visitor";
const CHAR_MS = 16;

function prefersReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Reveals a list of lines character by character. Reduced motion skips to the
 * end immediately, so the same content is there without anything moving. */
function useTyped(lines: readonly string[], active: boolean) {
  const joined = useMemo(() => lines.join("\n"), [lines]);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (prefersReduced()) {
      setN(joined.length);
      return;
    }
    setN(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= joined.length) window.clearInterval(id);
    }, CHAR_MS);
    return () => window.clearInterval(id);
  }, [joined, active]);

  const shown = joined.slice(0, n).split("\n");
  return { shown, done: n >= joined.length };
}

type Phase =
  | { kind: "intro" }
  | { kind: "name"; slug: string; step: "name" | "company" }
  | { kind: "assemble"; slug: string };

export default function Terminal() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>({ kind: "intro" });
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [punchline, setPunchline] = useState(false);

  const gagRef = useRef<HTMLButtonElement>(null);
  const dodges = useRef(0);
  // The element's untransformed left edge, captured on the first dodge while
  // the translate is still 0. Every later offset is measured from this, not
  // from the current rect, or the moves compound and walk off-screen.
  const gagOrigin = useRef<number | null>(null);

  const intro = useTyped(DRAFT.bootLines, phase.kind === "intro");

  const promptLines = useMemo(
    () =>
      phase.kind === "name"
        ? [phase.step === "name" ? DRAFT.namePrompt : DRAFT.companyPrompt]
        : [],
    [phase]
  );
  const prompt = useTyped(promptLines, phase.kind === "name");

  const assembling = useTyped(
    DRAFT.assembling,
    phase.kind === "assemble"
  );

  /* ---- the gag ---------------------------------------------------------
   * Desktop: steps away from the pointer, staying inside the viewport so it
   * can never be chased off-screen. Mobile: puffs on tap. Reduced motion:
   * neither, just the punchline. aria-hidden and out of the tab order, since
   * a control that evades the cursor must not be keyboard reachable.
   */
  const dodge = useCallback(() => {
    const el = gagRef.current;
    if (!el || prefersReduced()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = el.getBoundingClientRect();
    if (gagOrigin.current === null) gagOrigin.current = rect.left;

    const margin = 16;
    const maxLeft = window.innerWidth - rect.width - margin;
    if (maxLeft <= margin) return; // no room to run; leave it alone

    dodges.current += 1;
    const stops = [0.62, 0.12, 0.86, 0.3, 0.48];
    const stop = stops[dodges.current % stops.length];
    // Clamped to the viewport, so it can never be chased off an edge.
    const target = Math.min(
      maxLeft,
      Math.max(margin, margin + (maxLeft - margin) * stop)
    );
    el.style.transform = `translateX(${Math.round(
      target - gagOrigin.current
    )}px)`;
  }, []);

  const puff = useCallback(() => {
    if (prefersReduced()) {
      setPunchline(true);
      return;
    }
    const el = gagRef.current;
    if (el) el.classList.add(styles.gagPuffed);
    window.setTimeout(() => setPunchline(true), 300);
  }, []);

  /* ---- flow ---- */

  const choose = useCallback(
    (slug: string, label: string) => {
      setHistory([`${label}`]);
      setPhase({ kind: "name", slug, step: "name" });
    },
    []
  );

  const finish = useCallback(
    (slug: string, keep: boolean) => {
      if (keep) {
        try {
          sessionStorage.setItem(
            STORE_KEY,
            JSON.stringify({ n: name.trim(), c: company.trim() })
          );
        } catch {
          // Private mode. Every path works without a name, so this is not
          // an error worth surfacing.
        }
      }
      setPhase({ kind: "assemble", slug });
    },
    [company, name]
  );

  // Number keys select an option, which is what a terminal would do.
  useEffect(() => {
    if (phase.kind !== "intro" || !intro.done) return;
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1;
      const opt = DRAFT.options[i];
      if (opt) choose(opt.slug, opt.label);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase.kind, intro.done, choose]);

  // Boot finishes, the real page loads.
  useEffect(() => {
    if (phase.kind !== "assemble" || !assembling.done) return;
    const id = window.setTimeout(
      () => router.push(`/${phase.slug}`),
      prefersReduced() ? 0 : 420
    );
    return () => window.clearTimeout(id);
  }, [phase, assembling.done, router]);

  return (
    <main className={styles.screen}>
      <header className={styles.masthead}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.logo}
          src="/assets/ttm-secondary-wht.png"
          alt="Test Tube Marketing"
        />
        <p className={styles.status}>
          {phase.kind === "assemble" ? "Building" : "Ready"}
        </p>
      </header>

      <section className={styles.console}>
        {/* ---------- intro + options ---------- */}
        {phase.kind === "intro" && (
          <>
            <p className={styles.stream} aria-hidden="true">
              {intro.shown.map((l, i) => (
                <span className={styles.streamLine} key={i}>
                  {l}
                  {i === intro.shown.length - 1 && !intro.done && (
                    <i className={styles.caret} />
                  )}
                </span>
              ))}
            </p>
            {/* Full text for assistive tech, present from the first paint. */}
            <p className={styles.srOnly}>{DRAFT.bootLines.join(" ")}</p>

            {intro.done && (
              <>
                <ul className={styles.options}>
                  {DRAFT.options.map((opt, i) => (
                    <li key={opt.slug}>
                      {/* Real anchor: crawls, works with JS off, opens in a
                          new tab. JS intercepts to run the capture first. */}
                      <a
                        href={`/${opt.slug}`}
                        className={styles.optionBtn}
                        onClick={(e) => {
                          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                          e.preventDefault();
                          choose(opt.slug, opt.label);
                        }}
                      >
                        <span className={styles.key}>{i + 1}</span>
                        {opt.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className={styles.gagRow} aria-hidden="true">
                  {punchline ? (
                    <p className={styles.punchline}>{DRAFT.gagPunchline}</p>
                  ) : (
                    <button
                      ref={gagRef}
                      type="button"
                      className={styles.gag}
                      tabIndex={-1}
                      onMouseEnter={dodge}
                      onMouseMove={dodge}
                      onClick={puff}
                    >
                      <span className={styles.key}>!</span>
                      {DRAFT.gag}
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* ---------- name capture ---------- */}
        {phase.kind === "name" && (
          <>
            <p className={styles.stream}>
              {history.map((h, i) => (
                <span className={styles.streamLine} key={i}>
                  {h}
                </span>
              ))}
              <span className={styles.streamLine}>
                {prompt.shown[0] ?? ""}
                {!prompt.done && <i className={styles.caret} />}
              </span>
            </p>

            {prompt.done && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (phase.step === "name") {
                    setHistory((h) => [...h, name.trim() || "(no name)"]);
                    setPhase({ ...phase, step: "company" });
                  } else {
                    finish(phase.slug, true);
                  }
                }}
              >
                <div className={styles.answerRow}>
                  <span className={styles.chevron} aria-hidden="true">
                    $
                  </span>
                  <label
                    className={styles.srOnly}
                    htmlFor={phase.step === "name" ? "fname" : "co"}
                  >
                    {phase.step === "name"
                      ? DRAFT.nameField
                      : DRAFT.companyField}
                  </label>
                  <input
                    id={phase.step === "name" ? "fname" : "co"}
                    className={styles.entry}
                    type="text"
                    autoFocus
                    autoComplete={
                      phase.step === "name" ? "given-name" : "organization"
                    }
                    value={phase.step === "name" ? name : company}
                    onChange={(e) =>
                      phase.step === "name"
                        ? setName(e.target.value)
                        : setCompany(e.target.value)
                    }
                  />
                </div>

                <div className={styles.actions}>
                  <button type="submit" className={styles.go}>
                    {DRAFT.go}
                  </button>
                  <button
                    type="button"
                    className={styles.skip}
                    onClick={() => finish(phase.slug, false)}
                  >
                    {DRAFT.skip}
                  </button>
                  <p className={styles.reassure}>{DRAFT.reassure}</p>
                </div>
              </form>
            )}
          </>
        )}

        {/* ---------- boot ---------- */}
        {phase.kind === "assemble" && (
          <div>
            {assembling.shown.map((l, i) => (
              <p className={styles.bootLine} key={i}>
                <span className={styles.tick} aria-hidden="true">
                  {i < assembling.shown.length - 1 || assembling.done
                    ? "[ok]"
                    : "[..]"}
                </span>
                {l}
              </p>
            ))}
          </div>
        )}
      </section>

      <footer className={styles.foot}>
        <span>{DRAFT.footLeft}</span>
        <a className={styles.footLink} href="https://book.testtubemarketing.com">
          {DRAFT.footRight}
        </a>
      </footer>

      <p className={styles.draftFlag}>Draft copy - Claude&apos;s, not Fish&apos;s</p>
    </main>
  );
}
