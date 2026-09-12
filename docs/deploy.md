# Deploying the API

The app talks to one Fastify service. Everything else it needs — Postgres, auth
— is Supabase, which is already hosted. This document is about the one piece
that is not.

Host: **Railway**, from the `Dockerfile` at the repo root.

The service is live at **https://plotbreak-api-production.up.railway.app**.

There is no `railway.json`. Railway deprecated config-as-code, and services
created after 2025-08-28 cannot opt into it at all — every setting below lives
in the dashboard, so this document is the only record of what it should say.

---

## Why there is a Dockerfile at all

The API is already shaped for deployment: it binds `0.0.0.0`, honours `PORT`,
and takes `PUBLIC_BASE_URL` for the absolute URLs it hands the client. Nothing
about the code needed changing.

What needed working out was the media. `infra/seed/assets` is **3.2 GB** on a
dev machine and almost none of it belongs in an image:

| | size | ships? |
|---|---|---|
| `hero/` — 1803 runtime-generated turn images | 2.1 GB | **no**, playtest debris |
| `**/*.png` — art sources | 3.0 GB | **no**, `/media/*` serves `.webp` first |
| world art as `.webp` | 78 MB | **yes** |

`.dockerignore` encodes that. The image carries 1225 files.

---

## The one thing that is not just configuration

`services/api/src/media-routes.ts` writes generated portraits and hero frames to
the local filesystem under `ASSET_ROOT`. On Railway that filesystem is
**ephemeral**: every redeploy wipes it, and a second replica cannot see the
first one's files.

Players spend credits on that art. Losing it on deploy is not acceptable, so
until it moves to object storage:

- **Attach a Railway volume** mounted at `/data`, and set `ASSET_ROOT=/data/assets`.
- **Keep `numReplicas` at 1.** Scaling past one replica without moving media to
  object storage means half your requests 404 on art the other half wrote.

The proper fix is Supabase Storage — the bucket exists in the same project, and
`resolveAssetUrl` already passes absolute URLs through untouched, so it is a
change to the write path only. It is not needed for launch at this size.

---

## Which plan

**Hobby, $5/month.** The Free tier's 0.5 GB RAM is not enough headroom for the
Node process, and its 0.5 GB volume is the media disk — it would fill.

Hobby's ceilings are far above one Fastify service: Postgres is Supabase, so
Railway runs exactly one thing. Expect to use most but not all of the $5 of
included credit.

Two things force Pro ($20) later, neither of them today:

- Hobby is a **single-developer workspace.** A second login — Omar with his own
  account rather than sharing one — needs Pro.
- **The media volume only grows.** `media-routes` never deletes generated art,
  so 5 GB is a ceiling of roughly 25,000 images, not a steady state. Whichever
  arrives first.

---

## Service settings

Railway's monorepo detection creates a service per workspace. **Delete
`@plotbreak/mobile` and `@plotbreak/worker`** and keep only `@plotbreak/api`: mobile
is an Expo client, and the worker is a library the API imports and runs
in-process (`context.ts` constructs the `JobQueue`), not a process of its own.

Then, on `@plotbreak/api` → Settings:

| Setting | Value | Why |
|---|---|---|
| Root Directory | *(empty)* | The Dockerfile copies `packages/` and `services/` from the repo root; from inside `services/api` neither exists. |
| Builder | Dockerfile, path `Dockerfile` | |
| Target port | `8080`, with `PORT=8080` set as a variable | `loadConfig` reads `Number(env.PORT ?? 4000)`. Setting both ends the question of what Railway injects. |
| Healthcheck Path | `/health` | Empty means a deploy is "successful" the moment the container starts, including when the app died on boot. |
| Watch Paths | *(empty)* | **Not** `/services/api/**`, which is what Railway sets. This has already cost us once: a day of commits touching `packages/`, `infra/seed/assets/` and `apps/` all pushed to GitHub and Railway deployed none of them, so production served two worlds with no art and without the hero-frame fix while reporting healthy. The image also carries the art, so an asset-only commit has to deploy too. |
| Custom Start Command | *(empty)* | Railway guesses `npm run start --workspace=@plotbreak/api`, which is `tsx --env-file-if-exists=../../.env src/index.ts` — relative paths against a working directory that may not be what it expects. The Dockerfile's `CMD` is correct. |
| Replicas | 1 | See the media section above. |

