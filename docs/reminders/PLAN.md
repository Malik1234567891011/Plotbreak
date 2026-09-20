# Daily reminders + forced cover art

Working plan, 2026-09-19. Decisions taken with Malik before any code was written.

## What was already here

| | state before this work |
|---|---|
| Push / notifications | **nothing**. A `pushNotifications` feature flag defaulting to `false`, and a `notification-dispatch` queue job whose handler calls `context.log`. No APNs, no device tokens, no `UNUserNotificationCenter` anywhere in the client. |
| Daily credits | Real and shipped. `GRANT_DAILY = 300`, claimed through `wallet.claimDaily`, reset at **00:00 UTC** (`nextServerDayBoundary`). `WalletSummary` already carries `dailyClaimAvailable` and `nextDailyClaimAt`. |
| Cover upload | Real and shipped. `POST /v1/create/drafts/:id/image` moderates, strips EXIF, re-encodes and stores under `uploads/<hashed owner>/cover_<id>`. Written by the route only, never by a patch. |
| Cover **generation** for user worlds | **does not exist at runtime.** `coverPrompt` / `keyArtPrompt` exist but are called only by `infra/scripts/generate-art.ts`, the offline script for official worlds. `draftToStoryVersion` hardcodes `keyArt: null`. |
| Cover **requirement** | none. `draftReadiness` never mentions a cover. |

## Production, as measured

    25 official published · 1 user PUBLISHED · 1 UNLISTED · 1 REMOVED · 7 drafts
    374 sessions across 237 users; 260 idle runs (>=1 turn, untouched 20h) across 141 users

- **`story_user_acc1a4f67371470f` "La Chambre 314" is PUBLISHED and public with `coverImage: null` and `keyArt: null`.** The exact thing being prevented, already live.
- `story_user_c65efae8281945bd` stores a cover as a **URL** (`/media/uploads/.../cover_fe49fc1e-95e.jpg`) rather than a key. Pre-dates the fix described in `create-uploads.ts`. It is a draft, so it blocks nothing, but it will render as no cover if published. Flagged, not yet fixed.
- 141 users have an idle run right now, so the "waiting for you" reminder has a real audience.

## Decisions

1. **On-device local notifications**, not APNs. No Apple credential needed, and it can be verified end to end today. The server path stays unbuilt rather than half-built.
2. **Back-fill "La Chambre 314"** with a generated cover rather than demoting it.
3. **Cover and banner both**, generated together at publish.

## Build order

1. Notification scheduling + permission + Settings toggles, EN/FR copy, deep links.
2. Cover: `draftReadiness` gate on effective visibility, generate-on-demand route, generate-at-publish fallback, `keyArt` wired through, visibility route gated too.
3. Backfill the one live story.
4. Gates: `npm run typecheck`, `npx vitest run`, `apps/ios/build.sh`, `./test.sh`, i18n key parity, then a device/simulator run.

## Standing constraints this must not break

- English and French are both first-class. Any new player-visible string needs both, and `i18n-extract --gate` must stay at zero un-keyed client strings.
- `npm run typecheck` is a separate gate from `npm test`. Both, before committing.
- Two implementations of every AI stage; the fast/streaming one is what production runs.
- Stories are versioned, not edited in place.

---

## Built

### Reminders — on-device, both localised

- `apps/ios/Plotbreak/Notifications/Reminders.swift`. `ReminderSchedule` is pure
  and decides *when*; `ReminderSettings` is the two switches; `Reminders` is the
  only thing that touches `UNUserNotificationCenter`. Same shape as
  `ReviewPrompt`, which is the repo's existing precedent for this.
