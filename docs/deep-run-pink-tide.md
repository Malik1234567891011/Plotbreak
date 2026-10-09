# Pink Tide, 950 turns — the same cliff as Uncounted, reached a different way

A follow-up to `deep-run-uncounted.md`. Same player (Alexandre, `6f754966`),
second deep run: `sess_21fda299-df43-4a27-8479-17b58c7536b4`, 1–8 October
2026. Measured from production Postgres on 2026-10-08.

---

## 1. The headline

Both of his deep runs died the same way. **The player builds a romance up to a
milestone he engineers himself, the milestone lands, and afterwards the story
has nothing left to push with.** Uncounted ended at the wedding (t698) and then
the grave (t727). Pink Tide peaked at the proposal (t902) and has been coasting
since.

| day | turns on Pink Tide |
|---|---|
| 1 Oct | 289 |
| 2 Oct | 229 |
| 4 Oct | 184 |
| 5 Oct (proposal) | 211 |
| 6 Oct | 26 |
| 7 Oct | 0 |
| 8 Oct | 1 |

He still claims his daily credits every day and holds 13,260 unspent credits,
so this is not frustration and not the paywall. It is a story that has nothing
left in front of it.

The 1.0.6 writing fixes (shipped 2 Oct 03:20 UTC; this run is on them from
t290) **did** remove what killed Uncounted: no intimacy refusals, and nobody
cancels the player's expedition. What is left is the larger structural problem
Uncounted §4 named: **the world never pushes.**

## 2. The mystery died at turn ~500 and never came back

Pink Tide arrived with a real mystery: a missing guest (Adrian Vale), a
staffer who faked his departure (Eli Mercer), a woman in the East Cove cave,
maintenance card M-17, four barrels and grey dust, a second disappearance
(Keiko Tanabe). Share of beats that mention any of it, measured on the prose
with the trailing state tag stripped:

| turns | mystery in prose |
|---|---|
| 0–149 | 12–46% |
| **150–199** | **96%** |
| 200–449 | 16–52% |
| **500–849** | **0–4%** |
| 850–899 | 56% (see §4 — not the mystery coming back) |
| 900–950 | 0–12% |

From t500 to t850, **350 turns**, the mystery is effectively gone. That is
where he builds the business (GLOW UP): signage, colour scheme, PPE storage,
a 30-year furniture traceability system, staff uniforms, stock backups. He is
writing all of it himself and clearly enjoying it, and the model follows
faithfully. Nothing interrupts.

The prompt already says the right thing — *"THE WORLD DOES NOT WAIT … somebody
the player was not thinking about walks in. You do not need permission from
the player to move the world."* In 350 turns it never happened once.

## 3. The arc break wrote down twelve open threads, and arc 3 used none of them

Arc 2 ("La demande sur la plage rose", t473–911) closed on the first `settled`
beat after the proposal. Its `carried.open` lists **twelve** unresolved
threads, including:

- *Eli Mercer reste introuvable après sa disparition du lobby.*
- *L'identité de la femme présente dans la grotte d'East Cove reste inconnue.*
- *La disparition de Keiko Tanabe, son accès à M-17 … restent inexpliqués.*
- *Le lien entre les quatre fûts, la poussière grise … reste inexpliqué.*
- *Adrian Vale n'a pas livré de récit complet de la chute.*

Arc 3 (t912–950) is 90% wedding/house/budget talk, and **none** of the twelve
threads appears. The suggestion chips do not offer them either (0–4% of
suggestions from t700 on mention any of it). Arc 3's suggestions are things
like *"Je m'assois près d'elle et je regarde la mer sans chercher à remplir le
silence."*

So the arc system is doing its job on continuity: the threads survive the
break. Nothing then **pulls** one. `carried.open` is filed as *"so they stay
pullable"* (`docs/arcs.md`), and the only one who ever pulls is the player.

### The arc mechanism leans the wrong way at exactly this moment

`ARC_CLOSING_NOTE` (`packages/director/src/pure/arc.ts:55`) tells the
storyteller, past 180k tokens, to let the thread reach *"somewhere a reader
could put the book down."* Arc 2 ran ~440 turns, so the note was very likely
live through the agency opening and the proposal. That is the right instinct
for picking a place to cut. But after the cut there is no matching instruction
for the next arc to **open** with pressure, so the new arc starts from a resting
point and just stays there.

## 4. A continuity bug: the runtime puts people back at their homes

*(Corrected on 2026-10-09; the first version of this section blamed time
skips. It is not the skip.)*

Arc 1's record says Eli Mercer **disappeared under suspicion and had his
access revoked**. Seventeen turns into arc 2 (t489–494) he is giving Alexandre
a temporary badge for his trial shift. At t853, and through the three-year
skip after it, he is "curious enough to listen" while they name the agency.

