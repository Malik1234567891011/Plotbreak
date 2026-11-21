/**
 * Local stats dashboard: big day-by-day tiles for the last ~2 months, plus
 * D1 / D7 retention by weekly cohort. Reads prod Postgres (DATABASE_URL from
 * .env), writes one self-contained HTML file, opens nothing by itself.
 *
 *   npm run dashboard          # builds infra/dashboard/out/index.html and opens it
 *
 * Rules (same as the stats updates):
 * - Times are Miami (America/New_York) days.
 * - Malik's two accounts are excluded everywhere.
 * - A "turn" is a TURN_FINALIZE ledger row. A "new player" played their first
 *   turn ever that day. A "returning player" played that day and first played earlier.
 * - Revenue is gross (before Apple's cut), converted to USD at fixed rough rates,
 *   from verified App Store purchases, plus $2.99 for each Pass subscription on
 *   the day it started (renewals aren't recorded: no server notifications).
 * - D1 = a new player played again the next day. D7 = played on day 7 exactly.
 *   "Back within 7" = played on any of days 1–7. A cohort is only scored once
 *   the day it needs has fully ended.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import pg from 'pg';
import { renderDashboard } from './template';

const EXCLUDED = ['8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23', '78c723e1-3a8c-4500-8e90-50ba82b00424'];
const START = process.argv.find((a) => a.startsWith('--from='))?.split('=')[1] ?? '2026-09-14'; // launch week (a Monday); earlier turns were testing
const FX: Record<string, number> = { USD: 1, EUR: 1.08, GBP: 1.27, CAD: 0.72, AUD: 0.65 };
const PASS_USD = 2.99;

const DAILY = `
with t as (
  select a.user_id, (l.created_at at time zone 'America/New_York')::date d
  from wallet_ledger l join wallet_accounts a using (account_id)
  where l.type = 'TURN_FINALIZE' and l.created_at >= '2026-09-14' and a.user_id::text <> all($1::text[])
), f as (select user_id, min(d) fd from t group by 1),
days as (select generate_series($2::date, (now() at time zone 'America/New_York')::date, '1 day')::date d),
agg as (
  select t.d, count(*) turns, count(distinct t.user_id) players,
    count(distinct t.user_id) filter (where f.fd = t.d) new_players,
    count(distinct t.user_id) filter (where f.fd < t.d) ret
  from t join f using (user_id) group by 1
),
d1 as (
  select f.fd d, count(*) filter (where exists (select 1 from t where t.user_id = f.user_id and t.d = f.fd + 1)) back_d1
  from f group by 1
)
select to_char(days.d, 'YYYY-MM-DD') d, coalesce(turns, 0)::int turns, coalesce(players, 0)::int players,
  coalesce(new_players, 0)::int new_players, coalesce(ret, 0)::int "returning", coalesce(back_d1, 0)::int back_d1
from days left join agg using (d) left join d1 using (d) order by 1`;

const PURCHASES = `
select to_char((p.created_at at time zone 'America/New_York')::date, 'YYYY-MM-DD') d, p.currency, p.price_local::float price, p.product_id
from purchase_transactions p join wallet_accounts a using (account_id)
where p.status = 'VERIFIED' and p.created_at >= '2026-09-14' and a.user_id::text <> all($1::text[])
union all
select to_char((s.created_at at time zone 'America/New_York')::date, 'YYYY-MM-DD'), 'USD', ${PASS_USD}, s.product_id
from subscriptions s where s.environment = 'PRODUCTION' and s.user_id::text <> all($1::text[])`;

const COHORTS = `
with t as (
  select a.user_id, (l.created_at at time zone 'America/New_York')::date d
  from wallet_ledger l join wallet_accounts a using (account_id)
  where l.type = 'TURN_FINALIZE' and l.created_at >= '2026-09-14' and a.user_id::text <> all($1::text[])
), f as (select user_id, min(d) fd from t group by 1),
today as (select (now() at time zone 'America/New_York')::date td),
p as (
  select f.*, date_trunc('week', f.fd)::date wk,
    exists (select 1 from t where t.user_id = f.user_id and t.d = f.fd + 1) b1,
    exists (select 1 from t where t.user_id = f.user_id and t.d = f.fd + 7) b7,
    exists (select 1 from t where t.user_id = f.user_id and t.d between f.fd + 1 and f.fd + 7) bw,
    exists (select 1 from t where t.user_id = f.user_id and t.d > f.fd) ever
  from f
)
select to_char(wk, 'YYYY-MM-DD') wk, count(*)::int n,
  count(*) filter (where fd + 1 < td)::int e1, count(*) filter (where fd + 1 < td and b1)::int d1,
  count(*) filter (where fd + 7 < td)::int e7, count(*) filter (where fd + 7 < td and b7)::int d7,
  count(*) filter (where fd + 7 < td and bw)::int dw,
  count(*) filter (where ever)::int ever
from p, today where wk >= $2::date group by wk order by wk`;

// Distinct players per week: a player back on three days that week counts once.
const WEEKLY = `
with t as (
  select a.user_id, (l.created_at at time zone 'America/New_York')::date d
  from wallet_ledger l join wallet_accounts a using (account_id)
  where l.type = 'TURN_FINALIZE' and l.created_at >= '2026-09-14' and a.user_id::text <> all($1::text[])
), f as (select user_id, min(d) fd from t group by 1)
select to_char(date_trunc('week', t.d)::date, 'YYYY-MM-DD') wk,
  count(distinct t.user_id)::int players,
  count(distinct t.user_id) filter (where t.d > f.fd)::int "returning",
  count(distinct t.user_id) filter (where t.d > f.fd and f.fd < date_trunc('week', t.d)::date)::int earlier
from t join f using (user_id) group by 1`;

async function main(): Promise<void> {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const daily = await client.query(DAILY, [EXCLUDED, START]);
  const purchases = await client.query(PURCHASES, [EXCLUDED]);
  const cohorts = await client.query(COHORTS, [EXCLUDED, START]);
  const weekly = await client.query(WEEKLY, [EXCLUDED]);
  const now = await client.query(`select to_char(now() at time zone 'America/New_York', 'Dy Mon DD, HH12:MI am') t`);
  await client.end();

  const revenue = new Map<string, { usd: number; count: number }>();
  for (const p of purchases.rows) {
    const r = revenue.get(p.d) ?? { usd: 0, count: 0 };
    r.usd += p.price * (FX[p.currency] ?? 1);
    r.count += 1;
    revenue.set(p.d, r);
  }
  const days = daily.rows.map((r) => ({
    ...r,
    revenue: Math.round((revenue.get(r.d)?.usd ?? 0) * 100) / 100,
    purchases: revenue.get(r.d)?.count ?? 0,
  }));

  const data = { generatedAt: now.rows[0].t, days, cohorts: cohorts.rows, weekly: weekly.rows };
  const dir = join(process.cwd(), 'infra', 'dashboard', 'out');
  mkdirSync(dir, { recursive: true });
  const out = join(dir, 'index.html');
  writeFileSync(out, renderDashboard(data));
  console.log(out);
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
