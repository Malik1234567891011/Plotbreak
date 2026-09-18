import { defineWorkspace } from 'vitest/config';

/**
 * Every workspace's tests, with every workspace's own configuration.
 *
 * The root `vitest.config.ts` is empty, and an empty root config does not mean
 * "use each package's config" — it means the per-package configs are never
 * read. `packages/i18n/vitest.config.ts` has declared the CLDR polyfill as a
 * `setupFiles` entry all along, and running the suite the way everybody runs it
 * (`npm test` from the root) silently skipped it.
 *
 * Two things came out of that, and the second is the one that mattered:
 *
 *  1. `format.spec.ts` reported two failures forever, because the polyfill it
 *     asserts is installed was not installed.
 *  2. The other thirty expectations in that file were passing against whatever
 *     `Intl` the machine's Node happened to ship — which is exactly the
 *     divergence the polyfill exists to remove. The French formatting
 *     conformance suite was conforming to the wrong implementation.
 *
 * So: list the packages, and let each one bring its own setup.
 */
export default defineWorkspace([
  'packages/*',
  'services/*',
  'infra',
]);
