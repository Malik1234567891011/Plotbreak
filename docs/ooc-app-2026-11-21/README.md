# OOC (ooc.ai) iOS app teardown, 2026-11-21

Driven read-only on a real iPhone through iPhone Mirroring. Logged-in account,
English locale. Shots are 354x781 (1 px = 1 pt). Nothing was liked, sent,
claimed or bought. Shot numbers in headings refer to the full capture run;
the 19 kept in `shots/` are listed at the end.

## Screen map

### Home, Story tab, "Main" pill (shots 01-11)

Chrome, top to bottom:
- Status bar, then a header row: **"Story"** (white, bold, ~20pt) next to
  **"Character"** (same size, ~40% grey). The toggle is just two words; the
  active one is white. Right side: three outline icons (a square "scan/AI"
  glyph, bell, magnifier), ~22pt, white.
- Pill row (horizontal scroll): `Main` (active: lime/yellow-green outline +
  lime text on a very dark green fill), `New Ranking`, `Rankings`, `Today`,
  `Fantasy`, ... Inactive pills: dark grey fill (#1c1c1e-ish), 1px grey
  border, light grey text ~13pt. Fully rounded capsules, ~30pt tall.
- Bottom tab bar: Home, History, My Titles (lightning bolt), MY. Filled white
  icon + label for active, grey for inactive. Labels ~10pt.

Feed sections in order (Main):
1. **Recently Played Stories**: small portrait covers (~48x72), rounded ~6,
   title under it in ~9pt grey, truncated ("START RAIL", "Lumencia...",
   "Edenbrook..."). No progress bar.
2. **Top Ranked** (with `>` chevron): portrait cards ~88x130, rank number in a
   small dark square top-left (1, 2, 3, 4), lime "ORIGINAL" chip top-right
   on OOC-made titles, plus a small "stack" icon (multi-image/"gallery"?) in
   the top-right corner. Under: title 2 lines ~12pt semibold white, then
   `48.6M·OOC` (plays · creator) ~10pt grey.
3. **Banner**: "Dice of Fate: A reverse Isekai / First AIRPG on OOC", full
   width, black card with glowing red dice art on the right, ~70pt tall,
   rounded ~10.
4. **Popular OOC Originals** (`>`): same card. ASHFORD 435.1K, Kicked Out of
   the S Rank Party but Even Better! 567.8K, Yokai Academy 199.5K, Devil
   Hunter 360K.
5. **New OOC Originals** (`>`): Seoul War 132.1K, I'm the Only Human in the
   Monster Academy 120.1K, Hunter Academy 117.6K, A Trash... Academy 99.6K.
6. **Trending Now** (`>`): ranked cards again (numbers 4, 5, 6, 7 visible):
   Human Transfer Student at Beastfolk Academy 99.2K, I Became the Oyabun of
   a Failing Yakuza 75K, Constellation The Ending War 65K, The Div... Wants...
   46.3K.
7. **Promo row**: "1,500 Credits for New Users / Complete the welcome
   mission, unlock more!" with a party-popper icon and `>`. Dark grey card,
   1px border.
8. **Trending New Creators** (`>`): THE GROOM WHO WAS REPLACED 32.5K
   BlakZeus, The Archmage Failed Kid 4.1K PandaBoy, Your Highschool Bully
   Needs a Place to Stay 22.6K BEEHGH.
9. **Tags**: chips `#Fantasy 🔍`, `#Romance 🔍`, `#Adventure 🔍`, `#Acti...`
   (hashtag + magnifier glyph, outlined capsule).
10. **New from certified creators** (`>`): ISEKAI AS A HERO THEN SEALED 1.7K
    KarmaMini, Pampering My Cat Girlfriend 969 Luxenz, My Second Life as an
    Adventurer 5.5K Fujihama, Since The Worlds... 1.9K.
11. **Explore**: infinite 3-column grid with a `Most Played ⌄` sort control.
    Cards ~98x148, same caption format. This is the full catalogue sorted by
    plays (see Top stories table).

Row count on Main: 10 horizontal rows/blocks, then the infinite grid.

### Home pill tabs (shots 12-31)

Full pill list, left to right (16): `Main`, `New Ranking`, `Rankings`,
`Today`, `Fantasy`, `Romance`, `Sci-Fi`, `History`, `Girls Love`, `Horror`,
`Oriental Fantasy`, `Slice of Life`, `Fan Fiction`, `Utility`, `Boys Love`,
`Others`. Trackpad horizontal scroll on the pill row did nothing; tapping a
pill near the edge auto-scrolls the row to center it.

Every non-Main pill shares one template:
1. **Hero carousel** (`1/6` counter top-right): one centered portrait cover
   (~148x220, radius ~6) over a heavily blurred, darkened copy of the same art
   that fills the top ~380pt. Below the cover: title ~18pt bold white,
   centered; when the slide changes, a one-line grey hook appears under it
   (e.g. "Sharing an apartment with the popular girl / Your roommate is the
   most popular girl in school"). Auto-advances (saw 2 different slides
   within ~1 min). Same 6 slides on every pill.
2. The pill row sits **under** the hero, then becomes sticky under the header
   once the hero scrolls away. The header has no background: art scrolls
   under "Story Character" and the icons (shots 13-15 show text over art).
3. Body: either `Top 100` + `Daily ⌄` / `All ⌄` dropdowns (New Ranking,
   Rankings), or `<Genre> OOC Originals` row + `Explore` grid with
   `Most Played ⌄` (genre pills), or just the Explore grid (Today, History,
   Horror, Fan Fiction, Utility, BL).
4. Grids are 3 columns, 98pt cards, 9pt gutters, 16pt side margins, rank
   number badge top-left on ranked tabs.

What each pill is:
- **New Ranking** (12-15): Top 100 of *recently launched* titles, ranked by
  recent velocity (rank 1 has 117.6K plays, rank 2 has 120.1K, so it is not
  sorted by totals). Almost all OOC Originals.
- **Rankings** (17-20): Top 100 daily over the whole catalogue. Old giants
  (Lumencia 48.6M) mixed with risers (Chronicle Hero Academy 499.7K at #12,
  Devil Hunter 360K at #14).
- **Today** (21-22): user-made stories published today, sorted by plays;
  counts are tiny (1.4K top). Heavy ex-girlfriend / revenge / CEO romance.
- **Romance** (24-25): "Romance OOC Originals" row (My High School Romance,
  LOOKISM Taste of Hierarchy, Gender-Reversed Campus Life 297.3K, "She Has
  Eyes on..." 729K), then Explore led by Lumencia, Sharing an apartment, OOC
  Fight Academy, LOOKISM, My High School Romance, Universe World Simulator.
- **History** (26): The Betrayal 5.2M Katzhen, Noxuria Academy (Academy of
  Villains) 253.6K Katzhen, Camelot 248.7K OOC.
- **Horror** (27): OOC High Zombie Apocalypse 1.9M, Monochrome City 1.4M,
  Zombie Apocalypse 308.2K Autistacrat.
- **Slice of Life** (28): its "Originals" row is the same academy/hero
  titles (Hero Academy Apex, Psychic Academy NOVA, Heros Chronicle) - genre
  tagging is loose.
- **Fan Fiction** (29): MHA A New Symbol 4.4M Mash10, My Hero Academia 1.4M,
  MHA Redux 846.6K, RWBY 682.3K, Jujutsu Kaisen 593.6K, Mushoku Tensei 519K.
  Covers appear to be official anime key art and screenshots.
- **Utility** (31): sandbox "story engines" rather than stories: WORLDLINE
  3.2M ("Any world. Any worldline. Bend the line."), Choose your Isekai
  52.2K, Cashback System 16.5K, Storylab 14.5K, Storyteller: Fantasy 12.6K,
  Living Forge 8.4K, Storyteller: Sci-fi. This is the closest thing on OOC
  to Plotbreak's "type anything" pitch.
- **Boys Love** (30): Hearts Under Your Command 287.4K, My Best Friend
  Became a Femboy 109.1K, My best friend turned me into a... 95.8K.

### Character tab (shots 32-34)

Same header, "Character" now white and "Story" grey. Differences from Story:
- Hero carousel is **square** art (~172x172, `1/3`), with character name
  ~18pt bold and a one-line grey hook: "Nezha / A defeated Fox-folk warrior,
  now bound as a slave".
- Fewer pills: `Main`, `Rankings`, `Today`, `Fantasy`, `Romance`, ...
- Main = `Tags` row (`#Romance`, `#Fantasy`, `#SliceOfLife`, `#Cut...`) then
  `Explore` (`Most Played ⌄`) as a **2-column grid of square cards**
  (~152x152, radius ~8). Caption: name 13pt semibold, a 2-line description
  in grey, creator name in darker grey. **No play counts** on this tab.
- Content is classic chatbot fare: Your New Stepsister "[UPDATE v2.2] Meet
  your new step sister" (AreYou), Adventure Awaits "You are the new recruit
  in the squad", MY ISEKAI LIFE "Choose the universe you wanna Isekai into",
  Bully Cheerleader "Bratty rich cheerleader bully who owns the school",
  Serena Sinclair "Forced to marry you, she treats you like nothing", Isekai
  Hero of Aeteria "Forge your own legend in the Kingdom of Aeteria".
- Read: Story is the product OOC is pushing (originals, ranks, counts);
  Character is the legacy c.ai-style shelf kept for UGC volume.

### Story detail: "Story Information" (shots 35-41, Hero Academy Apex)

Reached by tapping a hero-carousel slide (Hero Academy Apex, an OOC Original,
1.8M plays). Top to bottom:
1. Nav bar: `<` + "Story Information" (17pt semibold), thumbs-up (like)
   icon top-right. Under it two tabs: `Information` (active, white, 2pt white
   underline) / `Comments`.
2. Cover ~148x220 centered on a blurred copy of itself, lime `ORIGINAL`
   chip top-right of the cover.
3. **Free-message strip**: navy-tinted rounded bar (radius ~8): gift icon,
   "Free Messages **7 left**" (the "7 left" in lime), right side "Ends in 10
   days ⓘ". A per-story free quota with a deadline.
4. Title 17pt semibold + `⋮`. Creator chip `@ OOC` (grey fill, radius 4).
   Category chips with 1px border, radius 4: `Slice of Life`,
   `All-oriented`, `Simulation`.
5. `Description` block: one stat line with emoji icons "🖼×635 / ♀10 ♂5 +
   Supporting:17" (image count and cast size by gender), hashtags in grey
   (#superpower #hero #villain #academy #simulation #newYork), then the
   social line: plays 1.8M, likes 14.4K, comments 7.7K (small outline icons).
6. `Story Description`: creator-authored rich text, collapsed behind a full
   width `View All ⌄` bar. Expanded (40-41) it is a mini landing page: a
   banner image linking to an external wiki ("World Setting / Mastery System
   / Rank / Character Introduction / Map"), "BGM: Toggle ON/OFF from the
   top-right menu", a 20pt pitch ("New York in the age of superpowers... At
   its center stands Apex Academy. What will you become here?"), four role
   paths with red inline highlights (honor student / troublemaker / Hero /
   Villain), and a 2-column table: Images 635 total; Main NPCs (10 female, 5
   male, listed by name); Supporting NPCs.
7. `Setting`: **Avatar Settings** dropdown (the player persona, prefilled
   with the account persona) and **Start Settings** dropdown with three
   start modes: `Black Comedy Narration`, `Novel-Style Narration`,
   `Image Preview/World Chat` (shot 39). The creator ships several openings
   and tones; the player picks before starting.
8. `Prologue Preview`, collapsed with `View All`: "2026. New York City, where
   desire never sleeps. Twenty years ago, some flashy event called the 'Great
   Awakening' or whatever gave half of humanity superpowers..." (snarky
   second-person voice).
9. `Last Update 2026.11.21` (live-ops: the story is being updated).
10. `Comments 7701` with one preview comment and `View All >`. The preview
    says the Original is a localized port from **Crack**, the Korean site
    (Wrtn's platform) - OOC Originals are largely translated Korean hits.
11. Sticky bottom CTA: full-width white button, black "New Session" 14pt
    semibold, radius ~8, 44pt tall. White-on-black is the only high-contrast
    element on the page.

### History tab (shot 42)

A plain inbox: header keeps the "Story / Character" toggle, with pencil
(edit) and gear icons on the right. Rows ~55pt: cover thumb ~24x36 (radius
3), title 13pt semibold white, last line of the story in 11pt grey
truncated, date right-aligned in grey (`9/18/2026`). No unread dots, no
progress, no "continue" art. Rows: START RAIL x2 ("[The Departing Train of
New Beginnings]"), Lumencia Academy ("Take your time - this is the
foundation of yo..."), Edenbrook Scandal Arrogant Young Masters ("[ #2 |
2025.09.01 (Mon) | 08:48 AM | Edenbrook U..." - a status-header line).

### Play screen (shots 43-50, Lumencia Academy, read only)

- **Nav**: `<` + story title 15pt semibold; center-right a **model pill**
  (`🔴 Superb ⌄`, dark fill, radius 6) with a tooltip bubble "Default mode";
  hamburger on the right.
- **No chat bubbles.** The transcript is a full-width document on black,
  16pt side margins. Turns are separated by hairline dividers (#2a2a2a-ish).
  Narration is a **serif** face (Georgia-like) in mid-grey; dialogue and
  emphasis in white serif; headings are **sans** bold ("4. Any special
  traits or backstory details?" ~17pt, "Character Creation" ~22pt with an
  emoji). Player turns ("Wow this great") are plain white sans, no bubble,
  no avatar, between two dividers.
- **Images**: full-bleed 16:9 scene art inside the transcript. The opening
  image is a character card with the name plate baked into the art
  ("Student / Grade: 1st Year / Name: Mirabel / Personality: Mesugaki,
  Playful, Cheerful") inside an ornate thin frame.
- **Structured "game" text**: the first beats are a character-creation
  form: preset builds as blockquotes with a left rule ("⚔ The Balanced
  Swordsman / Knight Dept. | Commoner (Scholarship) / 🔮4 | ⚔6 | 🌟5 | 📘5 /
  A hard-working commoner with natural combat sense."), then "go completely
  custom" with a 20-point stat budget. The model is doing UI with markdown
  and emoji.
- **Per-message actions**: small 28pt circular outline buttons under each
  AI turn: image (generate/view scene image), regenerate, branch, `⋮`.
- **Input bar**: rounded field (radius ~10, dark grey) "What do you do?",
  then three circular icon buttons: `✱` (narration/action marker), `/`
  (commands), a "suggest" icon, and a **white square send button** with a
  black play triangle. Floating circular up/down "jump" buttons above it.
- **Model / cost picker** (47): bottom sheet listing tiers with a colored
  glyph, a one-line pitch and a credit cost per message: Max 195
  "Uncompromising realism", Apex 90 "Gripping, character-driven stories",
  Superb 90 "Best quality, most immersive" (default), Skillful 60 "Vivid and
  descriptive narratives", Extensive 60 "Strong details and long
  narratives", Basic 30 "Light and cheap".
- **Drawer** (48): credit balance top-right (the square glyph that is also
  the first icon in the Home header) showing `0`; session card with cover
  avatar and pencil; **Images 0/50** - a row of locked image tiles to
  collect in this story; Session Settings: Play Guide, Avatars, User Notes,
  Length & Depth, Writing Style, Memories, View Scene Image (toggle on);
  Starting Scenarios: Character Preview.

### My Titles tab (shot 51)

Creator workspace. Large title "My Titles" ~20pt bold. Pills `All` (active:
**white fill, black text**, a different active style from Home's lime
outline), `Story`, `Character`, `Unregistered`. Row "All" with `All ⌄` /
`Latest ⌄` filters. Empty state: big grey asterisk (OOC's mark), "Create your
own titles" 15pt bold, "You can create your own contents you wish to enjoy"
grey, white "Create a Title" button, plus a white circular `+` FAB
bottom-right.

### MY tab (shots 52-53) and shop (54-56), badges (57-58)

- **MY**: "MY" large title, gear top-right. Profile card (dark grey, radius
  ~10): asterisk avatar, display name, "Followers 0 · Following 0", `>`;
  inside the same card, credit glyph + balance `0` and a small white
  **Recharge** button. List groups with small grey section labels and
  outline icons: Service (Session Settings, Personalization, Favorites,
  Subscriptions, Manage Blocked Content); Benefits (Activity Badge, Referral
  Code); Certified Creator (Become a Certified Creator); Inquiries and
  Notice (Notice, Customer Support); Social Media (Discord, Reddit).
- **My Credit** (54, opened from Recharge, nothing tapped): balance card with
  `Credit History`; amber banner "Get the max bonus with Auto-Reload >";
  tabs `Buy Credits` / `Auto-Reload` / `Free Credits`. Radio-list of packs,
  each a dark card with 1px border, radius ~10: 2,000 = US$2.89; 10,000
  (+300 bonus, lime `Popular` tag, preselected) = US$14.49; 20,000 (+1,000)
  = US$28.49; 50,000 (+3,500) = US$71.00; 100,000 (+10,000) = US$142.99.
  White `Buy Now` and a dark `Save 20% on web` (steers to web checkout to
  skip Apple's cut).
- **Auto-Reload** (56): `Low Balance` / `Monthly`. "When my balance falls
  below [5,000] Credits, I'll be charged..." with ~20% cheaper packs
  (2,000 = $2.29, 10,000 = $11.49, 20,000 = $22.49) and chip rewards:
  green "First-time bonus +100", blue "5-reload streak bonus +300".
- **Free Credits** (55): "Daily check-in" chip, "Check in daily for 300
  Credits" with a small white `Check in` button (not tapped); Activity
  Badge "Earn badges and receive Credits"; Referral Code "Refer and earn
  Credits"; FAQ ("Credits are the items needed to use various modes...";
  no refunds).
- **Activity Badge** (57-58): achievements with **gacha rarity tags** (N, R,
  SR, SSR, SSSR) and a credit reward + progress bar each: Familiar Face (N)
  spend credits 3 days in a row, 250; Happy Spender (R) spend 5,000
  credits, 1,000; Superfan (SR) 100 messages in one session, 1,000; First
  Friend (N) gain 1 follower; Trainee (N) get 1 like; Thumbs Up! (N) like
  anything; My Two Cents (N) have 1 user try your content; Wanna Be
  Friends? (N) follow a creator; High Roller (SSR) buy 100,000 credits at
  once, 2,000; Millionaire (SSSR) buy 1,000,000 credits. A "Representative
  Badge" slot shows your proudest badge on your profile.

### Search (shot 64) and Notifications (62-63)

- **Search**: back chevron + rounded field with 1px light border "Search
  Stories or Characters". `Recent Searches` with removable chips ("Teen
  titan ✕") and `Delete All`. `Popular Searches`: a two-column ranked list,
  numbers 1-3 in lime, 4-10 grey: **1 EXPLICIT, 2 ISEKAI, 3 AIRPG, 4
  ACADEMY, 5 CHEATING, 6 BL, 7 GIRLFRIEND, 8 SAX (sic), 9 ROMANCE, 10
  BULLY**. No suggested stories or covers when the query is empty.
- **Notifications**: tabs `All / News / Like / Comment / Follow` (underline
  style). A card nags for push: "Please turn on device notifications. Get
  benefit and performance updates." with a white `Turn on` (not tapped).
  Empty state: megaphone glyph, "No notifications yet". News was empty too.

### Other screens seen

- **Lumencia Academy detail** (71-74), the #1 story: chips `150 images`,
  `Romance`, `Male-oriented`, `Simulation`; one-line description "An
  imperial academy of sword and sorcery", tags #academy #fantasy #harem
  #game #textGame #simulation; 48.6M plays, 130.1K likes, 169.9K comments.
  The creator text is a single sentence; the start mode is `Character
  Preview`. No free-message strip. Two CTAs side by side: dark `Continue
  Session` and white `New Session`. The top story sells on art, the image
  count and a game-like start, not on copy.
- **Rankings `All ⌄` filter** (76-78): `All` / `Female-Oriented` /
  `Male-Oriented`. Female-oriented #1 has 904.6K plays vs 48.6M for the
  overall #1: the audience is heavily male. (Filter set back to All.)
- **Dice of Fate: A reverse Isekai** (83-85), from the Main banner. A
  different, richer detail template: full-width key art with the logo
  baked in (~330pt tall, no card), title, 8 tag chips (Post-Apocalyptic,
  Text-Based, Hidden Race, Hidden Class, Character Growth, Isekai, AIRPG,
  Dimensional Travel), then **three equal stat tiles** (asterisk `Official`,
  book `airpg`, die `2d10`), a pitch and a long setup, and a white `Play`
  CTA. Pitch: "Introducing the first AIRPG on OOC! Become a Constellation.
  Watch over your character, intervene when it matters... Characters make
  their own choices, moment by moment. Your interventions and their
  decisions drive the story - and sometimes decide life or death." Setup is
  meta-fiction about the app: "August 2026. Every OOC user logged in at the
  same moment. The system overloaded - and a Dimensional Rift split open
  above New York City... The dice are rolling." **OOC is now shipping a
  dice-resolved RPG mode (2d10). That is Plotbreak's engine pitch.**
- **Welcome missions** (88): bottom sheet "Welcome Missions for You / 6
  Missions for **1,500 Credits!** / Use Credits to play stories and
  characters", credit-token illustration, `Challenge` button (not tapped).
- **Main, second visit** (81): the hero carousel also sits on top of Main,
  and a dismissible strip "Free Messages Are Back Through November 30 ✕"
  sits right under the pills.

## Design system read

**Color**
- Canvas near-black (~#121212), not pure black. Surfaces (cards, input,
  promo rows, list groups) one step up (~#1C1C1E) with a 1px border
  (~#2C2C2E). Text: white primary, ~#8E8E93 secondary, ~#5A5A5E tertiary.
- **One accent, used sparingly: acid lime (~#CCF33A).** It appears only on:
  the active home pill (outline + text on a near-black green fill), the
  `ORIGINAL` chip, popular-search ranks 1-3, "7 left", "1,500 Credits!",
  the `Popular` pack tag, and the small gift badge on event-eligible cards.
  Everything else is greyscale; all other color comes from cover art.
- Functional tints appear only inside monetization: amber banner (Auto-
  Reload), navy strip (free messages), green/blue bonus chips, rarity tags.
- Two "active" styles coexist: lime outline (Home pills) and white fill /
  black text (My Titles pills, primary buttons). Not fully consistent.

**Type**
- One geometric sans throughout the chrome (looks like Pretendard, the
  default for Korean apps). Rough scale: 20 bold (top-level header "Story",
  "MY", "My Titles"), 17-18 semibold (section titles, hero titles, nav
  titles), 13 medium (pills, list rows), 12 medium (card titles, 2 lines
  max), 10-11 regular grey (meta "48.6M·OOC", tab labels).
- The **play screen switches to a serif** for prose (~15pt, ~1.5 line
  height), keeps sans for headings and player turns. That is the only
  typographic personality in the app.

**Spacing and grid**
- 16pt side margins everywhere. Card gutters ~9-10pt. ~32pt between
  sections, ~12pt from section title to cards. Section title row has a
  right-aligned `>` chevron.
- Horizontal rows show 3.4 cards (the 4th is cut to signal scroll).
  Grids: 3 columns for stories, 2 for characters.

**Shapes**
- Story covers 2:3 portrait, radius ~6 (rows ~88x130, grid ~98x148, hero
  ~148x220). Character art square, radius ~8. Cards have no background or
  shadow: just the image plus text below.
- Pills: full capsules ~30pt tall. Category chips on detail: radius ~4,
  1px border. Buttons radius ~8, 44pt tall. Sheets: radius ~16 top corners
  with a grabber.

**Badges on covers**
- Rank: dark translucent square (~16pt) with a white numeral, top-left.
- `✱ ORIGINAL`: lime text on dark, top-right (first-party titles).
- Small "stack" glyph top-right on many titles (multiple covers/images).
- Small lime square gift glyph bottom-right (free-message event).
- Title art is baked into the cover image itself; the UI never overlays
  text on covers.

**Motion**
- Hero carousel auto-advances (`1/6` to `6/6`), the blurred background
  follows the slide, and the title + one-line hook fade under the cover.
- **Covers cycle in place.** The same card showed 2-3 different cover
  images within minutes (Hero Academia, I'm the Only Human..., A Trash
  Noble's...). Rows also reshuffle between loads (Popular OOC Originals had
  different titles on the second visit).
- **Counts are live.** Hunter Academy went 117.6K to 120.1K plays in ~15
  minutes; Trash Nobles 99.6K to 101.5K. The feed is visibly moving.
- Pills become sticky once the hero scrolls off. The header has no material,
  so art scrolls under it (looks unfinished, shot 13).

## What feels lively

- **Numbers on every card**: play count + creator on each cover caption,
  rank numerals on ranked rows, "Top 100", "Daily", 169,854 comments.
  Counts tick up between visits.
- **Many leaderboards, each slicing differently**: Top Ranked, Trending Now,
  New Ranking (velocity of new launches), Rankings (daily), Today (UGC
  published today), plus Female/Male filters. Something is always #1.
- **Creators are visible**: "Trending New Creators", "New from certified
  creators", creator handle on every card, Certified Creator program.
- **Live-ops on stories**: "Last Update 2026.11.21" on a 48.6M-play story,
  sequels (Reincarnated With an OP Skill 2), "[UPDATE v2.2]" in a
  character's tagline, per-story free-message windows with a countdown.
- **Motion without effort**: auto carousel, rotating covers, live counts.
- **Events with deadlines**: "Ends in 10 days", "Back Through November
  30", welcome missions, daily check-in, rarity badges.
- **Starts are designed**: Lumencia opens with a framed character card
  (name plate baked into the art) and a stat-allocation character builder;
  Hero Academy Apex offers 3 start modes and 4 role paths.

## What is generic or boring

- **One template for everything.** 16 pills, all the same: hero carousel,
  then rows or a 3-column grid of identical portrait covers. Genre pages
  differ only by which covers load. Slice of Life shows the same hero
  academy titles as Fantasy.
- **The chrome has no identity.** Grey type on near-black, a lime accent,
  outline icons. Remove the covers and it could be any dark-mode content
  app. The brand lives only in the asterisk glyph.
- **Covers are interchangeable.** Front-facing anime girl, big chest,
  title text in a generic fantasy font. At thumbnail size you cannot tell
  Hero Academia from APEX Heroes Academy from Hero Academy Apex.
- **Titles truncate** ("Im the Only Human in the Monster A...") because
  captions are 2 lines at 12pt; the hook never shows on rows.
- **Detail page is a form**: dropdowns for persona and start mode,
  repeated `View All ⌄` bars, a creator-written HTML-ish description with
  inline red highlights and a table. Quality depends entirely on the
  creator.
- **History is a bare inbox**: thumbnail, title, last line, date. No sense
  of where you are in a story, no "continue" moment, no art.
- **Social numbers are farmed.** Comments on Lumencia are "All x all",
  "FollowxFollow", "Please like my comment for credits" - a side effect of
  badges that pay credits for likes and follows.
- **Play screen** is clean but plain: a document on black with hairline
  dividers; player turns have no styling at all. Generic markdown (emoji
  headers, blockquotes) is doing the game UI.
- Header without background lets art collide with "Story / Character" on
  scroll.

## Top stories and tropes

Rank keys: **E** = Explore grid sorted by Most Played (all-time plays),
**R** = Rankings Top 100 Daily, **N** = New Ranking Top 100 Daily, **F** =
Rankings filtered Female-Oriented, **T** = Trending Now row. "Orig" = OOC
Original (first-party, often localized from Crack, the Korean platform).
Plays as shown on 2026-11-21. Hooks in quotes are OOC's own copy; the rest
are read from the title and cover.

| Title | Where / rank | Plays | Creator, tags | Hook |
|---|---|---|---|---|
| Lumencia Academy | E1, R1 | 48.6M | Orig; Romance, Male-oriented, Simulation; #academy #fantasy #harem #game #textGame; 150 images | "An imperial academy of sword and sorcery." Stat-allocated student enters a harem academy |
| Hero Academia | E2, R4 | 21.6M | Orig; Fantasy | Superpower hero academy (MHA-style) |
| Reincarnated With an OP Skill | E3, R3 | 20.7M | Nuzelle (UGC) | Reborn in another world with a cheat skill; status window on the cover |
| Isekai Gone Wrong | E4, R10 | 8.2M | DOO (UGC) | Isekai with a female ensemble |
| Psychic Academy NOVA | E5, R8 | 7.8M | Orig; Slice of Life | Psychic-powers academy |
| APEX Heroes Academy | E6, R7 | 7M | GlizzyMaster; Sci-Fi | Hero academy, power-suit heroine |
| Reincarnated With an OP Skill 2 | E7 | 5.9M | Nuzelle | Sequel to #3 |
| Titan Academy | E8, R13 | 5.3M | GlizzyMaster | Mecha pilot academy |
| The Betrayal | E9, R6 | 5.2M | Katzhen; History | Betrayed knight, medieval revenge |
| Sharing an apartment with the popular girl | E10, R2, hero 3/6 | 4.7M | Johnnyboy; Romance | "Your roommate is the most popular girl in school" |
| OOC Fight Academy | E11 | 4.6M | Orig; Romance | Fighting high school (Lookism-like) |
| Relic Academy | E12, R11 | 4.2M | Kaiserr431 | Academy of relic weapons |
| Choose Your Anime Isekai | E13 | 4.1M | SkyHeart | Pick which anime world to drop into |
| Astra Chronicles | E14 | 3.9M | Orig; medieval fantasy | Gothic medieval fantasy |
| ACADEMIA I MY HEROES | E15, R15 | 3.7M | Orig | Another MHA-style hero school |
| LOOKISM Taste of Hierarchy | E16 | 3.4M | Orig; Romance | School looks/status hierarchy |
| My High School Romance | E17, R9 | 3.4M | Orig; Romance | Three heroines, school romance |
| WORLDLINE | E18 | 3.2M | Orig; Utility | "Any world. Any worldline. Bend the line." |
| Universe World Simulator | E19 | 2.8M | Orig; Romance/Utility | "Enter every world you imagine" |
| Heros Chronicle | E20, R16 | 2.6M | Orig; Slice of Life | Fox-girl hero chronicle |
| SOVEREIGN | E21 | 2.3M | Orig | Military/sovereign power fantasy |
| The time I got reincarnated as a monster | E22 | 2.2M | GrumpyGoose | Reborn as a monster (Slime-like) |
| A Free Life in Isekai | E23 | 2.1M | Smitty | Slow-life isekai |
| OOC High Zombie Apocalypse | E24 | 1.9M | Orig; Horror | Zombie outbreak at school |
| ISEKAI IN ANOTHER WORLD | E25, R18 | 1.9M | Mrcream | Card/tarot isekai |
| Hero Academy Apex | E26, R5, hero 1/6 | 1.8M | Orig; Slice of Life, All-oriented, Simulation; 635 images, 15 main NPCs | "New York in the age of superpowers... What will you become here?" Hero, Villain, honor student or troublemaker |
| HUNTERS | E27 | 1.7M | Orig | Gate/hunter (Solo Leveling-like) |
| Iron Fist Academy | E28 | 1.5M | Orig | Martial-arts delinquent school |
| Became the Only Male Student at the Witch Academy | E29 | 1.5M | Orig | Only boy at a girls' magic school |
| Dating the Strongest Hero | E30 | 1.5M | PizzaEater9 | Romance with the top hero |
| Monochrome City | E31 | 1.4M | Orig; Horror | Noir horror city |
| My Infinite Skill Draft Broke the... | E32 | 1.3M | DrippyIce | Pick-your-skills system |
| My high school love life | E33 | 1.3M | Johnnyboy | School romance (bunny-girl cover) |
| Failed Knight of the Swordsmanship Family | E34 | 1.2M | Orig | Failed heir of a sword clan |
| Merit Supremacy | E35 | 1.2M | Orig | Merit-ranked school |
| I Was Summoned With 3 SSS Rank Abilities | E36 | 1.1M | PlayerTfbLsA | Summoned with three SSS skills |
| MHA A New Symbol | Fan Fiction #1 | 4.4M | Mash10 | My Hero Academia fan fiction |
| Class X I Villain Academia | R21 | 975K | Babble | Villain-side hero academy |
| Was School Easy | F1 | 904.6K | Orig; female-oriented | Female-oriented school drama |
| Kicked Out of the S Rank Party but Even Better! | Popular Originals | 567.8K | Orig | Exiled from the party, comes back stronger |
| Chronicle Hero Academy | R12 | 499.7K | Orig; Fantasy | Riser: yet another hero academy |
| The World I Burned to Make You Mine | F4 | 485.1K | Orig; female-oriented | Obsessive male lead |
| ASHFORD | Popular Originals, R23 | 435.1K | Orig | Gothic noble academy |
| Chronicles of Murim Heroes | Oriental Fantasy #1 | 429K | Orig | Murim martial-arts world |
| Devil Hunter | R14 | 360K | Orig | Devil-hunting dark fantasy |
| Wildbound | F7 | 298.4K | LemBerry | Beastmen captors |
| Gender-Reversed Campus Life | Romance Originals | 297.3K | Orig | Gender-swapped campus |
| Hearts Under Your Command | Boys Love #1 | 287.4K | SmvtLoverXD | BL, commanding male lead |
| But I Am a Zombie | Sci-Fi | 267.8K | Orig | You are the zombie |
| The Hero Who Came to Kill Me Fell for Me Instead | F3 | 191.2K | Orig; female-oriented | Assassin-turned-lover |
| The Return of the Heavenly Demon | Oriental Fantasy | 190K | Orig | Murim regression |
| Seoul War | New Originals, R20 | 132K | Orig | "The Transferees' war begins in Seoul." |
| I Can See the Unconquerable Mastermind's Status Window | F6 | 121.9K | Orig; female-oriented | Status window on the love interest |
| I'm the Only Human in the Monster Academy | N2, T2, R19 | 120.1K, 121.9K 15 min later | Orig | Lone human among monster girls |
| Hunter Academy | N1, T1, R17 | 117.6K, 120.1K 15 min later | Orig | Hunter school |
| A Trash Noble's Academy Survival | N3, T3, R22 | 99.6K, 101.5K 15 min later | Orig | Trash-noble survival at academy |
| Human Transfer Student at Beastfolk Academy | N4, R24 | 99.2K | Orig | Lone human at a beastfolk school |
| I Became the Oyabun of a Failing Yakuza | N5 | 75K | Orig | Inherit a failing yakuza clan |
| Constellation: The Ending War | N6 | 65K | Orig | Constellation (ORV-style) war |
| Eclipse Academy | N9 | 55.7K | Orig | Elf/demon academy |
| War of Heaven and Earth | N8 | 51.7K | Orig | Celestial war |
| Day 2222 in Hiding: Someone Get Me Out | N10 | 48K | Orig | Trapped and hiding for years |
| The Divorcée Wants to Be the Top Idol Again | N7 | 46.3K | Orig | Comeback idol after divorce |
| How to Live as a Vampire in the 21st Century | N11, F2 | 38.2K | Orig | Modern vampire life |
| THE GROOM WHO WAS REPLACED | N13, Trending New Creators | 32.5K | BlakZeus | Replaced at the altar |
| Your Highschool Bully Needs a Place to Stay | N15 | 22.6K | BEEHGH | Bully moves in with you |
| I Saw My Childhood Friend Working at a Maid Café | hero 6/6, F5 | 17.6K | Orig; female-oriented | "My childhood friend, a maid?!" |
| Dice of Fate: A reverse Isekai | Main banner | n/a | Official; AIRPG, 2d10 | "Become a Constellation. Watch over your character, intervene when it matters." |

Today's UGC shelf (all < 1.5K plays): My Ex Moved In; High School DxD
Reborn; Came Back Only to Find Out She's Moved On; Zero to Hero: A Summer
Revenge Story; Baki Reborn; The CEO Who Betrayed Me; My Ex Girlfriend Moved
in Next Door; She Thinks I Am in Love With Her; Reverse World; The Goddess
Wants To Marry Me; The Prince They Forgot to Kill; My Maid Became My Wife
Overnight.

### Tropes that repeat (by evidence)

1. **Academy / school as the container** - by far the strongest. 14 of the
   top 36 all-time titles have Academy/Academia/High School in the title
   (Lumencia, Hero Academia, Psychic Academy NOVA, APEX Heroes, Titan, OOC
   Fight, Relic, ACADEMIA I MY HEROES, My High School Romance, OOC High,
   Hero Academy Apex, Iron Fist, Witch Academy, My high school love life),
   and so do 6 of the top 16 New Ranking titles (Hunter, Monster, Trash
   Noble's, Beastfolk, Eclipse, Korea Spirit). "ACADEMY" is the #4 search.
2. **Superpower hero academy (MHA-shaped)** - at least 8 titles: Hero
   Academia 21.6M, APEX Heroes 7M, ACADEMIA I MY HEROES 3.7M, Hero Academy
   Apex 1.8M, Psychic Academy NOVA 7.8M, Chronicle Hero Academy, Class X
   Villain Academia, plus MHA fan fiction at 4.4M. Hero vs Villain choice.
3. **Isekai / reincarnation with a cheat skill or status window** -
   Reincarnated With an OP Skill 1+2 (26.6M combined), Isekai Gone Wrong
   8.2M, Choose Your Anime Isekai, reincarnated as a monster, SSS Rank
   Abilities, Infinite Skill Draft, Unlimited Potential. "ISEKAI" is the #2
   search.
4. **Harem / lone male among many women or monsters** - Lumencia
   (#harem), Only Male Student at the Witch Academy, Only Human in the
   Monster Academy, Human Transfer Student at Beastfolk Academy, My High
   School Romance.
5. **Forced proximity romance** - Sharing an apartment with the popular
   girl (#2 daily), Your Highschool Bully Needs a Place to Stay, My Ex
   Moved In, Ex Girlfriend Moved in Next Door, Maid Became My Wife
   Overnight, Serena Sinclair "Forced to marry you".
6. **Betrayal / cheating / revenge** - The Betrayal 5.2M, Kicked Out of
   the S Rank Party, The Groom Who Was Replaced, Traitor Girlfriend, The
   Hero Cheated on Me, The CEO Who Betrayed Me, Came Back Only to Find
   She's Moved On. "CHEATING" is the #5 search.
7. **Korean web-novel stock**: failed/trash heir (Failed Knight, Trash
   Noble's Academy Survival, Trash Young Master), hunters and gates
   (HUNTERS, Hunter Academy, Seoul War), constellations (Constellation: The
   Ending War, Dice of Fate), murim and regression (Murim Heroes, Return of
   the Heavenly Demon), Lookism hierarchy.
8. **Nonhuman girls** - monster, beastfolk, fox, yokai, vampire, elf
   (Heros Chronicle, Yokai Academy, Wildbound, Eclipse Academy).
9. **Bully / school hierarchy** - LOOKISM, OOC Fight Academy, Iron Fist,
   Your Highschool Bully, Bully Cheerleader. "BULLY" is #10 search.
10. **Sandbox / simulator / choose-your-world** - WORLDLINE 3.2M, Universe
    World Simulator 2.8M, Choose Your Anime Isekai 4.1M, the whole Utility
    pill, "Simulation" tags on the top titles, and "AIRPG" is the #3
    search. Players want systems, not only scenes.
11. **Zombie / apocalypse survival** - OOC High Zombie Apocalypse 1.9M,
    Zombie Apocalypse 308K, But I Am a Zombie 268K, Dice of Fate.
12. **Female-oriented (much smaller)**: dangerous or obsessive male lead
    (The World I Burned to Make You Mine, The Hero Who Came to Kill Me Fell
    for Me, Your Dad's Friend, That Punk, vampire). Female #1 is 904.6K vs
    48.6M overall.
13. **Gender-bend** - Gender-Reversed Campus Life, From Guy to Lady Killer
    Tomboy, My Best Friend Became a Femboy, Wait You're All Girls.

What wins at the top is not a premise but a **system wrapped in a school**:
stats, ranks, roles to pick (hero/villain), a big named cast (Apex lists 15
main NPCs and 635 images; Lumencia 150 images), and a designed first beat.

## Monetization and return hooks

- **Credits, pay per message.** The cost depends on the model tier picked in
  the chat header: Basic 30, Skillful 60, Extensive 60, Superb 90 (default),
  Apex 90, Max 195 credits per message. Packs: 2,000 = $2.89; 10,000+300 =
  $14.49 (Popular); 20,000+1,000 = $28.49; 50,000+3,500 = $71.00;
  100,000+10,000 = $142.99. At the 10K pack 1 credit is ~$0.0014, so a
  default Superb message costs ~$0.13, Basic ~$0.04, Max ~$0.28.
- **Discount levers**: Auto-Reload (charge when balance < 5,000; ~20%
  cheaper packs; "First-time bonus +100", "5-reload streak bonus +300"),
  and "Save 20% on web" under Buy Now.
- **No subscription seen.** "Subscriptions" on MY means following series
  for updates, not a membership.
- **Free messages as events**: a per-story quota ("Free Messages 7 left,
  Ends in 10 days") on Originals, flagged by a lime gift badge on covers,
  plus a site-wide strip "Free Messages Are Back Through November 30".
- **Daily check-in**: 300 credits a day (about 3 default messages).
- **Welcome missions**: 6 missions for 1,500 credits, promoted inline in the
  Main feed.
- **Activity badges with gacha rarity** (N / R / SR / SSR / SSSR), each
  paying credits: spend 3 days in a row (250), spend 5,000 (1,000), 100
  messages in one session (1,000), social actions (250 each), buy 100K
  credits at once (2,000). A representative badge shows on the profile.
- **Referral code** for credits.
- **Per-story image collection**: "Images 0/50" locked tiles in the chat
  drawer; detail pages advertise image counts (150, 635).
- **Story live-ops**: "Last Update" dates, sequels, "[UPDATE v2.2]".
- **Push**: notification opt-in card "Get benefit and performance updates";
  tabs for News, Like, Comment, Follow.
- **Creator loop**: My Titles, Certified Creator program, creator names on
  every card, followers/following; Discord and Reddit links on MY.

## Shots in this folder

| File | What |
|---|---|
| `shots/01-home-top.png` | Home Main: header toggle, pills, Recently Played, Top Ranked, AIRPG banner |
| `shots/03-home-s2.png` | New OOC Originals, Trending Now (ranked), 1,500-credit promo row |
| `shots/06-home-explore.png` | Explore 3-col grid, Most Played |
| `shots/12-new-ranking.png` | Pill-page template: blurred hero carousel 1/6, Top 100 + Daily/All |
| `shots/13-new-ranking-2.png` | Ranked grid; header with no background over art |
| `shots/31-utility-pill.png` | Utility pill: sandbox "story engines" (WORLDLINE etc.) |
| `shots/33-character-explore.png` | Character tab: 2-col square cards, no counts |
| `shots/35-story-detail-apex.png` | Story Information: cover, free-message strip, chips, stats |
| `shots/41-detail-description-2.png` | Creator rich description: role paths + NPC table |
| `shots/43-play-lumencia.png` | Play screen: no bubbles, serif prose, input bar, model pill |
| `shots/46-play-lumencia-start.png` | Opening: framed character card image |
| `shots/47-model-picker.png` | Model tiers with credit cost per message |
| `shots/48-chat-menu.png` | Chat drawer: balance, Images 0/50, session settings |
| `shots/54-shop.png` | My Credit: packs and prices (nothing tapped) |
| `shots/57-activity-badge.png` | Badges with N/R/SR rarity and credit rewards |
| `shots/64-search.png` | Search: popular searches top 10 |
| `shots/74-lumencia-comments.png` | Comment farming ("FollowxFollow") |
| `shots/77-rank-female.png` | Rankings filtered Female-Oriented |
| `shots/83-dice-of-fate.png` | Dice of Fate AIRPG: 2d10, Constellation pitch |

Not reached: the Home header's first icon (same glyph as the credit
balance, so most likely the shop; not opened to avoid a second shop visit),
the `Others` and `Fantasy` Explore grids beyond the first row, the Comments
tab beyond the first three, and actual turn-by-turn play (sending was out of
scope).
