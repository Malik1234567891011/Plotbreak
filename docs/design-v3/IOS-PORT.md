# Design v3 in the iOS app: port log

Omar's go-ahead (relayed by plotbreak-1a, 2026-11-22): "apply the design now
please, the whole redesign of the app". Board:
https://claude.ai/artifact/ToYYtSnfTLYqfxH1AnxbBf. Local commits on main, not
pushed (a push deploys the API; Omar approves pushes).

## How screens are checked

- Own simulator "PB Design v3" (iPhone 17 Pro, iOS 26.1), own DerivedData
  (`DERIVED=build/dd-design ./build.sh`), against the local API on :4000.
- Onboarding skipped with `defaults write com.plotbreak.app plotbreak.{ageVerified,onboarded,signInSeen} -bool true`,
  Discord prompt with `plotbreak.discord.joined`.
- `-pbOpen continueStory|pass|wallet|story|setup -pbStory <id>` (Debug only,
  `App/DebugLaunch.swift`) opens one screen without playing paid turns.
- Taps and swipes with `idb ui tap|swipe --udid <udid>`.

Final pass (2026-11-23, after the four gap lanes merged):

- The API on :4000 was a plain `tsx` (no watch) started on 2026-11-22, so it
  predates the lanes and sends none of the new fields. It was left running. A
  second instance from main ran on :4017 with
  `PORT=4017 DATABASE_URL=postgres://localhost/plotbreak_local PLOTBREAK_RELICS=all PLOTBREAK_TOWER=all`
  and no `.env`, so it had no model or image keys (`modelProvider: rule-based`):
  nothing it did could cost money.
- The app was built with xcodebuild directly, passing
  `PLOTBREAK_API_URL=http://localhost:4017 PLOTBREAK_SUPABASE_ANON_KEY=` on the
  command line. Local.xcconfig points Debug at production and turns on
  Supabase; the command line wins over both, and nothing on disk changed.
  Checked with `plutil -extract PLOTBREAK_API_URL raw .../Plotbreak.app/Info.plist`.
- A played run without paid turns: the dev verifier uses a uuid token as the
  user id, so `defaults write com.plotbreak.app plotbreak.token <user uuid>`
  signs the simulator in as a local smoke player (The Last Mimic, 17 turns,
  dialogue with cast speakers). Clear it before running the unit tests:
  `AuthRestoreTests.testEmptyVaultWithoutClientIsDevGuest` reads the same key.
- The real credit wall, quote included, without a model call: choose Apex
  (◆195) with ◆120 and send. The server refuses it at reserve.
- Screenshots: `docs/design-v3/gaps-shots/final-*.png` (not committed).

## Done

| Screen | Commit | Notes |
|---|---|---|
| Foundation | 7fc7443 | Ink palette, type ladder, capsule buttons, no outlines, crystal mark, pack art in Assets.xcassets/Credits |
| Home | 7441f54, 4186d8e | Wordmark image (Kaisei, rendered), search, poster carousel + Play (quick start), Continue rows, Top ranked rows, rails, glass tab bar |
| Pass | fa09f28 | New `SheetRoute.pass`; weekly only; Apple terms visible before the button |
| Credits | d273f71 | Shop grid, one tap per pack opens Apple's sheet; no turn counts |
| Out of credits | ade1f79 | Story art, store pack, one button, quiet free routes; PassCard deleted |
| Turn quality | 7ea6d19 | Tier rows with scene thumbnail on picture tiers; crystal costs, no turns left |
| Home scroll fix | dcd4436 | The header hairline and the "don't swap the shelf mid-read" guard never fired (preference never arrived); now read with onChange |
| Portraits | 004afc5 | Characters rounded squares (24%), you a circle |
| Story page | b4edc44 | Full-width cover, glass back/more, inline stats, Play + like, sans About with Read more, faces rail; comments moved to the more menu; solid bar past the cover |
| Who are you? | 7bac21c | Skip (QuickStart), name + pronouns side by side, 2-column role grid, details under it |
| Tab titles | 1d018d1 | 28pt bold tab titles on a solid ink header; section labels are sentence-case headings, not kickers |
| Library | 911d393 | Round search, 20pt section headings, plain rows (56×84 cover, title, "as X · N turns · date") |
| Create | 78c27fb | "Start from an idea" block with one light button (FAB gone), filled filter chips, plain story rows with a filled status tag |
| Profile | dabf762 | Identity row, balance as a row with Add credits (no turn estimate), relic and badge rows with thumbnails, grouped settings |
| Search | f83895e | Filled capsule field, filled chips, sentence-case headings, result rows |
| Tower lobby | 9b9a281 | `apps/tower` source + rebuilt `tower.html`: SF bold title, five day squares, flat ladder, BEST {floor} tag, round avatar, white Climb; every ◆ is the crystal picture |
| Play chrome | 1dc5096 | Glass back / world-sheet buttons around a glass title capsule; the quality as one line over a paper composer with a round send |
| World sheet | deb49be | The place as the title, chapter · hour above it, round close, Overview without a card. **Also fixes a crash**: opening the sheet aborted the app (`async let` pair, SIGABRT in swift_task_dealloc on iOS 26.1) |
| Pitch | b28cc64 | Plain back, 28pt question, filled pitch box with the count inside, 38pt tone chips, segmented length, radio rows |
| Onboarding | fa1bfe9 | Step dashes top-right, 28pt bold titles, paper fields, a 60pt round next; taste: genres first, check chips, segmented audience, Skip as text; showcase: covers only, page dashes, hook, Play + See all |
| Welcome | 248dd0a | Upright bright cover wall with one scrim, Home's wordmark left-aligned, Apple first as the paper button, Google quiet |

