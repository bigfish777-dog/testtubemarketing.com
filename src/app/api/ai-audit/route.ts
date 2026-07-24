import { NextResponse } from "next/server";

/*
 * AI Strategy Session application handler. Emails Fish each application
 * via Resend (reply-to set to the applicant so he can reply straight
 * back, or WhatsApp them). Requires RESEND_API_KEY; when unset the route
 * returns a clean 503 so the form shows its graceful failure state
 * (honest states only - no fake success).
 *
 * No database: the email IS the record, matching the site's existing
 * Resend-only setup. Nothing is stored server-side.
 */

const NOTIFY_TO = "bigfish@testtubemarketing.com";
const FROM = "TTM Applications <hello@testtubemarketing.com>";

type Payload = {
  name?: string;
  whatsapp?: string;
  email?: string;
  business?: string;
  proficiency?: string;
  tools?: string[];
  toolsOther?: string;
  uses?: string[];
  usesOther?: string;
  focus?: string;
};

const PROFICIENCY_LABEL: Record<string, string> = {
  "1": "Just dabbling",
  "2": "Here and there",
  "3": "Most days",
  "4": "Woven through my work",
  "5": "Building my own systems",
};

function clean(v: unknown, max = 2000): string {
  return String(v ?? "").trim().slice(0, max);
}

function list(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => clean(x, 120)).filter(Boolean).slice(0, 40);
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const name = clean(body.name, 160);
  const whatsapp = clean(body.whatsapp, 60);
  const email = clean(body.email, 254);
  const business = clean(body.business, 400);
  const proficiency = clean(body.proficiency, 4);
  const tools = list(body.tools);
  const toolsOther = clean(body.toolsOther, 300);
  const uses = list(body.uses);
  const usesOther = clean(body.usesOther, 300);
  const focus = clean(body.focus, 2000);

  // Required fields (same set the form marks required).
  if (!name || !whatsapp || !business || !proficiency) {
    return NextResponse.json({ error: "Missing details." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That doesn't look like an email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Applications aren't switched on yet." },
      { status: 503 }
    );
  }

  const profText = PROFICIENCY_LABEL[proficiency]
    ? `${proficiency} (${PROFICIENCY_LABEL[proficiency]})`
    : proficiency;
  const toolsAll = [...tools, toolsOther].filter(Boolean).join(", ") || "None given";
  const usesAll = [...uses, usesOther].filter(Boolean).join(", ") || "None given";

  const text = [
    "New AI Strategy Session application.",
    "",
    `Name:        ${name}`,
    `WhatsApp:    ${whatsapp}`,
    `Email:       ${email}`,
    `Business:    ${business}`,
    "",
    `Proficiency: ${profText}`,
    `Tools:       ${toolsAll}`,
    `Uses:        ${usesAll}`,
    "",
    "Wants to fix / figure out:",
    focus || "(nothing added)",
    "",
    "----",
    "Reply to this email to reach them, or WhatsApp the number above.",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [NOTIFY_TO],
      reply_to: email,
      subject: `AI session application: ${name}`,
      text,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Could not send that application." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
