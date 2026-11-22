# Design v2 — competitor UI research

Gathered 2026-11-21 for the redesign board ("make the app feel ALIVE": a home
you want to scroll, fresh content every visit, social proof). Evidence only, no
design. Everything is observed unless marked **[inference]**. OOC's creation
flow is out of scope here; see `docs/create/ooc-teardown.md`.

Screenshot files live in the session scratchpad (see §4 for the index):
`/private/tmp/claude-501/-Users-omarlahmimi-Documents-Plotbreak/a56cf246-254f-48ba-9b87-82044993a208/scratchpad/research/<app>/`.
The scratchpad can be wiped on reboot; copy any you want to keep.

---

## 1. Mobbin verdict

**Yes — there is an official Mobbin MCP server (and a REST API).** Nothing was
installed.

- Endpoint: `https://api.mobbin.com/mcp` (remote, Streamable HTTP, OAuth
  sign-in with your Mobbin account in the browser; no API key). Launched
  2026-05-11 (Business Wire press release, "621,500 real app screens").
- Plans: **Pro, Team, Enterprise** (paid only). Rate limit 60 req / 60 s / user.
- Tools: `search_screens`, `search_flows`, `search_sections` (natural-language
  search, returns screen images), plus `list_collections`,
  `get_collection_contents`, `create_collection`, `save_content`, `add_comment`.
- Official repo: https://github.com/mobbin/mobbin-mcp-server (under the
  `mobbin` GitHub account, About: "Official Mobbin MCP server repository"; it
  only documents the endpoint and points at the docs).
- Install for Claude Code, verbatim from
  https://docs.mobbin.com/mcp/clients/claude-code-cli:
  - Recommended: add the verified **Mobbin connector** in Claude Desktop/Web
    first, then in the CLI `claude /login` (same Claude account, not an API
    key) and `claude /mcp` to confirm Mobbin is listed.
  - CLI-only ("not recommended" by Mobbin):
    ```
    claude plugin marketplace add mobbin/skills
    claude plugin install mobbin@mobbin
    ```
    then `claude /mcp` → select `plugin:mobbin:mobbin` → Authenticate.
  - A search snippet attributes `claude mcp add mobbin --scope user --transport
    http https://api.mobbin.com/mcp` to mobbin.com/mcp; the fetched page did not
    show it, so treat it as unverified (it is the generic remote-server form).
- REST API: exists, **Team & Enterprise only**, Bearer API key scoped to a
  workspace; quickstart at https://docs.mobbin.com/api/quickstart.md.
- Other sources: https://mobbin.com/mcp, https://docs.mobbin.com/mcp/introduction,
  https://docs.mobbin.com/mcp/features.
- **Unofficial**: `pdcolandrea/mobbin-mcp` on GitHub (reverse-engineered
  internal endpoints; archived, its author now points to the official server).
  Also listed on glama.ai, a2a-mcp.org, composio.dev, chatforest.com
  (directories/wrappers, not Mobbin).

---

## 2. Apps

### 2.1 OOC — "The Playable Anime" (main competitor)

Sources:
- Website, logged out, desktop width: https://ooc.ai (Story home, chips Today /
  Rankings / New Ranking / Romance, Character home, Story Information modal),
  browsed 2026-11-21 in Chrome.
- iOS App Store: https://apps.apple.com/us/app/ooc-the-playable-anime/id6761247061
  — 14,290 ratings, 4.63★, v0.1.30 (2026-11-16), 17+, seller New AI
  Entertainment Inc. 5 screenshots.
- The web bundle's English locale files (`cdn.ooc.ai/.../static/js/async/*.js`,
  public static assets the site loads) for onboarding, credits and home copy.
  API client field names (`wrtn-user-id`, `wrtn-uid`) show OOC is built by
  **Wrtn** (the Korean company behind "Crack"); the locale even has a `"Crack"`
  key. **[inference]** OOC is Wrtn's global port of Crack, which explains how
  mature the growth mechanics are for a v0.1 app.

#### Home structure (web, Story tab, logged out), top to bottom

1. **Notification bar** (dismissable, full width, top): "Notifications · Free
   Messages Are Back Through November 30 ›". A dated promo = freshness + urgency.
