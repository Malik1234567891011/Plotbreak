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

## Not matched (needs data or copy)

- Continue rows: the board shows "as Ren" and the speaker's face beside the
  last line. `ContinueCard` has neither; it shows turns-in, time and
  `recapLine`. Backend change.
- Out of credits: the board's character quote at the top needs the session's
  last line and speaker; the screen only gets ids and the title.
- Story page: no endings data in `StoryDetailResponse` (the board's 1-of-5
  endings row is skipped), and no share link for a story (no share button).
- Who are you?: the board's role tiles have a picture each; `SetupArchetype`
  has no image, so the tiles are text only.
- Play: the board's full-screen scene art behind smoked story panels, and
  the editable reply cards with », are a larger change to the feed; only
  the chrome (header, quality line, composer) is ported.
- World sheet: the board's Now tab (the character's rules, Here now with
  faces, You are carrying) mixes data from the People and Inventory tabs;
  the Overview tab keeps its own sections. The other tabs are unchanged.
- Onboarding: the board puts the birthday on the name step; the app keeps
  it as its own step (a flow change, not a visual one).
- Badges, Relic vault and Settings are not on the board. They keep the old
  look (boxed badge rows; relic tiers as a coloured kicker with a rule).
- Tower: two ◆ are drawn as canvas text inside the game itself
  (`apps/tower/src/game/*.ts`); left alone.
- `DeltaKind.resource` still uses ◆ as its glyph, but nothing on screen
  shows that pill today.
- Copy that needs new keys in packages/i18n (plotbreak-1a adds them):
  - `pass.headline` "400 credits, every day" (now "400 credits" + tagline)
  - `pass.perk_daily_v3` "2,800 credits a week" / "Paid daily, for as long as you keep it"
  - `pass.cta_short` "Get the Pass" (now "Get the Pass · $2.99/week")
  - `wallet.packs_subtitle` "Bigger packs get a bigger bonus, up to +10%."
  - `wallet.first_purchase_line` "Doubled on your first purchase" (now "+700 bonus")
  - `wallet.quests` "Quests" (now "Badges")
  - `wallet.claim` "Claim" (the daily pill shows "+300")
  - `discover.continue_meta` "as {name} · Turn {n} · {when}"
  - `tower.card_streak` without the 🔥 (stripped in Swift for now)
  - `story.about_heading` "About" (now "Description"), `story.official_byline`
    "A Plotbreak original" (now "by Plotbreak Studios"), `story.you_play_as`
    "You play as {name}, {role}" (now "as Ren · Night Shift"),
    `story.change` "Change" (now "Customize character")
  - `setup.name_short` "Name", `setup.role_heading` "Your role",
    `setup.play_as` "Play as {name}" (now "Enter"),
    `setup.subheading_optional` "Optional. Skip it and you play as {name}, {role}."
  - `continue.heading_v3` "Out of credits", `continue.paused` "{title} is paused at turn {turn}. Nothing is lost."
  - `create.start_heading` "Start from an idea" (now "Make a world"),
    `create.start_story` "Start a story", `create.your_stories` "Your stories"
  - `library.section_playing` "Playing" (now "Active")
  - `onboarding.step_short` "{step} of {total}" (the board's counter beside
    the step dashes; the dashes show alone for now)
  - `onboarding.genres_title` "What do you like to read?" (now "Choose
    genres you are interested in"), `onboarding.genres_body` "Pick up to
    five. Discover opens on these.", `onboarding.audience_title` "Filter by
    audience?" (now "Want to filter by audience?")
  - `onboarding.showcase_title` "Pick your first story." (now "All set!
    Choose a title and play now."), `onboarding.showcase_body` "You start
    with ◆600." (the board's "about ten turns" is a turn count; left out)
  - `misc.sign_in_tagline` "Type anything. The story answers.",
    `misc.sign_in_bonus` "Sign up and start with ◆600." (now "Sign up and get
    600 credits!"; a ◆ in it needs `Text.crystals`)
  - the four `◆` strings in tower.* are drawn as the crystal by `Text.crystals`;
    the notification body cannot show an image and still says ◆300.

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
