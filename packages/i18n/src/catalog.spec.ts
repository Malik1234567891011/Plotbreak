import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

import { en, TRANSLATION_KEYS, type TranslationKey } from './catalog/en/index.js';
import { fr } from './catalog/fr/index.js';
import { hasStraightApostrophe } from './search.js';
import { translate, translatorFor } from './translate.js';

/**
 * The catalogue's own rules, checked rather than remembered.
 *
 * The most important one is the last block: **English must render exactly what
 * it rendered before it was keyed.** Every other test here is about French.
 */

describe('the English catalogue is the definition of a key', () => {
  it('has no French key that English does not have', () => {
    // A stale or misspelled French key would otherwise sit there translating
    // nothing, and nothing would say so.
    const unknown = Object.keys(fr).filter((key) => !(key in en));
    expect(unknown).toEqual([]);
  });

  it('has no empty English value', () => {
    const empty = TRANSLATION_KEYS.filter((key) => en[key].trim().length === 0);
    expect(empty).toEqual([]);
  });
});

describe('the French catalogue follows the French rules', () => {
  it('uses the typographic apostrophe, never the ASCII one', () => {
    const offenders = Object.entries(fr).filter(([, value]) => hasStraightApostrophe(value ?? ''));
    expect(offenders).toEqual([]);
  });

  it('never branches a plural on n === 1', () => {
    // `{count, plural, one {…} other {…}}` is correct; anything that reaches
    // for `=1` as a special case is the English rule in disguise, and it is
    // wrong in French at zero.
    const offenders = Object.entries(fr).filter(([, value]) => /\{\s*count\s*,\s*plural[^}]*=1\s*\{/.test(value ?? ''));
    expect(offenders).toEqual([]);
  });

  it('never writes a midpoint inside a message', () => {
    // PLAYER_GRAMMAR rule 4: `arrivé·e` is an administrative register, it
    // breaks read-aloud, and the product marks blocks voiceEligible.
    const offenders = Object.entries(fr).filter(([, value]) => /\p{L}·\p{L}/u.test(value ?? ''));
    expect(offenders).toEqual([]);
  });
});

describe('plurals, and the zero that is singular in French', () => {
  it('renders English counts as English always did', () => {
    const t = translatorFor('en');
    expect(t('library.runs', { count: 0 })).toBe('0 runs');
    expect(t('library.runs', { count: 1 })).toBe('1 run');
    expect(t('library.runs', { count: 2 })).toBe('2 runs');
  });

  it('falls back to English for a key French has not got yet', () => {
    // A half-built catalogue must render English, not the key. A screen full
    // of `profile.haptics` is not a useful intermediate state.
    //
    // The catalogue is complete now, so the fallback is exercised against a key
    // that is deliberately absent rather than against a real gap. Naming a real
    // key here was tried twice and broke both times — first when
    // `profile.haptics` was translated, then when the last area file landed and
    // there was no untranslated key left to find. The behaviour under test is
    // i18next's fallback, not the state of the translation.
    const missing = 'profile.language_never_translated' as TranslationKey;
    expect(translate('fr', missing)).toBe(missing);
    // And the real invariant, now that it holds: French covers every key.
    expect(TRANSLATION_KEYS.filter((key) => !(key in fr))).toEqual([]);
  });

  it('renders a French key French has got', () => {
    expect(translate('fr', 'profile.language')).toBe('Langue');
  });
});

describe('English renders identically', () => {
  it('returns the catalogue value verbatim for every key with no arguments', () => {
    // The whole of step 3 in one assertion: keying English changed nothing
    // about what English says.
    const t = translatorFor('en');
    for (const key of TRANSLATION_KEYS) {
      const value = en[key];
      // Skip the ICU messages, which are patterns rather than strings.
      if (/[{}]/.test(value)) continue;
      expect(t(key as TranslationKey)).toBe(value);
    }
  });
});

/**
 * The iOS client asks this catalogue for its words by name.
 *
 * Swift cannot import the catalogue, so a key it asks for that nobody defines
 * renders as the key itself — `setup.enter_as` in the middle of a form — and
 * nothing fails until somebody sees it on a screen. The app reads a JSON export
 * of this catalogue (`apps/ios/scripts/export-catalog.mjs`), which is one more
 * step that can silently go stale.
 *
 * Both halves are checked here: every key the Swift source names must exist,
 * and the export the app actually ships must agree with the catalogue it came
 * from.
 */
describe('the keys the iOS client asks for', () => {
  const ROOT = new URL('../../..', import.meta.url).pathname.replace(/\/$/, '');
  const SWIFT = join(ROOT, 'apps/ios/Plotbreak');

  function swiftFiles(dir: string, out: string[] = []): string[] {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return out;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) swiftFiles(full, out);
      else if (entry.endsWith('.swift')) out.push(full);
    }
    return out;
  }

  /** `t("a.b")` and `translator("a.b")`, which is how Swift names a key. */
  const REFERENCE = /\b(?:t|translator)\(\s*"([a-z0-9_]+\.[A-Za-z0-9_.]+)"/g;

  it('all exist in the English catalogue', () => {
    const files = swiftFiles(SWIFT);
    // Guard the guard: a moved directory would otherwise pass by finding nothing.
    expect(files.length).toBeGreaterThan(20);

    const missing = new Set<string>();
    for (const file of files) {
      for (const match of readFileSync(file, 'utf8').matchAll(REFERENCE)) {
        const key = match[1]!;
        if (!(key in en)) missing.add(`${relative(ROOT, file)}: ${key}`);
      }
    }
    expect([...missing]).toEqual([]);
  });

  it('are exported to the JSON the app ships, in both languages', () => {
    for (const [locale, table] of [
      ['en', en],
      ['fr', fr],
    ] as const) {
      const exported = JSON.parse(
        readFileSync(join(SWIFT, `Resources/i18n/${locale}.json`), 'utf8'),
      ) as Record<string, string>;
      const drifted = Object.keys(table).filter((key) => exported[key] !== (table as Record<string, string>)[key]);
      expect({ locale, drifted }).toEqual({ locale, drifted: [] });
    }
  });
});
