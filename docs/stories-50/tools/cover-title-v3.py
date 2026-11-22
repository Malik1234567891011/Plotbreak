"""Cover v3: set a story's title in one of the ten recipe treatments of cover-style-v3/recipes.json.

    python3 -I docs/stories-50/tools/cover-title-v3.py --recipe <id> --story <storyId> --in <png> --out <png>
    python3 -I docs/stories-50/tools/cover-title-v3.py ... --lines "KICKER|BIG"   # override the split; must spell the title
    python3 -I docs/stories-50/tools/cover-title-v3.py ... --fallback             # painted recipe: typeset its fallback
    python3 -I docs/stories-50/tools/cover-title-v3.py --samples                  # all ten on v2 raws -> cover-style-v3/title-samples/

The input is upscaled to 1152x1744 first (Lanczos, centred crop; 832x1216 is a touch wider than 2:3). The
title is the exact `title` of the story's fixture, found by storyId in packages/test-fixtures/src/*.ts. A
recipe whose title.mode is "painted" already carries its title in the art (Tsubaki.3 paints it), so only
the frame is added, unless --fallback asks for the recipe's typeset fallback.

Title spec keys (every px value is at 1152x1744):
  font, weight, style ("italic"), case ("upper" | "as-is"), split ("kicker" | "balanced" | "single"),
  color or gradient (hex stops, top to bottom), stroke [{color, width}] (outermost first, widths from the
  glyph edge), glow {color, radius, opacity, spread}, shadow {color, opacity, radius, offset} (radius 0 is
  a hard offset shadow), engraved (gold: top-edge highlight and bottom-edge shade), skew (deg; negative
  leans right like CSS skewX), rotate (deg, clockwise), brackets [open, close], kicker {the same keys plus
  size, tracking (em), label {color, padding, radius}; shadow, glow and skew are inherited unless set},
  maxLines (2 by default; 3 lets a "balanced" title of three or more words stack on three lines when that
  buys bigger type), ornament [...], position (top | middle | bottom | top-left | middle-left | bottom-left | right-vertical),
  marginX, topMargin, bottomMargin, indent, lineHeight, overlap, sizeShare (share of cover height the
  block aims for; of cover width for a vertical title), scrim {edge, color, opacity, from}.
Ornaments: rule-diamond, rules-star, rules-flank, sparkles, hud-brackets, seal, brush-swash, paper-scrap,
doodles, panel. Frames: none, thin, gold-ornate, neon-hud.

The (kicker, big) split comes from split_title() in cover-title.py (its SPLITS table covers every new-50
title). Fonts are OFL families from github.com/google/fonts at a pinned commit, downloaded on first use
into docs/stories-50/tools/fonts/ (sources in fonts/README.md).
"""
import argparse
import glob
import hashlib
import importlib.util
import json
import math
import os
import random
import re
import sys
import urllib.parse
import urllib.request

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont, ImageOps

sys.dont_write_bytecode = True  # the sibling tools are loaded by path; keep docs/ free of __pycache__

TOOLS = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(TOOLS, '../../..'))
V3 = os.path.join(ROOT, 'docs/stories-50/cover-style-v3')
V2_RAW = os.path.join(ROOT, 'docs/stories-50/cover-style-v2/raw')
RECIPES = os.path.join(V3, 'recipes.json')
FIXTURES = os.path.join(ROOT, 'packages/test-fixtures/src')
FONT_DIR = os.path.join(TOOLS, 'fonts')
GF_COMMIT = '06bfe0d62a98375cb09c942fa18e68bd32cff057'
W, H = 1152, 1744

# Family -> file(s) under github.com/google/fonts (all OFL). 'variable': set the wght axis.
FONTS = {
    'Pinyon Script': {'file': 'ofl/pinyonscript/PinyonScript-Regular.ttf'},
    'Great Vibes': {'file': 'ofl/greatvibes/GreatVibes-Regular.ttf'},
    'Cinzel Decorative': {'static': {400: 'ofl/cinzeldecorative/CinzelDecorative-Regular.ttf',
                                     700: 'ofl/cinzeldecorative/CinzelDecorative-Bold.ttf',
                                     900: 'ofl/cinzeldecorative/CinzelDecorative-Black.ttf'}},
    'Cinzel': {'file': 'ofl/cinzel/Cinzel[wght].ttf', 'variable': True},
    'Russo One': {'file': 'ofl/russoone/RussoOne-Regular.ttf'},
    'Anton': {'file': 'ofl/anton/Anton-Regular.ttf'},
    'Oswald': {'file': 'ofl/oswald/Oswald[wght].ttf', 'variable': True},
    'Sedgwick Ave Display': {'file': 'ofl/sedgwickavedisplay/SedgwickAveDisplay-Regular.ttf'},
    'Dela Gothic One': {'file': 'ofl/delagothicone/DelaGothicOne-Regular.ttf'},
    'Caveat': {'file': 'ofl/caveat/Caveat[wght].ttf', 'variable': True},
    'Playfair Display': {'file': 'ofl/playfairdisplay/PlayfairDisplay[wght].ttf',
                         'italic': 'ofl/playfairdisplay/PlayfairDisplay-Italic[wght].ttf', 'variable': True},
    'Shippori Mincho B1': {'static': {800: 'ofl/shipporiminchob1/ShipporiMinchoB1-ExtraBold.ttf'}},
    'Orbitron': {'file': 'ofl/orbitron/Orbitron[wght].ttf', 'variable': True},
}

# --samples: which v2 raw each recipe is tried on (the art's title comes along with it). Holy High-Key
# needs light art: its title is deep indigo ink for white covers, so it is tried on the brightest raw.
SAMPLES = {
    'holy-high-key': 'story_crest_academy',
    'gilded-over-the-shoulder': 'story_inherited_one_failing_clan',
    'thumbnail-pop': 'story_thirty_days_with_the_number_one_hero',
    'hot-pink-poster': 'story_roommate_lottery',
    'ink-and-one-red': 'story_struck_from_the_register',
    'sunlit-webtoon-duo': 'story_ice_queen_s_fake_boyfriend',
    'cosy-lamp-bokeh': 'story_the_one_copper_inn',
    'melodrama-red-accent': 'story_back_row_at_my_own_wedding',
    'starlit-night': 'story_seven_years_early',
    'system-window': 'story_skill_error',
}
SMALL_WORDS = {'a', 'an', 'the', 'of', 'to', 'at', 'in', 'on', 'for', 'with', 'from', 'and', 'or', 'as', 'is'}


