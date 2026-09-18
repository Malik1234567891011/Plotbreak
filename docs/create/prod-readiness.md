# Production readiness

2026-09-18, against `baebe1e`, which is what `main` and production both are.

## Gates

| gate | result |
|---|---|
| `npm run typecheck` | 0 errors, 6 workspaces |
| `npx vitest run` | **2,562 passed**, 16 skipped, 0 failed |
| `apps/ios/build.sh` | succeeds |
| iOS unit tests | **35 passed**, 0 failed |
| un-keyed client strings | none (22 exempt, all argued) |
| EN/FR key parity | 1,087 / 1,087 |
| production commit | matches `main` |
| migrations | all 10 applied |

## Production, exercised end to end

`npm run prod-readiness` — every assertion against the real server with real
accounts, checking outcomes rather than shapes. **26/27**, and the one failure
was the script asserting `200` where a session correctly returns `201`; fixed,
and re-confirmed separately along with a French session pinning `fr` and
opening in French.

- **Catalogue** — 25 cards, every cover fetched and decoded, no test story
  showing, French Discover genuinely French.
- **Playing** — session created, turn accepted, six blocks of prose back.
- **Creating** — cover moderated and stored, compile returns in **307ms** and
  finishes in 109s, six cast and four endings, cover survives the compile,
  publishable with nothing blocked.
- **Publishing** — a stranger sees it, its cover loads for them, they can block
  the creator (which hides it) and unblock (which restores it), they can report
  it, and the creator can take it private again.
- **Money** — wallet, store offers, creating priced at 180/15, all eighteen
  badges, the secret one still masked.

## The four things that are true about user content

Opt-in twice: a story is `PRIVATE` by default and reaches Discover only if the
creator publishes *and* chooses Everyone.

1. The compiler **refuses** premises this product will not build, and offers an
   alternative. Verified against explicit sexual content, sexualisation of
   minors, and celebration of real atrocity — all refused; a dark war-crimes
   premise was built, because dark is not the same as out of bounds.
2. Uploaded pictures are **moderated before they touch disk**, on a stricter
   list than prose, with EXIF stripped and the image re-encoded.
3. **Three reports auto-hide** a player-made story, never an official one.
4. **Blocking a creator hides everything they made**, in Discover and in
   search, and is reversible from Profile.

Takedown is `npm run moderate --story=<id> --reason="<why>"`, which writes an
audited case and marks the open reports actioned.

## Known, and deliberate

- **`LocalStorePurchaseTests` hangs** on StoreKit's sandbox network and is
  skipped. Pre-existing, unrelated to any of this work, and the reason the iOS
  suite is run with `-skip-testing`.
- **A compile is ~110 seconds.** Asynchronous now, so it survives
  backgrounding, but it is still a wait. The client covers it with phased copy.
- **Discover ranks on plays and likes**, so a new player-made story starts
  invisible and climbs. Fine at zero volume; revisit when there is some.
- **Server strings are English** (273 of them), which is a known, deferred
  piece of the localisation plan. Every one a creator can actually hit in
  Create has client-side French copy behind a stable error code.

## Before the next submission

**Committing a migration is not applying one.** `0009_story_takedowns.sql` was
committed and never run, so the takedown path was broken in production and only
turned up when it was first used for real. After any merge that adds a file to
`infra/migrations/`, run `npm run migrate`. Railway does not.
