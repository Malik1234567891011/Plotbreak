# Plotbreak design system v3: "Ink"

Status: proposal for the user's approval, 2026-11-22. No SwiftUI changes yet.
Board: https://claude.ai/artifact/ToYYtSnfTLYqfxH1AnxbBf

## The idea in one line

Plotbreak is anime you play, so the app is printed like a manga volume. It uses
an ink-black page and paper-white type, and the art supplies all the color. Its
one loud voice is the anime **title card**: a heavy Mincho serif set big,
flush-left, beside very small text.

Everything else stays quiet on purpose. Remove the covers and the chrome still
reads as *Plotbreak* because of two things nobody else in the category does:
the Mincho title-card type, and the shape rule (square = the story, round = you).

## What we kept from the research, and what we refused

Kept (the research agrees, and it fits us):

- A near-black page with three surface steps, hairlines, and no shadows (C.AI, OOC, Swerve).
- White as the only action color (C.AI). Every other color comes from the art.
- Two type voices: a sans for the app and a serif for the story (Swerve, OOC).
- Prose in one column, not chat bubbles. Dialogue is white and narration gray (Swerve, Afizzy).
- Scene art full-screen behind smoked text panels (Afizzy).
- A featured cover over a blurred copy of itself (OOC).
- Titles painted into the cover art, so the UI never writes over a cover.
- Characters as rounded squares and the player as a circle (C.AI). We extend this into a full shape rule below.
- 20pt side margins.
- A dark tint per story, sampled from its cover (EMOCHI).

Refused, and why:

| Common move | Why not here |
|---|---|
| One brand accent (lime, violet, pink, yellow, blue) | Every competitor has one, and design v2's violet is what read as "AI". We have **no brand hue**. A story's own tint is its color. |
| Purple or pink gradients, glow, neon on black | The main "AI slop" signal in the study. |
| Inter, or SF everywhere | Inter is the generated-UI default. SF stays for controls, as Apple advises. The identity goes in the two serif voices. |
| Rounded everything (16–24pt on every card) | Covers and panels are print, so they get 3pt corners. Roundness is reserved for one meaning (see Shape). |
| Emoji and sparkle ✦ as UI markers | They say "AI feature", not "story". Icons are SF Symbols, regular weight. |
| Everything centered | Titles are flush-left like a title card. The only centered thing is a single number. |
| A countdown on every money surface | The paywall shows your own story waiting instead. |

## Color

