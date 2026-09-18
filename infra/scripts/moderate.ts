/**
 * Take a world off the shelves, or put it back.
 *
 * The mechanism behind the report button. Reporting wrote a row and bumped a
 * counter and that was the end of it — `stories.status = 'REMOVED'` had been in
 * the schema since the first migration and nothing in the product ever set it,
 * so a published story had no way off Discover no matter how many people
 * flagged it.
 *
 * A script rather than an API route on purpose: there is no admin identity in
 * this product yet, and inventing one so a button can exist is a worse answer
 * than a command run by somebody holding the database credentials.
 *
 *   npm run moderate -- --list
 *   npm run moderate -- --story=story_user_abc123 --reason="sexual content involving minors"
 *   npm run moderate -- --restore=story_user_abc123
 */
import { Pool } from 'pg';

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const arg = (k: string) => argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3);
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set.');

  const pool = new Pool({ connectionString: url });
  try {
    if (argv.includes('--list')) {
      // Everything a person would want to look at first: user worlds with
      // reports against them, worst first, and whatever is already removed.
      const { rows } = await pool.query(
        `SELECT s.story_id, s.status, v.title, p.display_name AS creator,
                COALESCE(g.reports, 0) AS reports, COALESCE(g.runs, 0) AS runs
           FROM stories s
           JOIN story_versions v ON v.story_version_id = s.published_version_id
           LEFT JOIN story_signals g ON g.story_id = s.story_id
           LEFT JOIN profiles p ON p.user_id = s.creator_id
          WHERE s.official = false AND s.deleted_at IS NULL
          ORDER BY COALESCE(g.reports, 0) DESC, s.updated_at DESC
          LIMIT 50`,
      );
      if (rows.length === 0) {
        console.log('No player-made worlds yet.');
        return;
      }
      console.log('reports  runs   status      story                        title');
      for (const row of rows) {
        console.log(
          String(row.reports).padStart(7),
          String(row.runs).padStart(5),
          String(row.status).padEnd(11),
          String(row.story_id).padEnd(28),
          `${row.title} — ${row.creator ?? 'unknown'}`,
        );
      }
      return;
    }

    const restore = arg('restore');
    if (restore) {
      const { rowCount } = await pool.query(
        `UPDATE stories SET status = 'PUBLISHED', updated_at = now()
          WHERE story_id = $1 AND status = 'REMOVED'`,
        [restore],
      );
      console.log(rowCount ? `Restored ${restore}.` : `${restore} was not removed.`);
      return;
    }

    const storyId = arg('story');
    const reason = arg('reason');
    if (!storyId || !reason) {
      console.log('Usage: --list | --story=<id> --reason="<why>" | --restore=<id>');
      console.log('A reason is required. A takedown with no reason is not a record.');
      process.exitCode = 1;
      return;
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const { rowCount } = await client.query(
        `UPDATE stories SET status = 'REMOVED', updated_at = now()
          WHERE story_id = $1 AND official = false`,
        [storyId],
      );
      if (!rowCount) {
        await client.query('ROLLBACK');
        console.log(`${storyId} is not a player-made world, or does not exist.`);
        process.exitCode = 1;
        return;
      }
      await client.query(
        `INSERT INTO moderation_cases
           (case_id, subject_type, subject_id, severity, reason, status, created_at, resolved_at)
         VALUES ($1,'STORY',$2,'HIGH',$3,'RESOLVED',now(),now())`,
        [`case_${crypto.randomUUID()}`, storyId, reason],
      );
      await client.query(
        `UPDATE reports SET status = 'ACTIONED'
          WHERE target_type = 'STORY' AND target_id = $1 AND status = 'OPEN'`,
        [storyId],
      );
      await client.query('COMMIT');
      console.log(`Removed ${storyId}: ${reason}`);
      console.log('Live sessions keep playing the version they started. It leaves Discover within a minute.');
    } catch (error) {
      await client.query('ROLLBACK').catch(() => undefined);
      throw error;
    } finally {
      client.release();
    }
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
