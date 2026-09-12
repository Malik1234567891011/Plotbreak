"""App Store screenshot compositor for Plotbreak, OOC-style.

  PB_DEVICE=phone (default, 1320x2868, iPhone 6.9") | ipad (2064x2752, iPad 13")
  PB_OUT=<dir>            output directory (default: this folder)
  PB_TAGLINE=<text>       tagline under the closing lockup (default THE PLAYABLE ANIME)

  python3 compose.py hero ["LINE|LINE|LINE"]
  python3 compose.py closing ["LINE|LINE" ACCENT]
  python3 compose.py frame N "LINE1|LINE2" raw/shot.png [ACCENT,ACCENT] -> 0N-<firstword>.png
"""
import sys, os, math, glob, random
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
S = HERE + '/raw'
OUT = os.environ.get('PB_OUT') or HERE
TAGLINE = os.environ.get('PB_TAGLINE', 'THE PLAYABLE ANIME')
DEVICE = os.environ.get('PB_DEVICE', 'phone')
W, H = (2064, 2752) if DEVICE == 'ipad' else (1320, 2868)
K = W / 1320  # scale for type and spacing relative to the phone canvas
BLACK = (0, 0, 0); VIOLET = (124, 108, 255); WHITE = (247, 248, 250)
HN = '/System/Library/Fonts/HelveticaNeue.ttc'
def font(size, idx=1): return ImageFont.truetype(HN, int(size), index=idx)  # 1=Bold, 10=Medium

# ---- brand glyph (same geometry as docs/brand/icon.svg) ------------------
def glyph_pieces(cx, cy, h):
    w = h * 128 / 680; g = h * 16 / 680
    ang = math.radians(30); d = g / math.cos(ang); t = math.tan(ang)
    x0, x1 = cx - w / 2, cx + w / 2; top, bot = cy - h / 2, cy + h / 2
    yl = lambda x: cy - t * (x - cx)
    return [[(x0, top), (x1, top), (x1, yl(x1) - d), (x0, yl(x0) - d)],
            [(x0, yl(x0) + d), (x1, yl(x1) + d), (x1, bot), (x0, bot)]]

def lockup(cy, wordmark_px, tagline=None, tag_px=54):
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dr = ImageDraw.Draw(layer)
    f = font(wordmark_px); text = 'PLOTBREAK'
    tw = dr.textlength(text, font=f); gap = wordmark_px * 0.32; gh = wordmark_px
    gw = gh * 128 / 680; x = (W - (gw + gap + tw)) / 2
    for p in glyph_pieces(x + gw / 2, cy, gh): dr.polygon(p, fill=VIOLET + (255,))
    dr.text((x + gw + gap, cy), text, font=f, fill=WHITE + (255,), anchor='lm')
    if tagline:
        dr.text((W / 2, cy + wordmark_px * 0.95), ' '.join(tagline), font=font(tag_px, 10), fill=WHITE + (255,), anchor='mm')
    return layer

def headline(dr, lines, top, size, align='center', accent_words=()):
    while size > 60 and max(dr.textlength(l, font=font(size)) for l in lines) > W - 120 * K: size -= 4
    f = font(size); y = top; lh = size * 1.08
    for line in lines:
        words = line.split(' '); widths = [dr.textlength(w + ' ', font=f) for w in words]
        total = sum(widths) - dr.textlength(' ', font=f)
        x = (W - total) / 2 if align == 'center' else 96 * K
        for w, ww in zip(words, widths):
            dr.text((x, y), w, font=f, fill=VIOLET if w.strip('.,') in accent_words else WHITE); x += ww
        y += lh
    return y

def rounded_mask(size, r):
    m = Image.new('L', size, 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], r, fill=255); return m

def vertical_fade(im, spans):
    """spans: list of (y_start, y_end, direction) direction 'in' = black at start fading out, 'out' = fading to black at end."""
    mask = Image.new('L', (W, H), 0); d = ImageDraw.Draw(mask)
    for y in range(H):
        a = 0
        for y0, y1, direction in spans:
            if y0 <= y < y1:
                t = (y - y0) / (y1 - y0)
                a = max(a, int(255 * ((1 - t) if direction == 'in' else t) ** 1.5))
            elif direction == 'out' and y >= y1: a = 255
        d.line([(0, y), (W, y)], fill=a)
    im.paste(Image.new('RGB', (W, H), BLACK), (0, 0), mask)

