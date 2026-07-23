# TTM Website Rebuild — Build Brief

> **For the AI build assistant (Fable) working in this repo. Read this fully before touching code.**
> Internal working doc. Do NOT commit copy from here verbatim as public text, and never ship this file's framing labels. Owner: Fish (Nick Fisher). Written 2026-07-23.

---

## 0. Founders roster - RESOLVED (Fish, 2026-07-23)

**Both founders feature**: Adam Ashburn and Nick "Fish" Fisher. Grace, Gabriella, Wayne, Emma, and the dogs (Cooper, Thula) all come off the site. Voice is "we" (the two of them).

---

## 1. What this is

A repositioning + design upgrade of the live site at **www.testtubemarketing.com** (this repo; Next.js App Router; canonical is `www`; auto-deploys from GitHub `main` via Vercel). The current site works and looks good — it is the **floor**, not the ceiling. Do not ship anything that shows less polish or less proof than what's live now.

**This is NOT a reskin.** Fish wants the design genuinely pushed further than the last version. Treat it as a proper design pass (see §5), not a copy swap on the existing layout.

---

## 2. The positioning shift (the whole point)

TTM is moving **from** "marketing agency that produces deliverables" **to** **fractional marketing leadership**.

- **The retainer** = the relationship. TTM embeds (fractionally) inside the client's business, leads their marketing strategy, runs their quarterly and annual planning, is on-call over calls/WhatsApp, and holds them accountable. Fixed monthly.
- **The work** = scoped separately. When execution is needed (paid traffic, video shoots, page builds, emails, launches, custom builds), it's scoped, quoted, and invoiced as line items on top.
- **The goal:** long client retention while the volume of "deliverables" ebbs and flows month to month.

**Why (the strategic driver — this shapes the messaging):** the perceived value of deliverables themselves is falling — clients increasingly think "can't I just use AI to do that?" And tying "what I pay monthly" to "tangible things I got this month" gets messy across clients and months. Separating the relationship (retainer) from the execution (scoped) removes that tension.

Reference client for the new model: **Fabric** (retainer + scoped line items). Custom-build execution examples: **Tess** and **Jennifer**.

---

## 3. What flips vs what stays (mapped to the current site)

The current site sells the exact model being retired. Keep the brand and the proof; flip the spine.

**FLIP (retire this framing):**
- Hero "We build marketing machines and then operate them" → lead with strategic leadership; execution is scoped on top, not the headline promise.
- "The Apparatus — Six instruments. One laboratory. **We do all six in-house. That's why it works.**" → this "we run all the execution" grid is the old model. Reframe: TTM leads the strategy and orchestrates execution; deliverables are scoped when needed. Don't present a six-service menu as the core value.
- "Real UK team. Real payroll. No freelancers" (8-person roster) → founders only (see §0).

**KEEP (survives the pivot):**
- The **lab brand identity** — but evolved (see §5). The line already on the site — *"a fractional marketing department… we embed with you like an in-house team"* — is the thread that carries into the new positioning. Build on it.
- **The Findings archive** (real client results: Kirsty Darkins £130k+, Tess Cope 7 figures, Steve Keane 1,000 members, etc.) — strongest proof on the site. Keep, and it now doubles as evidence of the execution TTM scopes.
- The **£36.2m+ generated / 153+ campaigns** stat bar.
- The distinctive **voice** (dry, confident, specimen/experiment tags, mono type) — evolve, don't flatten.

---

## 4. The AI wedge (evidence-backed — use it, precisely)

Fish operates AI at a genuine power-user / orchestration tier, far beyond the typical business owner. Deep research (2026-07-23) pressure-tested "ahead of 98-99% on AI skill" and found it **defensible on depth, wrong on adoption**. Framing rule for any AI messaging on the site:

> **Lead with depth over adoption. Never say "business owners don't use AI."**
> The winning line: *the tool is everywhere now; what we do with it isn't.* Most businesses now use basic AI — almost none use it at the depth TTM does. That's the moat.

This reinforces the whole pivot: AI can produce the deliverable; it can't own the outcome, choose what's worth doing, or hold the strategy. That's what the retainer buys. Do NOT publish specific percentile numbers as fact (the 98-99% is defensible privately but rests on inference, not a clean published stat). Keep it qualitative and confident.

---

## 5. Design direction — evolve, don't reskin

Decision: **evolve the lab DNA.** Keep the colours, mono type, specimen/plate tags, the confident editorial feel. Soften the heavy "we run experiments for you" agency framing so it reads more **strategic advisor / fractional leader**, less **execution shop**. More grown-up, more senior.

