# Cover v3 fonts

`cover-title-v3.py` downloads these on first use into this folder, with each family's `OFL.txt` into
`licenses/`. The binaries are gitignored (about 20 MB, mostly Shippori Mincho B1 and Dela Gothic One); a fresh clone
fetches them again from the same pinned commit, so the type never changes under us.

Source: https://github.com/google/fonts at commit `06bfe0d62a98375cb09c942fa18e68bd32cff057`
(main on 2026-11-20). Raw URL pattern:
`https://raw.githubusercontent.com/google/fonts/06bfe0d62a98375cb09c942fa18e68bd32cff057/<path>`.
Every family is licensed under the SIL Open Font License 1.1 (`ofl/<family>/OFL.txt`).

| Family | File (path in google/fonts) | Used by |
|---|---|---|
| Pinyon Script | `ofl/pinyonscript/PinyonScript-Regular.ttf` | holy-high-key |
| Cinzel Decorative | `ofl/cinzeldecorative/CinzelDecorative-{Regular,Bold,Black}.ttf` | gilded-over-the-shoulder |
| Cinzel | `ofl/cinzel/Cinzel[wght].ttf` | gilded-over-the-shoulder (kicker), ink-and-one-red (seal initials) |
| Russo One | `ofl/russoone/RussoOne-Regular.ttf` | thumbnail-pop |
| Anton | `ofl/anton/Anton-Regular.ttf` | hot-pink-poster |
| Protest Revolution | `ofl/protestrevolution/ProtestRevolution-Regular.ttf` | ink-and-one-red (since 2026-11-22) |
| Sedgwick Ave Display | `ofl/sedgwickavedisplay/SedgwickAveDisplay-Regular.ttf` | retired: ink-and-one-red until 2026-11-22 |
| Dela Gothic One | `ofl/delagothicone/DelaGothicOne-Regular.ttf` | sunlit-webtoon-duo |
| Caveat | `ofl/caveat/Caveat[wght].ttf` | cosy-lamp-bokeh |
| Great Vibes | `ofl/greatvibes/GreatVibes-Regular.ttf` | melodrama-red-accent (accent line) |
| Playfair Display | `ofl/playfairdisplay/PlayfairDisplay[wght].ttf`, `PlayfairDisplay-Italic[wght].ttf` | melodrama-red-accent (kicker) |
| Shippori Mincho B1 | `ofl/shipporiminchob1/ShipporiMinchoB1-ExtraBold.ttf` | starlit-night |
| Orbitron | `ofl/orbitron/Orbitron[wght].ttf` | system-window (typeset fallback) |
| Oswald | `ofl/oswald/Oswald[wght].ttf` | contact-sheet labels (cover-v3-sheet.py) |

Why ink-and-one-red moved off Sedgwick Ave Display: its capital S draws like a backwards Z and its L like an
h, so SKILLS read "ZKIhhZ" on the shelf, and its lowercase uses the same unicase forms, so title case does not
help. Protest Revolution is a rough dry-brush face whose capitals read cleanly; the recipe adds a 3 px ink
stroke so its thin strokes hold at 160 px wide. Tried and passed over: Knewave (reads, but a chunky poster
brush, not ink), Caveat Brush (too close to cosy-lamp-bokeh's Caveat), Ma Shan Zheng and Zhi Mang Xing (capitals
too loose), Mansalva (its S reads as a J).
