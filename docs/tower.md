# The Tower: a daily mini game that pays credits

Status: built (2026-11-20), not shipped. The page is `apps/tower`, the shared sim `packages/tower`, the server `services/api/src/tower.ts`, and the app `apps/ios/Plotbreak/Screens/Tower`. See "Changes since the first design" at the bottom.

## Why

1. **Daily play time.** A second, short thing to do in the app every day.
2. **Retention.** One try a day, with a visible reward ladder and a countdown to the next try. That's the reason to open the app tomorrow.
3. **Earning instead of paying.** Players can climb for credits. Today the only free credits are the daily 300.

## The game in one line

A one-thumb anime duel-climber. Each floor is a one-on-one duel:
- The enemy telegraphs an attack, and you **tap anywhere** to parry when it lands, or hit the big **DODGE** button for a red one.
- Parries crack their guard. Break the guard and a cut-in finisher ends the floor.
- Every couple of floors you pick one of three anime-trope power-ups.
- There are 30 floors and one try a day. How far you get decides the payout.

### Why this game

- **One thumb, no aiming, one idea to learn: tap when it hits.** Dodge is a button, not a swipe: a swipe can't be told from a tap until the finger moves, which would add lag to every parry.
- A toddler mashing clears floors 1–5 because nothing there punishes an early tap.
- **Difficulty is all timing and reading,** so it scales cleanly with three dials: window size, telegraph honesty and attack mix.
  - The top floors need precise timing (tight windows, combos).
  - They need intelligence (feints, counter stances, picking power-ups that combine well).
  - And some luck (which power-ups are offered, which patterns the final boss rolls).
- **Every duel is 8–15 seconds** of one-on-one with a big face on screen. That's the anime fight shape: telegraph "!", clash, impact frame, cut-in, finisher.
- **It runs as a deterministic tick simulation,** so the server can replay a run from its inputs and pay only what was really earned.

## Money

