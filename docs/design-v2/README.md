# Design v2: redesign board

**Board:** https://claude.ai/artifact/8yRDJdhfSbAQe2wxSZYgpG (private Artifact, Design canvas type)
**Status (2026-11-21, in progress):** Overview, Home, Story detail, Play, Library done. Onboarding (with
original copy + OOC overlap audit), Create, Profile, Wallet, Tower, design system next. Design only.

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
