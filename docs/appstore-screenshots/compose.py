"""App Store screenshot compositor for Plotbreak. 1320x2868 (6.9"), OOC-style.
usage: python3 compose.py <panel> [args]
  hero      -> 01-hero.png          (cover collage + THE PLAYABLE ANIME + logo)
  closing   -> 05-closing.png       (Dare art + headline + logo + tagline)
  frame N "LINE1|LINE2" shot.png -> 0N-*.png (headline + framed device screenshot)
"""
import sys, math, glob, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

S = __import__('os').path.dirname(__import__('os').path.abspath(__file__)) + '/raw'
OUT = __import__('os').environ.get('PB_OUT') or __import__('os').path.dirname(__import__('os').path.abspath(__file__))
TAGLINE = __import__('os').environ.get('PB_TAGLINE', 'THE PLAYABLE ANIME')
RAW = __import__('os').environ.get('PB_RAW')
W, H = 1320, 2868
BLACK = (0, 0, 0); VIOLET = (124, 108, 255); WHITE = (247, 248, 250); INK = (11, 13, 18)
HN = '/System/Library/Fonts/HelveticaNeue.ttc'
def font(size, idx=1): return ImageFont.truetype(HN, size, index=idx)  # 1=Bold, 10=Medium, 0=Regular

# ---- brand glyph (same geometry as docs/brand/icon.svg) ------------------
def glyph_pieces(cx, cy, h):
    w = h * 128 / 680; g = h * 16 / 680
    ang = math.radians(30); d = g / math.cos(ang); t = math.tan(ang)
    x0, x1 = cx - w / 2, cx + w / 2; top, bot = cy - h / 2, cy + h / 2
    yl = lambda x: cy - t * (x - cx)
    return [[(x0, top), (x1, top), (x1, yl(x1) - d), (x0, yl(x0) - d)],
            [(x0, yl(x0) + d), (x1, yl(x1) + d), (x1, bot), (x0, bot)]]

def draw_glyph(dr, cx, cy, h, color, ss=1):
    for p in glyph_pieces(cx * ss, cy * ss, h * ss): dr.polygon(p, fill=color)

def lockup(cy, wordmark_px=150, tagline=None, tag_px=54):
    """Return an RGBA layer with glyph + PLOTBREAK centred at y=cy, optional tagline under."""
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dr = ImageDraw.Draw(layer)
    f = font(wordmark_px); text = 'PLOTBREAK'
    tw = dr.textlength(text, font=f); gap = wordmark_px * 0.32; gh = wordmark_px * 1.0
    gw = gh * 128 / 680; total = gw + gap + tw; x = (W - total) / 2
    draw_glyph(dr, x + gw / 2, cy, gh, VIOLET + (255,))
    dr.text((x + gw + gap, cy), text, font=f, fill=WHITE + (255,), anchor='lm')
    if tagline:
        ft = font(tag_px, 10)
        dr.text((W / 2, cy + wordmark_px * 0.95), spaced(tagline, 0.18), font=ft, fill=WHITE + (255,), anchor='mm')
    return layer

def spaced(s, tracking):  # fake letter-spacing with hair spaces
    return ' '.join(s) if tracking <= 0 else (' ' * max(1, int(tracking * 10))).join(s)

def headline(dr, lines, top, size=132, align='center', accent_words=()):
    # shrink until the widest line fits inside the side margins
    while size > 60 and max(dr.textlength(l, font=font(size)) for l in lines) > W - 120: size -= 4
    f = font(size); y = top; lh = size * 1.08
    for line in lines:
        words = line.split(' ')
        widths = [dr.textlength(w + ' ', font=f) for w in words]
        total = sum(widths) - dr.textlength(' ', font=f)
        x = (W - total) / 2 if align == 'center' else 96
        for w, ww in zip(words, widths):
            col = VIOLET if w.strip('.,') in accent_words else WHITE
            dr.text((x, y), w, font=f, fill=col); x += ww
        y += lh
    return y

def rounded_mask(size, r):
    m = Image.new('L', size, 0); ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], r, fill=255); return m

