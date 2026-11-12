"use client";

import { useState } from "react";
import s from "./filmingday.module.css";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; first: string } | { kind: "error"; message: string };

export function InterestForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/filmingday", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "send failed");
      setState({ kind: "sent", first: String(data.name || "").trim().split(/\s+/)[0] });
    } catch (err) {
      const message = err instanceof Error && err.message !== "send failed" ? err.message : "";
      setState({ kind: "error", message });
    }
  }

  if (state.kind === "sent") {
    return (
      <div className={s.done} role="status">
        <p className={s.doneTitle}>Got it{state.first ? `, ${state.first}` : ""}. You&apos;re on the list.</p>
        <p>We&apos;ll be in touch once the date and venue are confirmed.</p>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate={false}>
      <div className={s.field}>
        <label htmlFor="fd-name">Your name</label>
        <input id="fd-name" name="name" type="text" autoComplete="name" required maxLength={120} />
      </div>
      <div className={s.field}>
        <label htmlFor="fd-business">Business</label>
        <input id="fd-business" name="business" type="text" autoComplete="organization" required maxLength={160} />
      </div>
      <div className={s.field}>
        <label htmlFor="fd-email">Email</label>
        <input id="fd-email" name="email" type="email" autoComplete="email" required maxLength={200} />
      </div>
      <div className={s.field}>
        <label htmlFor="fd-phone">
          Mobile <span className={s.optional}>optional</span>
        </label>
        <input id="fd-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
      </div>
      <div className={`${s.field} ${s.wide}`}>
        <label htmlFor="fd-film">
          What would you want to film? <span className={s.optional}>optional</span>
        </label>
        <textarea id="fd-film" name="film" rows={4} maxLength={2000} placeholder="e.g. three ads for the spring launch, and some short clips for Instagram" />
      </div>
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className={s.hp} aria-hidden="true">
        <label htmlFor="fd-website">Website</label>
        <input id="fd-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={`${s.wide} ${s.submitRow}`}>
        <button type="submit" className="btn btn-primary" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Sending..." : "I'm interested"}
        </button>
        {state.kind === "error" && (
          <p className={s.err} role="alert">
            {state.message || "That didn't send."} Try again, or email bigfish@testtubemarketing.com.
          </p>
        )}
      </div>
    </form>
  );
}