- **Entry:** 30 credits. **The first climb each week is free** (weeks start Monday, in the player's own time zone). A new player's first climb is therefore always free.
- **One run per account per day.**
- **The payout depends on the floor you fall on:**

| You fall on floor | You get | Net after the 30 entry |
|---|---|---|
| 1–5 | 5 | −25 |
| 6–10 | 30 | 0 (entry back) |
| 11–15 | 60 | +30 |
| 16–20 | 120 | +90 |
| 21–25 | 150 | +120 |
| 26–30 | 200 | +170 |
| Clear floor 30 | 300 | +270 |

300 credits is five turns, the same as a daily claim. At most it doubles a player's free credits for the day.

Interpretation of the request:
- "Level 5-10 → 30" and "level 11-15 → 60" overlap at the edges.
- Read here as the floor you are on when you fall:
  - Dying on 5 pays 5.
  - Dying on 6 through 10 pays 30.
  - "30 → 300" means beating floor 30.

## Difficulty targets

Tuned with simulated players (`packages/tower/src/bots.ts`), not by feel:

| Player | Model | Where they should fall |
|---|---|---|
| Toddler | Taps at random every 150–400 ms, swipes rarely | Clears 1–5 nearly always; falls around 6–10 |
| First-timer | Timing noise σ≈90 ms, bites half of all feints, misreads colours 12% | Mostly 11–17 |
| Average | σ≈60 ms, bites 25%, misreads 6% | 15–22 |
| Decent | σ≈40 ms, bites 10%, misreads 3% | 20–25; past 25 rarely on a first run |
| Very good | σ≈28 ms, bites 4%, misreads 1.5%, picks power-ups well | 25–29 |
| Expert | σ≈20 ms, bites 2%, misreads 0.5%, picks power-ups well | Clears 30 in a minority of runs: skill plus luck |

## Floors

| Floors | Arc | New threat |
|---|---|---|
| 1–5 | **School Rooftop**: delinquents, the hall monitor; floor 5 boss is the Student Council President | Slashes only, huge windows, early taps are free. Floor 1 is the tutorial and can't be lost. |
| 6–10 | **Ninja Forest**; boss is the Fox Mask | Kunai throws (6), red heavies you must swipe (7), two-hit combos |
| 11–15 | **Spirit Shrine**: kitsune, oni, lantern ghost; boss is the Oni Captain | Feints (11), delayed strikes. A whiff locks you briefly. |
| 16–20 | **Neon City**: cyborg, drone, hacker; boss is the Prototype mecha | Fast three- and four-hit combos with heavies mixed in |
| 21–25 | **Demon Castle**: knights, the Demon General | Counter stances punish idle taps; shorter tells; feints inside combos |
| 26–30 | **The Final Arc**: your rival, then **THE AUTHOR** (floor 30) | Three phases. In the last, "the plot twists": attack colours swap meaning for a few beats. |

- Bosses (5, 10, 15, 20, 25, 30) need two or three guard breaks.
- Beating a boss heals one heart.
- Everyone climbs the same tower each day (the daily seed). That keeps it fair and gives people something to compare.

## Attacks

| Telegraph | Answer | Wrong answer |
|---|---|---|
| White "!" (slash) | Tap as it lands | Too early: whiff (and on floor 11+, a short lockout). Too late: hit. |
| Red glow, 危 (heavy) | DODGE as it lands | A tap is crushed, and you're hit |
| Kunai | Tap as each one arrives | Hit |
| Feint (white "!" with a yellow edge, enemy grins) | Wait for the real strike | Tapping the fake whiffs, and the real one lands |
| Counter stance (blue aura) | Don't tap until it ends | A tap is countered, and you're hit |

- **A perfect parry** (inner third of the window) does double guard damage and fills the Kiai meter. A full Kiai meter makes the next guard break instant.
- **Dodging a heavy** opens a counter: a tap in the opening does triple guard damage.

## Power-ups (pick one of three)

Offered after floors 2, 4, 6, 8, and after every boss. They're named after anime tropes, which is where the pop-culture feel comes from without using anyone's characters:

| Power-up | Effect |
|---|---|
| Training Arc | Parry window +25% |
| Plot Armor | Once per run, a fatal hit leaves you on one heart |
| Power of Friendship | A friend parries one attack in every six for you |
| Beach Episode | Heal to full now |
| Filler Episode | Skip the next non-boss floor (it counts as cleared) |
| Second Form | On one heart, guard damage is doubled |
| Flashback | Once per run, undo the hit you just took |
| Rival's Respect | +1 max heart (and heal it) |
| Glasses Glint | Feints and counter stances show their tell earlier |
| Battle Cry | Perfect window doubled |
| Time Skip | Enemies wind up 12% slower |
| Chuunibyou | Counters do 5× guard damage, but a whiff costs half a heart |
| Truck-kun | The next non-boss enemy is broken on contact |
| Bento | Heal one heart now, and one after each boss |

## Look and feel

- **Portrait, one stage:** you on the left, the enemy on the right, an arc background with parallax.
- **Chibi characters** drawn in code (vector, flat anime colour, big eyes), animated by squash and stretch. No outside art, so no IP risk and no asset pipeline.
- **The anime language:**
  - A "!" pop over the head.
  - Speed lines on wind-ups.
  - Impact frames: one inverted black-and-white frame on a perfect parry.
  - Hit-stop and screen shake.
  - Katakana sound effects (キン, ズバッ, ドン).
  - Sakura bursts on a break.
  - A diagonal cut-in band with the hero's eyes on a finisher.
  - ゴゴゴ before a boss.
- **Death:** a grey manga panel and "NEXT EPISODE: tomorrow", the anime next-episode preview card. That's the come-back-tomorrow message in the genre's own words.
- **Sound** is synthesised with WebAudio, so there are no audio files. **Haptics** come through the iOS bridge (light for a parry, heavy for a perfect, notification for death).

## Where it lives in the app

- **Discover:** a slim card under the header.
  - "THE TOWER · Today's climb is ready · up to 300 credits".
  - After playing: "Fell on floor 14 · +60 · next climb in 6h".
  - Sundays: "FREE today".
- **Wallet:** an "Earn credits" row with the same card.
- **Out-of-credits screen:** "Or climb the Tower for up to 300". This is the moment earning matters most.
- **Tapping any of those** opens a full-screen web view with the lobby (ladder, rules, best floor, entry button), the run, and the results. The whole game lives in one bundled web page (`apps/tower`), shipped inside the app with no network load. It talks to Swift through `window.webkit.messageHandlers.tower`, and Swift makes the API calls.

## Server

- `GET /v1/tower`: today's state (played, free day, ladder, best, next reset, today's run if any).
- `POST /v1/tower/start`: charges entry (idempotent per account per day), creates a run and returns the run id plus the daily seed. If the run already exists, it returns that run.
- `POST /v1/tower/checkpoint`: after each floor, saves the inputs so far.
- `POST /v1/tower/finish`:
  - Takes the full input log.
  - The server replays the sim and computes the floor fallen on, ignoring what the client claims, then pays the tier.
  - An unfinished run is settled at its last checkpoint the next time `/v1/tower` is called.
