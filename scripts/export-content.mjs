/*
 * Dump the readable prose of each page to markdown, for use as context
 * elsewhere (Fish is feeding it to a separate session rewriting his LinkedIn).
 *
 * Rendered DOM rather than source: the pages are JSX with personalisation
 * branches, and the source is mostly markup and comments. What is wanted is
 * what a visitor actually reads.
 *
 * Captured in the NO-NAME state, which is what a cold visitor gets and the
 * only state that is not addressed to a specific person.
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3111";
const OUT = process.argv[3];

const PAGES = [
  ["terminal", "/next?instant", "The terminal front door"],
  ["track-record", "/track-record", "Due diligence path"],
  ["marketing-leadership", "/marketing-leadership", "Retainer path"],
  ["speaking", "/speaking", "Speaking path"],
  ["ai-ladder", "/ai-ladder", "The AI Leverage Ladder lead magnet"],
  ["homepage-old", "/", "The current live homepage (old design)"],
];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const combined = [];

for (const [slug, url, label] of PAGES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.waitForTimeout(1800);

  const md = await page.evaluate(() => {
    const out = [];
    const seen = new Set();
    const norm = (el) => el?.innerText?.replace(/\s+/g, " ").trim() ?? "";

    document
      .querySelectorAll("h1, h2, h3, p, li, blockquote, cite, a")
      .forEach((el) => {
        const tag = el.tagName.toLowerCase();

        /*
         * Blockquotes are handled whole and FIRST, before the leaf test below,
         * because every testimonial wraps its quote and its citation in <p> and
         * <cite>. Treating the blockquote as a non-leaf skipped it, and an
         * earlier attempt to stop citations duplicating then dropped them
         * outright: Richard Parsons vanished from the export entirely.
         */
        if (tag === "blockquote") {
          const clone = el.cloneNode(true);
          clone.querySelectorAll("cite").forEach((c) => c.remove());
          const body = clone.innerText.replace(/\s+/g, " ").trim();
          const cite = norm(el.querySelector("cite"));
          if (body && !seen.has(body)) {
            out.push(`\n> ${body}`);
            if (cite) out.push(`> -- ${cite}`);
            out.push("");
          }
          // Its children must not be emitted again on their own.
          el.querySelectorAll("p, li, cite, span").forEach((d) => {
            const dt = norm(d);
            if (dt) seen.add(dt);
          });
          seen.add(body);
          if (cite) seen.add(cite);
          return;
        }

        // Everything else: leaf text only, so wrappers do not duplicate.
        if (el.querySelector("h1, h2, h3, p, li, blockquote")) return;
        const t = norm(el);
        if (!t || t.length < 2 || seen.has(t)) return;
        seen.add(t);

        if (t.startsWith("//")) out.push(`\n\`${t}\``);
        else if (tag === "h1") out.push(`\n# ${t}\n`);
        else if (tag === "h2") out.push(`\n## ${t}\n`);
        else if (tag === "h3") out.push(`\n### ${t}\n`);
        else if (tag === "li") out.push(`- ${t}`);
        else if (tag === "cite") out.push(`  -- ${t}`);
        // Link text is copy too: the CTA button label lives in an anchor.
        else if (tag === "a") out.push(`[${t}]`);
        else out.push(t);
      });
    return out.join("\n");
  });

  const header = `<!-- ${label}\n     ${url}\n     Captured from the rendered page, no-name personalisation state. -->\n`;
  const body = `${header}\n# PAGE: ${slug}\n${md}\n`;
  await writeFile(path.join(OUT, `${slug}.md`), body);
  combined.push(body);
  console.log(`${slug.padEnd(22)} ${md.length} chars`);
  await page.close();
}

await writeFile(
  path.join(OUT, "ALL-PAGES.md"),
  `# Test Tube Marketing: full site copy\n\nEvery page of the rebuild, as a visitor reads it.\nGenerated ${new Date().toISOString().slice(0, 10)} from the rebuild-2026-07 branch.\n\n${combined.join("\n\n---\n\n")}`
);
await browser.close();
console.log(`\nWritten to ${OUT}`);
