# Cover title fonts

Two tools set cover titles from these fonts:

- `cover-title-v4.py` (current): every family listed in
  `docs/stories-50/cover-style-v3/titles/fonts.json`, 60 families. That JSON is the source of truth (family,
  file, default weight, static weights, italic, default axes, tags, vibe); this table is generated from it.
  `python3 -I docs/stories-50/tools/cover-title-v4.py --fetch-fonts` downloads them all,
  `--fonts <tag>` lists one tag, and `--specimen` redraws `titles/fonts.png`.
- `cover-title-v3.py` (the v3 recipe finals): the 14 families in the second table.

Both download on first use into this folder, with each family's `OFL.txt` into `licenses/`. The binaries are
gitignored (about 78 MB, mostly the Japanese families with full kanji sets); a fresh clone fetches them again from
the same pinned commit, so the type never changes under us.

Source: https://github.com/google/fonts at commit `06bfe0d62a98375cb09c942fa18e68bd32cff057`
(main on 2026-11-20). Raw URL pattern:
`https://raw.githubusercontent.com/google/fonts/06bfe0d62a98375cb09c942fa18e68bd32cff057/<path>`.
Every family is from `ofl/` and licensed under the SIL Open Font License 1.1 (`ofl/<family>/OFL.txt`): free for
commercial use, including rendering into images we sell or ship. No Apache- or UFL-licensed family is used.

## v4 library: coverage by kind

A family can count under more than one kind.

| Kind | Families |
|---|---|
| elegant serif / engraved | 8 |
| blackletter / gothic | 3 |
| brush / calligraphy | 4 |
| horror / distressed / glitch | 7 |
| sci-fi / tech | 7 |
| game UI / pixel | 8 |
| rounded / comic | 6 |
| handwriting / marker | 5 |
| condensed / impact | 13 |
| retro / art deco / neon | 9 |
| Japanese-feel Latin | 11 |
| script | 6 |
| stencil / military | 5 |

## v4 library (titles/fonts.json)

