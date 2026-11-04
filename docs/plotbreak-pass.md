# Plotbreak Pass

A $2.99/week auto-renewing subscription. Decided 2026-10-29.

## Why

- Payers are fine (3.7% of players pay, at or above game norms). Day-1 return is
  the weak spot (12% of players who played a turn, vs ~22% for a median game).
- The regulars who come back every day for the 300 free credits and stop (Chris,
  Trey, Argam, Alexis, Tojī) are exactly who a daily-paying subscription is for.
- The benefit is paid **daily**, not as a weekly lump, so it is a reason to open
  the app tomorrow.

## What it gives

| | |
|---|---|
| Price | $2.99 / week, `pass_weekly`, group "Plotbreak Pass" (ASC group 22527240, product 6828608247) |
| Daily bonus | +400 credits each server day (00:00 UTC), on top of the normal 300 daily |
| Value | 2,800 credits/week ≈ 47 Vivid turns ≈ 935 credits per $ — better than every standing pack (692–769/$), worse than the first-purchase starter (1,414/$) so the starter stays the best first buy |
| Story requests | Pass holders can submit a story request (one per 7 days) and vote. The top-voted request each month becomes an official story. |

## How it works

- The client buys `pass_weekly` with StoreKit and syncs the transaction to
  `POST /v1/store/purchases` exactly like a pack. The server sees the product is
  the pass, asks Apple for the transaction, and records a row in
  `subscriptions` keyed by `original_transaction_id` with the `expires_date`.
  No `PURCHASE` ledger row: a subscription is not credits.
- Renewals arrive as new transactions on the same original id. The client
  forwards `Transaction.updates` as it already does; the server also refreshes
  an expired row from Apple's subscription-status endpoint before deciding a
  pass has lapsed, so a renewal that happened while the app was closed counts.
- The daily bonus is a `SUBSCRIPTION_GRANT` ledger row with idempotency key
  `pass:<account>:<day>`. It is granted on the daily claim and on the purchase
  itself (so buying it pays today's 400 immediately).

## Status

- [x] `crd_1000` ($1.49, 1,000 credits) — server live e01bae9, ASC submitted 2026-10-29
- [x] Flash offer: only after a first purchase, 72h window — live e01bae9
- [x] ASC: subscription group + `pass_weekly` $2.99/week, en + fr names
- [x] Server: subscriptions table, pass status on wallet, daily grant, story requests — db7f14f, **not deployed**
- [x] iOS: Pass card (wallet + wall), story requests screen, legal copy — 2500066, verified on a simulator against a local in-memory API
- [x] ASC: review screenshot + notes on `pass_weekly`
- [x] Build 1.0.7 (15) archived; points at production (checked Info.plist)
- [x] Migration 0014 on production (applied 2026-10-29, checked `schema_migrations` 2026-11-03)
- [x] Push db7f14f/2500066 to main — API live at `a4bc4e0` (checked `/health` 2026-11-03)
- [x] Upload 1.0.7 (15) — re-archived from `a4bc4e0` on Omar's Mac so it carries the
  onboarding change; uploaded 2026-11-03 with `xcodebuild -exportArchive`
  (`destination=upload`). First attempt failed with `PLA Update available`: Apple's
  updated Program License Agreement had to be accepted on developer.apple.com first.
- [x] ASC: version 1.0.7 created; What's New en + fr; description no longer says
  "No subscription." / "Pas d'abonnement." and ends with Terms + Privacy links;
  review notes gained a 1.0.7 Pass section and the offer now reads 72h / after a
  first purchase
- [x] ASC: build 15 + `pass_weekly` + the Plotbreak Pass group submitted together
  2026-11-03 ("Waiting for Review"). A first subscription needs all three in one
  submission: Add for Review on the subscription, then the group, then the version.
  Release is automatic, to all users at once.

Developer Program membership expires around 2026-11-28 — turn on auto-renew.

The app is safe against the old server: with no `pass` in the wallet response
the card does not render.
