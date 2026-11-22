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

## Second pass (logged in)

Second session, same phone. Shot names are `swerve2-NN-*.png`; `*z-*` are 2x
crops. Colors sampled from the captures. Working notes, appended as the pass
went.

### Onboarding, one line per screen

| # | Screen | Shot |
|---|---|---|
| 1 | "When's your birthday?" wheel, set to 27 Jan 2006, Continue | swerve2-01-open |
| 2 | "What should characters call you?" + 13pt gray subline "You can use any name, and change it later." A bare text field (no box, no underline), 17pt, gray "Your name" placeholder at ~55% height. Continue is a ~#5A5A5A gray capsule until text is entered, then white | swerve2-02, 03 |
| 3 | "How should characters refer to you?" Female / Male / Other as full-width rows (~46pt, ~#0F0F0F fill, 1px ~#1E1E1E hairline, ~12pt radius, 15pt gray left-aligned label). **"Prefer not to say" is a 12pt gray text link under Continue** | swerve2-04 |
| 4 | "Where did you first hear about Swerve?" 8 rows, same row style, "Skip" text link under Continue | swerve2-05 |
| 5 | Custom notification pre-prompt: a 40pt white bell glyph, "Turn on notifications?" 22pt bold, 13pt gray reason, then white "Yes, notify me" capsule over an outlined (1px ~#333) "Not now" capsule. Declined | swerve2-06 |
| 6 | **Lands directly inside a chat** with the #1 character (Blake Colton), greeting already on screen, keyboard ready. No home, no picker, no tutorial | swerve2-07 |

Every onboarding screen is the same frame: true black, 22pt bold white title
top-left at ~y120, the control at mid-height, white capsule pinned at the
bottom, skip as small gray text under it. Five screens, zero art.

### Chat screen first look (swerve2-07, 07z-text, 07z-composer)

- **The story text is a serif.** Narration in a gray (~#AAAAAA) serif
  *italic*, dialogue in white serif roman, ~15pt, ~1.4 line height. Looks like
  a book face (Literata / Source Serif family). The chrome around it (header,
  "By @x_felix_2" chip, composer) is a sans. So: sans for the app, serif for
  the story.
- **No bubbles for the character.** The greeting is free text on the black
  canvas, indented ~45pt, with a 24pt circle avatar at its top-left. Paragraph
  breaks are ~16pt blank lines.
- Header: 36pt translucent circle back button (#202020) left, the name in a
  #242425 capsule (15pt semibold white) centered, a 36pt circle avatar right.
  Under it a small "By @x_felix_2" capsule (#191919, 11pt gray + white handle).
- Composer: a ~40pt #262626 capsule, "Message" placeholder 15pt gray, a white
  **">>" fast-forward glyph** inside on the right instead of an arrow. Under it
  "This is AI, not a human." 11pt gray centered.

### Home (swerve2-08, 08z-header, 08z-card, 09)

- Canvas #000. Header row: ghost mascot + "swerve" lowercase wordmark (~20pt
  heavy, rounded grotesk), a **gold gradient "Get Pro" pill** (#F2C94C-ish to
  amber, black 11pt bold text, ~6pt radius) beside it, a search glyph right.
- Chip row: capsules ~32pt tall, emoji + 14pt medium label. Selected = white
  fill + black text; others #222224 fill + white. "Mafia" with a magnifier is a
  saved search as a chip. On scroll the wordmark row collapses and the chips
  stick (swerve2-09).
- **Two-column cards, ~154 x 216pt (~5:7), 12pt radius, 1px hairline border
  (~#1E1F28)** around the photo. Full-bleed photo, bottom gradient to black,
  name 15pt bold white, tagline 12pt gray inside the card bottom-left. A
  speech-bubble glyph + "18M" chat count top-left on the art, 11pt white on a
  faint dark scrim. The creator handle sits **outside** the card, under it, 11pt
  gray (some handles render in pink or blue: presumably paid or featured
  creators).
- ~14pt side margins, ~12pt gutter, ~32pt between rows (handle line included).
- Tab bar: 5 outline glyphs (home filled when active), plain black, no labels,
  no top hairline: Home, Chats bubble, a "+" in a circle (create), a
  storefront/gem shop with a red dot, a person.

### Gems tab and paywall (swerve2-10, 10z-gems, 11, 11z-table)

- **Purple is the money color.** A purple radial glow behind the top of the
  Gems screen; the "250 ◆" balance in a dark capsule with a purple gem and
  purple numerals; a purple gradient (#7E3A9B to #6A3183) Pro banner card,
  ~20pt radius, white "swerve" wordmark + gold "Pro" tag, a **yellow (#F8D749)
  48pt circle with a black arrow**.
- Earn rows: #1C1C1E cards, ~16pt radius, ~68pt tall, purple glyph left, 15pt
  semibold title + "+125 ◆" in purple, white capsule "Claim / Watch / View"
  right. A disabled row drops to 40% opacity with a gray timer capsule.
- Paywall: plain black, close X in a 32pt dark circle top-left, "Restore" in a
  dark capsule top-right, the 56pt ghost mascot, "Upgrade to Pro" ~22pt bold,
  then a **features table**: #0D0D0D panel, 1px hairline, ~16pt radius, 13pt
  gray "Features / Free" headers and **"Pro" in green (#59AB5B)**, rows of 14pt
  white labels with a gray dash under Free and a green check under Pro. 11pt
  gray "Auto-renews monthly. Cancel anytime." above a white capsule
  "Subscribe for $17.99/mo" (~50pt, 17pt semibold black). Terms / Privacy at
  11pt gray. No art, no countdown, no trial toggle, one plan.

### Character page (swerve2-16, 17, 17z-profile, 18)

- **Tapping a home card opens the chat directly** (swerve2-13: a mis-tap on a
  card dropped straight into Chloe's greeting). The character page is behind
  the avatar in the chat header, and two levels deep: avatar -> "Chat Details"
  -> character row -> profile.
- "Chat Details" (swerve2-16) is a straight copy of iOS Settings: grouped
  #111113 rows, ~12pt radius, 44pt rows, **colored 28pt rounded-square icons**
  (blue Persona, red Pinned Memory, purple Pinned Messages, green Max Reply
  Length, sky Safety Filter, magenta Background, orange Chat History), gray
  values right, a lock glyph on the Pro-only "150 words". Blue "New Chat /
  Archive Chat", red "Start Over / Delete Chat" action rows.
- Profile (swerve2-17): nav title "Akira Imai" 17pt semibold, 36pt circle back
  and "..." buttons. A **120pt rounded-square portrait (~16pt radius) centered**,
  "by cocomi" 13pt gray, "4.4 ★ (7) · 💬 24.8K" 12pt. Tagline 14pt bold white,
  description 13pt gray at ~1.35 line height. **White "Play" capsule (~250pt x
  44pt) + a 44pt dark circle bookmark** side by side.
- Below the fold (swerve2-18): an App Store-style "Ratings" block (48pt bold
  "4.4", star histogram, "Tap to rate" panel), small #222 tag capsules (11pt
  semibold), and the raw "Opening Scene" in a #1C1C1E panel, with
  `{{user}}` tokens left visible. **On scroll the nav bar becomes a blurred
  material tinted by the portrait** behind "Akira Imai".

### Chat, sent and replied (swerve2-20, 21, 21z-user, 22, 22z-reply, 27z, 28, 29)

- Typing turns the white ">>" into a **32pt iOS-blue (#3A83F8) circle with a
  white up-arrow**. Empty composer = ">>" (continue / let them talk), text =
  send. One button, two jobs.
- **The player's line is not a bubble either.** A 24pt circle letter avatar
  ("K", warm gold #B39653 fill) at the left, then the line in the same
  serif, white; the `*looks around*` action renders as *italic* with the
  asterisks stripped. Character = rounded avatar photo, player = letter disc.
  The whole transcript reads as one column of prose with avatars as margin
  marks.
- Thinking state: three gray dots next to the character avatar (swerve2-21).
  Streaming: words appear in place, no cursor, the ">>" dims to ~30% (swerve2-28).
- Reply (swerve2-22z): narration gray serif **roman** (the greeting's was italic,
  so the styling is the author's markdown, not a role rule), dialogue white,
  ~16pt between paragraphs. Under the finished reply: thumbs up / down at the
  left, a regenerate arrow at the right, 20pt line glyphs, gray.
- On scroll the transcript slides **under** a floating header: the back circle,
  the name capsule and the avatar stay as islands over the text, with only a
  short black fade at the very top (swerve2-29). No opaque nav bar.
- Gems stayed at 250 after the first message: messages are free (ads instead,
  per the paywall table). Two messages sent; no ad shown in that time.

### Chats ("Library") and profile tabs (swerve2-24, 26)

- Library: 22pt bold title top-left, a 36pt circle archive button and a "Select"
  capsule right, a #1C1C1E search capsule. Rows: **48pt rounded-square avatar
  (~8pt radius)**, name 15pt bold, 2-line gray preview 13pt, "<1m ago >" 12pt
  gray right, hairline separators inset from the avatar.
- Profile: 84pt circle letter avatar with a sage-green gradient, a generated
  handle "FullPenguin5551" 17pt bold, Following / Followers / Interactions
  stats, "Edit" and "Share" #1C1C1E capsules, underline tabs (Characters ▾ /
  Personas / Bookmarks). Empty state: gray people glyph + "Create your first
  character" + **an iOS-blue Create capsule**. The system notification prompt
  fired here, on first visit to the profile tab (declined).

## Design system read (second pass)

**Type**
- Two families. UI: a neutral grotesk close to SF / Inter (17pt semibold nav
  titles, 22pt bold screen titles, 15pt bold names, 13pt gray secondary, 11pt
  meta). Story: **a book serif (Literata / Source Serif feel), ~15pt, ~1.4 line
  height, white for dialogue, #AAA for narration, italic only where the author
  marked it**. The wordmark is a heavier rounded grotesk, lowercase.
- Ladder: 22 bold (onboarding and tab titles) · 20 heavy (wordmark) · 17
  semibold (nav, buttons) · 15 bold (card names, list names) / 15 serif (story) ·
  14 medium (chips) · 13 regular gray (descriptions, previews) · 12 (taglines,
  meta) · 11 (counts, handles, disclaimer).

**Color**
- Canvas **#000** everywhere (true black, OLED). Surfaces: #0D0D0D (paywall
  table), #111113 (grouped settings rows), #1C1C1E (earn rows, search, panels),
  #202020-#262626 (round buttons, name capsule, composer), #222224 (unselected
  chips). Hairlines ~#1E1E1E-#262626.
- **White is the primary action** (Continue, Play, selected chip, Claim,
  Subscribe). Then three accents, each with one job: **gold** = Pro badge
  ("Get Pro", "Pro" tag, yellow arrow disc), **purple** = gems and the Pro
  banner, **iOS blue** = send button and "Create" / "New Chat". **Green** only
  for the Pro column on the paywall. The rest of the color is photo art.
- Text: white / #AAAAAA / ~#6E6E6E.

**Spacing and shape**
- ~20pt side margins on forms and lists, ~14pt on the home grid, ~12pt gutters.
  ~16pt paragraph gap in chat, ~45pt text indent from the screen edge.
- Radii: home cards 12 · panels and earn rows 16 · Pro banner ~20 · settings
  groups 12 · portrait 16 · list avatars 8 · everything you press is a full
  capsule or a circle.
- Hairline borders on cards and the paywall table; no drop shadows anywhere.
  Depth comes from the gray steps and the one purple glow.

**Art**
- Home cards ~5:7 portrait, full-bleed photo, bottom-third gradient to black
  carrying the name and tagline inside. Profile portrait 1:1. List avatars 1:1.
  Mostly user-uploaded photos and screencaps, so the grid has no visual
  consistency at all.

**Icons**
- SF Symbols, regular weight, ~22pt in the tab bar, outline when inactive and
  filled when active. Emoji inside chips. The settings list uses colored
  rounded-square icon tiles. The ghost mascot is the only custom drawing.

**Nav, buttons, input**
- 5-tab bar, icons only, no labels, no top hairline, on black.
- Floating header islands in chat (circle back, name capsule, avatar) over
  scrolling text.
- Composer: #262626 capsule, ~40pt, ">>" / blue send in one slot, 11pt "This is
  AI, not a human." under it.

**Messages**
- No bubbles. One prose column, avatars in the left margin (rounded photo for
  the character, letter disc for the player), serif text, gray narration vs
  white dialogue. Feedback row (👍 👎 ↻) only under the latest reply.

**Motion and loading**
- Three-dot thinking indicator, then word-by-word streaming in place.
  Collapsing home header with sticky chips. Blur material on scroll.

**Premium or cheap, one line:** the chat is premium (book serif on true black,
no bubbles, floating header) and everything around it is stock iOS (Settings
clone, system blue, App Store ratings), so the app feels like a good reader
bolted to a template.

## UI patterns to steal (second pass)

1. **Serif for the story, sans for the app** (play screen; swerve2-07-chat-greeting,
   swerve2-22z-reply). A book serif at ~15pt / 1.4 for every story line, white
   dialogue, #AAA narration, while all chrome stays sans. It is the single move
   that makes Swerve's chat read as fiction instead of messaging.
2. **No bubbles: one prose column with avatars as margin marks** (play screen;
   swerve2-22z-reply). Character lines and player lines share the column; a
   24pt rounded photo or a letter disc at the left tells them apart. Plotbreak's
   beats are prose, so this fits better than chat bubbles.
3. **One composer slot, two jobs** (play screen; swerve2-07z-composer,
   swerve2-27z). Empty field shows ">>" (continue the scene), typing swaps it
   for the send disc. Plotbreak's "continue" and "send" could share the slot the
   same way.
4. **Floating header islands over the transcript** (play screen; swerve2-29).
   Circle back, title capsule, avatar, no bar; the text scrolls under them.
5. **Card name inside the art, creator outside it** (home; swerve2-08z-card).
   Name and tagline on the bottom gradient inside a 5:7 card with a 1px
   hairline; the handle sits on the canvas below. Keeps the card clean and the
   meta out of the art.
6. **Three-zone onboarding frame** (onboarding; swerve2-04-onboarding-rows):
   22pt bold title top-left, control mid-screen, white capsule at the bottom,
   "Skip" / "Prefer not to say" as 12pt gray text under it. Every screen
   identical, so five steps feel like one.
7. **Paywall as a two-column feature table** (paywall; swerve2-11-paywall).
   #0D0D0D panel, 1px hairline, Free dashes vs green Pro checks, one plan, one
   white button with the price in it. Quiet and readable; no fake urgency.
8. **Accent per job** (all screens): gold = Pro, purple = currency, white =
   action. Plotbreak could assign its one accent to the paid layer only.

## What looks generic or cheap (second pass)

- **Chat Details is iOS Settings verbatim**, colored icon tiles included
  (swerve2-16). It is the most "template" screen in the app and sits one tap from
  the best one.
- **iOS system blue** for send and Create breaks the white-action rule. It
  looks like a default nobody chose.
- The home grid is user-uploaded photos and screencaps of every quality and
  palette. No art direction, so the shelf looks like a camera roll.
- App Store-style ratings block and a raw "Opening Scene" panel that shows
  `{{user}}` placeholders on a public profile.
- Five data/permission screens (birthday, name, pronouns, attribution survey,
  notifications) before any art, then a second, system notification prompt on
  the profile tab.
- Emoji in chips and taglines ("🔥 Popular", "🥹✌️") make the chrome noisy.

## Not reached (second pass)

- Search, the "+" create flow (not opened: creating is off-limits), quests,
  the ad unit (none appeared in two messages), the ">>" continue action (not
  tapped: it would generate a reply).
