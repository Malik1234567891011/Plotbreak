import os
from PIL import Image, ImageDraw, ImageFont
from compose import *
INK0 = (15, 14, 13)
base = clean_backdrop()
HOME = (0, 1560, 1206, 2622)       # bottom of Home: Top ranked rows under the bar
STRIP = (0, 2286, 1206, 2538)      # just the bar
def bar_only(im, top=2286, bottom=2538):
    """The capsule alone on ink.0, so the Library strip shows nothing but the bar."""
    k = 4
    m = Image.new('L', (im.width * k, im.height * k), 0)
    ImageDraw.Draw(m).rounded_rectangle([CX0 * k + 3, CY0 * k + 3, CX1 * k - 4, CY1 * k - 4], radius=96 * k - 3, fill=255)
    m = m.resize(im.size, Image.LANCZOS)
    out = Image.new('RGB', im.size, INK0); out.paste(im, (0, 0), m)
    return out.crop((0, top, 1206, bottom))
def font(px, w='Regular'):
    f = ImageFont.truetype('/System/Library/Fonts/SFNS.ttf', px)
    try: f.set_variation_by_name(w)
    except Exception: pass
    return f
mocks = {}
for st in 'ABC':
    disc = build_bar(base, st, 'discover')
    lib = build_bar(base, st, 'library')
    home = disc.crop(HOME); strip = bar_only(lib)
    m = Image.new('RGB', (1206, home.height + 24 + strip.height), INK0)
    m.paste(home, (0, 0)); m.paste(strip, (0, home.height + 24))
    m.save(f'{D}/mock-{st}.png'); mocks[st] = (home, strip)
    print('mock', st, m.size)
# today, for reference
orig_home = Image.open(BACK).convert('RGB').crop(HOME)
orig_lib = bar_only(Image.open(REPO + '/docs/design-v3/gaps-shots/final-library.png').convert('RGB'))
rows = [('Today', 'house / books.vertical / square.and.pencil / person. SF Symbols 20pt regular, labels 11pt.', orig_home, orig_lib)]
desc = {
 'A': ('A  Refined SF Symbols', 'safari / book.closed / plus.square / person.crop.circle, 21pt regular, outline to .fill on select. Labels as today.'),
 'B': ('B  Story line set', 'Custom 24pt grid, 1.75pt round strokes: a manga page / an open book with a ribbon / a quill writing a line / the face card speakers get in a story. Fills on select, with cut gutters. Labels as today.'),
 'C': ('C  Bold glyphs', 'Custom solid 26pt glyphs, no labels: a hand of covers / book + ribbon / crystal-cut nib / you, with an ahoge. Selected gets manga emphasis marks.'),
}
for st in 'ABC': rows.append((desc[st][0], desc[st][1], *mocks[st]))
HC = 1062 - 560   # show the lower part of the Home crop in the comparison
parts = []
fT, fD = font(46, 'Semibold'), font(32)
for title, sub, home, strip in rows:
    words, lines, cur = sub.split(' '), [], ''
    for w_ in words:
        t_ = (cur + ' ' + w_).strip()
        if fD.getlength(t_) > 1086: lines.append(cur); cur = w_
        else: cur = t_
    lines.append(cur)
    cap = Image.new('RGB', (1206, 100 + 44 * len(lines)), INK0); d = ImageDraw.Draw(cap)
    d.text((60, 30), title, font=fT, fill=(243, 239, 232))
    for k_, ln in enumerate(lines): d.text((60, 94 + 44 * k_), ln, font=fD, fill=(148, 142, 133))
    h = home.crop((0, home.height - HC, 1206, home.height))
    tag = Image.new('RGB', (1206, 56), INK0); ImageDraw.Draw(tag).text((60, 12), 'Library selected', font=font(30), fill=(148, 142, 133))
    blk = [cap, h, tag, strip, Image.new('RGB', (1206, 40), INK0)]
    parts += blk
    parts.append(Image.new('RGB', (1206, 3), (46, 43, 39)))
H = sum(p.height for p in parts)
out = Image.new('RGB', (1206, H), INK0); y = 0
for p in parts: out.paste(p, (0, y)); y += p.height
out.save(f'{D}/compare.png'); print('compare', out.size)
