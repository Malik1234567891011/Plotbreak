-- Retention measurement, run 2026-11-21 (evening EST). Read-only.
-- PH-*  = HogQL, PostHog project 533970 ("Plotbreak"), via PostHog MCP `execute-sql`
--         (the MCP defaulted to project 756825 "OutOfBody"; switch-project 533970 first).
-- DB-*  = Postgres, Supabase project qscmokjkflkrspqjjooa, SELECT only.
-- Periods: P2 = cohort day 2026-10-22..2026-11-20, P1 = 2026-09-22..2026-10-21 (America/New_York days).
-- Excluded everywhere: 8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23, 78c723e1-3a8c-4500-8e90-50ba82b00424.

-- ============================================================ PH-0 identity check
-- Server turn persons that share a PostHog person with client events (last 14 days).
SELECT uniq(person_id) AS server_turn_persons,
  uniqIf(person_id, person_id IN (SELECT person_id FROM events WHERE event = 'app_opened' AND timestamp >= now() - INTERVAL 14 DAY)) AS same_person_has_client_events,
  uniqIf(distinct_id, distinct_id IN (SELECT distinct_id FROM events WHERE event IN ('app_opened', '$identify', 'session_started') AND timestamp >= now() - INTERVAL 14 DAY)) AS server_distinct_id_seen_on_client
FROM events WHERE event = 'turn_completed' AND timestamp >= now() - INTERVAL 14 DAY;

-- ============================================================ PH-2 install-keyed day-0 funnel + open retention
-- Key = properties.pb_anonymous_id (install id; carried by client AND server events).
SELECT
  if(fd >= toDate('2026-10-22'), 'P2_Oct22_Nov20', 'P1_Sep22_Oct21') AS per,
  count() AS new_devices,
  countIf(has(d0, 'sign_in_completed')) AS signin_d0,
  countIf(has(d0, 'age_gate_completed')) AS agegate_d0,
  countIf(has(d0, 'taste_calibration_completed')) AS onboarded_d0,
  countIf(has(d0, 'story_detail_viewed')) AS detail_d0,
  countIf(has(d0, 'session_started')) AS session_d0,
  countIf(t0 >= 1) AS turn1_d0, countIf(t0 >= 3) AS turn3_d0, countIf(t0 >= 10) AS turn10_d0,
  countIf(stories0 >= 2) AS two_stories_d0, countIf(t0 >= 10 AND stories0 >= 2) AS t10_and_two,
  countIf(has(d0, 'insufficient_credits_shown') OR has(d0, 'paywall_shown')) AS wall_d0,
  countIf(fd <= toDate('2026-11-19')) AS elig_d1,
  countIf(fd <= toDate('2026-11-19') AND open1) AS open_d1,
  countIf(fd <= toDate('2026-11-19') AND play1) AS play_d1,
  countIf(fd <= toDate('2026-11-19') AND t0 >= 1) AS elig_d1_players,
  countIf(fd <= toDate('2026-11-19') AND t0 >= 1 AND open1) AS open_d1_players,
  countIf(fd <= toDate('2026-11-19') AND t0 >= 1 AND play1) AS play_d1_players,
  countIf(fd <= toDate('2026-11-17')) AS elig_d3,
  countIf(fd <= toDate('2026-11-17') AND arrayExists(x -> tupleElement(x, 1) = 'app_opened' AND tupleElement(x, 2) = addDays(fd, 3), evs)) AS open_d3,
  countIf(fd <= toDate('2026-11-13')) AS elig_d7,
  countIf(fd <= toDate('2026-11-13') AND arrayExists(x -> tupleElement(x, 1) = 'app_opened' AND tupleElement(x, 2) = addDays(fd, 7), evs)) AS open_d7
