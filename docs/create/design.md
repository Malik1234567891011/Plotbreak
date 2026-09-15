# Create mode — design

Branch `create-mode`. Read `ooc-teardown.md` first; this document is the answer
to it.

## The one decision everything follows from

OOC's story is **one 6,000-character prose blob plus a keyword lorebook**. Ours
is a **typed world model**: `hardCanon[]`, `cast[]` with
hiddenDrives/values/boundaries/secrets/voiceSamples, `places[]`, `factions[]`,
`quests[]`, `worldEvents[]`, `archetypes[]`, `endings[]`, `questItems[]`. The
relaunch narrator reads exactly those fields in `worldBrief()`, and the reason
the relaunch prose got good is that they are *all* populated.

A creator will not fill that in by hand. So:

> **The creator writes a pitch. The model compiles it into our typed story.
> The creator then edits the compiled result.**

Auto-generate is not a convenience button here the way it is for OOC. It is the
primary input path. A person types four sentences and gets a playable world;
everything after that is refinement.

This is also why we do not need OOC's Keyword Book. A lorebook exists to keep a
6,000-char blob out of the context window. Our world brief is already selective
and already caches as a static prefix. Skipping it costs a creator nothing and
saves us a retrieval system.

## Where it lives

A **fourth bottom tab, `Create`**, between Library and Badges.

`CreateScreen` currently exists as a "coming soon" sheet reached from Profile
(`SheetRoute.create`). It gets replaced, and the sheet route is retired.

## Screen 1 — the creator dashboard (tab root)

Straight from OOC's `My Titles`, minus the parts that need a community:

- Filter chips: **All · Drafts · Published** (their `All / Story / Character /
  Unregistered` collapses to this once we drop character creation).
- Cards: cover, title, a `Draft`/`Public`/`Link only`/`Private` badge, and
  **plays · likes · comments** — the numbers are already in `story_signals` and
  already projected into `StorySummary`.
- A circular **`+`** button bottom-right.
- Empty state sells the pitch box rather than apologising.

The vanity metrics are the creator retention loop. They are free for us.

## Screen 2 — the pitch (what `+` opens)

One screen, one big field.

- **"What's your story?"** — 0/1500, placeholder shows the shape of a good
  pitch. This is the only required input in the whole product.
- Optional: a working title.
- Three chip rows that steer the compile: **tone**, **length**, **who you play**
  (named character vs. yourself).
- Button: **Build my story.**

Then a progress screen while the compiler runs (~30–60s), and we land in the
stepper on step 1 with everything already filled in.

A creator can also skip the pitch and start empty — the stepper works either
way — but the default path is the pitch.

## Screen 3 — the stepper

Header: `‹` · title · 💾 Save · **Publish**. Horizontal scrollable stepper,
`*` = required to publish. Persistent footer: **Preview ›** and
`Previous`/`Next`. Every long field carries an **Auto-generate** button that
rewrites just that field, in context, from everything else in the draft.

| # | Step | Fields | Maps to |
|---|---|---|---|
| 1 | **Profile*** | cover art direction, title (2–50), fantasy label (≤42), one-line hook | `title`, `coverDirection`, `fantasyLabel`, `hook` |
| 2 | **World*** | premise (120–240 words), tone guide, hard canon list, intensity, content descriptors | `premise`, `rules.toneGuide`, `rules.hardCanon[]`, `intensity`, `contentDescriptors[]` |
| 3 | **Cast*** | per character: name, called-name, role, card blurb, looks, speech, behaviour, traits, values, wants, fears, will-not, underneath, keeps-back, voice samples | `characters[]` |
| 4 | **Places*** | name + description each | `locations[]` |
| 5 | **Opening*** | who the player is (named / they name themselves), origins (archetypes), opening prose (50–150 words), up to 3 opening suggestions, play guide | `protagonist`, `archetypes[]`, `opening`, `openingSuggestions[]`, `rules.playGuide` |
| 6 | **Pressure** | factions, threads (quests), things the world can do (world events), objects the story turns on (quest items) | `factions[]`, `quests[]`, `worldEvents[]`, `items[]` |
| 7 | **Endings** | name, rarity, earliest turn, condition, epilogue, hint | `endings[]` |
| 8 | **Publish*** | store description, tags/genre, mechanics chips, recommended tier, visibility | `StorySummary` fields, `stories.status` |