---

## Environment

Set these in Railway → Variables. Railway injects `PORT` itself; do not set it.

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Supabase Postgres. Use the **pooler** connection string. |
| `SUPABASE_URL` | `https://<project>.supabase.co` |
| `AUTH_JWKS_URL` | `<SUPABASE_URL>/auth/v1/.well-known/jwks.json`. See below — **not** the legacy JWT secret. |
| `OPENAI_API_KEY` *or* `ANTHROPIC_API_KEY` | Writes every turn. With both set, `MODEL_PROVIDER` decides; with neither, the app falls back to the rule-based pipeline and the prose stops being the product. |
| `PUBLIC_BASE_URL` | The public HTTPS origin, e.g. `https://plotbreak-api.up.railway.app`. Stamped into media and turn-stream URLs — leave it wrong and phones fetch images from themselves. |
| `ASSET_ROOT` | `/data/assets`, matching the volume. |
| `NODE_ENV` | `production`. This is what turns on the startup check that refuses to boot without the two required secrets. |
| `PORT` | `8080`, matching the domain's target port. |
| `MEDIA_EPOCH` | Optional. Bump to cache-bust regenerated art. |

### Do not use the legacy JWT secret

Supabase has moved projects to asymmetric signing. On ours the current key is
**ECC P-256** and the old HS256 shared secret is listed under *Previously used
keys* — it verifies tokens issued before the rotation and nothing since. Pasting
it into `SUPABASE_JWT_SECRET` produces an API that starts cleanly, passes its
health check, and rejects every single sign-in.

Set `AUTH_JWKS_URL` instead. `SupabaseJwtVerifier` already handles ES256 against
a JWKS, including the `ieee-p1363` signature encoding — JWS ES256 is raw r‖s,
not DER, and a verifier that assumes DER rejects every token while looking
entirely correct.

It is also the better end state: the key is fetched and cached for ten minutes,
so a future rotation needs no redeploy, and no shared secret sits in Railway's
environment waiting to be lifted.

`loadConfig` refuses to start in production without `DATABASE_URL` and a signing
key, deliberately — the in-memory repository silently loses every session on
restart, and unverified bearer tokens are worse than no auth at all.

---

## Deploying

```bash
railway login
railway link            # pick the project
railway up              # builds the Dockerfile and deploys
```

Then, once:

1. Railway → Settings → **Networking** → Generate Domain. Copy it.
2. Set `PUBLIC_BASE_URL` to that domain and redeploy, so the URLs the API hands
   out point at itself rather than at localhost.
3. Railway → **Volumes** → new volume, mount path `/data`.

Verify:

```bash
curl https://<domain>/health                    # 200
curl https://<domain>/v1/discover | head -c 200  # rails, in JSON
curl -I https://<domain>/media/story_itachi/cover.webp   # 200, image/webp
```

That third one is the one people forget. If it 404s, the assets did not make it
into the image. World art is served from the image's `infra/seed/assets` even
when `ASSET_ROOT` points at a volume; only generated art lives on the volume.

---

## Pointing the app at it

`apps/mobile/.env`:

```
EXPO_PUBLIC_API_URL=https://<domain>
```

Rebuild the app — this is compiled in, not read at runtime. After that the
phone no longer needs to be on the same wifi as anybody's laptop, which is the
entire point of this document.

`Info.plist` already sets `NSAllowsArbitraryLoads=false`, so the production
origin **must** be HTTPS. Railway domains are, so nothing to do — but a custom
domain without a certificate will fail silently at the network layer.

---

## After the first deploy

- `npm run migrate` publishes the worlds. It is idempotent and safe to re-run,
  and it talks to Supabase directly rather than through the API, so it can be
  run from a laptop.
- Watch the first turn. If turns fail with nothing in the log, check the model
  provider's balance before anything else — the writer has no fallback, and an
  empty account looks exactly like a hang.
