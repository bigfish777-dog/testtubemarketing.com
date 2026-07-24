import { NextResponse } from "next/server";

/*
 * AI Leverage Ladder opt-in (round 4).
 * Adds the contact to a Resend audience, then sends the asset email
 * linking to /ai-ladder. Requires RESEND_API_KEY + RESEND_AUDIENCE_ID;
 * when unset the route returns a clean 503 so the form can show its
 * graceful failure state (honest states only - no fake success).
 */

const SITE = "https://www.testtubemarketing.com";

export async function POST(req: Request) {
  let email: string;
  try {
    const body = await req.json();
    email = String(body?.email ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // Minimal sanity check; the input is type=email client-side too.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "That doesn't look like an email address." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    return NextResponse.json(
      { error: "Subscriptions aren't switched on yet." },
      { status: 503 }
    );
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // 1. Add the contact to the audience (idempotent enough: Resend
  // treats an existing contact as a normal create).
  const contactRes = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ email, unsubscribed: false }),
    }
  );
  if (!contactRes.ok) {
    return NextResponse.json(
      { error: "Could not subscribe that address." },
      { status: 502 }
    );
  }

  // 2. Send the asset email. Plain, one job: deliver the link.
  const emailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: "Fish at Test Tube Marketing <hello@testtubemarketing.com>",
      to: [email],
      subject: "The AI Leverage Ladder",
      text: [
        "Here it is, as promised.",
        "",
        `The AI Leverage Ladder: ${SITE}/ai-ladder`,
        "",
        "It shows you the five rungs, where most established businesses actually sit, and what one rung up looks like. It takes about four minutes to read, and it prints cleanly if you want it on paper.",
        "",
        "If you read it and want to talk about where your business sits, book a Marketing Growth Call: https://book.testtubemarketing.com",
        "",
        "No pressure either way.",
        "",
        "Fish",
        "Test Tube Marketing",
        "",
        "Test Tube Marketing Ltd, Holly Grange, Holly Lane, Balsall Common, CV7 7EB",
      ].join("\n"),
    }),
  });
  if (!emailRes.ok) {
    return NextResponse.json(
      { error: "Subscribed, but the email failed to send." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
