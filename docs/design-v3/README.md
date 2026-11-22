# Design v3: "Ink"

The redesign proposal. Look only: no SwiftUI changes until the user approves it.

- Board: https://claude.ai/artifact/ToYYtSnfTLYqfxH1AnxbBf (private until shared)
- Rules and tokens: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- Board source: `board/project/*.dc.html` (one file per screen) and `board/project/canvas.json`.
  `board/blobs.tsv` maps each uploaded image to the repo art it was made from
  (`infra/seed/assets/story_<id>/`).

All art on the board is real Plotbreak art from `infra/seed/assets`. Like and play
counts on Home are the production numbers from `story_signals` on 2026-11-22.
