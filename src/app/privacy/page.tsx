import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Test Tube Marketing",
  description: "How Test Tube Marketing collects, uses and protects personal data.",
};

const S = {
  wrap: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "clamp(40px, 8vw, 96px) var(--pad)",
  } as React.CSSProperties,
  h1: { fontSize: "clamp(32px, 5vw, 44px)", lineHeight: 1.1, marginBottom: 8 } as React.CSSProperties,
  updated: {
    fontFamily: "var(--font-jetbrains), monospace",
    fontSize: 13,
    color: "var(--ink-faint)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    marginBottom: 40,
  } as React.CSSProperties,
  h2: { fontSize: 22, marginTop: 40, marginBottom: 12 } as React.CSSProperties,
  p: { color: "var(--ink-soft)", marginBottom: 14 } as React.CSSProperties,
  ul: { color: "var(--ink-soft)", paddingLeft: 22, marginBottom: 14 } as React.CSSProperties,
};

export default function PrivacyPolicy() {
  return (
    <main style={S.wrap}>
      <h1 style={S.h1}>Privacy Policy</h1>
      <p style={S.updated}>Last updated: 12 June 2026</p>

      <p style={S.p}>
        Test Tube Marketing Ltd (&quot;we&quot;, &quot;us&quot;) builds and operates marketing systems
        for our clients. This policy explains what personal data we collect, why we collect it,
        and the rights you have over it. We act in accordance with UK GDPR and the Data
        Protection Act 2018.
      </p>

      <h2 style={S.h2}>What we collect</h2>
      <ul style={S.ul}>
        <li>Contact details you give us directly (name, email, phone) when you enquire or work with us.</li>
        <li>Usage data when you visit this site (pages viewed, approximate location, device type) via analytics tools.</li>
        <li>Campaign data we process on behalf of clients (for example, form submissions on landing pages we operate).</li>
      </ul>

      <h2 style={S.h2}>How we use it</h2>
      <ul style={S.ul}>
        <li>To respond to enquiries and deliver our services.</li>
        <li>To measure and improve marketing campaigns, including through advertising platforms such as Meta and Google.</li>
        <li>To meet legal and accounting obligations.</li>
      </ul>
      <p style={S.p}>
        Where we run advertising for clients, data may be shared with advertising platforms
        (such as Meta) in hashed form for measurement and audience purposes. We do not sell
        personal data.
      </p>

      <h2 style={S.h2}>Cookies and tracking</h2>
      <p style={S.p}>
        Our sites and the campaign pages we operate may use cookies and similar technologies
        (including the Meta pixel) for analytics and advertising measurement. You can control
        cookies through your browser settings.
      </p>

      <h2 style={S.h2}>Who we share data with</h2>
      <ul style={S.ul}>
        <li>Service providers that host and power our systems (for example Vercel, our hosting provider).</li>
        <li>Advertising and analytics platforms, as described above.</li>
        <li>Our clients, where we process data on their behalf as part of a campaign they own.</li>
      </ul>

      <h2 style={S.h2}>How long we keep it</h2>
      <p style={S.p}>
        We keep personal data only as long as needed for the purposes above, then delete or
        anonymise it. Campaign data retention is governed by our agreements with each client.
      </p>

      <h2 style={S.h2}>Your rights</h2>
      <p style={S.p}>
        You can ask us to access, correct, delete, or stop processing your personal data at any
        time. You also have the right to complain to the Information Commissioner&apos;s Office
        (ico.org.uk).
      </p>

      <h2 style={S.h2}>Contact</h2>
      <p style={S.p}>
        For anything related to your data, email{" "}
        <a href="mailto:bigfish@testtubemarketing.com">bigfish@testtubemarketing.com</a>.
      </p>

      <p style={S.p}>
        <Link href="/">Back to testtubemarketing.com</Link>
      </p>
    </main>
  );
}
