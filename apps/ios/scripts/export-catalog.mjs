// Exports the @plotbreak/i18n catalogues to JSON for the iOS app.
//
// The TypeScript catalogue is the source of truth for every string in every
// client. Swift cannot import it, so this flattens `en` and `fr` to
// `Resources/i18n/<locale>.json`, which `Translator.swift` reads at launch.
// Runs as an Xcode pre-build step when node is available; the JSON is also
// committed so a machine without node still builds.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../..');
const out = resolve(here, '../Plotbreak/Resources/i18n');
mkdirSync(out, { recursive: true });

// tsx evaluates the TS catalogue in place; the index is side-effect free.
const script = `
  import { en, fr } from '${resolve(root, 'packages/i18n/src/index.ts')}';
  process.stdout.write(JSON.stringify({ en, fr }));
`;
const result = spawnSync(resolve(root, 'node_modules/.bin/tsx'), ['--eval', script], {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});
if (result.status !== 0) {
  console.error(result.stderr);
  process.exit(result.status ?? 1);
}
const { en, fr } = JSON.parse(result.stdout);
for (const [locale, table] of Object.entries({ en, fr })) {
  const sorted = Object.fromEntries(Object.entries(table).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(resolve(out, `${locale}.json`), JSON.stringify(sorted, null, 2) + '\n');
  console.log(`${locale}: ${Object.keys(sorted).length} keys`);
}
