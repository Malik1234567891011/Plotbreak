import Foundation
import os

/// Where the app says something went wrong in a way nobody is looking at.
///
/// Not for anything the player should see — those are translated strings on a
/// screen. This is for the failures the app deliberately swallows so play can
/// continue: a keychain write that did not land, a purchase the server could
/// not confirm, a decode that fell back to a default. They are invisible by
/// design, which is precisely why they need somewhere to be found.
///
/// Read it with:
///   xcrun simctl spawn booted log stream --predicate 'subsystem == "com.plotbreak.app"'
enum Diagnostics {
    private static let logger = Logger(subsystem: "com.plotbreak.app", category: "diagnostics")

    static func log(_ message: String) {
        logger.error("\(message, privacy: .public)")
        #if DEBUG
        // i18n-exempt: the Xcode console prefix, not copy
        print("[plotbreak] \(message)")
        #endif
    }
}
