# What the first real compiles showed

Three pitches, deliberately written the way a creator writes one — three or
four vague sentences — compiled through the live model and then played for ten
turns each. Transcripts are in `transcripts/`.

| pitch | locale | compile | ready | turns | failures |
|---|---|---|---|---|---|
| lighthouse (two sisters, a missing eleven minutes) | fr | 118s | yes | 10 | 0 |
| dojo (a kendo club, four months to nationals) | en | 102s | yes | 10 | 0 |
| heist (Paris 1908, one more door) | en | 96s | yes | 10 | 0 |

## The verdict

The worlds are good. Better than good: the lighthouse compile produced ten hard
canon facts, six characters each with private drives and withheld secrets, six
places, six threads, seven quest objects and six endings laddered COMMON →
UNIQUE from turn 30 to turn 75 — out of thirty-eight words of pitch. The dojo
one invented a town whose graduates come back, a leaking assembly hall a
redevelopment committee wants cleared, and a treasurer who sold her
grandfather's watch to cover the registration fee.

Played, they hold. The cast stays in character, the suggestions are specific
and in the player's voice, and nothing in ten turns read as generated.

## Four defects the first run found, all fixed

**1. The second call drifted into another language.** The lighthouse compile
produced an English spine and then a cast, four factions, six threads, six
world events, seven objects and six endings entirely in French. Both calls read
"write in the language the pitch is written in" and decided differently. Fixed
by naming the language instead of inferring it: the route resolves the
creator's locale once and both calls are told, in the same words, in capitals.
Tested at `compile.spec.ts` — the assertion is on *both* prompts.

**2. Fields were cut through the middle of words.** `slice()` produced origin
roles like "A person bound to Blackwater by inherita", playstyle tags like
"choosing what the lamp i", and ending hints like "each offer part of ". Fixed
twice over: every cap is now stated in the field's own description so the model
aims at it, and `clip()` cuts at the last word boundary when it overruns
anyway.

**3. The fantasy label came back as a genre.** "Winter Gothic Mystery" where
the field wants "Keep the lamp lit, or keep your sister". The description now
says *never a genre label* and gives two examples.

**4. A thin pitch produced a thin premise.** The dojo's first compile wrote a
55-word premise against a 120-word floor, and the readiness gate correctly
refused to publish it. The lighthouse pitch, which had more in it, wrote 140.
So the spine instruction now carries an explicit pre-flight checklist —
*premise at least 120 words, count them; five canon facts; three places* — and
says out loud that a thin pitch is exactly when the world needs more invention,
not less. Re-ran: 102s, ready, 178-word premise.

Also raised the gateway timeout for these two calls. The 30-second default is
sized for a beat and was cutting a world off mid-cast every time.

## Two things still open

- **The time label is English in a French session.** Every French turn reads
  `Day 1 · morning`. This is `formatStoryTime` building from English literals
  and it predates Create — it is on `main` today, in every French session.
  Worth its own fix.
- **A compile is 100 seconds of silence.** Acceptable once, not pleasant. The
  two-call structure is already a natural progress bar (spine, then cast); the
  client should show it rather than a spinner.

## Cost

Measured across the six compiles run here: roughly 9–13k input and 6–9k output
tokens for the pair. On Terra that is about $0.10–0.13 a world. Priced at 180
credits, which is three Vivid turns, for an asset the creator plays forever.
