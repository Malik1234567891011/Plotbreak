import { defineConfig } from 'vitest/config';

/** Own config so vitest does not walk up to the root workspace file, whose
 *  `'infra'` entry resolves relative to this package and aborts the run.
 *  No specs live here yet; an empty run is a pass, not a failure. */
export default defineConfig({ test: { include: ['src/**/*.spec.ts'], passWithNoTests: true } });