| Family | Files (path in google/fonts) | Tags (kind, then the stories it fits) |
|---|---|---|
| Cinzel | `ofl/cinzel/Cinzel[wght].ttf` | elegant-serif, engraved, kicker, nobility, fantasy, academy |
| Cinzel Decorative | `ofl/cinzeldecorative/CinzelDecorative-Black.ttf`<br>`ofl/cinzeldecorative/CinzelDecorative-Bold.ttf`<br>`ofl/cinzeldecorative/CinzelDecorative-Regular.ttf` | elegant-serif, engraved, nobility, fantasy, gold |
| Cormorant | `ofl/cormorant/Cormorant-Italic[wght].ttf`<br>`ofl/cormorant/Cormorant[wght].ttf` | elegant-serif, romance, nobility, villainess, melodrama, kicker |
| Bodoni Moda | `ofl/bodonimoda/BodoniModa-Italic[opsz,wght].ttf`<br>`ofl/bodonimoda/BodoniModa[opsz,wght].ttf` | elegant-serif, fashion, romance, melodrama, noir |
| Marcellus | `ofl/marcellus/Marcellus-Regular.ttf` | elegant-serif, engraved, fantasy, holy, academy |
| Italiana | `ofl/italiana/Italiana-Regular.ttf` | elegant-serif, art-deco, thin, romance, holy, kicker |
| Playfair Display | `ofl/playfairdisplay/PlayfairDisplay-Italic[wght].ttf`<br>`ofl/playfairdisplay/PlayfairDisplay[wght].ttf` | elegant-serif, romance, melodrama, kicker |
| Shippori Mincho B1 | `ofl/shipporiminchob1/ShipporiMinchoB1-ExtraBold.ttf` | elegant-serif, japanese-feel, mincho, fantasy, night, wuxia |
| UnifrakturMaguntia | `ofl/unifrakturmaguntia/UnifrakturMaguntia-Book.ttf` | blackletter, gothic, dark-fantasy, cult, vampire, horror |
| Pirata One | `ofl/pirataone/PirataOne-Regular.ttf` | blackletter, gothic, dark-fantasy, villain, metal |
| Grenze Gotisch | `ofl/grenzegotisch/GrenzeGotisch[wght].ttf` | blackletter, gothic, fantasy, clan, nobility |
| Protest Revolution | `ofl/protestrevolution/ProtestRevolution-Regular.ttf` | brush, ink, distressed, noir, action, wuxia |
| Yuji Syuku | `ofl/yujisyuku/YujiSyuku-Regular.ttf` | japanese-feel, kanji, seal, thin, kicker, shrine, wuxia |
| Kaushan Script | `ofl/kaushanscript/KaushanScript-Regular.ttf` | brush, script, action, sports, adventure |
| Potta One | `ofl/pottaone/PottaOne-Regular.ttf` | brush, japanese-feel, comedy, food, festival, yakuza |
| Creepster | `ofl/creepster/Creepster-Regular.ttf` | horror, comic, zombie, halloween |
| Rubik Dirt | `ofl/rubikdirt/RubikDirt-Regular.ttf` | distressed, horror, apocalypse, military, grunge |
| Rubik Glitch | `ofl/rubikglitch/RubikGlitch-Regular.ttf` | glitch, sci-fi, cyber, system, horror |
| Metal Mania | `ofl/metalmania/MetalMania-Regular.ttf` | horror, metal, gothic, demon, villain |
| Orbitron | `ofl/orbitron/Orbitron[wght].ttf` | sci-fi, tech, game-ui, system, mecha |
| Audiowide | `ofl/audiowide/Audiowide-Regular.ttf` | sci-fi, tech, racing, esports, retro-future |
| Exo 2 | `ofl/exo2/Exo2-Italic[wght].ttf`<br>`ofl/exo2/Exo2[wght].ttf` | sci-fi, tech, game-ui, kicker, action |
| Chakra Petch | `ofl/chakrapetch/ChakraPetch-Bold.ttf`<br>`ofl/chakrapetch/ChakraPetch-BoldItalic.ttf`<br>`ofl/chakrapetch/ChakraPetch-Medium.ttf`<br>`ofl/chakrapetch/ChakraPetch-SemiBold.ttf` | sci-fi, tech, game-ui, system, kicker, cyber |
| Press Start 2P | `ofl/pressstart2p/PressStart2P-Regular.ttf` | pixel, game-ui, retro, isekai, comedy |
| VT323 | `ofl/vt323/VT323-Regular.ttf` | pixel, mono, terminal, system, glitch, kicker |
| Bungee | `ofl/bungee/Bungee-Regular.ttf` | game-ui, signage, impact, urban, comedy, sports |
| Russo One | `ofl/russoone/RussoOne-Regular.ttf` | game-ui, impact, esports, action, hero |
| Teko | `ofl/teko/Teko[wght].ttf` | condensed, game-ui, sports, action, tech, kicker |
| Fredoka | `ofl/fredoka/Fredoka[wdth,wght].ttf` | rounded, comedy, romcom, cute, slice-of-life |
| Bangers | `ofl/bangers/Bangers-Regular.ttf` | comic, impact, action, comedy, hero |
| Titan One | `ofl/titanone/TitanOne-Regular.ttf` | rounded, comic, comedy, cute, food |
| Mochiy Pop One | `ofl/mochiypopone/MochiyPopOne-Regular.ttf` | rounded, japanese-feel, cute, comedy, idol, romcom |
| Rampart One | `ofl/rampartone/RampartOne-Regular.ttf` | japanese-feel, comic, 3d-outline, comedy, school |
| Dela Gothic One | `ofl/delagothicone/DelaGothicOne-Regular.ttf` | japanese-feel, impact, poster, comedy, action, webtoon |
| Caveat | `ofl/caveat/Caveat[wght].ttf` | handwriting, marker, slice-of-life, cozy, kicker |
| Gochi Hand | `ofl/gochihand/GochiHand-Regular.ttf` | handwriting, marker, comedy, slice-of-life, school |
| Klee One | `ofl/kleeone/KleeOne-Regular.ttf`<br>`ofl/kleeone/KleeOne-SemiBold.ttf` | handwriting, japanese-feel, slice-of-life, cozy, school, kicker |
| Nanum Pen Script | `ofl/nanumpenscript/NanumPenScript-Regular.ttf` | handwriting, marker, slice-of-life, romance, korean-feel |
| Anton | `ofl/anton/Anton-Regular.ttf` | condensed, impact, action, poster, sports |
| Oswald | `ofl/oswald/Oswald[wght].ttf` | condensed, kicker, labels, news, action |
| Bebas Neue | `ofl/bebasneue/BebasNeue-Regular.ttf` | condensed, impact, action, thriller, sports |
| Big Shoulders Display | `ofl/bigshouldersdisplay/BigShouldersDisplay[wght].ttf` | condensed, impact, industrial, sports, military, noir |
| Barlow Condensed | `ofl/barlowcondensed/BarlowCondensed-Black.ttf`<br>`ofl/barlowcondensed/BarlowCondensed-BlackItalic.ttf`<br>`ofl/barlowcondensed/BarlowCondensed-ExtraBold.ttf`<br>`ofl/barlowcondensed/BarlowCondensed-ExtraBoldItalic.ttf`<br>`ofl/barlowcondensed/BarlowCondensed-SemiBold.ttf` | condensed, impact, sports, action, esports, kicker |
| Alfa Slab One | `ofl/alfaslabone/AlfaSlabOne-Regular.ttf` | slab, impact, retro, western, comedy, food |
| Poiret One | `ofl/poiretone/PoiretOne-Regular.ttf` | art-deco, thin, retro, romance, jazz, kicker |
| Limelight | `ofl/limelight/Limelight-Regular.ttf` | art-deco, retro, cinema, noir, glamour |
| Monoton | `ofl/monoton/Monoton-Regular.ttf` | neon, retro, art-deco, night, city, idol |
| Shrikhand | `ofl/shrikhand/Shrikhand-Regular.ttf` | retro, script, comedy, food, summer, romcom |
| Rye | `ofl/rye/Rye-Regular.ttf` | western, retro, wanted-poster, frontier, inn |
| Shojumaru | `ofl/shojumaru/Shojumaru-Regular.ttf` | japanese-feel, brush, samurai, wuxia, clan, action |
| Reggae One | `ofl/reggaeone/ReggaeOne-Regular.ttf` | japanese-feel, impact, manga, shonen, action, comedy |
| Train One | `ofl/trainone/TrainOne-Regular.ttf` | japanese-feel, inline, retro, school, comedy |
| Hachi Maru Pop | `ofl/hachimarupop/HachiMaruPop-Regular.ttf` | japanese-feel, handwriting, cute, idol, romcom |
| Pinyon Script | `ofl/pinyonscript/PinyonScript-Regular.ttf` | script, wedding, romance, holy, nobility |
| Great Vibes | `ofl/greatvibes/GreatVibes-Regular.ttf` | script, wedding, romance, melodrama |
| Parisienne | `ofl/parisienne/Parisienne-Regular.ttf` | script, romance, wedding, cafe, kicker |
| Alex Brush | `ofl/alexbrush/AlexBrush-Regular.ttf` | script, wedding, romance, villainess, luxury |
| Black Ops One | `ofl/blackopsone/BlackOpsOne-Regular.ttf` | stencil, military, impact, action, apocalypse |
| Saira Stencil One | `ofl/sairastencilone/SairaStencilOne-Regular.ttf` | stencil, military, sci-fi, tech, mecha |
| Stardos Stencil | `ofl/stardosstencil/StardosStencil-Bold.ttf`<br>`ofl/stardosstencil/StardosStencil-Regular.ttf` | stencil, military, crate, apocalypse, western |

Notes from the 2026-11-23 specimen (`titles/fonts.png`):

- **Bodoni Moda** defaults to optical size 28 (`axes` in fonts.json). At its 96 display size the hairlines vanish
  at cover scale, which looks like broken letter spacing.
- **Yuji Syuku**'s Latin is a light, wide serif, not a brush. Use it for kanji in seals or for airy kickers; for
  a brush title use Shojumaru, Potta One, Kaushan Script or Protest Revolution.
- **Press Start 2P** and **VT323** have caps and digits that read best in all caps.
- **Retired: Sedgwick Ave Display** (its S draws like a Z; below). Its file stays for the v3 history only.

## v3 recipe fonts (cover-title-v3.py)

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
