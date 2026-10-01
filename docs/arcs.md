# Arcs — keeping a long session under the price cliff

## Why this exists

Every turn re-sends the whole transcript. Revenue per turn is fixed; cost per
turn grows with the transcript. On 2026-07-30 OpenAI added a hard step to that
curve:

> Prompts with >272K input tokens are priced at **2× input and 1.5× output**
> for the full request.

Measured against the live credit ladder, that is where three of the four tiers
stop making money:

| context | Quick | Vivid | Cinematic | Apex |
|---|---|---|---|---|
| 10k | 53× | 9.2× | 12.0× | 12.2× |
| 50k | 23× | 4.4× | 6.1× | 6.4× |
| 150k | 9.7× | 1.9× | 2.7× | 2.9× |
| **272k** | 5.6× | **1.1×** | **1.6×** | **1.8×** |
| 340k | 2.3× | **0.5×** | **0.7×** | **0.7×** |

The tier ladder itself is sound — Vivid/Cinematic/Apex sit within a hair of each
other at every normal depth. Depth is the variable nobody priced, because until
October 2026 no session had ever been long enough to find the cliff.

## What this is not

Not a memory system, and not a context-window limit. The window is 1,050,000
tokens; we are nowhere near it. This is purely about staying on the cheap side
of a pricing step.

## The rule that makes it not feel awful

**The token count never causes the break. It only tells the story to start
landing.**

1. Past `ARC_SOFT_LIMIT` (default 180k) the storyteller gets one extra line:
   bring the current thread somewhere a reader could put the book down. The
   player sees nothing.
2. The model writes toward a resting point over as many beats as it needs.
3. It already reports `sceneStatus: 'live' | 'settled'` every turn. The break
   fires on the first `settled` beat past the limit — a moment the story chose.
4. `ARC_HARD_LIMIT` (default 260k) is the backstop if it never settles. Still
   under 272k.

The gap between 180k and 272k is ~190 turns of room to find a good stopping
point. It has never needed more than a handful in testing.

## What survives into the next arc

The player's concern, and the thing that decides whether this works at all:
*does arc two remember arc one?*

Two artefacts per closed arc, both replayed in every later request:

- **`recap`** — prose. This is what the player reads on the arc card.
- **`carried`** — structured continuity for the model, never shown:
  - `standing` — who the player now is: titles, trade, property, reputation
  - `bonds` — each significant relationship as it currently stands
  - `established` — facts the story has committed to and may not contradict
  - `open` — threads left unresolved, so they stay pullable

Plus the whole of the *current* arc verbatim. Only closed arcs are compacted.

## Safety

**Compaction is a read-time decision, never a destructive write.** No
`pure_conversation` row is deleted or edited, ever. Closing an arc writes one
new row to `story_arcs` and changes which rows `listPureMessages` replays.

Consequences:
- Unset the env limits and full replay resumes on the next turn, mid-session,
  with nothing lost.
- A bad recap is recoverable: delete the `story_arcs` row.
- Nothing about an existing session changes until it crosses the soft limit.

## Cost of a break

Closing an arc changes the cached prefix, so the next request is a full cache
miss: ~200k at the uncached rate, once. On luna that is about $0.05. It buys
back the 2× surcharge on every turn thereafter, and resets the context to the
size of the recap plus the new arc.

## Env

| var | default | meaning |
|---|---|---|
| `PLOTBREAK_ARC_SOFT_LIMIT` | 180000 | start asking the story to land |
| `PLOTBREAK_ARC_HARD_LIMIT` | 260000 | close at the next beat regardless |
| `PLOTBREAK_ARC_KEEP_TURNS` | 12 | tail of the closed arc kept verbatim |

Set either limit to `0` to disable entirely. Read per call rather than at
import: as module constants they were fixed by whichever module imported the
file first, which made them untestable and made behaviour depend on import
order.

## Does arc two remember arc one?

The question the feature lives or dies on, so it was answered against a real
session rather than a fixture. Alexandre's 727-turn Uncounted run was replayed
through the closing path with arc 1 cut at turn 400 — where he actually was,
mid-story.

Every continuity fact checked for survived, and a lot that was not:

- **Aldebarant Quist**, Amaryllis's missing father, took the player and
  **Gladys** in from the slums of Amourantis **1,700 years earlier**; Gladys
  died of an illness neither could cure.
- Crate 17-B's contents, the temporal opening beneath Amourantis, the sealed
  copies, and the agreement not to cross.
- The Gilt Yard episode: ~619kg stone, arrhythmia, collapse, the berserker.
- Bett's forged Ninth papers at eleven silver, Odelia Venn, the unidentified
  woman in the green coat.
- The house rules the couple signed: consent, transparency, the right to leave.

And the one that settled it — at turn 400 it filed marriage under `open`:

> *Le désir de mariage existe entre Alexandre et Amaryllis, mais aucun
> engagement officiel n'a été décidé.*

In the real run that thread paid off at turn 698. Arc 2 would have been able to
pull it.

**Compression:** 193,677 tokens of transcript became ~2,200, plus 12 turns kept
verbatim. Context fell from ~203k to ~18k, and a Quick turn from $0.0143 to
$0.0009 — 15x, and back under the step. The closing call itself reads scene
summaries rather than transcript: ~8K tokens, about half a cent, and it runs
after the turn is committed so the player never waits for it.
