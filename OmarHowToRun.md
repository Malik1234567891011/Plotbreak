# Running PLOTBREAK

Everything needed to get the app on a phone and play a turn. Written for Omar,
2026-09-11.

There are three moving parts: a **Postgres database** (Supabase, already live),
an **API** (Node, currently only on Malik's laptop), and the **iOS app** (Swift
/ SwiftUI, an Xcode project). The app talks only to the API; the API talks to
Supabase and to a model provider.

---

## 1. What you need from Malik

None of these are in the repo, and none should be pasted into Slack or a doc.
Ask him for a `.env` file directly.

| Variable | What it is |
|---|---|
| `DATABASE_URL` | Supabase Postgres connection string |
| `SUPABASE_URL` | `https://<project>.supabase.co` |
| `SUPABASE_ANON_KEY` | Public anon key — ships in the app, safe-ish, still not for Slack |
| `OPENAI_API_KEY` | Writes every turn. **This is the one that costs money.** |
| `PUBLIC_BASE_URL` | Where the API is reachable — see §3 |
| `MEDIA_EPOCH` | Cache-busts regenerated art |

Two files, both gitignored, which is why they are not in your checkout:

- **`/.env`** at the repo root — everything above. The API reads it.
- **`/apps/ios/Plotbreak/Config/Local.xcconfig`** — the app's half. Copy
  `Local.xcconfig.example` next to it and fill in
  `PLOTBREAK_SUPABASE_ANON_KEY`. The API URL, the Supabase URL and the legal
  URL already have sane values in `Debug.xcconfig` (localhost) and
  `Release.xcconfig` (Railway); override them here when you need something
  else, such as your Mac's LAN address for a physical device.

If the OpenAI account is out of credit, **every turn fails**. The app looks
fine — worlds browse, sessions open, the opening beat appears, because that is
authored text — and then nothing commits. If turns hang, check the balance
first.

---

## 2. First run

```bash
nvm use 22            # Node 22; the repo is ESM + tsx
npm install
npm run migrate       # publishes the 23 worlds into Supabase; idempotent
npm run api           # Fastify on :4000, tsx watch
```

Check it: `curl localhost:4000/health` → `200`.

Gates, all of which should exit 0:

```bash
npm run typecheck
npm test
npm run fr:lint       # French catalogue: 727/727 keys
npm run fr:qa         # suspicious French, a queue not a verdict
```

⚠️ `npm run lint` is currently a **no-op** — the root script delegates to
workspaces and no workspace defines one. It exits 0 having run nothing. Do not
read it as a passing gate.

---

## 3. Getting it onto a phone

The API is not deployed yet, so the phone has to reach the laptop running it.
Both on the same wifi, and:

```bash
ipconfig getifaddr en0        # e.g. 10.144.7.164
```

Put that in **both** files:

- root `.env` → `PUBLIC_BASE_URL=http://10.144.7.164:4000`
- `apps/ios/Plotbreak/Config/Local.xcconfig` → `PLOTBREAK_API_URL = http:/$()/10.144.7.164:4000`
  (the `$()` is an xcconfig quirk: it stops `//` being read as a comment)

`PUBLIC_BASE_URL` matters more than it looks: it is what the API stamps into
image URLs and the turn stream URL. Leave it as localhost and the phone will
dutifully try to fetch images from itself and show none.

Then build and run. In Xcode: open `apps/ios/Plotbreak.xcodeproj`, pick your
phone, hit Run. From the terminal:

```bash
# from the repo root, with the phone plugged in and unlocked
xcodebuild -project apps/ios/Plotbreak.xcodeproj \
  -scheme Plotbreak -configuration Release \
  -destination 'platform=iOS,id=<device-udid>' \
  DEVELOPMENT_TEAM=Q7ZLXMG4SB CODE_SIGN_STYLE=Automatic
```

The simulator is easier and needs no phone or signing setup:

```bash
cd apps/ios
./build.sh      # builds, prints only errors
open Plotbreak.xcodeproj
```

There is no JavaScript bundle to swap any more — it is a native app, so a change
means a rebuild, which takes about thirty seconds.

---

## 4. Language

The app follows the phone. A French device opens in French; everything else
gets English. Profile → Langue switches it by hand.

French is real, not a stub: 22 of 23 worlds carry complete French world text and
the interface catalogue is 727/727. **Nine Weeks is at 11%** and is the one gap.

---

## 5. What is left before the App Store

Full detail in `RELEASE.md`; the Apple-account half is in `AppleForOmar.md`.
Short version, in order:

1. **Deploy the API.** It is containerised now (`Dockerfile`, `fly.toml`) but
   not yet running anywhere. Nothing else can be tested by a real person until
   it is. Note the media caveat in `docs/deploy.md`: generated art is written to
   the filesystem, so it needs a volume or object storage.
2. **Safety, for Guideline 1.2.** Reporting works; blocking does nothing, there
   is no moderation queue, and comments are unfiltered. Being worked on now.
3. **Crash reporting.** There is none. Being worked on now.
4. **App Store Connect**: the app record, and six IAP consumables that do not
   exist yet — product IDs and prices are in `AppleForOmar.md`. Superwall was
   considered and dropped; purchases go through StoreKit directly.

Decided and closed: French ships; anonymous users stay uncapped; Itachi ships as
it is.

---

## 6. Things that will confuse you, because they confused us

- **`npm run lint` runs nothing.** See above.
- **`infra/scripts` is not typechecked** — not a workspace, no root tsconfig, so
  a type error in a seed or migrate script ships silently.
- **There are two implementations of most AI stages**, and the streaming one is
  what production runs. A rule added to the non-streaming path does nothing.
  `CLAUDE.md` lists this as the bug that has bitten most often; it bit again
  today in the check-math setting.
- **`npm run smoke` plays every world badly on purpose.** It is where the real
  bugs come from. `npm run fr:smoke` is the French version.
- **Stories are versioned, not edited in place.** A fixture change needs
  `npm run migrate` *and* a new session to take effect.
- **Unpolyfilled `Intl` crashes Hermes.** `Intl.RelativeTimeFormat` segfaulted
  the app on every story page until today. `packages/i18n/src/polyfill.spec.ts`
  now fails the build if anyone reaches for one again.
