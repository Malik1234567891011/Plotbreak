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

---

# Results — the context experiment

Four arms, same `gpt-5.6-terra`, same fixed 160-turn player script
(`infra/scripts/context-script.ts`) so no arm is playing a different story.
All four ran until **the OpenAI balance was exhausted**: append reached 73 turns,
cache 49, auto 45, full 40 (complete). The curves separate long before that, but
the 120- and 160-turn checkpoints in J/K are projections, not measurements, and
are labelled as such.

Reproduce with `npm run context-run -- --arm=append --turns=160` and
`node infra/scripts/context-report.mjs`.

## 1. The headline

Uncached input per turn — the only number that grows:

| turn | append | today (cache) | auto (compaction flag) | full (no key) |
|---|---|---|---|---|
| 2 | 554 | 854 | 1,156 | — |
| 10 | **294** | 4,540 | 1,822 | 4,736 |
| 20 | **433** | 9,303 | 2,280 | — |
| 30 | **331** | 14,504 | 914 | — |
| 40 | **293** | 18,527 | 1,387 | 18,363 |
| 45 | **311** | 20,551 | 963 | — |
| 60 | **352** | — | — | — |
| 73 | **378** | — | — | — |

Append is flat from turn 10 to turn 73: mean 342 over the last twenty turns,
never above 440 on average. Today's architecture grows 421 tokens/turn, forever.

## 2. What changed to get it

Nothing about the story, the prompt's content, the model, or the amount of
history. The same text, sent as a conversation that only ever grows:

- static header (constitution + how-to + world + schema) → sent once, cached
- then `[user: right-now + action]`, `[assistant: the beat]` appended per turn
- nothing after the newest user message, ever

Three things had to move for that to hold, all in
`packages/director/src/pure/narrator.ts` and `gateway/openai.ts`:

1. the transcript stopped being re-concatenated into one rolling user message
2. the standing instruction moved from the tail into the static header
3. the JSON-schema instruction moved into the header too, alongside
   `text.format: json_schema` — a trailing message occupies the slot next
   turn's assistant beat needs

## 3. Quality did not move

Probes at RECENT and MEDIUM depth (facts planted at turns 3/5/7, asked again at
turns 10/12/40/42/44), read by hand on both arms:

| probe | depth | append | today |
|---|---|---|---|
| exact contents of the can (4,100 berries) | 37 turns | correct | correct |
| the carving (three lines, circled) | 37 turns | correct, and exact — "three straight lines, circled rough and hard" | correct, referenced obliquely |
| the mother's name (Portgas D. Rouge) | 37 turns | correct, and treats it as a confidence | correct |

Append is holding the *whole* transcript — it drops nothing — so this is the
expected result. It is recorded because the opposite would have killed the idea.

Median latency also improved: **append 6,330 ms**, cache 9,774 ms, auto 10,829 ms.

## 4. Compaction is not the lever

Measured (E), not assumed:

- The compacting call bills **more**, never less: 10,877 input vs 10,459 for the
  same request uncompacted, plus ~420 reasoning tokens to write the summary.
- The saving only exists if the artifact is carried forward. Replaying it
  statelessly in place of the history cuts input 10,459 → 3,360, a 68% drop.
  The artifact is `{id, type, encrypted_content}`, ~8 KB, opaque — storing it is
  not custom memory, but it is also not inspectable, so what it kept cannot be
  audited.
- Neither compaction arm ever reached its 40k threshold inside the turns the
  balance allowed, so **auto's numbers are not a compaction result**.

Which exposes a genuine surprise: `auto` differs from `cache` only by *sending*
`context_management`, never by compacting — and its cached prefix grows
(6,514 → 29,042) where `cache` pins at 7,014. Sending the parameter changes how
the request is cached. Useful, and not something to rely on until it is
understood; append beats it 4× regardless.

Compaction remains necessary eventually — for the model's context window, not
the bill. At append's ~390 tokens/turn of context growth, a session reaches
100k around turn 250.

## 5. Credit economics (L)

60 credits/turn; $20 = 21,000 credits = 350 turns ⇒ **$0.05714 gross per turn**.

Prices assumed: $1.25/M input, $10/M output, cached input at 10%. **This is the
one input that is not measured** — the account exposes no price for these models.

| | measured $/turn | 10 free turns | 350-turn pack |
|---|---|---|---|
| append | $0.0080 | $0.077 | $2.79 against $20 |
| today | $0.0234 | $0.119 | $8.21 against $20 |

Averages understate it, because today's cost is a ramp. Per-turn at depth:

| turn | append | today |
|---|---|---|
| 80 | $0.0095 (83% margin) | $0.0517 (10% margin) |
| 120 | $0.0113 (80%) | $0.0727 (**−27%**) |
| 160 | $0.0130 (77%) | $0.0937 (**−64%**) |

**Today's architecture goes gross-margin-negative at about turn 90** — a long
session costs more than the player paid for it. Append does not, at any depth
measured or projected.

Honest caveat: append and today send nearly identical *total* input tokens; the
entire saving is the cache discount. If cached tokens were billed at full price
the two would cost the same. Confirm the discount before treating the margin as
banked.

## 6. Still open

- The 120/160-turn checkpoints are projections. Rerunning needs OpenAI credit.
- `append` is implemented in `narratePure`/`runTurnPure` and exercised by the
  harness. **It is not wired into the API turn path**: the product would need to
  store each turn's rendered `{user, assistant}` pair verbatim, because
  byte-identical replay is what the cache match depends on. That is one column,
  not a memory system.
- POV drift to third person and the clock/`timeDisplay` drift are both unfixed
  and both pre-existing (M/N/P).
