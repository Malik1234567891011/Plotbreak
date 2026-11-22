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

## Second pass (logged in)

Second session, same phone. Shot names are `emochi2-NN-*.png`; `*z-*` are 2x
crops. Colors sampled from the captures. Appended as the pass went.

### Onboarding, one line per screen

| # | Screen | Shot |
|---|---|---|
| 1 | The intro form from pass 1. Name set to "Kai" (counter "3/40"), Non-binary, 18 - 25. **Selected = a 1px white outline on the same #0D0D0F box, no fill change**; Continue goes from #252527 fill / gray text to the same fill with white text | emochi2-02, 03 |
| 2 | "Unlock your **personalized** world" (yellow #FFFF55 on one word). ~40 theme chips (#1E1E20 capsules, 13pt #C7C6C7, ~30pt tall, ~8pt gaps). **Picked chips jump up into a "Selected" tray as outlined chips with an ×, and leave a dimmed outlined ghost in their slot**. A full-width **yellow (#FEFC53) "Play Now" capsule** with black 15pt semibold text is enabled from the start | emochi2-04, 05z-interests |
| 3 | Home with a coach mark: dark scrim, the filter icon ringed in yellow, **a hand-drawn yellow arrow** pointing to it, "Personalize your feed" 15pt bold + 13pt gray line | emochi2-06, 06z-coach |

Two screens and a coach mark, then the feed. No birthday, no notification ask
in this pass, no paywall in the flow.

### Home / Explore (emochi2-09, 09z-header, 09z-tabbar, 09z-card, 10, 11)

- Canvas **#0D0D0F** (a hair of blue in the black). Header: "EMOCHI World"
  wordmark (~20pt, rounded heavy caps for EMOCHI, a softer lowercase cut for
  "World"), a #1E1E20 "⊕ Create" capsule right. Collapses on scroll; the chip
  row sticks (emochi2-10).
- Chip row is **text tabs, not pills**: a filter glyph, "For You" white 15pt
  semibold when active, the rest #8A8A8A with a small emoji icon (Featured,
  Premium, Adventure...), and a ≡ at the end for the full list.
- **Two-column masonry, ~4pt gutter, ~4pt outer margin**, card heights vary with
  the art. Cards ~8pt radius. Art full-bleed; the bottom of each card is a
  **solid panel tinted from the art itself** (warm brown under a bedroom
  photo, gray under a gray photo, near-white under a white manga drawing)
  carrying "💬 525.6k" 11pt, name 17pt bold white, a 2-3 line 13pt description
  at ~70% white, and 11pt tag chips (a translucent lighter rectangle, ~4pt
  radius). The panel tint makes each card one object instead of art + label.
- Promo cards live in the grid ("AN ARCHITECTURE UPDATE FOR FLAGSHIP MODELS",
  "NEW MODEL Guava") as full illustrated tiles with dot pagers.
