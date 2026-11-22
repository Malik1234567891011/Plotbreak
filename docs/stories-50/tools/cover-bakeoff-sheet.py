"""Cover style v2 bake-off: real-type titles on the picked image, and the comparison sheet.

    python3 -I docs/stories-50/tools/cover-bakeoff-sheet.py \
        --pick married-to-the-shrine-fox=haruka2 --pick the-maid-owns-the-house-now=tsubaki3-pro

Reads docs/stories-50/cover-style-v2/bakeoff/<story>-<model>.png (made by cover-bakeoff.mts) and the
current cover from infra/seed/assets/story_<id>/cover.png. Writes, under --out-dir (default
docs/stories-50/cover-style-v2): bakeoff/<story>-titled-{elegant,bold}.png and bakeoff.png.

Titles are set in OFL fonts from github.com/google/fonts (Cinzel, Cormorant, Oswald, Anton), fetched
once into node_modules/.cache/cover-fonts. OOC manner: a lower-middle title block, a thin ornament, a
subtle shadow, nothing painted by the model.
"""
import argparse
import os
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
V2 = os.path.join(ROOT, 'docs/stories-50/cover-style-v2')
FONT_DIR = os.path.join(ROOT, 'node_modules/.cache/cover-fonts')
FONTS = {
    'Cinzel': 'cinzel/Cinzel%5Bwght%5D.ttf',
    'Cormorant': 'cormorant/Cormorant%5Bwght%5D.ttf',
    'Oswald': 'oswald/Oswald%5Bwght%5D.ttf',
    'Anton': 'anton/Anton-Regular.ttf',
}

STORIES = {
    'married-to-the-shrine-fox': {
        'id': 'married_to_the_shrine_fox',
        'title': 'Married to the Shrine Fox',
        'short': 'Shrine Fox',
        'lines': ('MARRIED TO THE', 'SHRINE FOX'),
        'accent': (236, 196, 120),
    },
    'the-maid-owns-the-house-now': {
        'id': 'the_maid_owns_the_house_now',
        'title': 'The Maid Owns the House Now',
        'short': 'Maid',
        'lines': ('THE MAID OWNS', 'THE HOUSE NOW'),
        'accent': (214, 64, 64),
    },
}
MODELS = [
    ('tsubaki3-pro', 'Tsubaki.3 pro'),
    ('tsubaki2-standard', 'Tsubaki.2 standard'),
    ('haruka2', 'Haruka v2'),
    ('hoshino2', 'Hoshino v2'),
]


def font_path(name):
    os.makedirs(FONT_DIR, exist_ok=True)
    path = os.path.join(FONT_DIR, f'{name}.ttf')
    if not os.path.exists(path):
        urllib.request.urlretrieve(f'https://raw.githubusercontent.com/google/fonts/main/ofl/{FONTS[name]}', path)
    return path


def font(name, size, style=None):
    f = ImageFont.truetype(font_path(name), max(8, int(size)))
    if style:
        f.set_variation_by_name(style)
    return f


def tracked_width(text, f, tracking):
    return sum(f.getlength(ch) for ch in text) + tracking * (len(text) - 1)


def fitted(name, style, text, size, tracking_em, max_w):
    """Largest font at or under `size` whose tracked line fits `max_w`."""
    while True:
        f = font(name, size, style)
        if tracked_width(text, f, size * tracking_em) <= max_w or size < 10:
            return f, size * tracking_em
        size *= 0.95


def draw_tracked(draw, cx, y, text, f, tracking, fill):
    x = cx - tracked_width(text, f, tracking) / 2
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += f.getlength(ch) + tracking


def scrim(im, start=0.5, strength=170):
    """A soft dark gradient under the title block, so the type reads on any art."""
    w, h = im.size
    grad = Image.new('L', (1, h), 0)
    for y in range(h):
        t = max(0.0, (y / h - start) / (1 - start))
        grad.putpixel((0, y), int(strength * min(1.0, t * 1.4) ** 1.6))
    black = Image.new('RGBA', (w, h), (0, 0, 0, 255))
    black.putalpha(grad.resize((w, h)))
    return Image.alpha_composite(im, black)


