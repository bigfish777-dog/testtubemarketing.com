/*
 * Real-viewport capture harness.
 *
 * Why this exists: mobile was never verifiable on this build. Two things kept
 * breaking it, and both are handled here.
 *
 * 1. Headless Chrome clamps a real window to a ~500px minimum width, so a 320px
 *    or 390px "mobile" capture actually renders desktop and shows phantom
 *    overflow. Playwright's device emulation sets the viewport independently of
 *    any window, plus deviceScaleFactor and isMobile, so 320px is really 320px.
 * 2. The CRT flicker on /next never gives a stable frame, which timed out the
 *    old CDP Page.captureScreenshot harness. `animations: "disabled"` fast
 *    forwards CSS animations to their end state and holds them there.
 *
 * It also measures rather than eyeballs: vertical overflow on the zero-scroll
 * terminal, and horizontal overflow anywhere, are reported as numbers.
 *
 *   node scripts/shots.mjs                        # against http://localhost:3000
 *   node scripts/shots.mjs --base https://...     # against a deployed preview
 *   node scripts/shots.mjs --only 390x844         # one viewport
 */

import { chromium, devices } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const arg = (flag, fallback) => {
  const i = process.argv.indexOf(flag);
  return i === -1 ? fallback : process.argv[i + 1];
};

const BASE = arg("--base", "http://localhost:3000").replace(/\/$/, "");
const ONLY = arg("--only", null);
const OUT = arg("--out", "shots");
/*
 * --fold captures the first screen only. A full-page mobile capture of the path
 * pages comes out 14,000 to 27,000 pixels tall, which is useful for an overflow
 * measurement and useless to actually look at: any viewer scales it down until
 * the type is unreadable. The fold is also the thing that decides whether a
 * visitor stays.
 */
const FOLD = process.argv.includes("--fold");

/*
 * The matrix from ROUTER-BRIEF.md section 7. Phones carry isMobile and a real
 * deviceScaleFactor so text renders at the density it will on the device;
 * hasTouch flips the hover-dependent behaviour (the gag dodges on pointer,
 * puffs on tap) to its touch branch.
 */
const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568, dsf: 2, mobile: true },
  { name: "390x844", width: 390, height: 844, dsf: 3, mobile: true },
  { name: "430x932", width: 430, height: 932, dsf: 3, mobile: true },
  { name: "844x390", width: 844, height: 390, dsf: 3, mobile: true },
  { name: "768x1024", width: 768, height: 1024, dsf: 2, mobile: true },
  { name: "1280x800", width: 1280, height: 800, dsf: 1, mobile: false },
  { name: "1440x900", width: 1440, height: 900, dsf: 1, mobile: false },
  { name: "1920x1080", width: 1920, height: 1080, dsf: 1, mobile: false },
];

/*
 * /next is captured with ?instant because the boot's setTimeout chain is
 * throttled to roughly one tick a second in a background tab, which stretches a
 * 7 second boot past three minutes. It is also the only page held to the
 * zero-scroll rule, so it is the only one where vertical overflow is a defect.
 */
const PAGES = [
  { slug: "next", url: "/next?instant", fullPage: false, noScroll: true },
  /*
   * The name step, reached the way a visitor reaches it. Captured separately
   * because it is the state with the input in it, so it is where the mobile
   * keyboard reflow and the 44px touch targets actually have to hold up, and
   * none of that is visible on the menu screen.
   */
  {
    slug: "next-name",
    url: "/next?instant",
    fullPage: false,
    noScroll: true,
    act: async (page) => {
      await page.locator('a[href="/track-record"]').first().click();
      await page.locator("input").first().waitFor({ timeout: 5000 });
      await page.locator("input").first().fill("Sarah");
      await page.waitForTimeout(400);
    },
  },
  { slug: "track-record", url: "/track-record", fullPage: true },
  { slug: "marketing-leadership", url: "/marketing-leadership", fullPage: true },
  { slug: "speaking", url: "/speaking", fullPage: true },
];

const targets = ONLY ? VIEWPORTS.filter((v) => v.name === ONLY) : VIEWPORTS;
if (!targets.length) {
  console.error(`No viewport matches --only ${ONLY}`);
  process.exit(1);
}

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const report = [];

