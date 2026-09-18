# Analytics (spec §37)

## PostHog project

| | |
|---|---|
| Project | **Plotbreak** — id `533970` |
| Org | CielPM (`019faf1c-135c-0000-7d18-b0c3dcd8576a`) |
| Host | `https://us.i.posthog.com` |
| Public key | `phc_oVoU4BZ93vmNppEpDcrdekzcUFitN5TADZbTwiaT7ChT` |
| Dashboard | https://us.posthog.com/project/533970 |

Created 2026-09-13 by renaming the org's unused "Default project" (the PostHog MCP
has no `project-create` tool). It had never ingested an event.

**Session replay is off, deliberately.** On iOS replay renders periodic screenshots
of the running app — continuous CPU, battery and upload cost. Plain event capture
is a disk-backed queue flushed on a background thread and costs effectively nothing;
replay is the one mode that would show up in a frame budget. Also off for the same
reason: web vitals, console capture, performance capture, heatmaps, dead clicks.

## Contract

`packages/analytics/src/index.ts` is authoritative. 37 events, each with a Zod
property schema; emitting a name not in `EVENT_NAMES` is a type error.

Swift cannot import it, so `apps/ios/scripts/export-events.mjs` mirrors
`EVENT_NAMES` into `PlotbreakEvent` (and `CONTRACT_VERSION` alongside it). It
runs as an Xcode pre-build step and the output is committed, so a machine
without node still builds. Rename an event in the contract and the Swift case
disappears — every client call site stops compiling, which is the whole point.

Per §30.2 no event carries player text, story prose, or anything that would let
PostHog reconstruct a session. Ids and tags only.

## Where each event is emitted

Split by who actually knows the fact. The server cannot see a screen and the
client cannot see what a turn cost to generate, so neither side could carry the
funnel alone — they meet on one `distinctId` (the signed-in user id, or the
device's install id before there is one), and `aliasGuest` merges the two halves
when a guest signs up.

### Server — `services/api`

| Event | Emitted at |
|---|---|
| `turn_submitted` | `turn-service.ts`, at the reserve — so the failure-rate denominator counts turns that started |
| `turn_completed` | `turn-service.ts`, **both** pipeline paths |
| `turn_failed` | `turn-service.ts` catch |
| `turn_10_reached` | `turn-service.ts`, once, on the turn that crosses |
| `consistency_violation`, `turn_repaired` | `turn-service.ts`, staged path only |
| `purchase_completed`, `purchase_failed` | `POST /v1/store/purchases/sync` |
| `daily_grant_claimed` | `POST /v1/wallet/daily-claim` |
| `timeline_forked` | `POST /v1/sessions/:id/forks` |
| `canon_correction_submitted` / `_refused` | `POST /v1/sessions/:id/canon-corrections` |
| `report_submitted` | `POST /v1/reports` |
| `story_saved` | `POST`/`DELETE /v1/stories/:id/save` |
| `story_hidden` | `POST /v1/stories/:id/hide` |
| `guest_account_migrated` | `POST /v1/auth/guest-migrate` (also calls `aliasGuest`) |
| `quality_tier_changed` | `PATCH /v1/me`, only on an actual change |
| `portrait_generated` | `POST /v1/sessions/:id/portrait`, after the charge |

### Client — `apps/ios`

`app_opened`, `age_gate_completed`, `taste_calibration_completed`,
`discover_viewed`, `story_card_viewed`, `story_detail_viewed`,
`character_setup_started`, `session_started`, `first_turn_submitted`,
`sign_in_started`, `sign_in_completed`, `wallet_opened`,
`insufficient_credits_shown`, `purchase_started`, `world_sheet_opened`,
`suggestion_tapped`, `session_resumed`, `session_abandoned`, `share_created`,
`community_invite_shown`, `community_invite_tapped`.

`session_started` and `first_turn_submitted` are client-side because their
properties (`setupDurationMs`, `secondsSinceAppOpen`) are measured against the
app's own clock; the server never sees when setup began.

## Two traps worth knowing

**The turn pipeline has two implementations and both are wired.** The narrative
runtime (`runTurnPure`) is what production runs; the staged pipeline (`runTurn`)
only runs under `PLOTBREAK_NARRATIVE=engine`. A new turn event added to one and
not the other does nothing in production. See CLAUDE.md — this has bitten six
times.

**`providerCostUsd` is exact on the narrative path and zero on the staged one.**
`pure.invocation.costUsd` is what the provider billed. The staged pipeline
spreads its spend across four model calls and never totals them, so it reports
zero rather than a guess. Nothing in production reaches that path; if that
changes, this is the first thing to plumb.

## Headers the client must send

| Header | Why |
|---|---|
| `x-device-id` | The install id. Without it, signed-out server events get a per-request id and no funnel survives. |
| `x-platform` | `ios`. An unlabelled caller is recorded as `web` rather than guessed — smoke runs and curl must not pad the iOS numbers. |
| `x-app-version` | Already sent. |

## Status

- [x] PostHog project created and configured, replay off
- [x] `PostHogSink` + `createSinkFromEnv` in `packages/analytics`
- [x] Server call sites wired (18 events)
- [x] Generated Swift enum + `posthog-ios` 3.74 in `apps/ios`
- [x] Client call sites wired (19 events)
- [x] Verified end to end — a real `turn_completed` ingested with its full
      property shape (`storyId: wiring-check`, a deliberate test row in an
      otherwise-empty project)

## Known rough edges

**Debug builds send nothing.** `PLOTBREAK_POSTHOG_KEY` is empty in
`Debug.xcconfig` and `Telemetry.enabled` is false on the simulator, so a
developer's own taps never land in the funnel the launch targets are measured
against. Put a key in `Local.xcconfig` to test the client wiring on a device.

**`story_card_viewed` is the one high-volume event.** A shelf holds seventy
covers and each one that scrolls into view is an impression. It is deduped per
app run, which removes the flick-back-and-forth multiplier, but it will still
out-count everything else combined. If the bill says so, sample it rather than
removing it — the alternative is not knowing which covers are being skipped.

**`sign_in_started.trigger` is coarse.** It always says `auth_screen`. The real
question — what sent them to sign in, the wallet or the library gate or a share
link — needs threading through the presenters and is not done.

**`share_created.storyId` is `unknown` from the world-sheet timeline.** That
screen is built from the sheet and the timeline, neither of which carries the
story's id. The session's own share button reports the real one.