FROM (
  SELECT
    toString(properties.pb_anonymous_id) AS dev,
    minIf(timestamp, event = 'app_opened') AS fo,
    toDate(toTimeZone(fo, 'America/New_York')) AS fd,
    groupArray(tuple(event, toDate(toTimeZone(timestamp, 'America/New_York')), toString(properties.storyId))) AS evs,
    arrayDistinct(arrayMap(x -> tupleElement(x, 1), arrayFilter(x -> tupleElement(x, 2) = fd, evs))) AS d0,
    length(arrayFilter(x -> tupleElement(x, 1) = 'turn_completed' AND tupleElement(x, 2) = fd, evs)) AS t0,
    length(arrayDistinct(arrayMap(x -> tupleElement(x, 3), arrayFilter(x -> tupleElement(x, 1) = 'turn_completed' AND tupleElement(x, 2) = fd, evs)))) AS stories0,
    arrayExists(x -> tupleElement(x, 1) = 'app_opened' AND tupleElement(x, 2) = addDays(fd, 1), evs) AS open1,
    arrayExists(x -> tupleElement(x, 1) = 'turn_completed' AND tupleElement(x, 2) = addDays(fd, 1), evs) AS play1
  FROM events
  WHERE timestamp >= toDateTime('2026-09-01 00:00:00')
    AND event IN ('app_opened', 'sign_in_completed', 'age_gate_completed', 'taste_calibration_completed', 'story_detail_viewed', 'session_started', 'turn_completed', 'insufficient_credits_shown', 'paywall_shown')
    AND properties.pb_anonymous_id != ''
    AND toString(properties.pb_anonymous_id) NOT IN (SELECT toString(properties.pb_anonymous_id) FROM events WHERE timestamp >= toDateTime('2026-09-01 00:00:00') AND distinct_id IN ('8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23', '78c723e1-3a8c-4500-8e90-50ba82b00424'))
  GROUP BY dev
  HAVING fo > toDateTime('2000-01-01 00:00:00')
)
WHERE fd >= toDate('2026-09-22') AND fd <= toDate('2026-11-20')
GROUP BY per ORDER BY per;

-- ============================================================ PH-3 onboarded-but-no-run, split by sign-in
-- Same inner query as PH-2 (events: app_opened, sign_in_completed, taste_calibration_completed,
-- discover_viewed, story_detail_viewed, session_started, turn_completed), plus
--   later_session = arrayExists(x -> x.1 = 'session_started' AND x.2 > fd, evs)
-- outer: GROUP BY per, has(d0,'sign_in_completed'); counts onboarded, discover, detail-or-session,
--   session_started, turn1, onboarded AND NOT session_started (+ saw detail, + started later).

-- ============================================================ PH-4 wall/paywall on day 0 vs D1
-- Same inner query as PH-2 restricted to app_opened, turn_completed, insufficient_credits_shown, paywall_shown;
--   wall = arrayExists(x -> x.1 IN ('insufficient_credits_shown','paywall_shown') AND x.2 = fd, evs)
-- outer: GROUP BY per, wall, t0 >= 8 ; counts installs, elig_d1 (fd<=2026-11-19), open_d1, play_d1.

-- ============================================================ PH-5 prologue completion (P2 window)
SELECT toString(properties.storyTitle) AS story,
  uniqIf(properties.pb_anonymous_id, event = 'prologue_shown') AS shown,
  uniqIf(properties.pb_anonymous_id, event = 'prologue_finished') AS finished_any,
  uniqIf(properties.pb_anonymous_id, event = 'prologue_finished' AND properties.completed = true) AS completed,
  uniqIf(properties.pb_anonymous_id, event = 'prologue_finished' AND properties.completed = false) AS skipped
FROM events WHERE timestamp >= toDateTime('2026-10-22 04:00:00') AND timestamp < toDateTime('2026-11-21 05:00:00')
  AND event IN ('prologue_shown', 'prologue_finished') GROUP BY story ORDER BY shown DESC;

-- ============================================================ PH-6 live app versions
SELECT toString(properties.$app_version) AS app_version, min(timestamp), max(timestamp), uniq(properties.pb_anonymous_id) AS installs
FROM events WHERE timestamp >= toDateTime('2026-11-01 00:00:00') AND event = 'app_opened' GROUP BY app_version ORDER BY 2 DESC;

