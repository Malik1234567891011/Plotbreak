import SwiftUI

// MARK: - Router
//
// Spec §5 — information architecture. Three root tabs outside a session; a
// dedicated immersive shell inside one, with the tab bar hidden (§5.1).
// Scoped tasks are sheets (§25.10). Twin of `apps/mobile/src/navigation.tsx`.

enum Tab: Hashable, CaseIterable {
    case discover, library, profile

    var glyph: String {
        switch self {
        case .discover: return "◈"
        case .library: return "▤"
        case .profile: return "◉"
        }
    }

    var labelKey: TranslationKey {
        switch self {
        case .discover: return "nav.discover"
        case .library: return "nav.library"
        case .profile: return "nav.profile"
        }
    }
}

/// Pushed destinations (slide from right; Session fades and cannot be swiped back).
enum Route: Hashable {
    case storyDetail(storyId: String)
    case characterSetup(storyId: String)
    case session(sessionId: String)
}

/// Modal destinations.
enum SheetRoute: Identifiable, Hashable {
    case search
    case worldSheet(sessionId: String, tab: String?)
    case wallet(shortfall: Int?)
    case signIn
    case create
    /// SH-01 — everything the card needs is passed in, so it composes offline.
    case share(storyTitle: String, actionText: String?, sceneText: String, heroImageUrl: String?, displayName: String?)
    case report(targetType: String, targetId: String)
    case reportHistory
    case characters
    case badges
    case settings
    case personalization
    case myInformation
    case comments(storyId: String)

    var id: String {
        switch self {
        case .search: return "search"
        case .worldSheet(let sessionId, let tab): return "worldSheet:\(sessionId):\(tab ?? "")"
        case .wallet(let shortfall): return "wallet:\(shortfall ?? 0)"
        case .signIn: return "signIn"
        case .create: return "create"
        case .share(let title, _, _, _, _): return "share:\(title)"
        case .report(let type, let id): return "report:\(type):\(id)"
        case .reportHistory: return "reportHistory"
        case .characters: return "characters"
        case .badges: return "badges"
        case .settings: return "settings"
        case .personalization: return "personalization"
        case .myInformation: return "myInformation"
        case .comments(let storyId): return "comments:\(storyId)"
        }
    }
}

@MainActor
@Observable
final class Router {
    var tab: Tab = .discover
    var path: [Route] = []
    var sheet: SheetRoute?
    /// A second sheet stacked on the first (e.g. Wallet over Session's WorldSheet).
    var stackedSheet: SheetRoute?

    func push(_ route: Route) {
        path.append(route)
    }

    func pop() {
        _ = path.popLast()
    }

    func popToRoot() {
        path.removeAll()
    }

    func present(_ route: SheetRoute) {
        if sheet == nil {
            sheet = route
        } else {
            stackedSheet = route
        }
    }

    func dismissSheet() {
        if stackedSheet != nil {
            stackedSheet = nil
        } else {
            sheet = nil
        }
    }

    /// Leaves a session for the world's detail page, or the tabs.
    func exitSession() {
        if let index = path.lastIndex(where: { if case .session = $0 { return true } else { return false } }) {
            path.removeSubrange(index...)
        } else {
            popToRoot()
        }
    }

    /// Replaces the setup screen with the session it created.
    func replaceTopWithSession(_ sessionId: String) {
        _ = path.popLast()
        path.append(.session(sessionId: sessionId))
    }
}

// MARK: - Root

struct RootView: View {
    @Environment(AppStore.self) private var store
    @State private var router = Router()
    @State private var tasteDone = false
    @State private var showcaseDone = false
    @State private var openStoryId: String?

    var body: some View {
        Group {
            if !store.ready {
                // OB-01 — no artificial delay. The splash is the launch
                // screen's logo, continued; it lasts exactly as long as boot,
                // which no longer waits on the network.
                SplashScreen()
            } else if !store.ageVerified {
                // OB-02 — before any personalized content.
                AgeGateScreen()
            } else if store.onboardingComplete, !(tasteDone || store.onboarded) {
                // OB-03 — optional and skippable.
                TasteScreen(onDone: { tasteDone = true })
            } else if store.onboardingComplete, !(showcaseDone || store.onboarded) {
                // OB-04 — five worlds and a way in.
                ShowcaseScreen(
                    onSeeAll: finishOnboarding,
                    onOpen: { storyId in
                        openStoryId = storyId
                        finishOnboarding()
                    }
                )
            } else {
                MainShell()
                    .environment(router)
                    .onAppear {
                        if let storyId = openStoryId {
                            router.push(.storyDetail(storyId: storyId))
                            openStoryId = nil
                        }
                    }
            }
        }
        .environment(\.translator, store.t)
        .background(Theme.Colors.bgBase.ignoresSafeArea())
    }

