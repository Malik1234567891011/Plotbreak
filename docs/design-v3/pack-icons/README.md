# Credit pack icons

Seven icons for the credits store, generated on PixAI 2026-11-22 (Tsubaki.2
lite, 1024x1024, 2,100 credits each, 14,700 in all; rows in
`docs/stories-50/pixai-ledger.tsv` labelled `design-v3:pack-icon:*`).
`gen.mts` holds the exact prompts.

| File | Product | What it shows |
|---|---|---|
| `first-purchase.png` | `crd_starter_700` (700, doubled once) | red gift envelope with two crystals |
| `pack-1000.png` | `crd_1000` | one crystal (also the store's hero icon) |
| `pack-2000.png` | `crd_2000` | two crystals |
| `pack-10000.png` | `crd_10000` | a small heap |
| `pack-20000.png` | `crd_20000` | indigo drawstring pouch |
| `pack-50000.png` | `crd_50000` | black lacquer box, red cord |
| `pack-100000.png` | `crd_100000` | lacquer chest, overflowing |

The PNGs are 256 px cutouts (background flood-filled from the edges, so the
dark lineart stays). `raw/` keeps the 1024 px originals on black as WebP.
Before shipping: cut at 3x from `raw/`, and check the lacquer pieces against
`ink.2`; their dark edges sit close to the tile.