### What we took from OOC step by step

- **Starting scenarios** → our `archetypes[]` already are this: multiple player
  origins that change the opening. We do not need a second mechanism, and
  scoping stats/media/endings per scenario (their `Max 7 per start setting`)
  is complexity we do not need in v1.
- **Plot Examples** → `rules.styleExamples[]`, up to 3. Few-shot prose samples.
  Cheapest possible voice control and we did not have it.
- **Play Guide** → `rules.playGuide`. Player-visible, never sent to the model.
  Free, and genuinely useful.
- **Stats** → we already have `resources[]` with behaviour *bands*, which is
  strictly better than OOC's number-with-a-noun. v1 exposes it as
  "**Meters**": name, range, and what the world is like when it is low/high.
- **Endings as rarity cards** → kept, in full. `EndingDef` grows `rarity`,
  `earliestTurn`, `epilogue` and `hint`. This is the replay loop and it is
  the single best idea in their product.
- **Recommended Mode** → maps onto our four real generation profiles
  (Quick/Vivid/Cinematic/Apex). The creator says how the story is *meant* to be
  played; the player still chooses and pays.
- **Visibility Public/Private/Link Only** → `stories.status` already has
  `PUBLISHED` / `DRAFT` / `UNLISTED`. Link-only is `UNLISTED`.

### What we deliberately dropped

- Character creation (the other half of their `My Titles`).
- Keyword Book — see above.
- Slash commands and the Hub — needs a community that does not exist yet.
- Creator image uploads — our art is a generated pipeline, and an arbitrary
  upload path is a moderation liability. Creators choose an art *direction*;
  we render it.
- Version history in the editor.
- **All 18+ / NSFW affordances.** Not an age toggle we hide — a branch we never
  build. `contentDescriptors` stays the existing all-ages enum and the publish
  gate rejects anything that asks for more.

## Publish gate

A draft becomes a `StoryVersion` only when it passes `readyToPublish()`:

1. title 2–50, fantasy label ≤42, hook non-empty
2. premise ≥ 60 words
3. tone guide non-empty
4. ≥ 2 cast members, each with a role and a card blurb
5. ≥ 1 location
6. opening 30–400 words
7. ≥ 1 ending
8. a protagonist that is either NAMED with a description or PLAYER_NAMED
9. every id referenced (archetype abilities, ending characters) resolves
10. the compiled object parses against `StoryVersion` — this is the real gate,
    and it is the reason the contract stays authoritative

Failures come back as a per-step list so the stepper can mark the steps red.

## Safety

- Every model call in the compiler runs the same house safety policy as the
  narrator, and the compiler refuses pitches it will not build. A refusal is a
  first-class response, not an error.
- Published user stories start `IN_REVIEW`-eligible: for v1 they publish
  straight to `UNLISTED`/`PUBLISHED` by the creator's choice, and `/v1/reports`
  already exists for takedown. Discover shows official stories first; a
  user story reaches Discover only through the existing ranking path.
- No image uploads, so no image moderation surface.

## API

```
GET    /v1/create/titles                 my stories: drafts + published, with counts
POST   /v1/create/drafts                 new empty draft            -> { draft }
POST   /v1/create/drafts/:id/compile     { pitch, tone, length, pov } -> { draft }  (model)
PATCH  /v1/create/drafts/:id             partial update             -> { draft }
POST   /v1/create/drafts/:id/assist      { field, path? }           -> { value }   (model)
GET    /v1/create/drafts/:id             -> { draft, readiness }
DELETE /v1/create/drafts/:id
POST   /v1/create/drafts/:id/publish     { visibility }             -> { storyId, storyVersionId }
POST   /v1/create/stories/:id/visibility { visibility }
```

Compile and assist are the only ones that cost money. They are charged to the
same credit wallet as a turn.

## Cost

Compile is one large structured call — the full world in one response. Measured
against the relaunch profiles this is a Cinematic-sized generation, and it
produces an asset the creator can play forever, so it is priced like one:
**120 credits to compile, 15 credits per assist**. Both are free while the
feature is behind the `PLOTBREAK_CREATE` flag.
