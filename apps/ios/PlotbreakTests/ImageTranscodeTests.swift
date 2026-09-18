import XCTest
import UIKit
@testable import Plotbreak

/// What the phone does to a picture before it leaves.
///
/// The server checks all of this again and would reject anything wrong, but
/// the reason it happens here as well is the upload itself: a four-megabyte
/// photo sent over somebody's data plan so the server can throw most of it
/// away is a bad trade, and a HEIC the server does not accept is a round trip
/// wasted to learn something the phone already knew.
final class ImageTranscodeTests: XCTestCase {
    /// A fixture whose pixels match its points.
    ///
    /// `UIGraphicsImageRenderer` defaults to the screen's scale, so an
    /// unpinned "800x600" fixture is really 1600x1200 — which is what the
    /// first run of this file proved, by failing on the one case where that
    /// difference changes the answer.
    private func image(width: CGFloat, height: CGFloat) -> Data {
        let format = UIGraphicsImageRendererFormat.default()
        format.scale = 1
        format.opaque = true
        let renderer = UIGraphicsImageRenderer(size: CGSize(width: width, height: height), format: format)
        let drawn = renderer.image { context in
            UIColor.systemIndigo.setFill()
            context.fill(CGRect(x: 0, y: 0, width: width, height: height))
        }
        return drawn.pngData()!
    }

    func testProducesJpegFromPng() throws {
        let out = try XCTUnwrap(ImagePickerField.jpeg(from: image(width: 400, height: 400)))
        // JPEG magic. The server identifies the format from the bytes rather
        // than from anything we claim, so this is the assertion that matters.
        XCTAssertEqual(Array(out.prefix(3)), [0xFF, 0xD8, 0xFF])
    }

    func testShrinksSomethingEnormous() throws {
        let out = try XCTUnwrap(ImagePickerField.jpeg(from: image(width: 4032, height: 3024)))
        let decoded = try XCTUnwrap(UIImage(data: out))
        XCTAssertEqual(max(decoded.size.width, decoded.size.height), ImagePickerField.maxEdge, accuracy: 1)
        // And the aspect ratio survives, because cropping is the server's job
        // and it crops to the shape of the card rather than to a square here.
        XCTAssertEqual(decoded.size.width / decoded.size.height, 4032.0 / 3024.0, accuracy: 0.01)
    }

    func testLeavesSomethingSmallAlone() throws {
        let out = try XCTUnwrap(ImagePickerField.jpeg(from: image(width: 800, height: 600)))
        let decoded = try XCTUnwrap(UIImage(data: out))
        XCTAssertEqual(decoded.size.width, 800, accuracy: 1)
        XCTAssertEqual(decoded.size.height, 600, accuracy: 1)
    }

    func testBringsAPhoneSizedPhotoUnderTheCap() throws {
        // What an iPhone actually hands over: twelve megapixels.
        let out = try XCTUnwrap(ImagePickerField.jpeg(from: image(width: 4032, height: 3024)))
        XCTAssertLessThan(out.count, ImagePickerField.maxBytes)
    }

    func testRefusesSomethingThatIsNotAnImage() {
        XCTAssertNil(ImagePickerField.jpeg(from: Data(repeating: 0x41, count: 4096)))
    }

    func testHandlesATallPortrait() throws {
        let out = try XCTUnwrap(ImagePickerField.jpeg(from: image(width: 600, height: 3000)))
        let decoded = try XCTUnwrap(UIImage(data: out))
        XCTAssertEqual(decoded.size.height, ImagePickerField.maxEdge, accuracy: 1)
    }
}
