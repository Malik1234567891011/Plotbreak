import SwiftUI

// MARK: - Builder fields
//
// The field types the builder is made of, each with the Auto-generate button
// beside its label rather than under it — the button belongs to the field, and
// a creator scanning a long form should be able to see which fields can write
// themselves without reading any of them.

/// A label, an optional Auto-generate, and an optional counter. Every field uses it.
struct FieldHeader: View {
    let label: String
    var required: Bool = false
    var help: String? = nil
    var assist: AssistTarget? = nil
    var assistIndex: Int? = nil
    var model: BuilderModel? = nil

    @Environment(\.translator) private var t

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 6) {
                HStack(spacing: 2) {
                    SectionLabel(label)
                    if required {
                        Text("*").font(.system(size: 11, weight: .bold)).foregroundStyle(Theme.Colors.accentPrimary)
                    }
                }
                Spacer(minLength: Theme.Spacing.sm)
                if let assist, let model {
                    AutoGenerateButton(model: model, target: assist, index: assistIndex)
                }
            }
            if let help {
                Txt(help, .micro, color: Theme.Colors.textMuted)
            }
        }
    }
}

/// OOC's yellow Auto-generate, which is the single best thing in their builder.
struct AutoGenerateButton: View {
    let model: BuilderModel
    let target: AssistTarget
    var index: Int? = nil

    @Environment(\.translator) private var t

    private var running: Bool { model.isAssisting(target, index) }

    var body: some View {
        Button {
            Haptic.play(.light)
            Task { await model.assist(target, index: index) }
        } label: {
            HStack(spacing: 4) {
                if running {
                    ProgressView().controlSize(.mini).tint(Theme.Colors.accentPrimary)
                } else {
                    Image(systemName: "sparkles").font(.system(size: 11, weight: .semibold))
                }
                Text(t(running ? "create.writing" : "create.auto_generate"))
                    .font(.system(size: 12, weight: .medium))
            }
            .foregroundStyle(Theme.Colors.accentPrimary)
            .padding(.horizontal, 10)
            .padding(.vertical, 5)
            .overlay {
                Capsule().strokeBorder(Theme.Colors.accentPrimary.opacity(0.55), lineWidth: 1)
            }
        }
        .buttonStyle(PressOpacityStyle())
        .disabled(model.busy)
        .opacity(model.busy && !running ? 0.4 : 1)
        .accessibilityLabel(t("create.auto_generate"))
    }
}

/// One line of text.
struct BuilderTextField: View {
    let label: String
    var required: Bool = false
    var help: String? = nil
    var placeholder: String = ""
    var limit: Int? = nil
    var assist: AssistTarget? = nil
    var assistIndex: Int? = nil
    var model: BuilderModel? = nil
    @Binding var text: String

    @FocusState private var focused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            FieldHeader(label: label, required: required, help: help, assist: assist, assistIndex: assistIndex, model: model)
            TextField(placeholder, text: $text)
                .focused($focused)
                .font(Theme.TypeStyle.body.font())
                .foregroundStyle(Theme.Colors.textPrimary)
                .fieldStyle(focused: focused)
            if let limit {
                HStack {
                    Spacer()
                    Txt("\(text.count)/\(limit)", .micro,
                        color: text.count > limit ? Theme.Colors.danger : Theme.Colors.textMuted)
                }
            }
        }
    }
}

/// A paragraph. The workhorse: premise, tone, opening, every character field.
struct BuilderTextArea: View {
    let label: String
    var required: Bool = false
    var help: String? = nil
    var placeholder: String = ""
    var minHeight: CGFloat = 110
    var limit: Int? = nil
    var assist: AssistTarget? = nil
    var assistIndex: Int? = nil
    var model: BuilderModel? = nil
    @Binding var text: String

    @FocusState private var focused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            FieldHeader(label: label, required: required, help: help, assist: assist, assistIndex: assistIndex, model: model)
            TextEditor(text: $text)
                .focused($focused)
                .scrollContentBackground(.hidden)
                .font(Theme.TypeStyle.body.font())
                .foregroundStyle(Theme.Colors.textPrimary)
                .frame(minHeight: minHeight)
                .padding(Theme.Spacing.md)
                .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
                .overlay {
                    RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                        .strokeBorder(focused ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: focused ? 1 : 0.5)
                }
                .overlay(alignment: .topLeading) {
                    if text.isEmpty && !placeholder.isEmpty {
                        Txt(placeholder, .body, color: Theme.Colors.textMuted)
                            .padding(.horizontal, Theme.Spacing.md + 5)
                            .padding(.top, Theme.Spacing.md + 8)
                            .allowsHitTesting(false)
                    }
                }
            if let limit {
                HStack {
                    Spacer()
                    Txt("\(text.count)/\(limit)", .micro,
                        color: text.count > limit ? Theme.Colors.danger : Theme.Colors.textMuted)
                }
            }
        }
    }
}

