"""Cover v2: set a story's title in real type on its raw art and install the cover.

    python3 -I docs/stories-50/tools/cover-title.py story_paid_to_kill_me [story_... ...]
    python3 -I docs/stories-50/tools/cover-title.py --all            # every raw/<storyId>.png
    python3 -I docs/stories-50/tools/cover-title.py story_x --lines "KICKER|BIG LINE" --accent 236,196,120
    python3 -I docs/stories-50/tools/cover-title.py --sheet          # contact sheet of the installed covers

Reads docs/stories-50/cover-style-v2/raw/<storyId>.png (drawn by cover-v2.mts, no text in it), fits it to
1152x1744 with Lanczos (a centred crop of ~20 px a side: 832x1216 is a touch wider than 2:3), and sets the
story's exact `title` from packages/test-fixtures/src/<slug>.ts in the "elegant" treatment the owner picked
from the bake-off (cover-bakeoff-sheet.py, the Shrine Fox sample): a soft dark scrim, a small tracked Cinzel
Bold kicker, a thin ornament, the big Cinzel Black line and a hairline, with a soft shadow.

A long title splits into kicker + big line (MARRIED TO THE / SHRINE FOX); SPLITS holds the split for every
new-50 title, and a title not in it falls back to a heuristic. A short title is one big line. The accent
(ornament, hairline) is taken from the art's own brightest saturated colour unless --accent is given.

Writes infra/seed/assets/<storyId>/cover.png (creating the folder) and deletes that folder's cover.webp, so
`npx tsx infra/scripts/optimize-art.ts` makes a fresh one. --sheet writes cover-style-v2/all.png.
"""
import argparse
import colorsys
import glob
import os
import re
import sys
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
V2 = os.path.join(ROOT, 'docs/stories-50/cover-style-v2')
RAW = os.path.join(V2, 'raw')
ASSETS = os.path.join(ROOT, 'infra/seed/assets')
FIXTURES = os.path.join(ROOT, 'packages/test-fixtures/src')
FONT_DIR = os.path.join(ROOT, 'node_modules/.cache/cover-fonts')
FONTS = {'Cinzel': 'cinzel/Cinzel%5Bwght%5D.ttf', 'Oswald': 'oswald/Oswald%5Bwght%5D.ttf'}
SIZE = (1152, 1744)

# (kicker, big line) per title, upper-cased when drawn. None as the kicker: one big line.
SPLITS = {
    'Affection: 97': (None, 'Affection: 97'),
    'Every Platform a World': ('Every Platform', 'a World'),
    'The Zombie Who Said Please': ('The Zombie Who Said', 'Please'),
    'Three Feet Apart': ('Three Feet', 'Apart'),
    'Paid to Kill Me': ('Paid to', 'Kill Me'),
    'He Burned the Capital': ('He Burned the', 'Capital'),
    'The Only Girl at Blackthorn': ('The Only Girl at', 'Blackthorn'),
    'The Wolf Clan’s Guest': ('The Wolf Clan’s', 'Guest'),
    'Annulled, Then Claimed': ('Annulled, Then', 'Claimed'),
    'Thirty Days With the Number One Hero': ('Thirty Days With the', 'Number One Hero'),
    'The Villain Dies in Chapter Three': ('The Villain Dies in', 'Chapter Three'),
    'Back Row at My Own Wedding': ('Back Row at My Own', 'Wedding'),
    'Cleanup Crew, E-Rank': ('Cleanup Crew,', 'E-Rank'),
    'Crest Academy': (None, 'Crest Academy'),
    'Cut Loose at Floor 99': ('Cut Loose at', 'Floor 99'),
    'Echo Class': (None, 'Echo Class'),
    'Finals Week Outbreak': ('Finals Week', 'Outbreak'),
    'Human, Row Three': ('Human,', 'Row Three'),
    'Ice Queen’s Fake Boyfriend': ('Ice Queen’s', 'Fake Boyfriend'),
    'Inherited: One Failing Clan': ('Inherited:', 'One Failing Clan'),
    'Unit Nine': (None, 'Unit Nine'),
    'Level One, Wyvern Slayer': ('Level One,', 'Wyvern Slayer'),
    'Married to the Shrine Fox': ('Married to the', 'Shrine Fox'),
    'Noodles or Blood': ('Noodles or', 'Blood'),
    'Nova House': (None, 'Nova House'),
    'One Miracle a Day': ('One Miracle', 'a Day'),
    'One Week, She Said': ('One Week,', 'She Said'),
    'One-Year Bride': ('One-Year', 'Bride'),
    'Pack Rank': (None, 'Pack Rank'),
    'Rank Zero': (None, 'Rank Zero'),
    'Rent Is One True Story': ('Rent Is One', 'True Story'),
    'Rescue Rating': (None, 'Rescue Rating'),
    'Restart at Eighteen': ('Restart at', 'Eighteen'),
    'Roommate Lottery': ('Roommate', 'Lottery'),
    'Seven Years Early': ('Seven Years', 'Early'),
    'Skill: ERROR': (None, 'Skill: ERROR'),
    'Struck From the Register': ('Struck From the', 'Register'),
    'Ten Points to Expulsion': ('Ten Points to', 'Expulsion'),
    'The Cult Master Wakes as a Servant': ('The Cult Master Wakes as', 'a Servant'),
    'The Hero’s Spare': ('The Hero’s', 'Spare'),
    'The Last Mimic': ('The Last', 'Mimic'),
    'The Maid Owns the House Now': ('The Maid Owns', 'the House Now'),
    'The Morning of the Gallows': ('The Morning of the', 'Gallows'),
    'The One-Copper Inn': ('The One-Copper', 'Inn'),
    'The Only Man at Thornwitch': ('The Only Man at', 'Thornwitch'),
    'The Ranking Board': ('The Ranking', 'Board'),
    'Thin Walls': (None, 'Thin Walls'),
    'Three Heroines and a Porter': ('Three Heroines and', 'a Porter'),
    'Three Skills a Morning': ('Three Skills', 'a Morning'),
    'Villain Track': (None, 'Villain Track'),
}
SMALL_WORDS = {'a', 'an', 'the', 'of', 'to', 'at', 'in', 'on', 'for', 'with', 'from', 'and', 'or', 'as', 'is'}


