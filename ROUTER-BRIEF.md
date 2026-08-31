# TTM site: intent router architecture

> Internal working doc. Written 2026-07-31. Supersedes the structural half of
> `BUILD-BRIEF.md` (its positioning, copy rules and hard constraints still stand).
> Not public copy. Owner: Fish.

## 1. What this is

The site's front door is an intent router. A visitor lands on a zero-scroll
chooser, picks why they are here, optionally gives a first name, and is taken to
a page arranged around that reason and addressed to them by name.

The novelty is structural, not decorative. There are no scroll animations in
this build.

## 2. Locked decisions

From Fish, 2026-07-29 to 2026-07-31. Do not reopen.

1. Intent router as the front door: three real options plus one gag option.
   **REVERSED by Fish 2026-08-31: the gag is gone.** The dodging button
   misbehaved in use. He considered having it disappear on click or return an
   error code instead, then decided the joke was not earning its place. Three
   real options, nothing else. See 3b, which is now history rather than spec.
2. One component set. Each path is a different ordering and framing of the same
   components. Not four codebases, not four copy trees.
3. Every path is a real, server-rendered, indexable URL. Arriving directly at a
   path URL gives a complete page with no chooser.
4. Deep links carry intent and name, so a path plus a first name can be sent in
   an email, a DM, or on an NFC card. First-class feature.
5. The name is never stored. Client-side only, never Supabase, never a log.
6. The name is always optional. Every path works fully without it. Missing-name
   states are jokes, never blanks.
7. The landing screen has zero scroll on any device.
8. LLM-powered live copy adjustment is parked. Do not build it.
9. Name plus optional company, asked in one step.
10. Name survives a refresh in the same tab, dies when the tab closes.
11. The visual language restarts. Blank sheet on colour, type and layout.
12. Copy carries over verbatim from `a6d4dd2`. Fish owns all prose.

## 3. Decisions taken here

### 3a. Deep links use the URL fragment, not a query parameter

`testtubemarketing.com/speaking#n=Sarah&co=Acme`

Locked decisions 4 and 5 conflict as written. A query parameter is transmitted
to the server on every request and lands in Vercel's access logs whether or not
our code reads it, so `?n=Sarah` makes the "we won't store it anywhere" promise
false for exactly the people we sent a personal link to.

Fragments are never transmitted to the server by any browser. The link works
identically from an email, a DM or an NFC card. On mount the page parses the
fragment, writes it to sessionStorage, and strips it from the address bar with
`history.replaceState`.

Cost: the page renders its no-name state first and personalises on hydration, so
there is a brief moment before the name appears. Unavoidable in any architecture
that keeps the promise, and invisible on a fast connection.

### 3b. The gag sits inline with the real options, visually cheaper

> **SUPERSEDED 2026-08-31. The gag was removed entirely (see decision 1).**
> Kept for the reasoning, which still applies if it is ever revived: the
> accessibility constraints below are not optional, and a control that evades
> the pointer must never be keyboard reachable or announced.

The joke only lands if it reads as a fourth item in the same list. Moved
somewhere else it stops being an option and becomes a widget. It is rendered as
a single small low-contrast line below the three real options rather than a
fourth full-sized button, which keeps the no-scroll height budget intact.

Accessibility: `aria-hidden="true"`, `tabindex="-1"`, excluded from keyboard
navigation entirely. A control that evades the cursor is an accessibility
failure if it is reachable by keyboard or announced by a screen reader. It is a
visual easter egg for pointer and touch users only.

Behaviour: desktop dodges on pointer approach, mobile puffs and vanishes on tap.
Under `prefers-reduced-motion` there is no dodge and no puff. Tapping it swaps
the line for a static punchline. The joke still exists, the motion does not.

### 3c. The legit-check path gets first position and the densest proof

Post-referral due diligence is the most common reason someone types an agency
domain directly, and it is the intent a normal agency site serves worst. It
takes first position in the option list and the heaviest concentration of the
Record, Proof and Founders material. This is a weighting, not a special case.

### 3d. Everything is statically rendered

All four routes are static. No server-side personalisation, no cookies, no
middleware reading the visitor. Personalisation is a client-side swap on top of
a static page. This is what makes decision 5 true by construction rather than by
discipline: there is no server code path that ever sees a name.

## 4. Route shape

| URL | What it is |
|---|---|
| `/` | The chooser. Zero scroll. Also the domain's canonical homepage. |
| `/track-record` | "Check you're legit". Proof, results, founders, how we work. |
| `/marketing-leadership` | "Do my marketing". The retainer, scoped execution, pricing. |
| `/speaking` | "Speak at my event". Stages, topics, what we bring. |
| `/ai-ladder` | Unchanged. Standalone lead magnet, linked from the marketing path. |
| `/privacy` | Unchanged. Live UK-GDPR policy. |

Slugs are provisional and cheap to change before launch.

The three option controls are real anchors (`<a href="/track-record">`)
progressively enhanced with JS. So they are crawlable, they work with JS
disabled, and they can be opened in a new tab. Link equity from the homepage
flows to all three paths.

