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
    /*
     * Fish's amend 2026-08-31: "qualified" calls, and the target reframed as
     * what they told us rather than a flat number. "Over the moon with 50"
     * makes the 250 land; "target was 50" just sat there. His words.
     */
    text: "250 qualified calls booked from a first campaign. They’d told us they’d be over the moon with 50.",
  },
  /*
   * Added 2026-08-31. The two figures are Fish's, supplied exactly as they
   * appear: total revenue £64,945, total ad spend £7,663. The closing clause is
   * his too, added 2026-08-31, and the quotation marks are load-bearing: they
   * attribute "couldn't be profitably scaled" to whoever told him that, rather
   * than letting it read as our own characterisation of the account.
   *
   * The implied return is 8.4x and is deliberately NOT stated. Fish gave two
   * numbers, not three, and a derived figure on a due-diligence page is his
   * call to make, not one to slip in.
   */
  {
    idx: "08",
    name: "Ian Mulligani",
    biz: "Young Driver",
    text: "£64,945 in revenue from £7,663 of ad spend on an account he’d been told “couldn’t be profitably scaled”.",
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
  /*
   * Supplied by Fish 2026-09-02, the eighth statement. Two things about it:
   *
   *   - "f*ck all" is censored exactly as he sent it. Not uncensored to match
   *     James Sinclair's line in FLEX_QUOTES, which he signed off in full, and
   *     not censored any further. His asterisk, his call.
   *   - The only edit is "acquisiton" to "acquisition", a plain misspelling of
   *     a common word. Flagged to him. Ian Mulligani's NAME is untouched and
   *     stays as it is; that one is correct and is not a typo.
   *
   * Note for whoever reads this next: the £10 out for every £1 in here is a
   * 10:1 return, while the Young Driver row in RECORD works out at 8.5:1
   * (£64,945 from £7,663). Different periods, presumably. Raised with Fish
   * rather than silently reconciled, because both figures are his.
   */
  {
    kicker: "“These guys are magicians”",
    quote:
      "I’ve been through every marketing agency around and every single one promised the world and delivered f*ck all. They all told me our paid ads were ‘impossible to scale’. Then Fish and Ad took over - and we’re getting £10 out for every £1 we put in. They’ve reduced our customer acquisition cost by over 80% while quadrupling the volume. I don’t know how they do it - I suspect witchcraft!",
    name: "Ian Mulligani",
    biz: "Young Driver",
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
