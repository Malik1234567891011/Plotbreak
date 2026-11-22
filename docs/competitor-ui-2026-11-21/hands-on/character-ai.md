# Character.AI hands-on, 2026-11-21

Real app on the user's iPhone, driven through iPhone Mirroring. Shots are 354x781,
1 image pixel = 1 point, so every size below is in points. Shot names are
`cai-NN-*.png`; the best ones are copied to `shots/`.

Confirms or corrects the App Store study in `../README.md` section 1.

## First-run teardown

Cold open from Spotlight. The app opened straight onto the interest picker. It is
possible the user had opened it once before and passed a splash or sign-in; what
we saw is the flow from that point.

| # | Screen | Shot | What it asks |
|---|---|---|---|
| 1 | "What are your interests?" | cai-01, 02, 03, 04 | Pick 3 or more interest chips. Nothing else. |
| 2 | Paywall, (c.ai+) yearly preselected | cai-05, 06 | Nothing; X top-left closes it. |
| 3 | Home, "For You" grid | cai-07 | Lands on home. No sign-in, no birthday, no name. |

**Two screens to home, zero personal data, zero typing.** No splash carousel, no
"what's your name", no persona, no tutorial, no first chat forced on you.

**Interest picker (cai-01 to 04).**
- Title "What are your interests?" in a heavy, wide display face (~26pt, two
  lines, centered), ~13pt gray "Pick three or more" under it.
- A collapsible "Discover More" header (~15pt white + ~12pt gray "Tap to add more
  interests", chevron right) over grouped cards: Roleplaying (Adventure, Anime,
  Fantasy, History, LGBTQ, Mystery, Paranormal, Religion, Romance, Sci-Fi),
  Lifestyle (Friendship, Emotional Wellness, Personal Growth), Entertainment
  (Humor, Games, Astrology, Fortune Tellers), Productivity (Learn a Language,
  Speaking Practice, Assistants, Creative Writing).
- Group cards: ~#1E1E1E fill on a ~#111 canvas, ~16pt radius, 20pt side margin,
  ~8pt between cards, ~12pt gray group label top-left, chips centered.
- **Every chip carries a tiny 24pt circular character portrait** before the label.
  The chip is a ~32pt capsule, ~#2A2A2A fill, 13pt white label. The art makes a
  boring taxonomy look like a cast list.