- Ledger types: `TOWER_ENTRY` (−30, or 0 on free days) and `TOWER_REWARD` (migration 0017).
- Behind `PLOTBREAK_TOWER` (off, all, a list of ids, or a percentage), like relics. A 50% split measures what the Tower does to D1 and D7.

## Tracking

Everything is in `tower_runs`, one row per run:
- Day, free or paid, fee, reward, the floor fallen on, cleared, and start, finish and last-seen times.
- Real seconds played, and app version.
- A per-floor JSON: ticks, parries, perfects, hits taken, whiffs, the power-up offered and chosen, and what killed you.
- The input log.

PostHog gets `tower_card_seen`, `tower_opened`, `tower_started`, `tower_floor_cleared`, `tower_fell`, `tower_closed` and `tower_reward_seen`, so the funnel from card to start to finish is visible.

## Changes since the first design (2026-11-20, after two blind reviews)

These override anything above that disagrees with them.

- **Daily tower:** each UTC day has its own tower (`dailyTower(day)` in `packages/tower/src/content.ts`).
  - The non-boss enemies are shuffled within each arc. Floor 1 and the bosses never move.
  - There is one twist a day: A Quiet Day, Kunai Festival, Blood Moon, Trickster Day, Training Day (wider windows up to floor 20), Lucky Day (more epic power-ups), or Glass Cannon (2 hearts, parries hit 50% harder).
  - The attack patterns still come from a secret per-run seed. Nobody can work out a run in advance.
- **Streak:** +5% on the daily payout per day in a row, up to day 20 (+100%). Missing a UTC day restarts it at 1. An abandoned run still counts as playing.
- **Practice:** unlimited, from floor 1, on today's tower. Pays ◆1 per floor cleared, up to ◆10 a day. It's verified by replay like the daily climb, and never counts towards best floor or the streak.
- **Characters:** Kaito is free. Hikari, Kage, Mai, Unit Zero, Tetsu, Lilith and Ren are ◆500 each.
  - They're cosmetic only, with their own look and finisher cry, so credits never buy payout power.
  - They're stored in `tower_characters` and `tower_profiles`. Purchases are `TOWER_UNLOCK` ledger rows.
- **DODGE:**
  - Always right against red 危.
  - From floor 11, dodging a white strike grazes you for half a heart.
  - Dodging into a feint locks you out, the same as tapping it.
- **THE AUTHOR (floor 30):** offers three of your power-ups and you choose which to lose. Then you're cut to three hearts. Its phases speed up harder. Experts clear about 20% of runs.
- **Kiai:** a full meter makes the next parry a heavy blow (+20 guard damage). It no longer breaks the guard instantly.
- **Power-ups:** offered after floors 2, 5, 7, 10, 12, 15, 17, 20, 22, 25 and 27.
  - Power of Friendship blocks the first hit on each boss floor.
  - Truck-kun half-breaks the next two non-boss enemies.
  - Chuunibyou: counters hit twice as hard, but a whiff costs half a heart. It's never offered before floor 10.
