/*
 * The two founder bios, in ONE place.
 *
 * They were hand-duplicated across /track-record, /speaking and the old
 * homepage, which is three copies of the same paragraphs kept in sync by
 * memory. Fish asked on 2026-09-01 that an edit to a bio reach every instance;
 * the only way to guarantee that is to stop having instances. Every page now
 * renders from here.
 *
 * Provenance, because it is mixed in this file and matters:
 *   - Adam's bio is Fish's wording, supplied VERBATIM 2026-09-01. Do not edit
 *     it. It replaced an earlier version that named Expert Empires and Elite
 *     Closing Academy; those names are deliberately gone.
 *   - Fish's bio is part his, part Claude's. The additions of 2026-09-01 (the
 *     client range, the inventor/technical sentence) are CLAUDE'S DRAFT,
 *     written from Fish's instruction, and he overwrites them.
 *   - "Two girls" for Fish and "two boys" for Adam are both his corrections.
 *
 * The role labels and the "here in the lab" sentence inside each bio have to
 * agree. If one moves, the other moves with it.
 */

export type Founder = {
  key: string;
  name: string;
  role: string;
  photo: string;
  alt: string;
  width: number;
  height: number;
  bio: string;
};

export const FOUNDERS: readonly Founder[] = [
  {
    key: "fish",
    name: "Nick “Fish” Fisher",
    role: "Co-founder / Systems & Strategy",
    photo: "/assets/founders/nick-fisher.jpg",
    alt: "Nick Fisher, co-founder of Test Tube Marketing, mid-sentence with a microphone in hand, gesturing, against a dark grey wall",
    width: 1200,
    height: 1500,
    bio:
      "Fish is a marketer by accident. He dropped out of uni, fell into the " +
      "nearest job going, and realised he was good at it. Direct response is " +
      "his lane: emails, offers, funnels, the words that make people buy. He " +
      "spent years as the behind-the-scenes strategist and copywriter on big " +
      "launches, the name you never saw on the sales page, and has consulted " +
      "with everything from pre-revenue start-ups to 9-figure multinationals. " +
      "He’s an inventor and a serious tinkerer too: he codes, and he builds " +
      "hardware and electronics for the fun of it. Here in the lab he runs " +
      "systems and strategy, the engine behind every client account. He’s " +
      "also dad to two girls, which he’ll tell you is the harder of the two " +
      "jobs.",
  },
  {
    key: "adam",
    name: "Adam Ashburn",
    role: "Co-founder / Chief Experimenter",
    photo: "/assets/founders/adam-ashburn.jpg",
    alt: "Adam Ashburn, co-founder of Test Tube Marketing, seated relaxed in a navy polo shirt against a blue stage curtain",
    width: 1000,
    height: 1250,
    bio:
      "Adam was meant to be a golf pro. Then he got run over, and marketing " +
      "got him instead. He spent years as CMO at a group of training " +
      "companies, including the events business that put names like Gary " +
      "Vaynerchuk and Grant Cardone on UK stages. Strategy is where he’s " +
      "strongest: positioning, offers, and the plan that decides what’s worth " +
      "doing before anyone touches an ad account. Here in the lab he’s our " +
      "Chief Experimenter, testing ideas with our own money before they go " +
      "anywhere near yours. Two boys at home, and yes, he still plays golf.",
  },
] as const;
