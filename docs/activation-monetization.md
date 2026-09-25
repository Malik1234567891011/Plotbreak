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

**Revised 2026-09-24 after Malik's review.** The first pass replaced the five
standing packs with a three-rung ladder. That capped what anybody could spend at
$9.99 and removed the packs our only real payer has ever bought from — a bigger,
less reversible bet than the evidence supports. The five are back and unchanged;
the offers sit *on top* of them.

| | credits/$ |
|---|---|
| first purchase — $0.99 → 1,400, once per account | 1,414 |
| flash window — $9.99 → 16,400, 12h, weekly at most | 1,642 |
| the five standing packs, $2.89–$142.99 | 692–769 |

Both value-adds are about twice the best standing rate, which is what makes them
read as offers rather than as more rows, and a test fails if a standing pack
ever beats one of them.

The countdown is real, which is the only way to have one without breaking §3.8:
running out mid-story opens it, the open is a zero-amount `PROMO_GRANT` in the
append-only ledger, and the deadline is computed from that row server-side — so
it survives a reinstall, does not move with the device clock, and cannot reopen
for seven days. Most walls never reach the server, so `POST
/v1/wallet/credit-wall` is where the client reports one.

Turn counts are quoted at **Vivid** everywhere and say so. They used to follow
the quality pill, so the same pack read 23 turns on Vivid and 7 on Apex; a
number that moves under the player is worse than one that is occasionally
generous.


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

---

# Shipping this

**Not yet.** In order, and the first two are the ones that actually bite.

## 1. The three products are not submitted

`crd_starter_700`, `crd_3800` and `crd_8200` sit at *Prepare for Submission*.
Each needs a review screenshot and has to be attached to the version
submission. Shipping the app without them is **worse than not shipping the
offers at all**: the $0.99 first purchase and the $9.99 flash deal would render,
be tapped, and fail at payment. Only Malik can do this.

`crd_3800` is no longer listed anywhere. Delete it or leave it; it stays
creditable either way.

## 2. Deploy order: API, then migrate, then the app

The client is written to survive an older server — `/v1/wallet/credit-wall`
falls back to the plain wallet, and a payload with no `prologue`,
`flashOfferExpiresAt` or `firstPurchaseBonusAvailable` reads as empty/false. One
exception: `PATCH /v1/sessions/:sessionId/identity` has no fallback, so the
"Who are you?" editor errors against an undeployed API.

The prologue has a harder constraint. `StoryVersion.prologue` is defaulted, so
old versions still parse — but a *new* Itachi version carrying it must not be
published until the deployed API understands the field. That is the `calledName`
ordering exactly: **the schema ships before the data that uses it, never
after.** So:

1. merge and deploy the API
2. `npm run migrate` (publishes Itachi with its prologue; the webp are committed
   under `infra/seed/assets/story_itachi/prologue/`)
3. submit the app

Do not run `migrate` against production from a branch whose contract changes are
not deployed.

## 3. Before the submission itself

- **Bump the version.** `project.yml` still says 1.0.4 / build 12.
- **Build the artifact the normal way.** A Release build through the MCP tooling
  produced an `Info.plist` with no `PLOTBREAK_API_URL` and a default 1.0.0/1
  version, so that path is not equivalent to an Xcode archive. Archive from
  Xcode and read the `Info.plist` back before uploading.
- **Release notes and review notes.** The timed offer is a countdown, and
  countdowns draw review attention. It is worth saying plainly that the window
  is server-authoritative, opens only after a player runs out mid-story, and
  genuinely lapses — because it does.
- **A full `npm run smoke`.** Only `--only=itachi --quick` was run, on the
  grounds that nothing in this branch touches the narrative path. It flagged one
  `NO_CONSEQUENCE` on unprovoked aggression, which belongs to the same family as
  the already-open #31 / `FORGOT_VIOLENCE` items and was not shown to be new.

## A hazard that was live and is now fixed

`Release.xcconfig` ends with `#include? "Local.xcconfig"`, and local testing had
put `PLOTBREAK_API_URL = http://10.144.7.178:4000` in that file. **An App Store
build cut from this machine would have shipped pointing at a laptop on a home
network.** Restored. Worth knowing the include exists: anything in
`Local.xcconfig` reaches Release, not just Debug.
