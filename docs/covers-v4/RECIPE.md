# Cover v4 recipe (approved on The Ninth Archive, 2026-09-13)

EN: Dare `seedream-5-pro`, aspect `2:3`, quality `2k`, one image.
FR: Dare `nano-banana-2`, aspect `2:3`, quality `2k`, `referenceStorageKeys` = the EN output's storageKey, prompt:
> Use @<EN storageKey> as the exact reference. Reproduce this anime cover illustration identically — same characters, poses, faces, hair, clothing, same background, colours, lighting and composition — with ONE change: replace the English title lettering "<EN TITLE>" with the French title "<FR TITLE>", drawn in the same bespoke logo style with the same glow, same position, large and perfectly legible, spelled exactly "<FR TITLE>" with correct accents. No other text anywhere. Do not change anything else.

## Approved EN prompt (The Ninth Archive) — copy the shape, swap the story

Anime light-novel / mobile-game cover illustration, portrait 2:3, premium polished Japanese anime key visual quality (like a modern seasonal anime poster or an OOC / Webtoon original cover). Glossy, detailed digital anime painting with clean lineart, luminous eyes, soft rim light, rich color depth. Not flat, not sketchy, not western cartoon.

THE TITLE IS PART OF THE ART. Render the words "THE NINTH ARCHIVE" as a bespoke stylized logo integrated into the illustration: elegant serif-gothic academy lettering with a faint red ward-glow around the letters, placed in the lower third of the cover, large and perfectly legible, spelled exactly "THE NINTH ARCHIVE". No other text anywhere.

SCENE (from the story): Verath Academy, a magic school where the front gate checks each student's magical record every morning. The hero's record has been erased, and the tall grey stone gate arch behind them is bleeding silent red ward-light across the wet flagstones — the signal for a student who must be stopped.

CHARACTERS, large in frame, filling at least three quarters of the cover, cropped by its edges, faces clearly readable:
- Foreground center-left: MIRA SENN, a small third-year archive assistant with black hair and a single bone-white streak burned through it above her left temple, both hands inked black to the second knuckle, swallowed by an oversized archive coat worn like armour, collar up, sleeves rolled twice and still too long. She holds a torn ledger page and looks at the viewer with a guarded, quietly amused expression, as if she knows more than she is saying.
- Behind her, right, slightly taller: KAEL OSTRAND, a tall fifth-year gate prefect with close-cropped fair hair, an immaculate prefect sash worn over a black mourning band, a single black glove on his right hand, arms visible, watching the viewer with cool, serious suspicion.
- Small, far background between them, mostly in shadow: the Warden, an elderly woman with a silver plait and half-moon spectacles, smiling kindly, which is the unsettling part.

MOOD: cold stone, warm lamplight, overcast morning rain, a red ward-glow cutting through blue-grey mist. Dark academia mystery. Colour key: deep slate blue and charcoal with saturated red ward-light and warm amber lamp accents. Composed so the faces still read at thumbnail size, strong silhouette separation, high contrast.

Both characters are young adults drawn attractive and stylish in a commercial anime way, fully clothed in school uniform and coat, nothing suggestive. No watermark, no signature, no extra text, no speech bubbles, no borders.

## Rules
- The prompt is written FROM the brief in `briefs/<storyId>.md`: premise, hook, tone, cast looks, opening location, and any authored coverDirection. Not from the title.
- Title logo style should fit the genre (sports = bold italic athletic; romance = soft rounded script; horror = cracked/ dripping; pirates = weathered brass; etc.). Vary colour keys between stories.
- Minors (Itachi 13, Sasuke 7, Luffy/Sabo/Ace as kids, any student under 18): describe by costume and placement, never by age or clothing state; no appeal wording for them. Provider moderation trips on "child"+"clothed" stacking.
- Verify every output by viewing it: title spelled exactly, accents present, no stray text. One retry if wrong.
- Outputs: `docs/covers-v4/<storyId>/en.png`, `fr.png`, and `README.md` (EN prompt, FR title, generation ids). If the FR title equals the EN title (proper noun), copy en.png to fr.png.

## FR swap tip (batch A, Salt Road)
When the French title is longer than the English one, nano-banana-2 may keep the
English glyphs under the French. Add to the swap prompt: "Completely remove the
English lettering. The French title is on two lines: '<LINE 1>' / '<LINE 2>'.
The words <EN WORDS> must not appear." Fixed it first retry.