    private func finishOnboarding() {
        showcaseDone = true
        store.completeOnboarding()
    }
}

// MARK: - Main shell

struct MainShell: View {
    @Environment(AppStore.self) private var store
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    var body: some View {
        @Bindable var router = router
        NavigationStack(path: $router.path) {
            TabBarShell()
                .navigationDestination(for: Route.self) { route in
                    destination(route)
                }
        }
        .tint(Theme.Colors.accentPrimary)
        .sheet(item: $router.sheet) { route in
            SheetHost(route: route)
                .environment(router)
                .environment(store)
                .environment(\.translator, store.t)
                .sheet(item: $router.stackedSheet) { stacked in
                    SheetHost(route: stacked)
                        .environment(router)
                        .environment(store)
                        .environment(\.translator, store.t)
                }
        }
    }

    @ViewBuilder
    private func destination(_ route: Route) -> some View {
        switch route {
        case .storyDetail(let storyId):
            StoryDetailScreen(storyId: storyId)
        case .characterSetup(let storyId):
            CharacterSetupScreen(storyId: storyId)
        case .session(let sessionId):
            SessionScreen(sessionId: sessionId)
                .navigationBarBackButtonHidden(true)
                .interactiveDismissDisabled()
        }
    }
}

/// Hosts a modal route. Sheets draw their own headers.
struct SheetHost: View {
    let route: SheetRoute

    var body: some View {
        Group {
            switch route {
            case .search: SearchScreen()
            case .worldSheet(let sessionId, let tab): WorldSheetScreen(sessionId: sessionId, initialTab: tab)
            case .wallet(let shortfall): WalletScreen(shortfall: shortfall)
            case .signIn: SignInScreen()
            case .create: CreateScreen()
            case .share(let title, let action, let scene, let hero, let name):
                ShareScreen(storyTitle: title, actionText: action, sceneText: scene, heroImageUrl: hero, displayName: name)
            case .report(let type, let id): ReportScreen(targetType: type, targetId: id)
            case .reportHistory: ReportHistoryScreen()
            case .characters: CharactersScreen()
            case .badges: BadgesScreen()
            case .settings: SettingsScreen()
            case .personalization: PersonalizationScreen()
            case .myInformation: MyInformationScreen()
            case .comments(let storyId): CommentsScreen(storyId: storyId)
            }
        }
        .preferredColorScheme(.dark)
        .presentationBackground(Theme.Colors.bgBase)
    }
}

// MARK: - Tabs

struct TabBarShell: View {
    @Environment(Router.self) private var router
    @Environment(\.translator) private var t

    var body: some View {
        @Bindable var router = router
        VStack(spacing: 0) {
            Group {
                switch router.tab {
                case .discover: DiscoverScreen()
                case .library: LibraryScreen()
                case .profile: ProfileScreen()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)

            // Spec §27.2 — the bar clears the home indicator.
            HStack {
                ForEach(Tab.allCases, id: \.self) { tab in
                    let selected = router.tab == tab
                    Button {
                        Haptic.play(.light)
                        router.tab = tab
                    } label: {
                        VStack(spacing: 2) {
                            Text(tab.glyph).font(Theme.TypeStyle.h3.font())
                            Text(t(tab.labelKey)).font(.system(size: 11, weight: .medium))
                        }
                        .foregroundStyle(selected ? Theme.Colors.accentPrimary : Theme.Colors.textMuted)
                        .frame(maxWidth: .infinity, minHeight: 50)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(PressOpacityStyle())
                    .accessibilityLabel(t(tab.labelKey))
                    .accessibilityAddTraits(selected ? [.isSelected, .isButton] : .isButton)
                }
            }
            .padding(.top, Theme.Spacing.sm)
            .background(Theme.Colors.bgElevated)
            .overlay(alignment: .top) { PBDivider() }
        }
        .background(Theme.Colors.bgBase.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }
}
