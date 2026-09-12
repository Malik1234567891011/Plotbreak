import SwiftUI

// MARK: - Context strip
//
// Mechanics, only when they are the thing the player is deciding about. The
// rule: a number has to be load-bearing for the *next* decision or it does not
// appear, and where fiction can carry it, fiction does.

struct SessionContextStrip: View {
    let scene: SessionSceneState
    @Environment(\.translator) private var t
    @Environment(AppStore.self) private var store

    /// A resource only "fails" if it has fallen: some worlds open one low on
    /// purpose because earning it is the story.
    private var failing: [SceneResource] {
        Array(scene.resources.filter { resource in
            resource.polarity == .GOOD_HIGH
                && resource.max > 0
                && resource.current / resource.max <= 0.25
                && resource.current < (resource.start ?? resource.max)
        }.prefix(2))
    }

    var body: some View {
        // A match has a score and a clock, and during one they are the whole point.
        if let contest = scene.contest, !contest.finished {
            HStack {
                Txt("\(Format.number(contest.playerScore, locale: store.locale))–\(Format.number(contest.opponentScore, locale: store.locale))", .bodyStrong)
                Spacer()
                Txt(contest.opponentName, .caption, color: Theme.Colors.textSecondary)
            }
            .padding(.horizontal, Theme.gutter)
            .padding(.bottom, Theme.Spacing.sm)
        } else if !failing.isEmpty {
            // Otherwise: only what is nearly gone, said as a state of the body.
            FlowLayout(spacing: Theme.Spacing.sm) {
                ForEach(failing) { resource in
                    Chip(t("session.resource_nearly_gone", ["name": resource.name]), tone: .warning)
                }
            }
            .padding(.horizontal, Theme.gutter)
            .padding(.bottom, Theme.Spacing.sm)
        }
    }
}

// MARK: - Stage (§10.2 B)
//
// Environment art, the cast on the floor of the frame, the player's own slot,
// and the HUD on a gradient scrim. The RN screen keeps this component but no
// longer mounts it — the story, the character reacting and the composer are
// what the player needs in front of them; resources, objective, cast and
// location live in the World Sheet. Ported so the choice stays reversible.

/// "Dai, Kai and Coach Torakawa" — for the stage's one accessible label.
func namesInWords(_ t: Translator, _ names: [String]) -> String {
    if names.count <= 1 { return names.first ?? "" }
    return t("session.name_list", ["others": names.dropLast().joined(separator: ", "), "last": names.last ?? ""])
}

/// How a crew member's mood reads on the stage. The words come from the
/// engine; this is only the colour.
func crewMoodTone(_ mood: String) -> ChipTone {
    switch mood {
    case "with you": return .success
    case "steady": return .neutral
    case "restless", "unhappy": return .warning
    case "about to walk": return .danger
    default: return .neutral
    }
}

struct SessionStage: View {
    let scene: SessionSceneState
    let sessionId: String
    let playerPortraitUrl: String?
    /// 35–48% of *usable* height, measured by the caller.
    let usableHeight: CGFloat
    let onOpenPortrait: () -> Void
    @Environment(\.translator) private var t
    @Environment(Router.self) private var router
    @Environment(AppStore.self) private var store

    private var stageHeight: CGFloat { (max(240, min(usableHeight * 0.4, 380))).rounded() }
    private var playerSlotWidth: CGFloat { max(56, min(76, (stageHeight - 170) / 1.25)) }
    private var portraitSize: CGFloat { min(96, (stageHeight - 150) / 1.25) }

    private var presenceLabel: String {
        if scene.presentCharacters.isEmpty { return t("session.nobody_else_here") }
        return t("session.present", ["names": namesInWords(t, scene.presentCharacters.map(\.name))])
    }

