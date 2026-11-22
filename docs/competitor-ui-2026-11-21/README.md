# Competitor UI study — 2026-11-21

Goal: find AI character / AI story apps with genuinely good UI, to steer the
Plotbreak redesign away from "super AI slop". OOC is excluded on purpose (another
pass studies it hands-on).

Method: Apple's public iTunes Search/Lookup API (US storefront), plus the US
Entertainment top-free and top-grossing RSS charts pulled today. iPhone
screenshots downloaded per app into `<app-slug>/NN.jpg` (downscaled to 900px).
These are marketing shots: captions and phone mock-ups are ignored, only the UI
inside the phone frame is judged. Nothing was installed or signed up for.

## Who is actually on the store today

The brief's named candidates mostly are **not on the App Store** today. Search and
bundle-id lookup return nothing for Talkie (MiniMax), PolyBuzz, Chai, Linky or the
character-chat Saylo, in the US, GB, JP and FR storefronts. ("Saylo" now resolves
to an English-shadowing app.) AI Dungeon (id 1491268416, 26,906 ratings) is listed
but publishes **zero** iPhone screenshots, so it could not be judged.

What is charting instead (US Entertainment, 2026-11-21):

| App | id | Ratings | Avg | Top free | Top grossing | Last update |
|---|---|---|---|---|---|---|
| OOC (excluded) | 6761247061 | 14,290 | 4.63 | #38 | #31 | 2026-11-16 |
| EMOCHI World | 6758488675 | 17,872 | 4.62 | #43 | #94 | 2026-11-10 |
| Swerve | 6754301136 | 43,471 | 4.73 | #46 | #100 | 2026-10-23 |
| Whispy AI | 6770413766 | 1,820 | 4.33 | #50 | #25 | 2026-10-22 |
| Character.AI | 1671705818 | 561,962 | 4.26 | #60 | #45 | 2026-10-02 |
| Crushie AI | 6741790631 | 4,047 | 4.81 | #80 | #35 | 2026-11-02 |
| Heyyyy | 6761748236 | 5,796 | 4.72 | #85 | #36 | 2026-11-10 |
| Peekie | 6792978953 | 595 | 4.65 | #86 | — | 2026-11-19 |
| Popia | 6757948021 | 2,211 | 4.46 | — | #20 | 2026-10-07 |
| Afizzy | 6780423105 | 1,188 | 4.85 | — | #81 | 2026-11-20 |
| Elseway | 6773333143 | 20 | 2.95 | — | #95 | 2026-11-17 |

Off-chart but with real rating counts: Enjoy – AI Town (6468901311, 82,999,
Games), Everweave (6747261740, 8,758, Games), Janitor (6692609366, 6,524, Book),
Sagaland (6748543926, 1,181, Book), ISEKAI ZERO (6748359707, 1,205, Games).

All 16 apps above (except OOC) were downloaded and triaged. Eight get a full
section below; the rest get a short note at the end, mostly as avoid-list evidence.

---

## 1. Character.AI — id 1671705818

562k ratings, 4.26, US Entertainment #60 free / #45 grossing, updated 2026-10-02.
Screenshots: `character-ai/01.jpg`–`08.jpg` (feed 01/07, create 02, memory 03,
voice 04, chat 05/08, browse grid 06).

**Design system.** The app UI is monochrome: near-black `#111`-ish canvas,
`#1E1E1E` cards, white text, mid-gray secondary text. There is **no brand accent
color inside the app at all** — the only color on screen is the character art.
Selected states are white fill + black text (filter chips in 06, the active tab
icon); unselected chips are a 1pt gray outline. One geometric grotesk family
(round dots, open apertures; reads like Onest/Manrope) carries everything: ~28pt
bold screen title ("For You"), ~20pt bold card titles, ~15pt regular gray
descriptions. Avatars are **rounded squares** (~10pt radius on 40pt), not circles,
which is a small thing that makes it look less template-like. Icons are plain
1.5pt line icons; the only "illustrated" icons are the reaction stickers.
Brand personality lives entirely in the marketing frames (pixel-dither patterns on
flat yellow/blue/green, a parenthesised `(c.ai)` wordmark), not in the UI chrome.

