# Swerve hands-on, 2026-11-21

Real app on the user's iPhone, driven through iPhone Mirroring. Shots are 354x781,
1 image pixel = 1 point. Shot names are `swerve-NN-*.png`; kept shots are in `shots/`.

**Stopped on screen 1.** The very first screen after a cold open is a birthday
picker. The study rules say to stop at any request for personal data, so nothing
past it was seen. Everything about Home, the character page and chat is still
only the App Store read in `../README.md` section 8.

## Screen map

| # | Screen | Shot | Notes |
|---|---|---|---|
| 1 | "When's your birthday?" | swerve-01-open | first and only screen reached |

## First-run teardown

Cold open from Spotlight lands directly on the birthday question. No splash, no
logo, no value pitch, no art, no "why we ask". One screen, one question, one
button.

- Title "When's your birthday?" ~22pt bold white, left-aligned at the top under
  the status bar, ~20pt side margin.
- The rest of the screen is pure black (#000) with the stock iOS wheel date
  picker centered at ~55% height (month / day / year columns, selection band a
  ~#1C1C1E rounded capsule). **Preset to January 1, 2000**, so a user who just
  taps Continue tells the app they are 26.
- A full-width white capsule "Continue" (~50pt tall, black ~15pt semibold text)
  pinned ~40pt above the home indicator. It is enabled from the start.

This is an age gate, almost certainly for App Store 17+ / companion-content
compliance. It comes before the user has seen a single character.

## Design system read (from screen 1 only)

- Canvas true black. White is the action color (the Continue capsule), same
  rule as Character.AI.
- Type: SF-like system grotesk at this point, not the rounder brand face seen in
  the store screenshots. Bold title, nothing else.
- Radii: the button is a full capsule; the picker band is a capsule.
- No brand mark at all on the first screen.

**Premium vs cheap, one line:** neither; it is a stock iOS form with no brand,
which reads as a utility screen, not the door to a story app.

## UI patterns to steal

1. **Left-aligned 22pt bold title at the top, one control in the middle, one
   white capsule at the bottom** (onboarding, swerve-01-birthday). The
   three-zone layout (title / control / button) with nothing else on a black
   canvas is a clean frame for any single-question onboarding screen. If Plotbreak
   ever needs an age gate, a preset native wheel in this frame costs one tap and no
   keyboard.

## What is generic or weak

- **Personal data before any content.** A new user is asked for a birthday
  before they know what the app is. For Plotbreak's 38% never-start leak, this is
  the pattern to avoid: Character.AI gets to home in two screens with no data.
- No brand, no art, no reason given. The screen could belong to any app.
- The preset date (2000-01-01) makes the gate trivially skippable, so it mostly
  adds friction rather than protection.

## Not reached

Everything past the birthday screen: Home, character page, chat, store, paywall.
The App Store read (`../README.md` section 8) stands unverified: a
Character.AI-style chip + 2-column grid, iMessage-style chat with gray narration
and white dialogue inside the character bubble, periwinkle player bubbles, a
">>" inside the composer pill.
