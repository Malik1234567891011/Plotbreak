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
