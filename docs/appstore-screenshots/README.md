# App Store screenshots

Five 1320x2868 (iPhone 6.9") panels, OOC-style: headline on black, real app
screenshot in a bezel, art-only opener and closer. Regenerated 2026-09-12.

| # | File | Source |
|---|---|---|
| 1 | 01-hero.png | 22 real world covers (Itachi excluded) + The Ninth Archive focus card |
| 2 | 02-type.png | raw/session.png, a live turn in The Ninth Archive on production |
| 3 | 03-twenty-three.png | raw/discover.png, Discover with Second Skin featured |
| 4 | 04-be.png | raw/character-setup.png, Second Skin setup, name + background filled |
| 5 | 05-closing.png | raw/closing-art.png, Dare (gpt-image-2) ensemble on black |

Rebuild: `python3 compose.py hero`, `python3 compose.py closing`,
`python3 compose.py frame 2 "LINE1|LINE2" raw/session.png ACCENTWORD`.
Headlines are Helvetica Neue Bold with one violet accent word.

Captures came from the iPhone 16 Pro Max simulator with the status bar set to
9:41 via `xcrun simctl status_bar`, driven with idb, against the production API.
`reference-ooc/` holds the OOC screenshots used as the style reference.

## French set (`fr/`)

Same five panels with French headlines and the app captured in fr_FR
(`raw/fr-*.png`; the session is a fresh Second Skin run, since a run keeps the
language it began in). Tagline: L'ANIME JOUABLE. Rebuild with
`PB_OUT=fr PB_TAGLINE="L'ANIME JOUABLE" python3 compose.py ...` and the
headlines: `L'ANIME|JOUABLE`, `ÉCRIS CE QUE TU VEUX.|LE MOTEUR TRANCHE.`,
`VINGT-TROIS MONDES|QUI SE SOUVIENNENT DE TOI`, `SOIS QUI|TU VEUX`,
`LES DÉS|DÉCIDENT`.

## iPad 13-inch sets (`ipad/`, `ipad-fr/`)

2064x2752 panels for the 13-inch iPad slot, same five headlines per language,
captured on the iPad Pro 13-inch (M4) simulator (`raw/ipad-*.png`). Rebuild with
`PB_DEVICE=ipad PB_OUT=ipad python3 compose.py ...` (and `PB_TAGLINE` for FR).
The iPad session frames include a generated scene image, which the phone runs
did not produce on their first turn.
