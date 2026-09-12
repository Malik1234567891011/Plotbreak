# Porting the React Native app to SwiftUI

`apps/ios` is the native Swift twin of `apps/mobile`. The backend (engine,
director, API) is unchanged; this app talks to the same `/v1` surface.

## Build

```sh
cd apps/ios
./build.sh                  # regenerates the project with xcodegen, builds for the simulator, prints only errors
DERIVED=build/dd-mine ./build.sh   # a private DerivedData path when several builds run at once
open Plotbreak.xcodeproj    # Debug talks to http://localhost:4000 (`npm run api` at the repo root)
```

`project.yml` is the source of truth for the project; the `.xcodeproj` is
generated from it (and committed so Xcode opens without xcodegen). Any new
`.swift` file under `Plotbreak/` is picked up on the next `xcodegen generate`,
which `build.sh` runs for you.

Requirements: Xcode 16+, iOS 17 deployment target, Swift 5 language mode.

## Layout

| Folder | What | Twin of |
|---|---|---|
| `Models/Models.swift` | Every contract type, `Codable`, lenient | `packages/contracts/src/api` |
| `Networking/APIClient.swift` | `actor APIClient` — every `/v1` call, SSE turn stream | `apps/mobile/src/api/client.ts` |
| `Auth/Auth.swift` | Keychain, GoTrue REST client, `actor AuthStore` | `apps/mobile/src/auth/*` |
| `State/AppStore.swift` | `@Observable AppStore` — identity, wallet, onboarding, locale, drafts | `apps/mobile/src/state/store.tsx` |
| `Store/Purchases.swift` | StoreKit 2 purchases, server-verified | `apps/mobile/src/store/purchases.ts` |
| `I18n/Translator.swift` | `Translator`, ICU subset, `Format` (numbers, credits, dates) | `@plotbreak/i18n` |
| `Theme/Theme.swift` | Colours, spacing, radii, type scale, haptics | `packages/ui/src/tokens.ts` |
| `Theme/Primitives.swift` | `Txt`, `PBButton`, `IconButton`, `Card`, `Chip`, `EmptyState`, `Skeleton`, `SectionHeader`, `ScreenHeader`, `Screen`, `RemoteImage` | `packages/ui/src/primitives.tsx` |
| `Theme/Components.swift` | `StoryCoverCard`, `StoryArt`, `CharacterPortrait`, `DialogueBlock`, `NarrationBlock`, `StateDeltaChip/Row`, `ActionSuggestion`, `QualityPill`, `CheckReveal`, `ObjectiveStrip`, `CreditBalance`, `ResourceBar`, `InlineError` | `packages/ui/src/components.tsx` |
| `App/Router.swift` | `Router` (push/sheet), `RootView` (onboarding gate), tabs | `apps/mobile/src/navigation.tsx` |
| `Screens/<Area>/` | One folder per RN screen file | `apps/mobile/src/screens/*.tsx` |
| `Resources/i18n/*.json` | The catalogue, exported by `scripts/export-catalog.mjs` | `packages/i18n/src/catalog` |

## Conventions inside a screen

```swift
struct DiscoverScreen: View {
    @Environment(AppStore.self) private var store     // identity, wallet, locale, bootstrap
    @Environment(Router.self) private var router      // router.push(.storyDetail(storyId:)), router.present(.wallet(shortfall:)), router.pop(), router.dismissSheet()
    @Environment(\.translator) private var t          // t("discover.search_worlds"), t("characters.story_and_turns", ["title": title, "count": n])
    @State private var model: DiscoverResponse?

    var body: some View {
        Screen {                                        // app background + hidden nav bar
            ScrollView { ... }
        }
        .task { await load() }
    }

    private func load() async {
        do { model = try await store.api.discover(tastes: store.tastes) }
        catch { errorMessage = error.playerMessage }
    }
}
```

- **Strings come from the catalogue.** Every visible string is `t("key")`.
  The RN screen you are porting already uses the same keys via `useT()`; keep
  them. Check a key exists with `grep '"the.key"' Plotbreak/Resources/i18n/en.json`.
  ICU arguments are passed as a dictionary: `t("x.y", ["count": 3, "name": name])`.
- **Locale-aware numbers** go through `Format.credits(_:compact:locale:)`,
  `Format.number`, `Format.date`, `Format.relative`. Use `store.locale`.
- **Images:** `RemoteImage(url.assetURL)`; `String.assetURL` resolves paths the
  server sends relative to the API base.
- **Errors:** `error.playerMessage` is already in the player's language.
  `APIError` exposes `isInsufficientCredits`, `shortfall`, `isStaleRevision`,
  `isOffline`.
- **Sheets vs pushes:** pushes are `Route` (story detail, character setup,
  session); everything else is a `SheetRoute` presented with `router.present`.
  A sheet closes itself with `router.dismissSheet()`. Every screen draws its own
  header with `ScreenHeader`.
- **Haptics:** `Haptic.play(.light)` etc. `PBButton` and `Chip` already do it.
- **Text:** `Txt("...", .h2, color: Theme.Colors.textSecondary)`. Variants:
  `.display .h1 .h2 .h3 .body .bodyStrong .bodyCompact .caption .micro`.
  Narration is `Txt(text, .body, serif: true)` or `NarrationBlock`.
- **Colours:** only `Theme.Colors.*`. Spacing: `Theme.Spacing.*`. Radii: `Theme.Radius.*`.
- **Do not edit the foundation files** (Models, APIClient, Auth, AppStore,
  Purchases, Translator, Theme, Primitives, Components, Router) while several
  screens are being ported in parallel. If you need a helper, add a `private`
  extension in your own screen file and note the gap in your report. If the
  API client is missing an endpoint the RN screen calls, add it as an
  `extension APIClient` in your screen file and say so.
- **Delete your stub.** Each `Screens/<Area>/Stub<Area>.swift` declares the
  placeholder views for that area; remove the file once the real views exist
  with the same names and initialisers (see `App/Router.swift` for the call sites).

## Verifying

`./build.sh` must print `BUILD SUCCEEDED`. To see a screen, run `npm run api`
at the repo root, open the project in Xcode and run on an iPhone simulator; a
Debug build is a device-local guest against `localhost:4000`. Set
`PLOTBREAK_SUPABASE_ANON_KEY` in `Plotbreak/Config/Local.xcconfig` (copied from
`apps/mobile/.env`) to get real Supabase auth and Sign in with Apple.
