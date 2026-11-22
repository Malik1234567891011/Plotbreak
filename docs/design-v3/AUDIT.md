# Design v3 audit

2026-11-22. All 24 board screens were rendered side by side (headless Chromium
at 2x, real art) and every style value was checked against `DESIGN-SYSTEM.md`
by script. This is the audit Omar asked for before any more redesign: "see if
they all match or not following one design principle, wanna avoid all the slop."

## Verdict

The screens follow the token sheet: colors, sizes and spacing are mostly in
range. They do **not** follow one design principle. Every screen spends its
boldness on something different, such as a big serif title, a stat tile, a
boxed card or a kicker with a rule under it, so nothing reads as the loud
thing. That makes the board read as generated.

The look also matches a known template. The `apple-design` craft lens names
"near-black with cream type and a high-contrast serif" as one of the three
looks generated UIs default to. Design v3 is that look. The Mincho voice was
meant to be the identity, but it is used on page titles, list hooks, form
descriptions and money screens, so it reads as decoration rather than as "the
story is speaking".

Character AI, Omar's reference, does the opposite: one sans for all chrome, no
serif anywhere, no card bodies, and the art supplies all the color and all the
loudness.

## The AI-slop tells, and where they are

| Tell | Screens | Count |
|---|---|---|
| **Big number over a small label** (stat tiles) | Story (86K LIKES, 1.6M PLAYS, 5 ENDINGS, 5 PEOPLE as four boxed tiles), Profile ("YOUR CREDITS" over 1,240), Credits (centered 1,240 under the crystal) | 3 |
| **Kicker + 40pt hairline + serif title** (the title-card formula reused as a page header) | Welcome, Prologue, Pass, Tower, End card, Chapter card, plus the kicker alone on Main (FEATURED), Story (ORIGINAL · HORROR · MYSTERY · ROMANCE), Who are you? (HUSH HOUSE), Paywall (HUSH HOUSE · TURN 4), World sheet, Library (HUSH HOUSE · ENDING), Create (NEW STORY), Showcase (LAST FEATHER) | 14 |
| **Serif used for UI text**, not story text | Discover, Library, Create, Pitch, Who are you?, Onboarding ×3, Paywall, Pass, Tower titles; list hooks on Main, Search, Library; descriptions on Create, Pitch, Who are you?, Pass, Tower | 17 |
| **Gradient washes** | Main, Story, Prologue, Play, Writing, Chapter card, End card, Welcome, Showcase, Pass, Paywall, Credits tiles (11 of them only scrim text over art, which is fine; the Credits tiles and the Pass collage fade are decoration) | 12 |
| **Everything in a box** | Create ("Start from an idea" card), Who are you? (4 outlined archetype cards), Pitch (outlined textarea), Paywall (offer card inside the page), Credits (every tile, every quest, the log-in row) | 5 |
| **Centered stacks** | Credits hero, Tower ladder, Prologue "Swipe up", Chapter card "Tap to keep reading" | 4 |
| **Decorative numbering and glyphs** | Tower 塔 at 96pt beside its own title; Chapter card vertical 第二章; World sheet serif 1/2/3 on a three-item list | 3 |
| **"→" text links** | About this story →, Choose who you are →, See all stories →, Change →, Empty story →, Share →, Write your own →, Skip →, Practice → | 9 screens |

## Where screens do the same job differently

| Job | Variants on the board |
|---|---|
| **Currency mark** | ◆ text glyph on 12 screens (Main ×3, Play, Writing, Quality ×5, Welcome, Showcase, Profile, Pass ×3, Paywall ×4, Tower ×9); a crystal picture on Credits. Six different pack pictures (crystal, two crystals, a heap with a different cut, pouch, lacquer box, chest). |
| **Page title** | Kaisei serif 30 (Discover, Library, Create, Who are you?, Paywall), Kaisei 40 (Prologue, Pass; off the type ladder), Kaisei 44 (Tower), Kaisei 52 (End card, Chapter card), SF in a search field (Search), none (Story). |
| **Containers** | Three styles side by side: outlined box with a 1px line (Create, Pitch, Who are you?, Paywall), filled `ink.1` block (Profile rows, Credits tiles, World sheet), and bare rows with hairlines (Quality, Story endings, Pass, Paywall footer). |
| **Primary button** | Full-width 52pt capsule (Who are you?, Pitch, Pass, Paywall, Welcome), a short capsule beside a text link (Main, Story, Showcase, End card, Tower), a small 44pt capsule (Profile "Add credits", Create "Start a story"), a 52pt circle (Onboarding), and six white price pills on Credits. |
| **Stats** | Boxed tiles (Story), a big number with a kicker (Profile), inline meta "♥ 157K · 2.9M plays" (Main, Search). |
| **Segmented choice** | A custom pill track (Pitch length, Taste audience), filter chips (Main, Search, Library), a radio list (Pitch "Who do you play?", Who are you? reasons, Quality). |
| **Your avatar** | Circle "R" (Profile, Play), a rounded square "K" at 10pt radius (Tower: breaks the round-is-you rule), a 24pt circle in Play. |
| **Corner radius** | 21 different values in use: 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17–19, 20, 22, 24, 26, 28, 32. The 3pt "print square" next to capsules makes every screen look like two systems at once. |