**Home / feed.** Two modes. `07`: a **vertical, one-card-at-a-time "For You"**
feed — a full-width art card (~20pt radius) filling the screen between nav and
tab bar, creator avatar + display name + @handle bottom-left, one-line caption
with "More", "23 mins ago", then a row of **custom sticker reactions with counts**
(8.7k, 2.7k, 444, 148) in outlined pills. A translucent "Continue this moment in
chat" pill sits on the art — the feed item is a *moment*, not a character, and
the CTA drops you into it. `06`: classic 2-column grid; card = art on top
(~4:3, 16pt top radius), dark body with 20pt bold name, 2-line gray tagline, and
a chat-bubble count (27.8k, 331.6k); the creator handle sits *outside* the card
underneath. Counts on every card do the "alive" work.

**Chat.** `08`: full-screen scene art as the chat background. Character turns
are a dark translucent bubble with the narration **entirely in italic** at
~17pt — prose, not chat. A small speaker chip on the bubble's top edge plays
voice. Inline generated images appear as a 2:3 card (~16pt radius) with
thumbs up/down under it. Header: 32pt rounded-square avatar + name, then three
line icons (memory/notes, voice, call). Composer: a dark pill with the *user's*
avatar inside it on the left, image + sticker buttons on the right, and a
**separate circular ">>" button** to let the story continue without typing.
Persistent disclaimer under the composer ("This is A.I. and not a real
person..."). No visible per-message cost.

**Distinctive vs generic.** Distinctive: the vertical moment feed with
"Continue this moment"; sticker reactions with counts; rounded-square avatars;
art-only color. Generic: the 2-column grid itself, and the create-character
form (02) is a stock dark form.

## 2. Afizzy: AI Interactive Stories — id 6780423105

1,188 ratings, 4.85, US Entertainment #81 grossing, updated 2026-11-20 (released
2026-07). Screenshots: `afizzy/01.jpg`–`06.jpg` — notable because they are **raw,
uncaptioned, full-bleed screen grabs**, so what you see is the real app. Home 01,
story opening 02, story page 03, play screen 04/05, create 06.

**Design system.** True-black canvas; one accent, a hot pink-to-coral
(`~#FF4D8D`) used only for the primary button, the active tab underline, the
"More" link and the hint lightbulb. Geometric sans with Montserrat-like caps
(wide "A", round "o") at ~22pt bold for names, ~16pt regular for taglines.
**Card radius is small, ~6pt**, which makes the grid read as posters rather than
bubbly app tiles. Floating glass tab bar (4 line icons, active one in a lighter
glass capsule) — iOS 26 Liquid Glass style done straight.

**Home.** `01`: text-only category tabs (For You / Halloween / **Trending**
underlined in pink / Latest / Popular / Romance) under a search pill. A tight
2-column grid of **tall ~3:4.3 portrait cards, 8pt gutters, 10pt edge margins**;
the art fills the card and the text is overlaid bottom-left on a black gradient:
name 18pt bold, 2-line tagline 14pt, then @creator left and a chat-count right
(3, 431, 642). The art does all the work; there is no card chrome.

**Story page.** `03`: full-bleed character art to ~55% of the screen fading into
black; name ~30pt semibold overlaid bottom-left, a one-line hook in gray, an
"Exclusive" tag, a full-width **voice sample row** ("Male Young Clear" with a
speaker icon — tap to hear the voice before playing), creator + 12.4k count,
then "About" and "Story Rules" sections. One pink full-width **Continue** pill
pinned to the bottom with a circular share button beside it.

**Play screen.** `04`/`05`: the character art fills the whole screen, dimmed
~60%, and the story text sits on it at **~20pt regular white, no bubble at all** —
it reads like a page, not a chat. Inline generated images appear as a ~2:3
carousel (8pt radius) with two square "generate image / generate video" buttons
under it. Then a small **"Direct your story" chip** (wand icon) heads a stack of
2 **suggested-action cards**: translucent plum cards, 16pt radius, sparkle icon
left, first-person action text at ~18pt ("I step closer to the photograph..."),
**a pencil icon right to edit the suggestion before sending**. Composer: dark
pill "Write your message..." with a pink lightbulb (ask for a hint), plus a
separate circular **>>** (let the story continue). No cost shown on messages.

