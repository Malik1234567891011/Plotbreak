# Design v2: redesign board

**Board:** https://claude.ai/artifact/8yRDJdhfSbAQe2wxSZYgpG (private Artifact, Design canvas type)
**Status (2026-11-21):** all 11 pages and 22 artboards are published. Design only; no Swift changed.
Pending: the retention and feed findings from the orchestrator session, to be folded into Home and Play.

## What the board proposes

| Page | Biggest change | Retention lever |
|---|---|---|
| Home | Continue first (with the cliffhanger line), moving hero, Top 10 that resets at midnight, Moments, Characters, grid last | A reason to open tomorrow, shown today |
| Home, first week | Welcome missions in the Continue slot; step 4 unlocks after midnight | The D1 hook |
| Story detail | Full-bleed art, proof under the title, archetype pick on the page, first line in serif | One screen fewer before beat 1 |
| Play | Scene card per beat, speaker portraits, editable suggestions, delta chip, "Next time" end card with a reminder | 58–66% quit by turn 3; 11/22 churned in slow loops |
| Library | YOUR TURN card, tabs Playing / Saved / Finished / Endings, collection counts | Collections give a reason to replay |
| Onboarding | Cold open on a real story, 3 vibe tiles, name + age on one screen, account ask after beat 3 | Play before forms |
| Create | One-sentence prompt, Remix a hit, your worlds with weekly runs | Checking your numbers is a reason to come back |
| Profile | Identity, stats, streak strip, relic vault | Visible progress |
| Wallet | "≈ 9 turns" headline, 7-day claim calendar, free ways to earn, packs as a grid | Earning before buying |
| Tower | Daily-event card on Home; results screen sells tomorrow's climb | One try a day plus a countdown |
| Design system | Night Broadcast: type roles, colors with contrast, spacing, radii, 4 cards, motion | Retire `#707888` (4.4:1, fails AA) |

## OOC overlap (artboard "OOC overlap", page 5 · Onboarding)

The current app repeats OOC copy word for word in four places and closely in three more:

- **Exact:** tagline "The Playable Anime" (OOC's App Store name is "OOC - The Playable Anime"),
  `onboarding.showcase_title`, `onboarding.name_title`, `story.info_title`.
- **Near:** `misc.sign_in_bonus` (same tooltip, same spot), `discover.official_badge` "ORIGINAL",
  and the set `discover.category_main` / `rail.top_ranked` / `rail.trending`.
- **Tagline locations:** welcome-screen logo and `docs/brand` lockups, `docs/appstore-screenshots/compose.py`,
  `docs/localization/fr-FR/APP_STORE_FRANCE.md`, `PRODUCT_VOICE.md`, `TERMINOLOGY.md`, the Discord welcome
  (`services/api/src/discord-welcome.ts`, `Discord.swift`), `packages/director` (director and media prompts), CLAUDE.md.
- **Tagline options:** "Break the plot." (recommended; FR "Casse l'intrigue."), "Anime that answers back."
  (FR "L'anime qui te répond."), "Your move. Every scene."
- Every proposed screen already uses the new strings; replacements per key are on the artboard.

## Republishing

Edit a file under `board/project/`, then publish it to the board URL with `root` = `docs/design-v2/board`,
one file per publish. Send `canvas.json` only for layout or sticky-note changes, and read the published
copy first: the board may have newer edits than the repo.

## Prod side effects (exclude from analytics)

The current-app screenshots were captured in the iOS simulator. The Debug build talks to the
production API (`Local.xcconfig` sets `PLOTBREAK_API_URL`), so the capture created real rows:

| What | Id | When (UTC) |
|---|---|---|
| Supabase anonymous user (guest) | `61aa9e7f-bf00-46a1-8604-1d944578e224` | 2026-11-22 01:39:10 |
| Itachi session, 1 beat played | `sess_4f306127-a6a5-42bc-99b9-e6dccdd28246` | ~2026-11-22 01:50 |

Device id `EF588AE4-3E1E-4AEB-BDD0-65BBEC83232C`, display name "Kai", age band 18_24.
The user id is matched by creation time (the only anonymous user created within a minute of the
first launch at 01:38 UTC, with no linked sign-in after it); confirm against the session row in
Railway Postgres before excluding. No further prod users or sessions are created by this work.

## Files

| Path | What |
|---|---|
| `research.md` | Competitor teardown: OOC (home, rankings, missions), Character.AI, Talkie, Webtoon, Episode, Chapters, Netflix; steal list; Mobbin verdict |
| `board/project/` | The board source: `canvas.json` (layout + sticky-note annotations) and one `.dc.html` per artboard. Republish with the Artifact tool, `root` = `docs/design-v2/board` |
| `assets/current/` | Current-app screenshots (iPhone 17 Pro simulator, 1.0.10 (18), prod API, guest) |
| `assets/blobs.md` | Asset ids of every image uploaded to the board |
| `assets/media/` | Covers, key art, cast portraits pulled from prod (gitignored, re-downloadable) |
