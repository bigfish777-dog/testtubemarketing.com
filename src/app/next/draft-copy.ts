/*
 * DRAFT COPY - every string here is Claude's placeholder, not Fish's.
 * Fish owns all marketing copy. These exist only so the design can be judged
 * at real length and real line count. Replace wholesale, then delete this
 * comment and re-baseline the copy guard.
 *
 * Nothing in this file ships.
 */

export const DRAFT = {
  instruction: "Pick the one that fits",

  options: [
    {
      slug: "track-record",
      // Priority path: post-referral due diligence. First position by design.
      line: "I want to check you two are legit.",
    },
    {
      slug: "marketing-leadership",
      line: "I'm after someone to run my marketing.",
    },
    {
      slug: "speaking",
      line: "I want you to speak at my event.",
    },
  ],

  gag: "I'm contacting you on behalf of HMRC.",
  gagPunchline: "Nice try.",

  namePrompt: "Right. Who are we talking to?",
  nameLabel: "First name",
  companyLabel: "Company (optional)",
  namePlaceholder: "",
  companyPlaceholder: "",
  go: "Go on then",
  skip: "I'd rather not say",
  reassure:
    "You sure? It's cool to see, and we won't store it anywhere. It stays in this browser tab and goes when you close it.",

  stamp: ["Test Tube Marketing", "Est. 2014"],
  footLeft: "Fractional marketing leadership",
  footRight: "Book a call",
} as const;