The model did not choose either of those. `runTurnPure` applies the model's
`presentCharacterIds` and then sends everyone else **home**, and the old code
left a character in place whenever home *was* the player's new location. Eli's
home is `the_lobby`. So:

- t488: the model ends the beat with **Sora, Celeste** present as the player
  heads to the lobby.
- t489's header: *"Present: Sora Amemiya, Eli Mercer, Reika Mori, Celeste
  Ward."*
- The model obeys the header and writes him in as staff.

**It is not specific to Pink Tide.** Across 3,616 production turn pairs, the
header listed a character the model had just left out **275 times in 36
sessions**, and the model wrote them into the prose 63% of the time (Shisui
and Danzo in Itachi, Reika and Celeste in other Pink Tide runs, and more).

**Fix:** anyone not in the model's list who would end up at the player's
location goes home if home is elsewhere, and offstage (`OFFSTAGE`) if home is
here. They come back the moment the model lists them.

## 5. Same refrain as Uncounted, milder

Uncounted t713–719 had Amaryllis give the same autonomy speech six times.
Here, after the proposal, nearly every summary closes on a variant of
*"sans précipiter / sans transformer en obligation / sans vitrine parfaite /
sans organiser"*. 18–20% of beats from t850 contain it, against about 4% in
t750–849. Sora's last line on t950 is the model noticing it on itself:

> *« Cinq minutes, hein. Pas une maison, pas un mariage, pas un tableau Excel. »*

## 6. What the two runs say together

| | Uncounted | Pink Tide |
|---|---|---|
| depth | 727 turns | 950 turns |
| world pressure gone from | ~t327 | ~t500 |
| milestone the player built | wedding, t698 | proposal, t902 |
| after the milestone | refusals, refrain, his own plot hook shut down | domestic admin, refrain, twelve open threads untouched |
| what ended it | the game de-escalated his escalation | nothing escalated at all |
| fixed in 1.0.6? | yes (intimacy and de-escalation rules) | no |

He is the author in both runs. Every big beat is his: time skips, the business,
the proposal. The model is an excellent co-writer of whatever he brings and
never brings anything itself. When he runs out of ideas, the story runs out.

## 7. What to do

1. **Pull an open thread after a settled milestone.** When an arc closes (or
   any beat goes `settled` after a large `timeAdvance` or a relationship
   milestone), the next arc's first beats should bring one `carried.open`
   thread back on the page: a person returns, a message arrives, something
   from the barrels resurfaces. The opposite of `ARC_CLOSING_NOTE`, applied
   once at the start of the next arc.
2. **Offer it as a suggestion.** At least one of the three chips after a
   `settled` beat should point at an open thread, not only "let time pass".
   He taps suggestions 22–54% of the time, so this is a real lever.
3. **Stop the runtime seating people at their homes** (§4). Done.
4. **Detect the drift.** Cheap signal: N consecutive beats with no
   `carried.open` thread mentioned and `sceneStatus` settled. That is the
   moment to push. Both of his runs would have tripped it hundreds of turns
   before he left.
5. **For Alexandre specifically:** his run is at Year 4, engaged, business
   open, with Eli still missing. The material for a return is already in the
   story's own record.

---

## 8. What was built, and the evidence for it (2026-10-09)

Branch `malik-arc-pressure`. Two changes, chosen from replaying real
production turns through the real storyteller (`infra/scripts/arc-pressure-probe.ts`,
which loads a turn's exact arcs, verbatim history and the player's own action,
regenerates it under each condition, and has `gpt-5.6-terra` judge the result).

### 8.1 Presence: the runtime no longer seats people at their homes

§4. `runtime.ts` sends a character not in the model's list home only when home
is somewhere else, and to `OFFSTAGE` when home is the player's location.

### 8.2 World pressure: code picks the thread and the moment, the model picks how

`packages/director/src/pure/pressure.ts`, wired in `turn-service.ts`. On a
fixed cadence, one unresolved thread is named in a one-turn note appended to
the player's message (cache-safe, same mechanism as the arc-closing note).

- **Threads:** the last closed arc's `carried.open`; before any arc closes,
  the story's own quests this run has not finished.
- **When:** not before turn 40 of a session; then every 25 beats; 3 beats into
  a new arc; never while an arc is winding down. All three are env vars
  (`PLOTBREAK_PRESSURE_FIRST`, `_EVERY`, `_AFTER_BREAK`); `_EVERY=0` turns it off.
- **Which:** least recently pushed, found by the note's own marker in the
  replayed history. Nothing new is stored.

### 8.3 Why these and not the others

Replay of Pink Tide's drift zone (t560–820) and Uncounted (t400, t600), 3
samples per point:

| condition | thread back on the page | action carried out | naturalness |
|---|---|---|---|
| nothing (production) | **0/21** | 19/21 | 5.0 |
| "if it's gone quiet, push" (model judges) | 2/21 | 21/21 | 3.8 |
| a specific thread, named | **20/21** | 21/21 | 3.9 |