2. **Hero carousel**: left = big title (e.g. "Seoul War") + one-line hook ("The
   Transferees' war begins in Seoul.") + white `Explore` pill; right = the cover
   (2:3) stacked over the neighbours' covers like a deck. Auto-rotates
   (Hero Academy Apex → Seoul War → The Betrayal seen within a minute).
   Prev/next arrows. **Every chip has its own hero carousel** (Today's hero was
   a brand-new story; Romance's hero was a romance Original).
3. **Chip row** (horizontally scrolling, outlined pills, active = lime outline +
   lime text): `Main · New Ranking · Rankings · Today · Fantasy · Romance ·
   Sci-Fi · History · Girls Love · Horror · Oriental Fantasy · Slice of Life ·
   Fan Fiction · Utility · Boys Love · Others` (16 chips).
4. Rows on `Main` (each: title left, `View All ›` right, horizontal scroller):
   | # | Row title | Card | Count loaded |
   |---|---|---|---|
   | 1 | **Top Ranked** | 2:3 cover, **rank number badge** top-left (1–20) | 20 |
   | — | **Wide promo banner** (not a row): "Dice of Fate: A reverse Isekai · First AIRPG on OOC", black strip with glowing red dice art on the right | — | 1 |
   | 2 | **Popular OOC Originals** | 2:3 cover + `*ORIGINAL` badge | 20 |
   | 3 | **New OOC Originals** | same | 30 |
   | 4 | **Trending Now** | rank badge 1–10 | 10 |
   | 5 | **Trending New Creators** | 2:3 cover, UGC | 14 |
   | 6 | **Tags** | chip row: #Fantasy #Romance #Adventure #Action #Isekai #Magic #SliceOfLife #Comedy #Horror #Simulation #Thriller (each with a 🔍 glyph) | 11 |
   | 7 | **New from certified creators** | 2:3 cover | 15 |
   | 8 | **Explore** — a 6-column **grid**, not a row, with a sort dropdown `Most Played ▾` | 2:3 cover | 50+ (paged) |
   So: 7 rows + 1 banner + 1 tag strip + an endless grid. ~6 covers visible per
   row at 1512px; the iOS app shows **3 per screen width** (see ooc-03).
5. Footer.

Other chips:
- **Today** — hero + straight into `Explore` grid of stories **published
  today**, sorted Most Played (top had 1.2K plays, the tail had 0 — "white"
  ×6, "yes", "Hhhh"). Raw, unmoderated freshness. **[inference]** It makes the
  shelf look different every single day for free.
- **Rankings** — `Top 100 (?)` grid with rank badges, a period dropdown
  **Daily / Weekly / Monthly** and an audience filter `All ▾`. Locale copy says
  when it resets: "Daily: Every night at 12 AM · Weekly: Every Friday night at
  12 AM · Monthly: Last day of each month at 12 AM" under "Popularity Ranking
  Update Time". A visible reset schedule is a reason to come back.
- **New Ranking** — same Top 100 UI but only for new stories (#1 had 115K
  plays vs 48.5M on the all-time list) — gives new titles a leaderboard they
  can actually top.
- **Genre chip (Romance)** — hero + `Romance OOC Originals` row (20) + `Explore`
  grid Most Played. The genre chips reuse one template.

Character tab (web): same hero carousel + chips (`Main · Rankings · Today ·
genres…`) + `Tags` (#Romance #Fantasy #SliceOfLife #Cute #Adventure #SlowBurn
#Tsundere #Yandere) + `Explore` grid. Character cards are **1:1 square** with
name, a **two-line hook in second person** ("Your best friend's little
sister.", "Your school bully and you stuck in the elevator") and `@creator`.
No counts on character cards.

#### Card anatomy (story)

- 2:3 portrait cover, ~12px rounded corners, title **baked into the art**
  (every cover has its own logo-type title).
- Overlays: rank number in a dark square top-left (ranked rows only);
  `*ORIGINAL` lime-asterisk badge top-right for house content; a small
  "multi-image" glyph top-right on stories that have image galleries.
- Under the cover: title (2 lines max, white, ~16px) and
  **`48.5M · OOC`** = play count (compact) · creator name, grey.
- No likes, no genre on the card. The play count is the one number.

#### Story detail (web: "Story Information" modal; app: page)

- Cover left (with badge), right column: title, 👍 like and ⋯ menu, creator
  chip `◎ OOC`, attribute chips `150 Images · Creator Custom Prompt ·
  Male-oriented · Romance`, one-line hook, hashtags (#academy #fantasy #harem
  #game #textGame #simulation), then **three counters: plays 48.5M · likes 130K
  · comments 169.7K**.
- Sections: Story Description → **Settings** (Avatar Settings dropdown,
  **Starting Scenarios** dropdown — pick your opening) → **Prologue Preview** /
  **Character Preview** (big landscape character cards with a game-UI nameplate:
  "Student · Grade: 2nd Year · Name: Lucia · Personality: Arrogant, Haughty,
  Irritable"), `View All` → **Last Update 11/21/2026** → **Comments 169.7K**
  with `View All ›` and a preview comment ("Please like my comment for
  credits").
- Sticky footer: one white `New Play` button.

#### Play screen (app screenshot ooc-02)

- Header: `‹ Crimson Oratorium` + model picker pill (`Superb ▾`) + ☰.
- Full-width scene illustration on top, then the narration in a **serif**
  (Lora, confirmed in the web font list) on dark.
- Below the beat: **3 suggested next lines**, each a dark row with an ✏️ edit
  button on the left and an ↑ send on the right (tap to send as-is, or edit
  first).
- Composer: floating rounded box with the typed line in quotes, `*` (action /
  narration toggle **[inference]**) and a "magic" suggestions button, white
  square send.

#### Social proof

- Play counts on every card (compact: 48.5M, 567K, 1.2K, 0).
- Rank badges on two rows + a Top 100 with Daily/Weekly/Monthly.
- "Trending New Creators", "New from certified creators", "Official Creator"
  label, `@handle` on character cards, follow creators (App Store copy).
- Detail page: plays + likes + comments, comment count is huge (169.7K) and
  comments are visible before you play.
- Creators can be **gifted credits** ("Gift Credits", fee 10% creator / 30%
  non-creator) — sponsorship as social proof.

#### Freshness devices

- Dated notification bar ("Free Messages Are Back Through November 30").
- `Today` chip = today's uploads; `New Ranking`; `New OOC Originals` (30);
  `Trending Now`; hero carousel that changes per chip.
- "Last Update" date on detail pages.
- Ranking reset times published (daily 12 AM, weekly Friday, monthly last day).
- Wide event/promo banner between rows ("First AIRPG on OOC").

#### Retention hooks (from locale strings + UI)

- **Welcome Missions** — a 6-step newbie checklist, "6 Missions for 1,500
  Credits!", toast on each step ("Mission Stage {n} Successful!"). Steps seen
  in copy: *Browse Monthly Rankings* · *Send your first message* ("Pick a
  story/character, send your first message.") · *Play a story/character and
  spend {n} Credits* ("Consume 250 credits") · ***Play a story/character again
  after midnight*** ("Play again tomorrow", "You'll be able to complete this
  mission after midnight.") · *Visit Personalization Settings*. The day-2
  return is literally a mission.
- **Daily check-in** for credits ("Check in to receive {n} Credits", "Check-in
  Credits added! Usable until {date}"), with an attendance-driven
  recommendation ("How about this story today?").
- **Free credits expire in 30 days**; creator bonus credits in 90 days.
- Sign-up bribe: "Sign up and get 500 credits!" tooltip pinned over the
  sign-in buttons on every logged-out page.
- Monetization streaks: Auto-Reload with "2-reload streak bonus", "5-reload
  streak bonus".
- Referral program (code within 24h of signup).
- Liked titles collect in My Titles ("Like a title to collect your preferred
  titles here").

#### Onboarding (from locale strings)

Name ("What should characters call you?") → birth date / 18+ gate → "Choose
genres you are interested in" → "Want to filter by audience?" ("Select the type
of content you'd like to see") → "Here are some titles picked for you. All set!
Choose a title and play now." Plus a `/stories/recommendations/newbie` feed for
new users and the Welcome Missions above. Logged-out web users can browse
everything; only playing/credits need auth.

#### Visual style

- Near-black `#121212`, white type (Inter), serif (Lora) for story prose,
  **one accent: acid lime** (`*` logo, active chip outline, ORIGINAL badge,
  Publish button). Covers supply all the colour.
- Dense: on desktop 6 covers per row, 7 rows + grid; tight 16px gutters.
- App bottom tabs: Home · History · My Titles · MY. Top of Home: `Story |
  Character` segmented text tabs + 🎁(?) gift/credits icon, 🔔, 🔍 (ooc-03).
- App home rows seen: **"Selected for You"** (WORLDLINE 1.3M, All In Hero 567K,
  Monochrome City 97K) and **"Unique and Special, OOC Original"**; chips `Main ·
  Ranking · Today · Fantasy · Roman…`.
- Motion **[inference]**: auto-rotating hero; stacked-deck hero cover.

---

### 2.2 Character.AI

Source: https://apps.apple.com/us/app/character-ai-chat-talk-text/id1671705818
— 561,877 ratings, 4.26★, v1.17.4 (2026-10-02). 8 screenshots (iOS, App
Store). Marketing claim on shot 1: "#1 ai chat app · 100M+ trusted downloads".

#### Home structure

Two homes, both visible in screenshots:
1. **`For You` feed (characterai-01/07)** — a **vertical, full-bleed, swipeable
   card feed** (TikTok-style). Header: "For You" + three icons (c.ai credits
   **[inference]**, 🔍, 🔔). Each post is a **moment from someone's chat**: a
   tall illustrated image (≈3:4, rounded), a caption bar "Continue this moment
   in chat" over the image, the creator row (avatar, `Wailoaoa @wailoaoa`,
   share, ⋯), a caption ("season finale energy. hold on to your cloaks ma… More"),
   **timestamp "23 mins ago"**, and a row of **emoji reaction chips with counts**
   (8.7k · 2.7k · 444 · 148 · …) plus an add-reaction button. Pagination dots
   under the card (a post can be a carousel).
2. **Browse grid (characterai-06)** — header `(c.ai)` wordmark + 3 icons;
   **category chips**: `Creative · Fantasy · Gaming · Lifestyle · H…` (active =
   white filled pill); **2-column grid** of character cards.

Bottom tab bar (5): Home · Chats · ➕ Create · Library/Feed **[inference]** ·
Profile avatar.

#### Card anatomy (browse grid)

Square-ish image (≈1:1, rounded top), dark card body with **name** (bold),
**2-line description** ("His drawings come to life and makes things a little
crazy"), **💬 chat count** (27.8k, 19.7k, 61.6k, 336.1k), and the
**`@creator` handle under the card**. 2 cards per row, ~2.5 rows per screen.

#### Chat screen (characterai-05/08)

- Header: ‹, avatar + name ("Cool Seatmate"), and 3 icons (memory/notes,
  voice, call).
- **Custom chat background** (a full scene image behind the bubbles,
  "customize your chats").
- AI bubble: translucent dark, **italic narration** + quoted dialogue, a
  🔊 play-voice chip at the top of each AI message.
- **Inline generated images** inside the chat ("bring your chats to life"),
  👍/👎 under the message.
- Composer: persona avatar, "Message…", image button, sticker button, **⏩
  fast-forward** (let the AI continue **[inference]**). Footer disclaimer: "This
  is A.I. and not a real person. Treat everything it says as fiction ⌄".
- **Real-time voice call** screen (characterai-04): full-bleed character art,
  "Listening…", Mute / End.

#### Other screens

- **Memory** (characterai-03): `Memory Usage 65% left` with a multi-colour
  segmented bar; rows Always remembered · Chat history · My persona · Character
  information 🔒; tabs per scene/character (`Story · caiborg · Sedusa`).
- **Create Character** (characterai-02): prompt → 2×2 generated portraits →
  Generate / Next.

#### Social proof

Chat counts on cards, emoji reaction counts on feed posts, creator handles
everywhere, "23 mins ago" recency, follower-style creator rows.

#### Freshness devices

The For You feed is UGC posts with relative timestamps ("23 mins ago") — the
home is literally new every open. **[inference]** This is c.ai's answer to the
same problem Plotbreak has: a static catalog looks dead; a feed of moments
from other people's chats never does.

#### Retention hooks

"Continue this moment in chat" CTA turns any feed post into a session; memory
("characters that remember"); voice calls; custom backgrounds (investment in
"your" chat). Library tab for your chats.

#### Visual style

Dark UI, white type, very little accent in-app (white active chip);
store creative is loud (pixel-art patterns, saturated yellow/green/pink/blue,
huge lowercase geometric sans). Art is painterly/illustrated, not anime-only.
---

### 2.3 Talkie (SUBSUP / MiniMax)

Sources: **not on the US App Store** — iTunes lookup for the old iOS id
`6450140383` returns 0 results in us/gb/ca/au/bh/tz and the apps.apple.com URL
404s, so screenshots come from Google Play instead:
https://play.google.com/store/apps/details?id=com.weaver.app.prod — "Talkie:
Creative AI Community", 871,194 ratings, 4.55★, Teen. 8 screenshots.

#### Home / structure

- **Home tab = the chat itself** (talkie-02): opens straight into a full-screen
  character (background art fills the screen) with the conversation overlaid.
  **[known pattern, not visible in a static shot]** you swipe vertically between
  characters, TikTok-style, so the first thing a new user does is chat, not
  browse.
- Header on that screen: avatar + `Leonardo Da Vinci` + **`85,843 Connector`**
  (follower count, named) + a ➕ follow button; 🔍 and ☰ on the right; a
  **`💬 13.2K` chat-count chip** under it.
- Bottom tabs (5): Home · Chats · ➕ Create · **Explore (compass)** · Profile.
- **Explore (talkie-08)**: search field ("Batman vs. Superman" placeholder) →
  **wide banner** ("Study Hard! Play Hard!", anime girl) → **text tabs** `Trends ·
  Play & Fun · Life Coaches · Helper` → **topic rows**, each a hashtag
  community with a join count and a one-line pitch:
  - `# OC Showcase` — "Create your unique Original Creations!" — **87.0k Joined ›**
  - `# MemeSpeak` — "Hey meme mavens! Bring ur fav memes to life!" — 32.6k Joined
  - `# AI Battle` — 66.9k Joined
  Cards are ≈3:4 portrait, name over a bottom gradient, a `Featured` tag
  top-left, ~3.5 visible per row.

#### Chat pattern (talkie-02, -07)

- Voice-note style AI messages with a **duration chip** (`▶ 5"`, `▶ 8"`),
  user bubbles in the brand yellow, link previews ("Mona Lisa – Wikipedia")
  and images inline.
- **Smart replies**: tap the 💡 in the composer → 4 suggested replies, each with
  a ✏️ edit button, and a `Change 1/2` pager (same pattern as OOC's 3
  suggestions).
- **Group chats** (`Food Discussion · 2 Talkies · 834 Connector`): several
  characters in one room.
- Voice calls (talkie-06): full-screen portrait, subtitles of what the
  character says, red hang-up, "Pull up keyboard".

#### Creation (talkie-03/04/05)

Create Image with reference/face/style, art-style chips (Recent · RealView ·
Anime · Creative), Create Talkie (name, gender, "Intro (Visible to Others)",
"Opening"), voice mixing + cloning. "AI Writer" button on every text field.

#### Social proof / freshness / retention

- Social proof: Connector (follower) counts, chat counts, `Joined` counts on
  topic rows, `Featured` tags.
- Freshness: hashtag topic rows read like live communities ("87.0k Joined").
- Retention **[known pattern, not in these screenshots]**: Talkie's
  collectible **character cards** (gacha-style card draws you earn by
  chatting) — the collection is a reason to return.

#### Visual style

Dark in-app UI, **one hot accent: warm yellow/gold** (user bubbles, CTA
buttons, highlights); store creative is yellow + black, chunky sans. Mixed art
styles (photoreal, anime, meme).
---

### 2.4 WEBTOON

Source: https://apps.apple.com/us/app/webtoon-manga-comics-manhwa/id894546091 —
519,140 ratings, 4.77★, v26.111.0 (2026-11-12). 8 screenshots.

#### Home structure

- Bottom tabs (5): **HOME · WATCH · SEARCH · CANVAS (UGC) · MY**.
- **"Top picks for you"** (webtoon-06): a **3-column grid** of 3:4 covers
  (title in the art), and **under each cover a one-line *reason* label in
  green** instead of metadata: `✓ Previously Read`, `10+ more free episodes`,
  `No.3 In Romance`, `Slow Burn Romance`, `Enemies to Lovers`, `More like Love
  4a walk`, `Friends to Lovers`. Every card says *why it is here*.
- **Watch tab** (webtoon-05, -02): vertical full-screen video feed of motion
  comics; top tabs `Featured · Episodes · Trailers`; right rail ♡ 999, 💬 999,
  list; bottom: title "School Bus Graveyard", genre line "Mystery · Confined
  Survival · Thriller", a **`⏩ Returned Series`** tag, white `Watch Now ›`
  button, `1.0x`.
- **[known pattern, not in these shots]** the Originals tab is organized by
  **weekday (MON–SUN + COMPLETED)** with **"UP" badges** on series that
  updated today — the whole catalog is framed as a release calendar.

#### Card anatomy

Cover with title baked in; a reason/rank line below ("No.3 In Romance"); in
other lists: genre, likes, `UP`/`NEW` badges **[known]**.

#### Reader (webtoon-07)

Full-bleed vertical panels, minimal chrome: `‹ Episode 72` and a sound toggle.

#### Social proof

- **Comment cards** floating over art in the store shots ("This is the BEST
  webtoon I've ever…", 👍 12,446 👎 3; "I can't get out of this episode!" 👍
  8122) — top comments are shown as content.
- **Community feed** (webtoon-08): `Following · HOT` tabs, creator posts with a
  verified check, **"1 hrs ago"**, a green `Follow` button, reaction stack
  533.2K.

#### Freshness devices

"With new episodes released **daily**" (store copy), weekday schedule, `UP`
badges **[known]**, Watch tab trailers, "Returned Series" tag, creator posts
with hour timestamps.

#### Retention hooks

`✓ Previously Read` and "10+ more free episodes" labels inside
recommendations; daily release cadence; follow creators. **[known]** Daily
Pass / wait-for-free episodes (one episode unlocks every N hours), Fast Pass
to read ahead with coins, subscribe/favorite with new-episode push.

#### Onboarding (webtoon-03)

White sheet: "What kind of stories are you into?" — "Select up to 5 keywords,
then we'll help you find webtoons you'll love!" — `Skip` top-right — 16 chips
with small icons (Drama, Fantasy, Comedy, Action, Slice of life, Romance,
Superhero, Sci-fi, Thriller, Supernatural, Mystery, Sports, Historical,
Heartwarming, Horror, Informative).

#### Visual style

**Light** UI (white), brand **green** for accents and labels, black type.
Covers are the colour. Store creative: flat green, big black sans.

---

### 2.5 Episode (interactive stories)

Source: https://apps.apple.com/us/app/episode-choose-your-story/id656971078 —
2,818,437 ratings, 4.65★, v27.31 (2026-11-16). 4 screenshots. Claims "150,000+
stories", "billions of reads".

#### Home structure (episode-04)

- Top bar: `Episode` logo + **three currency counters with ➕** (passes 25,
  gems 15, tickets 10).
- **Hero banner** (full width, ≈16:9 art "Fashion Star") with a coloured
  `▶ Read Now!` strip under it.
- **`My Favorites`** row first (`See all ›`): 2:3 covers with an **orange read
  progress bar under each cover**, title below ("Behind his mask", "Don't Hate
  the Player", "Prom Night"). ~3.3 covers visible.
- **`Popular`** row (`See all ›`), same cards.
- Light theme, white background.

#### Play pattern (episode-02/03)

3D-rendered characters full screen, **choices as stacked big blue pill
buttons with ›** ("Guy on the right / Guy on the left / Neither!", "Follow the
rules / Make your own"). Wardrobe (episode-01): `Avatar · Closet` tabs, gem
balance 245, outfit grid, category icons, "Party time 22/47".

#### Retention / social

- **[known pattern]** Passes regenerate on a timer (wait-for-free energy);
  gems pay for premium choices/outfits.
- Store copy: **Book Clubs** with "reading challenge with your book club
  members, and earn rewards!"; UGC writers "amassing millions of reads".
- Progress bars on the first row = continue-reading is the home's first job.

#### Visual style

Light, candy pink/purple headings, blue choice pills, glossy sparkles.
Dated-looking next to OOC/c.ai, but very legible.

---

### 2.6 Chapters: Interactive Stories (Crazy Maple Studio)

Source: https://apps.apple.com/us/app/chapters-interactive-stories/id1277029359
— 115,965 ratings, 4.4★, v2.2.0 (2026-11-18). 8 screenshots.

#### Home structure (chapters-07)

- Top bar: `Chapters` logo + **three currencies** (215 · 15 · 8838).
- **Top tabs**: `Discover · Category · ▶ Reels` + 🔍.
- **Hero** (full width, landscape key art "My Brother's Best Friend", page
  index).
- **`Weekly Update`** row (`See All ›`): 2:3 covers with **weekday ribbons
  on the cover** — `PLAYING · Wednesday`, `Tuesday`, `Finished` — title +
  tiny tag line under ("Sports Pregnancy", "Homeless, CEO, hidden identity").
  ~3 visible.
- **`Tailored for You`** row, with a **`30% Premium Choices` discount badge**
  on a cover.
- Bottom tabs (5): Home · Library · Discover · **🎁 gift (rewards)** · Profile.

#### Story detail (chapters-06)

Full-bleed character art as the page, close/share/⋯ on top; over the bottom
half: `30% OFF Premium Choices VIP` banner, **`Chapter 1 of 23 | Finished`**,
title "Claimed by the Assassin", subtitle "The Truth About Lies", **⏱ 20 min**,
3-line synopsis, tag chips (Romantic Suspense · Drama · Action · Bad boy ·
Kicka…), icon row with counts (♡ 10k, 💬 9.1k), big purple `Play` button.

#### Play pattern (chapters-01, -05, -08)

Painted 2D characters full screen, speaker nameplate (`CYNTHIA`) on a white
dialogue card, choices as purple pills; **premium choice shows its gem cost on
the pill** (`Kiss Him 💎17`, gradient-highlighted).

#### Freshness / retention (the heaviest of the set)

- "NEW CHAPTERS EVERY WEEK" + weekday ribbons on covers + `Weekly Update` row.
- **Countdowns everywhere** in the gacha closet (chapters-04): `Free · get
  free in 18:59:36`, `Time gifts 23:59:59`, `Celestial Diva ★★★★★ 23:59:59`,
  `Today's Special Offer`, `Draw x10 · 4-star closet guaranteed`, "get the
  5-star set within 40 times".
- Discount badges (30% Premium Choices), VIP, a gift tab in the tab bar.
- `Reels` tab = short video trailers.

#### Visual style

Light home, saturated purple/magenta + rainbow glare, glossy romance key art.
---

### 2.7 Netflix (shelf reference)

Source: https://apps.apple.com/us/app/netflix/id363590051 — 7,649,954 ratings,
4.75★, v26.6.0 (2026-11-16). 6 screenshots. Observed items are from the
screenshots; **[known]** items are long-standing Netflix patterns not visible
in these 6 shots.

#### Home structure

- Header: `N Home` + cast, downloads, 🔔. **Chip row**: `Shows · Movies ·
  Podcasts · New & Hot · Categories ▾` (dark translucent pills, active =
  lighter fill).
- **Hero card** (netflix-01, -06): one huge 2:3-ish poster in a rounded card
  with the **title logo in the art**, a genre line with dots ("Period Piece •
  Drama • Critically Acclaimed"), and two buttons side by side: white `▶ Play`
  and translucent `+ My List`. The hero's dominant colour tints the whole page
  background.
- Rows (netflix-03): `Mobile Games` (`My List ›`) — square app icons with name +
  genre under, a **red `TOP 10` corner badge** on one; `Podcasts: Now on
  Netflix` — 2:3 tiles with the red N badge. ~4 tiles visible per row.
- Bottom tabs (4, floating pill bar): **Home · Clips · Search · My Netflix**.
- **Clips** (netflix-02): vertical full-screen video feed (mute, ＋ My List,
  share on the right rail; title, genres, 2-line synopsis `…more`; a round
  "poster" button bottom-right to jump to the title).
- **My Netflix** (netflix-04): profile switcher `Mike ▾`; rows **`Moments
  You've Saved`** (clips with duration `15s`, `2m` and **"Starts at 49:20 ·
  Bridgerton | S4:E1"**, share) and `My List`.
- **Rating** (netflix-05): three-option thumbs `Not for me · I like this ·
  Love this!` on the title sheet; title sheet shows "2025 · TV-14 · 5 Seasons ·
  HD", "Watch the Complete Series Now", `Play`, `Download S5:E1`, and a bottom
  action row My List / Rate / Share / Download Season 5.
- **[known]** `Continue Watching for <name>` row with red progress bars and an ⓘ
  / ⋯ on each tile; **Top 10** rows with giant outlined numerals beside the
  poster; `Because you watched X`; `New Episode` / `Recently Added` / `Leaving
  Soon` badges on tiles; `New & Hot` tab with `Coming Soon` dates and a
  `Remind Me` bell; autoplaying previews on the hero.

#### Visual style

Black → deep red gradient driven by the hero art, white type, one red accent,
floating glassy tab bar. Dense: 10+ rows, ~4 tiles per row on phone.

---

### 2.8 Note: character.ai on the web

https://character.ai logged out is a sign-up wall only ("Get access to 10M+
Characters · Sign up in just ten seconds", Google / Apple / email), no browse
rows. Footer mentions "Charms Terms of Use" (a c.ai reward/currency). OOC, by
contrast, lets logged-out visitors browse the whole catalog and only gates
playing — with a "Sign up and get 500 credits!" bubble pinned over the buttons.

---

## 3. Steal list (ranked by likely retention impact)

1. **Welcome Missions with a "come back tomorrow" step** — a 6-step newbie
   checklist paying 1,500 credits total; one step is literally "Play a story
   again after midnight" (locked until then). Onboarding → day 2. *(OOC)*
2. **Continue row first, with a progress bar per cover** — "My Favorites"
   with orange read-progress bars as the first row under the hero. Library +
   home. *(Episode; Netflix Continue Watching [known])*
3. **Daily check-in you can see, with an expiry** — "Check in to receive N
   Credits", "Usable until {date}", free credits expire in 30 days; a reward
   timer `get free in 18:59:36`. *(OOC; countdown from Chapters)*
4. **Rankings with a visible reset schedule** — `Top 100` with Daily / Weekly /
   Monthly and "Daily: every night at 12 AM · Weekly: every Friday" — plus
   **rank numerals on covers** in two home rows. *(OOC; Netflix Top 10)*
5. **"Today" and "New Ranking" shelves** — today's uploads as their own chip,
   and a Top 100 restricted to new titles so new stories can chart. The shelf
   changes every day for free. *(OOC)*
6. **Suggested next lines on the play screen, editable before sending** — 3
   tappable continuations, each with ✏️ edit and ↑ send; Talkie's 💡 smart
   replies with `Change 1/2`. Attacks the slow inspect/ask loops in
   `docs/churn-readings-2026-11-15.md`. *(OOC, Talkie)*
7. **A feed of moments from other people's runs** — For You posts with
   illustration, caption, "23 mins ago", emoji reaction counts and a
   "Continue this moment in chat" CTA. The home is new on every open.
   *(Character.AI; Webtoon Community / Netflix Clips are the same idea)*
8. **One play count on every card** — `48.5M · OOC` (plays · creator) under
   each 2:3 cover; nothing else. Detail page adds plays · likes · comments.
   *(OOC; c.ai uses 💬 27.8k)*
9. **A reason label under each recommended cover** — `✓ Previously Read`,
   `10+ more free episodes`, `No.3 In Romance`, `Enemies to Lovers`. Tells
   the user why it is there. *(Webtoon)*
10. **Per-tab rotating hero** — big title + one-line hook + `Explore`, cover
    stacked like a deck, auto-rotating, different set per chip. *(OOC; Netflix
    hero with Play + My List)*
11. **A release cadence on the cover** — weekday ribbons (`PLAYING ·
    Wednesday`, `Finished`), a `Weekly Update` row, "New chapters every week",
    `UP` badges. *(Chapters, Webtoon)*
12. **Detail page that sells with social proof and choice** — plays/likes/
    comments counters, **Starting Scenarios** picker, character preview cards
    with game-style nameplates ("Grade: 2nd Year · Personality: Arrogant"),
    `Last Update` date, comments preview, one sticky `New Play`; Chapters adds
    `Chapter 1 of 23 · ⏱ 20 min`. *(OOC, Chapters)*
13. **Onboarding: pick up to 5 genres → name → "titles picked for you"** —
    icon chips with Skip; "What should characters call you?"; audience filter;
    ends on a personalised shelf. *(Webtoon, OOC)*
14. **Dated promo strip + wide event banner between rows** — "Free Messages
    Are Back Through November 30"; a black strip "Dice of Fate · First AIRPG
    on OOC" between Top Ranked and Originals. Cheap freshness. *(OOC)*
15. **Comments as content** — top comments with like counts floated over the
    art / shown on the detail page before playing. *(Webtoon, OOC)*

---

## 4. Screenshot index

Root: `/private/tmp/claude-501/-Users-omarlahmimi-Documents-Plotbreak/a56cf246-254f-48ba-9b87-82044993a208/scratchpad/research/`
(each app folder also has `_meta.json` with the store listing text). 600 px
wide. **★ = open these first.**

**OOC** (`ooc/`, iOS App Store)
- `ooc/ooc-01.jpg` — brand splash: "THE PLAYABLE ANIME", tilted wall of 2:3 character cards, lime `*OOC`.
- ★ `ooc/ooc-02.jpg` — play screen: scene image, serif narration, 3 editable suggested lines, floating composer, model picker.
- ★ `ooc/ooc-03.jpg` — home: Story|Character tabs, chips Main/Ranking/Today/Fantasy, rows "Selected for You" and "Unique and Special, OOC Original", 3 covers per row with play counts.
- `ooc/ooc-04.jpg` — Create Story step 1 (covered by `docs/create/ooc-teardown.md`).
- `ooc/ooc-05.jpg` — brand key art: ensemble of characters, "WHERE IMAGINATION COMES TO LIFE".

**Character.AI** (`characterai/`, iOS)
- `characterai/characterai-01.jpg` — "#1 ai chat app", 100M+ downloads laurel, collage of phones.
- `characterai/characterai-02.jpg` — Create Character: prompt → 2×2 generated portraits.
- `characterai/characterai-03.jpg` — Memory screen with segmented usage bar.
- `characterai/characterai-04.jpg` — full-screen voice call.
- `characterai/characterai-05.jpg` — chat with custom background, italic narration, voice chip.
- ★ `characterai/characterai-06.jpg` — browse: category chips + 2-column character cards with chat counts and @creator.
- ★ `characterai/characterai-07.jpg` — For You feed post: image, "Continue this moment in chat", creator, "23 mins ago", emoji reaction counts.
- `characterai/characterai-08.jpg` — chat with an inline generated image, 👍/👎.

**Talkie** (`talkie/`, Google Play — not on the US App Store)
- `talkie/talkie-01.png` — "CREATE characters you've imagined", avatar collage.
- `talkie/talkie-02.png` — chat-first home: full-screen character, follower ("Connector") count, chat count, voice-note bubbles.
- `talkie/talkie-03.png` — Create Image (reference, art styles).
- `talkie/talkie-04.png` — Create Talkie profile form.
- `talkie/talkie-05.png` — voice editor / cloning.
- `talkie/talkie-06.png` — voice call with subtitles.
- `talkie/talkie-07.png` — group chat + 4 smart replies with edit, "Change 1/2".
- ★ `talkie/talkie-08.png` — Explore: search, banner, tabs, hashtag topic rows with "87.0k Joined".

**WEBTOON** (`webtoon/`, iOS)
- `webtoon/webtoon-01.jpg` — comic art with floating comment cards and like counts.
- `webtoon/webtoon-02.jpg` — video episode player.
- ★ `webtoon/webtoon-03.jpg` — onboarding: "What kind of stories are you into?", up to 5 genre chips, Skip.
- `webtoon/webtoon-04.jpg` — key art "Fogland Limbo".
- `webtoon/webtoon-05.jpg` — Watch tab: vertical video, Featured/Episodes/Trailers, "Returned Series", Watch Now.
- ★ `webtoon/webtoon-06.jpg` — "Top picks for you": 3-column grid with a reason label under each cover; tab bar.
- `webtoon/webtoon-07.jpg` — reader, Episode 72.
- `webtoon/webtoon-08.jpg` — community feed: Following/HOT, creator posts "1 hrs ago", Follow, comments with like counts.

**Episode** (`episode/`, iOS)
- `episode/episode-01.jpg` — avatar wardrobe with gem balance.
- `episode/episode-02.jpg` — choice pills over 3D characters.
- `episode/episode-03.jpg` — choice pills ("Follow the rules / Make your own").
- ★ `episode/episode-04.jpg` — home: currency bar, hero banner + Read Now, "My Favorites" with progress bars, "Popular".

**Chapters** (`chapters/`, iOS)
- `chapters/chapters-01.jpg` — choice pills over romance art.
- `chapters/chapters-02.jpg` — dress-up outfit picker.
- `chapters/chapters-03.jpg` — stacked landscape story banners (catalog vibe).
- `chapters/chapters-04.jpg` — gacha closet with countdown timers ("get free in 18:59:36", "Time gifts 23:59:59").
- `chapters/chapters-05.jpg` — premium choice with gem cost on the pill.
- ★ `chapters/chapters-06.jpg` — story detail: full-bleed art, "Chapter 1 of 23 | Finished", 20 min, tags, counts, Play.
- ★ `chapters/chapters-07.jpg` — home: Discover/Category/Reels, hero, "Weekly Update" with weekday ribbons, "Tailored for You", gift tab.
- `chapters/chapters-08.jpg` — choice "Accept The Bond / Reject Him".

**Netflix** (`netflix/`, iOS)
- ★ `netflix/netflix-01.jpg` — home: chips, hero card with Play + My List, genre line, floating tab bar.
- `netflix/netflix-02.jpg` — Clips vertical video feed.
- `netflix/netflix-03.jpg` — rows "Mobile Games" (TOP 10 badge) and "Podcasts: Now on Netflix".
- `netflix/netflix-04.jpg` — My Netflix: "Moments You've Saved" (Starts at 49:20) + My List.
- `netflix/netflix-05.jpg` — title sheet with Not for me / I like this / Love this!
- `netflix/netflix-06.jpg` — hero (One Piece) surrounded by posters.

The OOC **website** was read live in Chrome (not saved to disk); its row
titles, counts and chip names are transcribed in §2.1.
