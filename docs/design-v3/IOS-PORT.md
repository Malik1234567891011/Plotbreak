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
  - the four `◆` strings in tower.* are drawn as the crystal by `Text.crystals`;
    the notification body cannot show an image and still says ◆300.

## Next

The sweep: Search, Library, Create, Pitch, Profile, Tower, World sheet,
onboarding, Prologue, Play.