Hard design rules (Fish's standards — non-negotiable):
- **Reference-first.** Load the `frontend-design` skill. Pull 2-3 real references (TTM's own live brand as the floor, plus a named bar for premium strategic-partner sites). State which reference the layout follows before building.
- **Mobile-first, first-person narrative, conversion-focused.** Never a static replica of a design asset. **Never generic card grids** (reads "AI made"). The existing apparatus/researcher grids are bespoke-themed — if grids stay, they must survive the AI-tell lint, not read as default cards.
- **AI-tell lint on rendered screenshots** (not code) before showing Fish: no benefit-card grids, no eyebrow micro-labels with glowing dots, no symmetric centred hero stacks with 3+ text levels, no dead/placeholder footer links, no substitute/fallback fonts, no code-drawn SVG brand marks, no "It's not X - it's Y" copy. Any hit gets fixed before presenting.
- Use the **real brand assets** already in `/public/assets` and the design system in `src/app/globals.css` as the floor. Real fonts, real colours, real photos.
- Run the `web-design-guidelines` and `self-audit` skills before presenting. Brief any critic sub-agent with Fish's written standards verbatim + the AI-tell list + the "wow vs a stock GHL template" bar. A PASS from an unbriefed critic is invalid.
- Any figurative/editorial illustration → hand Fish an image-gen prompt (Higgsfield/ChatGPT), never hand-drawn SVG in code.

---

## 6. Copy approach (Fish's call, decided here)

Fish's copy is verbatim and his voice is the final voice. But so he has something real to react to:

- **Fable drafts skeleton first-person copy** from the positioning above as scaffolding — hero, section intros, CTAs. Mark every headline and body block clearly as **[DRAFT — Fish to rewrite]**. Do not present draft copy as finished.
- **Preserve existing live lines that still fit** the new positioning verbatim (e.g. the "fractional marketing department / embed with you" thread, the findings results, the stat bar).
- The narrative spine (hero promise, the "what the retainer actually is" section, the AI wedge in Fish's words) is **his to write** — leave clean, obvious slots.

**Copy blocklist — scan source, not just rendered text, and fix before showing Fish:**
- No em or en dashes in any form, including HTML entities (`&mdash;` `&ndash;` `&#8212;` `&#8211;`). Standard hyphens only. (Note: the current site uses `&mdash;` in a couple of places — do not carry those over.)
- No "quietly". No "It's not X - it's Y" / "isn't X, it's Y" constructions.
- No uncontracted "it is / we are / you are" where a contraction is natural.
- "honest/honestly" as a framing crutch → flag for Fish, don't auto-fix.

---

## 7. Structure (proposed — adjust with Fish)

1. **Hero** — strategic leadership promise (not "we build machines"). CTA → `https://book.testtubemarketing.com`.
2. **The shift / what we actually are** — fractional marketing leadership: we sit inside your business and lead. The retainer = relationship.
3. **The AI wedge** — depth over adoption (§4). Why judgement beats output now.
4. **How it works** — retainer (strategy, planning, accountability, access) + scoped execution on top. Make the two visibly separate — this is the core idea.
5. **Findings / proof** — keep the archive; real results. Fabric as the model relationship; Tess/Jennifer as custom-build proof.
6. **Founders** — founders only (§0). Senior, hands-on, in every account.
7. **Final CTA** — book a call. Keep the "no pitch, no pressure" tone.
8. **Footer** — keep as-is; `/privacy` link already fixed and live; "Contact Us" still a placeholder `#` (fix or point somewhere).

---

## 8. Hard constraints / do-not

- **Do not push to `main`** or deploy to production. This repo auto-deploys `main` to the live site. Work on a **branch + Vercel preview**; Fish approves before anything goes live.
- Keep the live `/privacy` page (standard UK-GDPR policy, working) and the `www` canonical.
- Do not republish any team member who has left (see §0).
- Do not invent client numbers or testimonials — use only what's already evidenced on the live site or what Fish supplies.
- Do not ship internal labels or this brief's framing in public copy.

---

## 9. Open decisions for Fish
- **[BLOCKER] Founders roster** — both founders or Fish only? (§0)
- Does the lab metaphor's naming ("laboratory", "experiments", "specimens") stay in the headline copy, or move to accent/background only now that positioning is advisory? (Evolve direction chosen; degree TBD with Fish.)
- Show retainer pricing on the site, or keep it a conversation? (Not yet decided.)
- "Contact Us" footer link destination.

---

*Context sources behind this brief: project memory notes `ttm-website-repositioning` and `ai-skill-lead-research`; the live homepage (`src/app/page.tsx`); Fish's global rules and operating rules.*