    var body: some View {
        ZStack(alignment: .bottom) {
            StoryArt(seed: scene.locationId, title: scene.locationName, uri: scene.stageImage)

            // Characters stand on the floor of the frame, above the HUD. The
            // stage carries at most three portraits.
            HStack(alignment: .bottom, spacing: Theme.Spacing.md) {
                ForEach(scene.presentCharacters.prefix(3)) { character in
                    CharacterPortrait(
                        name: character.name,
                        uri: character.reactionUrl ?? character.portrait,
                        size: portraitSize,
                        speaking: character.speaking,
                        expression: character.reactionEmotion ?? character.expression
                    )
                }
                Spacer(minLength: 0)

                // You, in the scene. Tapping opens the portrait sheet, which is
                // also where an unset one gets drawn.
                Button(action: onOpenPortrait) {
                    if let playerPortraitUrl {
                        CharacterPortrait(name: t("session.you"), uri: playerPortraitUrl, size: playerSlotWidth)
                    } else {
                        VStack(spacing: 2) {
                            Txt("+", .h3, color: Theme.Colors.textSecondary)
                            Txt(t("session.draw_yourself"), .micro, color: Theme.Colors.textSecondary, center: true, lineLimit: 2)
                        }
                        .padding(.horizontal, Theme.Spacing.xs)
                        .frame(width: playerSlotWidth, height: playerSlotWidth * 1.25)
                        .background(Theme.Colors.bgBase.opacity(0.82), in: RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous))
                        .overlay {
                            RoundedRectangle(cornerRadius: Theme.Radius.card, style: .continuous)
                                .strokeBorder(Theme.Colors.textSecondary, style: StrokeStyle(lineWidth: 1, dash: [4, 3]))
                        }
                    }
                }
                .buttonStyle(PressOpacityStyle())
                .accessibilityLabel(playerPortraitUrl == nil ? t("session.draw_your_character_a11y") : t("session.your_character_a11y"))
            }
            .padding(.horizontal, Theme.gutter)
            .padding(.bottom, 96)

            // Scrim: generated art is unpredictable, so the HUD brings its own contrast.
            LinearGradient(
                stops: [
                    .init(color: .clear, location: 0),
                    .init(color: Theme.Colors.bgBase.opacity(0.55), location: 0.55),
                    .init(color: Theme.Colors.bgBase.opacity(0.95), location: 1),
                ],
                startPoint: .top, endPoint: .bottom
            )
            .frame(height: 150)
            .allowsHitTesting(false)

            VStack(alignment: .leading, spacing: Theme.Spacing.md) {
                FlowLayout(spacing: Theme.Spacing.xl) {
                    ForEach(scene.resources) { resource in
                        ResourceBar(name: resource.name, current: resource.current, max: resource.max,
                                    color: resource.color, polarity: resource.polarity, locale: store.locale)
                            .frame(width: 140)
                    }
                }
                if let objective = scene.objective, !objective.isEmpty {
                    ObjectiveStrip(objective: objective) {
                        router.present(.worldSheet(sessionId: sessionId, tab: "quests"))
                    }
                }
                // Who is with you, and how that is going. A word, not a bar.
                if !scene.crew.isEmpty {
                    FlowLayout(spacing: Theme.Spacing.sm) {
                        ForEach(scene.crew) { member in
                            Chip(t("session.crew_member", ["name": member.name, "mood": member.mood]), tone: crewMoodTone(member.mood))
                        }
                    }
                }
            }
            .padding(Theme.gutter)
            .frame(maxWidth: .infinity, alignment: .leading)
            .accessibilityElement(children: .combine)
            .accessibilityLabel(t("session.stage_a11y", ["location": scene.locationName, "presence": presenceLabel]))
        }
        .overlay(alignment: .top) {
            // Encounter HUD — qualitative only, never over the character art (§13.4).
            if let encounter = scene.encounter {
                Chip(encounter.objective, tone: .danger)
                    .padding(.horizontal, Theme.gutter)
                    .padding(.top, Theme.Spacing.md)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }
        }
        .frame(height: stageHeight)
        .background(Theme.Colors.bgElevated)
        .clipped()
    }
}