Dark only. The HIG allows it for an app built around immersive media
(`dark-mode.md › Best practices`: "In rare cases, consider using only a dark
appearance"). The current app is dark only too.

| Token | Hex | Job | Contrast |
|---|---|---|---|
| `ink.0` | `#0F0E0D` | The page. Warm sumi black, not blue-black (v2) or neutral (OOC). | — |
| `ink.1` | `#181715` | Grouped rows, sheets, cards that need a body | — |
| `ink.2` | `#22201D` | Controls at rest: chips, search, idle composer, tags | — |
| `line` | `#2E2B27` | 1px hairlines between things on `ink.0`/`ink.1` | — |
| `line.strong` | `#45413B` | Selected outline, focused field | — |
| `paper` | `#F3EFE8` | Primary text, dialogue, **the action fill** | 16.8:1 on ink.0 |
| `paper.2` | `#B4ADA3` | Secondary text, **narration** | 8.7:1 on ink.0, 7.3 on ink.2 |
| `paper.3` | `#948E85` | Meta, counts, captions. Never on art. | 5.9:1 on ink.0, 5.0 on ink.2 |
| `danger` | `#FF453A` | iOS system red. Destructive actions and failures only. | 5.6:1 on ink.0 |

**Story tint.** Each story gets two colors, computed once from its cover. The rule:
take the saturation-weighted mean hue of the cover's mid-tone pixels, then fix
the lightness. `story.deep` is HSL(hue, 30%, 8.5%) and is used as the background
of the story page, the play panels, the end card and the paywall. `story.mid` is
HSL(hue, 34%, 20%) and is used for the blurred-backdrop wash and for selected
states on that story's screens. Text on `story.deep` keeps the paper tokens:
`paper` is 15.0–16.5:1 and `paper.2` is 7.7–8.5:1 across the catalog. Samples:

| Story | deep | mid |
|---|---|---|
| Hush House | `#1C100F` | `#442522` |
| Itachi | `#1C0F13` | `#44222B` |
| Zero Throne | `#0F161C` | `#223544` |
| Good Morning, Husband | `#1C130F` | `#442D22` |
| The Ninth Archive | `#0F101C` | `#222344` |
| Seven Days to Midnight | `#0F1C1B` | `#224442` |

Store `tint` on the story version at publish time (the same job that makes the
cover). A player-made story gets one automatically.

**Rules**

1. White (`paper`) fill with ink text marks the one thing to press next. There
   is at most one per screen.
2. Nothing in the chrome is colored. Money and "new" are marked by a glyph and
   by shape, not by a hue (see Credits mark, New tab).
3. Check results and state changes use a glyph and a word (✓ Success, ▲ Trust),
   never green and red. This also keeps them readable for color-blind players.

## Type

Three families, each with one job.

- **SF Pro** (system) for every control, label and number. It gets Dynamic Type,
  Bold Text and optical sizes for free. `typography.md › Using system fonts`.
- **Zen Old Mincho** (400, 500) for every line of story. An old-style Mincho:
  light novels are set in Mincho, and its Latin has a book texture no
  competitor uses. It is lighter on the page than a web serif, which suits
  hundreds of words a session.
- **Kaisei Tokumin** (800) for title cards only. A high-contrast headline
  Mincho ("tokumin" is a newspaper headline face): the anime title-card voice.

Both Mincho families set kanji natively, so the Tower's 塔 and a Japanese name sit
in the same type as the story. Bundle Latin + Latin-1 + kana + the kanji we use
(about 250 KB each), registered with `relativeTo:` text styles so they scale with
Dynamic Type (`typography.md › Using custom fonts`).

Rejected after a side-by-side sample: **Noto Serif JP**, because its Latin letters
are Source Serif, the font of the rejected design v2.

| Role | Family | Size / line | Weight | Dynamic Type base | Used for |
|---|---|---|---|---|---|
| `title.xxl` | Kaisei Tokumin | 52–56 / +4, tracking −1% | 800 | Large Title | Chapter, end card and welcome titles only (short titles) |
| `title.xl` | Kaisei Tokumin | 44 / 48, tracking −1% | 800 | Large Title | Title cards: chapter, end, onboarding headline, paywall headline |
| `title.l` | Kaisei Tokumin | 30 / 36 | 800 | Title 1 | One per screen: tab titles, story name, balance number |
| `title.m` | Kaisei Tokumin | 22 / 28 | 800 | Title 2 | Rank numerals, section titles on story pages, archetype names |
| `story` | Zen Old Mincho | 17 / 28 | 400 | Body | Every line of story. Dialogue `paper`, narration `paper.2` |
| `story.line` | Zen Old Mincho | 16 / 24 | 500 | Callout | Response cards, hooks under covers, quotes |
| `ui.section` | SF Pro | 20 / 25 | 600 | Title 3 | Section headings on Home, Library, Profile |
| `ui.headline` | SF Pro | 17 / 22 | 600 | Headline | Button labels, list titles, card titles |
| `ui.body` | SF Pro | 15 / 20 | 400 | Subhead | Descriptions, settings rows, the player's own line |
| `ui.label` | SF Pro | 13 / 18 | 500 | Footnote | Chips, cover titles in rails, tab labels |
| `ui.meta` | SF Pro | 12 / 16 | 400, tabular | Caption 1 | Counts, timestamps, "as Ren · Turn 14" |
| `ui.kicker` | SF Pro | 11 / 13, caps, +8% tracking | 600 | Caption 2 | Speaker names, eyebrow labels, tags |

Why 17pt story text when the competitors use 14–15: the HIG default body size is
17 (`typography.md › Ensuring legibility`), and players read hundreds of words a
session. The wider 28pt line height comes from book setting, not chat.

Rules:
- `title.*` never appears more than once per screen region, and never below 22.
- No italic in the UI. In story text, italic is used only where the writer marked it.
- Numbers that line up use tabular figures. The credit balance uses `title.l` digits.

## Spacing

A 4pt grid.

| Token | pt | Use |
|---|---|---|
| `gutter.ink` | 4 | Between panels in a panel composition: the manga gutter |
| `s.2` | 8 | Inside chips, cover → title |
| `s.3` | 12 | Between covers in a rail, between list rows' parts |
| `s.4` | 16 | Panel padding, between beats |
| `margin` | 20 | Screen edges, always |
| `s.6` | 24 | Title → content |
| `section` | 36 | Between Home sections |

## Shape: square is the story, round is you

This is the rule that makes the app read as designed. It tells players who is
speaking and what they can touch.

| Shape | Radius | What has it |
|---|---|---|
| **Print square** | 3pt | Everything the story owns: covers, story panels, scene frames, tags that describe |
| **Character square** | 24% of size (28pt face → 7pt) | Character faces and cast portraits |
| **Round** | full capsule / circle | Everything that is yours: your avatar (circle), your sent lines, the response cards you can say, the composer, and every button your thumb presses |
| Sheet | 20pt top corners | System sheets (kept native) |

Tags describe (square box, 1px `line`, 3pt). Chips filter or act (capsule).
OOC's split, made strict.

No drop shadows anywhere. Depth comes from the ink steps, hairlines, and the
glass on the floating layer.

## Surfaces and glass

- Content sits on `ink.0`.
- Glass (blur 24, 60% `ink.0`) is used only on the floating layer: the tab
  bar, the header islands over art, and the composer tray. It never goes on
  content (`liquid-glass.md`). Under Reduce Transparency, glass becomes solid
  `ink.1`.
- Story panels on art are `story.deep` at 84% with blur 20 and a 1px
  hairline at 8% paper. That is enough to stay at 7:1+ over the brightest
  scene art we have.

## Art rules

| Art | Shape | Where | Rule |
|---|---|---|---|
| Cover 2:3 | print square | Shelves, Home pages, story page, Library | Never cropped, never written over, no badge on the art except a rank tab or a NEW tab in the top-left corner |
| Scene / stage 3:2 | full-bleed | Play background, chapter cards | Cropped to fill, centered on the vanishing point; darkened 0–20% by tint depending on brightness |
| Portrait 2:3 on light paper | character square | Faces in play, cast row, World sheet | Faces are crops of the top 40%. The light paper ground is left as is, so faces read as cards on ink |
| Prologue / opening 2:3 | full-bleed | Onboarding, prologue, end card | Full art, title card over the bottom third |
| Pack icons 1:1 | none (cut out) | Credits store, first-purchase card, free-credit rows | **The one color exception**, like Character AI's candy beads. One PixAI set: moonstone crystals that read as ◆, then an indigo pouch, a black lacquer box and chest with red cord, and a red gift envelope for the first purchase. The picture grows with the price. Never used outside money surfaces. Files: `pack-icons/`. |
| Blurred cover backdrop | full-width wash | Home top, story page top | Blur 40, `story.mid` multiply, fades to `ink.0` over 220pt |

## Components

**Tab bar.** A floating glass capsule with 4 tabs (Discover, Library, Create,
Profile), each with an SF Symbol and a one-word label (`tab-bars.md › Best
practices`: "Include tab labels"). The active tab is a filled `paper` symbol and
label; inactive tabs are `paper.3`. No accent color. It is hidden in a story,
as today.

**Header islands.** Over art: 36pt glass circles (back, menu) and a glass
capsule with the story name and the cast faces stacked. On plain screens: no
bar. The screen title is `title.l` flush-left under the status bar.

**Buttons.**
- Primary: `paper` capsule, ink label `ui.headline`, 52pt tall. One per screen.
- Secondary: `ink.2` capsule, `paper` label, 1px `line`.
- Text: `paper.2` label with a trailing arrow ("Not now →"). This replaces a
  second capsule (Tolan's pattern).
- Circle: 52pt `paper` circle with an ink glyph. Used for "next" in onboarding
  and for continue (»).

**Credits mark.** ◆ (a filled diamond, the same as the Tower uses) in `paper`,
followed by tabular `ui.meta` numbers: "◆ 1,240". The amber glyph goes. The
balance in the header is a chip: an `ink.2` capsule. The cost before an action
is said once, in words: "◆60 a turn · about 20 turns left".

**New tab.** A `paper` square tab, 3pt, in the cover's top-left, ink
`ui.kicker` "NEW". Rank uses the same tab with the number.

**Cover in a rail.** 112×168, print square. Title `ui.label` `paper`, 2 lines,
8pt below. Meta `ui.meta` `paper.3` ("1.6M plays"). No card body.

**Panel page (Home featured).** Three full covers set as one manga page: a big
cover (232×348) plus two stacked (114×171), with a 4pt ink gutter. Under it are
the big story's kicker, hook in `story.line`, a primary "Play" and a text
"About this story →". Behind it is the big cover's blurred backdrop.

**Ranked list.** The rank numeral in `title.m`, a 64×96 cover, title, hook in
`story.line` `paper.2` (1 line), and "♥ 157K" in `ui.meta`. It pages
sideways three rows at a time.

**Continue card.** A 72×108 cover plus title, "as Ren · Turn 14", and **the last
line of the story** in `story.line` `paper.2` with the speaker's face. The
reason to come back is the line, not the title.

**Story panel (play).** Print square, `story.deep` 84%, padding 16. Narration
paragraphs in `story` `paper.2`. Dialogue: a 28pt character face in a 36pt
left column, the speaker in `ui.kicker` `paper.3`, then the line in `story`
`paper`.

**Your line (play).** A right-aligned capsule-cornered block (radius 20) in
glass, with `ui.body` `paper` and a 24pt circle avatar. Actions the player wrote
in `*asterisks*` show in `paper.2` without the asterisks.

**Response cards.** Round (radius 20) glass cards, full width. A 40pt pencil
cell sits on the left behind a hairline, then the line in `story.line` `paper`,
then a 28pt ↑ circle. The editable-suggestion pattern from OOC and Afizzy,
in our shapes.

**Composer.** A `paper` capsule (the one light object in the scene, Tolan's
"light input on dark"), 48pt, placeholder "What do you do?" in `paper.3`-on-light
(`#77716A`, 4.7:1 on paper). Inside on the right is a 36pt ink circle with a paper
↑. Outside on the left, when the field is empty, is a 48pt glass » circle that
continues the scene. Above it sits the turn-quality line in `ui.meta`: "Vivid · ◆60 a
turn · 20 left ›".

**Check and state changes** (only if the engine path returns; production `runTurnPure` has no checks or deltas today, so the Play mockups show none). Square tags under a beat: "✓ READ THE ROOM ·
SUCCESS", "▲ AYAME · TRUST", "▣ BRASS KEY". The glyph carries the meaning, not
the color.

**Title card.** The signature, used in exactly these places: the chapter card
(new arc), the end card, the onboarding headline, the paywall headline, and the
Tower lobby. Layout: a `ui.kicker` eyebrow, a 40pt hairline, then the title in
`title.xl` flush-left, then one `story.line` sentence. It always sits on art
or on `story.deep`, never in a box.

**List rows (Profile, Settings, Library).** 56pt, `ink.1` grouped with 12pt
radius (system grouped lists stay native), SF Symbol 20pt `paper.2`.

## Motion

One orchestrated moment: **the cut.** Title cards (chapter, end) arrive by a
hard cut, with no fade or slide, hold, and the text appears line by line at 80ms
steps. That is how an anime eyecatch works. Under Reduce Motion the whole card
appears at once.

Everything else uses system defaults: the new beat's panel grows as its text
streams in word by word, so every turn opens on the art for a moment (Afizzy).
There is no typing indicator; the » circle becomes a small spinner while the
story writes.

## Icons

SF Symbols, regular weight, `paper` or `paper.2`, 22pt in the tab bar and 20pt
in rows. Filled when active. No custom illustrated icons, emoji or sparkles.
The badge art and relic art stay, because they are content (the player
collects them).

## Writing

- The tagline is "Break the plot." The board replaces "The Playable Anime", which
  is OOC's App Store name (see design v2's copy audit).
- Buttons say what happens: "Play", "Continue story · $0.99", "Claim ◆300".
- Every ask has a reason line under it written as a promise (Tolan).

## Mapping from today's `Theme.swift`

| Today | v3 |
|---|---|
| `bgBase #0B0D12` | `ink.0 #0F0E0D` |
| `bgElevated #121620` | `ink.1 #181715` |
| `bgRaised #191E2A` | `ink.2 #22201D` |
| `text #F7F8FA` | `paper #F3EFE8` |
| `textSecondary #A7AFBE` | `paper.2 #B4ADA3` |
| `textMuted #707888` (4.4:1, fails) / `textDim #8A909C` | `paper.3 #948E85` (5.9:1) |
| `accent #7C6CFF` violet | removed; `paper` for actions, `story.mid` for per-story selection |
| `accentSecondary #FF6B9E` speaker pink | removed; speaker = `ui.kicker paper.3` + face |
| `warning #F6BE55` credit gold | removed; ◆ in `paper` |
| `success` / `danger` | glyphs; `danger` = system red for destructive only |
| New York serif (`.serif`) | Zen Old Mincho (story) + Kaisei Tokumin (title cards), subset |
| SF Mono for credits | SF Pro tabular figures |
| radii 10/12/14/20 | 3 (print), 24% (faces), capsule (yours), 20 (sheets) |
| page gutter 14 | `margin` 20 |

## The board, screen by screen

All 24 artboards use real art from `infra/seed/assets` and real story text from
`packages/test-fixtures`. Like and play counts are production numbers
(`story_signals`, 2026-11-22). Board source: `board/project/`.

| Screen | What changes from today |
|---|---|
| Home | Featured banner becomes a 3-cover manga page over a blurred copy of the lead cover. "Continue" shows the last line of your story, with the speaker's face. Ranked list uses big Mincho numerals and the story's one-line hook. Violet and amber gone. |
| Play: your turn | Scene art full screen. Beats sit in smoked panels of the story's tint. Narration gray, dialogue white with a rounded-square face. Your line is round, with your circle. Reply cards are round, editable (pencil) and say-able (↑). Light composer with a separate » continue. Turn quality and cost sit above it in one line. |
| Play: writing | The new beat opens on the art; a location kicker; text streams with a caret; » becomes a spinner, send becomes stop. No typing dots. |
| Chapter card | New. Replaces the violet "Arc" card with a full-screen title card (Kaisei Tokumin, vertical 第二章). |
| End card | New. Today no run ever ends. Ending title card with the real epilogue, cast faces, endings left, "Find another ending". |
| Story page | Cover beside four stat cells (likes, plays, endings, people) as one panel page; title in Mincho; premise in book type; endings list with found / hidden. |
| Who are you? | Archetypes as print cards with Mincho names; selection is a paper outline plus a check; reasons as a radio list; sticky "You enter as Ren" bar. |
| World sheet | Sheet over the scene. Example content (Ayame's rules, who is here, what you carry). What data production can supply here is a separate question. |
| Search | Field and filters are round; results are cover + hook rows. |
| First run | Welcome over drifting cover columns with a title card; steps reduced to 3 (name + birthday together); Tolan-style light inputs and a reason line under every ask; one circle "next" in the same place. |
| Prologue | Panels keep the art full screen; headline is a title card. |
| Library | Each run shows its last line; finished runs show the ending's name as a title. |
| Create / Pitch | One "Start from an idea" block replaces the white FAB; a draft with no cover gets a designed empty cover. |
| Profile | Balance in Mincho digits with "about N turns"; relics and badges as rows with their real art; grouped settings list. |
| Credits | Rebuilt as a game shop after `hands-on/credit-stores.md` (Character AI and Afizzy rank first): big crystal over your balance; a first-purchase card whose tag flips between FIRST PURCHASE and DOUBLE CREDITS (still under reduced motion); six pack tiles, three across, whose picture grows with the price, each with its own white price pill; the total with the base crossed out and the real bonus (+3% to +10%) where a pack has one; POPULAR and BEST VALUE only where the store already says so; turns under every amount; then Earn credits: daily log-in, quests (our badges, which already pay credits), Pass, Tower. The white pills break "one primary per screen" on purpose: in a shop every tile is its own buy. |
| Turn quality / Out of credits / Pass | No gold or violet. Every price says what it buys in turns at Vivid. The out-of-credits screen leads with your story's last line, not a countdown. |
| Tower | Same game, Ink skin: 塔 title card, streak as squares (no fire emoji), payout ladder drawn as a narrowing tower with the real tiers and arc names. |

Every screen on the board has a **Where it came from** card under it: the real
screenshots it borrowed from (hands-on phone captures, OOC captures, or App
Store frames) and three or four plain lines on what we took, what we changed and
why. The reference images are listed in `board/blobs.tsv` as `ref_*`.
