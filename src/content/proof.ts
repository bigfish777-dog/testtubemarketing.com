/*
 * Proof content, carried VERBATIM from a6d4dd2 (site-copy-v2.md).
 *
 * Every string here is Fish's or a real named client's. Nothing in this file
 * is Claude's wording and nothing in it may be edited, tightened or
 * "improved". Names and figures especially: these are attributed statements
 * from real people about real results.
 *
 * Locked facts that live here and must not drift:
 *   - Ian Davis, not Davies.
 *   - "Midlands StartUp Awards 2026" is a QUALIFIER, not a win.
 *   - The profanity in James Sinclair's line has Fish's explicit sign-off.
 *   - No row may carry a placeholder. "[quote coming]" never ships.
 */

export const AWARD = {
  title: "Marketing & Advertising StartUp of the Year",
  body: "Midlands StartUp Awards 2026",
} as const;

/* The Record: result text verbatim, plain chronological index, no codes. */
export const RECORD = [
  {
    idx: "01",
    name: "Kirsty Darkins",
    biz: "KD Commercial",
    text: "£130,000+ in new business within 90 days of engagement.",
  },
  {
    idx: "02",
    name: "Tess Cope",
    biz: "The Transformation Agency",
    text: "40% year-on-year growth. Past 7 figures for the first time.",
  },
  {
    idx: "03",
    name: "Katie Bell",
    biz: "Thrive Business Coaching",
    text: "Business grew while founder was on maternity leave.",
  },
  {
    idx: "04",
    name: "Steve Keane",
    biz: "Kraft Coaching",
    text: "1,000 members signed up within 30 days of launch. £29.99/month each.",
  },
  {
    idx: "05",
    name: "Mike Maher",
    biz: "Take A Deep Breath",
    text: "Membership programme generating $6k per month.",
  },
  {
    idx: "06",
    name: "Aran Curry",
    biz: "Insight Education",
    text: "6 figures in revenue from a 5-day Facebook challenge.",
  },
  {
    idx: "07",
    name: "Michelle Clarke",
    biz: "Veblen Directors",
    text: "250 calls booked from a first campaign, target was 50.",
  },
] as const;

export const TESTIMONIALS = [
  {
    kicker: "“$6k per month”",
    quote:
      "When I heard the guys were starting a marketing agency, I KNEW I wanted to work with them. They’ve not only helped provide me with the strategic insights I was looking for, but helped me launch my membership programme which now generates over $6,000 per month - Thanks Ad and Fish!",
    name: "Mike Maher",
    biz: "Take A Deep Breath",
  },
  {
    kicker: "“£30k in recurring revenue”",
    quote:
      "On my first launch, Fish’s emails performed so well, we not only had to open up more spots, we also had to ‘close doors’ early due to selling out. A few months later, the guys helped me launch my mobile app, and within 30 days, we’d signed up over 1,000 members paying £29.99 each.",
    name: "Steve Keane",
    biz: "Kraft Coaching",
  },
  {
    kicker: "“Way more enquiries”",
    quote:
      "I turned to Ad and Fish when my marketing manager took a new role, because I wanted to keep up my regular emails. I was stunned when the first 4 emails they wrote generated more calls and replies than anything we’d done previously! I can’t recommend them enough.",
    name: "Kirsty Darkins",
    biz: "KD Commercial",
  },
  {
    kicker: "“They just get it”",
    quote:
      "It’s safe to say that our ‘basement pump’ business isn’t the most exciting, and is quite technical in its nature. But the team at TTM have been able to rapidly understand our offering, and craft compelling marketing that makes people take action. In fact, we had more replies to the first couple of emails they sent, than we’d had in all the emails in the entire 2 years prior.",
    name: "Ian Davis",
    biz: "PPS Pumps",
  },
  {
    kicker: "“6 figures in revenue”",
    quote:
      "The first launch Ad, Fish and the team worked on with us generated over £30,000 in sales from a 5-Day Facebook Challenge. Better yet, we were able to leverage the assets they created and re-run the challenge multiple times, and generate a total of 6 figures in revenue.",
    name: "Aran Curry",
    biz: "Insight Education",
  },
  {
    kicker: "“250 calls booked!”",
    quote:
      "On the first campaign Fish and Ad ran for us, we’d set a target of booking 50 calls. The first 2 emails they sent exceeded our target, and we had over 250 calls booked in total. Plus we’ve been able to re-run the campaign since, and get even more calls booked!",
    name: "Michelle Clarke",
    biz: "Veblen Directors",
  },
  {
    kicker: "“A total joy to work with!”",
    quote:
      "What an amazing impact the Test Tube Marketing team has had on our business and more importantly on our thinking. Ad, Fish and Grace have been a total joy to work with and we all feel very inspired walking away from a session with these guys. We love their copywriting style and they get our tone of voice absolutely right. We’re only a few months into working together, but we can’t wait to see what the next few years look like with them onboard!",
    name: "Richard Parsons",
    biz: "Platinum Commercial Academy",
  },
] as const;

