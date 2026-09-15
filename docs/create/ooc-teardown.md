# OOC teardown — the creation product, screen by screen

Source: 25 screenshots the founder captured from the OOC iOS app
(`~/Desktop/oocSS/IMG_7502–7526`, 2026-09-14). Everything below is observed,
not inferred, unless marked **[inference]**.

## 1. Where creation lives

Bottom tab bar: **Home · History · My Titles · MY**.

- `History` is their Library (played sessions).
- `My Titles` is the creator surface. Ours becomes **Create**.
- `MY` is the account tab.

### My Titles (the creator dashboard)

- Filter chips: `All` / `Story` / `Character` / `Unregistered`.
  - So OOC creators make **two kinds of thing**: a Story and a Character.
  - `Unregistered` = saved drafts that were never published.
- Two sort dropdowns (`All`, `Latest`).
- Each card shows a thumbnail, the title, a `Public` badge, a `Story` badge,
  and three counters: 💬 plays · 👍 likes · 💭 comments.
- White circular **`+` FAB** bottom-right opens the creator.

The dashboard is a *portfolio with vanity metrics*. That is the retention hook
for creators: you come back to see your numbers move.

## 2. The editor shell

Header: `‹` back · title (**"Story"**) · `(?)` help · 💾 save · 🕘 version
history · **Publish** (white pill, always visible).

Horizontal **stepper** across the top, scrollable, `*` = required:

```
Profile*  ›  Basic Settings*  ›  Intro*  ›  Stat  ›  Media  ›  Keyword Book  ›  Slash Command  ›  Endings  ›  Publish*
```

Persistent footer on every step:
- a full-width row `Check the story preview you are creating ›`
- `Previous` / `Next` buttons.

Three things to steal outright:
1. **Save and Publish are separate and both always reachable.** You can bail at
   any step and the draft survives (that is what `Unregistered` is).
2. **A version-history button in the header.** Creation is iterative; they let
   you roll back.
3. **A live preview entry point pinned to the bottom of every step.**

## 3. Step: Profile*

- **Title Image** — upload, ≤5MB. Inline warning: "Inappropriate image is not
  allowed."
- **Story Name** — 2–50 chars.
- **One-line introduction** — 0/50.

Minimum viable identity. Three fields.

## 4. Step: Basic Settings*

- **Prompt Template** dropdown, default `✦ Default Prompt`.
  **[inference]** a swappable system-prompt preset — genre/system presets.
