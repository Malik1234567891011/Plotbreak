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
- Board copy through packages/i18n: **done** (en + fr, exported to
  `Resources/i18n`). A key used only by the screen being changed had its value
  changed in place; a key shared with another screen got a new key.
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
    row reads "Turn 3 · 2 h ago". The board's leading "as Ren" still needs
    the name on `ContinueCard` (backend); `library.playing_as` is the key for it.
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
