# Credit icons: one crystal

Omar picked the single crystal from the first PixAI set (2026-11-22) as the one
currency icon. Every other picture is that same crystal, piled up, so the cut,
color and lineart never change between packs.

| File | Used for | What it shows |
|---|---|---|
| `crystal.png` | Source for everything below (430×802 cutout) | the crystal |
| `crystal-inline.png` | Every price, balance and cost in the app, at text size (51×96) | the crystal |
| `pack-1000.png` | `crd_1000`, the Credits hero, daily log-in, quests | 1 crystal |
| `pack-2000.png` / `first-purchase.png` | `crd_2000`, `crd_starter_700` (doubled to 1,400) | 2 crystals |
| `pack-10000.png` | `crd_10000` | 4, a small heap |
| `pack-20000.png` | `crd_20000` | 7 |
| `pack-50000.png` | `crd_50000` | 12 |
| `pack-100000.png` | `crd_100000` | 17 |

All pack PNGs are 512×512 with a transparent background.

How they were made (no new generations; PixAI was at zero credits):

1. `python3 cut.py raw/pack-1000.webp crystal_t24.png 24` cuts the crystal out
   of the 1024 px original. The sparkles around it were then removed by keeping
   only the crystal's convex hull.
2. `python3 pile.py` (run next to `crystal.png`) composites the piles: back
   rows slightly darker, the front row lying down, and a soft contact shadow.

## Why compositing and not a new generation

A generated pile, even with the crystal as a reference image, redraws every
gem, so the cut and the rainbow drift between tiers. That drift is the problem
Omar spotted in the first set. Compositing copies the same pixels, so tier 6
is visibly the same gem as tier 1. If a painted look is wanted later, use the
prompts below with `crystal.png` as the reference (image-to-image, strength
about 0.45) and then check each result against the single crystal:

- `pack-2000`: "two of the exact same clear moonstone crystals from the reference, one upright and one leaning on it, same cut, same rainbow sheen, same thin dark lineart, game shop icon, centered, plain black background"
- `pack-10000`: "a small heap of four of the exact same crystals from the reference, ..." (same tail)
- `pack-20000` to `pack-100000`: "a mound of 7 / 12 / 17 of the exact same crystals from the reference, front ones lying down, ..." (same tail)

`raw/` keeps the first PixAI set (pouch, lacquer box, chest, envelope). Only
`raw/pack-1000.webp` is still used.
