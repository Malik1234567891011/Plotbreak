import AppKit
// jobs.tsv lines:
//   sym <name> <pointSize> <weight> <hex> <outname>      -> 36x32pt canvas @3x, symbol centered (monochrome, cut-outs transparent)
//   text <string> <pointSize> <weight> <hex> <outname>   -> 120x16pt canvas @3x, centered, line box top at y=0
let args = CommandLine.arguments
let lines = try! String(contentsOfFile: args[1], encoding: .utf8).split(separator: "\n")
let outdir = args[2]
func weight(_ s: Substring) -> NSFont.Weight {
  switch s { case "light": return .light; case "medium": return .medium; case "semibold": return .semibold; case "bold": return .bold; default: return .regular }
}
func color(_ s: Substring) -> NSColor { let hex = UInt32(s, radix: 16)!
  return NSColor(srgbRed: CGFloat((hex>>16)&255)/255, green: CGFloat((hex>>8)&255)/255, blue: CGFloat(hex&255)/255, alpha: 1) }
let scale: CGFloat = 3
func canvas(_ size: CGSize, _ draw: () -> Void) -> Data {
  let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(size.width*scale), pixelsHigh: Int(size.height*scale), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
  rep.size = size
  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
  draw()
  NSGraphicsContext.restoreGraphicsState()
  return rep.representation(using: .png, properties: [:])!
}
for l in lines {
  let f = l.split(separator: "\t", omittingEmptySubsequences: false)
  if f.count < 6 { continue }
  let pt = CGFloat(Double(f[2])!); let w = weight(f[3]); let c = color(f[4]); let out = outdir + "/" + f[5] + ".png"
  if f[0] == "sym" {
    guard let base = NSImage(systemSymbolName: String(f[1]), accessibilityDescription: nil) else { print("MISSING \(f[1])"); continue }
    let img = base.withSymbolConfiguration(NSImage.SymbolConfiguration(pointSize: pt, weight: w, scale: .medium))!
    let cs = CGSize(width: 36, height: 32)
    let s = img.size
    let data = canvas(cs) {
      let r = NSRect(x: (cs.width - s.width)/2, y: (cs.height - s.height)/2, width: s.width, height: s.height)
      img.draw(in: r)
      c.set(); NSRect(origin: .zero, size: cs).fill(using: .sourceAtop)
    }
    try! data.write(to: URL(fileURLWithPath: out)); print(f[5], String(format: "%.2fx%.2f", s.width, s.height))
  } else {
    let font = NSFont.systemFont(ofSize: pt, weight: w)
    let str = NSAttributedString(string: String(f[1]), attributes: [.font: font, .foregroundColor: c])
    let cs = CGSize(width: 120, height: 16)
    let sz = str.size()
    let data = canvas(cs) {
      // non-flipped: line box top at y = cs.height
      str.draw(at: NSPoint(x: (cs.width - sz.width)/2, y: cs.height - sz.height))
    }
    try! data.write(to: URL(fileURLWithPath: out)); print(f[5], String(format: "%.2fx%.2f", sz.width, sz.height))
  }
}
