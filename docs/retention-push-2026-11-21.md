# Retention push — 2026-11-21

Problem: ~30 installs/day, almost nobody comes back. Live hub page (private):
https://claude.ai/artifact/PbPa3UdC7dizZy7AU6uQRA

| Workstream | Owner session | Output | Status |
|---|---|---|---|
| Redesign board, every page, current vs proposed | `plotbreak-ca` | https://claude.ai/artifact/8yRDJdhfSbAQe2wxSZYgpG, `docs/design-v2/` (commits e1c7df4, 9728056) | done |
| Cover bake-off: PixAI (web UI, user's account) vs shipped covers | `plotbreak-80` | https://claude.ai/artifact/81xKYkBXAGZHbBN46CuSRJ, `docs/covers-pixai-test/README.md` | done. The test recommended keeping the shipped pipeline (4/5 at thumbnail); **the user chose PixAI anyway** ("pixai generates way prettier covers"). Use Tsubaki.3 (3/3 clean titles; Flash added stray marks), $0.11/cover on Starter. Itachi drew the franchise headband: add a franchise-symbol check |
| Retention research (5 investigations, 2 independent re-checks) | `plotbreak-fd` (workflow `wf_1b745462-6dc`) | this file + `docs/retention/2026-11-21-*` | done |
| Server-only feed fixes | `plotbreak-fd` | branch `feed/daily-freshness` (no deploy) | next |
| Story bot | — | cost below; build after go/no-go | waiting on the user |

Evidence: `docs/retention/2026-11-21-research.json` (every agent's full return value) and
`docs/retention/2026-11-21-queries.sql` (PH-* in PostHog project 533970, DB-* on Supabase
`qscmokjkflkrspqjjooa`). All reads; nothing was written.

## Diagnosis (re-derived from a second source; P2 = joined Oct 22 – Nov 20)

- **Volume:** 30.4 installs/day → 25.4 sign in → 12.6 ever play a turn. 59% of installs never play.
- **Return rates:** D1 any-open 11.1%; D1 played 5.2–5.5% of accounts, 7.6–8.1% of players.
  D7 any-open 3.6–3.8%; played ~1%. Back on any of days 1–7: 10% of accounts, 15% of players.
  **Flat** vs Sep 22 – Oct 21 (the "every measure slipped" first read was overstated; only exact-day-7
  dipped, p≈0.05–0.08). Benchmarks: entertainment D1 15–20%; all apps D1 26%, D7 13% (Adjust).
  Calendar-day D1 reads ~1.6× a strict 24–48 h window.
- **Leak 1, day 0:** 296 of 781 onboarded (38%, ~10/day) never start a story. 136 never open a story
  page; 161 open one and back out; only 23 ever start later. Not guests: 286 signed in and saw Discover.
- **Leak 2, the credit wall is turn 10:** every new account gets 600 credits = exactly 10 VIVID turns
  (`GRANT_NEW_USER = 10 × DEFAULT_TURN_COST`, 60). The daily +300 adds 5. Day-0 turn counts pile up at
  exactly 10 (38 accounts, 33 out of credits; vs 9 at 9 turns, 3 at 11) and at 15. Among players with
  8–14 day-0 turns, those who ended day 0 out of credits played on D1 5.0% (2/40) vs 22.9% (8/35) with
  credits left (p=0.04). Observational, small n, would not survive correction for ~15 comparisons. Read:
  likely harm, test the grant. 19 accounts (2.5%) bought on day 0.
- **Leak 3, the first story:** Featured opens on Last Feather (rank 0) then Itachi (rank 1), the two
  worst openers. First runs, last 30 days (n small, ±15–20 points):

  | Story | First runs | Took a turn | Stopped by T3 (of those) | Played D1 |
  |---|---|---|---|---|
  | Itachi (Featured #2, Top ranked #1) | 63 | 43% | 74% | 2/26 |
  | Pink Tide | 57 | 67% | 47% | 1/37 |
  | Second Skin | 43 | 56% | 54% | 2/23 |
  | Good Morning, Husband | 39 | 64% | 40% | 2/25 |
  | Zero Throne | 34 | 50% | 47% | 3/15 |
  | Last Feather (Featured #1) | 30 | 37% | 64% | 0/9 |
  | Hush House | 24 | 50% | 42% | 2/10 |

  Itachi's run-start rate fell from 60% to 33% since Oct 30. Prologues finish 97–100%; the loss is at
  the opening choice.
- **Nothing pulls players back:** no server push (no APNs key, no device-token table). `Reminders.swift`
  schedules three local notifications; "story waiting" is the same generic line every day. No event
  records permission, scheduling or taps, so none of it is measurable.
- **The shelf never changes:** day 2 and day 7 look like day 1. "Trending now" = lifetime plays
  (`server.ts:617-639`); "Top ranked" = seeded likes, frozen; "New on Plotbreak" is the bottom 30% by
  score, not the newest (`server.ts:656-668`); "Related worlds" = first 6 by story id alphabetically on
  every page (`server.ts:774-787`). No genre field: 9 derived categories (`catalog-taxonomy.ts`).
  Catalog: 56 = 27 official + 29 user-made. Last official release Oct 30 (22 days); 2 in 10 weeks.
  User-made ~1/day and rising, but they can never reach Top ranked and sit below every official world.
- **Storyteller test** (`d16d70b`, live Nov 18): no improvement yet. Quit by turn 4: 62% (29/47) vs 49%
  (110/226) before. Small n. The cliffhanger return hook from the Nov 15 reading never shipped.
- **Measurement bugs:** PostHog server events (user id) and client events (install id) are not merged:
  only 20 of 270 people with server turns share a person with client events, so person-keyed funnels
  are wrong. The PostHog MCP defaults to project 756825 "OutOfBody"; switch to 533970.
  `costOf` (`gateway/openai.ts:691-695`) uses stale prices and bills all input at full rate; luna and
  sol report $0.
- **Prompt cache:** `prompt_cache_retention: '24h'` looks ignored on GPT-5.6; 30-min TTL in practice.
  Misses after >30 min gaps add ~19% to VIVID per-turn cost. A 12 h TTL would cost +32%, not save.

## OOC (snapshot Nov 21 evening PT, from their web app and its read-only API)

- Wrtn Technologies (Seoul), ~$166M raised, ~170–179 staff across Wrtn. OOC launched in North America
  2026-04-15. App Store name: **"OOC: The Playable Anime"**.
- ~50–65k public stories (extrapolated). ~450–650 new user-made stories a day (~505 on Nov 21) from ~400
  creators. 539 Originals in 7 months, shipped in drops of 9–25 (5 drops Nov 2–17).
- Home: event bar, 6-slide hero, 16 genre/ranking tabs, Top Ranked #1–20 (daily), Popular and New
  Originals, Trending Now (daily, new titles only), two creator rows reshuffled on every load, tag chips,
  endless grid. Rankings Daily/Weekly/Monthly × All/Female/Male. A "Today" tab lists that day's releases.
- Cards: titled glossy key art, lifetime message count + creator; 67 of 109 home cards have animated
  versions in test. One-liners advertise image and cast counts ("600+ images / 14 F / 7 M").
- Economy: 500 credits at sign-up, 300/day check-in, Free Messages events (7 free messages on every
  unplayed Original, Nov 10–30), referral 500 credits + 5% of the referee's first-30-day purchases.
  Welcome Mission checklist on Home. Endings collections (up to 30 per title).
- What trends: academy sims (Lumencia Academy 48.5M messages), OP-skill isekai (20.7M), hero academies
  (21.6M, several MHA-flavoured), harem dating sims, revenge/betrayal, roommate romance, gothic monster
  hunting. Female track: romance fantasy, reverse harem, enemies-to-lovers. Fan Fiction is kept off Home
  and out of every Top 100.

## Story bot cost (verified; corrections applied)

| Grade | Per story, EN + 1 cover | Per story, + FR, 3 portraits, smoke test | 1/day | 3/day |
|---|---|---|---|---|
| Quick (existing Create pipeline, gpt-5.6-terra) | $0.21–0.39 | $0.47–0.79 | $14–24/mo | $42–71/mo |
| Official-grade (Opus writes bible + world) | $1.99–2.17 | $2.35–2.68 | $71–80/mo | $212–241/mo |

Plus ~20 min human review per story (10 h/month at 1/day). Low end = covers via OpenAI gpt-image (already
wired, runs unattended); high end = Dare covers. Serving every player turn today ≈ $114/month
(≈ $0.025/turn, $0.24 per 20-turn VIVID session). Money is not the constraint; quality and review are:
official originals hold 7.6 turns/session, player-made 4.3, fan-IP 5.0.

Rules for the bot: borrow tropes and hooks, never text (Itachi/Ace/Light are fan IP and took 10.6% of
turns); its own OpenAI project, key and hard budget (a shared key can starve player turns); covers by
API, since Dare is an unofficial MCP tied to a login (it was expired during the run); publish through
the Create/DB path under an official account, not TS fixtures; add a real publish-time gate
(`clarity_passed` is hardcoded true in `repo/postgres.ts:1971` and `migrate.ts:158`).

## Plan v1 (ranked)

Week 1, server only, no App Review:
1. Feed that changes every day: New = newest first; Trending = last 72 h–7 d; Featured rotates daily
   around pinned best openers; played worlds pushed down; 3 rotating category rows/day; "Rising from the
   community"; Related worlds fixed; NEW badge flag. ~2 days. Built on a branch, no deploy without OK.
   Board v2 (commit 4a54fe2) titles the 72 h row "Hot right now" because "Trending now" is OOC's exact
   row name: match the server title. Board v2 onboarding (item 7) starts beat 1 with a default
   archetype so the story's setup page is skipped; the server or client must support that.
2. Featured order: lead with Good Morning Husband, Pink Tide, Zero Throne, Hush House; move Last Feather
   and Itachi out of slots 1–2. One production DB update (`story_editorial.featured_rank`). Needs OK.
3. First-day credits 10 → 20 turns. ~1 hour. Extra cost ≈ $0.25 per wall-hitter, ~3/day → < $1/day.
   Some day-0 purchases may move later. Needs OK. Read weekly cohorts (an A/B needs ~700 users/arm).
4. Fix measurement: merge PostHog identities, track notification permission/schedule/tap, fix `costOf`.
5. Storyteller returns a one-line in-character hook with each beat (streaming path) for notifications.

Week 2, app build 1.0.11:
6. Character-voiced return notification ~20 h after a run stops mid-scene; stop after 2 ignored; ask
   for permission right after the first cliffhanger, not at launch.
7. Onboarding ends inside a story's first beat (best opener for the picked tastes), not on Discover.
8. Redesign pieces from the board: Continue first, NEW/TRENDING badges, play counts, category rows.
9. Wait-or-pay at the wall: "5 free turns in 3h 59m, or continue now", with a reminder when it unlocks.
10. Tagline and copy off OOC's (board recommends "Break the plot." / "Casse l'intrigue.").

Ongoing: story bot at 1/day official-grade, weekly fixed-day drop with free turns on new stories.
Not now: social feed, creator payouts, gacha packs (need density first).

Targets (weekly cohorts, ~88 players/week so only big moves show): D1 any-open 11% → 18%; D1 played
(players) 7.6% → 15%; played within 7 days (players) 15% → 25%.

## Decisions waiting on the user

1. Ship the week-1 server fixes (items 1–5)?
2. Featured reorder + first-day credits 10 → 20 turns?
3. Build the story bot (1/day, official-grade, ~$71–80/month + ~10 h review)?
4. New tagline (OOC copy appears word for word in 4 places; list in `docs/design-v2/README.md`).
5. PixAI: the user chose it for covers (2026-11-21). They buy Starter ($9.99/mo = 300k credits;
   Tsubaki.3 = 3,400 credits/cover, enough for ~1 new story/day plus redoing the 27 official covers
   once; 3/day needs Plus, $29.99) and create an API key (root `.env` locally, Railway for prod). Then
   wire PixAI into the cover pipeline: provider switch, the existing gpt-4.1-mini title read-back,
   a franchise-symbol check; the FR title swap stays on the gpt-image edit path. Redo the 6 Featured
   covers first and show the user before any install or MEDIA_EPOCH bump.
   Bot cost, English only (the user, 2026-11-21: no French for now), full art pack: ~$3.50–4/story =
   premise $0.04 (terra) + writing ~$1.90 (Opus 5.5 API: bible 9.5K in/10K out, world 57K/45K,
   uncached repair) + PixAI cover ~$0.15 + 50–65 in-story images ~$1.30–1.80 (gpt-image-2.5 at auto
   ≈ $0.025 each, or PixAI Flash) + smoke $0.02. 1/day ≈ $115/month incl. PixAI (budget $150);
   3/day ≈ $340. Writing on the user's Claude plan via Claude Code instead of the API: ≈ $60 and
   ≈ $170. The earlier $2.50 figure counted only 3 portraits. About 60% of sessions opened in French
   in October (early-dropout-analysis.md); French adds ~$0.30/story when it comes back.

## Production side effects of this push

Simulator capture created guest `61aa9e7f-bf00-46a1-8604-1d944578e224` and session
`sess_4f306127-a6a5-42bc-99b9-e6dccdd28246`. Exclude from stats.

## Update 2026-11-21 (evening): research done, two tracks started

- Hands-on research is committed:
  - `docs/ooc-app-2026-11-21/`: OOC teardown, 71 stories, tropes.
  - `docs/competitor-ui-2026-11-21/`: 16 apps from App Store screenshots, plus hands-on passes of Character AI, Swerve, EMOCHI, Afizzy and Tolan.
- The user's direction:
  - The UI follows Character AI's strictness, not OOC's look.
  - Study visual UI only, not feature ideas.
- **Redesign** went to session plotbreak-0d.
  - Deliverables: `docs/design-v3/` with a design system and mockups of every screen. Home and play screen come first.
  - No SwiftUI changes until the user approves the look.
- **50-story plan** went to session plotbreak-6f.
  - Deliverable: `docs/stories-50/PLAN.md`, a slate built on OOC evidence, with the pipeline, credit budget and release drops.
  - One PixAI test call is allowed once `PIXAI_API_KEY` is in the root `.env`. No other spending before the user approves.
- The user subscribed to PixAI Plus.
- Side effects on the user's phone from the hands-on pass, all on third-party apps, nothing bought or shared:
  - Character AI made a guest account.
  - Afizzy spent 19 free coins.
  - EMOCHI unlocked a 30% offer.
  - Tolan texted a verification code after AutoFill submitted the user's number; the code was not confirmed.
- Still parked: branch `feed/daily-freshness` (5 commits of home-screen fixes, in the worktree `.claude/worktrees/wf_4b52e988-1fd-1`). Its workflow stopped before its critics ran. Not deployed.

## Update 2026-11-22: the 50 stories are in production, end to end

- The user approved all 50 stories "asap", each released as soon as it's ready, with no weekly drops. The user topped up PixAI.
- Pilot #7 Skill: ERROR was done by plotbreak-6f (01cbd79). The recipe is in `docs/stories-50/PIPELINE.md`. A story costs about 58K PixAI credits.
- The other 49 run as one workflow (run `wf_fc8df5c0-88e`, script under `.claude/projects/.../workflows/scripts/`), in these steps:
  1. Write the story in its own sparse worktree (`.claude/worktrees/story-<slug>`, branch `story/<slug>`).
  2. Two editor reviews (hook, compliance), then fixes.
  3. Conform the story to the pilot rules.
  4. Under one lock in main: cherry-pick, then register raw.
  5. PixAI art, with a cover check.
  6. Under the lock again: optimize, wrap with derived keys, migrate locally, commit.
  7. Smoke test, with a judge reading the transcript.
  8. Under the lock: apply fixes and append the story to `docs/stories-50/READY.md`.
- Release is not automated. Each release needs the full test suite, a merge with origin/main (main was 26 ahead and 11 behind), a push, and a prod migrate through `PROD_DATABASE_URL`. plotbreak-6f is preparing a release script with a dry run.
- Root `.env` holds `PIXAI_API_KEY`, `OPENAI_API_KEY` and `PROD_DATABASE_URL`. The production URL is renamed on purpose, so no script picks it up by default.
- Design v3 (plotbreak-0d) is finished: 24 screens, each with an inspiration card. Credits is a game-style shop. The board is https://claude.ai/artifact/ToYYtSnfTLYqfxH1AnxbBf. Waiting for the user's verdict on the look.
- Phone incident: a blind tap opened Afizzy's $129.99 purchase sheet. It was cancelled and nothing was bought. Rule: look before every tap on the user's phone.

## Checkpoint 2026-11-22 (afternoon): first new-50 release

- Pushed `78b5b9f` to main: the 37 stories, the newest-first "New on Plotbreak" row (`e3ba6c2`, `f045f3d`, `b1efb77`: stories that share a publish time take turns by a daily shuffle) and origin/main merged.
- Prod dry run (read-only): 37 new, 0 revised, no schema migration. Real `--prod` run waits for the Railway deploy to serve `story_skill_error/cover.png`.
- Held back: Level One, Wyvern Slayer and Roommate Lottery (misspelled covers); 10 stories without full art; The Villain Dies in Chapter Three (NAMED protagonist fails `protagonist.spec`).
- Partial art of 4 stories moved to `.claude/held-art/` (list in `docs/stories-50/HELD-ART.md`); Every Platform a World and The Zombie Who Said Please look complete.
- PixAI: 2.80M credits used (ledger), about 63K a story (about 20 pictures each), about 24 cover redraws. About 500K more needed for what's left.
- Gallery of every new-story picture: https://claude.ai/artifact/FT63cNJZ3CBJ1DWzkekdRv
- Design v3 feedback (Home, Story page stat squares, gems not consistent, gem everywhere, audit for consistency) sent to plotbreak-0d; it audits first, then shows a new Home.

### OOC's "animated" covers (looked 2026-11-22)
They are muted looping MP4s on cdn.ooc.ai (1080x1620 or 1166x1776, 2.8 to 12 s). Not AI video: a slideshow of 3 to 6 still character illustrations (one character each, chest-up, glamorous) cut every 0.7 to 2 s under one fixed title logo; the title's colour changes to match each character (Hero Academia: purple, red, orange). Copying it costs about 4 single-character pictures per story (PixAI) plus free ffmpeg assembly, and needs an iOS build that plays a muted looping cover video.

### Checkpoint 2026-11-22 (evening): all 50 ready, new covers, waiting on owner's cover verdict
- Cover style v2: owner picked Tsubaki.2 standard (832x1216, 2,600 credits) and real-type "elegant" titles (Cinzel) over AI-painted titles. Bake-off: `docs/stories-50/cover-style-v2/bakeoff.png`. All 50 covers redrawn: `cover-style-v2/all.png`; tools `docs/stories-50/tools/cover-v2.mts`, `cover-title.py`. My read: about 15 are too dark and covered up next to OOC; I offered a second pass for about 40K.
- The 11 unfinished stories are done (466.5K credits). #30 stays NAMED (allowlisted in `protagonist.spec.ts`). READY.md now lists all 50. Nothing released; `publishedAt` is null on the 11 and stamped on the first 37.
- Open bug (production storyteller): all 11 smokes let the player fly despite a no-flying hard-canon rule, and so do the ready stories that carry the same rule. The cause is `runTurnPure` ignoring hard canon, not the stories.
- Credits from the 1.8M top-up: about 0.70M used (bake-off 24K, packs 34K, covers about 170–185K, the 11 stories 466K).
- Gallery v2 with the new covers: https://claude.ai/artifact/FT63cNJZ3CBJ1DWzkekdRv

## Checkpoint 2026-11-23: shipped

- **50 new stories live in production** (release-stories --prod, 50 new v1, verified on /v1/discover: 50 of 50, 107 stories total). Covers: cover style v3 art (10 OOC-derived recipes, 209K PixAI credits + 24K test) with v4 titles (one font and placement per story, typeset, no sideways text). Commit 418ff0df.
- **API pushed** (origin/main 9aa33868): design v3 gap fields (continue/library last line, speaker face, archetype images, search characters), all additive.
- **iOS 1.0.11 (20)** archived (design v3 + Tower), Info.plist checked (prod API URL, codesign ok). Omar uploads from Xcode Organizer, swaps build 19 → 20 on the 1.0.11 submission in review.
- Open: tab bar icon set (A/B/C in docs/design-v3/tabbar-icons/, B recommended) not chosen; endings-found tracking, story share deep link, character rules block need product decisions; runTurnPure ignores hard canon (players can fly).
