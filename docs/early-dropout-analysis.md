# Early dropout by story: why some openings lose players in turns 1–3

Research only. Read-only queries against production, 2026-10-30. Population: official stories, sessions created on or after 2026-09-18, developer account `8ee88ed7…` excluded. 651 sessions; 417 played at least one turn.

**Caveats**
- These counts are per session. The brief's figures were per player, so they differ slightly.
- Deleted sessions are missing, so every count here is an undercount. If people delete sessions they gave up on, the stop rates are biased low.
- About 60% of sessions saw the French opening.
- The "keep" stories have small samples (6–23 started sessions each). A rate based on 20 sessions is only accurate to about ±20 points.
- I tested about 12 features, so a single p≈0.01 result should be read with that in mind.
- Entry source is not recorded anywhere: `story_impressions` is empty. As proxies I used "first story the user ever opened" and "opened within 20 minutes of the profile being created" (which stands in for onboarding).

## Per-story features

Notes on the columns:
- **Stop by T3**: share of started sessions whose last turn was 1, 2 or 3.
- **Opt words**: median length of the three authored opening options.
- **Tap 1st**: the first move was a tap on an opening option rather than typed text.
- **You-led**: share of sentences in reply 1 that start with You/Your/Tu/Ton.
- **Wait**: turn-1 credit reserve to finalize time, in seconds. This is total generation time. The player may see streamed text earlier.

| Story | Sessions | Started | Stop by T3 (n started) | Reach T10 | Stop by T3, first story only (n) | Opening words | Opt words | Tap 1st | Reply-1 words | You-led | Wait p50 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Second Skin | 121 | 59% | **66% (71)** | 20% | 60% (50) | 139 | 37 | 94% | 275 | 0.07 | 15.3 |
| Itachi | 88 | 60% | **58% (53)** | 19% | 63% (46) | 138 | 40 | 79% | 232 | 0.09 | 11.5 |
| Ace | 32 | 66% | 52% (21) | 19% | 46% (13) | 143 | 40 | 81% | 239 | 0.07 | 11.3 |
| Last Service | 9 | 78% | 71% (7) | 14% | 75% (4) | 143 | 37 | 57% | 224 | 0.06 | 19.0 |
| The Fourth Beast | 8 | 62% | 80% (5) | 0% | 100% (2) | 141 | 40 | 80% | 282 | 0.04 | 12.7 |
| The Red Floor | 17 | 71% | 17% (12) | 50% | 25% (8) | 118 | 43 | 67% | 247 | 0.06 | 8.2 |
| Zero Throne | 31 | 74% | 48% (23) | 48% | 47% (19) | 125 | 37 | 57% | 233 | 0.10 | 12.2 |
| Light | 15 | 60% | 33% (9) | 44% | 40% (5) | 142 | 26 | 78% | 254 | 0.19 | 8.9 |
| Uncounted | 13 | 46% | 33% (6) | 50% | 25% (4) | 148 | 39 | 83% | 303 | 0.06 | 12.1 |
| Hush House | 36 | 56% | 50% (20) | 35% | 50% (16) | 127 | 27 | 80% | 257 | 0.07 | 11.2 |
| Pink Tide | 97 | 72% | 46% (70) | 26% | 49% (53) | 157 | 34 | 76% | 284 | 0.09 | 14.6 |
| Good Morning, Husband | 83 | 76% | 38% (63) | 25% | 38% (47) | 108 | 42 | 68% | 214 | 0.12 | 11.0 |

**Features that did not separate the groups**
- **Opening length.** Every opening is 108–157 words.
- **Ending on a direct question.** No opening ends on a "?"; all end on an action or a held-out object.
- **Proper nouns.**
- **"Danger" vocabulary** in replies 1–3.
- **Opening language.** French 51% stop by T3 vs English 46%.
- **Date.** 49% before vs 50% after the per-story median date.
- **Failed turns.** There were only 145 TURN_RELEASEs since 9/18, and only 10 started sessions had one. Failures are not what drives early exits.

**The gap is not just casual onboarding taps.** Pooled, the lose stories stop 62% of started sessions by T3 (98/157) against 40% for the keep stories (28/70). The gap holds in each subset:

| Subset | Lose stories | Keep stories |
|---|---|---|
| First story the user ever opened | 61% (115) | 42% (52) |
| Not opened in onboarding | 64% (58) | 33% (27) |
| First move tapped | 65% (134) | 45% (49) |
| First move typed | 48% (23) | 29% (21) |