## Gaps, closed 2026-11-23

Built in four lanes from [GAPS-SPEC.md](GAPS-SPEC.md), merged to main, then
checked on a simulator against the board (see the final pass above). Every API
change is additive, and each screen renders as before without the new fields
(a decode test per lane).

| Gap | Commit | Checked on the simulator |
|---|---|---|
| Home Continue row: "as {name} · Turn n · when" and the speaker's face beside the last line | 19589c8 (lane A) | Yes: "as Robin Vale · Turn 17 · 1 day ago", Lirelle's face and line |
| Library rows: the same meta, then the last line or the recap | 19589c8 | Yes |
| Out of credits: the character's last line with their face | 19589c8; 3066a82 | Yes, through the real wall. Fixed in 3066a82: it said "paused at turn 8" for a 17-turn run |
| Story page: "N endings" in the stats line, Share (App Store link with title and hook) | 80529ae (lane B) | Yes: Hush House "9 endings"; the share sheet shows the App Store card |
| Search: Stories / Characters tabs | 80529ae | Yes: "ayame" finds Ayame Kurose, Room 314 · Hush House |
| Who are you?: role tiles with a stage picture each | 80529ae | Yes: the board's four Hush House pictures |
| Play: scene art behind smoked panels, reply cards with pencil and send | 09fb3d3 (lane C) | Yes. Fixed in 1bb5fd6: dialogue now serif 17/28 in paper under an 11pt caps speaker with a 28pt face, quoted once (it drew “ “…” ” round most lines); your line has 20pt corners and your circle |
| World sheet: Now tab (open threads, here now, carrying) | 09fb3d3 | Yes |
| Badges: plain rows, inline progress, crystal rewards | 6a5cfbc (lane D) | Yes. Fixed in 52773f6: the crystal on the white Collect pill was nearly invisible; it is now a silhouette in the text colour |
| Relic vault: one meta line, rarity headings, 8pt cells | 6a5cfbc | Yes, with relics switched on locally. No local player owns a relic, so only locked cells were seen |
| Settings: grouped rows, filled Sign out, no outlines | 6a5cfbc | Yes |
| Onboarding: the birthday on the name step, "1 of 3" | 6a5cfbc; 2af0120 | Yes. 2af0120 puts the board's hint under the name: "They say it out loud. You can pick a different name in any story." |
| Tower: every ◆ in the lobby and game DOM is the crystal | 6a5cfbc | Yes (lobby) |
| `DeltaKind.resource` glyph ● instead of ◆ | 6a5cfbc | Code only; nothing on screen shows that pill |

## Still open

