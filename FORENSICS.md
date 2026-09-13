# Forensic pass — 80 continuous turns of Ace

Session `sess_d39e14f5-385e-4570-9a01-9959d81acc12`, turns 1–80, one world state.
Every claim below is from the database or from running the code, not from reading prose.

## Case 1 — Turn 2, the attack nobody chose

Card: *"I turn to Sabo with a smirk, swinging my pipe across my shoulders.
'Think you can keep up with me this time, or are you just here for the scenery?'"*

Committed `normalizedActions`:

    [{"verb":"speak","targets":[sabo]},
     {"verb":"attack","outcome":"FAILURE","targets":[sabo]}]

**First incorrect state: the parser.** Not the model parser, not the writer —
`RuleBasedIntentParser`. Reproduced directly:

    "I rest the pipe on my shoulder, swinging it lazily."  -> ["attack"]
    "I swing the pipe at Sabo."                            -> ["use_item"]
    "I sling the bat over my shoulder and grin at Tom."    -> ["custom"]

Two separate faults, and they are inverted:

1. Bare `swinging` is in the **attack** lexicon, added as a mid-fight
   continuation ("a player mid-fight says 'keep going', not 'I attack Kael for
   the third time'"). Outside a fight it fires on any swinging motion —
   including a pipe being slung across the shoulders, which is the gesture that
   started this whole session's false history.
2. `swing … at`, which *is* a real attack, resolves to `use_item`, because
   clause matching tries items before verbs and "pipe" is an item.

So the engine's own classifier reads a gesture as violence and a strike as
equipment handling. `stripInventedViolence` — the guard added last pass — does
not catch it, because that guard only demotes an attack with **no** physical
word in the sentence, and "swinging" is on its permit list. The guard was built
for the model parser inventing violence out of banter; this is the rule parser
inventing violence out of a preposition.

## The pipeline, as it actually is

From `packages/director/src/pipeline.ts` `runTurn`, in order:

| # | stage | can create a fact? | can override player intent? | can write persistent state from prose? |
|---|---|---|---|---|
| 1 | ellipsis expansion | no | rewrites the text | no |
| 2 | `RuleBasedIntentParser` | **yes — it decides the verb** | **yes** | no |
| 3 | `needsModelParse` → `ModelIntentParser` | **yes** | **yes** | no |
| 4 | `stripInventedViolence` | demotes only | no | no |
| 5 | `resolveIntent` (engine) | **yes — the only legitimate author** | no | no |
| 6 | `RuleBasedDirector` / `ModelDirector` | plans, and writes `suggestedActions` | no | no |
| 7 | writer (`fast-writer`, production) | **yes, in prose** | no | **yes, indirectly** |
| 8 | `validateNarrative` + repair | removes only | no | no |
| 9 | `commitTurn` | applies mutations | no | no |
| 10 | memory extraction | **yes — facts from prose** | no | **yes** |
| 11 | `generateResponses` | offers actions | no | no |

**Five stages can introduce something the next stage treats as true**: two
parsers, the engine, the writer, and memory extraction. Only one of them —
`resolveIntent` — is supposed to.

The user's theory is **correct**, with one correction: the problem is not that
prose is read back as state (memory extraction is narrow and gated). It is that
**the parser decides what happened before the engine ever sees it**, and the
writer then renders a beat the engine did not authorise. The engine is
authoritative over *outcomes* and has no authority over *what was attempted*.

## Case 2 — Turns 10, 12, 49: the player moves and the world forgets

Committed `normalizedActions`:

    t10  use_ability  UNKNOWN_ABILITY  REJECTED   -> dadan_house
    t12  speak + interact (uncontested)           -> dadan, dadan_house
    t49  interact (uncontested)                   -> (no targets)

**No `travel` clause exists in any of them.** The engine had nothing to commit,
so it committed nothing — correctly. The writer narrated the whole walk anyway.

Root cause, reproduced against the parser:

    'Let’s move to the Treehouse.'                -> travel    OK
    'I start walking toward the Dadan Family House.' -> custom  FAIL
    'I am walking down to the Dadan Family House.'   -> custom  FAIL
    'I am heading to the Treehouse.'                 -> custom  FAIL
    'I am going to the Treehouse.'                   -> custom  FAIL
    'I set off for the Treehouse.'                   -> custom  FAIL

`MOVEMENT` in the travel lexicon holds bare stems only — `go|head|walk|travel|
move|…` followed immediately by a preposition. **Every progressive form fails**,
and "going to" and "heading to" are the two commonest ways English states
travel. The positive controls (t45 "move to", t70, t74) all happen to use a bare
stem. That is the entire difference between the turns that worked and the turns
that did not.

## Case 9 — Turn 76: an NPC refusal cancels the player's own movement

    [{"verb":"speak","targets":[luffy]},
     {"verb":"interact","outcome":"FAILURE","targets":[dadan, dadan_house]}]

The player's own move and the request to Luffy were folded into **one contested
clause**, and the clause failed, so the move died with it. Nothing in the model
distinguishes "I walk to the kitchen" (the player decides) from "and Maya comes
with me" (Maya decides).

## Case 8 — Turn 52: one action, three checks

    inspect(ship_fund) COMPLICATION
    inspect()          COMPLICATION
    custom(ship_fund)  COMPLICATION

One sentence decomposed into three clauses, each rolled independently, each
complicating. Nothing knows they were one player action.

## Case 6 — Turns 53→54: not a presence contradiction

The engine was right both times. At t53 the player was alone at the treehouse.
At t54 they **travelled to Mount Colubo**, where Luffy, Dadan and Garp were
already standing. Nobody teleported.

What is missing is the arrival: the player walked into a room containing three
people and the beat did not show meeting them. The `arrivals` mechanism added
last pass only detects other characters moving *to* the player, never the player
moving *to them*.

## Metrics reconciliation — the telemetry was mine, and it was wrong

Turns 1–40 fired **13** checks. The second report said 7.

Both numbers came from throwaway scripts. The second one did
`const st = byRev.get(t.revision_after); if (!st) continue;` — and
`session_snapshots` is not one row per turn (120 rows for 81 turns). Six turns —
2, 3, 6, 8, 9, 17 — have no snapshot at their `revision_after`, so the script
silently dropped them **and their checks**. The same skip explains 35/41 versus
20/40 stalled.

No engine behaviour changed between the two reports. The instrument did. This is
why there is now one committed report tool instead of a script per question.

## One instrument

`npm run report -- <sessionId> [--from --to]` is now the only source of
playtest numbers. On the session above, turns 1–40:

    ## Checks — 13
    ## Movement
      turns whose text mentions going somewhere: 7
      turns with a committed travel/move action:  0
      beats that narrate leaving with no travel:  1
      distinct locations: mt_colubo

Seven turns said they were going somewhere and none of them moved. That is the
whole thesis in two lines, from one tool.

It also prints `20 without a state snapshot (presence/location skipped for
those)` rather than dropping those turns, which is the exact bug that made the
earlier two reports disagree.