**Most of the loss happens right after the first reply.** 35% of started lose-story sessions end after exactly one turn, against 23% for keep stories and 24% for the reference stories. Reply 1 is the beat that decides it.

## Findings that best separate keepers from losers

1. **One authored opening option is a dead end in Second Skin.**
   - Option 3 ("I turn to Ren. 'Do not.' I have got a handful of their sleeve…") was taken in 17 sessions; 16 stopped by T3 (94%).
   - Options 1 and 2 plus typed moves: 28 of 54 stopped (52–57%). Fisher p=0.006.
   - Why it fails: the player's first act is to stop someone else from acting, and the model obliges by freezing the scene. Typical replies end "Ren does not pull free of your grip… the entire hall waits to see what happens next" and "Kaia: …you three stay here. It is not a negotiation."
   - Option 2 is the opposite case: shielding a child, which makes the player's hands manifest power. It keeps the best (9/19 stopped). In one session that went past 10 turns, the reply was "A loose shard… strikes the air a handspan from your fingers."
   - The same per-option split exists elsewhere, but with weaker numbers:
     - Good Morning, Husband: "take her hand" 29% stop (n=31) vs "I don't know your name" 60% (n=10).
     - Itachi: "teach the grip" 55% (n=22) vs "sit and ask about the family" 67% (n=18).
   - Takeaway: per-option survival is the most actionable signal in the data.

2. **The keepers open on an event that is about the player. The losers open on someone else's event, or on a quiet scene.** This is my own reading of the 10 stories, not a computed number.
   - Keepers:
     - Zero Throne: the mech kneels to *you* ("Pilot recognised.").
     - Uncounted: *your* hand fails the stone.
     - Light: the notebook falls in front of *you*.
     - Red Floor: "Unless you're here for the other thing." By T2 the player has said "I am here to fight" and gets "Good. We have been short one person."
     - Hush House: "there are three things you need to know."
   - Losers:
     - Second Skin: a stranger crashes a ceremony and you are in the audience.
     - Itachi: shuriken practice with Sasuke; the coup from the hook is only alluded to ("under the seventh mat", "the tower").
     - Ace: Luffy tagging along. Low stakes; the next beat is "I'm going to touch you once."
     - Last Service: a fish is sent back, then a stranger hands over a card.
     - Fourth Beast ("Choose") is the exception, and its n=5 is noise.
   - Canon note: Light opens on the canon's iconic inciting moment and keeps players. Itachi and Ace open on quiet pre-canon character moments and lose them. The problem is not that canon constrains the player; it is that those two openings do not start where the canon's stakes are.

3. **Replies about the player keep players; replies about other characters lose them.** Within each story, sessions whose reply 1 had an above-median share of "You…" sentences stopped by T3 42% of the time (77/182). Below-median sessions stopped 56% of the time (103/184), z≈2.7. At story level Light (0.19) and GMH (0.12) are highest, but the story-level ordering is noisy. Losing replies are crowded with others' reactions. Second Skin names three or more speakers by reply 2 ("Maren Tovi", "Tessa Vale", "Kaia Voss", plus "the Tovis") and gives Ren two names, Ren and "Maren Tovi". Treat this as moderate evidence.

4. **Long and slow first replies are associated with leaving.**
   - Within story, an above-median reply-1 length went with 55% stopping by T3 (103/187) against 43% below (80/186), z≈2.3.
   - Turn-1 generation time did the same: 53% vs 44%.
   - The two are correlated (r=0.46), so this is mostly one effect: a long reply that also takes longer.
   - Second Skin (275 words, 15 s) and Pink Tide (284 words, 15 s) have the longest and slowest reply 1. Red Floor and Light are about 8–9 s.
   - Overall waits dropped from about 16 s in September to about 8–9 s in late October, and the stop rate did not move much. So speed alone is not the fix.

5. **Typed first moves stay more often than taps** (37% vs 53% stop, n=93/324, p=0.007).
   - This is mostly self-selection: invested players type.
   - But the authored options are 37–43-word first-person paragraphs. 94% of Second Skin starters tapped one, so in those stories the opening option effectively is the first turn. That makes finding 1 matter more.
   - Hush House and Light have the shortest options (26–27 words).

**Noise or unknown**
- About 40% of sessions never take a turn, in losers and keepers alike (Uncounted 54%, Hush House 44%, Second Skin 41%). Nothing in the data explains this. It may be setup-screen abandonment: Itachi's setup asks a 300-character archetype question before play.
- Zero Throne's 48% stop-by-T3 sits beside 48% reaching T10. It is bimodal, not a clean keeper.

## Tracking metrics (all queries were run against production)