/*
 * Short, oversized, almost offhand. All supplied VERBATIM by Fish
 * (2026-07-24). Never edit the words.
 */
export const FLEX_QUOTES: {
  quote: string;
  name: string;
  descriptor: string;
  note?: string;
}[] = [
  { quote: "Seriously, seriously smart", name: "John Parkes", descriptor: "CMO, ClickFunnels" },
  { quote: "Absolutely fucking genius", name: "James Sinclair", descriptor: "Founder, Partyman Group" },
  { quote: "In another league", name: "Jay Alderton", descriptor: "Fitness and mindset coach" },
  { quote: "Everyone needs an Ad & Fish", name: "Andy Proudman", descriptor: "Co-Founder, Me and My Golf" },
  { quote: "Absolutely golden ideas!", name: "Daniel Priestley", descriptor: "Dent" },
  { quote: "You guys are sick", name: "Frank Kern", descriptor: "Internet Marketer" },
  // "Mulligani" is CORRECT and confirmed by Fish 2026-08-28. It is a name of
  // African origin, not a typo for Mulligan. Do not "fix" it.
  { quote: "I wish I’d found them years earlier!", name: "Ian Mulligani", descriptor: "CEO, Young Driver" },
  { quote: "These guys know marketing", name: "Marcus Murphy", descriptor: "Hot Juice Studios" },
  { quote: "Ice cold marketers", name: "Wim Hof", descriptor: "The Iceman" },
  { quote: "Two of the greatest", name: "Ryan Deiss", descriptor: "CEO, Scalable" },
  { quote: "Marketing maestros", name: "Dan Bradbury", descriptor: "Business Finance Expert" },
  { quote: "Are you my drivers", name: "Jay Abraham", descriptor: "Business Consultant", note: "In fairness, we were wearing suits." },
];

/* Pricing, verbatim. Every figure line is an exact substring of its support
   sentence: no new claims, no rounded-up numbers. */
export const PRICING = [
  {
    room: "Standalone session",
    figure: "Starts at £2,500 + VAT",
    support:
      "A standalone half-day session with the two of us starts at £2,500 + VAT. Some businesses book exactly that: one room, one afternoon, one plan, off you go.",
  },
  {
    room: "The Retainer",
    figure: "From £2,500 a month",
    support:
      "The retainer starts from £2,500 a month. For that you get four in-person planning sessions a year, us on tap in between, and two people who already know your business holding you to the plan. Do the maths against the half-day and you’ll see why most clients pick the retainer.",
  },
  {
    room: "Execution",
    figure: "Quoted per project",
    support:
      "Execution is quoted per project on top, so you always see the price before anything starts.",
  },
] as const;

export const PRICING_FOOTNOTE =
  "Standalone sessions: plus 7.5% expenses within the UK. International sessions quoted individually.";