- **Daily credits** at 19:00 local, **story waiting** at 11:00 local, a week armed
  ahead, re-armed on every launch, on every wallet refresh (so claiming stops
  tonight's), and whenever a switch moves.
- Fire times are built with `Calendar.nextDate(after:matching:)`, not by adding
  86,400s, so they hold their local hour across a daylight-saving change.
- A run played in the last 20 hours is not "abandoned", so the story reminder
  waits out the rest of the day.
- Permission is asked **after the player's first finished turn**, behind our own
  alert first — iOS grants one system prompt per install and onboarding already
  spends a prompt on tracking.
- Tapping opens the wallet, or the run itself. Cold-launch taps are held until
  there is a router.
- Nothing is shown while the app is open: both reminders exist to bring someone
  back, and someone reading a beat is already back.

### Every public story has a cover

- `draftReadiness(draft, { visibility })` — new `cover_missing` issue on the
  `publish` step, **PUBLIC only**. Link-only and private are untouched.
- Both doors are gated: `POST .../publish` (which judges the body's visibility,
  not the draft's) and `POST .../visibility`.
- `POST /v1/create/drafts/:id/art` draws a cover **and** a banner, async like
  `compile`, on the `media` rate budget. Free.
- `draftToStoryVersion` no longer hardcodes `keyArt: null`, so the banner
  reaches the story page.
- The prompts are `coverPrompt`/`keyArtPrompt` — the same ones the official
  worlds were drawn with, fed a provisional compile of the draft. One
  implementation, not two.
- Client: "Draw one for me" under the cover picker, a drawing state, "Draw
  another" on a drawn cover, and the draw rejoins on reopen.

### Incidental

- `AppContext.mediaGateway` — image generation was unreachable from a test
  before this; the portrait route now shares it.
- `services/api/vitest.config.ts` points `ASSET_ROOT` at tmp. Tests were writing
  JPEGs into `infra/seed/assets/`, untracked and not gitignored.
- French catalogue back to **0 violations**: 9 pre-existing FRC002 failures
  (Discord ×5, Découvrir ×3, Profil ×1) had been red since the Discord work.

---

## The backfill, done

`infra/scripts/backfill-covers.ts` — dry by default, `--write` to draw.

**"La Chambre 314" now has both.** Cover 88 KB, banner 89 KB, both WebP, both
under `infra/seed/assets/story_user_acc1a4f67371470f/`. **These files must be
committed and deployed**, or production serves a definition pointing at art its
image does not carry.

Two things the first run got wrong, both caught by the database rather than by
me:

1. **A published `story_versions.definition` cannot be edited.** The
   `story_versions_immutable` trigger refuses it, and is right to — every live
   session pins a `story_version_id`, so an edit rewrites a run somebody is in
   the middle of (§35.3). The script publishes **v2** instead, exactly as
   republishing does. The one session already running stays on v1.
2. **The creator's draft needed the cover too.** Left null, the next thing that
   creator does is hit the new gate over art their world already has.

Verified afterwards: v2 is live and carries both keys, v1 still exists with the
single running session pinned to it, the draft carries both keys, and a second
dry run reports nothing left to do.

Serving, through the real route:

    /media/story_user_acc1a4f67371470f/cover.webp     200  image/webp  88076
    /media/story_user_acc1a4f67371470f/cover.jpg      200  image/webp  88076   ← extension-agnostic
    /media/story_user_acc1a4f67371470f/cover.fr.webp  200  image/webp  88076   ← locale fallback
    /media/story_user_acc1a4f67371470f/key.webp       200  image/webp  89210

The `.jpg` row matters: the builder's `assetKeyURL` appends `.jpg` to a raw key,
and the art is WebP.

## Findings worth keeping

- **`Local.app` (Flywheel) holds `127.0.0.1:4000`** on this machine and has for
  hours. `npm run api` binds `*:4000` and loses the race, so the simulator talks
  to Local.app instead of Plotbreak. Reach the API on the LAN address instead.
  Not killed — it is somebody's other app.
- `LocalStorePurchaseTests.testBuyingProducesASyncRequestOurDevVerifierAccepts`
  fails: `product.purchase()` never resolves, 711 s. Touches nothing in this
  work. Every other iOS test passes.
- `story_user_c65efae8281945bd` ("Crown of Seven Tides", a draft) stores its
  cover as a **URL** rather than a key, from before the `create-uploads.ts` fix.
  It will render as no cover if published. Not touched.

---

## Round two: the covers were the wrong style, and nothing was translated

Two things Malik raised after the above shipped. Both were real.

### The covers did not match the shelf

First attempt got this wrong. I read `coverPrompt` (the **v3** direction: flat
cel shading, no title), noticed the shelf had titles, and composited a wordmark
over a gradient scrim. Malik, looking at the actual covers: *"do u think theyve
been written on? no, they were genned"*. He is right — the v4 covers have the
title **drawn into the illustration** as a bespoke logo (Hush House's cracked
dripping capitals, Red Moon Brigade's scorched stencil), and their French twins
are the same picture handed back to an image model with the lettering swapped.

So `generatedCoverPrompt(story, title)` now asks for the logo in the art, in a
style picked from the world's tags — the recipe's own rule, *"sports = bold
italic athletic; romance = soft rounded script; horror = cracked / dripping"* —
and `coverTitleSwapPrompt` is the recipe's reference-image swap, including the
batch-A fix that names the old words and forbids them.

The one step of the recipe that cannot survive contact with a stranger
publishing at 2am is its last: *"verify every output by viewing it: title
spelled exactly, accents present"*. That was a person, once, for twenty-five
covers. So the machine does it — `MediaGateway.readText` reads the lettering
back off the finished image and `titleMatches` compares it, with one retry.
`leftBehind` is the batch-A check, and it steps aside when one title contains
the other, because there the old words prove nothing.

`compositeTitle` stays where it was, still used by `generate-art` and
`recomposite-titles`. Nothing in the create path composites any more, and
`.raw` art is no longer kept: the source cover *is* the reference.

### Nothing a player wrote was ever translated

`localizeStory` reads an in-memory registry populated by **fixture modules**.
Player-made worlds live in the database and are never registered, so a French
world sat in English Discover in French — and the reverse. Worse, nothing
recorded which language a world was even written in.

- `StoryVersion.sourceLocale` and `StoryDraft.locale`, set when the draft is
  made and again from the language the compiler was told to write in.
- `packages/director/src/create/translate.ts` produces the same `WorldText`
  overlay the official catalogue uses. `fr-manifest.ts` now imports its tiers
  from there rather than keeping a second copy.
- `story_version_text` (migration 0011), keyed by **version**, because a run
  pins a version and a session on v1 must keep reading v1's French.
- Publishing queues it and starts it detached; `localizeStory` falls back field
  by field meanwhile, so a publish is never blocked. Three attempts, then it is
  left alone. A sweep every ten minutes picks up whatever a deploy interrupted.
- The cover follows the title: the untitled art is kept as `<key>.raw`, so a
  translation landing an hour later re-sets the wordmark for free.
- **The bare asset key is the source language**, not English — `localizeStory`
  only suffixes when it found an overlay, so the bare cover is what an
  untranslated world resolves to for everybody.

## The backfill, round two

`backfill-source-locale.ts` — a printed decision next to the prose it was made
from, so a person can check it. Seven of eleven worlds were French and all
eleven claimed English. Every decision was 96–100% confident.

`translate-worlds.ts` — the same `translateInto` the server runs, with a limit,
dry by default. **A backfill is a bill somebody should decide to pay**, so the
local API was stopped rather than left to sweep them unattended.

**Done:** La Chambre 314, fr → en, 183 fields, 0 missing. The title stayed
`La Chambre 314` (a proper noun, correctly), the kicker became "Become the
keeper of room 314.", and `cover.en.webp` was re-set from the raw art.

**Left queued, deliberately:** six more (Blue Lock, L'Ombre du Noyau, Les
Cendres du Dragon, Les Classes multiplie, L'héritière de Cendre, Raté). None is
public. `npx tsx infra/scripts/translate-worlds.ts --write` runs them.

## Gates, at the end

    typecheck 0 · vitest 2,597 passed · lint 0
    fr catalogue 1132/1132, 0 violations · no un-keyed client strings
    apps/ios/build.sh succeeds · reminder + decoding + transcode tests 25 passed

---

## Round three: what changed after looking at it

1. **Covers are generated with the title in them**, and the other language is
   the same picture re-lettered — see the corrected section above.
2. **Only a world on the public shelf is translated.** A private draft or a
   link handed to one friend has one reader, in the language it was written in.
   Making it public later queues it through the visibility route.
3. **A world stays off the other language's shelf until it is written in it.**
   `readableIn` in `server.ts`, applied to Discover and to search. The creator
   still sees it go live immediately, and a direct link still opens it in
   whatever language it has — somebody handed a link asked for *that* world.

Six queued translations for non-public worlds were dropped rather than paid for.
They queue themselves if those worlds are ever published to everyone.

### Verified against production

    EN shelf   title "La Chambre 314"  fantasy "Become the keeper of room 314."  cover …/cover.en
    FR shelf   title "La Chambre 314"  fantasy "Deviens le gardien de la chambre 314."  cover …/cover

The title is identical in both because the translator correctly left a proper
noun alone — so no second cover was drawn, and `/media/*` falls `cover.en` back
to `cover`. Confirmed: all three of `cover.webp`, `cover.en.webp` and
`cover.en` serve the same 113 KB image.

### Gates

    typecheck 0 · vitest 2,603 passed · lint 0
    fr catalogue 1132/1132, 0 violations · no un-keyed client strings
    apps/ios/build.sh succeeds · 25 iOS tests passed
