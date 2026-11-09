# Relics

Collectible items that drop from moments inside a story. Built 2026-11-08 for
two stories, **Pink Tide** and **Second Skin** (the two with the most players).
Behind a flag: nothing changes for any player until `PLOTBREAK_RELICS` is set.

## Why

1. **Retention.** A reason to come back that outlasts one session, with a
   collection that grows across runs. Most players leave inside five turns,
   so every story has a common-heavy moment in the first few turns: about 78%
   of players who reach it walk away with something.
2. **Game, not reading.** Loot, rarity and odds are what "RPG" means to most
   players. A drop is a reward for something the player *did* in the story.

## How a drop happens

The storyteller says what happened, and the server rolls the dice.

- Each story authors **moments**, such as "the player goes inside the sea cave".
  They live in `packages/contracts/src/game/relics.ts`.
- The storyteller gets the moment list as one cached system message, framed as
  bookkeeping it must never steer toward. It reports a moment's id in
  `momentIds` on the beat where it happens. This uses the same mechanism as
  `completedQuestIds`.
- The server (`services/api/src/relics.ts`) rolls the moment's table once per
  run. The model never sees items or odds, so it can't hand out a Mythic to be
  nice. And a relic always fits its scene, because the moment *is* the scene.
- Every roll is stored in `relic_rolls`, empty rolls included, so a moment can't
  be re-rolled by repeating it. Replaying the whole story can roll it again,
  which is the replay hook. Duplicates stack (×2).
- The drop arrives as a `relic.found` stream event. The app holds it 1.4 s so the
  beat lands first, then plays the reveal. Older clients ignore the event.

Checked with real model turns: the right moments fired on the right beats
("climbs into the pool with Sora", "puts a hand on the Heartstone"). Nothing
fired on ordinary turns, or on walking toward the shed before the bag was found.

## Rarity

Common, Rare, Epic, Legendary and Mythic. The percentage the Vault shows is the
roll chance once the moment happens. That's the honest number: whether you reach
the moment at all depends on how you play. Mythics hang off the hardest endings
(Paradise Saved, Twiceborn) and stay "???" until found.

## Art

There are 34 transparent item icons from `gpt-image-2.5-flare`, made once
rather than per drop, at about 7¢ each (about $2.40 total). A full catalog of
40 stories × about 17 items would be about $50, once.

- **Prompt:** the shared style prompt and generator are in
  `infra/scripts/relic-art.mjs`.
- **Per-item prompts:** each item's prompt is `artPrompt` in the catalog.
- **What's in the repo:** 512px WebP in `infra/seed/assets/relics/`.
- **Masters:** 1024px PNG masters in `~/plotbreak-relic-masters/`, kept out of
  git because they total 49MB.
- **Transparency is the point.** One image serves as the full-colour item, the
  locked silhouette (alpha-thresholded so the baked-in glow doesn't turn it into
  a blob), and the mask the foil shine is clipped to.

## Screens

- **Reveal** (`RelicRevealView`): the screen darkens and beams open in the
  rarity colour. Epic and above get a beat of pure colour before the item flips
  in, and haptics scale with rarity. It never lands on top of the
  notifications or review prompts; those wait until it closes.
- **Vault** (`RelicVaultScreen`): owned / total, a count per rarity, and a
  filter by story. Rarest is shown first. Locked relics show as silhouettes
  with their odds and timing.
- **Detail:** drag to tilt the item. Shows story, timing, chance, hint, and the
  flavour line once owned.
- **Profile:** a Vault card with four slots, your best finds and then the
  rarest locked shapes. Hidden while the flag is off, because `/v1/relics` 404s.

## Testing it

Locally, in the simulator. The API runs in memory with the real model:

```
PUBLIC_BASE_URL=http://localhost:4000 DATABASE_URL= APP_STORE_KEY_ID= SUPABASE_URL= \
SUPABASE_JWT_SECRET= MEDIA_CDN_BASE_URL= PLOTBREAK_RELICS=all PLOTBREAK_RELICS_ALWAYS=1 npm run api
```

- `PLOTBREAK_RELICS_ALWAYS=1` makes every reported moment drop *something*,
  still weighted by rarity. It's ignored in production.
- `PUBLIC_BASE_URL` matters because `.env` holds a stale LAN IP, and without
  it the art won't load.
- Build the app with `PLOTBREAK_SUPABASE_ANON_KEY=` so it runs as a local guest.

## Before this reaches players

1. Run migration `0015_relics.sql` on prod.
2. Upload `infra/seed/assets/relics/*.webp` to the media CDN.
3. Deploy the API. While `PLOTBREAK_RELICS` is unset, every prompt stays
   byte-identical. Set it to your user id to test on your phone against prod,
   then set it to `all`.
4. Ship an app build. The French strings are still English literals.
5. Watch the `relic_found` analytics event and the rate at which moments fire.
   If a moment never fires, its `when` is too strict; if it fires constantly,
   it's too loose.

## Not built yet: using relics

Collecting comes first. Recommended next step: **carry one relic into a new run
of the story it came from.** The storyteller gets one line, such as "the player
carries the Dive Watch, stopped at 23:40", and the world reacts: Sora recognises
the clip, and a Warden notices the snapped badge. That keeps items meaningful
without making them weapons. It's one prompt line at session start plus a
picker on the story screen.

Cross-story carrying, like angel wings in a boxing story, breaks the fiction.
Cosmetics (the hair prism, the beastmark iris) could later tint the player
portrait.
