/**
 * Read the moderation queue, and act on it.
 *
 *   npm run moderate                        # everything waiting on a person
 *   npm run moderate -- --uphold rep_1a2b   # the report was right; leave it down
 *   npm run moderate -- --dismiss rep_1a2b  # it was not; put it back
 *   npm run moderate -- --restore cmt_9f8e  # put a comment back up
 *
 * There is no admin app. There was going to be one — `apps/admin/` exists and
 * is empty — and for two people shipping a first version, a web console with
 * its own auth, its own deploy and its own attack surface is a worse use of a
 * week than this file.
 *
 * What keeps the app compliant is not this script. It is `AUTO_HIDE_REPORTS`,
 * which takes a comment down the moment three different people report it,
 * without waiting for anybody to wake up and run a CLI. This is the review
 * that happens afterwards: restoring what was hidden wrongly, and reading the
 * reports no threshold covers — a story, an image, an account.
 *
 * Requires DATABASE_URL. Read-only unless you pass an action flag.
 */
import { Pool } from 'pg';

const RESET = '\u001b[0m';
const DIM = '\u001b[2m';
const BOLD = '\u001b[1m';
const RED = '\u001b[31m';

interface Row {
  kind: string;
  id: string;
  subject_type: string;
  subject_id: string;
  detail: string;
  reports: string;
  created_at: Date;
}

function ago(then: Date): string {
  const mins = Math.floor((Date.now() - then.getTime()) / 60_000);
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h`;
  return `${Math.floor(mins / 1440)}d`;
}

/**
 * Two tables feed one queue.
 *
 * `moderation_cases` is what the threshold opens when it hides something;
 * `reports` is what a player files against a story, a turn, an image or an
 * account. Different shapes, same question — is anyone going to look at this —
 * so they arrive as one list, newest first.
 */
const OPEN_QUEUE = `
  SELECT 'CASE' AS kind, c.case_id AS id, c.subject_type, c.subject_id,
         COALESCE(s.body, '(comment deleted)') AS detail,
         (SELECT COUNT(*)::text FROM comment_reports r WHERE r.comment_id = c.subject_id) AS reports,
         c.created_at
    FROM moderation_cases c
    LEFT JOIN story_comments s ON s.comment_id = c.subject_id
   WHERE c.status = 'OPEN'
   UNION ALL
  SELECT 'REPORT', report_id, target_type, target_id,
         reason || CASE WHEN details = '' THEN '' ELSE ' - ' || details END,
         '1', created_at
    FROM reports
   WHERE status = 'OPEN'
   ORDER BY created_at DESC
   LIMIT 200`;

async function main(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.error(
      'No database configured. Set DATABASE_URL (Supabase -> Connect -> Session pooler),\n' +
        'or run it as `npm run moderate`, which loads .env for you.',
    );
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const argv = process.argv.slice(2);
  const flag = (name: string): string | undefined => {
    const inline = argv.find((a) => a.startsWith(`--${name}=`));
    if (inline) return inline.slice(name.length + 3);
    const i = argv.indexOf(`--${name}`);
    return i >= 0 ? argv[i + 1] : undefined;
  };

  try {
    const restore = flag('restore');
    if (restore) {
      const r = await pool.query<{ body: string }>(
        `UPDATE story_comments SET deleted_at = NULL WHERE comment_id = $1 RETURNING body`,
        [restore],
      );
      if (r.rowCount === 0) {
        console.log(`No comment ${restore}.`);
        return;
      }
      // Resolve its case too, or the queue keeps handing back something you
      // have already decided about.
      await pool.query(
        `UPDATE moderation_cases SET status = 'RESOLVED', resolved_at = now()
          WHERE subject_id = $1 AND status = 'OPEN'`,
        [restore],
      );
      console.log(`Restored: ${String(r.rows[0]?.body ?? '').slice(0, 80)}`);
      return;
    }

    for (const [name, upheld] of [
      ['uphold', true],
      ['dismiss', false],
    ] as const) {
      const id = flag(name);
      if (!id) continue;

      if (id.startsWith('rep_')) {
        const r = await pool.query(`UPDATE reports SET status = $2 WHERE report_id = $1`, [
          id,
          upheld ? 'ACTIONED' : 'DISMISSED',
        ]);
        console.log(r.rowCount ? `${id}: ${upheld ? 'actioned' : 'dismissed'}` : `No report ${id}.`);
        return;
      }

      const r = await pool.query<{ subject_id: string }>(
        `UPDATE moderation_cases SET status = 'RESOLVED', resolved_at = now()
          WHERE case_id = $1 RETURNING subject_id`,
        [id],
      );
      if (r.rowCount === 0) {
        console.log(`No case ${id}.`);
        return;
      }
      // Dismissing a case means the takedown was wrong, so undo it. Upholding
      // leaves the comment hidden, which it already is.
      if (!upheld) {
        await pool.query(`UPDATE story_comments SET deleted_at = NULL WHERE comment_id = $1`, [
          r.rows[0]!.subject_id,
        ]);
      }
      console.log(`${id}: ${upheld ? 'upheld, stays hidden' : 'dismissed, comment restored'}`);
      return;
    }

    const { rows } = await pool.query<Row>(OPEN_QUEUE);

    if (rows.length === 0) {
      console.log('Queue is empty.');
      return;
    }

    const cases = rows.filter((r) => r.kind === 'CASE');
    console.log(
      `\n${BOLD}${rows.length} open${RESET} - ${cases.length} auto-hidden awaiting review, ` +
        `${rows.length - cases.length} player report(s)\n`,
    );

    for (const row of rows) {
      const tag =
        row.kind === 'CASE'
          ? `${RED}HIDDEN${RESET} ${row.reports} reports`
          : row.subject_type.toLowerCase();
      console.log(`${BOLD}${row.id}${RESET}  ${tag}  ${DIM}${ago(row.created_at)} ago${RESET}`);
      console.log(`  ${row.detail.replace(/\s+/g, ' ').slice(0, 160)}`);
      console.log(`  ${DIM}${row.subject_id}${RESET}\n`);
    }

    console.log(
      `${DIM}--uphold <id> leaves it down. --dismiss <id> puts it back.\n` +
        `--restore <comment-id> puts a comment back without touching its case.${RESET}`,
    );
  } finally {
    await pool.end();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