- **Endings found** ("1 of 5 found", the Library's Finished rows, "You found
  X"): no run records an ending or completes, so there is nothing to count.
  Needs a product decision on `runTurnPure`'s output (GAPS-SPEC B1b). The
  story page shows only the authored count.
- **World sheet "{Character}'s rules"**: the rules are prose in each premise,
  with no structured field. Open threads stands in for it.
- **Share that opens the story itself**: needs a web page per story, an AASA
  file and Associated Domains. Share sends the App Store link.
- **Role art made for each role**: paid generation, not planned. The tiles
  use the stages each story already ships.
- **Tower notification** still says ◆300: a notification cannot draw the
  picture.
- **Tower lobby, The Author row**: the crystal on the paper row washes out,
  as it did on the Collect pill. The board draws it the same way; the fix
  (a dark silhouette) would go in `apps/tower`, with a rebuild of `tower.html`.
- **Tower closed and error state** ("The Tower is not open yet.", Try again)
  keeps the game's older blue-black palette and a 14pt-radius button, not ink
  and a capsule. Players reach it only when the Tower is off for them or the
  API is down.
- **Out of credits copy**: the board's tag reads "FIRST PURCHASE · ×2" and the
  line "700 doubled, once"; the app says "FIRST PURCHASE" and "700 +700
  bonus". Money copy, so it waits for Omar. The board's "About 23 turns at
  Vivid" is banned and stays out.
- **Your line in Play** keeps a solid fill rather than the board's glass:
  the grey on glass would lose its contrast over bright stages.

## Board copy through packages/i18n

**Done** (en + fr, exported to `Resources/i18n`). A key used only by the screen
being changed had its value changed in place; a key shared with another screen
got a new key.

- Pass: `pass.headline` (new) "400 credits, every day", replacing the
  credits line and the tagline (`pass.tagline` deleted);
  `pass.perk_daily_v3` (new) "2,800 credits a week" with
  `pass.perk_daily_v3_body` (new) "Paid daily, for as long as you keep it";
  `pass.cta` (in place) "Get the Pass · $2.99 a week". The button keeps
  the price, as on the board, rather than the bare "Get the Pass" this list
  first asked for: the price stays the biggest pricing element for review.
- Credits: `wallet.packs_subtitle` (new) "Bigger packs get a bigger bonus,
  up to +10%." (the 10 is the largest pack bonus, computed);
  `wallet.first_purchase_line` (new) "Doubled on your first purchase";
  `wallet.quests` (new) "Quests"; `wallet.claim` (new) "Claim" on the daily pill.
- Home: `discover.continue_turns_in` (in place) "Turn {count}", so the
  row reads "Turn 3 · 2 h ago". The leading "as Ren" came with lane A
  (`ContinueCard.displayName`, `library.playing_as`).
- Tower card: `tower.card_streak` (in place) has no 🔥; the Swift strip is gone.
- Story page: `story.description_heading` (in place) "About";
  `story.official_byline` (new) "A Plotbreak original" for official stories;
  `story.you_play_as` (new) "You play as {name}, {role}" and
  `story.you_play_as_name` (new) for a world without roles;
  `story.customize_character` (in place) "Change".
- Who are you?: `setup.name_short` (new) "Name"; `setup.archetype_heading`
  (in place) "Your role" (a world's own field label still wins);
  `setup.play_as` (new) "Play as {name}" (`setup.enter` stays for an empty
  name); `setup.subheading` (in place) "Optional. Skip it and you play as
  {name}, {role}." and `setup.subheading_no_role` (new).
- Out of credits: `continue.heading` (in place) "Out of credits";
  `continue.subheading` (in place) "{title} is paused at turn {turn}.
  Nothing is lost."
- Create: `create.empty_title` (in place) "Start from an idea";
  `create.new_story` (in place) "Start a story"; `create.your_stories` (new)
  "Your stories" (`create.title_count` deleted). The block's body is still
  the old, longer sentence; the board's "Write the premise in a few
  lines…" was not on this list.
- Library: `library.section_active` (in place) "PLAYING", shown sentence-cased.
- Onboarding: `onboarding.step_short` (new) "{step} of {total}" beside the
  dashes; `onboarding.genres_title` (in place) "What do you like to read?";
  `onboarding.genres_body` (new) "Pick up to five. Discover opens on these.";
  `onboarding.audience_title` (in place) "Filter by audience?";
  `onboarding.showcase_title` (in place) "Pick your first story.";
  `onboarding.showcase_body` (in place) "You start with ◆600." through
  `Text.crystals` (no turn count).
- Welcome: `misc.sign_in_tagline` (in place, was unused) "Type anything.
  The story answers." under the wordmark; `misc.sign_in_bonus` (in place)
  "Sign up and start with ◆600." through `Text.crystals`.
- The four `◆` strings in tower.* are drawn as the crystal by
  `Text.crystals`; the notification body cannot show an image and still
  says ◆300.
- Onboarding name step: `onboarding.name_hint` (in place) "They say it out
  loud. You can pick a different name in any story." (2af0120).

## Left alone on purpose

Prologue, Chapter card and End card keep their title cards (they sit inside
the story; AUDIT.md says the same).

## Checks

- Pinned headers: Home and the Story page were the two with content under
  a header; both are solid now. Tab headers are solid ink; `ScreenHeader`
  sits above its scroll view. Badges, Relics and Settings checked scrolled.
- Unit tests: 63 pass on the design simulator (`LocalStorePurchaseTests`
  skipped as before). `npm run typecheck` passes; `tsc --noEmit` passes in
  `apps/tower`.
- 2026-11-23, after the gap lanes and the final-pass fixes (2af0120): 116 unit
  tests pass on a fresh "PB gaps final" simulator, `npm run typecheck` and
  `npm test` exit 0.