-- ============================================================ DB-1 turn-based retention (accounts + first-turn cohorts)
with t as (
  select a.user_id, (l.created_at at time zone 'America/New_York')::date d
  from wallet_ledger l join wallet_accounts a using (account_id)
  where l.type = 'TURN_FINALIZE' and a.user_id::text not in ('8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23','78c723e1-3a8c-4500-8e90-50ba82b00424')
),
td as (select ((now() at time zone 'America/New_York')::date) td),
acc as (select a.user_id, (a.created_at at time zone 'America/New_York')::date fd, 'accounts' cohort from wallet_accounts a
        where a.user_id::text not in ('8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23','78c723e1-3a8c-4500-8e90-50ba82b00424')),
pl as (select user_id, min(d) fd, 'first_turn' cohort from t group by 1),
c as (select * from acc union all select * from pl),
x as (
  select c.*, case when fd between '2026-10-22' and '2026-11-20' then 'P2' when fd between '2026-09-22' and '2026-10-21' then 'P1' end per,
    exists (select 1 from t where t.user_id=c.user_id and t.d=c.fd) p0,
    exists (select 1 from t where t.user_id=c.user_id and t.d=c.fd+1) p1,
    exists (select 1 from t where t.user_id=c.user_id and t.d=c.fd+3) p3,
    exists (select 1 from t where t.user_id=c.user_id and t.d=c.fd+7) p7,
    exists (select 1 from t where t.user_id=c.user_id and t.d between c.fd+1 and c.fd+7) pw
  from c
)
select cohort, per, count(*) n, count(*) filter (where p0) played_d0,
  count(*) filter (where fd+1 < td) e1, count(*) filter (where fd+1 < td and p1) d1,
  count(*) filter (where fd+3 < td) e3, count(*) filter (where fd+3 < td and p3) d3,
  count(*) filter (where fd+7 < td) e7, count(*) filter (where fd+7 < td and p7) d7,
  count(*) filter (where fd+7 < td and pw) back_within7
from x, td where per is not null group by 1,2 order by 1,2;

-- ============================================================ DB-2 day-0 funnel, credits, D1 splits (new accounts)
with ex as (select unnest(array['8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23','78c723e1-3a8c-4500-8e90-50ba82b00424']::uuid[]) u),
acc as (select a.user_id, a.account_id, (a.created_at at time zone 'America/New_York')::date fd from wallet_accounts a where a.user_id not in (select u from ex)),
l as (select l.account_id, l.type, l.reason_code, l.amount, l.balance_after, l.reference_id, (l.created_at at time zone 'America/New_York')::date d
      from wallet_ledger l join acc using (account_id)),
s as (select ss.user_id, ss.session_id, ss.story_id, (ss.created_at at time zone 'America/New_York')::date d from story_sessions ss join acc using (user_id)),
tt as (select acc.user_id, l.d, s.story_id, tu.session_id, tu.turn_index
       from l join acc using (account_id) left join turns tu on tu.turn_id = l.reference_id left join story_sessions s on s.session_id = tu.session_id
       where l.type = 'TURN_FINALIZE'),
