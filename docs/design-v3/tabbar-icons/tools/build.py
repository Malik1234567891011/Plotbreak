"""Rebuilds everything: python3 gen_svgs.py && python3 build.py. Renders go to tools/r (ignored)."""
import os, json, subprocess
from PIL import Image, ImageDraw, ImageFont
from compose import *
INK0 = (15, 14, 13)

def render_sf():
    """Set A's symbols (from A/symbols.json) and the tab labels, rendered by AppKit into tools/r."""
    os.makedirs(S + '/r', exist_ok=True)
    spec = json.load(open(D + '/A/symbols.json'))
    jobs = []
    for t in TABS:
        tab = spec['tabs'][t]
        jobs.append(f"sym\t{tab['idle']}\t{tab['pointSize']}\t{spec['weight']}\t{PAPER3[1:]}\tA-{t}-u")
        jobs.append(f"sym\t{tab['selected']}\t{tab['pointSize']}\t{spec['weight']}\t{PAPER[1:]}\tA-{t}-s")
        jobs.append(f"text\t{LABELS[t]}\t11\tmedium\t{PAPER3[1:]}\tL-{LABELS[t]}-u")
        jobs.append(f"text\t{LABELS[t]}\t11\tsemibold\t{PAPER[1:]}\tL-{LABELS[t]}-s")
    open(S + '/r/sf-jobs.tsv', 'w').write('\n'.join(jobs) + '\n')
    if not os.path.exists(S + '/r/sfrender'):
        subprocess.run(['swiftc', '-O', '-o', S + '/r/sfrender', S + '/sfrender.swift'], check=True)
    subprocess.run([S + '/r/sfrender', S + '/r/sf-jobs.tsv', S + '/r'], check=True, stdout=subprocess.DEVNULL)
    for t in TABS:   # the committed copies in A/
        Image.open(f'{S}/r/A-{t}-u.png').save(f'{D}/A/{t}.png')
        Image.open(f'{S}/r/A-{t}-s.png').save(f'{D}/A/{t}-selected.png')

render_sf()
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
 'A': ('A  Refined SF Symbols', 'rectangle.portrait.on.rectangle.portrait.angled / book / plus.square / person.crop.circle at 17 / 20 / 22 / 21pt, so each lands on the 20pt keyline. Outline to .fill on select. Labels as today.'),
 'B': ('B  Story line set', 'Custom 24pt grid, 1.75pt round strokes: a manga page / an open book with a ribbon / a nib writing a line / you, in your circle. Fills on select, with cut gutters. Labels as today.'),
 'C': ('C  Bold glyphs', 'Custom solid glyphs on the same grid, no labels: two covers / an open book, ribbon out of the spine / a rhombus nib / you, in your circle. Selected is paper, idle paper.3, nothing else.'),
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
