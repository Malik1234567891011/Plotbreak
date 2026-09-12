/**
 * What is crashing on people's phones.
 *
 *   npm run crashes                  # last 24 hours, grouped
 *   npm run crashes -- --hours=168   # the week
 *   npm run crashes -- --stack fp_3a1b   # one group, with a trace
 *
 * Ordered by how many *devices* hit each bug, not how many rows it wrote. One
 * handset stuck relaunching into the same throw can log two hundred rows of
 * something nobody else will ever see, and it must not outrank a bug breaking
 * once each for thirty different people.
 *
 * JavaScript only. A Hermes segfault — the `Intl.RelativeTimeFormat` crash that
 * took out the story screen — kills the process before any of our code runs,
 * and will never appear here. Those live in App Store Connect → Crashes. Both
 * halves are in docs/crash-reporting.md.
 *
 * Requires DATABASE_URL. Read-only.
 */
import { Pool } from 'pg';

const RESET = '\u001b[0m';
const DIM = '\u001b[2m';
const BOLD = '\u001b[1m';
const RED = '\u001b[31m';
const YELLOW = '\u001b[33m';

function ago(then: Date): string {
  const mins = Math.floor((Date.now() - then.getTime()) / 60_000);
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h`;
  return `${Math.floor(mins / 1440)}d`;
}

async function main(): Promise<void> {
  if (!process.env.DATABASE_URL) {
    console.error('No database configured. Set DATABASE_URL, or run `npm run crashes`.');
    process.exit(1);
  }

  const argv = process.argv.slice(2);
  const hours = Number(argv.find((a) => a.startsWith('--hours='))?.slice(8) ?? 24);
  const stackOf =
    argv.find((a) => a.startsWith('--stack='))?.slice(8) ??
    (argv.includes('--stack') ? argv[argv.indexOf('--stack') + 1] : undefined);

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    if (stackOf) {
      const { rows } = await pool.query<{
        message: string;
        stack: string;
        screen: string;
        platform: string;
        os_version: string;
        app_version: string;
        locale: string;
        created_at: Date;
      }>(
        `SELECT message, stack, screen, platform, os_version, app_version, locale, created_at
           FROM client_errors WHERE fingerprint = $1
          ORDER BY created_at DESC LIMIT 1`,
        [stackOf],
      );
      const row = rows[0];
      if (!row) {
        console.log(`No crash with fingerprint ${stackOf}.`);
        return;
      }
      console.log(`\n${BOLD}${row.message}${RESET}`);
      console.log(
        `${DIM}${row.screen} · ${row.platform} ${row.os_version} · app ${row.app_version} · ` +
          `${row.locale} · ${ago(row.created_at)} ago${RESET}\n`,
      );
      console.log(row.stack || '(no stack)');
      return;
    }

    const { rows } = await pool.query<{
      fingerprint: string;
      message: string;
      screen: string;
      count: string;
      devices: string;
      last_seen: Date;
      app_versions: string;
    }>(
      `SELECT fingerprint,
              (array_agg(message ORDER BY created_at DESC))[1] AS message,
              (array_agg(screen  ORDER BY created_at DESC))[1] AS screen,
              COUNT(*)::text                        AS count,
              COUNT(DISTINCT install_id)::text      AS devices,
              MAX(created_at)                       AS last_seen,
              string_agg(DISTINCT app_version, ', ') AS app_versions
         FROM client_errors
        WHERE created_at >= now() - make_interval(hours => $1)
        GROUP BY fingerprint
        ORDER BY COUNT(DISTINCT install_id) DESC, COUNT(*) DESC
        LIMIT 40`,
      [hours],
    );

    if (rows.length === 0) {
      console.log(
        `No JavaScript crashes in the last ${hours}h.\n` +
          `${DIM}Native crashes are not here - App Store Connect -> Crashes.${RESET}`,
      );
      return;
    }

    const devices = rows.reduce((n, r) => n + Number(r.devices), 0);
    console.log(
      `\n${BOLD}${rows.length} distinct crash(es)${RESET} in ${hours}h, ` +
        `across ${devices} device(s)\n`,
    );

    for (const row of rows) {
      const n = Number(row.devices);
      // One device is probably one person's odd state. Several is a bug.
      const colour = n >= 5 ? RED : n >= 2 ? YELLOW : DIM;
      console.log(
        `${colour}${String(n).padStart(3)} device(s)${RESET}  ${BOLD}${row.message.slice(0, 90)}${RESET}`,
      );
      console.log(
        `             ${DIM}${row.screen || 'unknown screen'} · ${row.count} occurrence(s) · ` +
          `app ${row.app_versions} · last ${ago(row.last_seen)} ago · ${row.fingerprint}${RESET}`,
      );
    }

    console.log(`\n${DIM}--stack <fingerprint> for a trace. --hours=168 for the week.${RESET}`);
  } finally {
    await pool.end();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
