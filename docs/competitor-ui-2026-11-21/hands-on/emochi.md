# EMOCHI World hands-on, 2026-11-21

Real app on the user's iPhone, driven through iPhone Mirroring. Shots are 354x781,
1 image pixel = 1 point. Shot names are `emochi-NN-*.png`; kept shots are in `shots/`.

**Stopped on screen 1.** The first screen after a cold open asks for a name,
gender and age range. The study rules say to stop at any request for personal
data, so nothing past it was seen. Home, character page and chat remain the App
Store read in `../README.md` section 7.

## Screen map

| # | Screen | Shot | Notes |
|---|---|---|---|
| 1 | "Welcome! A quick intro to get you started..." | emochi-01-open | name, gender, age range on one form |

## First-run teardown

Cold open lands on a one-page profile form. No splash, no art, no character.

- **Title**: "Welcome! A **quick intro** to get you started..." ~22pt bold white,
  two lines, left-aligned, ~20pt margins. "quick intro" is in the brand yellow
  (~#F2E94E), the only color on the screen.
- **What's your name?** (~13pt semibold gray label). A text field, ~#1C1C1C fill,
  ~12pt radius, ~40pt tall, **prefilled with a random handle "79zjwj77py"** and a
  "10/40" counter right. So the name is effectively optional: the app makes one up.
- **What's your gender?** Three equal boxes in a row: Male / Female / Non-binary.
  ~#141414 fill, 1px ~#262626 border, ~10pt radius, ~36pt tall, 13pt white
  centered.
- **Select your age range**: four full-width rows of the same box style, ~36pt
  tall, ~8pt apart: Under 18 / 18 - 25 / 25 - 30 / Above 30. (The ranges overlap
  at 25.)
- **Continue**: full-width capsule pinned at the bottom, disabled state is
  ~#2A2A2A fill with ~#777 text. It stays disabled until gender and age are
  picked.

Three questions on one screen, all before any content. Gender is presumably used
to pick the default feed (the store frames show 👨 Male / 👩 Female filter pills)
and pronouns in chat; age range is the age gate.

## Design system read (from screen 1 only)

- Canvas near-black (~#0E0E0E), slightly lifted from pure black. Surfaces step
  up by one shade (~#141414 options, ~#1C1C1C input), with hairline borders on
  the options but not on the input.
- **Yellow is the single accent**, used here for two words of the title only.
  Matches the store read (logo mark and active tab).
- Type: system-like grotesk, bold title 22pt, semibold 13pt gray labels, regular
  13pt option text. Nothing of the wide extended wordmark face from the store.
- Radii: ~10-12pt boxes, full capsule on the primary button. Options are boxes,
  not pills.
- Spacing: ~20pt side margins, ~8pt between option rows, ~24pt between groups.

**Premium vs cheap, one line:** the yellow on two title words is the only thing
that lifts it; the hairline-bordered boxes are tidy but the form is stock.

## UI patterns to steal

1. **One accent color on two words of the title** (onboarding,
   emochi-01-intro-form). "Welcome! A **quick intro** to get you started..." at
   22pt bold white with the key phrase in the brand yellow. A cheap way to brand a
   plain screen without art or decoration. Plotbreak could do the same with its
   accent on one phrase of each onboarding or empty-state title.
2. **Boxes, not pills, for choices** (onboarding, emochi-01-intro-form). ~36pt
   tall options, ~#141414 fill, 1px ~#262626 hairline, ~10pt radius, 13pt
   centered text; three in a row for short choices, full-width rows for longer
   ones, ~8pt apart. Reads calmer and more "form" than capsule chips. If Plotbreak
   ever asks pronouns, one row of three boxes.
3. **Field with an inline counter** (profile, emochi-01-intro-form): a ~#1C1C1C
   field, 12pt radius, no border, gray "10/40" right-aligned inside.

## What is generic or weak

- **Gender and age before any content.** Same mistake as Swerve: the player
  meets a form before a character. For a 38% never-start leak, the lesson is to
  ask nothing up front, or ask inside the first story beat.
- Overlapping age ranges (18-25, 25-30) read as careless.
- A random string like "79zjwj77py" as the default name looks like a bug, not a
  gift. A generated anime-style name would make the same move feel designed.
- The form has no art, no brand mark and no preview of what the app does.

## Not reached

Everything past the intro form: Explore masonry, character page, chat with the
art-tinted panels and three type registers, Me tab, paywall. The App Store read
(`../README.md` section 7) stands unverified.
