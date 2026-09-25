# Activation + monetization

Branch `activation-and-monetization`, off `main` @ `0dfd159`.

Two funnel problems, from Malik's brief of 2026-09-24.

## The numbers we are working against

| stage | users |
|---|---|
| Viewed story detail | 225 |
| Entered character setup | 197 |
| Session started | 182 |
| Submitted first turn | 144 |

225 → 144 is **64%**. The 197 → 144 leg loses 53 people (26.9%), in two places:
15 never start a session, 38 start one and never type.

Monetization, players at 10+ turns: 47 reached it, 38 hit the wall, 41 opened
the wallet, **1 genuine external purchase** (the second was an internal test).
Discovery is not the problem; the offer is.

## What the code actually does today

Three findings that shape the work:

1. **`router.push(.characterSetup(...))` is the only way into a story.** Both
   CTAs on `StoryDetailScreen` (`New session`, and the one beside `Continue`)
   go there. There is no path from a story to a session that does not stop at
   the setup screen first.

2. **Most of what setup collects never reaches the storyteller.** Production
   runs the Pure path (`runTurnPure`), and the only identity it reads is
   `archetypeId` (picks which origin `worldBrief` describes) and, for `BLANK`
   worlds, `displayName` + `pronouns` in `rightNow()`. `worldKnowsAboutYou`
   is read only by `context.ts:503`, which is the legacy engine path.
   `appearance` survives only as an input to the player portrait.
   So a default identity loses almost nothing that is live.

3. **The cheapest thing we sell is $2.89, and the first-purchase offer is
   $19.99.** `FIRST_PURCHASE_OFFER` is `crd_first_21000` — 21,000 credits for
   $19.99. Our one real payer spent $2.89 and then played 98 turns. The first
   ask is an order of magnitude above the only first purchase anyone has
   actually made.

Also true and worth keeping in view: a new account gets `GRANT_NEW_USER` =
10 Vivid turns, and `GRANT_DAILY` = 5/day. The wall at turns 10–14 in the data
is exactly that grant running out.

## 1. Play now

Direction A, chosen by Malik.

- Story detail leads with **Play**, which creates the session immediately.
- **Customize character** is the secondary action and opens the existing screen
  unchanged.
- Defaults: `NAMED` worlds use their canon (name, pronouns, description,
  grammar derived from canon pronouns) — they already ask nothing. `BLANK`
  worlds use the name onboarding already collected, the player's last-used
  pronouns, and the world's **first archetype**, because an author orders them
  and a null origin means `worldBrief` tells the storyteller nothing about who
  the player is.
- Personalization moves *into* the story: a "Who are you?" entry that edits the
  same identity, so the decision is made by somebody who has read a scene.

## 2. Sell continuation, not currency

- The wall becomes a continuation moment, not a shop: what it costs to keep
  going, what that buys **in turns**, and the free routes (tomorrow's grant,
  and unclaimed badge credits) stated plainly rather than hidden.
- A real price ladder with a low first step, and turns as the primary unit.
- First purchase is genuinely better, and says so.
- After a purchase, the player lands back on the action they were trying to
  take.

## 3. Badges as a free credit route

Unclaimed badge credits are money the player has already earned and not
collected. Surfaced at the wall and as a reminder.

## App Store Connect

The six old packs turned out to be **Approved** already — `apps/ios/PORTING.md`
still says none of them exist, which has been wrong for a while.

Three new consumables created 2026-09-24, each available in all 175 regions with
English and French display names:

| Product ID | Price | Apple ID | Status |
|---|---|---|---|
| `crd_starter_700` | $0.99 | 6815902704 | Prepare for Submission |
| `crd_3800` | $4.99 | 6815903246 | Prepare for Submission |
| `crd_8200` | $9.99 | 6815904175 | Prepare for Submission |

**They are not submitted.** Each still needs a review screenshot and an
`Add for Review` alongside the next build — deliberately left for whoever cuts
that build, since submitting is tied to it.

The retired packs stay sellable forever through `LEGACY_STORE_OFFERS`, because a
build in the wild is still showing the old ladder and StoreKit can redeliver one
of its transactions days later.

## Status

- [x] Branch cut
- [x] Contracts: offer ladder, turns-per-credit, first-purchase bonus
- [x] Server: offers endpoint, grant path, deeper instrumentation
- [x] iOS: play now, personalize-in-story
- [x] iOS: continuation wall, wallet ladder in turns
- [x] Badges surfacing + reminder
- [x] App Store Connect products
- [x] Gates: typecheck 0, vitest 2669 pass, fr-lint 1164/1164 0 violations
- [x] Simulator: played end to end against a dev API
- [ ] Device: installed, launch blocked on a locked phone

## What the simulator run showed

Against an API in dev-token mode with the in-memory repo (production Postgres
deliberately untouched), on a fresh guest:

- **Play** goes from the story page into a live opening scene in one tap, and
  the default identity reaches the prose — the storyteller wrote *"your name,
  Malik, remains stubbornly legible"* without anyone filling in a form.
- Story detail shows `Play` / `Customize character`, and `Continue` /
  `New session` / `Customize character` once a run exists.
- The wall opens the continuation sheet: *"Your story is waiting / You are out
  of credits partway through The Ninth Archive"*, **first purchase**, **7 more
  turns**, 1,400 credits, `Continue story · $0.99`, and both free routes —
  the daily grant and *"150 credits waiting in your badges"*.
- The turns figure is tier-aware: 7 at Apex, and the wallet's rungs read
  7 / 19 / 42 turns at the same tier.
- `PATCH /v1/sessions/:id/identity` renames a run, moves the library's name with
  it, refuses an archetype the world does not have, and refuses to rename a
  world that names its own protagonist.

**One bug found and fixed on the way:** a guest tapping *Claim your free daily
credits* got a 403 the sheet swallowed, so the row did nothing. It now says
*"Sign in to claim your daily credits."*

## Not verified

- **The purchase itself.** `simctl launch` does not apply the scheme's StoreKit
  configuration, so the sandbox asks for a real Apple Account. Run from Xcode to
  exercise it against `Plotbreak.storekit`, which now carries all three rungs.
- **The device.** Built, signed and installed on the connected phone as
  `com.plotbreak.app` pointing at `10.144.7.178:4000`; it would not launch
  because the phone was locked.

## Local testing note

`apps/ios/Plotbreak/Config/Local.xcconfig` is currently overridden to point at
the Mac's LAN address rather than `localhost`, because Local.app squats
`127.0.0.1:4000` on this machine and wins the more specific bind. The original
is backed up in this session's scratchpad. Restore it before building anything
that should talk to Supabase.
