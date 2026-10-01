import { defineConfig } from 'vitest/config';

/**
 * Its own config, so vitest does not walk up to `vitest.workspace.ts`.
 *
 * The root workspace file lists `'infra'`, and vitest resolves that relative to
 * whichever package invoked it — so `npm test` in this package looked for
 * `packages/director/infra`, failed to find it, and exited before running
 * anything. All 57 spec files in here were dormant. `packages/i18n` and
 * `services/api` were unaffected only because they already had a local config.
 */
export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
  },
});
