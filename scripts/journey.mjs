/*
 * The whole journey, on one origin: terminal -> pick an option -> give a name
 * and company -> land on the real path page with the name in the copy.
 *
 * This exists because every check so far has verified pages in isolation. The
 * thing being sold is the route between them, and nothing had ever walked it.
 *
 * It asserts, rather than screenshotting and hoping:
 *   - the host never changes across the whole run (one preview link, not four)
 *   - each option lands on its own URL
 *   - the name reaches the destination page's prose
 *   - the fragment deep link personalises and is then stripped from the bar
 *   - no console errors anywhere along the way
 *
 *   node scripts/journey.mjs --base http://localhost:3111
 */

import { chromium, devices } from "playwright";

const arg = (flag, fallback) => {
  const i = process.argv.indexOf(flag);
  return i === -1 ? fallback : process.argv[i + 1];
};

const BASE = arg("--base", "http://localhost:3111").replace(/\/$/, "");
const MOBILE = process.argv.includes("--mobile");
const NAME = "Fish";
const CO = "Test Tube Marketing";

const OPTIONS = [
  { slug: "track-record", n: 1 },
  { slug: "marketing-leadership", n: 2 },
  { slug: "speaking", n: 3 },
];

const browser = await chromium.launch();
const fails = [];
const hosts = new Set();

for (const opt of OPTIONS) {
  const context = await browser.newContext({
    ...(MOBILE ? devices["iPhone 13"] : {}),
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  const note = (msg) => {
    fails.push(`${opt.slug}: ${msg}`);
    console.log(`  FAIL  ${msg}`);
  };

  console.log(`\n[${opt.n}] ${opt.slug}`);

  // Boot settled, so the menu is on screen without waiting out the type-on.
  await page.goto(`${BASE}/next?instant`, { waitUntil: "networkidle" });
  hosts.add(new URL(page.url()).host);

  await page.locator(`a[href="/${opt.slug}"]`).first().click();

  // Name, then company: two prompts inside the one Details panel.
  const field = page.locator("input").first();
  await field.waitFor({ timeout: 5000 });
  await field.fill(NAME);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(300);
  await page.locator("input").first().fill(CO);
  await page.keyboard.press("Enter");

  try {
    await page.waitForURL(`**/${opt.slug}`, { timeout: 15000 });
  } catch {
    note(`never landed on /${opt.slug} (stuck at ${page.url()})`);
  }
  hosts.add(new URL(page.url()).host);

  // The arrival transition plays over the top, so wait it out before reading.
  await page.waitForTimeout(2000);

  const body = await page.locator("body").innerText();
  if (!body.includes(NAME)) note(`name "${NAME}" never reached the page`);
  if (!body.includes(CO)) note(`company "${CO}" never reached the page`);
  if (errors.length) note(`console: ${errors.slice(0, 3).join(" | ")}`);
  if (!fails.some((f) => f.startsWith(opt.slug))) console.log("  pass");

  await context.close();
}

/*
 * The deep link, which is the whole point of the fragment decision: a personal
 * link works cold, with no terminal in front of it, and the name must not
 * survive in the address bar afterwards.
 */
console.log(`\n[4] deep link`);
{
  const context = await browser.newContext({
    ...(MOBILE ? devices["iPhone 13"] : {}),
  });
  const page = await context.newPage();
  const url = `${BASE}/speaking#n=${NAME}&co=${encodeURIComponent(CO)}`;
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  hosts.add(new URL(page.url()).host);

  const body = await page.locator("body").innerText();
  if (!body.includes(NAME)) {
    fails.push("deep link: name never personalised");
    console.log("  FAIL  name never personalised");
  }
  if (page.url().includes("n=")) {
    fails.push("deep link: fragment still in the address bar");
    console.log("  FAIL  fragment still in the address bar");
  }
  if (!fails.some((f) => f.startsWith("deep link"))) console.log("  pass");
  await context.close();
}

await browser.close();

console.log(`\nHosts touched: ${[...hosts].join(", ")}`);
if (hosts.size > 1) {
  fails.push(`journey crossed ${hosts.size} hosts: ${[...hosts].join(", ")}`);
  console.log("FAIL  more than one host in a single journey");
}
console.log(fails.length ? `\n${fails.length} failure(s)` : "\nAll journeys clean");
process.exit(fails.length ? 1 : 0);