for (const vp of targets) {
  const context = await browser.newContext({
    ...(vp.mobile ? devices["iPhone 13"] : {}),
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dsf,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
    // Real look, not the reduced-motion variant. Screenshots freeze the
    // animations; they are not removed from the page.
    reducedMotion: "no-preference",
  });

  for (const p of PAGES) {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));

    // Cache buster: the built pages cache hard and a stale render has been
    // reviewed by mistake twice.
    const sep = p.url.includes("?") ? "&" : "?";
    const url = `${BASE}${p.url}${sep}cb=${process.env.CB ?? "1"}`;

    let status = "ok";
    try {
      const res = await page.goto(url, {
        waitUntil: "networkidle",
        timeout: 30000,
      });
      if (res && res.status() >= 400) status = `http ${res.status()}`;
    } catch (e) {
      status = `nav failed: ${e.message.split("\n")[0]}`;
    }

    // Fonts settle before measuring, or the overflow numbers are measured
    // against a fallback face at a different width.
    await page.evaluate(() => document.fonts?.ready).catch(() => {});

    if (p.act && status === "ok") {
      try {
        await p.act(page);
      } catch (e) {
        status = `act failed: ${e.message.split("\n")[0]}`;
      }
    }

    const metrics = await page
      .evaluate(() => {
        const d = document.documentElement;
        return {
          scrollHeight: d.scrollHeight,
          innerHeight: window.innerHeight,
          scrollWidth: d.scrollWidth,
          innerWidth: window.innerWidth,
          /*
           * iOS Safari zooms the page in on focus when a text field's font
           * size is under 16px, and never zooms back out. It is invisible in
           * a screenshot because it only happens on focus on a real handset,
           * so it gets measured instead. Fish hit it on the name step.
           */
          smallFields: [...document.querySelectorAll("input, textarea, select")]
            .map((el) => ({
              el: `${el.tagName.toLowerCase()}${el.type ? `[${el.type}]` : ""}`,
              px: parseFloat(getComputedStyle(el).fontSize),
            }))
            .filter((f) => f.px < 16)
            .map((f) => `${f.el} ${f.px}px`),

          // Anything actually sticking out to the right, named, so the fix has
          // somewhere to go rather than "something overflows".
          wide: [...document.querySelectorAll("body *")]
            .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
            .slice(0, 6)
            .map((el) => {
              const r = el.getBoundingClientRect();
              return `${el.tagName.toLowerCase()}.${
                (el.className && String(el.className).split(" ")[0]) || "-"
              } right=${Math.round(r.right)}`;
            }),
        };
      })
      .catch(() => null);

    const file = path.join(OUT, `${p.slug}--${vp.name}.png`);
    try {
      await page.screenshot({
        path: file,
        fullPage: FOLD ? false : p.fullPage,
        animations: "disabled",
        caret: "hide",
        timeout: 20000,
      });
    } catch (e) {
      status = `${status}; shot failed: ${e.message.split("\n")[0]}`;
    }

    const row = {
      page: p.slug,
      viewport: vp.name,
      status,
      file,
      vOverflow:
        p.noScroll && metrics
          ? Math.max(0, metrics.scrollHeight - metrics.innerHeight)
          : null,
      hOverflow: metrics
        ? Math.max(0, metrics.scrollWidth - metrics.innerWidth)
        : null,
      wide: metrics?.wide ?? [],
      smallFields: metrics?.smallFields ?? [],
      errors,
    };
    report.push(row);

    const flags = [
      row.status !== "ok" ? row.status : null,
      row.vOverflow ? `SCROLLS ${row.vOverflow}px` : null,
      row.hOverflow ? `H-OVERFLOW ${row.hOverflow}px` : null,
      row.smallFields.length
        ? `IOS ZOOM ON FOCUS: ${row.smallFields.join(", ")}`
        : null,
      row.errors.length ? `${row.errors.length} js error(s)` : null,
    ].filter(Boolean);
    console.log(
      `${flags.length ? "FAIL" : "pass"}  ${p.slug.padEnd(22)} ${vp.name.padEnd(
        10
      )} ${flags.join(" | ")}`
    );

    await page.close();
  }

  await context.close();
}

await browser.close();
await writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));

const failed = report.filter(
  (r) =>
    r.status !== "ok" ||
    r.vOverflow ||
    r.hOverflow ||
    r.smallFields.length ||
    r.errors.length
);
console.log(
  `\n${report.length} captures in ${OUT}/, ${failed.length} with something to look at.`
);
process.exit(failed.length ? 1 : 0);
