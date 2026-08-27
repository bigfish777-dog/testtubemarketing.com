"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./terminal.module.css";
import { DRAFT } from "./draft-copy";

/*
 * The terminal. Fish's direction 2026-07-31, second pass against his
 * AppleWorks main-menu reference: bordered panel, numbered items, selection
 * as an inverted block behind the label, arrow keys and Return, monospace
 * throughout.
 *
 * Phases: intro -> name (command-line capture) -> assemble (boot) -> route.
 *
 * The name never touches the network. sessionStorage only, so the "we won't
 * store it anywhere" line stays literally true.
 */

const STORE_KEY = "ttm.visitor";
// Typing speed. Fish: the first pass was too quick.
const CHAR_MS = 38;
const LINE_PAUSE_MS = 260;

function prefersReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Verification affordance, /next?instant: every phase renders settled, with no
 * type-on to wait out. Automated browsers throttle setTimeout to roughly one
 * tick a second in a background tab, which stretched the seven second boot past
 * three minutes and made the menu impossible to screenshot or put in front of a
 * critic. Carries no visitor data, so it stays a query param rather than a
 * fragment. */
function instantMode() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).has("instant");
}

function skipTyping() {
  return prefersReduced() || instantMode();
}

/* Reveals lines character by character, with a beat at each line end.
 * Reduced motion skips to the end, so the content is all there unmoving. */