- **Story Details** — 0/**6000**, with a yellow **Auto-generate** button.
- **Advanced Settings** (collapsed expander):
  - **Plot Examples** — up to 3, each with its own Auto-generate, plus
    `Add example +`.

`Story Details` at 6,000 chars is the whole world bible in one textarea. This is
where OOC differs most from us: we have a *structured* story model (cast,
places, factions, quests, hardCanon, archetypes). They have one giant prose
field and let the model sort it out.

**Plot Examples** are few-shot samples of the prose style/beat shape. We do not
have this and it is cheap to add — it is the single highest-leverage knob a
creator has over voice.

## 5. Step: Intro*

- Scenario chips at top: `Default` · `+ Add`.
  Banner: "Set different starting scenarios for your story. Users can choose how
  the story begins."
- **Prologue*** — 0/2000, Auto-generate. Hint: "(Image codes apply based on the
  first starting scenario.)"
- **Starting Scenario Name*** — 0/25 (defaults to "Default").
- **Opening Scene** — 0/2000. Placeholder: "User roles, relationships with
  characters, and the world in which the story begins."
- **Advanced Settings** expander:
  - **Play Guide** — 0/1000. "This message is only visible to the user and will
    not affect the AI."
  - **Response Suggestions** — up to 3, each 0/400, `Add Suggestions`.

**Starting scenarios are the core replayability primitive.** One story ships N
entry points, and *Stat, Media, Keyword Book and Endings are all scoped per
starting scenario* ("Max 7 per start setting", "Up to 50 per starting setting",
"Up to 10 per starting situation"). A scenario is effectively a whole variant of
the story that shares the profile and world bible.

`Play Guide` is a lovely detail: creator-to-player out-of-band text that never
reaches the model.

## 6. Step: Stat

"Set custom stats for your story. **Max 7 per start setting.**"

Per stat:
- **Name*** — 0/20, e.g. "Affinity, HP, Combat Power, IQ"
- **Icon*** and **Color*** dropdowns
- **Min / Max / Default*** — range −99,999…99,999, default must be in range
- **Unit** — 0/6, e.g. "points, rank, ea, %"
- **Stat Description*** — 0/1000, Auto-generate. Placeholder shows the format:
  ```
  Increases when {user} gives snacks.
  Decreases when {char} is alone.
  Increases when {user} shows affection.
  ```
- **Levels** — "Create a story with multiple branching paths based on level."
  `+ Add Level`
- Footer: `Add stat (1/7) +`

This is the mechanic that turns chat into a *game*. Note how it works: the stat
delta is **decided by the model from a natural-language rule**, not by a
deterministic engine. `{user}` / `{char}` are template variables. Levels turn a
numeric stat into a gate for branching content.

## 7. Step: Media

**Scene Images** — "Upload images that match the scene, such as characters and
backgrounds. **(Up to 50 per starting setting)**"

- Chips: `All 0` / `Default 0` (again scoped per scenario)
- `Add Scene Image +`

Cross-referenced with the Intro hint "(Image codes apply based on the first
starting scenario.)" → each uploaded image gets an **image code** the model can
emit inline to display it. That is exactly our `heroImage` / reaction-asset
mechanism, except creator-supplied instead of pre-generated by us.

## 8. Step: Keyword Book

"Save world-building and extra details for your story. They'll be applied
automatically when relevant keywords appear."

- Chips `All 2` / `Default 2`
- Reorderable list of `Keyword Note N` rows with ✏️ / 🗑 / ⌄
- `Add Keyword Note +`

A classic **lorebook / keyword-triggered RAG**. Entries are injected into
context only when their trigger words show up. This is how they keep a huge
world bible from eating the context window every turn — and it is the direct
analogue of our `worldBrief` selection logic, but creator-authored.

## 9. Step: Slash Command

"Add commands you use often as slash commands to call them quickly. **Up to 20
per story.**" Plus a moderation line: "Slash commands that violate the
guidelines may be warned or removed."

`+ Add slash command` opens a menu:
- `New`
- `Import from my slash commands`
- `Import from the Hub`

**"the Hub"** is a shared, cross-story library of community slash commands.
That is a whole social layer on top of prompt macros. **[inference]** these are
saved player-side instructions ("/recap", "/describe the room", "/timeskip").

## 10. Step: Endings

"Set endings for each starting situation. **Only the first ending to meet its
conditions will be delivered. (Up to 10 per starting situation)**"

Per ending:
- **Ending image*** — ≤5MB, **Card size (1,005 × 1,490px)** → a 2:3 collectible
  card.
- **Ending name*** — 0/40 ("e.g. Minu's happy ending")
- **Ending Rarity*** — `N` / `R` / `SR` / `SSR`
- **Add Rule*** — "Once the turn count is reached and the conditions below are
  met, the ending is delivered. **(Minimum 10 turns, checked every 5 turns)**"
  - `Ending available at: [10 ⌄] from turn` · `+ Add rule`
- **Prompt*** — 0/1000. "Describe the detailed conditions used to determine this
  ending." Example is pure natural language, judged by the model.
- **Epilogue** — 0/2000, Auto-generate. "Your input is used as an example so AI
  can tailor the epilogue to the situation."
- **Ending hint** — 0/40. "Write a hint for creator settings to show users."
  e.g. "I hear a familiar sound from somewhere...!"
- Footer: `Add ending (1/10) +`

This is the most commercially interesting screen in the product. It is a
**gacha collection loop bolted onto interactive fiction**:

- endings are **cards** with **rarities**
- they are **missable** (first match wins, ordering matters)
- **hints** tease the ones you have not got
- the completion drive is what makes people replay a story 10 times

The engineering is cheap: a turn-count gate, a polling cadence (every 5 turns),
and a model-judged natural-language condition.

## 11. Step: Publish*

- **Story Description*** — 0/2000, "background, plot, and important details"
  (this is the *store listing* copy, distinct from the model-facing Story
  Details at 6,000)
- **Genre*** — dropdown
- **Target Audience*** — dropdown. "The story will be recommended to users based
  on your settings."
- **Recommended Mode*** — dropdown, showing `⚛ Superb`.
  → the creator picks the **model quality tier** the story is meant to be played
  at. We already have four real generation profiles; this is the missing link
  that connects a creator's intent to them.
- **Hashtags** — type-and-enter, up to 10
- **Age Restrictions*** — `Suitable for minors under 18` ✅ /
  `Not suitable for minors under 18` 🔞.
  "This setting cannot be changed later. Admin may re-evaluate the age
  settings." → **we exclude the 18+ branch entirely.**
- **Visibility** — `Public` / `Private` (default) / `Link Only`
- **Disable Comments** toggle

## 12. What we take, what we drop

### Take (in order of value per unit of work)

| OOC feature | Why | Plotbreak name |
|---|---|---|
| Draft-first with Save ≠ Publish, `Unregistered` filter | creators bail mid-flow constantly | draft status on `user_story` |
| Horizontal required/optional stepper + persistent preview | makes a 9-screen form feel finishable | `CreateStepper` |
| **Auto-generate on every long field** | the reason non-writers finish a story at all | `POST /create/assist` |
| Multiple **starting scenarios** | replayability; scopes everything else | `scenarios[]` |
| **Plot Examples** (≤3 few-shot samples) | strongest voice control per character typed | `styleExamples[]` |
| **Keyword Book** | keeps big worlds cheap per turn | `keywordNotes[]` |
| **Stats** with NL change-rules + levels | turns chat into a game | `stats[]` |
| **Endings as rarity cards** w/ turn gate + NL condition + hint | the collection/replay loop | `endings[]` |
| **Play Guide** (player-visible, model-invisible) | zero cost, real clarity | `playGuide` |
| Visibility Public/Private/Link-only | required to ship anything social | `visibility` |
| Creator dashboard with plays/likes/comments | creator retention | Create tab root |

### Drop for v1

- **Character** creation (the other half of `My Titles`) — story-only first.
- **The Hub** / importable slash commands — needs a community that does not
  exist yet.
- **Slash commands** at all — low value before the Hub.
- **Version history** — nice, not v1.
- **Comments** — no moderation stack.
- **18+ / age gating** — founder explicitly excluded NSFW. We ship
  all-ages only and do not render the choice.
- **Creator-uploaded images** — our art is a pre-generated pipeline and an
  arbitrary upload path is a moderation liability. v1 uses our existing
  generated art; creators pick an art *direction*, not files.

### The big structural difference

OOC's story is **one 6,000-char prose blob + a lorebook**. Ours is a **typed
world model** (`hardCanon`, `cast[]` with hiddenDrives/values/boundaries/
secrets, `places[]`, `factions[]`, `questItems[]`, `archetypes[]`, `endings[]`).

That is an advantage, not a burden — but only if the creator never has to fill
it in by hand. So the Plotbreak shape is:

> **the creator writes a pitch in prose; the model compiles it into our typed
> story object; the creator edits the compiled result in the stepper.**

Auto-generate is not a convenience button for us the way it is for OOC. It is
the primary input path.

## 13. Note on web research

`ooc.ai` serves a client-rendered shell with no server-side content, so
`WebFetch` returns nothing but the string "OOC" for `/` and `/en/about`, and
this session's web-search budget (200 calls) was already exhausted earlier in
the day. Everything in this document therefore comes from the 25 in-app
screenshots, which is the better primary source anyway — it is the shipped
product rather than marketing copy. If we want competitive numbers (funding,
DAU, pricing) later, that is a separate pass with a fresh search budget.