# ---- panels ---------------------------------------------------------------
def hero(lines=('THE', 'PLAYABLE', 'ANIME')):
    im = Image.new('RGB', (W, H), BLACK)
    covers = [p for p in sorted(glob.glob(f'{S}/covers/*.png')) if 'Itachi' not in p]
    random.seed(7); random.shuffle(covers)
    focus = f'{S}/covers/The Ninth Archive.png'
    if focus in covers: covers.remove(focus)
    cw, ch, gap = int(430 * K), int(645 * K), int(34 * K)
    cols, rows = (5, 5) if DEVICE == 'ipad' else (4, 5)
    big = Image.new('RGBA', (cols * (cw + gap) + 400, rows * (ch + gap) + 400), (0, 0, 0, 0))
    k = 0
    for r in range(rows):
        for c in range(cols):
            card = Image.open(covers[k % len(covers)]).convert('RGB').resize((cw, ch), Image.LANCZOS); k += 1
            card = Image.eval(card, lambda v: int(v * (0.30 if DEVICE == 'ipad' else 0.42))); card.putalpha(rounded_mask((cw, ch), int(40 * K)))
            big.alpha_composite(card, (200 + c * (cw + gap) + (r % 2) * (cw // 2), 200 + r * (ch + gap)))
    big = big.rotate(-8, resample=Image.BICUBIC, expand=False)
    im.paste(big, ((W - big.width) // 2, (H - big.height) // 2 + int(120 * K)), big)
    vertical_fade(im, [(0, int(H * (0.40 if DEVICE == 'ipad' else 0.31)), 'in'), (int(H * (0.72 if DEVICE == 'ipad' else 0.76)), H, 'out')])
    fw, fh = int(560 * K), int(840 * K)
    fc = Image.open(focus).convert('RGB').resize((fw, fh), Image.LANCZOS); fc.putalpha(rounded_mask((fw, fh), int(48 * K)))
    border = Image.new('RGBA', (fw + 16, fh + 16), (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle([0, 0, fw + 15, fh + 15], int(56 * K), fill=VIOLET + (255,))
    fx, fy = (W - fw) // 2, int(H * (0.40 if DEVICE == 'ipad' else 0.376))
    im.paste(border, (fx - 8, fy - 8), border); im.paste(fc, (fx, fy), fc)
    headline(ImageDraw.Draw(im), list(lines), int(150 * K), size=(190 if DEVICE == 'ipad' else 168), align='left')
    lk = lockup(int(H * (0.905 if DEVICE == 'ipad' else 0.893)), 140 * K); im.paste(lk, (0, 0), lk)
    im.save(f'{OUT}/01-hero.png'); print('01-hero.png')

def closing(lines=('ROLLED,', 'NOT DECIDED'), accent=('NOT',), art=f'{S}/closing-art.png'):
    im = Image.new('RGB', (W, H), BLACK)
    a = Image.open(art).convert('RGB')
    if DEVICE == 'ipad':
        ah = int(H * 0.64); a = a.resize((int(a.width * ah / a.height), ah), Image.LANCZOS); y0 = int(H * 0.22)
    else:
        a = a.resize((W, int(a.height * W / a.width)), Image.LANCZOS); y0 = 560
    im.paste(a, ((W - a.width) // 2, y0))
    vertical_fade(im, [(y0, y0 + int(300 * K), 'in'), (y0 + a.height - int(420 * K), y0 + a.height, 'out')])
    headline(ImageDraw.Draw(im), list(lines), int(210 * K) if DEVICE == 'phone' else 170, size=(160 if DEVICE == 'ipad' else 150), accent_words=accent)
    lk = lockup(int(H * (0.885 if DEVICE == 'ipad' else 0.865)), 170 * K, tagline=TAGLINE, tag_px=52 * K); im.paste(lk, (0, 0), lk)
    im.save(f'{OUT}/05-closing.png'); print('05-closing.png')

def frame(n, text, shot, accent=()):
    im = Image.new('RGB', (W, H), BLACK); dr = ImageDraw.Draw(im)
    lines = text.split('|')
    y = headline(dr, lines, int(190 * K), size=118 * K, accent_words=accent)
    sc = Image.open(shot).convert('RGB')
    if DEVICE == 'ipad':
        sw = int(W * 0.84); bez = 44; r_out, r_in = 120, 84
    else:
        sw = 1130; bez = 34; r_out, r_in = 196, 166
    sh = int(sw * sc.height / sc.width); px = (W - sw) // 2; py = int(y + 150 * K)
    shell = Image.new('RGBA', (sw + 2 * bez, sh + 2 * bez), (0, 0, 0, 0))
    ImageDraw.Draw(shell).rounded_rectangle([0, 0, shell.width - 1, shell.height - 1], r_out, fill=(26, 28, 34, 255), outline=(60, 63, 72, 255), width=3)
    im.paste(shell, (px - bez, py - bez), shell)
    sc = sc.resize((sw, sh), Image.LANCZOS); sc.putalpha(rounded_mask((sw, sh), r_in))
    im.paste(sc, (px, py), sc)
    name = f'{OUT}/{n:02d}-{lines[0].lower().split(" ")[0].strip(".,")}.png'
    im.save(name); print(name.split('/')[-1])

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    cmd, a = sys.argv[1], sys.argv[2:]
    if cmd == 'hero': hero(tuple(a[0].split('|')) if a else ('THE', 'PLAYABLE', 'ANIME'))
    elif cmd == 'closing': closing(tuple(a[0].split('|')) if a else ('ROLLED,', 'NOT DECIDED'), tuple(a[1].split(',')) if len(a) > 1 else ('NOT',))
    elif cmd == 'frame': frame(int(a[0]), a[1], a[2], tuple(a[3].split(',')) if len(a) > 3 else ())