# ---------------------------------------------------------------- data


def load_recipes():
    with open(RECIPES, encoding='utf-8') as f:
        data = json.load(f)
    return {r['id']: r for r in data['recipes']}


def fixture_title(story_id):
    """The exact `title` that follows `storyId: '<id>'` in a fixture under packages/test-fixtures/src."""
    for path in sorted(glob.glob(os.path.join(FIXTURES, '*.ts'))):
        if path.endswith('.spec.ts'):
            continue
        with open(path, encoding='utf-8') as f:
            src = f.read()
        start = src.find(f"storyId: '{story_id}'")
        if start < 0:
            continue
        m = re.compile(r"^\s+title: (['\"])((?:\\.|(?!\1).)*)\1,\s*$", re.M).search(src, start)
        if m:
            return m.group(2).replace("\\'", "'").replace('\\"', '"')
    sys.exit(f'{story_id}: no fixture with that storyId and a title in {FIXTURES}')


def split_title(title):
    """(kicker, big) from cover-title.py, the one table of new-50 splits."""
    path = os.path.join(TOOLS, 'cover-title.py')
    spec = importlib.util.spec_from_file_location('cover_title_v2', path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.split_title(title)


# ---------------------------------------------------------------- fonts and colour

_fonts = {}


def font_file(rel):
    path = os.path.join(FONT_DIR, os.path.basename(rel))
    if not os.path.exists(path):
        os.makedirs(os.path.join(FONT_DIR, 'licenses'), exist_ok=True)
        base = f'https://raw.githubusercontent.com/google/fonts/{GF_COMMIT}/'
        print(f'fetching {rel}', file=sys.stderr)
        urllib.request.urlretrieve(base + urllib.parse.quote(rel), path + '.part')
        os.replace(path + '.part', path)
        family_dir = rel.split('/')[1]
        lic = os.path.join(FONT_DIR, 'licenses', f'{family_dir}-OFL.txt')
        if not os.path.exists(lic):
            urllib.request.urlretrieve(base + f'ofl/{family_dir}/OFL.txt', lic)
    return path


def load_font(family, size, weight=400, italic=False):
    size = max(6, int(round(size)))
    key = (family, size, weight, italic)
    if key in _fonts:
        return _fonts[key]
    if family not in FONTS:
        sys.exit(f'font {family!r} is not in FONTS (cover-title-v3.py); add its google/fonts path')
    spec = FONTS[family]
    if 'static' in spec:
        rel = spec['static'][min(spec['static'], key=lambda w: abs(w - weight))]
    else:
        rel = spec['italic'] if italic and 'italic' in spec else spec['file']
    f = ImageFont.truetype(font_file(rel), size)
    if spec.get('variable'):
        values = []
        for ax in f.get_variation_axes():
            name = ax.get('name', b'')
            name = name.decode() if isinstance(name, bytes) else str(name)
            values.append(max(ax['minimum'], min(ax['maximum'], weight)) if 'eight' in name or name == 'wght' else ax['default'])
        f.set_variation_by_axes(values)
    _fonts[key] = f
    return f


def rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def solid(size, color, alpha_mask, opacity=1.0):
    layer = Image.new('RGBA', size, rgb(color) + (255,))
    layer.putalpha(alpha_mask if opacity >= 1 else alpha_mask.point(lambda a: int(a * opacity)))
    return layer


def gradient_column(stops, height):
    cols = [rgb(c) for c in stops]
    col = Image.new('RGB', (1, max(1, height)))
    for y in range(max(1, height)):
        t = y / max(1, height - 1) * (len(cols) - 1)
        i = min(int(t), len(cols) - 2)
        u = t - i
        col.putpixel((0, y), tuple(int(a + (b - a) * u) for a, b in zip(cols[i], cols[i + 1])))
    return col


def smoothstep(t):
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


# ---------------------------------------------------------------- one line of type


class Line:
    def __init__(self, img, core, baseline, size, role, text):
        self.img, self.core, self.baseline, self.size, self.role, self.text = img, core, baseline, size, role, text
        self.bbox = core.getbbox() or (0, 0, 1, 1)

    @property
    def width(self):
        return self.bbox[2] - self.bbox[0]


def advance(text, f, tracking, ws=0):
    if not tracking and not ws:
        return f.getlength(text)
    return sum(f.getlength(ch) + (ws if ch == ' ' else 0) for ch in text) + tracking * (len(text) - 1)


def text_mask(size, origin, text, f, tracking, stroke=0, ws=0):
    """The text as an L mask; tracking and extra word space (px) set it glyph by glyph."""
    m = Image.new('L', size, 0)
    d = ImageDraw.Draw(m)
    x, y = origin
    if not tracking and not ws:
        d.text((x, y), text, font=f, fill=255, anchor='ls', stroke_width=stroke, stroke_fill=255)
    else:
        for ch in text:
            d.text((x, y), ch, font=f, fill=255, anchor='ls', stroke_width=stroke, stroke_fill=255)
            x += f.getlength(ch) + tracking + (ws if ch == ' ' else 0)
    return m


def skew(img, core, deg):
    """Shear along x keeping the bottom row; negative deg leans the top to the right (CSS skewX)."""
    t = math.tan(math.radians(-deg))
    w, h = img.size
    off = -min(0.0, t * h)
    data = (1, t, -t * h - off, 0, 1, 0)
    size = (int(w + abs(t) * h) + 2, h)
    return (img.transform(size, Image.AFFINE, data, resample=Image.BICUBIC),
            core.transform(size, Image.AFFINE, data, resample=Image.BILINEAR))


def render_line(text, st, size, role, measure=False):
    f = load_font(st['font'], size, st.get('weight', 400), st.get('style') == 'italic')
    size = f.size
    tracking = st.get('tracking', 0) * size
    ws = st.get('wordSpace', 0) * size
    strokes = sorted(st.get('stroke') or [], key=lambda s: -s['width'])
    max_stroke = int(round(strokes[0]['width'])) if strokes else 0
    glow, shadow, label = st.get('glow'), st.get('shadow'), st.get('label')
    spread = int(glow.get('spread', 0)) if glow else 0
    blur = max(glow['radius'] if glow else 0, shadow['radius'] if shadow else 0)
    off = shadow.get('offset', [0, 0]) if shadow else [0, 0]
    lpad = label.get('padding', [16, 8]) if label else [0, 0]
    pad = int(max_stroke + spread + 3 * blur + max(abs(off[0]), abs(off[1])) + 0.5 * size + max(lpad) + 8)
    ascent, descent = f.getmetrics()
    cw = int(advance(text, f, tracking, ws)) + 2 * pad
    ch = ascent + descent + 2 * pad
    origin = (pad, pad + ascent)
    fill_m = text_mask((cw, ch), origin, text, f, tracking, 0, ws)
    outer_m = text_mask((cw, ch), origin, text, f, tracking, max_stroke, ws) if max_stroke else fill_m
    core = outer_m.copy()
    img = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    if label:
        bb = fill_m.getbbox() or (pad, pad, pad + 1, pad + 1)
        rect = [bb[0] - lpad[0], bb[1] - lpad[1], bb[2] + lpad[0], bb[3] + lpad[1]]
        ImageDraw.Draw(core).rounded_rectangle(rect, radius=label.get('radius', 0), fill=255)
        if not measure:
            ImageDraw.Draw(img).rounded_rectangle(rect, radius=label.get('radius', 0), fill=rgb(label['color']) + (255,))
    if not measure:
        if shadow:
            m = ImageChops.offset(outer_m, int(off[0]), int(off[1]))
            if shadow.get('radius', 0) > 0:
                m = m.filter(ImageFilter.GaussianBlur(shadow['radius']))
            img = Image.alpha_composite(img, solid(img.size, shadow['color'], m, shadow.get('opacity', 0.6)))
        if glow:
            m = text_mask((cw, ch), origin, text, f, tracking, max_stroke + spread, ws) if spread else outer_m
            m = m.filter(ImageFilter.GaussianBlur(glow['radius']))
            img = Image.alpha_composite(img, solid(img.size, glow['color'], m, glow.get('opacity', 0.7)))
        for s in strokes:
            m = text_mask((cw, ch), origin, text, f, tracking, int(round(s['width'])), ws)
            img = Image.alpha_composite(img, solid(img.size, s['color'], m))
        bb = fill_m.getbbox()
        if st.get('gradient') and bb:
            grad = Image.new('RGB', img.size, rgb(st['gradient'][0]))
            grad.paste(gradient_column(st['gradient'], bb[3] - bb[1]).resize((cw, bb[3] - bb[1])), (0, bb[1]))
            grad.paste(rgb(st['gradient'][-1]), (0, bb[3], cw, ch))
            layer = grad.convert('RGBA')
            layer.putalpha(fill_m)
        else:
            layer = solid(img.size, st.get('color', '#FFFFFF'), fill_m)
        img = Image.alpha_composite(img, layer)
        if st.get('engraved'):
            k = max(1, round(size * 0.03))
            hl = ImageChops.subtract(fill_m, ImageChops.offset(fill_m, 0, k)).filter(ImageFilter.GaussianBlur(0.8))
            sh = ImageChops.subtract(fill_m, ImageChops.offset(fill_m, 0, -k)).filter(ImageFilter.GaussianBlur(0.8))
            img = Image.alpha_composite(img, solid(img.size, '#FFF6D0', hl, 0.85))
            img = Image.alpha_composite(img, solid(img.size, '#3B2406', sh, 0.6))
    if st.get('skew'):
        img, core = skew(img, core, st['skew'])
    box = core.getbbox() if measure else img.getbbox()
    if not box:
        box = (0, 0, 1, 1)
    if not measure:
        cb = core.getbbox() or box
        box = (min(box[0], cb[0]), min(box[1], cb[1]), max(box[2], cb[2]), max(box[3], cb[3]))
    return Line(img.crop(box), core.crop(box), origin[1] - box[1], size, role, text)


def fit_line(text, st, size, max_w, role):
    """Largest size at or under `size` whose core (strokes, label and skew included) fits max_w."""
    for _ in range(5):
        w = render_line(text, st, size, role, measure=True).width
        if w <= max_w or size < 8:
            return size
        size *= max_w / w * 0.985
    return size


# ---------------------------------------------------------------- the title block


def cased(text, st):
    return text.upper() if st.get('case') == 'upper' else text


def balanced_two(words):
    best, cut = None, 1
    for i in range(1, len(words)):
        a, b = ' '.join(words[:i]), ' '.join(words[i:])
        score = max(len(a), len(b))
        if i > 1 and words[i - 1].lower() in ('a', 'an', 'the'):
            score += 3  # an article never ends a line: 'One Miracle a / Day'
        if len(words) - i == 1 and len(b) <= 4:
            score += 4  # a widow: 'The One-Copper / Inn'
        if best is None or score < best:
            best, cut = score, i
    return [' '.join(words[:cut]), ' '.join(words[cut:])]


def balanced_three(words):
    """Three lines of near-equal length; no line ends on an article or is only a small word."""
    best, cuts = None, None
    for i in range(1, len(words) - 1):
        for j in range(i + 1, len(words)):
            parts = [words[:i], words[i:j], words[j:]]
            score = max(len(' '.join(p)) for p in parts)
            for p in parts[:2]:
                if p[-1].lower() in ('a', 'an', 'the'):
                    score += 3
            for p in parts:
                if len(p) == 1 and (len(p[0]) <= 2 or p[0].lower() in SMALL_WORDS):
                    score += 6
            if best is None or score < best:
                best, cuts = score, (i, j)
    i, j = cuts
    return [' '.join(words[:i]), ' '.join(words[i:j]), ' '.join(words[j:])]


def kicker_style(spec):
    k = dict(spec['kicker'])
    for key in ('shadow', 'glow', 'skew'):
        if key not in k and key in spec:
            k[key] = spec[key]
    k.setdefault('tracking', 0.2)
    k.setdefault('color', '#FFFFFF')
    return k


def big_style(spec):
    return {k: v for k, v in spec.items() if k not in ('kicker', 'ornament', 'scrim')}


def ornaments(spec):
    return spec.get('ornament') or []


def layout_lines(title, spec, lines_override):
    """Choose the lines and sizes. Returns (lines, info)."""
    vertical = spec.get('vertical') or spec.get('position') == 'right-vertical'
    split = spec.get('split', 'kicker')
    if lines_override:
        kicker, big = lines_override
        if split != 'kicker':
            kicker, options = None, [[p for p in (kicker, big) if p]]
        else:
            options = None
    elif split == 'kicker':
        kicker, big = split_title(title)
        options = None
    else:
        kicker, big = None, title
        options = None
    if options is None:
        words = big.split()
        options = [[big]]
        if len(words) >= 2 and split != 'single':
            two = balanced_two(words)
            # Never a line that is only an article or a short small word ('A' / 'SERVANT').
            if all(len(p) > 2 and p.lower() not in SMALL_WORDS for p in two):
                options.append(two)
        if len(words) >= 3 and split == 'balanced' and spec.get('maxLines', 2) >= 3:
            options.append(balanced_three(words))
    bst = big_style(spec)
    if spec.get('brackets'):
        o, c = spec['brackets']
        options = [[o + opt[0]] + opt[1:-1] + [opt[-1] + c] if len(opt) > 1 else [o + opt[0] + c] for opt in options]
    if vertical:
        max_w = H * (1 - spec.get('topMargin', 0.06) - spec.get('bottomMargin', 0.06))
        target = spec['sizeShare'] * W
    else:
        mx = spec.get('marginX', 0.07)
        max_w = W * (1 - 2 * mx)
        target = spec['sizeShare'] * H
    kinds = {o['type'] for o in ornaments(spec)}
    max_w -= 90 if kinds & {'sparkles', 'hud-brackets'} else 0
    max_w -= 120 if 'panel' in kinds else 0
    lh = spec.get('lineHeight', 0.95)
    kst = kicker_style(spec) if kicker and spec.get('kicker') else None
    if kicker and not kst:
        kst = dict(bst, tracking=0.15)
        kst['size'] = 0.4 * target
    between = any(o.get('where') == 'between' for o in ornaments(spec))
    k_h = (kst['size'] * (1.3 + (0.9 if between else 0))) if kst else 0
    best = None
    for opt in options:
        n = len(opt)
        s0 = max(20, (target - k_h) / (0.75 + (n - 1) * lh))
        avail = max_w - (spec.get('indent', 0) * W if n > 1 and spec.get('position', '').endswith('left') else 0)
        s = s0
        for text in opt:
            s = min(s, fit_line(cased(text, bst), bst, s0, avail, 'big'))
        # A second line must buy noticeably bigger type.
        if best is None or s > best[0] * (1.15 if n > len(best[1]) else 1.0):
            best = (s, opt)
    size, opt = best
    lines = []
    if kst:
        ktext = cased(kicker, kst)
        ks = fit_line(ktext, kst, kst['size'], max_w, 'kicker')
        lines.append(render_line(ktext, kst, ks, 'kicker'))
    for text in opt:
        lines.append(render_line(cased(text, bst), bst, size, 'big'))
    return lines, {'size': size, 'kicker': kicker, 'big': opt, 'max_w': max_w, 'between': between}


class Op:
    def __init__(self, kind, rect, behind, **kw):
        self.kind, self.rect, self.behind, self.kw = kind, rect, behind, kw


def union(rects):
    rects = [r for r in rects if r]
    return (min(r[0] for r in rects), min(r[1] for r in rects), max(r[2] for r in rects), max(r[3] for r in rects))


def grow(r, dx, dy=None):
    dy = dx if dy is None else dy
    return (r[0] - dx, r[1] - dy, r[2] + dx, r[3] + dy)


def build_block(title, spec, lines_override, seed):
    """The title block on its own transparent canvas, plus an L 'core' of everything visible but glow."""
    lines, info = layout_lines(title, spec, lines_override)
    align = 'center'
    pos = spec.get('position', 'bottom')
    if pos.endswith('left') or spec.get('vertical') or pos == 'right-vertical':
        align = 'left'  # a vertical title starts at the top
    lh = spec.get('lineHeight', 0.95)
    big_size = info['size']
    placed = []  # (line, x, y) of the image's top-left in block coordinates
    prev = None
    big_index = 0
    for ln in lines:
        if prev is None:
            y = -ln.bbox[1]
        elif prev.role == 'kicker':
            gap = 0.3 * prev.size + (0.9 * prev.size if info['between'] else 0)
            if spec.get('overlap'):
                gap = -spec['overlap'] * ln.size
            y = (placed[-1][2] + prev.bbox[3]) + gap - ln.bbox[1]
        else:
            y = placed[-1][2] + prev.baseline + lh * ln.size - ln.baseline
        if align == 'left':
            indent = spec.get('indent', 0) * W if (ln.role == 'big' and big_index > 0) else 0
            x = indent - ln.bbox[0]
        else:
            x = -(ln.bbox[0] + ln.bbox[2]) / 2
        placed.append((ln, x, y))
        if ln.role == 'big':
            big_index += 1
        prev = ln
    cores = [(x + ln.bbox[0], y + ln.bbox[1], x + ln.bbox[2], y + ln.bbox[3]) for ln, x, y in placed]
    U = union(cores)
    kick_rect = cores[0] if lines[0].role == 'kicker' else None
    big_rects = [c for (ln, _, _), c in zip(placed, cores) if ln.role == 'big']
    rng = random.Random(seed)
    ops = []

    def hline_span(length):
        length = min(length, info['max_w'])
        if align == 'left':
            return U[0], U[0] + length
        cx = (U[0] + U[2]) / 2
        return cx - length / 2, cx + length / 2

    for o in ornaments(spec):
        kind, color = o['type'], o.get('color', '#FFFFFF')
        where = o.get('where', 'below')
        if kind in ('rule-diamond', 'rules-star'):
            if where == 'between' and kick_rect and big_rects:
                y = (kick_rect[3] + big_rects[0][1]) / 2
            elif where == 'above':
                y = U[1] - max(18, 0.18 * big_size)
            else:
                y = U[3] + max(20, 0.2 * big_size)
            x0, x1 = hline_span(o.get('width', 0.4) * W)
            ops.append(Op(kind, (x0 - 6, y - 16, x1 + 6, y + 16), False, color=color, y=y, x0=x0, x1=x1))
        elif kind == 'rules-flank' and kick_rect:
            y = (kick_rect[1] + kick_rect[3]) / 2
            total = min(o.get('width', 0.8) * W, info['max_w'])
            side = max(30, (total - (kick_rect[2] - kick_rect[0])) / 2 - 22)
            ops.append(Op(kind, (kick_rect[0] - 22 - side, y - 4, kick_rect[2] + 22 + side, y + 4), False,
                          color=color, y=y, k=kick_rect, side=side))
        elif kind == 'sparkles':
            spots = [(U[2] + 18, U[1] - 4, 26), (U[0] - 26, U[1] + 0.35 * (U[3] - U[1]), 16),
                     (U[2] - 0.12 * (U[2] - U[0]), U[3] + 18, 20), (U[0] + 0.2 * (U[2] - U[0]), U[1] - 22, 14),
                     (U[2] + 30, U[1] + 0.65 * (U[3] - U[1]), 18)]
            for x, y, r in spots[:o.get('count', 3)]:
                ops.append(Op('sparkle', (x - r - 6, y - r - 6, x + r + 6, y + r + 6), False, color=color, x=x, y=y, r=r))
        elif kind == 'hud-brackets':
            r = grow(U, 30, 24)
            ops.append(Op(kind, grow(r, 4), False, color=color, r=r))
        elif kind == 'seal':
            last = big_rects[-1]
            side = max(96, min(170, 0.95 * big_size))
            x0 = last[2] + 0.3 * side
            y0 = (last[1] + last[3]) / 2 - side / 2
            if x0 + side - U[0] > info['max_w']:
                x0, y0 = U[2] - side, U[3] + 0.35 * side
            words = [w.strip(':,.!?\u2019\'') for w in title.split()]
            words = [w for w in words if w and w.lower() not in SMALL_WORDS][:2]
            ops.append(Op(kind, (x0, y0, x0 + side, y0 + side), False, color=color, side=side, words=words))
        elif kind == 'brush-swash':
            T = max(10, min(28, 0.13 * big_size))
            y = U[3] + 0.6 * T + 6
            x0 = U[0] - 0.04 * (U[2] - U[0])
            x1 = U[0] + 0.95 * (U[2] - U[0])
            ops.append(Op(kind, (x0, y - 2 * T, x1, y + 2 * T), True, color=color, y=y, x0=x0, x1=x1, T=T))
        elif kind == 'paper-scrap':
            r = (U[0] - 0.42 * big_size, U[1] - 0.34 * big_size, U[2] + 0.42 * big_size, U[3] + 0.3 * big_size)
            ops.append(Op(kind, grow(r, 10, 34), True, r=r, **{k: v for k, v in o.items() if k != 'type'}))
        elif kind == 'panel':
            r = grow(U, 56, 40)
            r = (r[0], r[1] - 34, r[2], r[3])
            ops.append(Op(kind, grow(r, 6), True, r=r, color=o.get('color', '#04252B'),
                          opacity=o.get('opacity', 0.7), border=o.get('border', '#3CF2FF')))
    # Doodles ride on the paper scrap if there is one, else on the text.
    for o in ornaments(spec):
        if o['type'] == 'doodles':
            paper = next((op.rect for op in ops if op.kind == 'paper-scrap'), U)
            heart = (paper[2] - 8, paper[1] + 18, 34)
            star = (paper[0] + 40, paper[3] + 16, 26)
            ops.append(Op('heart', (heart[0] - 42, heart[1] - 42, heart[0] + 42, heart[1] + 42), False,
                          color=o.get('color', '#E06C7C'), x=heart[0], y=heart[1], r=heart[2]))
            ops.append(Op('star5', (star[0] - 34, star[1] - 34, star[0] + 34, star[1] + 34), False,
                          color=o.get('color', '#E06C7C'), x=star[0], y=star[1], r=star[2]))

    img_rects = [(x, y, x + ln.img.size[0], y + ln.img.size[1]) for ln, x, y in placed]
    B = grow(union(img_rects + [op.rect for op in ops]), 40)
    ox, oy = -B[0], -B[1]
    size = (int(B[2] - B[0]) + 1, int(B[3] - B[1]) + 1)
    block = Image.new('RGBA', size, (0, 0, 0, 0))
    core = Image.new('L', size, 0)
    for op in ops:
        if op.behind:
            block = draw_op(block, core, op, ox, oy, rng)
    for ln, x, y in sorted(placed, key=lambda p: p[0].role == 'kicker'):  # the kicker sits over a swash
        layer = Image.new('RGBA', size, (0, 0, 0, 0))
        layer.paste(ln.img, (int(round(x + ox)), int(round(y + oy))))
        block = Image.alpha_composite(block, layer)
        cl = Image.new('L', size, 0)
        cl.paste(ln.core, (int(round(x + ox)), int(round(y + oy))))
        core = ImageChops.lighter(core, cl)
    for op in ops:
        if not op.behind:
            block = draw_op(block, core, op, ox, oy, rng)
    if spec.get('rotate'):
        block = block.rotate(-spec['rotate'], resample=Image.BICUBIC, expand=True)
        core = core.rotate(-spec['rotate'], resample=Image.BILINEAR, expand=True)
    return block, core, info


# ---------------------------------------------------------------- ornaments


def star_points(x, y, r, points=4, inner=0.22, rot=-math.pi / 2):
    pts = []
    for i in range(points * 2):
        rad = r if i % 2 == 0 else r * inner
        a = rot + i * math.pi / points
        pts.append((x + rad * math.cos(a), y + rad * math.sin(a)))
    return pts


def draw_op(block, core, op, ox, oy, rng):
    size = block.size
    layer = Image.new('RGBA', size, (0, 0, 0, 0))
    mask = Image.new('L', size, 0)
    d = ImageDraw.Draw(mask)
    kw = op.kw
    color = kw.get('color', '#FFFFFF')
    shadow = 0.0
    glow = 0.0
    if op.kind in ('rule-diamond', 'rules-star'):
        y = kw['y'] + oy
        x0, x1 = kw['x0'] + ox, kw['x1'] + ox
        cx = (x0 + x1) / 2
        gap = 16
        d.line([(x0, y), (cx - gap, y)], fill=255, width=2)
        d.line([(cx + gap, y), (x1, y)], fill=255, width=2)
        if op.kind == 'rule-diamond':
            r = 8
            d.polygon([(cx, y - r), (cx + r, y), (cx, y + r), (cx - r, y)], fill=255)
        else:
            d.polygon(star_points(cx, y, 13, 4, 0.25), fill=255)
            glow = 4
        for x in (x0, x1):
            d.ellipse([x - 3, y - 3, x + 3, y + 3], fill=255)
        shadow = 0.45
    elif op.kind == 'rules-flank':
        y = kw['y'] + oy
        k = kw['k']
        d.line([(k[0] + ox - 22 - kw['side'], y), (k[0] + ox - 22, y)], fill=255, width=2)
        d.line([(k[2] + ox + 22, y), (k[2] + ox + 22 + kw['side'], y)], fill=255, width=2)
        shadow = 0.5
    elif op.kind == 'sparkle':
        d.polygon(star_points(kw['x'] + ox, kw['y'] + oy, kw['r'], 4, 0.2), fill=255)
        glow = kw['r'] * 0.5
    elif op.kind == 'hud-brackets':
        r = kw['r']
        x0, y0, x1, y1 = r[0] + ox, r[1] + oy, r[2] + ox, r[3] + oy
        arm, wd = 46, 6
        for cx, cy, sx, sy in ((x0, y0, 1, 1), (x1, y0, -1, 1), (x0, y1, 1, -1), (x1, y1, -1, -1)):
            d.line([(cx, cy + sy * arm), (cx, cy), (cx + sx * arm, cy)], fill=255, width=wd, joint='curve')
        shadow = 0.5
    elif op.kind == 'seal':
        x0, y0 = op.rect[0] + ox, op.rect[1] + oy
        side = kw['side']
        seal = Image.new('L', (int(side) + 1, int(side) + 1), 0)
        sd = ImageDraw.Draw(seal)
        sd.rounded_rectangle([0, 0, side, side], radius=side * 0.08, fill=235)
        inset = side * 0.1
        sd.rounded_rectangle([inset, inset, side - inset, side - inset], radius=side * 0.04, outline=0, width=max(2, int(side * 0.035)))
        initials = ''.join(w[0] for w in kw.get('words', []))[:2]
        f = load_font('Cinzel', side * (0.52 if len(initials) < 2 else 0.4), 900)
        if len(initials) == 2:
            sd.text((side / 2, side * 0.33), initials[0], font=f, fill=0, anchor='mm')
            sd.text((side / 2, side * 0.69), initials[1], font=f, fill=0, anchor='mm')
        elif initials:
            sd.text((side / 2, side / 2), initials, font=f, fill=0, anchor='mm')
        for _ in range(int(side * 1.2)):  # stamp wear
            px, py, pr = rng.uniform(0, side), rng.uniform(0, side), rng.uniform(0.6, 2.2)
            sd.ellipse([px - pr, py - pr, px + pr, py + pr], fill=rng.choice((0, 120, 180)))
        seal = seal.rotate(4, resample=Image.BICUBIC, expand=True)
        mask.paste(seal, (int(x0), int(y0)))
    elif op.kind == 'brush-swash':
        x0, x1, y, T = kw['x0'] + ox, kw['x1'] + ox, kw['y'] + oy, kw['T']
        top, bot = [], []
        n = 48
        for i in range(n + 1):
            u = i / n
            x = x0 + (x1 - x0) * u
            cy = y - 6 * math.sin(u * math.pi * 0.9) + 4 * u
            th = T * (math.sin(math.pi * min(1, u * 1.1)) ** 0.55) * (1 - 0.45 * u) + 1.5
            top.append((x, cy - th / 2 + rng.uniform(-1.2, 1.2)))
            bot.append((x, cy + th / 2 + rng.uniform(-1.2, 1.2)))
        d.polygon(top + bot[::-1], fill=240)
        for _ in range(5):  # dry-brush streaks in the tail
            sy = y + rng.uniform(-T / 3, T / 3)
            sx = x0 + (x1 - x0) * rng.uniform(0.55, 0.8)
            d.line([(sx, sy), (x1 + 2, sy + 4)], fill=0, width=1)
    elif op.kind == 'paper-scrap':
        r = op.kw['r']
        x0, y0, x1, y1 = r[0] + ox, r[1] + oy, r[2] + ox, r[3] + oy
        pts = [(x0, y0)]
        x = x0
        while x < x1:
            x = min(x1, x + rng.uniform(40, 90))
            pts.append((x, y0 + rng.uniform(-1.5, 1.5)))
        y = y0
        while y < y1:
            y = min(y1, y + rng.uniform(10, 20))
            pts.append((x1 + rng.uniform(-6, 2), y))
        x = x1
        while x > x0:
            x = max(x0, x - rng.uniform(9, 18))
            pts.append((x, y1 + rng.uniform(-7, 3)))
        pts.append((x0, y1))
        paper = Image.new('L', size, 0)
        ImageDraw.Draw(paper).polygon(pts, fill=255)
        sh = ImageChops.offset(paper, 6, 10).filter(ImageFilter.GaussianBlur(9))
        block = Image.alpha_composite(block, solid(size, '#000000', sh, 0.35))
        block = Image.alpha_composite(block, solid(size, op.kw.get('color', '#FBF7EE'), paper))
        lines = Image.new('L', size, 0)
        ld = ImageDraw.Draw(lines)
        step = max(26, (y1 - y0) / 6)
        yy = y0 + step * 0.9
        while yy < y1 - 6:
            ld.line([(x0, yy), (x1, yy)], fill=110, width=2)
            yy += step
        lines = ImageChops.multiply(lines, paper)
        block = Image.alpha_composite(block, solid(size, op.kw.get('lines', '#A9C1E0'), lines))
        margin = Image.new('L', size, 0)
        mxl = x0 + (x1 - x0) * 0.07
        ImageDraw.Draw(margin).line([(mxl, y0), (mxl, y1 + 8)], fill=150, width=2)
        block = Image.alpha_composite(block, solid(size, op.kw.get('margin', '#E99AA0'), ImageChops.multiply(margin, paper)))
        tw, th = min(220, (x1 - x0) * 0.4), 46
        tape = Image.new('L', (int(tw) + 1, int(th) + 1), 0)
        tdp = []
        for i in range(7):
            tdp.append((rng.uniform(0, 5), th * i / 6))
        tdp += [(tw - rng.uniform(0, 5), th * (6 - i) / 6) for i in range(7)]
        ImageDraw.Draw(tape).polygon(tdp, fill=165)
        tape = tape.rotate(-4, resample=Image.BICUBIC, expand=True)
        tl = Image.new('L', size, 0)
        tl.paste(tape, (int((x0 + x1) / 2 - tw / 2), int(y0 - th / 2)))
        block = Image.alpha_composite(block, solid(size, op.kw.get('tape', '#F4A6B8'), tl))
        ImageDraw.Draw(core).polygon(pts, fill=255)
        return block
    elif op.kind == 'panel':
        r = kw['r']
        x0, y0, x1, y1 = r[0] + ox, r[1] + oy, r[2] + ox, r[3] + oy
        fill = Image.new('L', size, 0)
        ImageDraw.Draw(fill).rounded_rectangle([x0, y0, x1, y1], radius=10, fill=255)
        block = Image.alpha_composite(block, solid(size, kw['color'], fill, kw['opacity']))
        d.rounded_rectangle([x0, y0, x1, y1], radius=10, outline=255, width=2)
        d.line([(x0, y0 + 34), (x1, y0 + 34)], fill=200, width=2)
        for i in range(3):
            cx = x0 + 22 + i * 18
            d.ellipse([cx - 5, y0 + 12, cx + 5, y0 + 22], fill=255)
        d.rectangle([x1 - 70, y0 + 13, x1 - 22, y0 + 21], fill=160)
        color = kw['border']
        glow = 8
        ImageDraw.Draw(core).rounded_rectangle([x0, y0, x1, y1], radius=10, fill=255)
    elif op.kind == 'heart':
        x, y, r = kw['x'] + ox, kw['y'] + oy, kw['r']
        pts = []
        for i in range(60):
            t = i / 60 * 2 * math.pi
            hx = 16 * math.sin(t) ** 3
            hy = -(13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t))
            pts.append((x + hx * r / 17 + rng.uniform(-0.8, 0.8), y + hy * r / 17 + rng.uniform(-0.8, 0.8)))
        d.line(pts + [pts[0]], fill=255, width=7, joint='curve')
        shadow = 0.35
    elif op.kind == 'star5':
        pts = star_points(kw['x'] + ox, kw['y'] + oy, kw['r'], 5, 0.45)
        d.line(pts + [pts[0]], fill=255, width=6, joint='curve')
        shadow = 0.35
    if shadow:
        sh = ImageChops.offset(mask, 0, 2).filter(ImageFilter.GaussianBlur(3))
        block = Image.alpha_composite(block, solid(size, '#000000', sh, shadow))
    if glow:
        g = mask.filter(ImageFilter.GaussianBlur(glow))
        block = Image.alpha_composite(block, solid(size, color, g, 0.8))
    layer = solid(size, color, mask)
    block = Image.alpha_composite(block, layer)
    core.paste(255, (0, 0), mask.point(lambda a: 255 if a > 40 else 0))
    return block


