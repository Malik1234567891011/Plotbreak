# Design v3: build spec for the remaining gaps

2026-11-23. This covers every gap left open by [IOS-PORT.md](IOS-PORT.md): the
"Not matched" list, Badges, Relics and Settings (which are not on the board), the
Tower ◆ and `DeltaKind`. For each gap it says where the data lives, the API
change (additive only), the SwiftUI change, and how to check it. The work is
split into four lanes that barely share files. Owner's ask: "do the rest of the
design so we can get it ready for production".

Board source: `board/project/*.dc.html`. Rules: [AUDIT.md](AUDIT.md) ("The
principle to rebuild on", rules 1-7). Image ids on the board map to repo art via
`board/blobs.tsv`.

## Rules every lane follows

- **API changes are additive.** Only new optional fields or new endpoints. No
  renames, no removals, no type changes. Live app versions call this API.
- **iOS renders without the new fields.** Production will not send them until
  the API deploys, so each new field decodes as optional (`var x: T?`) or with
  `@Default`, and the screen looks exactly like today when it is missing. Each
  lane adds a decode test with the old JSON payload (the new keys absent).
- **Money screens:** no turn counts ("about N turns" and "N left" are banned,
  even where the board shows them: Paywall "About 23 turns at Vivid", Play
  "about 20 left"). The Pass is weekly only. StoreKit product ids,
  purchase/restore logic, Apple fine print, Terms and Privacy stay as they are.
- **Copy** goes through `packages/i18n` (en + fr; French follows
  `docs/localization/fr-FR/PRODUCT_VOICE.md`: *tu*, the ’ apostrophe, a
  non-breaking space before ? ! : ;). Then `node apps/ios/scripts/export-catalog.mjs`.
  If a key is used only by the screen being changed, change its value in place.
  If another screen uses it too, add a new key.
- **No production.** No `PROD_DATABASE_URL`, no Railway, never plain
  `npm run migrate`. No lane here needs a migration or a fixture change.
- **Gates:** `npm run typecheck` and
  `npm test 2>&1 | grep -E "Test Files|Tests |FAIL"` both pass (they are
  separate gates). iOS: `cd apps/ios && DERIVED=build/dd-<lane> ./build.sh`
  prints `BUILD SUCCEEDED`.
- **Own simulator.** `./test.sh` picks the first available iPhone
  (`grep ... | head -1`), which can be another lane's device or a booted one.
  Create your own device
  (`xcrun simctl create "PB gaps <lane>" "iPhone 17 Pro" <iOS 26 runtime>`), run
  `xcodebuild ... -destination "platform=iOS Simulator,id=$UDID" -derivedDataPath build/dd-<lane> -skip-testing:PlotbreakTests/LocalStorePurchaseTests CODE_SIGN_IDENTITY=- CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=YES test`
  filtered through `grep -E "error:|failed|Executed|TEST (SUCCEEDED|FAILED)"`,
  and delete the device afterwards. Never touch a booted simulator.
- **One API on :4000 is shared** and `tsx watch` reloads on every edit. An API
  lane that wants to curl its own change runs a second instance with
  `PORT=40<n>` (`services/api/src/context.ts:29` reads `PORT`). It does not edit
  under somebody else's running instance.
- **Git:** commit explicit paths only. Never stage `docs/ads/README.md`,
  `docs/appstore-campaigns/`, `docs/releases/`, `.claude/`, `docs/stories-50/`.
  Every message ends with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
  Do not push.

## What the data actually is

Checked against the code and the local database (`postgres://localhost/plotbreak_local`).

- **Dialogue has a speaker.** `turns.blocks` is a jsonb array of
  `{type, speakerId, text, visibility}`. The production path, `runTurnPure`,
  sets `speakerId` only when the speaker is a cast id
  (`packages/director/src/pure/runtime.ts:113,161`). Recent local turns carry
  ids like `caius`, `varek`. Stored dialogue text already includes its quote
  marks (“…”). Names and portrait asset keys are in
  `story_versions.definition.characters[]`.
- **Who you are** is `story_sessions.display_name` (`SessionRecord.displayName`).
  `SessionSummary.displayName` already sends it (the Library uses it).
  `ContinueCard` does not.
- **Endings are authored, never reached.** 69 of the 77 published stories have
  `definition.endings` (6 to 21 each). These 8 have none: nine-weeks,
  ninth-archive, red-moon, salt-road, seven-days, tidewall, unbound,
  understudy. In production the endings reach the model only as prompt text
  (`packages/director/src/pure/narrator.ts:668`). Nothing records which ending a
  run reached. No code path sets a session to `COMPLETED`: the 64 local
  sessions are all `ACTIVE`, and the badge counter at `server.ts:1037`, which
  counts COMPLETED sessions, is always 0.
- **No share target for a story exists.** There is no web page per story
  (`www.plotbreak.com` serves `/privacy` and `/terms`, RELEASE.md). There is no
  Associated Domains entitlement (`Plotbreak.entitlements` has only Sign in with
  Apple). The `plotbreak://` scheme is registered in Info.plist, but `onOpenURL`
  passes every URL to Google Sign-In (`PlotbreakApp.swift:64`). The App Store
  id is in config: `PLOTBREAK_APPLE_APP_ID = 6811307049`, read as
  `AppConfig.appleAppID`. The Tower already shares
  `https://apps.apple.com/app/id6811307049` with a sentence
  (`apps/tower/src/App.tsx:458`).
- **Roles.** There are 315 archetypes across the 77 stories. All 77 fixtures in
  `packages/test-fixtures/src` are published locally, including the new-50
  batch. 304 role names are distinct, and each story has 3 to 6 roles.
  `ArchetypeDef` has no image. Every published story has at least as many
  location stage images (`locations[].stageImage`, 1200×800 webp) as it has
  roles; the smallest has 5. The board's own role tiles are stage images:
  `stage_bellweather`, `stage_hall_third`, `stage_room_314` and
  `stage_floor_zero` (see `blobs.tsv`).
- **World sheet in production.** `runTurnPure` keeps location, presence
  (`state.characters[].locationId`) and quest completion current
  (`runtime.ts:171-207`). Inventory stays at the starting items (2 to 4
  locally), and relationships never move. Local states have 1 to 4 characters
  present and an ACTIVE quest. The board's "Ayame's rules" exist only inside the
  Hush House premise prose (`packages/test-fixtures/src/hush-house.ts:37`).
  There is no structured field for them.
- **Tower ◆.** The "canvas" ◆ are not on the canvas. `game/Game.tsx:298`
  ("PRACTICE · ◆1 a floor") and `:303` ("You keep ◆1 for each floor you
  cleared.") are DOM text. The canvas payout chip (`game/render.ts:1078`) prints
  `+{n}` with no currency mark. `bridge.ts:256,293` say "◆" only in the desktop
  mock.
- **`DeltaKind.resource`** uses "◆" (`Theme/Components.swift:325`). Resources
  are things like Suspicion or Heat, not currency, so the glyph makes them read
  as credits. `StateDeltaRow` is mounted at `SessionFeed.swift:218`.

## Lanes

| Lane | Scope | API |
|---|---|---|
| **A** Session-derived data | Continue rows, Library rows, Out of credits quote | `SpeakerLine`; `ContinueCard` +2 fields; `SessionSummary` +2 fields |
| **B** Story and catalog data | Story page endings count and share, Search Characters, role tiles with art | `StoryDetailResponse.endingCount`; `SetupArchetype.image`; `/v1/search` `characters` |
| **C** Play and World sheet | Full-screen art behind smoked panels, reply cards, World sheet Now | `WorldSheetResponse.overview.hereNow` |
| **D** iOS-only restyles | Badges, Relic vault, Settings, birthday on the name step, Tower crystal, `DeltaKind` | none |

### Shared files (different hunks; merge by hand, never overwrite)

- `packages/contracts/src/api/index.ts`: A (`SpeakerLine`, `ContinueCard`, `SessionSummary`), B (`StoryDetailResponse`, `SetupArchetype`, new `SearchCharacter`/`SearchResponse`), C (`WorldSheetResponse.overview`).
- `services/api/src/projections.ts`: A (`toContinueCard`, `toSessionSummary`), B (`toStoryDetail`), C (`toWorldSheet`).
- `services/api/src/server.ts`: A (`GET /v1/sessions` passes turns to the summary), B (`GET /v1/search` adds `characters`).
- `apps/ios/Plotbreak/Models/Models.swift`: A (`SpeakerLine`, `ContinueCard`, `SessionSummary`), B (`SetupArchetype`, `StoryDetailResponse`, `SearchResponse`, `SearchCharacter`), C (`WorldSheetOverview`, `HereNowCharacter`).
- `apps/ios/Plotbreak/App/Router.swift`: A (`SheetRoute.continueStory` gains `quote`), D (`RootView` onboarding order).
- `packages/i18n/src/catalog/{en,fr}/*.ts`: A `library.ts`; B `story.ts`, `discover.ts`; C `worldsheet.ts`, `session.ts`; D `onboarding.ts`, `relics.ts`, `profile.ts` (and wherever `badges.*` lives).
- `apps/ios/Plotbreak/Resources/i18n/{en,fr}.json` are generated. After merging, re-run `node apps/ios/scripts/export-catalog.mjs`; never hand-merge the JSON.
- `apps/ios/Plotbreak.xcodeproj` is regenerated by `build.sh` from `project.yml` when a lane adds a `.swift` file. On a conflict, regenerate it.

Merge order: D first (no API), then A, B, C. Rebase each one and re-run the catalog export and the build.

---

## Lane A: session-derived data

Files: `services/api/src/last-line.ts` (new), `services/api/src/last-line.spec.ts` (new),
`projections.ts` (`toContinueCard`, `toSessionSummary`), `server.ts` (`/v1/sessions`),
contracts, `Models.swift`, `Screens/Library/SpeakerLineView.swift` (new),
`Screens/Discover/DiscoverScreen.swift` (`ContinueRow` only),
`Screens/Library/LibraryScreen.swift` (`SessionCard`),
`Screens/Wallet/ContinueStoryScreen.swift`, `App/Router.swift` (`SheetRoute.continueStory`),
`Screens/Session/SessionModel.swift` (the one `router.present(.continueStory(...))` call, about line 386),
`PlotbreakTests/` (a decode test), i18n `library.ts`.

### A1. Continue rows: "as {name}" and the speaker's face

- **Data:** `story_sessions.display_name`; the newest turns' `blocks` (DIALOGUE
  with a cast `speakerId`); `definition.characters[]` for name and portrait.
- **API:** in contracts, add
  `SpeakerLine = { characterId: string, name: string, portrait: string|null, text: string, turnIndex: int }` (strict).
  Add `ContinueCard.displayName: z.string().nullable().default(null)` and
  `ContinueCard.lastLine: SpeakerLine.nullable().default(null)`.
  New `last-line.ts` exports `lastSpokenLine(story, turns, lookback = 3)`. It walks
  the newest 3 turns, newest first, and each turn's blocks from last to first.
  It returns the first block where `type === 'DIALOGUE'`, `speakerId` is in
  `story.characters` and `visibility !== 'NPC_PRIVATE'`. The text is trimmed and
  capped at 280 characters on a word boundary with "…". The portrait goes
  through `resolveAssetUrl(c.portrait, story.version)`. `toContinueCard` fills
  both fields. `continueCardsFor` already loads the turns.
- **iOS:** add `struct SpeakerLine: Codable, Hashable`. On `ContinueCard`, add
  `var displayName: String?` and `var lastLine: SpeakerLine?`. New
  `SpeakerLineView`: `CharacterPortrait(name:uri:size: 28)` (the 24% squircle)
  beside the text in serif 15, `textSecondary`, at most 2 lines. Its
  accessibility label is "{name}: {text}". The text is shown as stored, because
  it already carries its quote marks. In `ContinueRow`, meta becomes
  `[t("library.playing_as", name) if non-empty, t("discover.continue_turns_in"), relative date]`
  joined with " · ". The line underneath is `SpeakerLineView` when there is a
  `lastLine`, otherwise today's `recapLine ?? currentObjective` (serif, no face).
- **Acceptance:** against a local API, a played session reads "as Ren · Turn 3 ·
  2 h ago" with the last speaker's face and line. With the old payload, the row
  renders exactly as today (decode test). `last-line.spec.ts` covers these
  cases: the last dialogue across turns wins; a null `speakerId` (the player, or
  narration) is skipped; an unknown id is skipped; a line beyond the lookback
  returns null; long text is capped.

### A2. Library rows: last line or recap

- **Data:** the same as A1. `GET /v1/sessions` already calls
  `listTurns` for every session (`server.ts:1528-1540`).
- **API:** add `SessionSummary.lastLine: SpeakerLine.nullable().default(null)`
  and `SessionSummary.recapLine: z.string().nullable().default(null)`.
  `toSessionSummary` gets an optional `turns` argument. Only `/v1/sessions`
  passes it. Every other caller (session load, create, fork) sends nulls, so
  those payloads only gain two null keys.
- **iOS:** add `var lastLine: SpeakerLine?` and `var recapLine: String?` to
  `SessionSummary`. `SessionCard`'s meta becomes the board's
  "as {name} · Turn {n} · {relative}" (`library.playing_as`,
  `discover.continue_turns_in`, `Format.relative`). Under it goes
  `SpeakerLineView`, else `recapLine` in serif 15 at 2 lines, else nothing. The
  accessibility label and the manage menu do not change.
- **Not built:** the board's Finished section with "1 of 5 endings" (see B1b).
- **Acceptance:** as A1, on the Library tab.

### A3. Out of credits: the character's last line with their face

- **Data:** on the client. `SessionModel` already holds `turns: [PlayerTurnRecord]`
  and `detail.scene.cast: [CastRef]` (every character with a portrait).
  **No API change.**
- **iOS:** add `SpeakerLine.latest(turns:cast:)`, the same rule as the server,
  with a unit test. Give `SheetRoute.continueStory` a trailing associated value
  `quote: SpeakerLine? = nil`. The route `id` string stays the same, and
  `DebugLaunch.swift` compiles unchanged. The wall call site in `SessionModel`
  passes `.latest(turns: turns, cast: detail?.scene.cast ?? [])`.
  `ContinueStoryScreen` takes `let quote: SpeakerLine?` and draws, above
  `storyLine` and over the art scrim, the face (44pt squircle) and the quote in
  serif 17, `textPrimary`, at most 3 lines. When `quote` is nil the layout does
  not change.
- **Untouched:** offer choice, prices, the buy button, the free routes,
  telemetry, and the existing `continue.*` copy. No turn counts.
- **Acceptance:** hitting the wall in a run where a character spoke shows their
  face and line. `-pbOpen continueStory` (no quote) looks as it does today.

---

## Lane B: story and catalog data

Files: `services/api/src/archetype-art.ts` (new), `services/api/src/search-characters.ts` (new),
their `.spec.ts`, `projections.ts` (`toStoryDetail`), `server.ts` (`/v1/search`), contracts,
`Models.swift`, `Screens/StoryDetail/StoryDetailScreen.swift`, `Screens/Discover/SearchScreen.swift`,
`Screens/CharacterSetup/CharacterSetupScreen.swift` (`roleTile` and the grid), i18n `story.ts`, `discover.ts`.

### B1a. Story page: the endings count

- **Data:** `definition.endings.length`.
- **API:** add `StoryDetailResponse.endingCount: z.number().int().min(0).default(0)`.
  Only the count is sent. Ending names are spoilers and are never sent.
- **iOS:** `@Default<Zero> var endingCount`. `statsLine` appends " · {n} endings"
  when n > 0, using a new key
  `story.endings_count` = `{count, plural, one {# ending} other {# endings}}`
  (fr `{count, plural, one {# fin} other {# fins}}`).
- **Acceptance:** Hush House shows "… · 9 endings"; Seven Days shows no endings
  part; an old payload shows no endings part.

### B1b. Story page "1 of 5 found", Library Finished rows, "You found X" (not feasible)

Production never records an ending (see "What the data actually is"). Building
this needs a product decision first: what counts as reaching an ending in the
pure path (does the model declare it, matched to an authored id?), whether the
run is then COMPLETED, and whether play continues. That means a change to
`runTurnPure`'s output schema, which is the streaming production path and
`ai_contracts.json`. It is not a design change. **Closest feasible version:**
B1a, the count in the stats line, with no Endings section drawn.

### B2. Story page share

- **Data:** `AppConfig.appleAppID` (6811307049), the story's title and hook.
- **Smallest honest target:** the App Store link with the title, the same
  pattern the Tower already uses. A link that opens the story itself would need
  a web host, an AASA file and an Associated Domains entitlement. That is an
  infrastructure decision and is out of scope.
- **API:** none.
- **iOS:** in `topBar`, a glass share button left of More (board `aria-label="Share"`):
  `ShareLink(item: URL("https://apps.apple.com/app/id\(id)"), message: Text(t("story.share_message", ["title": title, "hook": hook])))`.
  It is hidden when `appleAppID` is nil or empty. New keys:
  `story.share_a11y` "Share", and `story.share_message` "{title} on Plotbreak. {hook}"
  (fr "{title} sur Plotbreak. {hook}").
- **Acceptance:** the share sheet shows the message and the App Store link; no
  other screen changes.

### B3. Search: Characters tab

- **Data:** `definition.characters[]` (name, role, cardBlurb, portrait). These
  are the public fields the story page already sends (`projections.ts:175-185`).
  `searchCatalog` already indexes `name role` (`catalog-taxonomy.ts`, `fieldsOf`).
- **API:** the `/v1/search` response gains
  `characters: SearchCharacter[]` = `{characterId, name, role, cardBlurb, portrait, storyId, storyTitle, coverImage}`.
  Add `SearchCharacter` and `SearchResponse` (`results`, `characters` default
  `[]`) to contracts; there is no schema for this response today. New
  `search-characters.ts` exports `searchCharacters(stories, query, limit = 30)`.
  It runs over the **same** list the route has already localized and filtered
  (`readableIn`, blocks, reports), so those rules hold. Scoring: a name prefix
  ranks above a name token, which ranks above a role token, all through
  `normalizeForSearch`. An empty query returns the first two cast members of
  each of the top 10 ranked stories.
- **iOS:** `var characters: [SearchCharacter]?` on `SearchResponse`. nil means
  an older server, and then the tab row is hidden. Under the field go two
  filled chips, "Stories" and "Characters". The Characters list: each row is
  `CharacterPortrait` at 48 (squircle), the name in 17 semibold, then
  "{role} · {story title}" in 13 muted, one line each. A tap dismisses the sheet
  and pushes `.storyDetail(storyId:)`, as story results do. Empty results reuse
  `discover.search_no_results_*`. New keys: `discover.search_tab_stories`,
  `discover.search_tab_characters`, and `discover.search_character_line`
  "{role} · {story}".
- **Acceptance:** "ayame" finds Ayame Kurose, in Hush House. A blocked
  creator's characters are absent. The French UI searches French-localized
  names.

### B4. Who are you?: role tiles with art (free; no generation)

- **Count:** 315 roles across 77 stories (304 distinct names).
- **What generating would involve:** one image per role, 315 in all, prompted
  from the role and the story's art direction. Each would have to match the
  cover style (the cover pipeline needed two rejected rounds), then be reviewed,
  converted to webp and uploaded. Each story would also need a new optional
  `ArchetypeDef.image` and a story version migration of all 77 fixtures. Not
  planned. No cost is quoted without a measured pilot.
- **Free alternative (build this):** give each role one of the story's own
  location stage images. They already ship, there are enough for every role in
  every story, and the board's tiles are exactly this.
- **API:** `SetupArchetype` (the API projection, not `ArchetypeDef`) gains
  `image: z.string().nullable().default(null)`. No fixture or migration change.
  New `archetype-art.ts` exports `archetypeImages(story)`. It takes the
  locations that have a `stageImage`, in authored order, and leaves out
  `rules.startingLocationId` when there are more stages than roles. It picks
  evenly spaced entries (index `floor(i * n / k)`), so the tiles differ, with no
  repeats. A small override map in the same file (`storyId/archetypeId → locationId`)
  is seeded with the board's Hush House picks: `arch_between_places` →
  `bellweather`, `arch_night_shift` → `hall_third`, `arch_reads_everything` →
  `room_314`, `arch_camera_on` → `floor_zero`.
  It can grow by hand. Fallback order: stage, then `keyArt`, then cover, then null.
  `toStoryDetail` sets `image`.
- **iOS:** `var image: String?` on `SetupArchetype`. `roleTile(...)` gets the
  board's 72pt image band: `RemoteImage` set to fill and clipped, on the tile's
  existing 12pt filled body, with the selected ring as now. The "Something else"
  tile uses `detail.story.keyArt ?? coverImage` at 50% opacity. With no image
  (an old server), the tile is text only, as today. Tiles in a row keep equal
  heights.
- **Acceptance:** Hush House shows the four board pictures. Every published
  story returns a non-null image for every role (spec test over all fixtures).
  An old payload renders the text-only grid.

---

## Lane C: Play art and World sheet Now

Files: `Screens/Session/SessionScreen.swift`, `Screens/Session/SessionFeed.swift`,
`Screens/Session/SessionReplyCard.swift` (new), `Screens/WorldSheet/WorldSheetScreen.swift`,
`Screens/WorldSheet/WorldSheetNowTab.swift` (new), `Screens/WorldSheet/WorldSheetTabs.swift`
(moving resources to You), `Screens/Session/SessionStage.swift` (the one `tab: "quests"` call),
`projections.ts` (`toWorldSheet`), contracts, `Models.swift`, its own spec file, i18n `worldsheet.ts`, `session.ts`.
**Do not edit `Theme/Components.swift`** (lane D) or `SessionModel.swift` (lane A's hunk).

### C1. Play: full-screen scene art behind smoked story panels, and reply cards

- **Data:** `SessionSceneState.stageImage`, the current location's stage. It
  arrives on `GET /v1/sessions/:id` and changes when the player moves. Beat
  panels (`turn.panel.url`) and hero images stay in the feed as now.
  **No API change.**
- **iOS:** `SessionScreen` puts the stage behind everything: `RemoteImage(stageImage)`,
  set to fill and ignoring the safe area, under a scrim (bgBase about 0.35 at
  the top to 0.92 at the bottom, matching the board's `rgba(15,14,13,…)`). It
  crossfades when `stageImage` changes. A nil `stageImage` gives today's plain
  ink. In `SessionFeed`, each beat's text blocks sit on one smoked panel:
  `.ultraThinMaterial` plus `bgBase.opacity(0.55)`, 12pt radius, 16pt padding.
  Story text stays serif. Header, quality line and composer are already glass.
  The reply cards become the new `SessionReplyCard`: a pencil button leading
  (`ui.edit_response_a11y` → `model.edit`), the text in serif 17, and a white
  32pt round send with an up arrow trailing (`model.choose(item, position:)`,
  so the position telemetry stays), on a smoked background.
- **Untouched:** Prologue, Chapter card and End card. The quality line keeps
  its no-turns-left wording.
- **Acceptance:** stage art is visible behind the text, and body text keeps at
  least 4.5:1 contrast over the brightest stage (check Hush House `hall_third`
  and one daylight stage). Scrolling has no visible hitch on the simulator. A
  story with no stages looks like today.

### C2. World sheet: the Now tab (threads, Here now, You are carrying)

- **Data:** Here now is the characters whose `locationId` matches the player's
  (`charactersPresent(state)`), with name, portrait and `cardBlurb` from
  `definition.characters`. Carrying is the existing `inventory`. Threads are the
  existing `overview.topObjective` and the `quests` whose status is ACTIVE.
- **API:** `WorldSheetResponse.overview.hereNow: z.array({characterId, name, portrait|null, line}).default([])`,
  filled in `toWorldSheet`.
- **iOS:** `var hereNow: [HereNowCharacter]?` on `WorldSheetOverview`; nil
  (an old server) hides that section. `WorldSheetTab` gains `.now`, first and
  the default. The chip row follows the board: Now · People · Things · Map ·
  Timeline · You. Overview and Quests leave the chip row. An `initialTab` of
  `nil`, `"overview"` or `"quests"` maps to `.now`; `SessionStage.swift:159`
  passes `"quests"`. The Now sections use 20pt sentence-case headings, no boxes
  and no numerals:
  1. **Open threads:** the objective, then the ACTIVE quests (title and
     `currentStepCopy`), then up to 3 completed ones, muted.
  2. **Here now**, with "See all" opening People: a 44pt squircle face, the
     name, and the line.
  3. **You are carrying**, with "See all" opening Things: the item names.
  4. **Lately:** `recentEvents`, when there are any.

  Resources move to the You tab; statuses are already there. New keys:
  `worldsheet.tab_now` "Now", `worldsheet.open_threads`, `worldsheet.here_now`,
  `worldsheet.carrying` "You are carrying", `worldsheet.lately`. "Things" and
  "You" change `tab_inventory` and `tab_character` in place if a grep shows only
  the world sheet uses them; otherwise they get new keys.
- **Acceptance:** opening the sheet mid-run lands on Now and shows who is in the
  room with faces, what you carry, and the open quest. The quest strip still
  opens the sheet, now on Now. An old payload shows Now without Here now.

### C3. The board's "Ayame's rules" block (not feasible)

The rules exist only as prose inside each story's premise. A structured "rules"
field would be a content and schema decision for 77 stories. **Closest feasible
version:** C2's Open threads.

---

## Lane D: iOS-only restyles

Files: `Screens/Badges/BadgesScreen.swift`, `Screens/Relics/RelicVaultScreen.swift`,
`Screens/Relics/RelicViews.swift` (radius only; `RelicRevealView` untouched),
`Screens/Settings/{SettingsScreen,MyInformationScreen,PersonalizationScreen}.swift`,
`Screens/Onboarding/OnboardingScreens.swift`, `App/Router.swift` (`RootView` only),
`Theme/Components.swift` (`DeltaKind` only), `apps/tower/src/{App.tsx,gems.tsx (new),game/Game.tsx,game/render.ts,bridge.ts}`,
`apps/ios/Plotbreak/Resources/tower/tower.html` (rebuilt), i18n `onboarding.ts`, `relics.ts`, `profile.ts`.
No API change.

The restyles apply AUDIT.md's rules because there are no board frames for these
screens: SF only, no boxes except grouped settings rows (`bgElevated`, 12pt), art
8pt, faces 24%, you a circle, pressables capsules, numbers inline, crystal
picture only, one white primary, no kickers, rules or gradients.

### D1. Badges

Plain rows instead of `Card`: `BadgeMark` at 44pt with an 8pt art corner, the
title in 17 semibold, the blurb in 13 muted, and progress as a 3pt capsule with
"{done} of {target}" inline. The reward goes through `Text.crystals`. Section
headings are 20pt sentence case. Collect pills stay as small white capsules;
like the shop's price pills, they are the documented exception to one-primary,
because each one is money. The Discord quest loses its `Card` and becomes an
inline code row (monospace), a filled Copy capsule, then `DiscordButton`.
Acceptance: no `Card` or `strokeBorder` left in the file; claiming still
credits and celebrates.

### D2. Relic vault

The summary was a 44pt serif count over a label with a four-colour gradient
bar. It becomes one inline meta line, `relics.found_of`, with the per-rarity
counts as quiet inline meta, and no gradient. Section headers lose the
`RarityTag` and the rule: the rarity name becomes a 20pt sentence-case heading
in the rarity colour, without tracking or uppercase. Story filters use the
standard `Chip`. Relic cells get the 8pt art corner (`relicFrame(cornerRadius: 8)`).
The rarity frame stays, because it belongs to the art. In the detail sheet the
serif 30 title becomes SF bold 28. The lore line stays serif, since it is
in-world text, but loses the italic. The stroked box becomes a filled 12pt
`bgElevated` body with no stroke. `RelicVaultCard` (Profile) becomes a plain
row. `RelicRevealView` is an in-story moment and stays as it is, like the title
cards. Acceptance: no serif titles, gradients or kickers in `RelicVaultScreen.swift`.

### D3. Settings

Group the rows in filled `bgElevated` 12pt blocks, the pattern
`ProfileScreen.swift:84` already uses. The Account rows and the app version
share one group. Sign out goes from `.outline` to the filled secondary variant;
outlined boxes are gone. Sign in stays `.light`, the one primary. Delete account
stays quiet danger text. `SectionLabel` headings stay. `MyInformationScreen`'s
`.h1` title and `PersonalizationScreen`'s header follow the 28pt bold tab-title
style. Legal links and their visibility rule do not change. Acceptance: no
`.outline` button in Settings.

### D4. Onboarding: the birthday on the name step (board OnbProfile)

The new `NameAndBirthdayScreen` shows "What should characters call you?" with
the name field (3/24 count) and its hint. Under it, when `!store.ageVerified`,
comes "And your birthday?": three numeric paper fields in locale order (en
Month/Day/Year, fr Jour/Mois/Année), the line "Only used to keep under-13s safe.
Nobody else sees it.", and the hint "Finish the year to go on" until the date
is valid. In `RootView`, one condition replaces the birth-date and name
branches: `!ageVerified || (!onboarded && !nameDone && displayName == nil)`.
`onboardingSteps` goes from 4 to 3 (this step, taste, showcase), matching the
board's "1 of 3".

**Order of writes, for COPPA:** the name is typed before the age is known, so it
stays in memory. `store.confirmAge` runs first. Only if the player is not under
13 is the name saved. Under 13 shows `onboarding.age_too_young`, and the name is
dropped. `ageGateCompleted` telemetry does not change. A player who verified
their age earlier but has no name sees the step without the birthday block.

New keys: `onboarding.birthday_heading`, `onboarding.birthday_note`,
`onboarding.birthday_month`, `_day`, `_year`, `onboarding.birthday_finish_year`.

Acceptance: a fresh install goes from sign in to this step (1 of 3), then taste,
then showcase. An under-13 date blocks and nothing is saved. On a simulator
with leftover defaults, read PORTING.md's note on the
`com.plotbreak.app` defaults domain first.

### D5. Tower: every ◆ drawn as the crystal

Move `Gem`/`gems()` from `App.tsx` to `src/gems.tsx` and import them in both
`App.tsx` and `game/Game.tsx`. Wrap lines 298 and 303 in `gems()`. In
`render.ts`'s payout chip, draw the crystal with `drawImage`, using an `Image`
preloaded from `assets/crystal.png`, after each "+{n}", and measure each segment
so the chip still fits. In the mock-only `bridge.ts` messages, write "credits"
instead of ◆. Rebuild with `npm run tower:build`, which writes
`apps/ios/Plotbreak/Resources/tower/tower.html`, then run `npx tsc --noEmit` in
`apps/tower`. The notification body "◆300" cannot show an image and stays.
Acceptance: `grep -rn "◆" apps/tower/src` finds only `gems()` inputs.

### D6. `DeltaKind`

In `Theme/Components.swift:325`, `.resource` goes from "◆" to "●".
Acceptance: `grep -rn "◆" apps/ios/Plotbreak --include='*.swift'` finds only
`Text.crystals` in `Primitives.swift` and catalogue-driven strings.

---

## Not feasible without a product decision

| Gap | Why | Closest feasible version |
|---|---|---|
| Endings found ("1 of 5 found", "You found X", Library Finished rows, End card in play) | No run ever records an ending or completes; the decision touches `runTurnPure` and `ai_contracts.json` | B1a: "N endings" in the story page stats line |
| World sheet "{Character}'s rules" | The rules are prose in the premise; there is no structured field | C2 Open threads (active quests) |
| Story deep link (a share that opens the story) | Needs a web host, an AASA file and Associated Domains | B2: App Store link plus the title and hook |
| Generated role art | Paid generation is out of scope | B4: stage images the stories already ship |