x as (
  select acc.*, case when fd between '2026-10-22' and '2026-11-20' then 'P2' when fd between '2026-09-22' and '2026-10-21' then 'P1' end per,
    exists (select 1 from s where s.user_id=acc.user_id and s.d=acc.fd) sess0,
    (select count(*) from tt where tt.user_id=acc.user_id and tt.d=acc.fd) t0,
    (select count(distinct story_id) from tt where tt.user_id=acc.user_id and tt.d=acc.fd) stories0,
    -- "ran dry": a day-0 turn reserve left less than the price of one more turn at that tier
    exists (select 1 from l where l.account_id=acc.account_id and l.d=acc.fd and l.type='TURN_RESERVE' and l.balance_after < -l.amount) dry0,
    exists (select 1 from l where l.account_id=acc.account_id and l.d=acc.fd and l.reason_code='FLASH_OFFER_OPENED') wall0,
    exists (select 1 from l where l.account_id=acc.account_id and l.d=acc.fd and l.type='PURCHASE') buy0,
    exists (select 1 from tt where tt.user_id=acc.user_id and tt.d=acc.fd+1) p1
  from acc
)
select per, count(*) n, count(*) filter (where sess0) sess0, count(*) filter (where t0>=1) t1, count(*) filter (where t0>=3) t3,
  count(*) filter (where t0>=10) t10, count(*) filter (where stories0>=2) two_stories, count(*) filter (where dry0) dry0,
  count(*) filter (where wall0) wall0, count(*) filter (where buy0) buy0,
  count(*) filter (where fd <= '2026-11-19') e1, count(*) filter (where fd <= '2026-11-19' and p1) d1,
  count(*) filter (where fd <= '2026-11-19' and dry0) e1_dry, count(*) filter (where fd <= '2026-11-19' and dry0 and p1) d1_dry,
  count(*) filter (where fd <= '2026-11-19' and t0>=8 and dry0) e1_t8_dry, count(*) filter (where fd <= '2026-11-19' and t0>=8 and dry0 and p1) d1_t8_dry,
  count(*) filter (where fd <= '2026-11-19' and t0>=8 and not dry0) e1_t8_notdry, count(*) filter (where fd <= '2026-11-19' and t0>=8 and not dry0 and p1) d1_t8_notdry,
  count(*) filter (where fd <= '2026-11-19' and t0>=10) e1_t10, count(*) filter (where fd <= '2026-11-19' and t0>=10 and p1) d1_t10,
  count(*) filter (where fd <= '2026-11-19' and stories0>=2) e1_two, count(*) filter (where fd <= '2026-11-19' and stories0>=2 and p1) d1_two,
  count(*) filter (where fd <= '2026-11-19' and t0>=1 and stories0=1) e1_one, count(*) filter (where fd <= '2026-11-19' and t0>=1 and stories0=1 and p1) d1_one
from x where per is not null group by per order by per;

-- ============================================================ DB-3 first story of P2 new accounts
with ex as (select unnest(array['8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23','78c723e1-3a8c-4500-8e90-50ba82b00424']::uuid[]) u),
acc as (select a.user_id from wallet_accounts a where a.user_id not in (select u from ex)
          and (a.created_at at time zone 'America/New_York')::date between '2026-10-22' and '2026-11-20'),
t as (select a.user_id, (l.created_at at time zone 'America/New_York')::date d
      from wallet_ledger l join wallet_accounts a using (account_id) join acc using (user_id) where l.type = 'TURN_FINALIZE'),
fs as (select distinct on (ss.user_id) ss.user_id, ss.story_id, ss.turn_index, (ss.created_at at time zone 'America/New_York')::date sd
       from story_sessions ss join acc using (user_id) order by ss.user_id, ss.created_at),
x as (select fs.*, st.slug, st.official, exists (select 1 from t where t.user_id = fs.user_id and t.d = fs.sd + 1) p1
      from fs join stories st using (story_id))
select coalesce(slug, story_id) story, official, count(*) first_sessions, count(*) filter (where turn_index >= 1) started,
  round(100.0*count(*) filter (where turn_index between 1 and 3)/nullif(count(*) filter (where turn_index >= 1),0)) stop_by_t3_pct,
  round(100.0*count(*) filter (where turn_index >= 10)/nullif(count(*) filter (where turn_index >= 1),0)) reach_t10_pct,
  count(*) filter (where sd <= '2026-11-19' and turn_index >= 1) e1_started, count(*) filter (where sd <= '2026-11-19' and turn_index >= 1 and p1) d1_started
from x group by 1,2 order by first_sessions desc limit 14;

