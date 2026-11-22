# New-50: release prep (2026-11-22)

Design only. Nothing was written to production and nothing was pushed.

## 1. `infra/scripts/release-stories.ts`

**Never run a plain `npm run migrate` against production while the new-50 are in flight.** It
upserts the whole `LAUNCH_CATALOG`, so every story registered raw, without art, would go live. The
deploy never migrates on its own: the Dockerfile only copies `packages`, `services` and
`infra/seed/assets`, and the API does not seed at boot. A prod migrate is the only release switch.

The release script seeds **only the named stories**, using the same SQL as migrate's `seedCatalog`.

| Phase | Command | What it does |
|---|---|---|
| A, local | `npx tsx infra/scripts/release-stories.ts <story_id …>` or `--ready` | Checks each story is registered, wrapped in `withDerivedAssetKeys`, and has every webp on disk. Stamps `publishedAt` in the fixture. Runs `npm test` and `npm run typecheck`. Seeds the local DB (`--url=`, default `plotbreak_local`). Prints the git, pull and push steps. |
| B, prod check | `… --prod --dry-run <ids>` | Reads `PROD_DATABASE_URL` from `.env` (anchored match), checks HEAD is on origin/main, then works inside `BEGIN READ ONLY`. Lists new, revised and unchanged stories, and names everything a plain migrate would also publish and any schema migration not yet applied. |
| B, prod | `… --prod <ids>` | Same as the check, in one transaction, then commits. Refuses if a story's `publishedAt` is still null (stamp it in phase A first). |

Tested on #7 with `--dry-run` against `plotbreak_local` (read-only), and with an unknown id, which it
refuses. It never applies schema migrations. Keep `seedOne` in step with migrate's `seedCatalog` by
hand.

## 2. Divergence: main vs origin/main

`git merge-tree` (no working-tree change) merges main and origin/main **cleanly**. The 11 commits main
lacks:

- Covers v5 (English) for 14 existing stories, plus candidate covers.
- iOS 1.0.11 and Tower fixes: `tower.html`, `TowerCard`, `DiscoverScreen` (5 lines), `WalletScreen`, `project.yml`.
- Dashboard work and `infra/scripts/cover-openai.ts`.

None of them touch `index.ts`, `generate-art.ts`, `manifest.json` conflicts or the catalog. They are
already on origin, so merging brings nothing new to production.

Non-story code that main would push:

| File | Ships in the API image? | Safe? |
|---|---|---|
| `infra/scripts/*` (pixai, generate-art, opening-panel-art, story-checks, manifest-lock, playtest-read, release-stories) | No: the Dockerfile does not copy `infra/scripts` | No production effect |
| `packages/director/src/media/prompts.ts` | Yes. `generatedCoverPrompt` draws creator covers (`create-art.ts`) | Yes. The change only applies when `coverDirection` contains `TITLE:`. Creator directions are "one sentence … no text in the image" (`create/compile.ts`), so creator covers get the identical prompt. |
| `packages/test-fixtures` (index.ts, new stories) | Yes | No runtime effect: production reads stories from Postgres, and `LAUNCH_CATALOG` is used only by `MemoryRepository` (no `DATABASE_URL`). |

Re-check before each release, because phase-2 fixes may add code:

```bash
git diff --stat origin/main...main -- services packages ':!packages/test-fixtures'
```

## 3. Where new stories show on Home today (main = production logic)

`scoreStory` shrinks every story toward a prior of 0.25 with weight 500, so a story with 0 runs
scores exactly **0.25**. Existing stories with weak engagement score below that; seeded ones score
above it.

| Rail | New story with no plays |
|---|---|
| Featured (6) | Only if given a `story_editorial.featured_rank`; otherwise it sits behind the ranked ones. |
| Top Ranked | No: it is sorted by likes, which start at 0. |
| Trending | Only once it has plays, and at least 3 played stories are needed for the rail. |
| New on Plotbreak | `ranked.reverse()`, bottom 30% (≈23 of 76). It opens on the old weak stories scoring under 0.25, then the new ones in **reverse alphabetical** order among ties. Nothing about it is time-based. |
| All, category rows, search | Yes. |

**`feed/daily-freshness` fixes New.** Commit `2ff4e24` makes the row newest first by first-publish
date (the earliest `story_versions.published_at`), with a cover required and a cap of 12. `f357c46`
adds a 7-day `NEW` badge. The badge is server-side only: the app decodes it but doesn't draw it until
an iOS build adds the pill.

- **Minimal merge for releases:** `90dba9c` (groundwork) + `2ff4e24` (New row). They apply to main
  cleanly (tested with merge-tree). It needs no schema migration.
- **Full branch:** also rotates Featured daily, sets Trending to 72 h, adds 3 daily category rows,
  "Rising from the community", and started stories moving to the back. It merges with main cleanly
  but is a bigger product change for the owner to approve. It already contains origin/main.

## 4. Production and assets of unreleased stories

- `manifest.json` is not read at runtime (only by the art scripts).
- The media route (`media-routes.ts`) serves any `<key>.webp|png|jpg` that exists under `ASSET_ROOT`
  or the seed root. An unreleased story's art is reachable only by someone who guesses its URL;
  nothing lists it.
- Cost: the image grows about 2 MB per story, about 100 MB for 49.