- **Script check:** a run whose late-floor timing is too consistent is paid the minimum and flagged `suspicious`. The check is the median spread of parry offsets from floor 16: a person on a phone is at or above 1 tick, a perfect script about 0.
- **Notification:** after today's climb, one local notification is scheduled for when the next opens. It mentions the streak. It's only scheduled if the player already allows notifications.

The routes are now `GET /v1/tower`, plus these POSTs:
- `/v1/tower/start`
- `/v1/tower/practice`
- `/v1/tower/checkpoint`
- `/v1/tower/finish`
- `/v1/tower/characters/:id/buy`
- `/v1/tower/characters/:id/select`

Commands:
- `npm run tower:dev`: the page on a desktop.
- `npm run tower:build`: builds `Resources/tower/tower.html` for the app.
- `npm run tower:tune -- 200 daily`: difficulty by simulated skill.

### Round 3 changes (owner decisions, 2026-11-20)

- **Local midnight:** each player's day ends at their own midnight.
  - The app sends `x-timezone` (an IANA zone) on every request, and `tower_profiles.tz` stores it.
  - The zone may change at most once every 7 days, so it can't be hopped to farm an extra climb.
  - Players with no zone yet use UTC.
- **Streak revive:** a streak that died can be bought back before that day's climb.
  - It costs ◆5 on the first dead day, ◆20 on the second, ◆50 on the third, and is gone after that.
  - It bridges the missed days (`tower_streak_bridges`), which keep the chain alive without adding to it.
  - The ledger type is `TOWER_REVIVE`.
- **Practice:** starts on any floor from 1 to the best floor reached (`tower_runs.start_floor`). It pays ◆1 per floor cleared from there, up to ◆10 a day.
- **Floors 2–10:** a hit costs half a heart. Newcomers (the first-timer bot) now fall there about 1% of the time. A masher usually reaches floors 11–15.
- **Lessons:** each attack type is taught once, ever, by a card that pauses the fight. The sim simply stops stepping, so replays are unaffected. This replaces the banners.
  - The lessons are tap, kunai, red/dodge, feint, holding, counter stance, opening, graze, Kiai and plot twist.
  - The record of what's been taught is stored in localStorage `tower-taught-v1`.
- **THE AUTHOR:**
  - Its own sprite: floating, wings of manuscript pages, a text halo, a dripping quill.
  - A letterboxed film-style intro.
  - In the final phase the stage goes to ink with 改稿 ("rewrite") behind the fight.
- **Remind me:** the results screen asks for notification permission at the moment it's obviously useful, then schedules the reset reminder.


### Free climb (owner correction, 2026-11-20)

The original ask was "0 credits one day a week", meaning the first climb a player makes each week is free, not a fixed Sunday. `isFreeClimb` (server) and the mock both check for any daily climb since Monday, in the player's own time zone.

## Launch (2026-11-20)

- **Done:** migration `0017_tower.sql` is applied on production. `PLOTBREAK_TOWER` is
  set to Malik's two account ids only. Malik played it on his phone against prod.
- **Bug found on device:** the Tower card never appeared, because an empty SwiftUI
  `Group` has no view to run `.task` on, so it never asked the server. Fixed in
  `9296d33`. The simulator preview (`-towerPreview`) skips the card, which is why it was missed.
- **Timing ring (floors 1–10):** grey while too early, green with TAP when a tap
  counts, red with DODGE for a heavy. Malik's first read was "attack when they're in
  my circle".
- **Ship order:** push → Omar uploads 1.0.11 (19) and submits it. Malik chose `PLOTBREAK_TOWER=all`
  (no 50/50 holdout). That's safe before release, because older builds don't have the client.
- **Measure:** with no holdout, the only comparison is before vs after release. Compare
  1.0.11 users against those still on older builds while the update rolls out, and
  compare D1, D7, daily turns and purchases with the weeks before.
