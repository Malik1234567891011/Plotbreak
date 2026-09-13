# Turning payments on

Everything on our side is built and tested. What is missing is one Apple key,
and until it exists every purchase fails with *"We cannot confirm purchases
right now"* — verified against production, which answers `503
STORE_VERIFICATION_UNAVAILABLE` in ~150 ms, the no-verifier path.

## What is already correct

All six packs exist in App Store Connect as **Ready for Review**, and every
product id matches what the server sells:

| product | Apple ID | credits | bonus | player receives |
|---|---|---|---|---|
| `crd_2000` | 6811307193 | 2,000 | — | 2,000 |
| `crd_10000` | 6811308371 | 10,000 | 300 | 10,300 |
| `crd_20000` | 6811308456 | 20,000 | 1,000 | 21,000 |
| `crd_50000` | 6811308479 | 50,000 | 3,500 | 53,500 |
| `crd_100000` | 6811308234 | 100,000 | 10,000 | 110,000 |
| `crd_first_21000` | 6811308381 | 21,000 | — | 21,000 |

Bundle id: `com.plotbreak.app`.

## One gap in App Store Connect

**`crd_50000` has no App Store localizations.** Every other pack carries an
English and a French display name and description; that one has an empty
Localizations table. Apple needs at least one before review.

The copy already exists in `infra/scripts/appstore-iaps.mjs`:

- English — *50,000 Credits* / *50,000 credits, plus 3,500 on the house.*
- French — *50 000 crédits* / *50 000 crédits, plus 3 500 offerts.*

Either paste those two in by hand, or let the script do it (below).

## The key the server needs

Our verifier calls Apple's **App Store Server API**
(`api.storekit.itunes.apple.com/inApps/v1/transactions/…`), so it needs an
**In-App Purchase key** — not an App Store Connect API key, which is a different
thing in the same menu.

App Store Connect → **Users and Access → Integrations → In-App Purchase** →
**Generate In-App Purchase Key**.

That gives a **Key ID**, an **Issuer ID**, and a one-time `.p8` download. Apple
will not show the `.p8` again, so keep it somewhere safe.

## Setting it on Railway

Four variables. The last command reads the file rather than pasting its
contents, so the key never goes through a clipboard or a chat window:

```sh
railway login
railway link            # pick the Plotbreak API service

railway variables --set "APP_STORE_BUNDLE_ID=com.plotbreak.app"
railway variables --set "APP_STORE_KEY_ID=<the Key ID>"
railway variables --set "APP_STORE_ISSUER_ID=<the Issuer ID>"
railway variables --set "APP_STORE_PRIVATE_KEY=$(cat ~/Downloads/AuthKey_XXXXXXXXXX.p8)"
```

Railway redeploys on a variable change. Nothing else needs to happen: the
verifier is constructed from the environment at boot, and it tries both the
production and the sandbox host for every transaction, so TestFlight and
sandbox testers work on the same configuration.

## Proving it worked

```sh
PLOTBREAK_API=https://plotbreak-api-production.up.railway.app \
  node infra/scripts/payments-probe.mjs
```

Before: `APP_STORE → 503 STORE_VERIFICATION_UNAVAILABLE` (no verifier).
After: `APP_STORE → 402 PURCHASE_NOT_VERIFIED` — a verifier exists and refused a
forged receipt, which is the correct answer to a fake one.

Then a real sandbox purchase from TestFlight should credit the wallet.

## Fixing the localization with the script (optional)

This one needs the *other* key — App Store Connect API, same menu — and reads
the pack copy from the contract, so it cannot drift from what the server sells:

```sh
ASC_KEY_ID=... ASC_ISSUER_ID=... ASC_KEY_PATH=/path/AuthKey_XXX.p8 \
  node infra/scripts/appstore-iaps.mjs            # dry run, changes nothing
ASC_KEY_ID=... ASC_ISSUER_ID=... ASC_KEY_PATH=/path/AuthKey_XXX.p8 \
  node infra/scripts/appstore-iaps.mjs --apply
```

It is idempotent: anything already correct is left alone, and the only thing it
should want to change is the missing `crd_50000` copy.

## What I did not do

I did not generate the Apple key or put it anywhere. Generating it is a change
to your account's credentials and the `.p8` is a private key, so both belong in
your hands rather than mine — the commands above are written so you never have
to paste it anywhere either.