function useTyped(lines: readonly string[], active: boolean) {
  const joined = useMemo(() => lines.join("\n"), [lines]);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (skipTyping()) {
      setN(joined.length);
      return;
    }
    setN(0);
    let i = 0;
    let timer = 0;
    const tick = () => {
      i += 1;
      setN(i);
      if (i >= joined.length) return;
      const pause = joined[i] === "\n" ? LINE_PAUSE_MS : CHAR_MS;
      timer = window.setTimeout(tick, pause);
    };
    timer = window.setTimeout(tick, CHAR_MS);
    return () => window.clearTimeout(timer);
  }, [joined, active]);

  return { shown: joined.slice(0, n).split("\n"), done: n >= joined.length };
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
  // Item 1 is highlighted on arrival, the way the reference menu is.
  const [cursor, setCursor] = useState(0);
  const [stamp, setStamp] = useState("");

  const gagRef = useRef<HTMLButtonElement>(null);
  const dodges = useRef(0);
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
  const assembling = useTyped(DRAFT.assembling, phase.kind === "assemble");

  // Set after mount so the server and client markup agree.
  useEffect(() => {
    const d = new Date();
    setStamp(
      `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1
      ).padStart(2, "0")}/${String(d.getFullYear()).slice(2)}`
    );
  }, []);

  /* ---- the gag -------------------------------------------------------
   * Desktop steps away from the pointer, clamped inside the viewport so it
   * cannot be chased off an edge. Mobile puffs on tap. Reduced motion does
   * neither. aria-hidden and out of the tab order throughout, because a
   * control that evades the cursor must not be keyboard reachable.
   */
  const dodge = useCallback(() => {
    const el = gagRef.current;
    if (!el || prefersReduced()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = el.getBoundingClientRect();
    if (gagOrigin.current === null) gagOrigin.current = rect.left;

    const margin = 16;
    const maxLeft = window.innerWidth - rect.width - margin;
    if (maxLeft <= margin) return;

    dodges.current += 1;
    const stops = [0.62, 0.12, 0.86, 0.3, 0.48];
    const stop = stops[dodges.current % stops.length];
    const target = margin + (maxLeft - margin) * stop;
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
    window.setTimeout(() => setPunchline(true), 320);
  }, []);

  /* ---- flow ---- */

  const choose = useCallback((slug: string, label: string) => {
    setHistory([label]);
    setPhase({ kind: "name", slug, step: "name" });
  }, []);

  const finish = useCallback(
    (slug: string, keep: boolean) => {
      if (keep) {
        try {
          sessionStorage.setItem(
            STORE_KEY,
            JSON.stringify({ n: name.trim(), c: company.trim() })
          );
        } catch {
          // Private mode. Every path works without a name.
        }
      }
      setPhase({ kind: "assemble", slug });
    },
    [company, name]
  );

  // Arrows move the block, Return selects, number keys jump. As the
  // reference's own status line says: type a number, or use arrows.
  useEffect(() => {
    if (phase.kind !== "intro" || !intro.done) return;
    const onKey = (e: KeyboardEvent) => {
      const last = DRAFT.options.length - 1;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => (c >= last ? 0 : c + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => (c <= 0 ? last : c - 1));
      } else if (e.key === "Enter") {
        const opt = DRAFT.options[cursor];
        if (opt) choose(opt.slug, opt.label);
      } else {
        const i = Number(e.key) - 1;
        const opt = DRAFT.options[i];
        if (opt) choose(opt.slug, opt.label);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase.kind, intro.done, cursor, choose]);

  useEffect(() => {
    if (phase.kind !== "assemble" || !assembling.done) return;
    const id = window.setTimeout(
      () => router.push(`/${phase.slug}`),
      prefersReduced() ? 0 : 900
    );
    return () => window.clearTimeout(id);
  }, [phase, assembling.done, router]);

  const panelTab =
    phase.kind === "intro"
      ? DRAFT.panelIntro
      : phase.kind === "name"
        ? DRAFT.panelName
        : DRAFT.panelBoot;

  return (
    <main className={styles.screen}>
      <span className={styles.lines} aria-hidden="true" />

      <div className={styles.topbar}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.logo}
          src="/assets/ttm-secondary-wht.png"
          alt="Test Tube Marketing"
        />
        <span className={styles.topbarRight}>{DRAFT.topRight}</span>
      </div>

      <section className={styles.stage}>
        {/* Typed lines sit above the panel in every phase. */}
        <p className={styles.stream} aria-hidden="true">
          {phase.kind === "intro" &&
            intro.shown.map((l, i) => (
              <span key={i}>
                {l}
                {i === intro.shown.length - 1 && !intro.done && (
                  <i className={styles.caret} />
                )}
                {"\n"}
              </span>
            ))}
          {phase.kind === "name" && (
            <>
              {history.map((h, i) => (
                <span key={i}>
                  {h}
                  {"\n"}
                </span>
              ))}
              <span>
                {prompt.shown[0] ?? ""}
                {!prompt.done && <i className={styles.caret} />}
              </span>
            </>
          )}
        </p>
        {phase.kind === "intro" && (
          <p className={styles.srOnly}>{DRAFT.bootLines.join(" ")}</p>
        )}

        <div className={styles.panel}>
          <span className={styles.tab}>{panelTab}</span>

          {/* ---------- menu ---------- */}
          {phase.kind === "intro" && intro.done && (
            <ol className={styles.menu}>
              {DRAFT.options.map((opt, i) => (
                <li className={styles.row} key={opt.slug}>
                  {/* Real anchor: crawls, works with JS off, opens in a new
                      tab. JS intercepts to run the capture first. */}
                  <a
                    href={`/${opt.slug}`}
                    className={styles.item}
                    data-on={cursor === i}
                    onMouseEnter={() => setCursor(i)}
                    onFocus={() => setCursor(i)}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                      e.preventDefault();
                      choose(opt.slug, opt.label);
                    }}
                  >
                    <span className={styles.num}>{i + 1}.</span>
                    <span className={styles.label}>{opt.label}</span>
                  </a>
                </li>
              ))}

              <li className={styles.row} aria-hidden="true">
                {punchline ? (
                  <p className={styles.punchline}>
                    {DRAFT.options.length + 1}. {DRAFT.gagPunchline}
                  </p>
                ) : (
                  <button
                    ref={gagRef}
                    type="button"
                    className={`${styles.item} ${styles.gag}`}
                    tabIndex={-1}
                    onMouseEnter={dodge}
                    onMouseMove={dodge}
                    onClick={puff}
                  >
                    <span className={styles.num}>
                      {DRAFT.options.length + 1}.
                    </span>
                    <span className={styles.label}>{DRAFT.gag}</span>
                  </button>
                )}
              </li>
            </ol>
          )}

          {/* ---------- name capture ---------- */}
          {phase.kind === "name" && prompt.done && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (phase.step === "name") {
                  setHistory((h) => [...h, name.trim() || "(not given)"]);
                  setPhase({ ...phase, step: "company" });
                } else {
                  finish(phase.slug, true);
                }
              }}
            >
              <div className={styles.answerRow}>
                <span aria-hidden="true">&gt;</span>
                <label
                  className={styles.srOnly}
                  htmlFor={phase.step === "name" ? "fname" : "co"}
                >
                  {phase.step === "name" ? DRAFT.nameField : DRAFT.companyField}
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

          {/* ---------- boot ---------- */}
          {phase.kind === "assemble" &&
            assembling.shown.map((l, i) => (
              <p className={styles.bootLine} key={i}>
                <span aria-hidden="true">
                  {i < assembling.shown.length - 1 || assembling.done
                    ? "[ok]"
                    : "[..]"}
                </span>
                {l}
              </p>
            ))}
        </div>
      </section>

      <div className={styles.statusbar}>
        <span>{phase.kind === "intro" ? DRAFT.hint : DRAFT.hintQuiet}</span>
        <span className={styles.statusRight}>
          <a className={styles.statusLink} href="https://book.testtubemarketing.com">
            {DRAFT.footRight}
          </a>
          {stamp ? `  ${stamp}` : ""}
        </span>
      </div>

      <p className={styles.draftFlag}>Draft copy - Claude&apos;s, not Fish&apos;s</p>
    </main>
  );
}