def split_title(title):
    """The (kicker, big) pair for a title: SPLITS, else after a colon or comma, else a heuristic."""
    if title in SPLITS:
        return SPLITS[title]
    if len(title) <= 13:
        return None, title
    m = re.match(r'^(.+?[:,])\s+(.+)$', title)
    if m:
        return m.group(1), m.group(2)
    words = title.split()
    # The big line is the last word, plus a leading article or a short noun before it.
    k = len(words) - 1
    if k > 1 and words[k - 1].lower() in ('a', 'an'):
        k -= 1
    return ' '.join(words[:k]), ' '.join(words[k:])


def fixture_title(story_id):
    slug = story_id.removeprefix('story_').replace('_', '-')
    path = os.path.join(FIXTURES, f'{slug}.ts')
    with open(path, encoding='utf-8') as f:
        src = f.read()
    start = src.find(f"storyId: '{story_id}'")
    m = re.compile(r"^  title: (['\"])(.*?)\1,$", re.M).search(src, max(0, start))
    if start < 0 or not m:
        sys.exit(f'{story_id}: no storyId/title in {path}')
    return m.group(2).replace("\\'", "'")


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


def art_accent(im):
    """A light tint of the art's most vivid colour, for the ornament and hairline. Gold if the art is grey."""
    small = im.convert('RGB').resize((48, 72))
    best, score = None, 0.0
    for count, rgb in small.quantize(10).convert('RGB').getcolors(48 * 72):
        h, s, v = colorsys.rgb_to_hsv(*(c / 255 for c in rgb))
        sc = s * v * (count ** 0.5)
        if s > 0.35 and v > 0.35 and sc > score:
            best, score = (h, s), sc
    if best is None:
        return (236, 196, 120)
    r, g, b = colorsys.hsv_to_rgb(best[0], min(best[1], 0.5), 0.96)
    return (int(r * 255), int(g * 255), int(b * 255))