- **Tab bar is a floating Liquid Glass capsule**, ~60pt tall, ~12pt from the
  edges, 5 items with 10pt labels (Explore, Spotlight, Chats, Me, Search). The
  active item sits in a darker inner capsule with a **yellow (#DBDA50) filled
  icon and yellow label**; others are white outline icons. Art shows through.

### Chat (emochi2-08, 08z-panels, 12, 14z-composer, 18, 18z-para, 18z-actions, 19, 20, 22, 22z-reply)

- **The chat background is the character's art, full-bleed and sharp**, top to
  bottom. Everything else floats on it.
- Header: a 32pt translucent circle back, name 13pt semibold + a tiny "+" badge,
  creator handle 10pt under it, and a translucent capsule holding an image glyph
  and a speaker glyph on the right. No bar.
- "Everything said is generated by AI." 11pt at ~50% white centered on the art,
  then a **"Meet Naruto" card**: ~12pt radius, translucent panel tinted with the
  art (#45362B over the brown photo), the title in a muted orange (#B1764A),
  the premise 14pt white. Then a time chip "11:30 PM" (11pt on a dark 4pt-radius
  tag).
- **Character turns are one big dark translucent panel per message** (~#181612
  at ~85%, 16pt radius, ~16pt padding), left-aligned, ~85% width. Each
  paragraph starts with two tiny inline chips, **▶ (voice) and 🖼 (illustrate
  this line)**, 18pt capsules with 1px outlines. Text 14pt SF, white,
  ~1.45 line height. **Dialogue is bold white, narration regular white**;
  parenthetical asides are gray. 12pt gaps between paragraphs.
- Under the last turn: a dark capsule holding **» (continue), ↻ (regenerate),
  and a swap glyph** (emochi2-22z-reply).
- **The player turn is a right-aligned gray translucent bubble** (#787779 at
  ~85%), ~16pt radius, 14pt: the `*action*` in gray italic with asterisks
  stripped, speech in white.
- Thinking state: a 36pt translucent rounded-square tile with a sparkle glyph at
  the left where the reply will go (emochi2-20). ~10s to a reply; it arrived
  whole, no visible streaming.
- Composer: a ~90pt tall translucent dark panel (16pt radius) with "Reply ·
  Naruto" placeholder, then a row of chips: **persona chip (avatar + name),
  model chip ("Cocon..." with a yellow FREE flag), and a ≡ circle**. When
  focused the chips swap for a "*" circle (inserts an action) and a **yellow
  capsule send button with a black paper plane** (emochi2-19).
- **Model sheet** (emochi2-16, 16z-models): models are named after drinks
  (Coconut Water, Sparkling Water, Lime Soda, Ginger Beer, Hot Cocoa, Energy
  Drink...), each with a **small 3D jelly-blob mascot in the drink's color**,
  15pt semibold name and 11pt outlined trait tags ("High-Tension", "Stays in
  character"). The selected row is a #2A2A2C panel. An olive-yellow strip "20
  Free Chats with advanced models!" with a countdown capsule. "Done" in a dark
  capsule top-right, X circle top-left.

### Character page (emochi2-13, 13z-profile)

- Opens from the name in the chat header, as a **full-screen sheet with a
  down-chevron**. The top ~55% is the character art; it fades into **a dark
  tint sampled from the art** (#2E241F for the Naruto art) which becomes the
  page background. No neutral gray anywhere on it.
- Name 20pt bold + a pencil glyph, "44.5K Chats / 312 Collectors" as 15pt bold
  numbers over 11pt gray labels, a 40pt translucent circle bookmark-plus at the
  right. Sections "Intro", "Creator" (avatar, name, "34 Characters | 21
  Followers", a fanned stack of 3 creator thumbnails at the right), "Comments
  22" with a #443D31 tinted comment field. Section titles 15pt bold, body 13pt
  ~60% white, hairline dividers.

### Me tab and paywall (emochi2-23, 23z-mochi, 24, 24z-plans)

- Me: the **avatar art, blurred and dimmed, fills the header**; an 80pt
  circle avatar with a pencil badge, "Kai" 17pt bold, a 10pt gray ID, four stat
  columns. A "Sparks 0" capsule top-right with a 3D coin. "👑 GET MOCHI+"
  (yellow, heavy italic MOCHI) over two cards: Plus (dark) and **Pro (gold
  gradient #4E4732 to dark, yellow title)**. Then a Creations panel and an
  empty "No images yet" panel with a "Chat Now" capsule.
- Paywall: warm black to brown gradient (#130A00 at top), a **glossy 3D black
  crown with two eyes** over a huge debossed "MOCHI+" wordmark, **Plus / Pro
  folder tabs joined by an S-curve** (the active Pro tab is outlined in yellow,
  "Ultimate Experience" 11pt yellow under it), three plan cards (CAD 22.99 /
  59.99 / 229.99, per-day price in 11pt gray, selected card has a 2pt yellow
  border on a #231D05 fill), a dark capsule with a 1px yellow outline and
  yellow "Subscribe Pro" text, then a Pro-vs-Free benefits table whose **Pro
  column is a gold-tinted (#322E13) vertical band**.

### Upsell timing (emochi2-25, 25z-offer, 26, 27)

- Closing the paywall raises an **exit offer**: a centered #121212 card, ~20pt
  radius, a 3D black-and-gold price tag, "Limited Time Offer -30%" 17pt bold
  yellow, "As low as CAD 0.63/day", and an olive "Claim Offer" capsule with a
  47:59:11 countdown in tiny segmented digit boxes. Tapping the scrim (not the
  button) re-opened the paywall with struck-through prices and a "30% OFF
  Limited Time Offer ends in 47:59:58" strip. Nothing was bought. From then on
  the Me tab carries a "Limited Time Offer! 30% OFF | Ends in 47:59:50" banner.

### Chats and Spotlight (emochi2-28, 31, 32, 32z-rank)

- Chats: "Chats" 17pt bold + "Following" 17pt gray as text tabs, bell and search
  glyphs right. Rows: **40pt circle avatars**, 15pt semibold name, 13pt gray
  one-line preview, 11pt gray time, red unread dot. A yellow "Official" tag on
  the support bot.
- Spotlight: **a full-bleed hero carousel (~55% of the screen)** under the
  status bar, "Spotlight" 20pt bold over the art, then a centered 20pt bold
  title and 13pt subtitle on the bottom gradient, 4 page dots. "Featured
  Creators" as 92pt-wide cards (banner art + an overlapping 36pt circle avatar +
  name + followers). **Daily / Weekly / Monthly text tabs, active in yellow with
  a 2pt yellow underline**, then a ranked list paged sideways: 58x76pt (3:4)
  thumbnails at ~6pt radius with **rank numerals tinted gold (#F1EF4F), silver
  and bronze** in the top-left, 17pt bold title, 13pt gray two-line hook,
  "👤 20.1k  💬 12.3M" 12pt gray. "Full Ranking" capsule under it.
- Gems were never touched: Sparks stayed at 0, both messages ran on the free
  "Coconut Water" model.

## Design system read (second pass)

**Type**
- System grotesk (SF Pro) for everything inside the app, including story text.
  The wordmark and "MOCHI+" are custom: rounded heavy caps.
- Ladder: 22 bold (onboarding titles) · 20 bold (hero titles, character name) ·
  17 bold (card names, section titles, list titles) · 15 semibold (tabs, list
  names) · 14 regular (chat text, ~1.45 line height) · 13 regular (descriptions,
  previews) · 11 (counts, tags, meta) · 10 (tab labels, handles).
- Story text: 14pt SF, **dialogue bold white, narration regular white**, asides
  gray, player actions gray italic. Weight, not typeface, separates the
  registers.

**Color**
- Canvas **#0D0D0F**. Surfaces #19191B / #1E1E20 / #252527 (chips, panels,
  disabled button), hairlines ~#29292B.
- **One accent, yellow (#FEFC53 / #FFFF55)**: the onboarding keyword, Play
  Now, the active tab icon and label, the active ranking tab, the send button,
  FREE flags, "Pro" and every money label. Gold gradients (#4E4732 to dark) for
  the Pro card and the paywall's Pro column.
- **The second color source is the art itself**: card text panels, the
  "Meet" card, the character page background and the Me header are all tinted
  from the art behind them. Chat background = the art.
- Muted orange (#B1764A) once, for the "Meet X" card title.

**Spacing and shape**
- Home grid: ~4pt outer margin and ~4pt gutter (edge to edge, art-first).
  Everything else: ~20pt margins, ~12pt between list rows, ~24pt between
  sections.
- Radii: grid cards ~8 · chat panels and composer ~16 · sheets ~20 · ranking
  thumbnails ~6 · tag chips ~4 · chips, buttons and the tab bar are capsules.
- No borders on cards; 1px outlines only for selection state (white on forms,
  yellow on plans) and the inline ▶ / 🖼 chips. No drop shadows; translucency
  and blur do the layering.

**Art**
- Grid art at native aspect (masonry), mostly 2:3 to 3:4. Ranking thumbnails
  3:4. Avatars circles. Character page art fills the top ~55% and fades into
  its own tint. Chat art full-screen, uncropped, undimmed.
- Mascots: 3D jelly blobs for models, a glossy black 3D crown for MOCHI+, a 3D
  coin for Sparks, a 3D price tag for the offer. All one material family.

**Icons**
- SF Symbols-like outline glyphs, ~1.5pt stroke, 22pt in the tab bar, active
  = filled yellow. Small emoji icons in the category tabs.

**Nav, buttons, input**
- Floating Liquid Glass tab bar with labels; active item in a darker inner
  capsule.
- Category row = text tabs with emoji, not pills.
- Primary button yellow capsule with black text (Play Now, send); the paywall
  inverts it to yellow text on dark with a yellow hairline.
- Composer = a translucent card with the placeholder on top and a chip row
  under it (persona, model, menu), swapping to "*" + yellow send when focused.

**Messages**
- Character: one translucent dark panel per turn, left; per-paragraph ▶ and 🖼
  chips; a continue / regenerate / swap capsule under the last one. Player:
  right-aligned gray translucent bubble. All over the character art.

**Motion and loading**
- Coach mark with a hand-drawn arrow. Sparkle tile while thinking, then the
  whole reply appears at once (~10s, no streaming seen). Collapsing header,
  sticky category row, blur on the tab bar.

**Premium or cheap, one line:** the art-tinted surfaces and the 3D mascot
family feel made and owned; the yellow everywhere money is, the exit-offer
countdown and the per-paragraph chip clutter pull it back toward a
mobile-game store.

## UI patterns to steal (second pass)

1. **Tint every surface from its art** (home, story page, play screen;
   emochi2-09-home, emochi2-13-char-page). Card text panels, the "Meet" card and
   the character page background all take a dark color sampled from the cover.
   For Plotbreak: sample each story cover once, store a `tint`, and use it for
   that story's card body, story page background and play-screen panels. It
   kills the "gray cards on black" look.
2. **The story art is the play-screen background, sharp and full-bleed**
   (play screen; emochi2-12-chat-greeting, emochi2-30-chat-reply). Text sits on
   translucent dark panels over it. Plotbreak's scene images could live behind
   the beat instead of inline.
3. **Character page = art top half, fading into its own tint** (story page;
   emochi2-13-char-page). Down-chevron sheet, name + two big stats over the
   fade, sections below on the tinted dark. No card, no border.
4. **"Meet X" premise card as the first thing in the transcript** (play screen;
   emochi2-12-chat-greeting): an art-tinted card with a colored title and the
   one-line premise, above a time chip. Plotbreak could open each session with
   the story's hook card the same way.
5. **Selected chips move up into a tray and leave a ghost** (onboarding;
   emochi2-05z-interests). Clear state, no checkmarks, no color fills.
6. **Model picker as a mascot family** (play screen settings;
   emochi2-16-model-sheet). Each option has a small 3D blob in its own color and
   2-3 outlined trait tags. If Plotbreak ever exposes story modes or narrator
   styles, this beats a radio list.
7. **Ranked list with gold / silver / bronze numerals on 3:4 thumbnails,
   paged sideways** (home; emochi2-31-spotlight, 32z-rank). A denser, more
   editorial Top Ranked than a grid.
8. **Folder tabs joined by an S-curve for plan tiers** (paywall;
   emochi2-24-paywall). One drawn shape that makes two tiers look like one
   object.

## What looks generic or cheap (second pass)

- **Yellow on every money surface plus a 48-hour countdown** and an exit offer
  that fires when you close the paywall. Tapping outside the offer applied it.
  Reads as a mobile-game store.
- **Per-paragraph ▶ and 🖼 chips** start every paragraph of every reply. The
  story text never gets a clean left edge.
- Story text in the system UI face at 14pt with bold-for-dialogue: legible but
  reads as chat, not fiction. Swerve's serif is better here.
- Grid art is user uploads of every style, so the masonry looks like Pinterest;
  the art-tinted panels hide it better than Swerve's black gradients do.
- Promo tiles ("AN ARCHITECTURE UPDATE FOR FLAGSHIP MODELS") inside the content
  grid.
- The greeting inserted the account's full real name into the story text
  (emochi2-18) even though "Kai" was entered at onboarding; the persona chip
  later switched to "Kai". Not a visual issue, but it shows personal data on a
  story screen.

## Not reached (second pass)

- Search tab, the Create flow (off-limits), the ▶ voice and 🖼 image chips (the
  image one may cost Sparks; not tapped), the Plus tier view, the Lab settings.