All queries use the same exclusions as above. They are saved in the scratchpad as `m1.sql`, `m3.sql`, `m4.sql` and `m5.sql`.

### M1 + M2: start rate and early survival per story, last 28 days

Watch two numbers: `pct_started` (a low value means the hook or setup screen is losing people) and `pct_reach_t4_of_started` (a low value means the opening plus reply 1 is losing people). Alert when a story with 20 or more starts falls below 50% reaching turn 4.

```sql
SELECT st.slug, count(*) AS sessions,
       round(100.0*avg((ss.turn_index>=1)::int)) AS pct_started,
       count(*) FILTER (WHERE ss.turn_index>=1) AS started,
       round(100.0*count(*) FILTER (WHERE ss.turn_index>=4)
             / nullif(count(*) FILTER (WHERE ss.turn_index>=1),0)) AS pct_reach_t4_of_started,
       round(100.0*count(*) FILTER (WHERE ss.turn_index>=10)
             / nullif(count(*) FILTER (WHERE ss.turn_index>=1),0)) AS pct_reach_t10_of_started
FROM story_sessions ss JOIN stories st USING (story_id)
WHERE st.official
  AND ss.created_at >= greatest(now() - interval '28 days', '2026-09-18')
  AND ss.created_at <  now() - interval '1 day'
  AND ss.user_id <> '8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23'
GROUP BY st.slug ORDER BY started DESC;
```

Run on 2026-10-30, share reaching T4 of started:

| Story | Reached T4 | Started |
|---|---|---|
| Second Skin | 38% | 34 |
| Itachi | 38% | 26 |
| Zero Throne | 36% | 11 |
| Good Morning, Husband | 42% | 24 |
| Pink Tide | 61% | 31 |
| Red Floor | 80% | 10 |

### M3: survival by first move (opening option 1/2/3 or typed)

This is the most actionable metric: it points at the exact authored option that kills sessions.

```sql
WITH s AS (
  SELECT ss.session_id, st.slug, ss.turn_index
  FROM story_sessions ss JOIN stories st USING (story_id)
  WHERE st.official AND ss.created_at >= '2026-09-18'
    AND ss.created_at < now() - interval '1 day'
    AND ss.user_id <> '8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23'
    AND ss.turn_index >= 1),
first_move AS (
  SELECT s.*, coalesce((
     SELECT 'sug' || o.ord FROM jsonb_array_elements(t0.suggestions) WITH ORDINALITY o(x, ord)
     WHERE btrim(o.x->>'text') = btrim(t1.action_text) LIMIT 1), 'typed') AS move
  FROM s
  JOIN turns t0 ON t0.session_id = s.session_id AND t0.turn_index = 0
  JOIN turns t1 ON t1.session_id = s.session_id AND t1.turn_index = 1)
SELECT slug, move, count(*) AS n, round(100.0*avg((turn_index>=4)::int)) AS pct_reach_t4
FROM first_move GROUP BY slug, move ORDER BY slug, move;
```

Run on 2026-10-30: Second Skin sug3 reached T4 in 6% of 16 sessions, against sug1 39% (31) and sug2 50% (18). GMH sug2 reached T4 in 40% (10), against sug1 70% (30).

### M4: shape of reply 1 (length and how much of it is about the player)

Targets: median of 240 words or fewer, under 10% of replies over 300 words, and a you-share of 0.12 or more.

```sql
WITH r AS (
  SELECT st.slug, ss.turn_index,
         regexp_replace(pc.assistant_text, '\n\[[^\]]*\]\s*$', '') AS txt
  FROM story_sessions ss JOIN stories st USING (story_id)
  JOIN pure_conversation pc ON pc.session_id = ss.session_id AND pc.turn_index = 1
  WHERE st.official AND ss.created_at >= '2026-09-18'
    AND ss.created_at < now() - interval '1 day'
    AND ss.user_id <> '8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23'),
f AS (
  SELECT slug, turn_index,
         array_length(regexp_split_to_array(btrim(txt), '\s+'), 1) AS words,
         regexp_count(txt, '(^|[.!?…»"”]\s+|\n)(You|Your|Tu|Ton|Ta|Tes)\M')::numeric
           / greatest(1, regexp_count(txt, '[.!?…]+(\s|$)')) AS you_share
  FROM r)
SELECT slug, count(*) AS n,
       percentile_cont(0.5) WITHIN GROUP (ORDER BY words)::int AS med_words_reply1,
       round(100.0*avg((words > 300)::int)) AS pct_over_300w,
       round(percentile_cont(0.5) WITHIN GROUP (ORDER BY you_share)::numeric, 2) AS med_you_share,
       round(100.0*avg((turn_index <= 3)::int)) AS pct_stop_by_t3
FROM f GROUP BY slug HAVING count(*) >= 5 ORDER BY pct_stop_by_t3 DESC;
```

