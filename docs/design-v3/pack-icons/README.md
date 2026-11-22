# Credit icons: one crystal, growing containers

Omar picked the single crystal from the first PixAI set (2026-11-22) as the one
currency icon. Packs show that same crystal in a container that grows with the
price, the Clash Royale / Genshin step-up.

| File | Used for | What it shows | Made by |
|---|---|---|---|
| `crystal.png` | Source (430×802 cutout) | the crystal | cut from `raw/pack-1000.webp` |
| `crystal-inline.png` | Every price, balance and cost, at text size (51×96) | the crystal | same |
| `pack-1000.png` | `crd_1000`, the Credits hero, log-in, quests | 1 crystal | composite (`pile.py`) |
| `pack-2000.png` / `first-purchase.png` | `crd_2000`, `crd_starter_700` | 3 crystals | composite |
| `pack-10000.png` | `crd_10000` | tan leather pouch | PixAI |
| `pack-20000.png` | `crd_20000` | woven basket | PixAI |
| `pack-50000.png` | `crd_50000` | open wooden crate | PixAI (`p50000-v2`) |
| `pack-100000.png` | `crd_100000` | walnut chest, overflowing | PixAI |

All pack PNGs are 512×512 with a transparent background.

The containers were made on PixAI Tsubaki.3 pro, 1024×1024, with the crystal
original as a context image (`gen-containers.mts`), 4,900 credits each: seven
tasks, 34,300 credits, logged in `docs/stories-50/pixai-ledger.tsv` as
`design-v3:pack:*`. `raw/containers/` keeps all seven, including the rejects:
`p2000` (too small, shard-shaped crystals), `p50000` and `p50000-v3` (read as a
second chest). `cutpack.py` cuts each one from its black background.

The 1- and 3-crystal packs are composites of the real crystal, because the
generated crystals drift toward quartz shards; in a container that drift is
hidden, on its own it shows.

## Earlier: why the first piles were composited and not a new generation

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
