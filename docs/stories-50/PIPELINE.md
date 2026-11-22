# New-50: per-story commands

Verified on the pilot, #7 Skill: ERROR (see the bottom for its numbers). Run everything from the
repo root of ONE checkout that has all of `infra/`, `packages/`, `services/` (not a sparse worktree).
`<slug>` is the fixture file name (`skill-error`), `<id>` is the storyId without `story_` (`skill_error`).

## 0. Once per machine

```bash
createdb plotbreak_local                                   # already done on this Mac
npm run migrate -- --url=postgres://localhost/plotbreak_local
# local API on :4000 against the local DB (no watch, so fixture edits don't restart it mid-smoke):
cd services/api && DATABASE_URL=postgres://localhost/plotbreak_local npx tsx --env-file-if-exists=../../.env src/index.ts
```

**Always pass the local DB explicitly.** The root `.env` holds `PROD_DATABASE_URL`. Every command
below either gets `--url=` or `DATABASE_URL=postgres://localhost/plotbreak_local`.

## 1. Checks, then the gates (before art)

```bash
npx tsx infra/scripts/story-checks.ts <slug>              # exit 0 = pass; read the WARN lines
npm test 2>&1 | grep -E "Test Files|Tests |FAIL"
npm run typecheck; echo "typecheck exit $?"               # separate gate from npm test
```

## 2. Register (raw, before art)

In `packages/test-fixtures/src/index.ts`: import `{ <SLUG_UPPER> as <SLUG_UPPER>_RAW }`, export
`<SLUG_UPPER> = <SLUG_UPPER>_RAW` and add it to `LAUNCH_CATALOG`. Art scripts only see registered stories.

## 3. Art (PixAI)

```bash
npx tsx infra/scripts/generate-art.ts --provider=pixai --only=story_<id>/ --concurrency=6
npx tsx --env-file=.env infra/scripts/opening-panel-art.ts --provider=pixai --story=<id>
npx tsx infra/scripts/optimize-art.ts                     # PNG -> webp, what the API serves
```

Then look at the cover (title spelled right, no stray text, readable small). A bad cover:
`--force` re-runs everything, so instead move the bad `cover.*` out of `infra/seed/assets/story_<id>/` and
re-run step 3's first command; only the missing asset is drawn.

## 4. Register with art

Wrap it: `export const <SLUG_UPPER> = withDerivedAssetKeys(<SLUG_UPPER>_RAW);` then re-run the gates.

## 5. Local play

```bash
npm run migrate -- --url=postgres://localhost/plotbreak_local
npm run smoke -- --only=<id>                              # needs the local API running
DATABASE_URL=postgres://localhost/plotbreak_local npm run playtest latest
DATABASE_URL=postgres://localhost/plotbreak_local npm run playtest <session-id>
```

Smoke exits 1 whenever it flags anything, and shipped stories get flags too (Good Morning, Husband:
one NO_CONSEQUENCE). The gate is: read every flag, fix what is a real story defect.

## 6. Commit

Only the story's paths: bible, fixture, spec, `index.ts`, `infra/seed/assets/story_<id>/*.webp`,
`infra/seed/assets/manifest.json`. Never `git add -A`.

## Costs (PixAI, measured 2026-11-22, ledger in `pixai-ledger.tsv`)

| Image | Model | Credits | Time |
|---|---|---|---|
| Cover, title painted in, 1152×1744 | Tsubaki.3 pro | 4,400 | ~40 s |
| Opening panel, portrait as reference | Tsubaki.3 pro + contextImages | ~4,200 | ~60–120 s |
| Key art, portraits, stages | Tsubaki.2 lite | 2,700 | ~15 s |

Tsubaki.3 has only `pro`/`ultra` on the API; the website's "Flash" is not exposed. Tsubaki.2 lite looked
better than Tsubaki.3 pro in a side-by-side (`test-cover/measure_sheet.jpg`, left to right: T3 pro,
T3 pro small, T2 standard, T2 lite).

Parallel runs: PixAI allows 10 *waiting* tasks per account (running ones don't count); the client backs
off when full, so several stories can run at once. Manifest writes are locked, so parallel runs in one
checkout are safe.