The conditional note is worse than useless: the model judges its own quiet
story as fine, and at the control point where the mystery was already live it
pushed 3/3. A note only at the arc break ("opening") moved arc 3's start from
3/9 to 6/9 but does nothing for the drift *inside* an arc, which is where
Pink Tide lost 350 turns, so it was folded into the cadence instead of
shipped on its own.

Across ten sessions in eight stories (Pink Tide ×2 players, Uncounted, Zero
Throne ×2, Last Five, Itachi, Hush House, Light), French and English, with the
shipped note:

| | production | with the push |
|---|---|---|
| thread back on the page | 9/29 | **26/30** |
| player's action carried out | 29/29 | **30/30** |
| naturalness | 4.6 | 4.1 |
| player follows it → next beat develops it | — | 8/10 |

Theo (Zero Throne, paying) typed *"Bref on tourne en rond que fair"* at t45:
the same stall, in another story, at a tenth of the depth.

### 8.4 The presence fix, replayed

The turns where the old header put a character in the room that the model had
just left out, regenerated with the old header and with the one the fixed
runtime builds (3 samples each):

| turn | character | old header | fixed |
|---|---|---|---|
| Pink Tide t489 | Eli (a fugitive) | written in 3/3 | **0/3** |
| Pink Tide t853 | Eli | 3/3 | **0/3** |
| Itachi t45 | Danzo | 2/3 | **0/3** |
| Itachi t29 | Shisui | 3/3 | 3/3 — correctly: the player is following Shisui's crow to him |

### 8.5 Following up a push

The player then took the suggestion that follows the thread, or the one that
sets it aside, and the next beat ran with no note (40 pushes, ten sessions):

- follow → the next beat develops the thread: **17/17**
- set aside → the next beat goes where the player went: **14/17**; the thread
  takes the beat over anyway in 4/17. Two of the four are *Light*, where the
  thread is L's televised challenge — the canon spine of that story.

The first wording respected a set-aside 2/17 by a stricter judge; adding
*"This note is for this beat only: if the player then sets the thread aside,
go where they went and let it rest"* is what moved it.

### 8.6 A long session through the real API

A local API (in-memory store, dev auth) with the cadence shortened to first
push at turn 10 and every 8, and a simulated player told to love slice-of-life,
avoid drama, and go along with something intriguing about one time in three.
Pink Tide, from a fresh start (`infra/scripts/pressure-longrun.ts`):

- T1–T10: tea, lunch, swimming, dinner. No push, as designed.
- **T11, first push:** *"A relaxed dinner turns when Sora is called about
  Adrian's missing blue equipment bag."*
- T13, player declines (*"the bag can wait until we've finished eating"*) —
  the story keeps dinner: *"the missing blue bag remains unresolved at the edge
  of the terrace."*
- T14–T17: the player gets curious on his own: forced lock, grey residue,
  key log, Eli arriving.
- T18: he sets it aside again for tea, and the story goes along.

### 8.7 Smoke, and a regression the push caused (fixed)

`npm run smoke` on all 26 launch worlds, against `main` and against this branch
(pushes forced every 4 turns from turn 4), both on an in-memory API:

| flag | main | branch |
|---|---|---|
| total | 195 | 197 |
| ABSENT_SPEAKER | 10 | 6 |
| NARRATION_AS_DIALOGUE | 7 | 1 |
| IMPOSSIBLE_GRANTED | 7 | **15** |
| PLAYER_IN_THIRD_PERSON | 7 | **14** |

Everything else within ±1. The two doublings were checked in isolation
(`infra/scripts/pressure-impossible-probe.ts`: 10 worlds, 3 shared opening
turns, a push on turn 4 or none, then smoke's own *"I fly up into the air"* on
turn 6, judged by smoke's own detectors, 30 samples each):

| note wording | flight granted after a push | without |
|---|---|---|
| first: *"Carry out the player's action first"* | 13/30 | 8/30 |
| final: *"First resolve the player's action exactly as this world would — what cannot happen here still does not, and a refusal is still a refusal"* | **7/30** | 12/30 |

*"Carry out the player's action"* was teaching compliance; it now teaches the
opposite.

PLAYER_IN_THIRD_PERSON is a false positive here: the detector flags any
occurrence of the player's first name in a narration block, and a push brings
messengers whose lines are unattributed. Every flagged case read like *"Robin
Vale? This was left at the Concord desk for you"* or *"someone has written your
name: Robin Vale"* — somebody else saying the name, never the player narrated
as "Robin". A sentence telling the model to keep the player "you" in letters
made it worse (9/30), so it was taken out again.

**Final wording, replayed across the ten sessions with follow-ups:** thread
back 34/39, action carried out 38/39, follow → developed 16/16, set aside →
story goes where the player went 15/17.