Run on 2026-10-30: Second Skin 268 words, 20% over 300, you-share 0.08, 67% stopped. Pink Tide 28% over 300. GMH 209 words, 3% over 300, you-share 0.13, 39% stopped.

### M5: wait for the first reply

Track p50 and p90 of turn-1 reserve-to-finalize time. Alert above a 12 s p50 or a 20 s p90.

```sql
WITH t AS (
  SELECT st.slug, extract(epoch FROM (fin.created_at - res.created_at)) AS wait_s
  FROM story_sessions ss JOIN stories st USING (story_id)
  JOIN turns t1 ON t1.session_id = ss.session_id AND t1.turn_index = 1
  JOIN wallet_ledger res ON res.reference_id = t1.turn_id AND res.type = 'TURN_RESERVE'
  JOIN wallet_ledger fin ON fin.reference_id = t1.turn_id AND fin.type = 'TURN_FINALIZE'
  WHERE st.official AND ss.created_at >= now() - interval '28 days'
    AND ss.created_at >= '2026-09-18'
    AND ss.user_id <> '8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23')
SELECT slug, count(*) AS n,
       round(percentile_cont(0.5) WITHIN GROUP (ORDER BY wait_s)::numeric, 1) AS p50_wait_s,
       round(percentile_cont(0.9) WITHIN GROUP (ORDER BY wait_s)::numeric, 1) AS p90_wait_s,
       round(100.0*avg((wait_s > 20)::int)) AS pct_over_20s
FROM t GROUP BY slug HAVING count(*) >= 5 ORDER BY p50_wait_s DESC;
```

Run on 2026-10-30, last 28 days: Second Skin 12.0 s p50 is the slowest; Red Floor is 7.9 s.

### Missing instrumentation

Log the entry source (onboarding, Discover slot, search) on `story_sessions`. Without it, the effect of the onboarding push can only be estimated with proxies.

## Per-story fixes

**Second Skin** (highest priority: the most traffic and the worst early stop rate).
- Replace or rewrite opening option 3. Restraining Ren is a non-action, and the model answers it with a frozen hall. Either cut it, or make Ren pull free and pull the player into the aisle anyway, so that the choice escalates instead of pausing.
- Reorder so option 2 (protect the child, the hands manifest) is first. It survives best, and option 1 gets the most taps.
- Add a bible or `openingObligations` rule: in the first three beats Kaia must not order the player to stay or leave. She needs them, or the hall's reaction to their hands forces them into it. Right now every early reply sidelines the player: "Go to the west door. Do not follow me."
- Fix Ren's two names. The narration says "Ren" while the speaker label says "Maren Tovi", which reads as two different people.
- Cut the cast named before turn 3 to Kaia plus one friend.

**Itachi.**
- Open where the hook is. The hook promises a coup in two weeks and a double agent. The first three beats are throwing practice, and the stakes are encoded in in-world jargon a new player cannot decode ("under the seventh mat", "the tower expects a report").
- Fix: state the two-masters bind in plain words in the opening. Have an interruption by turn 2 at the latest (Shisui, or a Root courier) that forces a choice between Sasuke and the meeting.
- The "ask Sasuke about the family" option (67% stop) leads to a gentle chat. Swap it for an option that triggers the conflict.

**Ace.**
- The opening's stakes are a kid following you. That is charming but has no pull, and the next beat is "I'm going to touch you once."
- Start on an incident that matters: Luffy in real danger, or the brothers' pirate stash under threat. Make Ace's protective choice the first move.
- n=21, so treat this as directional only.

**Last Service.**
- Four lines of restaurant-operations detail (the hood, the burner, the supplier, the quote) come before the inciting event, and the event is about a stranger, not the player.
- Lead with the stranger and the offer, and make the offer a direct question to the player in the opening itself, not in reply 1.
- n=7, directional only.

**The Fourth Beast.**
- n=5, too few to judge. The opening already ends on a direct "Choose", which is the right shape.
- Watch it with M1 and M3 before changing anything.

**All stories.**
- Shorten authored opening options to 15–25 words; they are currently 37–43.
- Cap reply 1 at about 200 words, with "you" as the subject of the first and last sentences.
- Review M3 weekly and retire any option under 25% reach-T4 once it has 10 or more uses.
