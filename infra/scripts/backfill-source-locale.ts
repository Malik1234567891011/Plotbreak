/**
 * Say which language each player-made world was written in.
 *
 * `sourceLocale` and the draft's `locale` arrived after eleven worlds had
 * already been written, and both default to `en` — which is right for every
 * official world and wrong for six of those eleven. Left alone, the French ones
 * would be handed to the translator as English and asked for French, and the
 * English shelf would never get an English version of them at all.
 *
 *     npx tsx infra/scripts/backfill-source-locale.ts          # decide, print, change nothing
 *     npx tsx infra/scripts/backfill-source-locale.ts --write
 *
 * The detector is deliberately a heuristic rather than a model call. French and
 * English are far apart in exactly the features below, the whole input is
 * eleven rows, and a printed decision next to the prose it was made from is
 * something a person can check in ten seconds — which a model's answer is not.
 */
import { randomUUID } from 'node:crypto';
import { Pool } from 'pg';

const args = process.argv.slice(2);
const WRITE = args.includes('--write');

/**
 * Words that are common in one language and near-absent in the other.
 *
 * Whole-word matched, so "the" does not fire on "there" and "les" does not fire
 * on "unless".
 */
const FRENCH = [
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'est', 'dans', 'que', 'qui',
  'pour', 'pas', 'sur', 'plus', 'avec', 'tu', 'ton', 'ta', 'tes', 'son', 'sa', 'ses',
  'ne', 'se', 'au', 'aux', 'par', 'chaque', 'mais', 'leur', 'vers', 'tout', 'toute',
];
const ENGLISH = [
  'the', 'a', 'an', 'and', 'is', 'in', 'that', 'who', 'for', 'not', 'on', 'more',
  'with', 'you', 'your', 'his', 'her', 'their', 'to', 'of', 'by', 'each', 'but',
  'toward', 'all', 'every', 'has', 'have', 'it',
];

function score(text: string, words: readonly string[]): number {
  const lower = text.toLowerCase();
  let hits = 0;
  for (const word of words) {
    const matches = lower.match(new RegExp(`\\b${word}\\b`, 'g'));
    hits += matches?.length ?? 0;
  }
  return hits;
}

export function detectLocale(text: string): { locale: 'en' | 'fr'; confidence: number; why: string } {
  const fr = score(text, FRENCH);
  const en = score(text, ENGLISH);
  // Characters English essentially never uses. Strong evidence on their own,
  // and the reason a short French sentence is not a coin flip.
  const accents = (text.match(/[àâçéèêëîïôûùüÿœ]/gi) ?? []).length;
  const frWeighted = fr + accents * 2;
  const total = frWeighted + en;
  const locale = frWeighted > en ? 'fr' : 'en';
  const confidence = total === 0 ? 0 : Math.abs(frWeighted - en) / total;
  return { locale, confidence, why: `fr=${fr} accents=${accents} en=${en}` };
}

/** Everything with words in it, so the decision is made on as much text as there is. */
function proseOf(document: Record<string, unknown>): string {
  const parts = [
    document.title,
    document.hook,
    document.premise,
    document.opening,
    document.description,
    document.toneGuide,
  ];
  return parts.filter((part): part is string => typeof part === 'string').join('\n');
}

async function main(): Promise<void> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const { rows } = await pool.query<{ draft_id: string; document: Record<string, unknown>; story_id: string | null }>(
    `SELECT draft_id, document, story_id FROM story_drafts ORDER BY created_at`,
  );

  let changed = 0;
  for (const row of rows) {
    const prose = proseOf(row.document);
    const title = (row.document.title as string) || '(untitled)';
    if (prose.trim().length < 40) {
      console.log(`  · ${title.padEnd(26)} too little text to judge, left as written`);
      continue;
    }
    const { locale, confidence, why } = detectLocale(prose);
    const current = (row.document.locale as string) ?? 'en';
    const mark = locale === current ? ' ' : '→';
    console.log(
      `  ${mark} ${title.padEnd(26)} ${current} ${mark === '→' ? `→ ${locale}` : '  '}  ` +
        `(${(confidence * 100).toFixed(0)}% ${why})`,
    );
    if (locale === current) continue;
    changed++;
    if (!WRITE) continue;

    await pool.query(
      `UPDATE story_drafts
          SET document = jsonb_set(document::jsonb, '{locale}', to_jsonb($2::text)), updated_at = now()
        WHERE draft_id = $1`,
      [row.draft_id, locale],
    );
  }

  if (!WRITE) {
    console.log(`\nDry run. ${changed} would change. Pass --write.`);
    await pool.end();
    return;
  }

  // The published half. A published definition is immutable — a run pins it —
  // so this is the same "publish the next version" move `backfill-covers`
  // makes rather than an edit.
  const { rows: published } = await pool.query<{
    story_id: string;
    story_version_id: string;
    definition: Record<string, unknown>;
    document: Record<string, unknown>;
  }>(
    `SELECT s.story_id, sv.story_version_id, sv.definition, d.document
       FROM stories s
       JOIN story_versions sv ON sv.story_version_id = s.published_version_id
       JOIN story_drafts d ON d.story_id = s.story_id
      WHERE s.official = false AND s.deleted_at IS NULL`,
  );

  for (const row of published) {
    const want = ((row.document.locale as string) ?? 'en') as 'en' | 'fr';
    const have = (row.definition.sourceLocale as string) ?? 'en';
    if (want === have) continue;

    const nextId = `sv_user_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
    const next = {
      ...row.definition,
      id: nextId,
      version: Number(row.definition.version ?? 1) + 1,
      sourceLocale: want,
    };
    const at = new Date().toISOString();

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(
        `INSERT INTO story_versions
           (story_version_id, story_id, version, definition, title, fantasy_label, hook,
            intensity, content_descriptors, clarity_passed, published_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true,$10)`,
        [
          nextId,
          row.story_id,
          next.version,
          JSON.stringify(next),
          next.title,
          next.fantasyLabel,
          next.hook,
          next.intensity,
          next.contentDescriptors,
          at,
        ],
      );
      await client.query(
        `UPDATE stories SET published_version_id = $2, updated_at = now() WHERE story_id = $1`,
        [row.story_id, nextId],
      );
      await client.query(
        `UPDATE story_drafts SET published_version_id = $2, updated_at = now() WHERE story_id = $1`,
        [row.story_id, nextId],
      );
      // What it now owes. The API's sweep finds this and writes the world into
      // the other language, exactly as it would for a fresh publish.
      for (const locale of ['en', 'fr'] as const) {
        if (locale === want) continue;
        await client.query(
          `INSERT INTO story_version_text (story_version_id, locale, text, status)
           VALUES ($1,$2,'{}'::jsonb,'pending')
           ON CONFLICT (story_version_id, locale) DO NOTHING`,
          [nextId, locale],
        );
      }
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    console.log(
      `\n  ${row.story_id}: published v${next.version} saying it is written in ${want}; ` +
        `its other language is queued.`,
    );
  }

  console.log(`\n${changed} draft(s) updated.`);
  await pool.end();
}

// Importable for the unit test; run only when invoked directly.
if (process.argv[1]?.endsWith('backfill-source-locale.ts')) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