## Off the type ladder (script check)

Prologue Kaisei 40 and Mincho 18; Pass Kaisei 40; Tower Kaisei 96, 18 and 15
and SF 10 (the "BEST 12" tag, below the 11pt minimum); Create Kaisei 12 (the
empty cover); Library Mincho 15; Profile SF 26; Credits Kaisei 26; SF 16 on
Main, Play and Writing. Off-palette colors: `#1C0F15` and `#442231` (Prologue,
Showcase), a tint that is not in the story-tint table.

## Home and Story page, specifically

**Home (Discover).** It stacks six modules, and each has its own style: a serif
title, a chip row, a three-cover collage in which the cover titles fight each
other, a kicker with a serif hook paragraph, a Continue row with a serif quote,
a ranked list with big serif numerals and serif hooks, a cover rail and a boxed
free-credits card. Nothing leads. Character AI's home has one module that
repeats (art, name, one line, a count), in one sans.

**Story page.** The four big stat squares on the right are the clearest slop
tell on the board (Omar: "huge squares, rly weird looking"). They also squeeze
the cover into a crop. Character AI and OOC put stats in one quiet line under
the title.

## The principle to rebuild on

**The art is the only loud thing.** Everything else is plain, and it is plain
in the same way on every screen.

1. **One UI typeface: SF Pro.** Titles are SF bold. Serif appears only for
   words the story itself wrote (play beats, the prologue, the last line on a
   Continue row, chapter and ending title cards). No serif page titles, hooks or
   descriptions.
2. **No boxes by default.** Art and text sit on the page. Only grouped
   settings rows and sheets get a filled body (`ink.1`, 12pt). No outlined
   boxes.
3. **One radius per kind:** art 8; character faces 24% (squircle); you = circle;
   anything you press = capsule; sheets 20 at the top. The 3pt print square goes.
4. **Numbers stay inline** as quiet meta ("♥ 86K · 1.6M plays · 5 endings"),
   never as a big number over a label.
5. **One currency mark:** the crystal picture, at text size inline and piled up
   on pack tiles. No ◆ glyph anywhere.
6. **One primary per screen:** a white capsule (the shop's price pills are the
   one exception). Secondary actions are plain text with no arrow; "See all" is
   the only trailing link.
7. **Gradients only as a scrim** for text over art. No kickers with rules, no
   centered stacks, no decorative numerals.

Home is rebuilt on these rules first (board row 1). If Omar approves it, the
other 23 screens follow, Story page next, and `DESIGN-SYSTEM.md` is rewritten
to match.

## What is already right and stays

- The palette: warm ink black, paper white as the only action color, no brand
  hue. It matches Character AI's strictness.
- Real art everywhere, with titles painted into the covers.
- Characters as rounded squares and you as a circle.
- The play screen's structure: art full screen, smoked story panels, editable
  reply cards, the light composer with », and turn cost said once in words.
- The chapter and ending title cards are the right place for the display serif.

## Sweep to the new rule (board v36)

Rebuilt by hand:

- **Turn quality:** OOC-style picker. One row per tier: an icon, the name, one
  line, and the cost in crystals with the turns left. The two picture tiers
  show a real scene as their icon instead of a PICTURES tag. The picked row is
  filled in, with no radio circles.
- **Out of credits:** a store pack (the Credits three-crystal art, corner tag,
  crossed-out 700) and one white buy button. Free credits and the Tower are now
  two quiet links.

Swept (sans titles, no kickers or rules, no outlined boxes, no text arrows,
8pt art corners, filled tags):

- Search, World sheet, Library, Create, Pitch, Profile, Pass, Welcome
  (wordmark kept), Onboarding ×3 (the Showcase's off-palette tint is gone),
  End card (arrow only).
- Credits: flat tiles, the balance as a row instead of a centered stack, filled
  quest slots, no gradients.
- Tower: the 96pt 塔 is gone, the avatar is a circle, the 10pt tag is now 11pt.
- Play and Writing: corner radius only.

Left alone on purpose: Prologue, Chapter card and End card keep their title
cards, because they sit inside the story. The System board still shows the old
token sheet; it is rewritten with `DESIGN-SYSTEM.md` once Home is approved.