-- ============================================================ DB-4 per-session stop-by-T3 since the 10-30 doc (its M1 definition)
select st.slug, count(*) sessions, round(100.0*avg((ss.turn_index>=1)::int)) pct_started, count(*) filter (where ss.turn_index>=1) started,
  round(100.0*count(*) filter (where ss.turn_index between 1 and 3)/nullif(count(*) filter (where ss.turn_index>=1),0)) stop_by_t3,
  round(100.0*count(*) filter (where ss.turn_index>=10)/nullif(count(*) filter (where ss.turn_index>=1),0)) reach_t10
from story_sessions ss join stories st using (story_id)
where st.official and ss.created_at >= '2026-10-30 04:00:00+00' and ss.created_at < '2026-11-20 05:00:00+00'
  and ss.user_id not in ('8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23','78c723e1-3a8c-4500-8e90-50ba82b00424')
group by st.slug order by sessions desc limit 14;

-- ============================================================ DB-5 story test (docs/story-test.md hash), complete first days only
with t as (
  select a.user_id, l.created_at, (l.created_at at time zone 'America/New_York')::date d
  from wallet_ledger l join wallet_accounts a using (account_id)
  where l.type = 'TURN_FINALIZE' and a.user_id not in ('8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23','78c723e1-3a8c-4500-8e90-50ba82b00424')
), f as (select user_id, min(d) fd, min(created_at) fts from t group by 1
         having min(created_at) >= '2026-11-18 03:27:00+00' and min(d) <= '2026-11-20'),
p as (
  select f.user_id, f.fd,
    case when (('x' || substr(encode(sha256(convert_to('storytest-allin:' || f.user_id, 'UTF8')), 'hex'), 1, 8))::bit(32)::bigint % 5) = 0
      then 4 else (('x' || substr(encode(sha256(convert_to('storytest:' || f.user_id, 'UTF8')), 'hex'), 1, 8))::bit(32)::bigint % 4) end b,
    (select count(*) from t where t.user_id = f.user_id and t.d = f.fd) d0turns,
    exists (select 1 from t where t.user_id = f.user_id and t.d = f.fd + 1) back1
  from f
)
select case when b=4 then 'ALL-IN' when b=0 then 'control' when b=1 then 'yes' when b=2 then 'push' else 'yes+push' end grp,
  count(*) n, count(*) filter (where d0turns<=4) quit_by_4, count(*) filter (where d0turns>=10) ten_plus,
  count(*) filter (where fd<='2026-11-19') e_d1, count(*) filter (where fd<='2026-11-19' and back1) d1
from p group by 1 order by 1;
-- Baseline: same f without the HAVING time filter, first day between 2026-11-04 and 2026-11-17.

-- ============================================================ DB-6 weekly new-player trend
with t as (
  select a.user_id, (l.created_at at time zone 'America/New_York')::date d
  from wallet_ledger l join wallet_accounts a using (account_id)
  where l.type = 'TURN_FINALIZE' and a.user_id not in ('8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23','78c723e1-3a8c-4500-8e90-50ba82b00424')
), f as (select user_id, min(d) fd from t group by 1),
p as (select f.*, date_trunc('week', f.fd)::date wk,
        (select count(*) from t where t.user_id=f.user_id and t.d=f.fd) d0,
        exists (select 1 from t where t.user_id=f.user_id and t.d=f.fd+1) b1,
        exists (select 1 from t where t.user_id=f.user_id and t.d between f.fd+1 and f.fd+7) bw
      from f where f.fd >= '2026-09-21')
select wk, count(*) new_players, round(100.0*count(*) filter (where d0>=10)/count(*)) pct_10plus_d0,
  round(100.0*count(*) filter (where d0<=4)/count(*)) pct_quit_by4,
  round(100.0*count(*) filter (where fd <= '2026-11-19' and b1)/nullif(count(*) filter (where fd <= '2026-11-19'),0),1) d1_pct,
  round(100.0*count(*) filter (where fd <= '2026-11-13' and bw)/nullif(count(*) filter (where fd <= '2026-11-13'),0),1) back7_pct
from p group by wk order by wk;
