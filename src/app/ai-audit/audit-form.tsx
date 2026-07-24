"use client";

import { useState } from "react";

/*
 * AI Strategy Session application form. Multi-field, POSTs JSON to
 * /api/ai-audit, which emails Fish the application. Honest states only:
 * the success message shows on an actual 200 and nothing else; any other
 * response shows a graceful failure with a real fallback (email Fish).
 *
 * Microcopy in Fish's voice, for his review.
 */

const PROFICIENCY: { value: string; label: string }[] = [
  { value: "1", label: "Just dabbling" },
  { value: "2", label: "Here and there" },
  { value: "3", label: "Most days" },
  { value: "4", label: "Woven through my work" },
  { value: "5", label: "Building my own systems" },
];

const TOOLS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Grok",
  "Perplexity",
  "Midjourney / image tools",
];

const USES = [
  "Writing & copy",
  "Design & images",
  "Building pages, sites or funnels",
  "Research & analysis",
  "Automations & agents",
  "Customer support / chat",
  "Coding",
  "Strategy & planning",
];

export function AuditForm() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [toolsOther, setToolsOther] = useState("");
  const [uses, setUses] = useState<string[]>([]);
  const [usesOther, setUsesOther] = useState("");
  const [focus, setFocus] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    value: string
  ) => {
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/ai-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          business,
          proficiency,
          tools,
          toolsOther,
          uses,
          usesOther,
          focus,
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="audit-done" role="status">
        <p className="audit-done-h">Got it.</p>
        <p>
          I&apos;ll take a look at your answers and WhatsApp you to sort a time.
          Keep an eye on the number you gave me.
        </p>
      </div>
    );
  }

  return (
    <form className="audit-form" onSubmit={onSubmit}>
      <div className="audit-grid">
        <div className="audit-field">
          <label className="audit-label" htmlFor="af-name">
            Your name
          </label>
          <input
            id="af-name"
            className="audit-input"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="audit-field">
          <label className="audit-label" htmlFor="af-whatsapp">
            Best WhatsApp number
          </label>
          <input
            id="af-whatsapp"
            className="audit-input"
            type="tel"
            required
            autoComplete="tel"
            placeholder="I message you here to book"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </div>

        <div className="audit-field">
          <label className="audit-label" htmlFor="af-email">
            Email
          </label>
          <input
            id="af-email"
            className="audit-input"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourcompany.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="audit-field">
          <label className="audit-label" htmlFor="af-business">
            What&apos;s your business, and what do you do?
          </label>
          <input
            id="af-business"
            className="audit-input"
            type="text"
            required
            placeholder="One line is plenty"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
          />
        </div>
      </div>

      <fieldset className="audit-fieldset">
        <legend className="audit-label">How proficient are you with AI?</legend>
        <div className="audit-scale">
          {PROFICIENCY.map((p) => (
            <label
              key={p.value}
              className={`audit-scale-opt${
                proficiency === p.value ? " is-on" : ""
              }`}
            >
              <input
                type="radio"
                name="proficiency"
                value={p.value}
                required
                checked={proficiency === p.value}
                onChange={() => setProficiency(p.value)}
              />
              <span className="audit-scale-n">{p.value}</span>
              <span className="audit-scale-label">{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="audit-fieldset">
        <legend className="audit-label">
          Which AI tools do you use? <span className="audit-hint">Tick any</span>
        </legend>
        <div className="audit-checks">
          {TOOLS.map((t) => (
            <label
              key={t}
              className={`audit-chip${tools.includes(t) ? " is-on" : ""}`}
            >
              <input
                type="checkbox"
                checked={tools.includes(t)}
                onChange={() => toggle(tools, setTools, t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
        <input
          className="audit-input audit-other"
          type="text"
          placeholder="Anything else?"
          aria-label="Other AI tools you use"
          value={toolsOther}
          onChange={(e) => setToolsOther(e.target.value)}
        />
      </fieldset>

      <fieldset className="audit-fieldset">
        <legend className="audit-label">
          What do you use AI for? <span className="audit-hint">Tick any</span>
        </legend>
        <div className="audit-checks">
          {USES.map((u) => (
            <label
              key={u}
              className={`audit-chip${uses.includes(u) ? " is-on" : ""}`}
            >
              <input
                type="checkbox"
                checked={uses.includes(u)}
                onChange={() => toggle(uses, setUses, u)}
              />
              <span>{u}</span>
            </label>
          ))}
        </div>
        <input
          className="audit-input audit-other"
          type="text"
          placeholder="Anything else?"
          aria-label="Other things you use AI for"
          value={usesOther}
          onChange={(e) => setUsesOther(e.target.value)}
        />
      </fieldset>

      <div className="audit-field">
        <label className="audit-label" htmlFor="af-focus">
          The one thing you&apos;d most want to fix or figure out{" "}
          <span className="audit-hint">Optional</span>
        </label>
        <textarea
          id="af-focus"
          className="audit-textarea"
          rows={3}
          placeholder="Where you feel stuck, or what you'd want to walk out knowing"
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary lg audit-submit"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Sending..." : "Send my application"}
      </button>

      {state === "error" && (
        <p className="audit-error" role="alert">
          That didn&apos;t send. Try again in a minute, or email{" "}
          <a href="mailto:hello@testtubemarketing.com">
            hello@testtubemarketing.com
          </a>{" "}
          and I&apos;ll sort you out by hand.
        </p>
      )}
    </form>
  );
}
