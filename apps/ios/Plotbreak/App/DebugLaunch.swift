#if DEBUG
import SwiftUI

// MARK: - Screenshot hook (Debug builds only)
//
// Opens one screen on launch so a design check can screenshot it without
// playing turns that cost model calls:
//
//   xcrun simctl launch <udid> com.plotbreak.app -pbOpen continueStory -pbStory <storyId>
//
// `pbOpen`: continueStory, pass, wallet, story, setup. `pbStory` is the story
// the story page, setup and the out-of-credits screen use. Compiled out of
// Release, so it can never reach a player.

extension View {
    func debugLaunchScreen(_ router: Router) -> some View {
        task {
            let defaults = UserDefaults.standard
            guard let open = defaults.string(forKey: "pbOpen") else { return }
            let storyId = defaults.string(forKey: "pbStory") ?? ""
            try? await Task.sleep(nanoseconds: 1_200_000_000)
            switch open {
            case "continueStory":
                router.present(.continueStory(sessionId: "debug", storyId: storyId,
                                              storyTitle: defaults.string(forKey: "pbTitle") ?? "Hush House",
                                              shortfall: 60, turnsPlayed: 4))
            case "pass": router.present(.pass)
            case "wallet": router.present(.wallet(shortfall: nil))
            case "story": router.push(.storyDetail(storyId: storyId))
            case "setup": router.push(.characterSetup(storyId: storyId))
            default: break
            }
        }
    }
}
#endif
