import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { defineConfig } from 'vitest/config';

/**
 * Somewhere to put the pictures the tests write.
 *
 * `create-uploads.ts` and `create-art.ts` both resolve `ASSET_ROOT` at import
 * time and default it to `infra/seed/assets` — the seeded world art that ships
 * inside the Docker image. Without this, a test that uploads a cover writes a
 * JPEG into that directory and leaves it there: untracked, not matched by the
 * `*.png` rule in `.gitignore`, and one `git add -A` away from being committed.
 *
 * Reading still falls through to the seed directory, because `media-routes.ts`
 * searches `[ASSET_ROOT, SEED_ROOT]` whenever the two differ — which is also
 * how production is configured, so the tests now exercise that arrangement
 * rather than the single-root one only a dev machine has.
 */
export default defineConfig({
  test: {
    env: { ASSET_ROOT: join(tmpdir(), 'plotbreak-test-assets') },
  },
});