def with_shadow(base, layer, radius, offset=(0, 3), opacity=190):
    alpha = layer.split()[-1]
    shadow = Image.new('RGBA', base.size, (0, 0, 0, 0))
    shadow.putalpha(alpha.point(lambda a: a * opacity // 255).filter(ImageFilter.GaussianBlur(radius)))
    shifted = Image.new('RGBA', base.size, (0, 0, 0, 0))
    shifted.paste(shadow, offset)
    return Image.alpha_composite(Image.alpha_composite(base, shifted), layer)


def ornament(draw, cx, y, half, accent, s):
    """A thin rule with a small diamond at its centre."""
    gap = 10 * s
    draw.line([(cx - half, y), (cx - gap, y)], fill=accent + (230,), width=max(1, int(1.6 * s)))
    draw.line([(cx + gap, y), (cx + half, y)], fill=accent + (230,), width=max(1, int(1.6 * s)))
    d = 5 * s
    draw.polygon([(cx, y - d), (cx + d, y), (cx, y + d), (cx - d, y)], fill=accent + (255,))
    for side in (-1, 1):
        draw.ellipse([cx + side * half - 2 * s, y - 2 * s, cx + side * half + 2 * s, y + 2 * s], fill=accent + (255,))


def title_elegant(im, story):
    """Cinzel: a small tracked kicker line, an ornament, the big line, a hairline under it."""
    w, h = im.size
    s = w / 1000
    out = scrim(im.convert('RGBA'))
    layer = Image.new('RGBA', out.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    top, big = story['lines']
    accent = story['accent']
    cx, y = w / 2, h * 0.68
    f1, t1 = fitted('Cinzel', 'Bold', top, 52 * s, 0.32, w * 0.8)
    draw_tracked(d, cx, y, top, f1, t1, (245, 240, 230, 255))
    y += f1.size * 1.35
    ornament(d, cx, y, w * 0.24, accent, s)
    y += 16 * s
    f2, t2 = fitted('Cinzel', 'Black', big, 128 * s, 0.04, w * 0.9)
    draw_tracked(d, cx, y, big, f2, t2, (255, 255, 255, 255))
    y += f2.size * 1.18
    d.line([(cx - w * 0.14, y), (cx + w * 0.14, y)], fill=accent + (200,), width=max(1, int(1.2 * s)))
    return with_shadow(out, layer, radius=6 * s).convert('RGB')


def title_bold(im, story):
    """Oswald kicker over a huge Anton line with the accent colour, rules either side of the kicker."""
    w, h = im.size
    s = w / 1000
    out = scrim(im.convert('RGBA'), start=0.55, strength=190)
    layer = Image.new('RGBA', out.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    top, big = story['lines']
    accent = story['accent']
    cx, y = w / 2, h * 0.71
    f1, t1 = fitted('Oswald', 'SemiBold', top, 50 * s, 0.22, w * 0.62)
    kw = tracked_width(top, f1, t1)
    draw_tracked(d, cx, y, top, f1, t1, accent + (255,))
    mid = y + f1.size * 0.62
    for side in (-1, 1):
        a, b = cx + side * (kw / 2 + 18 * s), cx + side * (w * 0.44)
        d.line([(min(a, b), mid), (max(a, b), mid)], fill=(255, 255, 255, 200), width=max(1, int(1.6 * s)))
    y += f1.size * 1.25
    f2, t2 = fitted('Anton', None, big, 150 * s, 0.015, w * 0.9)
    draw_tracked(d, cx, y, big, f2, t2, (255, 255, 255, 255))
    return with_shadow(out, layer, radius=5 * s, offset=(int(3 * s), int(4 * s)), opacity=210).convert('RGB')


def load(path):
    return Image.open(path).convert('RGB') if path and os.path.exists(path) else None


def cell(im, cw, ch, note=''):
    if im is None:
        c = Image.new('RGB', (cw, ch), (46, 46, 50))
        ImageDraw.Draw(c).text((cw / 2, ch / 2), note or 'not generated', font=font('Oswald', 22, 'Regular'), fill=(170, 170, 175), anchor='mm')
        return c
    return ImageOps.fit(im, (cw, ch), Image.LANCZOS, centering=(0.5, 0.4))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--pick', action='append', default=[], help='<story>=<model key>')
    ap.add_argument('--out-dir', default=V2)
    args = ap.parse_args()
    picks = dict(p.split('=', 1) for p in args.pick)
    bakeoff_in = os.path.join(V2, 'bakeoff')
    os.makedirs(os.path.join(args.out_dir, 'bakeoff'), exist_ok=True)

    cw, ch, gap, pad, label_h, row_h = 320, 480, 14, 24, 44, 40
    cols = 1 + len(MODELS)
    width = pad * 2 + cols * cw + (cols - 1) * gap
    n = len(STORIES)
    height = pad + label_h + n * (row_h + ch + gap) + 56 + row_h + ch + label_h + pad
    sheet = Image.new('RGB', (width, height), (18, 18, 20))
    d = ImageDraw.Draw(sheet)
    label_font, row_font = font('Oswald', 26, 'SemiBold'), font('Cormorant', 30, 'Bold')
    small = font('Oswald', 20, 'Regular')

    headers = ['Current cover'] + [name for _, name in MODELS]
    for i, text in enumerate(headers):
        d.text((pad + i * (cw + gap) + cw / 2, pad + label_h / 2), text, font=label_font, fill=(240, 240, 240), anchor='mm')

    y = pad + label_h
    titled = []
    for slug, story in STORIES.items():
        d.text((pad, y + row_h / 2), story['title'], font=row_font, fill=(236, 196, 120), anchor='lm')
        y += row_h
        current = load(os.path.join(ROOT, f"infra/seed/assets/story_{story['id']}/cover.png"))
        sheet.paste(cell(current, cw, ch), (pad, y))
        for i, (key, _) in enumerate(MODELS, start=1):
            sheet.paste(cell(load(os.path.join(bakeoff_in, f'{slug}-{key}.png')), cw, ch), (pad + i * (cw + gap), y))
        y += ch + gap

        pick = picks.get(slug)
        base = load(os.path.join(bakeoff_in, f'{slug}-{pick}.png')) if pick else None
        source = dict(MODELS).get(pick, pick) if base else 'stand-in: current cover'
        base = base or current
        for name, fn in (('elegant', title_elegant), ('bold', title_bold)):
            img = fn(base, story) if base else None
            if img:
                img.save(os.path.join(args.out_dir, 'bakeoff', f'{slug}-titled-{name}.png'))
            titled.append((img, f"{story['short']} · {name} · {source}"))

    y += 56 - gap
    d.text((pad, y - 28), 'Titles set in real type (Cinzel / Anton + Oswald) on the pick per story', font=label_font, fill=(240, 240, 240), anchor='lm')
    y += row_h - 30
    for i, (img, note) in enumerate(titled):
        x = pad + i * (cw + gap)
        sheet.paste(cell(img, cw, ch), (x, y))
        d.text((x + cw / 2, y + ch + label_h / 2), note, font=small, fill=(200, 200, 205), anchor='mm')

    out = os.path.join(args.out_dir, 'bakeoff.png')
    sheet.save(out)
    print(out, sheet.size)


if __name__ == '__main__':
    main()