/// A list of short lines — hard canon, traits, secrets, suggestions.
///
/// Edited as one multi-line string with a line per entry, because that is how a
/// person types a list, and because a row of text fields with their own add and
/// remove buttons is five taps to do what a newline does.
struct BuilderLineList: View {
    let label: String
    var help: String? = nil
    var placeholder: String = ""
    var minHeight: CGFloat = 96
    var assist: AssistTarget? = nil
    var assistIndex: Int? = nil
    var model: BuilderModel? = nil
    let lines: [String]
    var onCommit: ([String]) -> Void

    @State private var text: String = ""
    @State private var loaded = false
    @FocusState private var focused: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            FieldHeader(label: label, help: help, assist: assist, assistIndex: assistIndex, model: model)
            TextEditor(text: $text)
                .focused($focused)
                .scrollContentBackground(.hidden)
                .font(Theme.TypeStyle.bodyCompact.font())
                .foregroundStyle(Theme.Colors.textPrimary)
                .frame(minHeight: minHeight)
                .padding(Theme.Spacing.md)
                .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
                .overlay {
                    RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                        .strokeBorder(focused ? Theme.Colors.accentPrimary : Theme.Colors.borderSubtle, lineWidth: focused ? 1 : 0.5)
                }
                .overlay(alignment: .topLeading) {
                    if text.isEmpty && !placeholder.isEmpty {
                        Txt(placeholder, .bodyCompact, color: Theme.Colors.textMuted)
                            .padding(.horizontal, Theme.Spacing.md + 5)
                            .padding(.top, Theme.Spacing.md + 8)
                            .allowsHitTesting(false)
                    }
                }
                .onChange(of: focused) { _, isFocused in
                    if !isFocused { commit() }
                }
        }
        .onAppear {
            guard !loaded else { return }
            text = lines.joined(separator: "\n")
            loaded = true
        }
        .onChange(of: lines) { _, next in
            // Auto-generate replaced the list underneath us. The creator is not
            // typing in it at that moment, so taking the new value is safe and
            // not taking it would silently discard what they just asked for.
            guard !focused else { return }
            text = next.joined(separator: "\n")
        }
    }

    private func commit() {
        let parsed = text
            .components(separatedBy: .newlines)
            .map { $0.trimmingCharacters(in: .whitespaces) }
            .filter { !$0.isEmpty }
        if parsed != lines { onCommit(parsed) }
    }
}

/// A card for one entity in a list, with a delete in the corner.
struct BuilderEntityCard<Content: View>: View {
    let title: String
    var subtitle: String? = nil
    var onDelete: (() -> Void)? = nil
    @ViewBuilder let content: () -> Content

    @State private var expanded = true
    @Environment(\.translator) private var t

    var body: some View {
        Card {
            VStack(alignment: .leading, spacing: expanded ? Theme.Spacing.lg : 0) {
                HStack(spacing: Theme.Spacing.sm) {
                    VStack(alignment: .leading, spacing: 2) {
                        Txt(title.isEmpty ? t("create.unnamed") : title, .h3, lineLimit: 1)
                        if let subtitle, !subtitle.isEmpty {
                            Txt(subtitle, .micro, color: Theme.Colors.textMuted, lineLimit: 1)
                        }
                    }
                    Spacer(minLength: 0)
                    if let onDelete {
                        IconButton(t("create.delete"), systemImage: "trash") { onDelete() }
                            .foregroundStyle(Theme.Colors.textMuted)
                    }
                    IconButton(t(expanded ? "create.collapse" : "create.expand"),
                               systemImage: expanded ? "chevron.up" : "chevron.down") {
                        withAnimation(.easeInOut(duration: 0.18)) { expanded.toggle() }
                    }
                    .foregroundStyle(Theme.Colors.textMuted)
                }
                if expanded { content() }
            }
        }
    }
}

/// `Add character +`, `Add place +`. OOC's counter in the label is a good idea:
/// it tells you the limit without a separate sentence about the limit.
struct BuilderAddButton: View {
    let label: String
    var action: () -> Void

    var body: some View {
        Button {
            Haptic.play(.light)
            action()
        } label: {
            HStack(spacing: 6) {
                Text(label).font(.system(size: 15, weight: .medium))
                Image(systemName: "plus").font(.system(size: 13, weight: .semibold))
            }
            .foregroundStyle(Theme.Colors.textSecondary)
            .frame(maxWidth: .infinity, minHeight: 50)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, style: StrokeStyle(lineWidth: 1, dash: [5, 4]))
            }
        }
        .buttonStyle(PressScaleStyle())
    }
}
