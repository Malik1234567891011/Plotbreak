/**
 * French that is still English.
 *
 *   npm run fr:identical
 *
 * `fr:lint` counts keys and checks rules, so a key whose French value is the
 * untranslated English string passes both: it exists, and there is nothing
 * wrong with it as French. `onboarding.continue` shipped as "Continue" instead
 * of "Continuer" and the catalogue reported 100% coverage.
 *
 * Plenty of values are legitimately identical — Action, Sport, Romance, PDF,
 * a brand name — so this is a review queue rather than a failure. What it is
 * good at is the verb and the sentence: if an English string has a space in it
 * or is a known action word, an identical French value is almost always a miss.
 */
import { en, fr } from '@plotbreak/i18n';

/** Words that are the same in both languages and are not misses. */
const LEGITIMATELY_SHARED = new Set([
  // Same word in both languages.
  'action', 'romance', 'sport', 'drama', 'horreur', 'fantasy', 'tennis',
  'routine', 'complication', 'expert', 'hostile', 'intense', 'badges',
  'concept', 'progression', 'affection', 'respect', 'rivalry', 'notable',
  // Brands and product names, which are not translated on purpose.
  'plotbreak', 'apple', 'google', 'pdf', 'email', 'e-mail', 'ok',
  'quick', 'vivid', 'cinematic', 'apex',
  'crédits', 'credits',
]);

const english = en as Record<string, unknown>;
const french = fr as Record<string, unknown>;

const suspicious: Array<{ key: string; value: string; why: string }> = [];
for (const [key, value] of Object.entries(english)) {
  if (typeof value !== 'string') continue;
  const translated = french[key];
  if (typeof translated !== 'string' || translated !== value) continue;
  const plain = value.trim().toLowerCase();
  if (plain.length <= 2 || LEGITIMATELY_SHARED.has(plain)) continue;
  // Nothing but placeholders and punctuation — there is no English in it to
  // translate, so an identical value is the correct value.
  if (plain.replace(/\{[^}]*\}/g, '').replace(/[^a-z]/g, '').length === 0) continue;
  // A sentence, or a single word that is doing something.
  const why = /\s/.test(value.trim())
    ? 'a whole phrase, identical'
    : /(e|ed|ing)$/.test(plain)
      ? 'looks like an English verb'
      : 'single word, identical';
  suspicious.push({ key, value, why });
}

if (suspicious.length === 0) {
  console.log('\nNo French value is an untranslated English string.');
} else {
  console.log(`\n${suspicious.length} value(s) identical to the English:\n`);
  for (const s of suspicious) console.log(`  ${s.key.padEnd(42)} "${s.value}"  — ${s.why}`);
  console.log('\nA review queue, not a verdict. Some of these are correct.');
}
process.exitCode = 0;