def title_elegant(im, kicker, big, accent):
    """Cinzel: a small tracked kicker line, an ornament, the big line, a hairline under it."""
    w, h = im.size
    s = w / 1000
    out = scrim(im.convert('RGBA'))
    layer = Image.new('RGBA', out.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx = w / 2
    if kicker:
        y = h * 0.68
        f1, t1 = fitted('Cinzel', 'Bold', kicker.upper(), 52 * s, 0.32, w * 0.8)
        draw_tracked(d, cx, y, kicker.upper(), f1, t1, (245, 240, 230, 255))
        y += f1.size * 1.35
    else:
        y = h * 0.72
    ornament(d, cx, y, w * 0.24, accent, s)
    y += 16 * s
    f2, t2 = fitted('Cinzel', 'Black', big.upper(), 128 * s, 0.04, w * 0.9)
    draw_tracked(d, cx, y, big.upper(), f2, t2, (255, 255, 255, 255))
    y += f2.size * 1.18
    d.line([(cx - w * 0.14, y), (cx + w * 0.14, y)], fill=accent + (200,), width=max(1, int(1.2 * s)))
    return with_shadow(out, layer, radius=6 * s).convert('RGB')


def install(story_id, lines=None, accent=None):
    raw = os.path.join(RAW, f'{story_id}.png')
    if not os.path.exists(raw):
        sys.exit(f'{story_id}: no raw art at {raw}')
    title = fixture_title(story_id)
    kicker, big = lines if lines else split_title(title)
    joined = ' '.join(p for p in (kicker, big) if p)
    if joined != title:
        sys.exit(f'{story_id}: split {kicker!r} + {big!r} does not spell the title {title!r}')
    art = ImageOps.fit(Image.open(raw).convert('RGB'), SIZE, Image.LANCZOS, centering=(0.5, 0.5))
    cover = title_elegant(art, kicker, big, accent or art_accent(art))
    folder = os.path.join(ASSETS, story_id)
    os.makedirs(folder, exist_ok=True)
    cover.save(os.path.join(folder, 'cover.png'))
    webp = os.path.join(folder, 'cover.webp')
    if os.path.exists(webp):
        os.remove(webp)
    print(f'{story_id}: {title!r} -> {os.path.relpath(folder, ROOT)}/cover.png ({kicker or "-"} | {big})')


def sheet(ids, out, per_row=10, cw=200):
    ch = int(cw * SIZE[1] / SIZE[0])
    gap, pad, label = 12, 20, 46
    rows = (len(ids) + per_row - 1) // per_row
    width = pad * 2 + per_row * cw + (per_row - 1) * gap
    height = pad * 2 + rows * (ch + label) + (rows - 1) * gap
    im = Image.new('RGB', (width, height), (18, 18, 20))
    d = ImageDraw.Draw(im)
    f = font('Oswald', 15, 'Regular')
    for i, sid in enumerate(ids):
        x = pad + (i % per_row) * (cw + gap)
        y = pad + (i // per_row) * (ch + label + gap)
        path = os.path.join(ASSETS, sid, 'cover.png')
        if os.path.exists(path):
            im.paste(ImageOps.fit(Image.open(path).convert('RGB'), (cw, ch), Image.LANCZOS), (x, y))
        title = fixture_title(sid)
        lines, line = [], ''
        for word in title.split():
            if line and f.getlength(f'{line} {word}') > cw:
                lines.append(line)
                line = word
            else:
                line = f'{line} {word}'.strip()
        lines.append(line)
        for j, text in enumerate(lines[:2]):
            d.text((x + cw / 2, y + ch + 6 + j * 18), text, font=f, fill=(225, 225, 230), anchor='mt')
    im.save(out)
    print(out, im.size, len(ids), 'covers')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('stories', nargs='*')
    ap.add_argument('--all', action='store_true', help='every raw/<storyId>.png')
    ap.add_argument('--lines', help='"KICKER|BIG" (empty kicker for one line); must spell the title')
    ap.add_argument('--accent', help='r,g,b for the ornament and hairline')
    ap.add_argument('--sheet', action='store_true', help='write cover-style-v2/all.png from the installed covers')
    args = ap.parse_args()
    ids = args.stories or (sorted(os.path.basename(p)[:-4] for p in glob.glob(os.path.join(RAW, 'story_*.png'))) if args.all or args.sheet else [])
    if args.sheet:
        sheet(ids, os.path.join(V2, 'all.png'))
        return
    lines = None
    if args.lines:
        k, b = args.lines.split('|', 1)
        lines = (k or None, b)
    accent = tuple(int(c) for c in args.accent.split(',')) if args.accent else None
    for sid in ids:
        install(sid, lines, accent)


if __name__ == '__main__':
    main()
