"use client";

import { useState } from "react";

/*
 * The AI Leverage Ladder capture (round 4). Single email field + button.
 * POSTs to /api/subscribe. Honest states only: the success message shows
 * on an actual 200 and nothing else; any other response shows a graceful
 * failure with a real fallback (email us).
 *
 * ORCHESTRATOR-COPY-TODO: all microcopy in this component (button label,
 * success line, error line, placeholder) is worker-drafted - review/replace.
 */
export function CaptureForm({
  idPrefix,
  large = false,
}: {
  idPrefix: string;
  large?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <p className="capture-done" role="status">
        Done. The AI Leverage Ladder is on its way to your inbox.
      </p>
    );
  }

  return (
    <form
      className={`capture-form${large ? " lg" : ""}`}
      onSubmit={onSubmit}
      noValidate={false}
    >
      <label className="visually-hidden" htmlFor={`${idPrefix}-email`}>
        Your email address
      </label>
      <input
        id={`${idPrefix}-email`}
        className="capture-input"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="you@yourcompany.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="btn btn-primary capture-btn"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Sending..." : "Send me the Ladder"}
      </button>
      {state === "error" && (
        <p className="capture-error" role="alert">
          That didn&apos;t send. Try again in a minute, or email{" "}
          <a href="mailto:hello@testtubemarketing.com">
            hello@testtubemarketing.com
          </a>{" "}
          and we&apos;ll send it by hand.
        </p>
      )}
    </form>
  );
}
