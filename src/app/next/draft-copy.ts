/*
 * DRAFT COPY - every string here is Claude's placeholder, not Fish's.
 * Fish owns all marketing copy. These exist only so the terminal can be judged
 * at real length and real line count. Replace wholesale, then re-baseline the
 * copy guard.
 *
 * Nothing in this file ships.
 */

export const DRAFT = {
  // Printed one line at a time before the options appear.
  bootLines: [
    "TTM/terminal v2.4 - ready",
    "Most sites serve everyone the same page.",
    "This one doesn't. Tell it why you're here.",
  ],

  options: [
    {
      slug: "track-record",
      // Priority path: post-referral due diligence. First position by design.
      label: "I want to check you two are legit",
    },
    {
      slug: "marketing-leadership",
      label: "I'm after someone to run my marketing",
    },
    {
      slug: "speaking",
      label: "I want you to speak at my event",
    },
  ],

  // The fourth "gag" option is gone: Fish's call 2026-08-31, after the dodging
  // button misbehaved. He weighed a disappear-on-click and an error-code
  // variant and decided the joke was not earning its place. The wording and the
  // dodge behaviour are in git if it is ever revived.

  namePrompt: "ok, what's your name?",
  companyPrompt: "and the company? (optional)",
  nameField: "First name",
  companyField: "Company",
  go: "Enter",
  skip: "I'd rather not say",
  reassure:
    "You sure? It's cool to see, and we won't store it anywhere. It stays in this browser tab and goes when you close it.",

  // Printed during the boot before the real page resolves.
  assembling: [
    "reading your answer",
    "pulling the relevant proof",
    "dropping the bits that are not for you",
    "assembling your page",
  ],

  // Bars and panel tabs, mirroring the reference's chrome.
  topRight: "Main menu",
  panelIntro: "Why are you here?",
  panelName: "Details",
  panelBoot: "Building your page",
  hint: "Type a number, or use arrows, then press Return",
  hintQuiet: "Press Return to continue",

  footLeft: "Fractional marketing leadership",
  footRight: "WhatsApp us",
} as const;
