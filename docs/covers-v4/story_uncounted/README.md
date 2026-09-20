# UNCOUNTED — cover v4 (concept)

- EN title: UNCOUNTED
- FR title: SANS NOMBRE
- EN: drawn by `infra/scripts/draw-concept-cover.ts` from `prompt-en.txt`, 2:3.
  Lettering read back and verified on the first attempt: `"UNCOUNTED"`.
- FR: **not drawn yet.** Once the world has a fixture and a French overlay, the
  French cover is the same picture re-lettered — `coverTitleSwapPrompt` with
  `from="UNCOUNTED"`, `to="SANS NOMBRE"`, per the recipe.
- Status: **concept.** There is a bible (`docs/story-bibles/13_UNCOUNTED.md`)
  and this cover. There is no fixture, so this world is not in the catalogue and
  `install-covers-v4.ts` has nothing to install it against yet.
- Files: the master `en.png` is local only (`.gitignore` excludes
  `docs/covers-v4/**/*.png`); the shipped derivative is committed at
  `infra/seed/assets/story_uncounted/cover.webp`. Redraw with:

      npx tsx infra/scripts/draw-concept-cover.ts \\
        --story=story_uncounted --prompt=docs/covers-v4/story_uncounted/prompt-en.txt \\
        --title=UNCOUNTED

## What is in the frame

Left, cropped by the edge and closest to the viewer: **Tsukasa**, black cloak,
white streak at the left temple, violet eyes on the viewer rather than on the
other man. Centre, behind and softer: **Rill**, mid-laugh, healer's coat open,
the light going through her edge. Right: **Aurelian**, the smile, one hand in
the ruff of **Grace**, who fills the lower right corner.

Gold on the right, violet and black on the left, meeting in the middle where
she is standing. That split is the whole story and it is the reason the
composition is worth keeping if the cover is ever redrawn.
