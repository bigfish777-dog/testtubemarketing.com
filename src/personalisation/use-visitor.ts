"use client";

import { useEffect, useState } from "react";

/*
 * Who is reading the page, if they told us.
 *
 * Two ways in:
 *   1. They came through the chooser and typed it. The terminal put it in
 *      sessionStorage.
 *   2. They followed a deep link carrying it in the URL FRAGMENT, e.g.
 *      /speaking#n=Sarah&co=Acme%20Events
 *
 * Fragments, never query params. A query param is transmitted to the server on
 * every request and lands in Vercel's access logs whether or not our code reads
 * it, which would make the "we won't store it anywhere" promise false for
 * exactly the people we sent a personal link to. Fragments are never sent by
 * any browser. ROUTER-BRIEF section 3a.
 *
 * On pickup the fragment is written to sessionStorage and stripped from the
 * address bar, so a screen-shared or forwarded URL does not carry a stranger's
 * name around.
 *
 * Nothing here ever touches the network.
 */

const STORE_KEY = "ttm.visitor";

export type Visitor = {
  name: string;
  company: string;
};

const EMPTY: Visitor = { name: "", company: "" };

function clean(value: string | null | undefined) {
  // Names come off a URL and out of a text input, so cap the length: this goes
  // into a headline and a 40 character "name" is a layout attack, not a name.
  return (value ?? "").trim().slice(0, 40);
}

function readFragment(): Visitor | null {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw) return null;

  const params = new URLSearchParams(raw);
  const name = clean(params.get("n"));
  const company = clean(params.get("co"));
  if (!name && !company) return null;

  return { name, company };
}

function readStore(): Visitor | null {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { n?: string; c?: string };
    const name = clean(parsed.n);
    const company = clean(parsed.c);
    if (!name && !company) return null;
    return { name, company };
  } catch {
    // Private mode, or something else wrote junk to the key. Either way the
    // page has a complete no-name state, so this is not an error path.
    return null;
  }
}

/*
 * `ready` exists so copy can hold its no-name state through the server render
 * and the first client paint, then swap once. Without it, every personalised
 * slot flashes the joke fallback on a hard refresh even for someone we know.
 */
export function useVisitor(): Visitor & { ready: boolean } {
  const [visitor, setVisitor] = useState<Visitor>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fromFragment = readFragment();

    if (fromFragment) {
      try {
        sessionStorage.setItem(
          STORE_KEY,
          JSON.stringify({ n: fromFragment.name, c: fromFragment.company })
        );
      } catch {
        // Not storable. The value still works for this render.
      }
      // Take the name out of the address bar without adding a history entry.
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
      setVisitor(fromFragment);
      setReady(true);
      return;
    }

    setVisitor(readStore() ?? EMPTY);
    setReady(true);
  }, []);

  return { ...visitor, ready };
}

/*
 * Which of the four copy variants to render. Every personalised block on the
 * site branches on this, so a missing company can never produce "at ." and a
 * missing name can never produce a sentence addressed to nobody.
 */
export type Shape = "both" | "name" | "company" | "neither";

export function shapeOf({ name, company }: Visitor): Shape {
  if (name && company) return "both";
  if (name) return "name";
  if (company) return "company";
  return "neither";
}