**Distinctive vs generic.** Distinctive: bubble-less prose over full-bleed art;
editable suggested actions; voice preview on the story page; small-radius poster
grid. Generic: the pink CTA pill and create form (06) are stock.

## 3. Everweave — id 6747261740

8,758 ratings, 4.24, Games (RPG), updated 2026-11-12. Screenshots:
`everweave/01.jpg`–`08.jpg`, also **uncaptioned raw screens**: title 01, ability
check 02, play screen 03, class picker 04, character sheet 05, attribute
allocation 06, abilities 07, pre-made characters 08.

**Design system.** The strictest system in this set, and it is genre-native,
not "app". Two colors only: near-black `#0E1212` panels and an antique
**gold/cream** (`~#D9C77A` for rules and headings, `~#E8DDB0` for body text);
one off-palette red for HP. Type: an inscriptional all-caps serif (Cinzel /
Trajan-like) for headings ("ABILITY CHECK", "BARBARIAN", "VIGIL"), a low-contrast
book serif for body text at ~19pt, small caps for tab labels. Shapes are **framed,
not rounded**: thin 1pt gold hairlines, bevelled plaque buttons, diamond
ornaments at rule centers, circular portrait medallions with gold rings (08).
Every screen uses the same three devices (hairline rule, diamond, plaque), which
is why it feels designed rather than assembled.

**Home.** `01`: no feed at all — a painted landscape (stone arch) with two
plaque buttons, PLAY and PROFILE, and a CREDITS text link. Pure game title
screen. Character choice (`08`) is a list of rows: 64pt circular portrait
medallion overlapping a gold-outlined plaque with name (22pt serif) and
"Fighter, Elf" subline, plus a "+ CUSTOM" row last.

**Play screen.** `03`: layered visual-novel composition — a painted location
fills the top, the speaking character's **portrait cut-out overlaps the top-left
of the text panel**, and the text panel is a black band with gold hairlines.
Speaker name in bold gold ("Drol Vax:"), dialogue in cream, narration in
italic. Two round gold buttons sit *on* the panel's top edge (log, party).
Under the panel, the input is not a text field: a centered serif **"What do you
say?"** between two gold rules with a glowing diamond button to open input.
Bottom: three framed tabs ABILITIES / CHARACTER / INVENTORY with engraved icons.

**Checks.** `02`: an ABILITY CHECK takeover — gold Cinzel title, a d20 inside a
circular gold-ring frame, a plaque reading `00 | PERCEPTION | 12` (roll vs. DC),
and one centered cream sentence of what you are attempting. The dice moment is
a full stop in the story, with its own screen.

**Cost.** Not visible in screenshots.

**Distinctive vs generic.** Almost nothing generic. Its risk is density in the
RPG setup screens (06 is a stat sheet). The lesson for Plotbreak is not "use
gold", it is: pick the genre's own visual language (for us, anime/manga: panel
borders, screentone, speech-balloon shapes, title-card typography) and apply it
everywhere with 2 colors and 3 repeated devices.

## 4. Sagaland: Play AI Chat Stories — id 6748543926

1,181 ratings, 4.63, Book, updated 2026-11-07. Closest product shape to Plotbreak
(pick a world, pick who you are, the story answers). Screenshots:
`sagaland/01.jpg`–`05.jpg`: cast hero 01, trope grid 02, play screen 03/04,
story page + world builder 05.

