import SwiftUI
import PhotosUI

// MARK: - Choosing a picture
//
// Every other field in the builder describes an image and we draw it. This is
// the one place a creator can hand us one instead, for the cover and for each
// character, because sometimes they already have the picture and describing it
// to a model is the long way round.
//
// The work here is all on the way out. A camera-roll photo is four megabytes of
// HEIC with the creator's GPS coordinates in it, and both of those are problems
// — so it is transcoded to JPEG and shrunk on the phone before it is sent, and
// the server drops the metadata and re-encodes again. Neither side trusts the
// other to have done it.
//
// `PhotosPicker` without a `photoLibrary:` argument runs out of process and is
// handed only the one image the person picked, so the app never gets library
// access and there is no permission prompt and no Info.plist string. Passing
// `.shared()` would have worked too and would have asked for the whole
// library to read one file.

struct ImagePickerField: View {
    let label: String
    var help: String? = nil
    /// 2:3 for a cover, square for a face.
    var aspect: CGFloat = 2.0 / 3.0
    let url: String?
    let uploading: Bool
    let onPick: (Data) -> Void
    let onRemove: () -> Void

    @Environment(\.translator) private var t
    @State private var selection: PhotosPickerItem?
    @State private var tooLarge = false

    var body: some View {
        VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
            FieldHeader(label: label, help: help)

            if let url, !url.isEmpty {
                chosen(url)
            } else {
                picker
            }

            if tooLarge {
                Txt(t("create.image_too_big"), .micro, color: Theme.Colors.danger)
            }
        }
        .onChange(of: selection) { _, item in
            guard let item else { return }
            Task { await load(item) }
        }
    }

    // MARK: Pieces

    private var picker: some View {
        PhotosPicker(selection: $selection, matching: .images) {
            VStack(spacing: 6) {
                if uploading {
                    ProgressView().tint(Theme.Colors.accentPrimary)
                    Txt(t("create.image_checking"), .micro, color: Theme.Colors.textMuted)
                } else {
                    Image(systemName: "photo.badge.plus").font(.system(size: 22, weight: .regular))
                    Txt(t("create.image_choose"), .micro, color: Theme.Colors.textMuted)
                }
            }
            .foregroundStyle(Theme.Colors.textSecondary)
            .frame(maxWidth: .infinity)
            .frame(height: 132)
            .background(Theme.Colors.bgElevated, in: RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous)
                    .strokeBorder(Theme.Colors.borderSubtle, style: StrokeStyle(lineWidth: 1, dash: [5, 4]))
            }
        }
        .disabled(uploading)
    }

    private func chosen(_ url: String) -> some View {
        HStack(alignment: .top, spacing: Theme.Spacing.md) {
            RemoteImage(url.assetURL) {
                Theme.Colors.bgRaised
            }
            .frame(width: 96, height: 96 / aspect)
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.field, style: .continuous))

            VStack(alignment: .leading, spacing: Theme.Spacing.sm) {
                Txt(t("create.image_yours"), .micro, color: Theme.Colors.textMuted)
                HStack(spacing: Theme.Spacing.sm) {
                    PhotosPicker(selection: $selection, matching: .images) {
                        Txt(t("create.image_replace"), .bodyCompact, color: Theme.Colors.accentPrimary)
                    }
                    .disabled(uploading)
                    Text("·").foregroundStyle(Theme.Colors.textMuted)
                    Button(action: onRemove) {
                        Txt(t("create.image_remove"), .bodyCompact, color: Theme.Colors.textMuted)
                    }
                    .buttonStyle(PressOpacityStyle())
                    .disabled(uploading)
                }
                if uploading { ProgressView().controlSize(.mini).tint(Theme.Colors.accentPrimary) }
            }
            Spacer(minLength: 0)
        }
    }

    // MARK: Loading

    /// Longest edge we ever send. A cover is drawn at 1005 points wide, so
    /// anything past this is bytes nobody sees — and the whole point of
    /// shrinking here rather than only on the server is that the upload
    /// happens on somebody's data plan.
    static let maxEdge: CGFloat = 1600
    static let maxBytes = 8 * 1024 * 1024

    private func load(_ item: PhotosPickerItem) async {
        tooLarge = false
        selection = nil
        guard let raw = try? await item.loadTransferable(type: Data.self) else { return }
        // Transcode on the phone: a modern iPhone hands over HEIC, which the
        // server does not accept, and that is the right call — accepting every
        // container a camera can produce is a much larger surface than
        // accepting the two a photo can be re-encoded into.
        guard let jpeg = Self.jpeg(from: raw) else { return }
        guard jpeg.count <= Self.maxBytes else {
            tooLarge = true
            return
        }
        onPick(jpeg)
    }

    /// Internal so `ImageTranscodeTests` can hold it to the two things it has
    /// to do: bound the longest edge, and come back as a JPEG the server takes.
    static func jpeg(from data: Data) -> Data? {
        guard let image = UIImage(data: data) else { return nil }
        let longest = max(image.size.width, image.size.height)
        let scale = longest > maxEdge ? maxEdge / longest : 1
        let size = CGSize(width: image.size.width * scale, height: image.size.height * scale)
        let renderer = UIGraphicsImageRenderer(size: size, format: {
            let format = UIGraphicsImageRendererFormat.default()
            format.scale = 1
            format.opaque = true
            return format
        }())
        let drawn = renderer.image { _ in image.draw(in: CGRect(origin: .zero, size: size)) }
        return drawn.jpegData(compressionQuality: 0.85)
    }
}
