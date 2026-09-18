import SwiftUI
import UIKit

// MARK: - Swipe back
//
// Every screen draws its own header and hides the navigation bar (`Screen`,
// and the session's hidden back button), and with the bar goes the swipe from
// the left edge that leaves a screen. This turns it back on for anything
// pushed onto the stack — a story's page, the session — so leaving is a swipe
// as well as a tap on the chevron.
//
// Applied as each pushed screen appears, from inside the screen, because that
// is the one place the stack it was pushed onto can be found from SwiftUI.

extension View {
    /// Lets this pushed screen be left with a swipe from the left edge.
    func swipeBackEnabled() -> some View {
        background(SwipeBackEnabler())
    }
}

private struct SwipeBackEnabler: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> Probe { Probe() }
    func updateUIViewController(_ controller: Probe, context: Context) {}

    /// Sits in the pushed screen only to find the stack it was pushed onto.
    final class Probe: UIViewController {
        override func viewDidLoad() {
            super.viewDidLoad()
            view.isUserInteractionEnabled = false
        }

        override func viewDidAppear(_ animated: Bool) {
            super.viewDidAppear(animated)
            guard let gesture = navigationController?.interactivePopGestureRecognizer else { return }
            gesture.delegate = SwipeBackDelegate.shared
            gesture.isEnabled = true
        }
    }
}

/// One for the app: the gesture holds its delegate weakly, so a delegate owned
/// by a screen would vanish with it and leave the root swipeable.
private final class SwipeBackDelegate: NSObject, UIGestureRecognizerDelegate {
    static let shared = SwipeBackDelegate()

    func gestureRecognizerShouldBegin(_ gesture: UIGestureRecognizer) -> Bool {
        guard let stack = gesture.view?.next as? UINavigationController else { return false }
        // Nothing to go back to at the root; and a swipe that starts while a
        // push is still animating freezes the stack.
        return stack.viewControllers.count > 1 && stack.transitionCoordinator == nil
    }

    /// Scrolling waits for the edge swipe, as it does under UIKit's own
    /// delegate, which this one replaces. A touch that does not start at the
    /// edge fails the swipe at once, so scrolling anywhere else waits for
    /// nothing.
    func gestureRecognizer(_ gesture: UIGestureRecognizer, shouldBeRequiredToFailBy other: UIGestureRecognizer) -> Bool {
        other.view is UIScrollView
    }
}
