# TTM visual direction: the darkroom

> Internal working doc. Written 2026-07-31. Companion to `ROUTER-BRIEF.md`
> (architecture). This file is the visual language only. Not public copy.

## Reference

**Bar: Moxie** (Fish's pick, 2026-07-31, from the four strategic-partner
candidates in his own Refero set). Register: editorial darkroom. Black canvas,
warm cream text and hairlines, one accent used surgically on italic emphasis and
the sole filled CTA, light-weight serif display over a sans carrying all
functional UI, generous space, no shadows, no gradients, no chrome.

**Secondary references pulled:** Outsource Consultants (hierarchy by size alone
across one family, mono micro-labels under 14px as annotation) and Worth Agency
(no buttons anywhere: the type is the interface). Both from the same 22-file set.

The layout follows Moxie for register and Worth Agency for the chooser's
interaction model. It is not a replica of either: Moxie's typefaces, its
periwinkle, and its work-grid are all left behind.

**Gap declared:** none of the 22 references is a zero-scroll decision screen.
They are all scrolling marketing sites. The chooser's layout has no direct
precedent in the set, which is stated here rather than papered over.

## Pass 1: the draft token system

- Canvas black, text warm cream, accent fushia #FF0D64 (Fish's decision: the
  accent survives the restart for brand continuity).
- Light-weight serif display, neutral grotesque for UI.
- Hairlines, no shadows, generous space.

## Pass 2: what was wrong with it, and what changed

Pass 1 is Moxie with the colour swapped. Worse, the skill's own calibration
warning names "near-black with a single acid or vermilion accent" as one of the
three looks AI-generated design currently clusters around. Fushia on flat black
lands inside that cluster. Three changes:

**1. The canvas is not black.** Fish's taste profile is explicit that dark
surfaces are warm, tinted near-blacks, never flat #000, and that neon dark-mode
is on the ABSENT list. So the canvas takes a faint red bias: **#141010**. Not
decorative. A darkroom is not black, it is dark under a safelight, and the
safelight is the reason the room has a colour at all.

That is the organising idea. TTM is a lab. Moxie's own metaphor for its register
is a darkroom. A darkroom is a working room in a lab where things are developed
in the dark before anyone is allowed to see them. The fushia is the safelight:
it is why the walls are faintly warm, it is the only saturated thing in the
room, and it is what you work by. The whole palette derives from one physical
idea rather than from a swatch picker.

**2. Hierarchy comes from size, never weight.** Taken from Outsource. One
display face runs from micro to enormous, and nothing on the site is set above
500. This is the single strongest pattern across all 22 of Fish's picks and it
is what separates "senior practice" from "startup landing page".

**3. The chooser has no buttons.** See the signature below.

## Tokens

### Colour: six values, one accent

| Token | Value | Role |
|---|---|---|
| `--dark` | `#141010` | Canvas. Warm-biased near-black, the room under the safelight. Never #000. |
| `--dark-lift` | `#1C1615` | One-step surface shift for the name step and any raised plane. Structure comes from this and hairlines, never shadows. |
| `--cream` | `#F2EDE4` | Primary text, hairlines, borders. Warm off-white so the page reads as paper, not screen. |
| `--cream-mute` | `#8A817A` | Secondary text, captions, micro-labels. Warm-tinted, never a cool gray. |
| `--fushia` | `#FF0D64` | The safelight. Sole accent. Selected state, the one filled CTA, italic emphasis, the seam rules. Never decorative, never a wash, never a gradient. |
| `--fushia-deep` | `#8C0637` | Derived tone for the accent's own hairlines and pressed states. Accessibility-driven, does not count as a second accent. |

Gradients are permitted only as blurred atmosphere and are not used in this
build. No shadows anywhere.

### Type: two faces, one of them already licensed

- **Display: a light-weight editorial serif, 300 to 400, never above 400.**
  Recommendation is **Newsreader** (SIL Open Font License, variable, genuine
  editorial cut, real italic, light weights that hold at large sizes). It is
  deliberately not Instrument Serif, which is currently everywhere in
  AI-generated design. Fish has an Envato Elements subscription, so a licensed
  premium serif is available instead if he prefers; this is a decision, flagged
  below.
- **UI and body: Einer Grotesk**, already licensed by Fish through Envato,
  already self-hosted in `src/fonts/`, and already his own pick. Blank sheet
  applies to choices that failed, and this one did not. Regular carries body,
  Bold is available for the rare label that needs it.
- **Micro-labels**: Einer Grotesk uppercase, tracked out, 10 to 13px, used as
  annotation only. Never as an eyebrow floating above a hero headline, which is
  the banned pattern.

Scale is aggressive and calm: display 48px to 140px with tracking -0.02 to
-0.04em and line-height 0.95 to 1.1, against body at 16 to 18px. The size ratio
is the hierarchy. Weight does nothing.

### Shape

Two radius tiers only: 999px for the single filled CTA, 0px everywhere else.
Structure is 1px cream hairlines at low opacity and one-step surface shifts.

## The signature: the chooser has no buttons

The landing screen is four sentences in the visitor's own voice, set in the
display serif at the largest size the viewport allows, stacked as a list. They
are the largest type on the page and they are the interface. There is no card,
no button chrome, no icon, no grid.

Pointing at a line inks it: cream to fushia, and a fushia hairline rules under
it, like a line struck in a margin. Selecting it is the only motion on the
screen worth having.

Why this and not buttons: the page's whole argument is that most sites are
generic and this one is built around the visitor. A row of buttons is what every
site does. Four sentences a person can recognise as their own reason for being
there is the argument made in the layout rather than stated in the copy. It also
solves the zero-scroll constraint, because type reflows and scales where button
grids do not, and it is what Worth Agency does in Fish's own reference set.

The gag sits under the three real lines as a fifth element at micro-label scale
in `--cream-mute`, visually cheap so it does not compete, close enough to read
as part of the list. It dodges on desktop, puffs on mobile, does neither under
reduced motion, and is out of the tab order entirely.

**The risk, stated:** with no button affordance, some visitors may not
immediately read the sentences as clickable. Mitigations are the cursor change,
the ink-in on hover, a fushia hairline that draws on approach, and a mono
micro-label above the list that tells them to pick one. If the first render does
not obviously read as pick-one, the fallback is a hairline-ruled row per option,
which keeps the type-as-interface idea and adds a visible edge.

## The quality floor, unannounced

Responsive to 320px. Visible keyboard focus in fushia on every real control.
Reduced motion respected everywhere including the gag. Contrast measured from
real rendered pixels, not derived: cream on the dark canvas is the body case and
must clear 4.5:1, fushia on dark must clear 3:1 wherever it carries meaning
rather than decoration.

## Open decisions for Fish

1. **The display serif.** Newsreader (free, immediate) or a premium Envato face
   he picks. Everything else can proceed either way; this is a swap of one
   `next/font` declaration.
2. Whether Einer Grotesk stays as the body face, given "blank sheet" was the
   instruction and Einer was his own earlier pick.
