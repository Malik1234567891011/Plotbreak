# Cover regeneration v4 — titled, OOC-style (2026-09-13)

Omar put the OOC app's shelf next to ours: theirs have the title drawn into the
art as a bespoke logo and read as polished light-novel / seasonal-anime key
visuals. Ours (v3, `plotbreak-cover-v3-anime`) carry no wordmark and look
flatter. Direction: regenerate every cover in the catalog to match OOC.

## Recipe (what produced the approved sample)

- **Model:** Dare MCP → `gpt-image-2`, aspect `2:3`, 1024×1536. 4 credits each,
  25 stories = ~100 credits (balance 1102 on 2026-09-13).
- **Prompt is built from the story text, not the title.** Sources, per story:
  `premise`, `hook`, `fantasyLabel`, `rules.toneGuide`, the first 2–3
  characters with `appearance` + `visualHook` + `silhouette` + `cardBlurb`,
  and the starting location's `artDirection`. Where a `coverDirection` exists
  (Itachi, Pink Tide, Ace, Light) fold it in. Bibles in `docs/story-bibles/`
  for extra detail.
- **Prompt skeleton:**
  1. Style: "Anime light-novel / mobile-game cover illustration, portrait 2:3,
     premium polished Japanese anime key visual quality… glossy detailed
     digital anime painting, clean lineart, luminous eyes, rim light. Not
     flat, not sketchy, not western cartoon."
  2. Title: "THE TITLE IS PART OF THE ART. Render the words "<TITLE>" as a
     bespoke stylized logo… <genre-specific lettering>… lower third, large,
     perfectly legible, spelled exactly "<TITLE>". No other text anywhere."
  3. Scene from the premise (2–3 sentences, concrete).
  4. Characters, large in frame (≥3/4 of the cover, cropped by edges), each
     with the fixture's visual hook, expression tied to their cardBlurb.
  5. Mood + colour key from toneGuide; "faces read at thumbnail size".
  6. Appeal line + minors rule (from `CAST_APPEAL`); no watermark / extra text.
- First sample: The Ninth Archive, generation `3JGHJLBoJi2vm4xub6gwwlmuVvF`,
  saved to scratchpad as `ninth-archive-cover-v4.png`. Awaiting Omar's verdict.

## Wiring once approved

1. Download PNG → `infra/seed/assets/<storyId>/cover.png`, then
   `npx tsx infra/scripts/optimize-art.ts` → `cover.webp` (PNG is gitignored).
2. `manifest.json` entry `<storyId>/cover`: `styleVersion` →
   `plotbreak-cover-v4-titled` so `generate-art.ts` never redraws it under v3.
3. Bump `COVER_DIRECTION_VERSION` only if `coverPrompt` is updated to match;
   otherwise leave code alone and set manifest by hand.
4. Bump `MEDIA_EPOCH` on Railway to cache-bust; verify
   `curl -I https://<domain>/media/story_ninth_archive/cover.webp`.
5. Localised titles: the title is baked into the art now, so a French shelf
   needs its own cover or the English art. Decide before doing `fr/`.

## Model comparison (Ninth Archive, 2026-09-13)

Files in `docs/covers-v4/story_ninth_archive/`.

| Model | EN result | FR title swap (reference edit) |
|---|---|---|
| gpt-image-2 | dramatic, but title glyphs wobble ("ARCHiVE") | redrew the whole image, not a faithful swap |
| nano-banana-2 | clean lettering, faces read western/semi-real | **perfect**: identical art, correct È |
| seedream-5-pro | **most anime**, clean metallic title | n/a (Seedream not used as editor) |
| seedream v2 (harder "TV anime key visual" prompt) | flatter cel look, bob-haired Mira, cleanest title | — |

**Recipe going forward:** EN art with `seedream-5-pro` (2k, 2:3). FR by
`nano-banana-2` with the EN output as `referenceStorageKeys`, prompt = "identical,
replace title with '<FR TITLE>'". 8 credits per story, ~200 for the catalog.

French titles are not in the fr fixtures (titles stay English in-app), so FR
cover titles are translated by hand per story; record them in this doc.

## Wiring done (2026-09-13, verified against a local API)

- `localizeStory` rewrites `coverImage` to `<key>.<locale>` for any non-English
  locale with an overlay. `/media/*` serves `cover.fr.webp` and falls back to
  `cover.webp` when the localised file is missing (checked: en 200, fr 200
  different bytes, de 200 = English bytes). `/v1/discover` under
  `Accept-Language: fr` returns `story_x/cover.fr?v=1`.
- `COVER_DIRECTION_VERSION` → `plotbreak-cover-v4-titled`; the manifest entry
  is stamped by `infra/scripts/install-covers-v4.ts`, so `generate-art.ts`
  treats installed v4 covers as current and never redraws them.
- `install-covers-v4.ts` copies `docs/covers-v4/<storyId>/{en,fr}.png` into
  `infra/seed/assets/<storyId>/cover{,.fr}.{png,webp}` (900px webp, q82).
- `optimize-art.ts` width table matches `cover.fr` as a cover.
- Tests: `localize.spec` structural test now pins `keyArt` instead of the cover;
  new test asserts the `.fr` cover key. `npm run typecheck` clean.

**Open decision:** `localize.spec` "the title never travels, because the cover
art carries it" — that reason is gone now covers exist per locale. The French
title drawn on each FR cover should become the fixture `title` in `fr/*.fr.ts`
or the shelf shows two names for one thing. Titles chosen per story are in
`docs/covers-v4/<storyId>/README.md`.

## Done (2026-09-13, ~07:20)

All 25 covers installed EN + FR (`infra/seed/assets/<story>/cover{,.fr}.webp`),
contact sheets at `docs/covers-v4/contact-sheet-{en,fr}.jpg`. Dare balance
1102 → 353. Seedream refused Ace and Itachi (franchise likeness); Ace is
nano-banana-2, Itachi is gpt-image-2, same prompt. Blank Prophecy had a stray
sign board, removed by an edit pass. PNG masters are gitignored under
`docs/covers-v4/**/*.png`; READMEs, briefs and sheets are tracked.

French titles painted on the covers (candidates for the `fr/*.fr.ts` `title`):
Ace · Blackwake · La Prophétie Blanche · La Quatrième Bête · Bonjour, Mon Mari ·
La Maison du Silence · Itachi · Les Cinq Derniers · Dernier Service · Light ·
Neuf Semaines · La Neuvième Archive · Marée Rose · La Couronne Primale ·
Le Tatami Rouge · La Brigade de la Lune Rouge · La Route du Sel · Seconde Peau ·
Sept Jours avant Minuit · Sept Noms · Le Mur des Marées · Les Déliés ·
La Doublure · Fenêtre Sept · Trône Zéro.

Not done: commit; `MEDIA_EPOCH` bump on Railway; French fixture titles.
