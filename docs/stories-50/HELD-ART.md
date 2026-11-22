# New-50: art held out of the repo (2026-11-22)

PixAI ran out of credits partway through these stories. Their art was on disk under
`infra/seed/assets/<storyId>/` while the stories were still registered raw (no
`withDerivedAssetKeys`), so `catalog.spec` ("declares a cover if one has been generated") failed
and blocked the release of the other 37.

The art was paid for, so it was moved, not deleted. It was all untracked (checked with
`git ls-files` and `git status` before moving), and it now sits in
`.claude/held-art/<storyId>/`, which is untracked and survives between sessions. PNGs and webps
both moved.

| Story | Held folder | Files | Still missing (webp) |
|---|---|---|---|
| Affection 97 | `.claude/held-art/story_affection_97/` | 22 webp + 22 png | cover |
| Every Platform a World | `.claude/held-art/story_every_platform_a_world/` | 26 webp + 26 png | nothing |
| The Zombie Who Said Please | `.claude/held-art/story_the_zombie_who_said_please/` | 24 webp + 24 png | nothing |
| Three Feet Apart | `.claude/held-art/story_three_feet_apart/` | 10 webp + 10 png | opening; stages winter_garden, palace_kitchens, mages_yard, bridge_market; portraits caius, thessaly, prin, corvina, hollis |

"Still missing" is what `release-stories.ts` would ask for (cover, key art, opening panel, every
stage, every portrait), counted against the held files. Every Platform a World and The Zombie
Who Said Please look complete: they need the cover check and the wrap, not another art run.
`manifest.json` already lists the held files, so nothing there needs to change.

## Before the next art run, move them back

Do this first, or the generator draws everything again and charges for it:

```bash
for s in story_affection_97 story_every_platform_a_world story_the_zombie_who_said_please story_three_feet_apart; do
  mv .claude/held-art/$s infra/seed/assets/$s
done
```

Then run `docs/stories-50/PIPELINE.md` step 3 with `--only=<storyId>/` (only the missing files
are drawn), look at the cover, and do step 4 (wrap it in `withDerivedAssetKeys`) in the same
sitting, so the art and the wrap reach the repo together.