- **Selecting a chip lifts it out of the grid into a row under the title, and
  gives it its own pastel fill with black text**: Adventure lime (~#D4EE6A), Anime
  pink (~#F0A0B8), Fantasy green (~#8FD86A). The grid reflows to close the gap.
  This is the only place in the app so far where UI chrome has color.
- "Next" is a full-width ~48pt capsule pinned to the bottom: dark gray with gray
  text while fewer than 3 are picked, then white fill with black text.

**Paywall (cai-05, 06), shown before you ever see a character.**
- Top ~25%: full-bleed photo-real art (a woman with a white rat on an iridescent
  background), round translucent X top-left, "Restore" capsule top-right.
- A card with a **2pt royal-blue (~#3D5AFE) outline**, ~16pt radius: segmented
  control "(c.ai) lite | (c.ai+)", strikethrough "$155.88" + "$129.99 per year"
  (~17pt bold), a Monthly/Yearly switch (Yearly preselected) with a magenta
  "save 17%" pill, four blue checks: No ads, Unlimited top models, Best memory,
  Chat customization.
- Below, "All the good stuff": a three-column Free / Lite / (c.ai+) comparison
  table, the c.ai+ column tinted blue. Rows: Ads (Full / Less / None), chat
  styles "PipSqueak 2", "PipSqueak 2 Rawr" (basic), "DeepSqueak", "LongSqueak"
  (premium, Lite gets a "Daily taste"), Memory, Pins (15/30/30), Memory usage,
  Lorebook, Feature limits, **Slow mode (Yes / Less / None)**, Chat
  customization, Feature access, Bonus Charms (+20%).
- Pinned bottom: "$129.99/year. cancel anytime, no strings." in lowercase 12pt,
  then a full-width blue "Subscribe to (c.ai+)" capsule (~48pt), then
  "Auto-renews. cancel in settings anytime." + Terms / Privacy.
- The blue is a paywall-only color. Lowercase, chatty legal copy ("no strings")
  is a brand voice choice.

## Home tab: "For You" grid (cai-07 to 09)

**There is no vertical one-moment-at-a-time feed on the home tab.** Home is an
endless 2-column character grid under filter chips. (See Corrections.)

- **Header (cai-07):** "(c.ai)" wordmark ~22pt bold white at 20pt left margin, a
  small white "Upgrade" capsule (~24pt tall, 11pt black semibold) right of it.
  Right side: a rounded-square outlined "C" glyph (Charms currency) and a bell
  with a red dot. Header scrolls away; the chip row sticks (cai-08).
- **Search field:** ~40pt full-width capsule, ~#222 fill, magnifier + a gray
  placeholder that is a *character name* ("Mandy"), not "Search".
- **Chips:** For You (selected: white fill, black 13pt text) · Following ·
  Trending · Featured · Sc... (cut off, signals horizontal scroll). Unselected:
  1pt ~#444 outline, white text, ~30pt capsules, ~6pt gaps.
- **Card anatomy:** no card background. Square art ~148x148, ~12pt radius,
  20pt side margins, ~12pt gutter. Under it: name 15pt bold white (1 line),
  tagline 12pt gray (1-2 lines, usually the *premise in the user's role*:
  "Cuddling with your boyfriend [POST WAR]", "You are a entity sealed inside her",
  "Once your bully, now your wife.."), then meta 11pt gray: speech-bubble icon +
  chat count (149.4k, 5.8m, 1.5m) and @creator. Some cards add tiny gray tag
  chips ("Girlfriend", "Anime") or a gray "UPDATED" label.
- **Content:** with Adventure/Anime/Fantasy picked, the grid is almost all anime
  fan characters (Bakugo, Makima, MHA Class 1-A, Izuku, Mina Ashido) and
  manga-panel art, much of it monochrome. It never ends and never breaks into
  sections or rows.
- **What makes it feel alive:** only the chat counts and the creator handles. No
  motion, no badges, no live counters, no "new". It is a dense catalog.

## Tab bar

Six icons, no labels: Home (filled house when active), Chats (speech bubble),
Create (circled plus), a rounded-rectangle "book" icon, Library (stacked layers),
Profile (filled person circle). Active = filled white glyph, inactive = 1.5pt
outline. ~#111 bar, no top hairline.

## Library tab: first-party "(c.ai) series" (cai-11 to 15)

The fifth tab is where Character.AI does what Plotbreak does: authored anime
stories you play. Order top to bottom:

1. **Hero poster (cai-11):** one full-width card, 20pt margins, ~16pt radius,
   ~314x465 (about 2:3), filling most of the screen. Art is a bright anime key
   visual ("Last Summer", a festival at night) with the **title lettering baked
   into the art** and a small "(c.ai) series" kicker above it. Bottom-left: three
   dark translucent genre chips (Romance, Anime, Friendship). Bottom: a white
   ~44pt full-width "▶ Play" capsule *inside* the poster, black 17pt text.
2. **Watch Series (cai-12):** section title 17pt bold with a small line icon to
   its left. 2-column tall cards (~148x200, ~12pt radius), "▶ 423.7k" count
   bottom-left on the art, title 13pt below, then a **solid blue "New Episode!"
   pill** + a gray genre chip ("Horror", "Litrpg").
3. **Listen to Audiodramas (cai-13):** "(c.ai)fm AUDIO SERIES" baked into square
   covers, headphone icon + count, genre chip ("Western Thriller Romance",
   "Dark Romance / Fantasy"). "More >" top-right, full-width outlined "See all"
   capsule under the grid.
4. **Read Stories (cai-14):** 3-column ~102x150 covers, eye icon + reads
   (11.7k, 26.7k), title 13pt 2 lines, **trope chip** ("Reader-Insert",
   "Rivals To Lovers", "Arranged Marriage", "High School", "Original Work").
   "See all" capsule. End of page (cai-15).

Title-in-art covers, a count on every cover, one gray trope chip per title,
and a single blue state pill ("New Episode!") make this the most polished screen
in the app, and it looks like a streaming service, not a chatbot.

## Series player: "Last Summer" (cai-19 to 26)

Tapping the hero poster starts **episode 1 immediately**, no detail page in
between. It is a **vertical short-drama player (ReelShort format), not an
interactive story**: anime-style animated video (slow pans over AI key
visuals), subtitles, voice audio. In ~70 seconds no choice or chat prompt
appeared.

- **Full-bleed art** from the top edge to ~85% of the screen, black band below.
- **Subtitles:** white ~15pt semibold, centered, two lines, soft shadow, sitting
  at ~75% height over the art (cai-19, 21).
- **Bottom bar:** two dark translucent capsules (~36pt). Left: gear + speaker.
  Right: heart 11.8k · share 841 · layers "Ep. 1". Counts are per episode
  (Ep. 2 showed 3.2k / 147).
- **Episodes are stacked vertically**: scrolling moves between episodes, and
  episodes auto-advance (Ep. 1 rolled into Ep. 2 on its own).
- **Overlay on tap / on episode start (cai-26):** round translucent back "<"
  top-left and "⋮" top-right (~32pt circles), bottom-left title "Last Summer"
  ~20pt bold + 13pt synopsis ("A late-summer story unfolds as memories,
  distance, and choice collide under one final season."). It fades after a few
  seconds; the back button is unreachable until you tap to bring it back.
- **Episode sheet (cai-24):** tap "Ep. N". Bottom sheet ~16pt top radius,
  grabber, round X, 40x60 poster thumb + "Last Summer" 17pt bold + "111.8k
  views". Text tabs Synopsis / **Episodes** / Bonus (selected = white, others
  gray, no underline). **5-column grid of ~56x36 rounded tiles**: a film icon
  (trailer), episodes 1-6 open, the current one shows a waveform, **7-15 carry a
  small lock badge** in the top-right corner. Classic short-drama paywall
  ladder.
- Escape and left-edge swipe do nothing; pull-down scrolls to the previous
  episode.

## Feed tab: the vertical "moment" feed (cai-16 to 18)

The fourth tab (the rounded-rectangle icon) is the one-post-at-a-time feed the
App Store study described, but it is **user posts, not a curated story feed**.

- **Paged vertical scroll**, one post per screen. The image or video sits in a
  ~20pt-radius frame; when it is not tall enough, a blurred copy of itself fills
  the area above (cai-16). Round translucent "shrink" icon top-left, mute
  speaker top-right.
- **"Chat with Francesco Bernoulli and Will to G..."**: a dark translucent
  full-width pill with 13pt semibold white text sits on the bottom of the art.
  It appears on posts tied to a character chat, not on every post. The wording
  we saw was "Chat with ...", not "Continue this moment".
- **Creator row:** 28pt circle avatar, @handle 13pt, outlined "Follow" capsule,
  then remix (two arrows), share, "⋯" on the right. Caption 13pt one line +
  gray "More", "7 hours ago" 11pt gray.
- **Reactions:** a "smiley +" add button, then **sticker reaction pills with
  counts** (heart 452, crying 244, others 39 / 19), ~28pt outlined capsules,
  horizontally scrollable. Page dots under them for multi-image posts.
- **Content quality is poor:** two posts were the same AI-photo meme of a man
  grilling next to a crashed UFO, one was a gross-out horror face captioned
  "REMOVE AGE VERIFICATION". This is a UGC dump, not a showcase.

## Character page and the chat-entry path (cai-30, 37, 38)

**Tapping a character card on Home opens the chat directly.** There is no
character page in between: the greeting is already on screen and the composer
is waiting (cai-30). The character page is two taps deep, behind the chat
header.

- **Header tap opens a sheet (cai-37):** grabber, round X, 80pt rounded-square
  avatar (~16pt radius), name 15pt bold, tagline "☆ They're up against.. you! ☆",
  stats row (speech icon 429.9k · heart 561), "Created 1 year ago / Last updated
  1 year ago" in two columns, round like + share buttons, then grouped rows
  (~48pt, ~12pt radius, ~#1E1E1E): View Character profile, View Creator profile,
  **Away messages (blue toggle, on by default)**, Refresh this chat, and **Start
  new chat** in blue.
- **Character profile (cai-38):** Instagram-like, left-aligned. 96pt
  rounded-square avatar, name ~24pt bold, "by @ismeh3123" 13pt gray, stats as
  bold number over gray label (429.9k interactions, 561 likes), tagline, then a
  **white full-width "Chat" capsule** (~36pt) with round heart and chevron
  buttons beside it. Three icon tabs underneath (posts, chats, scenes) with a
  white underline on the active one; the posts tab shows full-width images.
- What sells the character before chatting is therefore only what is on the
  Home card: square art, name, one premise line, and a chat count.

## Chat screen (cai-30 to 36)

Character: "_MHA Training_" (429.9k chats), a scenario bot narrating Class 1-A.

**Before sending (cai-30):**
- Header: "<", 32pt rounded-square avatar (~8pt radius), name 15pt semibold,
  three 1.5pt line icons on the right (a style/brush icon, a crossed-out
  waveform for voice, a phone-with-waveform for calls).
- "_MHA Training_ was authored by @ismeh3123" centered, 13pt gray.
- **No background art.** Plain ~#111 canvas. Character turns are ~#262626
  bubbles, ~16pt radius, ~14pt padding, white ~15pt text at ~1.4 line height,
  with a 28pt rounded-square avatar outside the bubble's top-left. A small
  speaker chip (~24x16 capsule, "•))") sits on the bubble's top edge.
- The greeting is a ~250-word wall of prose with dialogue in quotes. Narration
  is roman, not italic.
- **Composer:** a ~44pt ~#262626 capsule with the user's avatar (gray person
  circle) inside on the left, "Message..." placeholder, image and sticker icons on
  the right; a **separate 40pt circle with ">>"** to its right. Under it, 10pt
  gray: "This is A.I. and not a real person. Treat everything it says as
  fiction ⌄".

**Sending (cai-31, 32):**
- While typing, the image/sticker icons are replaced by a **✳ button** (wraps
  text in asterisks for actions) and the ">>" circle becomes a **white send
  circle** with a black arrow. Return inserts a newline; it does not send.
- The user's line becomes a right-aligned ~#2C2C2C bubble with the user's
  circle avatar to its right. Text inside asterisks renders **italic** without
  the asterisks ("*looks around* Where am I?" shows as *looks around* Where am I?).
- **The reply streams word by word into a growing bubble.** No typing dots were
  visible (text was already arriving 2s after send). The send circle becomes a
  **stop square** while streaming. A ~100-word reply took ~12-15s, slow enough
  to feel like the free tier's "slow mode" from the paywall table.

**After the reply (cai-33):** under the latest character turn only: thumbs up,
thumbs down, and an **image-with-sparkle "Imagine" button** on the left,
**↻ regenerate** on the right. No suggested replies, no choices.

**">>" continue (cai-34):** tapping it with an empty field makes the character
write the next turn on its own. The scene moved forward without the player
typing anything.

**Regenerate (cai-35, 36):** ↻ replaces the reply in place and streams a new
one. Once done, the row gains **"<" and ">" chevrons at the far left and right
edges** to page between candidates.

**Limits and upsell:** none hit in three generations. No per-message cost, no
counter, no ad. Messages used: 1 typed line, 1 ">>" continue, 1 regenerate.

## Chats tab (cai-39)

"Chats" (20pt bold white) and "Gallery" (20pt bold gray) as text tabs, then
Charms "C", search, bell. Chips: Recent Chats (selected, white fill) / Liked /
Mine. Rows: 44pt rounded-square avatar + 15pt name. **No last-message preview,
no timestamp, no unread state.**

## Search (cai-40)

Full-screen, "<" + ~40pt capsule field at top. "✦ Top": outlined capsule chips
of popular queries (Frank C, Mha, Leon Kennedy, Jason Todd, Boyfriend, Mafia,
Bruce Wayne). "🔥 Trending": a numbered 1-10 list, 15pt names, **rank numerals
colored in a red-to-yellow gradient** (1 red, 10 yellow), a small gray trend
arrow on the right of each row. No art anywhere on the screen.

## Profile tab (cai-41)

- **A guest account was created silently**: username "EnchantedSparrow1411". The
  header shows it in 17pt bold and **wraps it mid-word** ("EnchantedSparr /
  ow1411"), a layout bug.
- 80pt **circular** avatar placeholder (user = circle, characters = rounded
  square), name 22pt bold, "0 followers · 0 following · 0 interactions".
- "Edit Profile" / "Share Profile" outlined capsules + round trend and gear
  buttons. Six icon tabs (characters, posts, voices, scenes, personas, likes),
  a search field with a filter button.
- Empty state: 56pt circle with a person glyph, "No Characters yet" 15pt bold,
  white "Create a Character" capsule.

## Charms (cai-42), the in-app currency

Reached from the "C" icon in any header. **Glossy 3D bead/dice illustrations**
(blue "C" bead, a purple speckled one, a stack of pastel beads), the only
non-flat art in the chrome. Balance "C 0" ~28pt, white "+ Buy Charms" capsule.
"How to spend your Charms": skip ads with an ad-free pass, **boost through
slowmode**, get extra Imagines, more coming soon. A "1 Hour / No Ads" card
(white + blue 28pt bold). Not tapped further.

## Motion and feel

- **Chip reflow:** a picked interest jumps out of the grid into the selected row
  and the grid closes the gap (cai-03 to 04). Expect a spring; it felt instant
  through mirroring.
- **Sticky chips:** the Home header scrolls off, the chip row pins to the top.
- **Paged feed:** one scroll gesture = one post, snaps.
- **Content rotates:** the Home grid order changed between visits (cai-07 vs
  cai-29), the search placeholder changed ("Mandy", then "Search"), and the
  Watch Series covers changed between visits (cai-12 vs cai-28).
- **Series player:** autoplays on tap, episodes auto-advance, the title overlay
  and back button fade out after a few seconds. A round translucent spinner
  shows between episodes.
- **Streaming text is the loading state** in chat; the send button turns into a
  stop square. No skeletons seen anywhere; images load in place.
- Haptics cannot be observed through mirroring.
- Empty states are one icon, one bold line and one white capsule CTA.

## Screen map

| Area | Shots | Notes |
|---|---|---|
| Interest picker | cai-01, 02, 03, 03b, 04 | first screen |
| Onboarding paywall | cai-05, 06 | second screen |
| Home "For You" grid | cai-07, 08, 09, 10, 29 | chips, endless 2-col grid |
| Feed tab (4th) | cai-16, 17, 18 | paged UGC posts, sticker reactions |
| Library tab (5th) | cai-11, 12, 13, 14, 15, 28 | series, audiodramas, stories |
| Series player | cai-19, 20, 21, 22, 23, 25, 26, 27 | short-drama video |
| Episode sheet | cai-24 | locked episodes 7-15 |
| Chat | cai-30 to 36 | greeting, typing, streaming, continue, regenerate |
| Chat header sheet | cai-37 | stats, away messages, new chat |
| Character profile | cai-38 | |
| Chats tab | cai-39 | |
| Search | cai-40 | |
| Profile tab | cai-41 | guest account |
| Charms | cai-42 | currency |

Copied to `shots/` (renamed): cai-01-interests, cai-04-interests-three,
cai-05-paywall, cai-07-home, cai-11-library, cai-14-library-stories,
cai-16-feed, cai-17-feed-reactions, cai-24-episodes, cai-26-series-overlay,
cai-30-chat-greeting, cai-32-chat-streaming, cai-36-chat-swipe,
cai-37-chat-sheet, cai-38-character-profile, cai-40-search, cai-42-charms.
The rest are in the session scratchpad only.

## Design system read

**Color**
- Canvas ~#111 (near-black, not pure black). Surfaces one step up: ~#1E1E1E
  (grouped rows, interest groups), ~#262626 (character bubbles, composer,
  search field), ~#2C2C2C (user bubble, unselected chips). Text white primary,
  ~#9A9A9A secondary, ~#666 tertiary (disclaimer).
- **White is the action color.** Selected chips, Next, Play, Chat, Buy Charms,
  Create a Character, the Upgrade capsule and the send button are all white fill
  + black text. Active tab icons are filled white.
- **Blue (~#3D5AFE) is reserved for money and "new":** paywall outline, table
  column and Subscribe button, "New Episode!" pills, the Away-messages toggle,
  "Start new chat", "No Ads". It never decorates.
- **Color exceptions, each in one place only:** pastel per-chip fills on the
  interest picker (lime, pink, green), the red-to-yellow rank numerals in
  Trending, the red notification dot, magenta "save 17%" on the paywall, 3D
  candy-colored Charms beads.
- Everything else that is colorful is art.

**Type**
- One geometric grotesk for the chrome (round dots, single-story feel, close to
  Onest / Manrope), plus a **heavier, wider display cut** for the onboarding
  title only.
- Scale: 26 heavy (onboarding title) · 24 bold (profile names) · 22 bold (wordmark,
  user name) · 20 bold (tab-level titles: Library, Chats, series title) · 17 bold
  (section titles, paywall price) · 15 regular (chat body, ~1.4 line height) and
  15 bold (card names) · 13 medium (chips, captions, card titles in Library) ·
  12 regular gray (taglines) · 11 gray (counts, meta) · 10 (disclaimer).
- No serif anywhere, no italic except user actions in asterisks.

**Spacing**
- ~20pt side margins on every screen; ~12pt grid gutters; ~6-8pt between
  chips; ~24-28pt between Library sections; ~8pt from cover to its title.
  Chat: 18pt to the avatar, bubble starts ~45pt, ~16pt between turns.

**Corner radii**
- Grid art 12 · posters and feed frames 16-20 · chat bubbles ~16 · grouped
  list rows ~12 · sheets ~20 top · episode tiles ~6 · chips, buttons, search
  and composer are full capsules.
- **Character avatars are rounded squares** (32pt at ~8 radius, 80-96pt at
  ~16). **The user's avatar is always a circle.** Characters and people are
  told apart by shape.

**Card and cover shapes**
- Home: square 1:1 art, no card body, text on the canvas.
- Library hero: ~2:3 full-width poster with a Play button inside it.
- Watch Series: tall ~3:4 two-up. Audiodramas: 1:1 two-up. Read Stories:
  ~2:3 three-up.
- Counts sit on the art bottom-left with a type icon (▶ views, headphones,
  eye) in white 11pt semibold with a soft shadow. Title lettering is baked into
  first-party cover art; the UI never overlays a title on a cover.

**Icons**
- 1.5pt rounded line icons, ~22pt, white; active tab swaps to the filled
  variant. Round translucent 32pt buttons over art (back, more, mute).
- Two illustrated exceptions: sticker reactions in the feed and the 3D Charms
  beads.

## What to steal for Plotbreak

1. **Tap a cover, land inside beat 1** (home, story page, play screen). Home
   cards open the chat with the opener already written and the composer
   waiting. No story page, no "Start" button. The details live behind a header
   tap in a sheet. For a 38% never-start leak this is the single biggest lesson:
   make the cover tap start the story, and move the story page into a sheet on
   the play screen.
2. **A ">>" continue button next to the composer** (play screen). A player who
   does not know what to type can still move the story. Pair it with the **✳
   action button** that appears while typing and renders `*actions*` in italic.
3. **One-screen onboarding with portrait chips** (onboarding). Interest chips
   with a 24pt character face in each; picked chips jump into a row under the
   title and take on their own pastel color; Next unlocks at three. No name, no
   birthday, guest account made silently. Then drop straight into a story
   instead of a paywall (see weak list).
4. **The Library shelf grammar** (home). A full-width 2:3 hero poster with the
   title baked into the art, genre chips and a white Play capsule inside the
   poster; below it, covers with an icon + count on the art, the title, **one
   trope chip** ("Rivals To Lovers", "Reader-Insert") and a single blue state
   pill ("New Episode!").
5. **Regenerate, then swipe** (play screen). ↻ under the latest beat only;
   after a regenerate, "<" ">" chevrons at the row edges let the player pick the
   better beat. Thumbs and an "Imagine this" image button sit on the same row.
6. **White is the action color, blue only for money and "new"** (design
   system). Monochrome chrome, one functional accent, all other color from art.
   This is the strictness the redesign lacked.
7. **Characters are rounded squares, the player is a circle** (play screen,
   profile). A cheap, consistent rule that reads as designed.
8. **Locked episode grid** (story page, paywall). A 5-column tile grid with a
   lock badge on chapters past the free ones is a calm way to show the paywall
   ladder before it is hit.
9. **"Away messages" on by default** (story page sheet, notifications). The
   character writes to you when you leave; it is a toggle on the chat sheet, not
   a settings page.
10. **Search as chips + a numbered trending list** with warm gradient rank
   numerals (search).

## What is generic or weak

- **Paywall before any content.** The second screen a new user sees is a
  $129.99/year offer with a comparison table full of internal model names
  (PipSqueak 2, DeepSqueak, LongSqueak). Plotbreak should not copy this order.
- **Home is an endless, flat 2-column grid**: no hero, no sections, no
  hierarchy. With anime interests most art is monochrome manga panels, so the
  page reads gray. The App Store frames oversell it.
- **The feed tab is UGC noise** (memes, a horror face captioned "REMOVE AGE
  VERIFICATION"). The "Chat with ..." hook is good; the content around it hurts
  the brand.
- **Default chat is a gray-bubble messenger** carrying 250-word walls of text.
  No art, no structure, no pacing. The art-backed chat in the store frames is
  a customization, not the default.
- Six unlabeled tab icons; "book" for Feed and "layers" for Library cannot be
  guessed.
- Chats list has no preview, timestamp or unread state.
- Profile header wraps the username mid-word.
- The series player hides its back button; Escape and edge swipes do nothing,
  so it feels like a trap.
- Free-tier replies stream slowly (~12-15s for ~100 words), and the slowness is
  sold back as "Boost through slowmode" with Charms.

## Corrections to the App Store study (`../README.md` section 1)

1. **The vertical one-moment feed is not the home screen.** Home is the
   2-column "For You" grid with For You / Following / Trending / Featured chips.
   The paged feed is the fourth tab and is user posts. Its CTA reads "Chat with
   <names>", appears only on some posts, and we did not see "Continue this
   moment".
2. **Home cards are square (1:1) art with no dark card body**; name, tagline and
   meta sit on the canvas, and the @handle is on the same line as the chat
   count, not outside a card.
3. **Full-screen scene art behind the chat is not the default.** A fresh chat
   is a plain #111 canvas with gray bubbles. The paywall lists "Chat
   customization" as a paid feature, which is likely where the store frame
   comes from.
4. **Narration is not italic by default.** Only text inside asterisks renders
   italic; the bot we used wrote roman prose with quoted dialogue.
5. **"No brand accent at all" is nearly right but not quite.** Blue appears on
   the paywall, "New Episode!" pills, toggles and "Start new chat"; onboarding
   chips are pastel; trending ranks are red to yellow; Charms are 3D candy art.
6. **Rounded-square avatars confirmed for characters**, but the user's own
   avatar is a circle.
7. **The study missed the Library tab**: first-party "(c.ai) series"
   (short-drama video episodes, free to ep. 6, locked 7-15), "(c.ai)fm" audio
   dramas, and "Read Stories" with trope chips. This is Character.AI's most
   direct overlap with Plotbreak, and its best-designed screen.
8. **The study missed the onboarding paywall** and the Charms currency
   (spent on ad-free passes, skipping slow mode, extra image generations).
9. Confirmed as described: the header's three line icons, the user avatar inside
   the composer, the separate ">>" button, the persistent disclaimer, the
   speaker chip on character bubbles, and sticker reactions with counts (in
   the feed tab).

## Not reached

- The very first launch, if there was one before this session (the app opened
  on the interest picker).
- Any interactive choice inside a (c.ai) series; ~70s of episodes 1-2 were
  passive video.
- Voice playback, calls, the Imagine image button and the Create flow (not
  tapped by rule). A chat with background art (the one bot opened had none).