# ---------------------------------------------------------------- scrim, frame, placement


def apply_scrim(img, sc):
    if not sc:
        return img
    edge, start, op = sc.get('edge', 'bottom'), sc.get('from', 0.55), sc.get('opacity', 0.6)
    n = H if edge in ('bottom', 'top') else W
    col = Image.new('L', (1, n) if edge in ('bottom', 'top') else (n, 1), 0)
    for i in range(n):
        f = i / n
        if edge in ('bottom', 'right'):
            t = (f - start) / max(1e-6, 1 - start)
        else:
            t = (start - f) / max(1e-6, start)
        a = int(255 * op * smoothstep(t))
        col.putpixel((0, i) if edge in ('bottom', 'top') else (i, 0), a)
    return Image.alpha_composite(img, solid((W, H), sc.get('color', '#000000'), col.resize((W, H))))


def frame_inset(fr):
    return fr.get('inset', 0) if fr and fr.get('type', 'none') != 'none' else 0


def draw_frame(img, fr):
    kind = (fr or {}).get('type', 'none')
    if kind == 'none':
        return img
    i = fr.get('inset', 24)
    mask = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(mask)
    if kind == 'thin':
        wd = fr.get('width', 2)
        d.rectangle([i, i, W - 1 - i, H - 1 - i], outline=int(255 * fr.get('opacity', 0.85)), width=wd)
        return Image.alpha_composite(img, solid((W, H), fr.get('color', '#FFFFFF'), mask))
    if kind == 'gold-ornate':
        j = i + 12
        d.rectangle([i, i, W - 1 - i, H - 1 - i], outline=255, width=4)
        d.rectangle([j, j, W - 1 - j, H - 1 - j], outline=255, width=2)
        for cx, cy, sx, sy in ((i, i, 1, 1), (W - 1 - i, i, -1, 1), (i, H - 1 - i, 1, -1), (W - 1 - i, H - 1 - i, -1, -1)):
            r = 15
            d.polygon([(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)], fill=255)
            k = 26
            ax, ay = cx + sx * k, cy + sy * k
            d.line([(ax, ay + sy * 78), (ax, ay), (ax + sx * 78, ay)], fill=255, width=3)
            for ex, ey in ((ax + sx * 78, ay), (ax, ay + sy * 78)):
                d.polygon([(ex, ey - 6), (ex + 6, ey), (ex, ey + 6), (ex - 6, ey)], fill=255)
            box = [cx - 52, cy - 52, cx + 52, cy + 52]
            start = {(1, 1): 0, (-1, 1): 90, (-1, -1): 180, (1, -1): 270}[(sx, sy)]
            d.arc(box, start, start + 90, fill=255, width=2)
            d.ellipse([ax + sx * 14 - 4, ay + sy * 14 - 4, ax + sx * 14 + 4, ay + sy * 14 + 4], fill=255)
        for cy in (i, H - 1 - i):
            cx = W / 2
            d.rectangle([cx - 46, cy - 4, cx + 46, cy + 4], fill=0)
            d.polygon([(cx, cy - 12), (cx + 12, cy), (cx, cy + 12), (cx - 12, cy)], fill=255)
            for s in (-1, 1):
                d.line([(cx + s * 20, cy), (cx + s * 34, cy)], fill=255, width=2)
                d.ellipse([cx + s * 40 - 3, cy - 3, cx + s * 40 + 3, cy + 3], fill=255)
        sh = ImageChops.offset(mask, 0, 2).filter(ImageFilter.GaussianBlur(4))
        img = Image.alpha_composite(img, solid((W, H), '#000000', sh, 0.65))
        stops = fr.get('gradient', ['#7A4E10', '#F9E7A6', '#B8862E'])
        n = W + H
        row = gradient_column(stops + stops[::-1][1:] + stops[1:], n).transpose(Image.Transpose.ROTATE_90)
        grad = row.resize((n, n)).rotate(45, resample=Image.BILINEAR)
        grad = grad.crop(((n - W) // 2, (n - H) // 2, (n - W) // 2 + W, (n - H) // 2 + H))
        layer = grad.convert('RGBA')
        layer.putalpha(mask)
        return Image.alpha_composite(img, layer)
    if kind == 'neon-hud':
        color = fr.get('color', '#3CF2FF')
        d.rectangle([i, i, W - 1 - i, H - 1 - i], outline=150, width=2)
        arm = 86
        for cx, cy, sx, sy in ((i, i, 1, 1), (W - 1 - i, i, -1, 1), (i, H - 1 - i, 1, -1), (W - 1 - i, H - 1 - i, -1, -1)):
            d.line([(cx, cy + sy * arm), (cx, cy), (cx + sx * arm, cy)], fill=255, width=7)
        for x in (i, W - 1 - i):
            s = 1 if x == i else -1
            for k in range(-2, 3):
                y = H / 2 + k * 18
                d.line([(x, y), (x + s * (20 if k == 0 else 11), y)], fill=230, width=2)
        g = mask.filter(ImageFilter.GaussianBlur(9))
        img = Image.alpha_composite(img, solid((W, H), color, g, 0.9))
        return Image.alpha_composite(img, solid((W, H), color, mask))
    sys.exit(f'unknown frame type {kind!r}')


def place(img, block, core, spec, inset):
    bb = core.getbbox()
    if not bb:
        return img
    safe = max(inset + 22, 26)
    mx = max(spec.get('marginX', 0.07) * W, safe)
    cw, chh = bb[2] - bb[0], bb[3] - bb[1]
    scale = min(1.0, (W - 2 * mx) / cw, (H - 2 * safe) / chh)
    if scale < 0.999:
        print(f'  note: title block scaled to {scale:.2f} to stay inside the safe area', file=sys.stderr)
        nb = (max(1, int(block.size[0] * scale)), max(1, int(block.size[1] * scale)))
        block, core = block.resize(nb, Image.LANCZOS), core.resize(nb, Image.BILINEAR)
        bb = core.getbbox()
        cw, chh = bb[2] - bb[0], bb[3] - bb[1]
    pos = spec.get('position', 'bottom')
    top = max(spec.get('topMargin', 0.06) * H, safe)
    bottom = H - max(spec.get('bottomMargin', 0.06) * H, safe)
    if pos == 'right-vertical':
        x, y = W - mx - cw, top
    else:
        if pos.endswith('left'):
            x = mx
        elif pos.endswith('right'):
            x = W - mx - cw
        else:
            x = (W - cw) / 2
        if pos.startswith('top'):
            y = top
        elif pos.startswith('middle'):
            y = H * spec.get('y', 0.5) - chh / 2
        else:
            y = bottom - chh
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    layer.paste(block, (int(round(x - bb[0])), int(round(y - bb[1]))))
    return Image.alpha_composite(img, layer)


# ---------------------------------------------------------------- one cover


def compose(recipe, story_id, src, dst, lines=None, fallback=False):
    title = fixture_title(story_id)
    spec = recipe['title']
    frame = recipe.get('frame') or {'type': 'none'}
    if lines and ' '.join(p for p in lines if p) != title:
        sys.exit(f'{story_id}: --lines {lines!r} does not spell the title {title!r}')
    if not os.path.exists(src):
        sys.exit(f'{story_id}: no input image at {src}')
    art = ImageOps.fit(Image.open(src).convert('RGB'), (W, H), Image.LANCZOS, centering=(0.5, 0.5)).convert('RGBA')
    if spec.get('mode') == 'painted' and not fallback:
        out = draw_frame(art, frame)
        out.convert('RGB').save(dst)
        print(f'{recipe["id"]} {story_id}: painted title, frame only -> {os.path.relpath(dst, ROOT)}')
        return
    if spec.get('mode') == 'painted':
        spec = spec['fallback']
    vertical = spec.get('vertical') or spec.get('position') == 'right-vertical'
    seed = int(hashlib.sha1(f'{recipe["id"]}:{story_id}'.encode()).hexdigest()[:8], 16)
    block, core, info = build_block(title, spec, lines, seed)
    if vertical:
        block = block.rotate(-90, expand=True)
        core = core.rotate(-90, expand=True)
    out = apply_scrim(art, spec.get('scrim'))
    out = place(out, block, core, spec, frame_inset(frame))
    out = draw_frame(out, frame)
    out.convert('RGB').save(dst)
    k = info['kicker'] or '-'
    print(f'{recipe["id"]} {story_id}: {title!r} -> {os.path.relpath(dst, ROOT)} ({k} | {" / ".join(info["big"])} @ {info["size"]:.0f}px)')


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--recipe')
    ap.add_argument('--story')
    ap.add_argument('--in', dest='src')
    ap.add_argument('--out')
    ap.add_argument('--lines', help='"KICKER|BIG" (empty kicker for one line); must spell the title')
    ap.add_argument('--fallback', action='store_true', help='painted recipe: typeset title.fallback instead')
    ap.add_argument('--samples', action='store_true', help='every recipe on a v2 raw -> cover-style-v3/title-samples/')
    args = ap.parse_args()
    recipes = load_recipes()
    if args.samples:
        out_dir = os.path.join(V3, 'title-samples')
        os.makedirs(out_dir, exist_ok=True)
        for rid, sid in SAMPLES.items():
            painted = recipes[rid]['title'].get('mode') == 'painted'
            compose(recipes[rid], sid, os.path.join(V2_RAW, f'{sid}.png'), os.path.join(out_dir, f'{rid}.png'), fallback=painted)
        return
    if not (args.recipe and args.story and args.src and args.out):
        ap.error('--recipe, --story, --in and --out are required (or --samples)')
    if args.recipe not in recipes:
        sys.exit(f'unknown recipe {args.recipe!r}; known: {", ".join(recipes)}')
    lines = None
    if args.lines:
        k, b = args.lines.split('|', 1)
        lines = (k or None, b)
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    compose(recipes[args.recipe], args.story, args.src, args.out, lines, args.fallback)


if __name__ == '__main__':
    main()