SEO note: a zero-scroll chooser is a thin homepage, and `/` is the domain's most
authoritative URL. Accepted, because brand search for "test tube marketing" will
resolve regardless and the three paths carry the indexable content. `/` gets a
proper title, description and organisation structured data.

## 5. The chooser flow

Clicking an option does not navigate immediately. The chooser morphs in place
into the name step, then navigates. This matches the intent: the information is
collected as part of choosing, not as a gate on the next page.

1. Land. Logo, headline, three options, gag line. No scroll.
2. Click an option. The options recede, the name step takes their place.
3. First name, optional company, and an "I'd rather not say" control with the
   reassurance line under it.
4. Navigate to the path URL. The name is already in sessionStorage.

Anyone who never sees step 1, because they arrived on a path URL directly, gets
the complete page with the no-name jokes in place.

## 6. Component set

```
src/content/copy.ts        every user-facing string, one source, guard-checked
src/content/paths.ts       three path definitions: slug, meta, ordered sections,
                           per-section variant, CTA
src/components/sections/   Hero Proof Record Founders How RetainerYear
                           Pricing Speaking Cta  (server components)
src/components/chooser/    the landing screen and the name step (client)
src/personalisation/       usePersonalisation hook, <Name/> and <Company/>
                           swap components, the missing-name joke table
```

A path is data, not code. Adding or reordering a path is an edit to
`paths.ts`. A section renders differently per path through a `variant` prop that
selects framing copy from `copy.ts`, never through a forked component.

Personalisation slots render the joke fallback on the server and swap to the
name on hydration. The fallback is the default state, so there is no blank and
no layout jump on inline text.

## 7. No-scroll mechanics

- `100dvh` with a `vh` fallback. `min-height`, never `height`, and never
  `overflow: hidden`, so nothing is lost at 200% zoom.
- `interactive-widget=resizes-content` in the viewport meta, so the mobile
  keyboard reflows the name step instead of burying the field behind itself.
- Fluid `clamp()` type and spacing. The layout must survive roughly 300px of
  usable height on a landscape phone or a small laptop with toolbars showing.
- Verification matrix, screenshotted, before this is called done: 320x568,
  390x844, 844x390 landscape, 768x1024, 1280x800, 1440x900, 1920x1080, plus
  1280x800 at 200% zoom and the same set with the keyboard open on the name step.

## 8. What carries over, what dies

**Carries over**
- All 210 user-facing strings, verbatim, and `scripts/copy-guard.mjs` which
  enforces them. The guard gets re-baselined once the strings move to `copy.ts`.
- `/ai-ladder`, `/privacy`, `/api/subscribe` (Resend, keys unset, returns a
  clean 503). Untouched.
- Real brand assets in `/public/assets`.

**Dies**
- `src/app/field/`, `field-probe`, the particle engine, the morph, the dark
  sections. Archived to a dated branch first, not hard-deleted.
- `motion-v2.tsx`, `beaker-bg.tsx`, `beaker-scrub.tsx`, `hero-gradient.tsx`,
  `award-viewer.tsx`, `coffee-ticker.tsx` pending Fish's per-element calls.
- Dependencies that exist only for the discarded direction: `gsap`,
  `@gsap/react`, `lenis`, `three`, `@react-three/fiber`, `@react-three/drei`,
  `@shadergradient/react`, `@types/three`. Removing them is most of the page
  weight.

**Open cost**
`globals.css` is 1398 lines and dies with the visual restart, but `/ai-ladder`
and `/privacy` are styled by it. Those two are kept as-is, so the old sheet is
preserved as `legacy.css` and imported only by those two routes. The new system
is built clean with no inheritance from it.

**Not present**
Supabase is not in this build at all. Zero references anywhere in `src/`.

## 9. Build order

Visual direction comes before plumbing. The last session built verification
infrastructure before visible product and Fish had to ask three times to see
anything.

1. **Strip.** Archive the field branch, remove the discarded files, drop the
   dead dependencies, confirm the build is green.
2. **The chooser screen, designed.** Under the `web-design` skill: real
   references pulled and named, AI-tell lint on rendered screenshots, critics
   briefed with Fish's standards verbatim. The whole idea lives or dies on this
   one screen, so it gets a real render in front of Fish before anything else is
   built. Requires Fish's copy for the headline, the three labels and the gag.
3. **Content model.** Strings into `copy.ts`, paths into `paths.ts`, guard
   re-baselined.
4. **One path built end to end**, `/track-record`, to prove the component set
   and the personalisation swap. Reviewed before the other two.
5. **The remaining two paths.**
6. **Verification.** No-scroll matrix, gag accessibility, fragment deep link
   round trip, contrast measured from real rendered pixels, build green, copy
   guard exit 0.

## 10. Still needed from Fish

Copy only. Nothing here is blocked on anything else.

- The landing headline.
- The three option labels.
- The gag option wording, and which gag (money owed, or HMRC).
- The missing-name jokes, and the "I'd rather not say" reassurance line.
- The name step prompt.
