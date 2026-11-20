/**
 * Story-by-story dashboard: every story's players and turns (today, 7 days,
 * all time), turns per player, sales made while playing it, and how often
 * players whose FIRST story it was came back on a later day. Plus a "signals"
 * table: which day-one behaviours go with coming back.
 *
 *   npm run dashboard:stories   # builds infra/dashboard/out/stories.html and opens it
 *
 * Same rules as build.ts (Miami days, Malik excluded, from 2026-09-14). Turns
 * are tied to a story through `turns` -> `story_sessions`. Turns by deleted
 * accounts have no session any more, so they count in no story (the page shows
 * how many). A sale belongs to the story the buyer last played in the 6 hours
 * before it, or failing that the one they played in the hour after.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import pg from 'pg';
import { renderStories } from './stories-template';

const EXCLUDED = ['8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23', '78c723e1-3a8c-4500-8e90-50ba82b00424'];
const START = '2026-09-14';
const FX: Record<string, number> = { USD: 1, EUR: 1.08, GBP: 1.27, CAD: 0.72, AUD: 0.65 };

// Every finished turn, with its story when it can be found.
const BASE = `
with l as (
  select a.user_id, l.reference_id, l.created_at ts, (l.created_at at time zone 'America/New_York')::date d
  from wallet_ledger l join wallet_accounts a using (account_id)
  where l.type = 'TURN_FINALIZE' and l.created_at >= '${START}' and a.user_id::text <> all($1::text[])
),
t as (
  select l.*, s.story_id, s.story_version_id
  from l left join turns tu on tu.turn_id = l.reference_id left join story_sessions s on s.session_id = tu.session_id
),
st as (select * from t where story_id is not null),
today as (select (now() at time zone 'America/New_York')::date td),
f as (select user_id, min(d) fd, min(ts) fts from t group by 1),
-- First story: the story of a player's earliest turn that has one, if that turn was on their first day.
fs as (
  select distinct on (st.user_id) st.user_id, st.story_id, st.story_version_id
  from st join f using (user_id) where st.d = f.fd order by st.user_id, st.ts
)`;

const STORIES = `${BASE},
meta as (
  select s.story_id, s.official, coalesce(pv.title, lv.title) title,
    coalesce(pv.definition, lv.definition)->'rules'->>'proseStyle' = 'webnovel' rewritten
  from stories s
  left join story_versions pv on pv.story_version_id = s.published_version_id
  left join lateral (select title, definition from story_versions v where v.story_id = s.story_id order by version desc limit 1) lv on true
),
pu as (select user_id, story_id, count(*) n from st group by 1, 2),
agg as (
  select st.story_id,
    count(distinct st.user_id) players, count(*) turns,
    count(distinct st.user_id) filter (where st.d > td - 7) players_7, count(*) filter (where st.d > td - 7) turns_7,
    count(distinct st.user_id) filter (where st.d <= td - 7 and st.d > td - 14) players_p7,
    count(distinct st.user_id) filter (where st.d = td) players_today, count(*) filter (where st.d = td) turns_today,
    to_char(min(st.d), 'YYYY-MM-DD') first_d, to_char(max(st.d), 'YYYY-MM-DD') last_d
  from st, today group by 1
),
per as (
  select story_id, percentile_cont(.5) within group (order by n)::float med, avg(n)::float avg,
    count(*) filter (where n >= 10) ten_plus
  from pu group by 1
),
first as (
  select fs.story_id, count(*) n,
    count(*) filter (where f.fd < td) elig,
    count(*) filter (where f.fd < td and exists (select 1 from t where t.user_id = fs.user_id and t.d > f.fd)) back,
    count(*) filter (where f.fd < td and exists (select 1 from t where t.user_id = fs.user_id and t.d = f.fd + 1)) d1,
    count(*) filter (where f.fd < td and exists (select 1 from st where st.user_id = fs.user_id and st.story_id = fs.story_id and st.d > f.fd)) back_same,
    percentile_cont(.5) within group (order by (select count(*) from t where t.user_id = fs.user_id and t.d = f.fd))::float day1_med
  from fs join f using (user_id), today group by 1
)
select agg.*, meta.title, coalesce(meta.official, false) official, coalesce(meta.rewritten, false) rewritten,
  per.med, per.avg, per.ten_plus::int,
  coalesce(first.n, 0)::int first_n, coalesce(first.elig, 0)::int first_elig, coalesce(first.back, 0)::int first_back,
  coalesce(first.d1, 0)::int first_d1, coalesce(first.back_same, 0)::int first_back_same, first.day1_med
from agg join per using (story_id) left join meta using (story_id) left join first using (story_id)
order by players desc`;

const DAILY = `${BASE}
select story_id, to_char(d, 'YYYY-MM-DD') d, count(distinct user_id)::int p, count(*)::int t,
  count(distinct user_id) filter (where exists (select 1 from f where f.user_id = st.user_id and f.fd = st.d))::int n
from st group by 1, 2 order by 1, 2`;

const WEEKLY = `${BASE}
select story_id, to_char(date_trunc('week', d), 'YYYY-MM-DD') wk, count(distinct user_id)::int p, count(*)::int t
from st group by 1, 2 order by 1, 2`;

const SALES = `${BASE}
select p.currency, p.price_local::float price, to_char((p.created_at at time zone 'America/New_York')::date, 'YYYY-MM-DD') d,
  coalesce(
    (select st.story_id from st where st.user_id = a.user_id and st.ts <= p.created_at and st.ts > p.created_at - interval '6 hours' order by st.ts desc limit 1),
    (select st.story_id from st where st.user_id = a.user_id and st.ts > p.created_at and st.ts < p.created_at + interval '1 hour' order by st.ts limit 1)
  ) story_id
from purchase_transactions p join wallet_accounts a using (account_id)
where p.status = 'VERIFIED' and p.created_at >= '${START}' and a.user_id::text <> all($1::text[])`;

// One row per new player (first day already over), with day-one behaviour and whether they came back.
const SIGNALS = `${BASE},
d1 as (
  select f.user_id, f.fd, f.fts,
    (select count(*) from t where t.user_id = f.user_id and t.d = f.fd)::int turns,
    (select count(distinct story_id) from st where st.user_id = f.user_id and st.d = f.fd)::int stories,
    exists (select 1 from t where t.user_id = f.user_id and t.d > f.fd) back,
    exists (select 1 from t where t.user_id = f.user_id and t.d = f.fd + 1) back_d1
  from f, today where f.fd < td
)
select d1.turns, d1.stories, d1.back, d1.back_d1,
  extract(hour from d1.fts at time zone 'America/New_York')::int as hr, extract(isodow from d1.fd)::int as dow,
  fs.story_id first_story, coalesce(s.official, false) first_official,
  coalesce(v.definition->'rules'->>'proseStyle' = 'webnovel', false) first_rewritten,
  exists (select 1 from purchase_transactions p join wallet_accounts a using (account_id)
          where a.user_id = d1.user_id and p.status = 'VERIFIED' and (p.created_at at time zone 'America/New_York')::date = d1.fd) bought,
  exists (select 1 from wallet_ledger l join wallet_accounts a using (account_id)
          where a.user_id = d1.user_id and l.type = 'CREATE_FEE' and (l.created_at at time zone 'America/New_York')::date = d1.fd) created
from d1 left join fs using (user_id) left join stories s on s.story_id = fs.story_id
left join story_versions v on v.story_version_id = fs.story_version_id`;

const UNLINKED = `${BASE}
select count(*)::int turns, count(*) filter (where story_id is null)::int unlinked from t`;

async function main(): Promise<void> {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const stories = await client.query(STORIES, [EXCLUDED]);
  const daily = await client.query(DAILY, [EXCLUDED]);
  const weekly = await client.query(WEEKLY, [EXCLUDED]);
  const sales = await client.query(SALES, [EXCLUDED]);
  const signals = await client.query(SIGNALS, [EXCLUDED]);
  const unlinked = await client.query(UNLINKED, [EXCLUDED]);
  const now = await client.query(`select to_char(now() at time zone 'America/New_York', 'Dy Mon DD, HH12:MI am') t,
    to_char((now() at time zone 'America/New_York')::date, 'YYYY-MM-DD') today`);
  await client.end();

  const salesBy = new Map<string, { n: number; usd: number }>();
  let unattributedSales = 0;
  for (const s of sales.rows) {
    if (!s.story_id) { unattributedSales += 1; continue; }
    const r = salesBy.get(s.story_id) ?? { n: 0, usd: 0 };
    r.n += 1;
    r.usd += s.price * (FX[s.currency] ?? 1);
    salesBy.set(s.story_id, r);
  }
  const rows = stories.rows.map((r) => ({
    ...Object.fromEntries(Object.entries(r).map(([k, v]) => [k, typeof v === 'string' && /^\d+$/.test(v) ? Number(v) : v])),
    title: r.title ?? r.story_id,
    sales: salesBy.get(r.story_id)?.n ?? 0,
    sales_usd: Math.round((salesBy.get(r.story_id)?.usd ?? 0) * 100) / 100,
  }));

  const data = {
    generatedAt: now.rows[0].t,
    today: now.rows[0].today,
    start: START,
    stories: rows,
    daily: daily.rows,
    weekly: weekly.rows,
    signals: signals.rows,
    unlinked: unlinked.rows[0],
    unattributedSales,
    totalSales: sales.rows.length,
  };
  const dir = join(process.cwd(), 'infra', 'dashboard', 'out');
  mkdirSync(dir, { recursive: true });
  const out = join(dir, 'stories.html');
  writeFileSync(out, renderStories(data));
  if (process.argv.includes('--print')) console.log(JSON.stringify({ stories: rows.slice(0, 40), unlinked: data.unlinked, unattributedSales, totalSales: data.totalSales, signals: signals.rows.length }));
  console.log(out);
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
