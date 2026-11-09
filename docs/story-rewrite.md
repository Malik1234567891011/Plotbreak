# Story rewrite: web-novel cadence, faster openings, images on top

Started 2026-11-09. Why: two-thirds of new players quit within 5 turns. Players
who reach 10+ turns on day one come back within a week at 35% (vs 6% for 1–2
turns). The beats were 200–370 words of literary prose, written for a reader
who is not our player.

## Scope

The five stories new players start with most (first story since Oct 12):

| Story | Players who started here first |
|---|---|
| Second Skin | 48 |
| Pink Tide | 44 |
| Itachi | 33 |
| Good Morning Husband | 20 |
| Zero Throne | 20 |

## Safety: who sees the change

- Sessions are pinned to `story_sessions.story_version_id`, and every turn
  loads that version (`ctx.repo.getStoryVersion(session.storyVersionId)`).
- So the new style is a field on the **story version**. Only new runs of the
  rewritten versions get it. Runs already in progress keep the old opening,
  the old rules and the old word target, byte for byte.
- Old app builds: anything new in a turn payload is an optional field, which
  Swift's `Codable` ignores. No new block type, because `NarrativeBlock.type`
  has no fallback case.

## Pieces

1. Craft research: `docs/craft/webnovel-openings.md`.
2. A story-level `prose` style (`webnovel`). It adds a writing brief to the
   prompt and lowers the word target, on the production path only (`narratePure`).
3. Rewritten opening, opening suggestions, tone guide and style samples for the
   five stories, with the French overlay updated to match.
4. Images on top of the beat. This one needs an app update (1.0.9):
   - **Server:** the face is decided before the prose, it is stored on the turn
     so it stays in the history, the opening beat carries an image, and faces
     appear more often in the first few beats.
   - **App:** the image renders above the beat's text.

## Progress

- [x] Contracts: `rules.proseStyle`, `openingPanel`, `TurnPanel`, `PlayerTurnRecord.panel`. All
      optional, so untouched stories keep their definition hash (no new versions).
- [x] Narrator: the constitution is built from a template; classic is byte-identical. A full-request
      fingerprint for Pink Tide and Itachi, in en and fr, matched before and after the change.
      Webnovel stories put `reaction` first in the schema; `earlyReaction` reads it off the stream.
      Spec: `packages/director/src/pure/webnovel.spec.ts`.
- [x] API: webnovel word targets (`WEBNOVEL_WORDS`); the face is emitted before the prose with
      `placement: 'top'`; `attachPanel` is a separate try/caught write; the opening beat gets
      `openingPanel`. Migration `0016_turn_panel.sql`.
- [x] App: `TurnPanel`, `SessionTopPanel` (faces cropped square from the top of the 2:3 portrait, the opening panel 4:5), history and
      live slot, with a local fallback if the server could not store the panel.
- [x] Craft brief → `PROSE_WEBNOVEL`, `PROSE_WEBNOVEL_FR`, `FACES_WEBNOVEL` (adds: dialogue uses
      contractions; the first real-model run had everybody saying "you are").
- [x] Five openings, opening suggestions, two style samples each, a "whose face" line in each
      tone guide (not Itachi), French overlay with fresh source hashes.
- [x] Opening panels for Pink Tide, Second Skin, Good Morning Husband and Zero Throne, drawn from
      each lead's portrait (`infra/scripts/opening-panel-art.ts`). Itachi keeps its prologue.
- [x] Old-vs-new with the real storyteller (`infra/scripts/webnovel-compare.ts`), three beats each:
      old 120–283 words a beat, new 79–182. Every new beat ends on something aimed at the player.
- [x] End to end on the local API and the simulator: face before prose, panel kept on reload,
      Quick tier works, a fresh run opens at its first line instead of the bottom.

## Ship order (this matters)

1. **Deploy the code first** (push main). On its own it changes nothing: the stories in the
   database are still the old versions, which have no `proseStyle`.
2. **Then `npm run migrate`.** That adds `turns.panel` (0016) and publishes the new versions of
   the five stories. New runs get them; runs in progress stay on the version they started on.
   Never the other way round: `StoryVersion` is `.strict()`, so a server without these fields
   would reject the new definitions and Discover would 500.
3. App 1.0.9 (17) draws the picture at the top. 1.0.8 already gets the new writing and shows the
   face under the beat, the way it always has.

## Measure

The share of new players who reach 10 turns on day one, and the return rate
within a week, for runs on the new versions against the old ones.
