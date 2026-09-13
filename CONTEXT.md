# Bounded-context experiment — `experiment/pure-context`

Branched from `experiment/llm-first-narrative` @ 4e6cb46.
`engine-fixes @ 5fb5824` and tag `pure-baseline-v1` are untouched.

## A. /responses migration — DONE

`packages/director/src/gateway/openai.ts` now has `#generateViaResponses`,
selected by `GenerateOptions.api === 'responses'`. Selectable per-call or by
env: `PLOTBREAK_PURE_API=responses|chat` (default `chat`).
`PLOTBREAK_PURE_COMPACT=<tokens>` sets the compaction threshold.
`/health` reports `pureApi` and `pureCompact` so an arm can never be silently wrong.

Deliberately behaviour-neutral: identical message array, identical trailing
schema instruction, `text.format: json_object` rather than a native
`json_schema`, because a server-enforced schema would change what the model
sees and stop this being a parity test.

### The /responses contract, measured not read

Docs were incomplete, so `infra/scripts/responses-probe{,2,3}.mjs` probe the
live API. What is actually true for `gpt-5.6-terra`:

- usage is `input_tokens`, `output_tokens`, `input_tokens_details.{cached_tokens,
  cache_write_tokens}`, `output_tokens_details.reasoning_tokens`.
  **`cache_write_tokens` exists only here** — Chat Completions never reported it.
- `text.format`: `json_object` works; `json_schema` works with `strict: false`
  and accepts open-ended `additionalProperties: true` records, which the Chat
  Completions strict subset rejects. Omitting `strict` is an error, not a default.
- `prompt_cache_key`, `prompt_cache_retention` ('24h'), `context_management:
  [{type:'compaction', compact_threshold}]`, `reasoning: {effort}` all accepted.
- roles `system` / `developer` / `assistant` / `user` all accepted in `input`.
- **`prompt_cache_breakpoint` is rejected: "Unknown parameter".** Tried at
  request level (modes auto/manual/enabled/true) and per-message. See C.

## B. Parity — PASS, gate cleared

Same 12-case fixed adversarial replay, same `gpt-5.6-terra`, arms differing only
in endpoint.

| | Chat Completions | Responses |
|---|---|---|
| input tokens | 130,117 | 130,878 |
| cached | 35,070 | 35,070 |
| cache writes | not reported | 92,374 |
| output | 10,491 | 11,571 |
| reasoning | 578 | 370 |
| median latency | 7,496 ms | 9,119 ms |

All 12 cases pass on both arms, read by hand rather than scored automatically
(the automated scorer was wrong on 3 of 9 criteria last time):
A gesture stays a gesture; B and C both travel; D produces real canon ("My
father was Gol D. Roger") rather than the undefined canon the engine gave;
F resolves the ambiguous reference to the buried box; G is a partial lift with
cost, not superhuman success; I and J both cost the player something; L keeps
the can with Sabo across the setup turn.

Responses is ~1.6 s/turn slower at this size. Recorded, not acted on.

## Recorded, deliberately not fixed (M/N/P)

- **Clock/display drift**: prose passes into morning while `timeDisplay` stays
  "Day 1 · 5:34 PM". Deterministic `worldMinute + 6` never reconciles with what
  the model writes.
- **POV drift to third person** on the delegation cases ("Ace turns away…",
  "around them"). Present on **both** arms — Chat drifts on E, Responses on D
  and E — so it is pre-existing Pure behaviour, not a migration regression.

## C. Explicit rolling cache breakpoints — NOT AVAILABLE

The parameter does not exist on this account/model. Automatic prefix caching is
the only mechanism, so the question becomes whether the *automatic* cached
prefix grows with the transcript.

It can in principle: `conversation()` renders history oldest-first and
append-only, and the volatile `rightNow` block plus the action sit after it, so
every earlier turn is a stable prefix. `cache_write_tokens` above proves the
cache is being extended rather than pinned. Whether it keeps up at 40/80/120
turns is what the long run measures.

## The actual root cause of the cost curve — prompt caching is prefix-of-request

The Phase 1 fix (moving volatile text out of the static prefix) raised the cache
from 0% to the static block and no further. Reproduced exactly by the harness:
cached pins at **7,014** — the CONSTITUTION plus the world brief — while input
climbs. Probes in `infra/scripts/cache-*.mjs` pin down why.

What does **not** explain it:

| tried | result |
|---|---|
| message granularity (one message vs split vs one per turn) | identical, all pin at the static block |
| per-turn growth of 55 vs 1,200 tokens | identical |
| 30 s between calls | identical |
| dropping `prompt_cache_key` | identical |

What does. Two shapes, same content, same model:

```
pure append, no volatile tail        rebuilt rolling message (what Pure does today)
 t1 cached=4009  write=1275           t1 cached=4009  uncached=55
 t2 cached=5284  write=1275           t2 cached=4009  uncached=1090
 t3 cached=6559  write=1275           t3 cached=4009  uncached=2125
 t4 cached=7834  write=1275           t4 cached=4009  uncached=3160
```

**The cache matches the longest previous request that is an exact prefix of the
current one.** Not a textual prefix — a request prefix. An identical request
resent hits fully (12,484 of 12,487). A request that merely *contains* the last
one's text as a substring hits only the static block, because no previous
request is a prefix of it.

Pure rebuilds one rolling user message every turn — history, then `## Right
now`, then the action, then the standing instruction — so no previous request is
ever a prefix of the next. Every turn pays for the whole transcript again. That
is the O(n²) curve, and it is a prompt-assembly bug, not a context-size problem.

### The fix, measured

Same content, re-homed into an append-only conversation: static instructions
once, then `[user(volatile + action), assistant(beat)]` appended and never
rewritten.

```
append-only          rebuilt (today)
 t1 uncached=49       t1 uncached=55
 t2 uncached=1080     t2 uncached=1090
 t3 uncached=1080     t3 uncached=2125
 t4 uncached=1080     t4 uncached=3160
 t5 uncached=1080     t5 uncached=4195
 t6 uncached=1080     t6 uncached=5230
```

**Flat marginal cost, which is the success criterion in J/K, and it is available
without compaction, without memory, and without dropping any history.**

Two things must change for a request to stay a strict extension of the last:

1. The volatile `## Right now` block is written into that turn's user message and
   **left in history verbatim** rather than recomputed at the tail.
2. The trailing schema instruction must stop being a trailing message — it sits
   after the newest user message, so next turn that slot holds the assistant beat
   instead and the prefix breaks. It moves out of the message array entirely,
   into `text.format: json_schema` (strict:false, verified to accept our
   open-ended records).

Compaction is therefore not the lever it looked like. It is still needed
eventually — for the model's context window, not for the bill — and the
measurements below say when.