# ---- panels ---------------------------------------------------------------
def hero(lines=('THE', 'PLAYABLE', 'ANIME')):
    im = Image.new('RGB', (W, H), BLACK)
    covers = [p for p in sorted(glob.glob(f'{S}/covers/*.png')) if 'Itachi' not in p]
    random.seed(7); random.shuffle(covers)
    focus = f'{S}/covers/The Ninth Archive.png'
    if focus in covers: covers.remove(focus)
    # tilted 3-column grid of cards, drawn on a larger canvas and rotated
    cw, ch, gap = 430, 645, 34
    cols, rows = 4, 5
    big = Image.new('RGBA', (cols * (cw + gap) + 400, rows * (ch + gap) + 400), (0, 0, 0, 0))
    k = 0
    for r in range(rows):
        for c in range(cols):
            src = covers[k % len(covers)]; k += 1
            card = Image.open(src).convert('RGB').resize((cw, ch), Image.LANCZOS)
            card = Image.eval(card, lambda v: int(v * 0.42))  # dim the field
            card.putalpha(rounded_mask((cw, ch), 40))
            x = 200 + c * (cw + gap) + (r % 2) * (cw // 2); y = 200 + r * (ch + gap)
            big.alpha_composite(card, (x, y))
    big = big.rotate(-8, resample=Image.BICUBIC, expand=False)
    im.paste(big, ((W - big.width) // 2, (H - big.height) // 2 + 120), big)
    # fade the field to black at top and bottom for headline / logo
    fade = Image.new('L', (W, H), 0); fd = ImageDraw.Draw(fade)
    for y in range(H):
        a = 0
        if y < 900: a = int(255 * (1 - y / 900) ** 1.4)
        if y > H - 700: a = max(a, int(255 * ((y - (H - 700)) / 700) ** 1.4))
        fd.line([(0, y), (W, y)], fill=a)
    im.paste(Image.new('RGB', (W, H), BLACK), (0, 0), fade)
    # focus card, upright, centred, violet border
    fw, fh = 560, 840
    fc = Image.open(focus).convert('RGB').resize((fw, fh), Image.LANCZOS)
    fc.putalpha(rounded_mask((fw, fh), 48))
    border = Image.new('RGBA', (fw + 16, fh + 16), (0, 0, 0, 0))
    ImageDraw.Draw(border).rounded_rectangle([0, 0, fw + 15, fh + 15], 56, fill=VIOLET + (255,))
    fx, fy = (W - fw) // 2, 1080
    im.paste(border, (fx - 8, fy - 8), border); im.paste(fc, (fx, fy), fc)
    dr = ImageDraw.Draw(im)
    headline(dr, list(lines), 150, size=168, align='left')
    im.paste(lockup(2560, wordmark_px=140), (0, 0), lockup(2560, wordmark_px=140))
    im.save(f'{OUT}/01-hero.png'); print('01-hero.png')

def closing(art=f'{S}/closing-art.png', lines=('ROLLED,', 'NOT DECIDED'), accent=('NOT',)):
    im = Image.new('RGB', (W, H), BLACK)
    a = Image.open(art).convert('RGB')
    scale = W / a.width; a = a.resize((W, int(a.height * scale)), Image.LANCZOS)
    y0 = 560
    im.paste(a, (0, y0))
    # soften the art's top & bottom edges into black
    for edge, span in ((y0, 260), (y0 + a.height - 260, 260)):
        for i in range(span):
            y = edge + i
            if 0 <= y < H:
                t = i / span; al = int(255 * (1 - t) ** 2) if edge == y0 else int(255 * t ** 2)
                ImageDraw.Draw(im).line([(0, y), (W, y)], fill=BLACK + (0,)) if False else None
    top = Image.new('L', (W, H), 0); td = ImageDraw.Draw(top)
    for y in range(H):
        al = 0
        if y0 <= y < y0 + 300: al = int(255 * (1 - (y - y0) / 300) ** 1.6)
        if y >= y0 + a.height - 420: al = max(al, int(255 * min(1, (y - (y0 + a.height - 420)) / 420) ** 1.6))
        if y >= y0 + a.height: al = 255
        td.line([(0, y), (W, y)], fill=al)
    im.paste(Image.new('RGB', (W, H), BLACK), (0, 0), top)
    dr = ImageDraw.Draw(im)
    headline(dr, list(lines), 210, size=150, accent_words=accent)
    lk = lockup(2480, wordmark_px=170, tagline=TAGLINE, tag_px=52)
    im.paste(lk, (0, 0), lk)
    im.save(f'{OUT}/05-closing.png'); print('05-closing.png')

def frame(n, text, shot, accent=()):
    im = Image.new('RGB', (W, H), BLACK); dr = ImageDraw.Draw(im)
    lines = text.split('|')
    y = headline(dr, lines, 190, size=118, accent_words=accent)
    # device: bezel + screenshot, bleeding off the bottom edge
    sw = 1130; sh = int(sw * 2868 / 1320); bez = 34; r_out = 196; r_in = 166
    px = (W - sw) // 2; py = int(y + 150)
    shell = Image.new('RGBA', (sw + 2 * bez, sh + 2 * bez), (0, 0, 0, 0))
    ImageDraw.Draw(shell).rounded_rectangle([0, 0, shell.width - 1, shell.height - 1], r_out, fill=(26, 28, 34, 255), outline=(60, 63, 72, 255), width=3)
    im.paste(shell, (px - bez, py - bez), shell)
    sc = Image.open(shot).convert('RGB').resize((sw, sh), Image.LANCZOS); sc.putalpha(rounded_mask((sw, sh), r_in))
    im.paste(sc, (px, py), sc)
    name = f'{OUT}/{n:02d}-{lines[0].lower().split(" ")[0].strip(".,")}.png'
    im.save(name); print(name.split('/')[-1])

if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'hero': hero(tuple(sys.argv[2].split('|')) if len(sys.argv) > 2 else ('THE', 'PLAYABLE', 'ANIME'))
    elif cmd == 'closing': closing(f'{S}/closing-art.png', tuple(sys.argv[2].split('|')) if len(sys.argv) > 2 else ('ROLLED,', 'NOT DECIDED'), tuple(sys.argv[3].split(',')) if len(sys.argv) > 3 else ('NOT',))
    elif cmd == 'frame': frame(int(sys.argv[2]), sys.argv[3], sys.argv[4], tuple(sys.argv[5].split(',')) if len(sys.argv) > 5 else ())
