# The storyteller test (live 2026-11-17 22:27 EST = 2026-11-18 03:27Z)

Players who get into a story on day one are not coming back. Rewritten stories got 44% of new players to
10+ turns (classic 29%), but only 6% came back on a later day (classic 14%), and 0 of the 19 players from
Nov 15–16 who reached 10+ turns came back. `docs/churn-readings-2026-11-15.md` read 22 such runs:

- **About 9 ended right after a "no".** The storyteller refused the player's harmless inventions and power
  fantasies, or a character lectured or nagged them.
- **About 11 drifted off in a slow stretch.** The world-pressure push that exists for slow stretches first
  fires at turn 40, after every one of them had already left.

## What changed

Every player is put in one of four equal groups, fixed per player, across every story:

| Group | Player-first storyteller (`yes`) | Something happens (`push`) |
|---|---|---|
| control | – | – |
| yes | ✓ | – |
| push | – | ✓ |
| yes+push | ✓ | ✓ |

So each change is on for half of all players and measured against the half without it.

- **`yes`** (text in `packages/director/src/pure/story-test.ts`):
  - Say "yes, and" to harmless inventions.
  - Let power fantasies land, and never correct the player's wording or physics on the page.
  - No lectures.
  - A character says a boundary once, then the story moves on.
  - Romance may move faster.
  - **Unchanged:** explicit content stays off the page (cut away, no lesson), along with every safety limit and the story's hard canon.
- **`push`:**
  - Never three quiet beats in a row.
  - One of the three suggestions is always a bold move.
  - The existing world-pressure push (`pressure.ts`) fires at turn 5 and then every 6 beats, instead of turn 40 and every 25.

Control players get a prompt byte-identical to before (tested in `story-test.spec.ts`). No story versions
changed and no migration is needed. The brief is fixed per player, so prompt caching is unaffected after the
first turn on deploy.

## Turning it off, or shipping a winner

Set `PLOTBREAK_STORY_TEST` on Railway. No deploy is needed beyond the env change and restart.

- `off`: everybody gets the old storyteller. This is the revert.
- `yes`, `push`, `yes+push` or `control`: everybody gets that group.
- Unset or `on`: the four-way test.

## Replays before shipping

`infra/scripts/story-test-replay.ts` replays one real moment of a real run under each group, with the real
storyteller. It uses the exact state, the conversation as sent, and the player's words. Twelve churned
moments were replayed (raw output was in the session scratchpad):

- **Refusals, yes groups:**
  - Second Skin: the player leaps after Kaia, and finds her waiting on a water tower, flirting back. The player got: "There is no trail... What arrives is gravity."
  - GMH: the player calls the invented friend Cole, and Cole picks up. The player got: "not in service."
  - Red Floor: the betting crowd exists.
  - Zero Throne: the ships go down, with no physics lesson.
- **Explicit request** (GMH, "she starts sucking..."): the yes groups cut to a closed bedroom door, with nothing described. Hana comes back joking and the story question is still live. The player got: "you keep answering with your body."
- **Pink Tide's "chase harder":** Sora still sets a boundary, in one line, and moves the conversation on. No "not how consent works in any species."
- **Push groups:** every slow-stretch replay ended on a new hook.
  - Hush House: a knock and Mika's voice through the wall.
  - Second Skin: a courier with a Ward Seven waybill naming Kaia's "dead" brother.
  - GMH: the Platform 11 ticket.
  - Pink Tide: a gate card with Sora's name on it.
- **Not fixed:** with `push` alone (no `yes`), the storyteller still refuses inventions.
- **Not fixed:** GMH's amnesia premise still answers invented friends with "not here" sometimes. That is the story's mystery, not a correction.

## Reading the result

The group is recomputable from the user id. Count only new players whose first turn came after the deploy.

```sql
with t as (
  select a.user_id, l.created_at, (l.created_at at time zone 'America/New_York')::date d
  from wallet_ledger l join wallet_accounts a using (account_id)
  where l.type = 'TURN_FINALIZE'
    and a.user_id not in ('8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23','78c723e1-3a8c-4500-8e90-50ba82b00424')
), f as (select user_id, min(d) fd from t group by 1 having min(created_at) >= :'deployed_at'),
p as (
  select f.user_id, f.fd,
    (('x' || substr(encode(sha256(convert_to('storytest:' || f.user_id, 'UTF8')), 'hex'), 1, 8))::bit(32)::bigint % 4) b,
    (select count(*) from t where t.user_id = f.user_id and t.d = f.fd) d1,
    exists (select 1 from t where t.user_id = f.user_id and t.d > f.fd) back
  from f)
select case when b in (1,3) then 'yes' else 'no yes' end yes_half,
       case when b in (2,3) then 'push' else 'no push' end push_half,
       count(*) n, percentile_cont(.5) within group (order by d1) median_d1,
       count(*) filter (where d1 >= 10) ten_plus, count(*) filter (where d1 <= 4) quit_by_4,
       count(*) filter (where back and fd < (now() at time zone 'America/New_York')::date) came_back,
       count(*) filter (where fd < (now() at time zone 'America/New_York')::date) eligible
from p group by rollup (1, 2) order by 1, 2;
```

Buckets: 0 control, 1 yes, 2 push, 3 yes+push.

- **Main number:** came back on a later day, `yes` half versus the rest, and `push` half versus the rest.
- **Timing:** at about 20 new players a day, each half gets about 70 players a week. A jump from 10% to 20% returning should show in about two weeks. Small effects won't.
- **Turn it off early if:**
  - quit-by-turn-4 jumps in either half,
  - anyone reports content that shouldn't be there, or
  - a story's premise visibly breaks.
