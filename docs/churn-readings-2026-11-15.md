# Why engaged players don't come back: 22 runs read (2026-11-15)

Sample: 22 random new players (first played Oct 24 – Nov 8) who played 10–39 turns on day one and never
returned. Read turns 1–2 and the last four turns of their longest run. Raw dump was in the session
scratchpad (`churned.txt`); query is reproducible from the stats recipe.

## What the last beats looked like

| Pattern | Runs | Examples |
|---|---|---|
| Storyteller said **no** to what the player wanted, often with a lecture, right before they quit | ~9 | Second Skin: romance, address, leap after Kaia all refused ("That is a terrible plan", "There is no trail to catch... What arrives is gravity"). GMH ×3: Hana refuses, then nags ("you keep answering with your body", "you don't get to turn this into sex"); player: "Im good please stop", then quit. Player's invented friends Cole/Jay/Zane all "not in service / nobody there". Pink Tide: Sora + Celeste lecture on consent ("not how consent works in any species"). Zero Throne: "Vesper Zero is not four metres tall", "does not sink ships". User story: clothing change blocked, "cannot simply place you in another kingdom". Red Floor: "There is no ring of men". Proposal to Mara declined. |
| Story fine, slow procedural stretch, player drifted off mid-thread | ~11 | Hush House ×2, Ark user stories ×3 ("I inspect the pressure-door warnings before leaving"), Second Skin 35-turn run ("I spend the day resting"), Itachi, Ace, Light, Pink Tide shed. Mostly tapping suggestions: inspect / ask / follow. |
| Story resolved itself | 1 | Last Feather: romance completed, wake up together. Nothing left pulling forward. |

## Read

1. The single clearest fixable cause: the narrator corrects and refuses players' fantasies. Explicit
   content has to stay faded, but the refusals come with moralising and characters repeating demands.
   Harmless wishes (a phone number, a stronger mech, a crowd, a friend) get denied for realism.
2. Many runs stall in investigation loops where the player taps "inspect/ask" suggestions and nothing big
   happens for several beats.
3. No run ends on a pull-back hook. Runs stop wherever the phone goes down.

## Candidate fixes (server-side unless noted)

- Narrator rule: "yes, and" for harmless player inventions. Fade explicit content without lecturing.
  Characters never repeat a boundary or demand after it's been made once.
- Pacing rule: a real turn of events (reveal, threat, payoff) at least every ~4 beats; suggestions must
  include one bold option, not only inspect/ask.
- Cliffhanger return hook: push notification from the lead character when a run is left mid-scene (needs app work).