**Design system.** Dark navy-black (`~#0B0B14`) canvas, `#141418` story cards,
a cool navy (`~#13213A`, 1pt `#2E5AA8` outline) reserved for **the player's own
lines**. Rounded heavy sans (Nunito Black-like) for titles (~30pt "When the Tide
Turned"), regular sans ~17pt for prose, **tracked gray small caps** for section
labels ("YOU PLAY", "WHO YOU'LL MEET 11"). Radii ~12–14pt on cards and images,
circles for icon buttons. Weak spot: the two bottom CTAs on the story page are a
flat purple and a purple-to-magenta gradient — the one place it goes generic.

**Browse.** `02`: a 3-column grid of near-square tiles (12pt radius) labelled by
**trope, not genre** ("Enemies to lovers", "Fake dating", "Hidden identity",
"Roommates"), white 17pt bold label bottom-left. Several tiles are **real
book-cover compositions with the title set in the art** ("A VOW WRITTEN IN
BLOOD", "THE ARRANGEMENT", "WHERE THE DUST SETTLES"), which makes the shelf read
like a bookstore rather than a bot list.

**Story page.** `05`: cover art top, title, creator, synopsis, then a
**"YOU PLAY" persona card** (who you are in this story) and **"WHO YOU'LL MEET
11"** — a horizontal row of 3:4 portrait cards (12pt radius) with name and a
one-line role ("Jasper Ashbourne — Jade's fiery twin"). Then "Play solo" and
"Play with friends" (multiplayer).

**Play screen.** `03`: top bar = round back button, a **stacked-avatar pill of
the cast currently in the scene**, a book icon (lore), settings. The player's
line is a full-width navy box at the top of the turn; the beat is a dark card
with ~17pt prose, then an inline 4:3 scene image (12pt radius) **with a
location caption under it** ("The Hall of Bonds, Sunspire Palace"). Under each
beat, a quiet row of 5 small icons: edit, rewind, branch, regenerate, continue.
Above the composer, **suggested-action chips with a pencil glyph** ("Face the
king", "Take Talon's hand") plus refresh and clear. Composer placeholder:
"Continue your saga..." with the persona avatar at left and an up-arrow send.
No cost shown.

**Distinctive vs generic.** Distinctive: trope-labelled shelf, title-in-art
covers, "You play / Who you'll meet" on the story page, captioned scene images,
the cast pill. Generic: the purple gradient CTA, Nunito titles.

## 5. Elseway: Into the Story — id 6773333143

Only 20 ratings (2.95 avg), but US Entertainment #95 grossing; updated
2026-11-17. Weak evidence on users, strong on visual ideas. Screenshots:
`elseway/01.jpg`–`04.jpg`: hero 01, Explore 02, play 03, character discovery 04.

**Design system.** Black-violet canvas with a violet accent (`~#A66BFF`) for
badges, emphasis lines and the active tab. Type is the interesting part: a
**high-contrast display serif** (Cormorant/Playfair-like) for the "Explore"
screen title and character names, **italic gold serif** for story taglines,
**spaced small caps** for character titles ("SECOND SON OF HOUSE VALCREST"), and
a light sans (light italic for narration) for prose. Cards have 1pt violet
outlines and a soft outer glow — the glow is the slop part (see avoid list).

**Home.** `02`: 2-column cards. Top is cover art with **the story title set in
the art** like a novel cover ("THE VILLAINESS BLOOMS AMONG BEASTS", "AFTER
HOURS"). On the art: a violet chat-count badge top-left (12.4K, 3M, 126K),
@creator bottom-left, cast size bottom-right (person icon + 5/10/8). Below the
art: title 17pt sans, then a **one-line hook in italic gold serif** ("your ending
was already written.", "some debts are never paid."), stars, and **length in
tokens** ("6,540 tokens") as a quiet gray line.

**Play screen.** `03`/`04`: header = small cover avatar + story title + "by
@creator", then a **"Cast • 5" pill with stacked avatars**. Narration in light
italic ~17pt; key beats pulled out as **violet non-italic lines** ("That's when
you noticed him.", "You sensed a new presence in your world—one worth
remembering."). When a new character enters, a system row appears: sparkle +
"New character detected — Damien Valcrest" + check, with a "Generate" button
that mints a **character card**: tall portrait, serif name, small-caps title,
trait chips (Noble, Strategic, Observant, Poised, Ambitious), a one-line quote
in italics ("Power is inherited. Respect is earned."), and a bookmark to keep
it. Composer: dark rounded field "Type a message..." with an up-arrow, a
disclaimer under it.

**Distinctive vs generic.** Distinctive: serif + italic-gold hook typography on
the shelf; tokens-as-length; meeting a character mid-story produces a
collectible card. Generic: violet glow outlines, purple everything.

## 6. Janitor: Interactive Stories — id 6692609366

6,524 ratings, 4.52, Book, updated 2026-11-20. Screenshots: `janitor/01.jpg`–
`08.jpg`: hero 01, chat 02, character page 03, creator-themed page 04, create
05, profile 06, persona 07, comments 08.

**Design system.** Charcoal `#2B2D31` canvas (Discord gray, not black), `#36383E`
fields, white text, gray italics; accent lavender (`~#B79CFF`) on links and
outline pills. System-ish sans everywhere in the app; the store frames use a
book serif (Crimson-like) that the app itself does not. Avatars are rounded
squares (~6pt radius on 56pt).

**Chat.** `02` is the most *literary* transcript in the set: **no bubbles, no
left/right split**. Every turn — character and player alike — is a 56pt avatar,
a bold name ("Ayato Hiroshi", "Wren"), dialogue in white roman inside quotes,
and actions in **gray italic inline** ("He slides a stack of notes across the
table."). It reads like a co-written script. Character turns get regenerate +
edit icons and a **"< 2/2 >" pager** for alternate replies. A "using janitor"
outline pill in the header names the model in use. Composer is a plain rounded
rect with web-ish help text ("Press button to send chat. Enter for linebreak").

**Character page.** `03`: the creator can theme it — here a purple frame with a
techno display font for the name, a portrait with a **reads/messages stat flag**
(412.6k / 12.1m), a gold "by: @frostlantern" pill, 37.2K hearts, then the bio.
`04` goes further: a creator-built page in a **retro terminal aesthetic** (EXIT
button, monospace, ">> record found", pixel wolf). Profile customization like
Tumblr/MySpace, including a username color picker (06).

**Social.** `08`: threaded comments under a character with emoji reaction
counts (642, 318, 97), pinned comment, "View more replies (4 remaining)".

**Cost.** Not shown; the model pill hints at model choice.

**Distinctive vs generic.** Distinctive: script-style transcript with italic
actions; creator-themed pages; comments as part of the story page. Generic:
the forms (05, 07) and Discord-gray chrome.

## 7. EMOCHI World: AI Story Chat — id 6758488675

17,872 ratings, 4.62, US Entertainment #43 free / #94 grossing, updated
2026-11-10. Screenshots: `emochi/01.jpg`–`04.jpg`: hero 01, Explore 02, chat
03, create 04.

**Design system.** Dark, but **warm**: blacks lean brown, panels are translucent
amber-brown (`~#3A2A20` at ~80% with blur), and the single brand accent is a
saturated yellow (`~#F5D90A`) used for the logo mark and the active tab icon.
Wordmark "EMOCHI World" in a wide extended display face. UI text is a neutral
grotesk: ~22pt bold names, ~15pt gray bios. Trait tags are small gray
rectangles (~4pt radius), not pills. Floating glass tab bar (Explore / Chats /
Me) with a yellow disc behind the active icon.

**Home.** `02`: emoji-prefixed filter pills (👀 Explore, 📅 Today, 👨 Male,
👩 Female) under the wordmark and an outlined "+ Create" capsule. A **staggered
masonry** 2-column feed: tall art with a message count on the art (450.8k), then
name, a 3-line bio and 2–3 trait tags ("Perfectionist", "Surgeon", "Lonely").
The masonry rhythm (cards of different heights) does more for "alive" than
any badge.

**Chat.** `03`: the character's art fills the top ~55% and keeps going behind
the UI; the panels are tinted by it, so **the chrome takes the color of the
character**. An intro card "Meet Gabriel" (orange 20pt title, 3-line bio, trait
chips, a large faint quotation-mark watermark top-right) sits over the art.
The first message uses **three typographic registers** in one bubble: stage
direction in parentheses (roman), dialogue in **bold** inside quotes, narration
in *italic*. Composer: round "story" button left, a "Reply Gabriel" pill (named
for the character, not "Message..."), round sticker button right. Header: round
back button, name with a dropdown chevron, a capsule holding add-character and
menu icons. A tiny "Everything said is generated by AI." over the art.

**Cost.** Not visible.

**Distinctive vs generic.** Distinctive: art-tinted warm chrome; three type
registers in one beat; "Reply <name>"; masonry. Generic: emoji filter pills,
floating labels in the marketing frames.

## 8. Swerve: AI Chat & Stories — id 6754301136

43,471 ratings, 4.73, US Entertainment #46 free / #100 grossing, updated
2026-10-23. Screenshots: `swerve/01.jpg`–`05.jpg`: home 01, chat 02, chat list
03, character page 04, chat with wallpaper 05.

**Design system.** Black canvas, `#1C1C1E` cards, one periwinkle accent
(`~#5B5BD6`) used **only for the player's bubbles**. A friendly grotesk with
some character (wide round "C"/"e"), ~24pt bold names, ~15pt taglines. Radii
~14pt on cards, full capsules on chips and header title. Line icons in the
5-item tab bar (Home, Chats, Create, Store, Profile).

**Home.** `01`: structurally a Character.AI clone — chips (selected = white fill
"🔥 Popular", others dark: "🧭 Explore", search chips "Mafia"), 2-column cards with
art top (~4:3), name, an **"emoji | one-liner" tagline** ("🎮 | Game starts in
five. You in?"), chat count (94.9K), creator handle with a verified tick under
the card.

**Chat.** `05`: iMessage logic — player right in periwinkle with their avatar,
character left in dark gray. Inside a character bubble, **narration is gray and
dialogue is white**: two registers by color instead of italics, which is calmer
than italics for long prose. Optional doodle-pattern wallpaper. Header: round
back button, character name in a centered capsule, avatar right. Composer: a
single pill "Message" with a **>>** inside it, disclaimer below. `04`: a
character page with a 5.0 rating and a star-rating widget ("Your rating").

**Cost.** Not visible.

**Distinctive vs generic.** Mostly generic, executed cleanly — proof that a
cloned layout with good art can hold 4.73 over 43k ratings. The gray-narration /
white-dialogue split and the "emoji | hook" tagline are the only ideas of its own.

## Also scanned (short notes)

- **Peekie: Stories & Choices** (6792978953, 595 ratings, #86 free). `peekie/01`:
  the cleanest home in the set after C.AI. Hero carousel card with a "HOT" tag,
  30pt title, a hook written as a question, and a stats line **"3.9K Played · 1
  Solved · 20 Tasks"**; text tabs with a count badge ("New 5"); 2-column 3:4
  cards with a dot+genre tag ("Mystery", "Love"), first-person hooks ("I thought
  I was looking for another woman—so why was I on the list?") and the same
  played/solved line. Play (02–05) is diegetic: you snoop a fake iPhone (Photos,
  Voice Memos, Messages) — a strong idea that only works for mystery.
- **Enjoy – AI Town** (6468901311, 82,999 ratings, Games). `enjoy-ai-town/08`:
  a game HUD over a photoreal character — heart currency "1300 ♥ +", a 291s
  timer, "Friend | LV5" bond bar, a "Feelin OK" mood tag, inline system events
  ("Rina gave River a Lucy Sterlings Playing Cards."), a contextual one-tap
  prompt **"Treat River to food or drink? Yes ›"**, and a tray of glossy
  multicolor round buttons (Rolls Eye, Cafe, Gift, Visit, Outfit, Story). Alive,
  but cluttered; see avoid list.
- **ISEKAI ZERO** (6748359707, 1,205 ratings). Anime-native and feature-rich
  (narration voice, manga pages, soundtrack, anime clips), but `isekai-zero/05`
  exposes a developer console to players: two currency balances in the header
  (0 / 823.1), **"TOTAL ESTIMATED PRICE ~36.6 – 46.04 Mana / Arcane"**, per-image
  prices, model dropdowns ("Nano Banana 2 Edit (2k)", "Grok Imagine Image"),
  lime "Recommended" toggles. Right instinct (show the cost before spending),
  wrong altitude.
- **Heyyyy** (6761748236, 5,796 ratings, #36 grossing). `heyyyy/01–06`: the store
  frames use a good serif with italic violet accent words, but the app itself is
  a dating-swipe card (X / star / heart), plum-purple chrome, a gem balance
  "1,070" in the header, and a personality radar chart (04).
- **Popia** (6757948021, 2,211 ratings, #20 grossing). Full-bleed portrait chat
  (02), dynamic covers (04), a memory timeline (05), and a donut carousel to pick
  the AI model with a hexagon radar (06). Moody, but gimmicky.
- **Whispy AI** (6770413766, #25 grossing) and **Crushie AI** (6741790631, #35
  grossing): pink-lavender and magenta-violet gradients, glassy floating pills,
  level/intimacy meters (Whispy 04 "Lv.90 ... 48 gems"). Textbook avoid-list.
- **Loopit** (6755859360, 46,958 ratings): not story; a TikTok-style feed of
  playable toys on hot pink. Only relevant for its creator profile (04).
- **Not judgeable**: AI Dungeon (no iPhone screenshots); Talkie, PolyBuzz, Chai,
  Linky, Saylo (not on the US/GB/JP/FR App Store today).

---

## Ranking by UI quality

1. **Everweave** — the only strict, genre-native system: 2 colors, 1 display
   serif, and the same 3 devices (hairline, diamond, plaque) on every screen.
2. **Character.AI** — disciplined monochrome chrome where art is the only color;
   the vertical "moment" feed is the best home in the category.
3. **Afizzy** — best play screen for a story app: bubble-less prose over
   full-bleed art, editable suggested actions; poster grid with small radii.
4. **Sagaland** — best story page and in-play affordances (You play / Who you'll
   meet, cast pill, captioned scenes); let down by purple gradient CTAs.
5. **EMOCHI World** — art-tinted warm chrome and three type registers in one
   beat; cheapened by emoji filter pills.
6. **Elseway** — best shelf typography (title-in-art covers, italic serif
   hooks, tokens-as-length), drowned in violet glow.
7. **Janitor** — the most literary transcript (script style, italic actions);
   Discord-gray chrome and web-ish forms.
8. **Swerve** — a clean Character.AI clone; well made, little to learn.

---

## Steal list

1. **Prose on the art, no bubbles.** Dim the scene art ~60% full-bleed and set
   the beat as ~20pt white text straight on it; images inline at 2:3 with an 8pt
   radius. Source: Afizzy `afizzy/04.jpg`, `afizzy/05.jpg`. → **Play screen.**
2. **Editable suggested actions.** A small "Direct your story" label, then 2
   first-person action cards (16pt radius, ~18pt text) with a pencil on the
   right that drops the text into the composer to tweak before sending. Sagaland
   does the compact version as chips with a pencil glyph. Drop Afizzy's sparkle
   icon. Source: `afizzy/04.jpg`, `sagaland/03.jpg`. → **Play screen.**
3. **Three type registers, not three bubble colors.** Action/narration in
   italic or gray, dialogue in roman white (or bold), stage direction in
   parentheses; player and character share one script layout. Placeholder says
   "Reply Gabriel", not "Message...". Source: EMOCHI `emochi/03.jpg`, Janitor
   `janitor/02.jpg`, Swerve `swerve/05.jpg` (gray narration / white dialogue). →
   **Play screen.**
4. **Who is here, and where are we.** A stacked-avatar cast pill in the play
   header; a location caption under each scene image ("The Hall of Bonds,
   Sunspire Palace"); when a new character enters, a quiet "New character —
   Damien Valcrest" row that becomes a keepable character card (portrait, serif
   name, small-caps title, one quote). Source: `sagaland/03.jpg`,
   `elseway/04.jpg`. → **Play screen** (card collection → **Profile**).
5. **The feed item is a moment, not a character.** One full-height art card at
   a time, creator + one-line caption + age, reaction counts, and a "Continue this
   moment" pill that drops you into the scene. Fits the design-v2 daily feed home.
   Source: Character.AI `character-ai/07.jpg`. → **Home feed.**
6. **Art is the only color.** Monochrome chrome (near-black canvas, `#1E1E1E`
   cards, white/gray text), selection shown as white fill + black text, no brand
   gradient anywhere; rounded-square avatars instead of circles. Source:
   `character-ai/06.jpg`, `character-ai/07.jpg`. → **All screens / design system.**
7. **Poster grid with a stats line.** Tall 3:4 cards, ~6pt radius, 8pt gutters,
   title + 2-line hook overlaid bottom-left on a black gradient, then a quiet
   line of real numbers ("4.9k played · 8 finished"). Source: Afizzy
   `afizzy/01.jpg`, Peekie `peekie/01.jpg`. → **Home feed.**
8. **Covers that look like books.** Title set inside the cover art (our cover
   v4 recipe already does this), shelves labelled by trope ("Enemies to lovers",
   "Hidden identity") rather than genre, and a one-line hook in italic serif
   under the cover ("your ending was already written."). Source: Sagaland
   `sagaland/02.jpg`, Elseway `elseway/02.jpg`. → **Home feed, story page.**
9. **"You play" / "Who you'll meet".** On the story page, show the player's
   role as its own card (this is exactly our `archetypeId` / `displayName`), then
   a horizontal row of 3:4 portraits with name + one-line role. Afizzy adds a
   tappable voice sample row if we ever voice characters. Source:
   `sagaland/05.jpg`, `afizzy/03.jpg`. → **Story page** (and the end of
   **onboarding**, which per design v2 ends in beat 1).
10. **One genre-native visual language, applied everywhere.** Everweave picks
    the tabletop vocabulary (gold hairlines, diamonds, plaques, Cinzel caps) and
    never leaves it; its check screen turns one moment into a full-screen
    takeover. Our equivalent is manga: panel borders, screentone fills,
    title-card type, a full-bleed "chapter" takeover for big beats and the end
    card. Source: `everweave/02.jpg`, `everweave/03.jpg`, `everweave/08.jpg`.
    → **Design system, play screen, end card.**

Smaller one for the **paywall** (turn-10 wait-or-pay): a quiet balance chip in
the header (Heyyyy `heyyyy/01.jpg` "◆ 1,070") and telling the player what the
next action costs before they tap. ISEKAI ZERO (`isekai-zero/05.jpg`) shows the
principle, but with decimals, model names and price ranges. Show one plain
number at most.

---

## Avoid list (what reads as AI-app slop)

- **Purple/violet glow on black.** 1pt violet outlines with outer glow on every
  card, violet badges, violet emphasis text: Elseway `elseway/02.jpg`, `04.jpg`.
  Plum-purple chrome: Heyyyy `heyyyy/01–06`.
- **Pastel or magenta gradients as the background.** Whispy (`whispy/01–05`,
  pink-lavender + glass pills), Crushie (`crushie/01–05`, magenta→violet).
  Gradient CTAs: Sagaland "Play with friends" (`sagaland/05.jpg`).
- **Emoji as UI markers.** Filter pills "👀 Explore / 📅 Today / 👨 Male"
  (`emochi/02.jpg`), "🔥 Popular / 🧭 Explore" and "🎮 | tagline" (`swerve/01.jpg`),
  "🎃 Halloween" (`afizzy/01.jpg`).
- **Sparkle ✦ as the universal "AI" icon.** On suggestion cards
  (`afizzy/04.jpg`), "New character detected" (`elseway/04.jpg`), the composer
  (`elseway/03.jpg`). It says "AI feature", not "story".
- **Game-shop HUD clutter.** Glossy multicolor round buttons, currency + timer
  + level bar + mood tag all over the character (`enjoy-ai-town/08.jpg`).
- **Pseudo-data.** Personality radar/hexagon charts (`heyyyy/04.jpg`,
  `popia/06.jpg`), intimacy levels with gem rewards (`whispy/04.jpg`).
- **Exposing the machinery.** Model pickers, model names, per-image prices with
  decimals (`isekai-zero/03.jpg`, `05.jpg`, `08.jpg`); a donut carousel to pick
  the model (`popia/06.jpg`).
- **Rounded-everything.** 20pt+ radius on every surface, pill buttons stacked
  on pill fields (Whispy, Crushie create forms). Small radii (Afizzy's ~6pt
  posters, Everweave's square frames) read as more deliberate.
- **Stock dark create forms.** Label, rounded field, label, rounded field:
  `character-ai/02.jpg`, `janitor/05.jpg`, `afizzy/06.jpg`. Every app has the same one.
- **Brand that lives only in the store frames.** Heyyyy's serif-and-italic
  type and Janitor's book serif appear in marketing, not in the app. If the
  identity is not in the UI chrome, the app looks like everyone else's.

---

## Worth a hands-on look on a real phone

1. **Afizzy** — closest to what Plotbreak's play screen should be. Check how
   the background art changes between beats, how suggestions are generated
   and edited, and where the paywall/cost moment lands (not in any screenshot).
2. **Character.AI** — the For You moment feed: how "Continue this moment"
   enters a scene mid-story, how the sticker reactions feel, and the motion
   polish only a large team ships.
3. **Everweave** — to feel whether a strict genre system stays pleasant over a
   long session, and how the full-screen check takeover paces play. If time is
   short, swap for **Sagaland** to test the story page, the cast pill and
   rewind/branch.
