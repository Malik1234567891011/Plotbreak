# Plotbreak — Project ANIMA

An anime-flavoured roleplay RPG where you type anything and a **deterministic game
engine** decides what actually happens.

> The model interprets intent. The game engine determines truth. The AI director
> makes truth entertaining.

Built to `PROJECT_ANIMA_PRODUCT_SPEC.md` v1.0, `ai_contracts.json` v1.0.0, and
`screen_inventory.csv`.

## Why this architecture

Most "AI RPGs" let the language model narrate itself into omnipotence: you type
"she falls in love with me" and she does. Here the model never decides outcomes.
It parses your sentence into a structured intent, a pure TypeScript engine rolls
the dice and mutates state, and only then does a writer describe what the engine
already decided. Relationship gates, inventory, quests, and death are engine
truth — prose is decoration over it.

## Layout

```
apps/ios           SwiftUI client, Xcode project (four root tabs + session shell)
apps/admin         Next.js admin console
services/api       Fastify /v1 API, SSE turn streaming, wallet ledger
services/worker    Async media, embeddings, rollups
packages/contracts Zod twins of ai_contracts.json + the REST surface
packages/engine    Pure deterministic rules: seeded RNG, checks, mutations
packages/director  Context building, model gateway, beat planning, writing
packages/analytics Typed event names
packages/config    Feature flags and environment-safe public config
infra/migrations   Postgres schema
infra/seed         Official launch worlds
```

`director` is never imported into the client. No model, storage, or store secret
ever reaches the app bundle (spec §31.7).

## Running it

```bash
npm install
npm run api      # http://localhost:4000  — works with zero API keys
```

The client is an Xcode project, not an npm workspace:

```bash
cd apps/ios
./build.sh                # build for the simulator, errors only
./test.sh                 # unit tests
open Plotbreak.xcodeproj  # Debug talks to http://localhost:4000
```

The API defaults to the rule-based pipeline, so the full turn sequence —
parse → resolve → direct → write → validate → commit → stream — runs end to end
offline with no keys at all. Put `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` in a
`.env` at the repo root and the parser, director and writer route to a real
model instead; `MODEL_PROVIDER` picks between them if both are set. The same
`OPENAI_API_KEY` drives image generation (`npx tsx infra/scripts/generate-art.ts`).

## Checking it

```bash
npm run typecheck && npm run lint && npm test
npm run smoke     # plays every world against a running API and reports what looks wrong
```

`smoke` is the one that finds the interesting failures — unrequested movement,
absent characters given lines, engine internals reaching the client — because it
exercises the whole pipeline against whichever model provider is configured.
Unit tests pin the rules; this plays the game.

## Docs

- [`docs/handoff-2026-09-25.md`](docs/handoff-2026-09-25.md) — **start here.** Running it
  locally without tripping over the three traps that look like app bugs, giving a story
  an opening cinematic, and the ordering rules that have already cost money
- [`docs/architecture.md`](docs/architecture.md) — turn pipeline and package boundaries.
  Describes the deterministic engine, which is no longer the production path; see `CLAUDE.md`
- [`docs/engine.md`](docs/engine.md) — check maths, outcome bands, mutation rules
- [`docs/activation-monetization.md`](docs/activation-monetization.md) — why Play skips setup,
  and how the credit wall and the two offers work
- [`docs/status.md`](docs/status.md) — from 2026-09-10. History, not state
