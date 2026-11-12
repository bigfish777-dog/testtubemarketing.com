// Filming day interest form. Emails each sign-up to Fish and Ad through
// Resend; nothing is stored (Fish's call, 6 Nov 2026), so a failed send is
// reported back to the visitor rather than swallowed.

const FROM = "TTM Filming Day <filmingday@mail.testtubemarketing.com>";
const TO = ["bigfish@testtubemarketing.com", "ad@testtubemarketing.com"];

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Something went wrong with the form." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend it worked.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const business = clean(body.business, 160);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const film = clean(body.film, 2000);

  if (!name || !business || !email) {
    return Response.json({ error: "Please fill in your name, business and email." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("filmingday: RESEND_API_KEY is not set");
    return Response.json({ error: "" }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Business", business],
    ["Email", email],
    ["Mobile", phone || "-"],
    ["Wants to film", film || "-"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<p>New interest in the client filming day.</p><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table><p>Reply to this email to answer ${esc(name.split(/\s+/)[0])} directly.</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: TO,
      reply_to: email,
      subject: `Filming day interest: ${name}, ${business}`,
      text: `New interest in the client filming day.\n\n${text}\n\nReply to this email to answer them directly.`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("filmingday: Resend send failed", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
