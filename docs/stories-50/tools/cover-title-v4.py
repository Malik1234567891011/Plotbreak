"""Cover v4 titles: every story's title set as its own logo, from a per-story spec.

    python3 -I docs/stories-50/tools/cover-title-v4.py <spec.json> [...]   render specs
    python3 -I docs/stories-50/tools/cover-title-v4.py --all               every cover-style-v3/titles/*.json
    python3 -I docs/stories-50/tools/cover-title-v4.py --samples           titles/samples/*.json, then titles/samples.png
    python3 -I docs/stories-50/tools/cover-title-v4.py --sheet OUT.png a.png b.png ...   contact sheet (cover + shelf size)
    python3 -I docs/stories-50/tools/cover-title-v4.py --fetch-fonts       download every family in titles/fonts.json
    python3 -I docs/stories-50/tools/cover-title-v4.py --fonts [tag]       list the font library (optionally one tag)
    options: --check (lay out and check, write nothing), --debug (also write <out>.debug.png with the safe area,
             avoid boxes and ink boxes), --out PATH (one spec only)

Needs numpy and scipy (both installed) besides Pillow. The art is cover-style-v3/raw/<storyId>.png, upscaled to
1152x1744 (Lanczos, centred crop) before anything is drawn. Output: cover-style-v3/final-v4/<storyId>.png, or
final-v4/samples/<name>.png for a spec under titles/samples/. Fonts come from titles/fonts.json (OFL, pinned
google/fonts commit) and are downloaded on first use into tools/fonts/ (gitignored; sources in fonts/README.md).
Everything is drawn at 2x (SS) and box-filtered down, so edges stay crisp after rotation and slant.

SPEC (every px value is at 1152x1744; positions `at` are fractions of the canvas)
{
  "storyId": "story_x",                  required; the fixture title is looked up and must be spelled out by the
                                         text items (letters and digits, case-insensitive; punctuation may change)
  "raw": "path.png",                     optional, default cover-style-v3/raw/<storyId>.png; "crop": [cx, cy] centring
  "seed": 7,                             texture/noise seed (deterministic)
  "safe": 28,                            ink must stay this far inside the canvas (default 28)
  "fit": "error" | "nudge" | "shrink",   what happens when an item's ink leaves the safe area (default error)
  "avoid": [[x0, y0, x1, y1], ...],      px boxes (faces) no title ink may touch; a hit is an error
  "styles": {"name": {...style}},        named styles; any style/line/run can say "use": "name" or [names]
  "layers": [ item, ... ]                drawn in order
}
ITEMS
  {"type": "scrim", "edge": "bottom|top|left|right", "from": 0.55, "to": 1.0, "color": "#000", "opacity": 0.6}
  {"type": "spot", "at": [x, y], "r": px | [rx, ry], "color": "#000", "opacity": 0.5, "blend": "normal|screen|multiply"}
  {"type": "text", "id": "main", "at": [x, y], "anchor": "bc", "dx": 0, "dy": 0, "rotate": 0, "scale": 1,
     "maxWidth": px, "align": "left|center|right", "gap": px (ink-to-ink between lines, may be negative),
     "style": {...}, "lines": [line, ...], "backing": [shape, ...], "backingEach": shape (one per line),
     "ornaments": [shape, ...], "role": "title" | "deco" (deco text is not part of the spelling check), "bleed": false}
     anchor: tl tc tr ml mc mr bl bc br (or [fx, fy] of the block's box), placed at `at` (+dx, dy px)
  {"type": "shape", "shape": <kind>, "box": [fx0, fy0, fx1, fy1] | "at": [x, y], "anchor": "mc", "w": px, "h": px,
     or "of": "<text id>", "to": "tr", "anchor": "bl", "dx", "dy" (relative to that item's ink box), ...style}
  {"type": "frame", "style": "thin|double|corners", "inset": 22, "color": "#fff", "width": 2, "opacity": 0.8}
LINE: "TEXT" or {"text": "...", or "runs": [run, ...], plus style keys and:
     "gap", "dx", "dy", "align", "width" (target ink width px: the font size is fitted), "rotate" (deg, clockwise),
     "z" (draw order, default 1; backings 0 and ornaments 2, a shape tied to one line sits just under/over it),
     "slant" (deg, + leans right), "rise" (deg, + climbs to the right, letters stay upright), "arc" (deg of
     sweep, + arches up, - smiles), "vertical": true (letters stacked top to bottom), "jitter": {"rot", "y",
     "scale", "seed", "pattern": "random|alternate"}}
RUN: {"text": "...", style keys, "before"/"after" (px space), "baseline" (px, + raises),
     "valign": "baseline|center|top|bottom" (against the line's biggest run)}
STYLE (inherited block -> line -> run; dicts replace whole):
  font (fonts.json family), weight, italic, axes {"opsz", "wdth"}, size (px) | cap (cap height px), case
  (upper|lower|title), tracking (em), wordSpace (em), features (["swsh", "salt", ...]), scale [sx, sy]
  fill: "#rrggbb[aa]" | {"sample": [x, y], "r": 6, "l": +-, "s": +-, "h": deg, "mix": [color, t]} | "@x,y"
        | {"gradient": [c, ...], "stops": [...], "angle": 90, "span": "run|line"}
        | {"metal": "gold|silver|chrome|rose|bronze|steel", "horizon": 0.5}
        | {"texture": "grain|noise|brush|chalk|scanlines|stripes|halftone", "base": fill, "color": c,
           "strength": 0.5, "scale": px, "period": px, "angle": deg, "mode": "mix|darken|lighten"}
        | "clear" (hollow: strokes only)
  strokes: [{"width": px from the glyph edge, "fill": fill | "clear" (cuts a see-through gap), "offset": [dx, dy],
            "opacity", "bevel"}] outermost first;  join: "round" | "square"
  inline {"inset", "width", "fill"}; bevel {"depth", "mode": "chisel|smooth", "angle", "elevation", "highlight",
  "shadow", "strength", "highlightColor", "shadowColor"}; gloss {"height": 0.48, "opacity": 0.35};
  innerShadow {"dx", "dy", "blur", "color", "opacity"}; innerGlow {"size", "color", "opacity"};
  rough {"amount": px, "scale": px, "grit": 0..1} (brush edges); distress {"amount": 0..1, "scale": px,
  "edge": 0..1, "scratches": n}; opacity; knockout: true (cuts through the layers below in the same item)
  neon {"color", "core", "tube": px (hollow tube letters), "glow": 1.0}
  glitch {"offset": px, "colors": [c1, c2], "slices": n, "shift": px, "seed"}
  extrude {"depth": px, "angle": 90 (direction, 90 = down), "fill": fill (gradient runs near -> far)}
  outerStrokes [{"width", "fill"}] (around glyph + extrusion), shadow [{"dx", "dy", "blur", "spread", "color",
  "opacity"}], glow [{"radius", "spread", "color", "opacity", "blend": "normal|screen"}]
SHAPES (backing/ornaments inside a text item; `of`: "block" | line index | [indices]; `pad`: n | [x, y] |
  [l, t, r, b]; or `to` (point on the ref box) + `anchor` (point on the shape) + `w`, `h`, `dx`, `dy`;
  `rotate`, `slant`, `z`; and every style key above for its paint):
  plate {radius, chamfer, slant}   banner {ends: [left, right] of flat|point|notch|slant, depth}
  ribbon {tail, drop, notch, arc, tailShade, foldShade}   torn {jag, tape: ["tl", "tr"], tapeColor}
  swash {curve, tilt, head, tail, dry}   hud {line, corner, cornerWidth, chamfer, panel, color, ticks}
  seal {text, font, form: square|round, style: intaglio|relief, color}   underline {curve, weight, curl}
  rule {thickness, taper, center: diamond|star|dot, ends: dot|diamond, double, size}
  flourish {weight, curl}   star {points, inner}   sparkles {points: [[fx, fy, size], ...]}   diamond   dot
  brackets {style: corners|square|angle, len, thickness}   burst {rays, inner, reach, spread}
  speedlines {count, thickness}   polygon {points: [[fx, fy], ...]}   ellipse
"""
import argparse
import colorsys
import glob
import json
import math
import os
import re
import sys
import urllib.parse
import urllib.request
import zlib

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps
from scipy import ndimage

sys.dont_write_bytecode = True

TOOLS = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(TOOLS, '../../..'))
V3 = os.path.join(ROOT, 'docs/stories-50/cover-style-v3')
RAW = os.path.join(V3, 'raw')
TITLES = os.path.join(V3, 'titles')
OUT = os.path.join(V3, 'final-v4')
FONTS_JSON = os.path.join(TITLES, 'fonts.json')
FONT_DIR = os.path.join(TOOLS, 'fonts')
FIXTURES = os.path.join(ROOT, 'packages/test-fixtures/src')
GF_COMMIT = '06bfe0d62a98375cb09c942fa18e68bd32cff057'
W, H = 1152, 1744
SS = 2
F32 = np.float32


class SpecError(Exception):
    pass


def fail(msg):
    raise SpecError(msg)


# ---------------------------------------------------------------- fonts

_table = None
_fonts = {}


def font_table():
    global _table
    if _table is None:
        with open(FONTS_JSON, encoding='utf-8') as f:
            _table = {e['family']: e for e in json.load(f)['fonts']}
    return _table


def fetch(rel):
    path = os.path.join(FONT_DIR, os.path.basename(rel))
    if os.path.exists(path):
        return path
    os.makedirs(os.path.join(FONT_DIR, 'licenses'), exist_ok=True)
    base = f'https://raw.githubusercontent.com/google/fonts/{GF_COMMIT}/'
    print(f'fetching {rel}', file=sys.stderr)
    urllib.request.urlretrieve(base + urllib.parse.quote(rel), path + '.part')
    os.replace(path + '.part', path)
    d = rel.split('/')[1]
    lic = os.path.join(FONT_DIR, 'licenses', f'{d}-OFL.txt')
    if not os.path.exists(lic):
        urllib.request.urlretrieve(base + f'ofl/{d}/OFL.txt', lic)
    return path


def _nearest(table, weight):
    k = min(table, key=lambda s: abs(int(s) - weight))
    return table[k]


def font_file(family, weight, italic):
    e = font_table().get(family)
    if e is None:
        fail(f'font {family!r} is not in titles/fonts.json')
    synth = False
    if italic and 'staticItalic' in e:
        rel = _nearest(e['staticItalic'], weight)
    elif italic and 'italic' in e:
        rel = e['italic']
    else:
        rel = _nearest(e['static'], weight) if 'static' in e else e['file']
        synth = bool(italic)
    return fetch(rel), '[' in os.path.basename(rel), synth


def load_font(family, px, weight=None, italic=False, axes=None):
    e = font_table().get(family) or fail(f'font {family!r} is not in titles/fonts.json')
    weight = int(weight or e.get("weight", 400))
    axes = merge(e.get("axes"), axes)
    px = max(4, int(round(px)))
    key = (family, px, weight, bool(italic), json.dumps(axes or {}, sort_keys=True))
    if key not in _fonts:
        path, variable, synth = font_file(family, weight, italic)
        f = ImageFont.truetype(path, px, layout_engine=ImageFont.Layout.RAQM)
        if variable:
            vals = []
            for ax in f.get_variation_axes():
                name = ax.get('name', b'')
                n = (name.decode() if isinstance(name, bytes) else str(name)).lower()
                if 'weight' in n or n == 'wght':
                    v = weight
                elif 'optical' in n or n == 'opsz':
                    v = (axes or {}).get('opsz', ax['maximum'])
                elif 'width' in n or n == 'wdth':
                    v = (axes or {}).get('wdth', ax['default'])
                else:
                    v = (axes or {}).get(n, ax['default'])
                vals.append(max(ax['minimum'], min(ax['maximum'], v)))
            f.set_variation_by_axes(vals)
        _fonts[key] = (f, synth)
    return _fonts[key]


_cap = {}


def cap_ratio(st):
    key = (st['font'], st.get('weight'), bool(st.get('italic')))
    if key not in _cap:
        f, _ = load_font(st['font'], 1000, st.get('weight'), st.get('italic'), st.get('axes'))
        b = f.getbbox('H', anchor='ls')
        _cap[key] = max(0.2, (b[3] - b[1]) / 1000)
    return _cap[key]


def run_size(st):
    if 'font' not in st:
        fail('a run has no font')
    if 'cap' in st:
        return st['cap'] / cap_ratio(st)
    if 'size' in st:
        return st['size']
    fail(f'run in {st["font"]} needs size or cap')


# ---------------------------------------------------------------- colour and paint

NAMED = {'white': '#ffffff', 'black': '#000000', 'ink': '#15131b', 'paper': '#f2ede1', 'red': '#c8202c'}
METALS = {
    'gold': [(0, '#fffbe6'), (.22, '#ffe7a0'), (.46, '#e0aa3e'), (.5, '#8c5c12'), (.54, '#b57d22'), (.78, '#f7cf6a'), (1, '#fff3c4')],
    'silver': [(0, '#ffffff'), (.25, '#e4e9ef'), (.47, '#a3acb7'), (.5, '#5f6874'), (.55, '#8e98a4'), (.82, '#e8edf2'), (1, '#ffffff')],
    'chrome': [(0, '#f2fbff'), (.18, '#a8d4f5'), (.46, '#ffffff'), (.5, '#2e3340'), (.56, '#6e5c48'), (.8, '#e3c9a4'), (1, '#ffffff')],
    'rose': [(0, '#fff1ec'), (.25, '#f6c3b2'), (.47, '#c9826f'), (.5, '#7d4436'), (.55, '#a8655a'), (.8, '#f2b9a5'), (1, '#fff0ea')],
    'bronze': [(0, '#ffe9c7'), (.25, '#d9a066'), (.48, '#9c5f2c'), (.5, '#5a3215'), (.55, '#7e4b24'), (.8, '#d39a5e'), (1, '#f6d9aa')],
    'steel': [(0, '#e9eef2'), (.3, '#aab4bf'), (.49, '#6c7682'), (.5, '#3a414b'), (.56, '#59626d'), (.85, '#b8c1ca'), (1, '#dde3e8')],
}


class Ctx:
    def __init__(self, art, seed, styles):
        self.art = art          # float32 (H, W, 3) 0..1 at 1x
        self.seed = seed
        self.styles = styles
        self.samples = []

    def rng(self, *key):
        return np.random.default_rng(zlib.crc32(f'{self.seed}:{key}'.encode()))


def hex_rgba(h):
    h = NAMED.get(h, h).lstrip('#')
    if len(h) in (3, 4):
        h = ''.join(c * 2 for c in h)
    if len(h) not in (6, 8) or not re.fullmatch(r'[0-9a-fA-F]+', h):
        fail(f'bad colour {h!r}')
    v = [int(h[i:i + 2], 16) / 255 for i in range(0, len(h), 2)]
    return np.array(v + [1.0] * (4 - len(v)), F32)


def is_clear(c):
    return isinstance(c, str) and c in ('clear', 'none', 'transparent')


def col(c, ctx):
    """A colour as float32 [r, g, b, a]."""
    if isinstance(c, (list, tuple)) and len(c) in (3, 4) and all(isinstance(v, (int, float)) for v in c):
        return np.array(list(c) + [1.0] * (4 - len(c)), F32)
    if isinstance(c, str) and c.startswith('@'):
        x, y = (float(v) for v in c[1:].split(','))
        c = {'sample': [x, y]}
    if isinstance(c, str):
        return hex_rgba(c)
    if isinstance(c, dict):
        if 'sample' in c:
            fx, fy = c['sample']
            r = int(c.get('r', 6))
            x, y = int(fx * W), int(fy * H)
            patch = ctx.art[max(0, y - r):y + r + 1, max(0, x - r):x + r + 1].reshape(-1, 3)
            rgb = np.median(patch, axis=0)
            ctx.samples.append((fx, fy, '#%02x%02x%02x' % tuple(int(v * 255) for v in rgb)))
        elif 'hex' in c:
            rgb = hex_rgba(c['hex'])[:3]
        else:
            fail(f'bad colour {c!r}')
        hh, ll, ss = colorsys.rgb_to_hls(*[float(v) for v in rgb])
        hh = (hh + c.get('h', 0) / 360) % 1
        ll = min(1, max(0, c.get('setL', ll + c.get('l', 0))))
        ss = min(1, max(0, c.get('setS', ss + c.get('s', 0))))
        rgb = np.array(colorsys.hls_to_rgb(hh, ll, ss), F32)
        if 'mix' in c:
            other, t = c['mix']
            rgb = rgb * (1 - t) + col(other, ctx)[:3] * t
        return np.array(list(rgb) + [c.get('alpha', 1.0)], F32)
    fail(f'bad colour {c!r}')


def solid(a, c):
    out = np.empty(a.shape + (4,), F32)
    aa = a * c[3]
    out[..., :3] = aa[..., None] * c[:3]
    out[..., 3] = aa
    return out


def over(dst, src):
    return src + dst * (1 - src[..., 3:4])


def bbox(a, thr=0.02):
    m = a > thr
    rows, cols = np.any(m, axis=1), np.any(m, axis=0)
    if not rows.any():
        return None
    y0, y1 = int(np.argmax(rows)), len(rows) - int(np.argmax(rows[::-1]))
    x0, x1 = int(np.argmax(cols)), len(cols) - int(np.argmax(cols[::-1]))
    return (x0, y0, x1, y1)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / max(1e-6, e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def blur(a, sigma):
    if sigma <= 0.3:
        return a
    if sigma < 6:
        return ndimage.gaussian_filter(a, sigma, mode='constant').astype(F32)
    f = max(2, int(sigma / 3))
    h, w = a.shape
    small = Image.fromarray(np.ascontiguousarray(a, F32)).resize((max(1, w // f), max(1, h // f)), Image.Resampling.BOX)
    sm = ndimage.gaussian_filter(np.asarray(small, F32), sigma / f, mode='constant')
    up = np.asarray(Image.fromarray(np.ascontiguousarray(sm, F32)).resize((w, h), Image.Resampling.BICUBIC), F32)
    return np.clip(up, 0, None)


def shift_int(a, dx, dy):
    dx, dy = int(round(dx)), int(round(dy))
    out = np.zeros_like(a)
    h, w = a.shape[:2]
    if abs(dx) >= w or abs(dy) >= h:
        return out
    out[max(0, dy):h + min(0, dy), max(0, dx):w + min(0, dx)] = a[max(0, -dy):h - max(0, dy), max(0, -dx):w - max(0, dx)]
    return out


def dist_out(mask, square=False):
    inside = mask >= 0.5
    if square:
        return ndimage.distance_transform_cdt(~inside, metric='chessboard').astype(F32)
    return ndimage.distance_transform_edt(~inside).astype(F32)


def dist_in(mask):
    return ndimage.distance_transform_edt(mask >= 0.5).astype(F32)


def dilate(a, px):
    if px <= 0:
        return a
    return np.maximum(a, np.clip(px + 0.5 - dist_out(a), 0, 1))


def value_noise(h, w, scale, rng, octaves=3, aspect=1.0):
    acc = np.zeros((h, w), F32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        sc = max(2.0, scale / (2 ** o))
        gy, gx = int(h / sc) + 3, int(w / (sc * aspect)) + 3
        small = rng.random((gy, gx)).astype(F32)
        acc += amp * np.asarray(Image.fromarray(small).resize((w, h), Image.Resampling.BICUBIC), F32)
        tot += amp
        amp *= 0.5
    acc /= tot
    lo, hi = np.percentile(acc, 1), np.percentile(acc, 99)
    return np.clip((acc - lo) / max(1e-6, hi - lo), 0, 1)


def grain(h, w, rng, soft=0.6):
    g = ndimage.gaussian_filter(rng.random((h, w)).astype(F32), soft)
    lo, hi = np.percentile(g, 1), np.percentile(g, 99)
    return np.clip((g - lo) / max(1e-6, hi - lo), 0, 1)


def stops_of(fill, ctx):
    if 'metal' in fill:
        preset = METALS.get(fill['metal']) or fail(f'metal {fill["metal"]!r} is not one of {sorted(METALS)}')
        hz = fill.get('horizon', 0.5)
        pos = [p / 0.5 * hz if p <= 0.5 else hz + (p - 0.5) / 0.5 * (1 - hz) for p, _ in preset]
        cols = [hex_rgba(c) for _, c in preset]
    else:
        cols = [col(c, ctx) for c in fill['gradient']]
        pos = fill.get('stops') or list(np.linspace(0, 1, len(cols)))
    return np.array(pos, F32), np.array(cols, F32)


def texture_field(cfg, h, w, rng):
    kind = cfg['texture']
    sc = cfg.get('scale', 24) * SS
    yy, xx = np.mgrid[0:h, 0:w].astype(F32)
    if kind == 'grain':
        return grain(h, w, rng)
    if kind == 'noise':
        return value_noise(h, w, sc, rng, 4)
    if kind == 'brush':
        return smoothstep(0.3, 0.7, value_noise(h, w, sc * 0.35, rng, 3, aspect=cfg.get('stretch', 14)))
    if kind == 'chalk':
        return np.clip(0.55 * grain(h, w, rng, 0.8) + 0.45 * smoothstep(0.3, 0.7, value_noise(h, w, sc * 0.3, rng, 2, aspect=10)), 0, 1)
    if kind == 'scanlines':
        p = cfg.get('period', 6) * SS
        return ((yy % p) < p * cfg.get('duty', 0.45)).astype(F32)
    if kind == 'stripes':
        p = cfg.get('period', 40) * SS
        a = math.radians(cfg.get('angle', 45))
        proj = xx * math.cos(a) + yy * math.sin(a)
        tri = np.abs(((proj / p) % 1) - 0.5) * 2
        return np.clip((tri - 0.5) * p / 2 + 0.5, 0, 1)
    if kind == 'halftone':
        p = cfg.get('period', 10) * SS
        a = math.radians(45)
        u = xx * math.cos(a) + yy * math.sin(a)
        v = -xx * math.sin(a) + yy * math.cos(a)
        du, dv = (u % p) - p / 2, (v % p) - p / 2
        d = np.sqrt(du * du + dv * dv)
        ramp = np.clip(yy / max(1, h), 0, 1) if cfg.get('ramp', True) else 1.0
        r = p * 0.55 * ramp
        return np.clip(r - d + 0.5, 0, 1)
    fail(f'texture {kind!r} is not grain, noise, brush, chalk, scanlines, stripes or halftone')


def paint(mask, fill, ctx, box=None, rng=None):
    """A mask painted with a fill, as premultiplied float RGBA."""
    h, w = mask.shape
    if fill is None or is_clear(fill):
        return np.zeros((h, w, 4), F32)
    if isinstance(fill, dict) and 'texture' in fill:
        base = paint(mask, fill.get('base', '#ffffff'), ctx, box, rng)
        f = texture_field(fill, h, w, rng if rng is not None else ctx.rng('tex'))
        k = (fill.get('strength', 0.5) * f)[..., None]
        mode = fill.get('mode', 'mix' if 'color' in fill else 'darken')
        if mode == 'mix':
            c = col(fill.get('color', '#000000'), ctx)
            base[..., :3] = base[..., :3] * (1 - k) + c[:3] * base[..., 3:4] * k
        elif mode == 'lighten':
            base[..., :3] = base[..., :3] + (base[..., 3:4] - base[..., :3]) * k
        else:
            base[..., :3] = base[..., :3] * (1 - k)
        if fill.get('alpha'):
            base *= (1 - fill['alpha'] * f)[..., None]
        return base
    if isinstance(fill, dict) and ('gradient' in fill or 'metal' in fill):
        pos, cols = stops_of(fill, ctx)
        bx = box or bbox(mask, 0.5) or (0, 0, w, h)
        ang = math.radians(fill.get('angle', 90))
        dx, dy = math.cos(ang), math.sin(ang)
        proj = np.arange(w, dtype=F32)[None, :] * dx + np.arange(h, dtype=F32)[:, None] * dy
        pr = [x * dx + y * dy for x, y in ((bx[0], bx[1]), (bx[2], bx[1]), (bx[0], bx[3]), (bx[2], bx[3]))]
        t = np.clip((proj - min(pr)) / max(1e-6, max(pr) - min(pr)), 0, 1)
        out = np.empty((h, w, 4), F32)
        a = np.interp(t, pos, cols[:, 3]).astype(F32) * mask
        for i in range(3):
            out[..., i] = np.interp(t, pos, cols[:, i]).astype(F32) * a
        out[..., 3] = a
        return out
    return solid(mask, col(fill, ctx))


# ---------------------------------------------------------------- body effects


def roughen(mask, cfg, rng):
    if cfg is True:
        cfg = {}
    h, w = mask.shape
    amt = cfg.get('amount', 2.5) * SS
    sc = cfg.get('scale', 9) * SS
    out = mask
    if amt > 0:
        dx = (value_noise(h, w, sc, rng, 2) - 0.5) * 2 * amt
        dy = (value_noise(h, w, sc, rng, 2) - 0.5) * 2 * amt
        yy, xx = np.mgrid[0:h, 0:w].astype(F32)
        out = ndimage.map_coordinates(mask, [yy + dy, xx + dx], order=1, mode='constant', cval=0).astype(F32)
    if cfg.get('grit'):
        g = grain(h, w, rng, 0.7)
        out = np.clip((blur(out, 0.8 * SS) - 0.5 + (g - 0.5) * cfg['grit']) * 3 + 0.5, 0, 1).astype(F32)
    return out


def tube(mask, width):
    wd = width * SS
    sd = np.where(mask >= 0.5, -dist_in(mask), dist_out(mask))
    return np.clip(wd / 2 + 0.5 - np.abs(sd + wd / 2), 0, 1).astype(F32)


def bevel(layer, mask, cfg, ctx):
    if cfg is True:
        cfg = {}
    depth = cfg.get('depth', 6) * SS
    if cfg.get('mode', 'chisel') == 'chisel':
        hm = ndimage.gaussian_filter(np.clip(dist_in(mask) / depth, 0, 1), cfg.get('soften', 0.7) * SS)
    else:
        hm = blur(mask, depth / 2)
    gy, gx = np.gradient(hm)
    k = depth * cfg.get('strength', 1.0)
    nx, ny = -gx * k, -gy * k
    n = np.sqrt(nx * nx + ny * ny + 1)
    az, el = math.radians(cfg.get('angle', 120)), math.radians(cfg.get('elevation', 40))
    lx, ly, lz = math.cos(el) * math.cos(az), -math.cos(el) * math.sin(az), math.sin(el)
    diff = (nx * lx + ny * ly + lz) / n - lz
    hi = np.clip(diff / max(1e-3, 1 - lz), 0, 1) * mask * cfg.get('highlight', 0.8)
    lo = np.clip(-diff / max(1e-3, lz), 0, 1) * mask * cfg.get('shadow', 0.55)
    layer = over(layer, solid(hi.astype(F32), col(cfg.get('highlightColor', '#ffffff'), ctx)))
    layer = over(layer, solid(lo.astype(F32), col(cfg.get('shadowColor', '#000000'), ctx)))
    return layer


def gloss(layer, mask, cfg, box):
    if cfg is True:
        cfg = {}
    h, w = mask.shape
    bx = box or bbox(mask, 0.5) or (0, 0, w, h)
    bh = max(1, bx[3] - bx[1])
    split = bx[1] + bh * cfg.get('height', 0.48)
    ys = np.arange(h, dtype=F32)[:, None]
    edge = np.clip((split - ys) / max(1, bh * 0.03), 0, 1)
    ramp = 0.35 + 0.65 * np.clip((split - ys) / max(1, split - bx[1]), 0, 1)
    inset = np.clip(dist_in(mask) / (cfg.get('inset', 2.5) * SS), 0, 1)
    a = (inset * edge * ramp * cfg.get('opacity', 0.35)).astype(F32)
    return over(layer, solid(a, np.array([1, 1, 1, 1], F32)))


def holes(alpha, cfg, rng):
    if cfg is True:
        cfg = {}
    h, w = alpha.shape
    n = 0.62 * value_noise(h, w, cfg.get('scale', 22) * SS, rng, 3) + 0.38 * grain(h, w, rng, 0.8)
    if cfg.get('edge'):
        n = n + cfg['edge'] * (1 - np.clip(dist_in(alpha) / (5 * SS), 0, 1))
    thr = 1 - cfg.get('amount', 0.3)
    out = np.clip((n - thr) / 0.05, 0, 1).astype(F32)
    if cfg.get('scratches'):
        b = bbox(alpha, 0.5)
        if b:
            img = Image.new('L', (w, h), 0)
            d = ImageDraw.Draw(img)
            ang = math.radians(cfg.get('scratchAngle', -18))
            for _ in range(int(cfg['scratches'])):
                cx, cy = rng.uniform(b[0], b[2]), rng.uniform(b[1], b[3])
                ln = rng.uniform(0.15, 0.5) * (b[2] - b[0])
                a2 = ang + rng.uniform(-0.15, 0.15)
                d.line([(cx - math.cos(a2) * ln / 2, cy - math.sin(a2) * ln / 2), (cx + math.cos(a2) * ln / 2, cy + math.sin(a2) * ln / 2)],
                       fill=255, width=max(1, int(rng.uniform(0.6, 1.6) * SS)))
            out = np.maximum(out, np.asarray(img, F32) / 255)
    return out


def paint_body(mask, st, ctx, rng, box=None):
    """Strokes, fill and the inner effects of one mask, as premultiplied RGBA."""
    if st.get('rough'):
        mask = roughen(mask, st['rough'], rng)
    neon = st.get('neon')
    if neon and neon.get('tube'):
        mask = tube(mask, neon['tube'])
    h, w = mask.shape
    body = np.zeros((h, w, 4), F32)
    strokes = st.get('strokes') or ([st['stroke']] if st.get('stroke') else [])
    if strokes:
        d = dist_out(mask, square=st.get('join') == 'square')
        for s in strokes:
            a = np.maximum(np.clip(s['width'] * SS + 0.5 - d, 0, 1), mask).astype(F32)
            if s.get('offset'):
                a = shift_int(a, s['offset'][0] * SS, s['offset'][1] * SS)
            f = s.get('fill', s.get('color', '#000000'))
            if is_clear(f):
                body *= (1 - a)[..., None]
                continue
            layer = paint(a, f, ctx, None, rng) * s.get('opacity', 1.0)
            if s.get('bevel'):
                layer = bevel(layer, a, s['bevel'], ctx)
            body = over(body, layer)
    fill = st.get('fill', st.get('color', '#ffffff'))
    if neon:
        nc = col(neon.get('color', '#ff3fb4'), ctx)
        fill = neon.get('core') or ('#%02x%02x%02x' % tuple(int(255 * (v * 0.25 + 0.75)) for v in nc[:3]))
    if not is_clear(fill):
        layer = paint(mask, fill, ctx, box, rng)
        if st.get('bevel'):
            layer = bevel(layer, mask, st['bevel'], ctx)
        if st.get('inline'):
            c = st['inline']
            d = dist_in(mask)
            a = np.clip(c.get('width', 2) * SS / 2 + 0.5 - np.abs(d - c.get('inset', 4) * SS), 0, 1) * (mask >= 0.5)
            layer = over(layer, paint(a.astype(F32), c.get('fill', '#ffffff'), ctx, box, rng) * c.get('opacity', 1.0))
        if st.get('gloss'):
            layer = gloss(layer, mask, st['gloss'], box)
        if st.get('innerShadow'):
            c = st['innerShadow']
            sh = ndimage.shift(1 - mask, (c.get('dy', 4) * SS, c.get('dx', 0) * SS), order=1, mode='constant', cval=1.0)
            a = blur(sh.astype(F32), c.get('blur', 4) * SS) * mask * c.get('opacity', 0.6)
            layer = over(layer, solid(a.astype(F32), col(c.get('color', '#000000'), ctx)))
        ig = st.get('innerGlow') or ({'size': 2.5, 'color': neon.get('color', '#ff3fb4'), 'opacity': 1.0} if neon else None)
        if ig:
            a = np.clip(blur(1 - mask, ig.get('size', 4) * SS) * 2.2, 0, 1) * mask * ig.get('opacity', 0.8)
            layer = over(layer, solid(a.astype(F32), col(ig.get('color', '#ffffff'), ctx)))
        body = over(body, layer)
    if st.get('distress'):
        body *= (1 - holes(body[..., 3], st['distress'], rng))[..., None]
    if 'opacity' in st:
        body *= st['opacity']
    return body


# ---------------------------------------------------------------- element (outer) effects


def fx_pad(st):
    p = 4.0
    for s in st.get('shadow') or []:
        p = max(p, abs(s.get('dx', 0)) + abs(s.get('dy', 0)) + 3 * s.get('blur', 0) + s.get('spread', 0) + 4)
    for g in glows_of(st):
        p = max(p, 3 * g.get('radius', 8) + g.get('spread', 0) + 4)
    if st.get('extrude'):
        p = max(p, st['extrude'].get('depth', 12) + 4)
    p += sum(s['width'] for s in st.get('outerStrokes') or [])
    if st.get('glitch'):
        g = st['glitch']
        p = max(p, g.get('offset', 6) + g.get('shift', 14) + 4)
    return int(math.ceil(p * SS))


def glows_of(st):
    gl = list(st.get('glow') or [])
    if st.get('neon'):
        n = st['neon']
        c = n.get('color', '#ff3fb4')
        k = n.get('glow', 1.0)
        gl = [{'radius': 2.5, 'spread': 1, 'color': c, 'opacity': 0.95 * k, 'blend': 'screen'},
              {'radius': 10, 'color': c, 'opacity': 0.8 * k, 'blend': 'screen'},
              {'radius': 30, 'color': c, 'opacity': 0.55 * k, 'blend': 'screen'}] + gl
    return gl


def outer_effects(body, st, ctx, rng):
    """Glitch, extrusion, outer strokes, shadows and glows, in canvas space. Returns (normal, screen, ink alpha)."""
    if st.get('glitch'):
        g = st['glitch']
        off = g.get('offset', 6) * SS
        c1, c2 = (col(c, ctx) for c in g.get('colors', ['#ff2a6d', '#00e5ff']))
        a = body[..., 3]
        split = over(solid(shift_int(a, off, 0), c2) * g.get('opacity', 0.9), solid(shift_int(a, -off, 0), c1) * g.get('opacity', 0.9))
        body = over(split, body)
        b = bbox(body[..., 3], 0.05)
        if b and g.get('slices', 6):
            grng = np.random.default_rng(g.get('seed', 3))
            for _ in range(int(g.get('slices', 6))):
                hh = int(grng.uniform(0.03, 0.12) * (b[3] - b[1])) + 1
                y0 = int(grng.uniform(b[1], b[3] - hh))
                body[y0:y0 + hh] = shift_int(body[y0:y0 + hh], grng.uniform(-1, 1) * g.get('shift', 14) * SS, 0)
    a_body = body[..., 3]
    sil = a_body
    under = np.zeros_like(body)
    ex = st.get('extrude')
    if ex:
        depth = int(round(ex.get('depth', 12) * SS))
        ang = math.radians(ex.get('angle', 90))
        ux, uy = math.cos(ang), math.sin(ang)
        acc = np.zeros_like(a_body)
        idx = np.zeros_like(a_body)
        for i in range(depth, 0, -1):
            s = shift_int(a_body, i * ux, i * uy)
            newer = s >= acc
            idx = np.where(newer & (s > 0.01), i, idx)
            acc = np.maximum(acc, s)
        fill = ex.get('fill', '#000000')
        if isinstance(fill, dict) and 'gradient' in fill:
            pos, cols = stops_of(fill, ctx)
            t = np.clip(idx / max(1, depth), 0, 1)
            e = np.empty(body.shape, F32)
            a = np.interp(t, pos, cols[:, 3]).astype(F32) * acc
            for i in range(3):
                e[..., i] = np.interp(t, pos, cols[:, i]).astype(F32) * a
            e[..., 3] = a
        else:
            e = solid(acc, col(fill, ctx))
        under = e
        sil = np.maximum(sil, acc)
    if st.get('outerStrokes'):
        d = dist_out(sil)
        ring = np.zeros_like(body)
        for s in st['outerStrokes']:
            a = np.maximum(np.clip(s['width'] * SS + 0.5 - d, 0, 1), sil).astype(F32)
            ring = over(ring, paint(a, s.get('fill', '#000000'), ctx, None, rng))
        under = over(ring, under)
        sil = np.maximum(sil, ring[..., 3])
    normal = np.zeros_like(body)
    screen = None
    for s in st.get('shadow') or []:
        a = dilate(sil, s.get('spread', 0) * SS)
        a = shift_int(a, s.get('dx', 0) * SS, s.get('dy', 6) * SS)
        a = blur(a, s.get('blur', 0) * SS) * s.get('opacity', 0.6)
        normal = over(normal, solid(np.clip(a, 0, 1).astype(F32), col(s.get('color', '#000000'), ctx)))
    for g in glows_of(st):
        a = blur(dilate(sil, g.get('spread', 0) * SS), g.get('radius', 8) * SS)
        a = np.clip(a * g.get('strength', 1.6), 0, 1) * g.get('opacity', 0.7)
        layer = solid(a.astype(F32), col(g.get('color', '#ffffff'), ctx))
        if g.get('blend') == 'screen':
            screen = layer if screen is None else 1 - (1 - screen) * (1 - layer)
        else:
            normal = over(normal, layer)
    normal = over(normal, under)
    normal = over(normal, body)
    return normal, screen, sil


# ---------------------------------------------------------------- geometry

ANCH = {'tl': (0, 0), 'tc': (.5, 0), 't': (.5, 0), 'tr': (1, 0), 'ml': (0, .5), 'l': (0, .5), 'mc': (.5, .5), 'c': (.5, .5),
        'center': (.5, .5), 'mr': (1, .5), 'r': (1, .5), 'bl': (0, 1), 'bc': (.5, 1), 'b': (.5, 1), 'br': (1, 1)}


def anch(a):
    if isinstance(a, str):
        if a not in ANCH:
            fail(f'anchor {a!r} is not one of {sorted(ANCH)}')
        return ANCH[a]
    return tuple(a)


def T(x, y):
    return np.array([[1, 0, x], [0, 1, y], [0, 0, 1]], float)


def R(deg):
    c, s = math.cos(math.radians(deg)), math.sin(math.radians(deg))
    return np.array([[c, -s, 0], [s, c, 0], [0, 0, 1]], float)


def S(sx, sy=None):
    return np.array([[sx, 0, 0], [0, sx if sy is None else sy, 0], [0, 0, 1]], float)


def shear(slant=0, rise=0):
    return np.array([[1, -math.tan(math.radians(slant)), 0], [-math.tan(math.radians(rise)), 1, 0], [0, 0, 1]], float)


def around(M, cx, cy):
    return T(cx, cy) @ M @ T(-cx, -cy)


def tbox(M, box):
    x0, y0, x1, y1 = box
    pts = M @ np.array([[x0, x1, x0, x1], [y0, y0, y1, y1], [1, 1, 1, 1]], float)
    return (pts[0].min(), pts[1].min(), pts[0].max(), pts[1].max())


def union(boxes):
    boxes = [b for b in boxes if b]
    if not boxes:
        return None
    return (min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes))


def warp(body, M, pad):
    """Resample a local premultiplied body through M (local -> canvas SS px) into its canvas box, padded."""
    h, w = body.shape[:2]
    b = tbox(M, (0, 0, w, h))
    x0 = int(math.floor(b[0])) - pad
    y0 = int(math.floor(b[1])) - pad
    x0 -= x0 % SS
    y0 -= y0 % SS
    x1 = int(math.ceil(b[2])) + pad
    y1 = int(math.ceil(b[3])) + pad
    x1 += (-(x1 - x0)) % SS
    y1 += (-(y1 - y0)) % SS
    lin = M[:2, :2]
    tx, ty = M[0, 2], M[1, 2]
    out = np.zeros((y1 - y0, x1 - x0, 4), F32)
    if np.allclose(lin, np.eye(2)) and abs(tx - round(tx)) < 1e-6 and abs(ty - round(ty)) < 1e-6:
        ox, oy = int(round(tx)) - x0, int(round(ty)) - y0
        out[oy:oy + h, ox:ox + w] = body
        return out, x0, y0
    inv = np.linalg.inv(M) @ T(x0, y0)
    coeffs = (inv[0, 0], inv[0, 1], inv[0, 2], inv[1, 0], inv[1, 1], inv[1, 2])
    for c in range(4):
        im = Image.fromarray(np.ascontiguousarray(body[..., c]))
        out[..., c] = np.asarray(im.transform((x1 - x0, y1 - y0), Image.Transform.AFFINE, coeffs, resample=Image.Resampling.BICUBIC), F32)
    np.clip(out, 0, None, out=out)
    out[..., 3] = np.minimum(out[..., 3], 1)
    out[..., :3] = np.minimum(out[..., :3], out[..., 3:4])
    return out, x0, y0


# ---------------------------------------------------------------- styles

LINE_KEYS = {'text', 'runs', 'gap', 'dx', 'dy', 'align', 'width', 'rotate', 'slant', 'rise', 'arc', 'vertical', 'jitter', 'id', 'z'}
SHAPE_KEYS = {'shape', 'of', 'pad', 'to', 'anchor', 'w', 'h', 'dx', 'dy', 'rotate', 'slant', 'z', 'box', 'at', 'type', 'id', 'bleed'}
SHAPE_DEFAULTS = {
    'seal': {'fill': '#c8202c', 'rough': {'amount': 1.0, 'scale': 5}, 'distress': {'amount': 0.1, 'scale': 6}},
    'torn': {'fill': {'texture': 'grain', 'base': '#f3efe6', 'strength': 0.12}, 'shadow': [{'dx': 0, 'dy': 6, 'blur': 7, 'opacity': 0.45}]},
    'swash': {'fill': '#c8202c'},
    'hud': {},
}


def resolve(st, ctx):
    """Expand `use` references in a style dict."""
    if not st or 'use' not in st:
        return dict(st or {})
    out = {}
    uses = st['use'] if isinstance(st['use'], list) else [st['use']]
    for u in uses:
        if u not in ctx.styles:
            fail(f'style {u!r} is not in "styles"')
        out.update(resolve(ctx.styles[u], ctx))
    out.update({k: v for k, v in st.items() if k != 'use'})
    return out


def merge(*sts):
    out = {}
    for s in sts:
        out.update(s or {})
    return out


def cased(text, st):
    c = st.get('case')
    return text.upper() if c == 'upper' else text.lower() if c == 'lower' else text.title() if c == 'title' else text


# ---------------------------------------------------------------- lines


def layout_glyphs(line, runs, factor):
    """Glyph placements for a line (SS px, baseline at y = 0)."""
    G = []
    x = 0.0
    curved = bool(line.get('arc') or line.get('jitter'))
    vertical = bool(line.get('vertical'))
    for ri, st in enumerate(runs):
        size = run_size(st) * factor * SS
        f, synth = load_font(st['font'], size, st.get('weight'), st.get('italic'), st.get('axes'))
        text = cased(st['text'], st)
        trk = st.get('tracking', 0.12 if vertical else 0) * size
        ws = st.get('wordSpace', 0) * size
        sx, sy = st.get('scale', [1, 1]) if isinstance(st.get('scale', 1), list) else (st.get('scale', 1),) * 2
        feats = st.get('features')
        base = -st.get('baseline', 0) * SS
        x += st.get('before', 0) * SS
        common = dict(run=ri, f=f, size=size, sx=sx, sy=sy, rot=0.0, shear=12.0 if synth else 0.0, trk=trk)
        if not curved and not vertical and not synth and sx == 1 and sy == 1 and trk == 0 and ws == 0:
            adv = f.getlength(text, features=feats)
            G.append(dict(common, s=text, x=x, y=base, adv=adv, feats=feats))
            x += adv
        else:
            for i, ch in enumerate(text):
                adv = f.getlength(ch)
                kern = (f.getlength(text[i:i + 2]) - adv - f.getlength(text[i + 1])) if i + 1 < len(text) else 0
                G.append(dict(common, s=ch, x=x, y=base, adv=adv * sx, feats=None))
                x += (adv + kern) * sx + (trk if i + 1 < len(text) else 0) + (ws if ch == ' ' else 0)
        x += st.get('after', 0) * SS
    total = x
    # vertical alignment of runs against the line's biggest run
    ref = max(range(len(runs)), key=lambda i: run_size(runs[i]))
    ext = {}
    for g in G:
        l, t, r, b = g['f'].getbbox(g['s'], anchor='ls')
        e = ext.setdefault(g['run'], [1e9, -1e9])
        e[0], e[1] = min(e[0], t * g['sy'] + g['y']), max(e[1], b * g['sy'] + g['y'])
    for ri, st in enumerate(runs):
        va = st.get('valign', 'baseline')
        if va == 'baseline' or ri not in ext or ref not in ext:
            continue
        (t0, b0), (t1, b1) = ext[ref], ext[ri]
        dy = {'top': t0 - t1, 'bottom': b0 - b1, 'center': (t0 + b0) / 2 - (t1 + b1) / 2}[va]
        for g in G:
            if g['run'] == ri:
                g['y'] += dy
    for g in G:
        asc, desc = g['f'].getmetrics()
        g['cx'] = g['x'] + g['adv'] / 2
        g['cy'] = g['y'] + (desc - asc) / 2 * g['sy']
    if vertical:
        y = 0.0
        for g in G:
            if g['s'].isspace():
                y += 0.35 * g['size']
                continue
            l, t, r, b = g['f'].getbbox(g['s'], anchor='ls')
            asc, desc = g['f'].getmetrics()
            # the glyph is drawn centred on its 'mm' point; put its ink centre on the axis x = 0, ink top at y
            g['cx'] = -((l + r) / 2 - g['adv'] / g['sx'] / 2) * g['sx']
            g['cy'] = y + (b - t) / 2 * g['sy'] - ((t + b) / 2 - (desc - asc) / 2) * g['sy']
            y += (b - t) * g['sy'] + g['trk']
    arc = line.get('arc')
    if arc:
        Rr = total / math.radians(abs(arc))
        sgn = 1 if arc > 0 else -1
        for g in G:
            th = (g['cx'] - total / 2) / Rr
            g['cx'] = total / 2 + Rr * math.sin(th)
            g['cy'] += sgn * Rr * (1 - math.cos(th))
            g['rot'] += sgn * math.degrees(th)
    jit = line.get('jitter')
    if jit:
        jr = np.random.default_rng(jit.get('seed', 1))
        k = 0
        for g in G:
            if g['s'].isspace():
                continue
            if jit.get('pattern') == 'alternate':
                sg = 1 if k % 2 else -1
                g['rot'] += sg * jit.get('rot', 0)
                g['cy'] += sg * jit.get('y', 0) * SS
            else:
                g['rot'] += jr.uniform(-1, 1) * jit.get('rot', 0)
                g['cy'] += jr.uniform(-1, 1) * jit.get('y', 0) * SS
                sc = 1 + jr.uniform(-1, 1) * jit.get('scale', 0)
                g['sx'] *= sc
                g['sy'] *= sc
            k += 1
    for g in G:
        g['simple'] = (g['rot'] == 0 and g['sx'] == 1 and g['sy'] == 1 and g['shear'] == 0 and not vertical)
    return G


def raster_glyphs(G, nruns, pad):
    boxes = []
    for g in G:
        if g['simple']:
            l, t, r, b = g['f'].getbbox(g['s'], anchor='ls', features=g['feats'])
            boxes.append((g['x'] + l, g['y'] + t, g['x'] + r, g['y'] + b))
        else:
            half = max(g['adv'], g['size']) * 1.25 * max(g['sx'], g['sy'])
            boxes.append((g['cx'] - half, g['cy'] - half, g['cx'] + half, g['cy'] + half))
    X0, Y0, X1, Y1 = union(boxes)
    ox, oy = pad - math.floor(X0), pad - math.floor(Y0)
    w, h = int(math.ceil(X1) - math.floor(X0)) + 2 * pad, int(math.ceil(Y1) - math.floor(Y0)) + 2 * pad
    imgs = [Image.new('L', (w, h), 0) for _ in range(nruns)]
    arrs = [None] * nruns
    for g in G:
        if g['simple']:
            ImageDraw.Draw(imgs[g['run']]).text((g['x'] + ox, g['y'] + oy), g['s'], font=g['f'], fill=255, anchor='ls', features=g['feats'])
    for i in range(nruns):
        arrs[i] = np.asarray(imgs[i], F32) / 255
    for g in G:
        if g['simple'] or g['s'].isspace():
            continue
        side = int(max(g['adv'] / g['sx'], g['size']) * 2.4) + 8
        gi = Image.new('L', (side, side), 0)
        ImageDraw.Draw(gi).text((side / 2, side / 2), g['s'], font=g['f'], fill=255, anchor='mm')
        if g['shear']:
            k = math.tan(math.radians(g['shear']))
            gi = gi.transform(gi.size, Image.Transform.AFFINE, (1, k, -k * side / 2, 0, 1, 0), resample=Image.Resampling.BICUBIC)
        if g['sx'] != 1 or g['sy'] != 1:
            gi = gi.resize((max(1, round(side * g['sx'])), max(1, round(side * g['sy']))), Image.Resampling.LANCZOS)
        if g['rot']:
            gi = gi.rotate(-g['rot'], resample=Image.Resampling.BICUBIC, expand=True)
        a = np.asarray(gi, F32) / 255
        px, py = int(round(g['cx'] + ox - a.shape[1] / 2)), int(round(g['cy'] + oy - a.shape[0] / 2))
        dst = arrs[g['run']]
        sy0, sx0 = max(0, -py), max(0, -px)
        y0, x0 = max(0, py), max(0, px)
        y1, x1 = min(h, py + a.shape[0]), min(w, px + a.shape[1])
        if y1 > y0 and x1 > x0:
            dst[y0:y1, x0:x1] = np.maximum(dst[y0:y1, x0:x1], a[sy0:sy0 + y1 - y0, sx0:sx0 + x1 - x0])
    return arrs, ox, oy


def build_line(line, base_st, ctx, key):
    """One line: run bodies in line-local px, the line's own transform, and its boxes."""
    if isinstance(line, str):
        line = {'text': line}
    lst = merge(base_st, resolve({k: v for k, v in line.items() if k not in LINE_KEYS}, ctx))
    runs = line.get('runs') or [{'text': line.get('text', '')}]
    runs = [merge(lst, resolve(r if isinstance(r, dict) else {'text': r}, ctx)) for r in runs]
    if line.get('width'):
        runs = [r if ('size' in r or 'cap' in r) else merge(r, {'size': 100}) for r in runs]  # fitted below
    maxw = 0.0
    for r in runs:
        ws = sum(s['width'] for s in (r.get('strokes') or ([r['stroke']] if r.get('stroke') else [])))
        off = max([abs(v) for s in (r.get('strokes') or []) for v in s.get('offset', [0, 0])] + [0])
        rg = (r.get('rough') or {}) if isinstance(r.get('rough'), dict) else {}
        maxw = max(maxw, ws + off + rg.get('amount', 2.5 if r.get('rough') else 0) * 2)
    pad = int((maxw + 8) * SS)
    factor = 1.0
    G = layout_glyphs(line, runs, factor)
    masks, ox, oy = raster_glyphs(G, len(runs), pad)
    if line.get('width'):
        b = union([bbox(m, 0.5) for m in masks])
        if b:
            factor = line['width'] * SS / max(1, b[2] - b[0])
            G = layout_glyphs(line, runs, factor)
            masks, ox, oy = raster_glyphs(G, len(runs), pad)
    fill_boxes = [bbox(m, 0.5) for m in masks]
    line_box = union(fill_boxes)
    if line_box is None:
        fail(f'line {line!r} drew nothing')
    bodies = []
    for ri, (m, st) in enumerate(zip(masks, runs)):
        if fill_boxes[ri] is None:
            continue
        box = line_box if (isinstance(st.get('fill'), dict) and st['fill'].get('span') == 'line') else fill_boxes[ri]
        body = paint_body(m, st, ctx, ctx.rng(*key, ri), box)
        bodies.append((body, st, ri))
    cx, cy = (line_box[0] + line_box[2]) / 2, (line_box[1] + line_box[3]) / 2
    L0 = around(R(line.get('rotate', 0)) @ shear(line.get('slant', 0), line.get('rise', 0)), cx, cy)
    ink = union([bbox(b[..., 3], 0.25) for b, _, _ in bodies])
    return dict(line=line, bodies=bodies, L0=L0, box=tbox(L0, ink), fill_box=tbox(L0, line_box), ink_local=ink,
                text=''.join(r['text'] for r in runs))


# ---------------------------------------------------------------- shapes


def aa(w, h, fn, k=4):
    img = Image.new('L', (int(w) * k, int(h) * k), 0)
    fn(ImageDraw.Draw(img), k)
    return np.asarray(img.resize((int(w), int(h)), Image.Resampling.BOX), F32) / 255


def poly_mask(w, h, pts, k=4):
    return aa(w, h, lambda d, k: d.polygon([(x * k, y * k) for x, y in pts], fill=255), k)


def bezier(p0, p1, p2, p3, n=120):
    t = np.linspace(0, 1, n)[:, None]
    p0, p1, p2, p3 = (np.array(p, float) for p in (p0, p1, p2, p3))
    return ((1 - t) ** 3) * p0 + 3 * ((1 - t) ** 2) * t * p1 + 3 * (1 - t) * t * t * p2 + t ** 3 * p3


def stroke_path(w, h, pts, radii, k=4):
    """A tapered stroke along a polyline: offset outline plus round joints."""
    pts = np.asarray(pts, float)
    radii = np.asarray(radii, float)
    tang = np.gradient(pts, axis=0)
    nrm = np.stack([-tang[:, 1], tang[:, 0]], 1)
    nrm /= np.maximum(1e-6, np.linalg.norm(nrm, axis=1))[:, None]
    left = pts + nrm * radii[:, None]
    right = pts - nrm * radii[:, None]

    def fn(d, k):
        d.polygon([(x * k, y * k) for x, y in np.concatenate([left, right[::-1]])], fill=255)
        step = max(1, len(pts) // 160)
        for (x, y), r in list(zip(pts[::step], radii[::step])) + [(pts[-1], radii[-1])]:
            if r > 0.3:
                d.ellipse([(x - r) * k, (y - r) * k, (x + r) * k, (y + r) * k], fill=255)
    return aa(w, h, fn, k)


def star_pts(cx, cy, r, points=4, inner=0.22, rot=-math.pi / 2):
    out = []
    for i in range(points * 2):
        rr = r if i % 2 == 0 else r * inner
        a = rot + i * math.pi / points
        out.append((cx + math.cos(a) * rr, cy + math.sin(a) * rr))
    return out


def diamond_pts(cx, cy, rx, ry=None):
    ry = rx if ry is None else ry
    return [(cx, cy - ry), (cx + rx, cy), (cx, cy + ry), (cx - rx, cy)]


def shape_parts(c, bw, bh, p, ctx, rng):
    """Mask parts of a shape in a (bh + 2p) x (bw + 2p) local canvas, the box at (p, p). Each part is
    (mask, style override)."""
    kind = c['shape']
    w, h = bw + 2 * p, bh + 2 * p
    x0, y0, x1, y1 = p, p, p + bw, p + bh
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    if kind == 'plate':
        r = c.get('radius', 0) * SS
        ch = c.get('chamfer', 0) * SS
        sl = math.tan(math.radians(c.get('slant', 0))) * bh / 2
        if ch or sl:
            # chamfered top-left and bottom-right corners, then slanted: the top edge moves right by sl, the bottom left
            pts = ([(x0 + ch, y0), (x1, y0), (x1, y1 - ch), (x1 - ch, y1), (x0, y1), (x0, y0 + ch)] if ch
                   else [(x0, y0), (x1, y0), (x1, y1), (x0, y1)])
            pts = [(x + sl * (1 - 2 * (y - y0) / bh), y) for x, y in pts]
            return [(poly_mask(w, h, pts), {})]
        return [(aa(w, h, lambda d, k: d.rounded_rectangle([x0 * k, y0 * k, x1 * k, y1 * k], radius=r * k, fill=255)), {})]
    if kind == 'banner':
        e = c.get('depth', bh * 0.45 / SS) * SS
        ends = c.get('ends', ['point', 'point'])
        left = {'flat': [(x0, y1), (x0, y0)], 'point': [(x0, y1), (x0 - e, cy), (x0, y0)], 'notch': [(x0 - e, y1), (x0, cy), (x0 - e, y0)],
                'slant': [(x0 - e, y1), (x0, y0)]}[ends[0]]
        right = {'flat': [(x1, y0), (x1, y1)], 'point': [(x1, y0), (x1 + e, cy), (x1, y1)], 'notch': [(x1 + e, y0), (x1, cy), (x1 + e, y1)],
                 'slant': [(x1 + e, y0), (x1, y1)]}[ends[1]]
        return [(poly_mask(w, h, left + right), {})]
    if kind == 'ribbon':
        tail = c.get('tail', bh / SS * 0.9) * SS
        drop = c.get('drop', bh / SS * 0.28) * SS
        notch = c.get('notch', bh / SS * 0.3) * SS
        arc = c.get('arc', 0) * SS
        half = max(1, bw / 2)

        def bend(pts):
            out = []
            for i in range(len(pts)):
                a, b = pts[i], pts[(i + 1) % len(pts)]
                n = max(1, int(abs(b[0] - a[0]) / 6))
                for j in range(n):
                    t = j / n
                    x, y = a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t
                    u = (x - cx) / half
                    out.append((x, y - arc * (1 - u * u)))
            return out
        ty0, ty1 = y0 + drop, y1 + drop
        lt = [(x0 - tail, ty0), (x0 + drop, ty0), (x0 + drop, ty1), (x0 - tail, ty1), (x0 - tail + notch, (ty0 + ty1) / 2)]
        rt = [(x1 - drop, ty0), (x1 + tail, ty0), (x1 + tail - notch, (ty0 + ty1) / 2), (x1 + tail, ty1), (x1 - drop, ty1)]
        lf = [(x0, y1), (x0 + drop, y1), (x0 + drop, ty1)]
        rf = [(x1 - drop, y1), (x1, y1), (x1 - drop, ty1)]
        band = [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]
        ts, fs = c.get('tailShade', 0.72), c.get('foldShade', 0.45)
        return [(poly_mask(w, h, bend(lt)), {'_shade': ts}), (poly_mask(w, h, bend(rt)), {'_shade': ts}),
                (poly_mask(w, h, bend(lf)), {'_shade': fs, 'strokes': None}), (poly_mask(w, h, bend(rf)), {'_shade': fs, 'strokes': None}),
                (poly_mask(w, h, bend(band)), {})]
    if kind == 'torn':
        jag = c.get('jag', 6) * SS
        pts = []
        for (ax, ay), (bx_, by_), amp in (((x0, y0), (x1, y0), jag), ((x1, y0), (x1, y1), jag * 0.4), ((x1, y1), (x0, y1), jag), ((x0, y1), (x0, y0), jag * 0.4)):
            n = max(2, int(math.hypot(bx_ - ax, by_ - ay) / (jag * 1.4 + 1)))
            nx_, ny_ = (by_ - ay), -(bx_ - ax)
            ln = math.hypot(nx_, ny_) or 1
            for j in range(n):
                t = j / n
                o = rng.uniform(-1, 1) * amp
                pts.append((ax + (bx_ - ax) * t + nx_ / ln * o, ay + (by_ - ay) * t + ny_ / ln * o))
        parts = [(poly_mask(w, h, pts), {})]
        for corner in c.get('tape', []):
            fx, fy = anch(corner)
            tx, ty = x0 + (x1 - x0) * fx, y0 + (y1 - y0) * fy
            tw, th = min(bw * 0.28, 150 * SS), 34 * SS
            ang = math.radians((-38 if fx < 0.5 else 38) * (1 if fy < 0.5 else -1) + rng.uniform(-6, 6))
            ca, sa = math.cos(ang), math.sin(ang)
            quad = [(tx + ca * dx - sa * dy, ty + sa * dx + ca * dy) for dx, dy in ((-tw / 2, -th / 2), (tw / 2, -th / 2), (tw / 2, th / 2), (-tw / 2, th / 2))]
            parts.append((poly_mask(w, h, quad), {'fill': {'texture': 'grain', 'base': c.get('tapeColor', '#efe3b8d0'), 'strength': 0.15},
                                                 'strokes': None, 'distress': None}))
        return parts
    if kind == 'swash':
        xs = np.arange(w, dtype=F32)
        s = (xs - x0) / max(1, bw)
        tilt = math.tan(math.radians(c.get('tilt', -3)))
        cyl = cy + c.get('curve', 0) * SS * (4 * (s - 0.5) ** 2 - 1) * -1 + tilt * (xs - cx)
        head, tl = c.get('head', 0.05), c.get('tail', 0.3)
        prof = smoothstep(-0.02, head, s) * (1 - smoothstep(1 - tl, 1.02, s)) ** 0.6
        th = bh / 2 * (0.82 + 0.18 * np.sin(s * math.pi)) * prof
        nt = (value_noise(1, w, bw * 0.05 + 4, rng, 3)[0] - 0.5) * bh * 0.10
        nb = (value_noise(1, w, bw * 0.05 + 4, rng, 3)[0] - 0.5) * bh * 0.10
        yy = np.arange(h, dtype=F32)[:, None]
        a = np.clip(yy - (cyl - th + nt) + 0.5, 0, 1) * np.clip((cyl + th + nb) - yy + 0.5, 0, 1)
        a = a * ((s >= -0.02) & (s <= 1.02))
        streak = value_noise(h, w, max(4.0, bh * 0.10), rng, 3, aspect=16)
        dry = smoothstep(1 - tl * 1.3, 1.0, s) * c.get('dry', 0.85) + c.get('dryAll', 0.08)
        a = a * np.clip((streak - dry[None, :] * 0.95) * 6 + 0.5, 0, 1)
        return [(a.astype(F32), {})]
    if kind == 'hud':
        lw = c.get('line', 2) * SS
        cl, cw = c.get('corner', 30) * SS, c.get('cornerWidth', 5) * SS
        ch = c.get('chamfer', 18) * SS
        outline = [(x0 + ch, y0), (x1, y0), (x1, y1 - ch), (x1 - ch, y1), (x0, y1), (x0, y0 + ch)]
        color = c.get('color', '#36ff8a')
        parts = [(poly_mask(w, h, outline), {'fill': {'texture': 'scanlines', 'base': c.get('panel', '#04140acc'), 'color': color, 'strength': 0.08, 'period': 4},
                                             'strokes': None, 'bevel': None})]
        ring = aa(w, h, lambda d, k: d.line([(x * k, y * k) for x, y in outline + outline[:1]], fill=255, width=int(lw * k), joint='curve'))
        parts.append((ring, {'fill': color, 'strokes': None, 'bevel': None}))

        def brackets(d, k):
            for (ax, ay, sx_, sy_) in ((x1, y0, -1, 1), (x0, y1, 1, -1)):
                d.line([((ax + sx_ * cl) * k, ay * k), (ax * k, ay * k), (ax * k, (ay + sy_ * cl) * k)], fill=255, width=int(cw * k), joint='curve')
            for i in range(c.get('ticks', 5)):
                tx = x0 + ch + 14 * SS + i * 12 * SS
                d.rectangle([tx * k, (y0 - 7 * SS) * k, (tx + 6 * SS) * k, (y0 - 3 * SS) * k], fill=255)
        parts.append((aa(w, h, brackets), {'fill': color, 'strokes': None, 'bevel': None}))
        return parts
    if kind == 'seal':
        form = c.get('form', 'square')
        m = 0.06 * min(bw, bh)
        if form == 'round':
            outer = aa(w, h, lambda d, k: d.ellipse([x0 * k, y0 * k, x1 * k, y1 * k], fill=255))
        else:
            outer = aa(w, h, lambda d, k: d.rounded_rectangle([x0 * k, y0 * k, x1 * k, y1 * k], radius=m * k, fill=255))
        text = c.get('text', '')
        chars = [ch for ch in text if not ch.isspace()]
        n = len(chars)
        cells = {1: [(0.5, 0.5, 1)], 2: [(0.5, 0.3, 0.5), (0.5, 0.72, 0.5)], 3: [(0.5, 0.21, 0.36), (0.5, 0.5, 0.36), (0.5, 0.79, 0.36)],
                 4: [(0.3, 0.3, 0.5), (0.72, 0.3, 0.5), (0.3, 0.72, 0.5), (0.72, 0.72, 0.5)]}.get(n)
        if not cells:
            fail(f'seal text {text!r}: 1 to 4 characters')
        letters = Image.new('L', (int(w), int(h)), 0)
        dd = ImageDraw.Draw(letters)
        inner_w, inner_h = bw * 0.78, bh * 0.78
        for chr_, (fx, fy, share) in zip(chars, cells):
            target = min(inner_w * (share if n == 4 else 1), inner_h * share) * 0.95
            f, _ = load_font(c.get('font', 'Shippori Mincho B1'), 100, c.get('weight'))
            b = f.getbbox(chr_, anchor='mm')
            k = target / max(b[2] - b[0], b[3] - b[1], 1)
            f, _ = load_font(c.get('font', 'Shippori Mincho B1'), 100 * k, c.get('weight'))
            dd.text((x0 + bw * (0.5 if n in (1, 2, 3) else fx), y0 + bh * fy), chr_, font=f, fill=255, anchor='mm')
        L = np.asarray(letters, F32) / 255
        if c.get('style', 'intaglio') == 'relief':
            ins = max(3 * SS, m * 0.9)
            if form == 'round':
                inner = aa(w, h, lambda d, k: d.ellipse([(x0 + ins) * k, (y0 + ins) * k, (x1 - ins) * k, (y1 - ins) * k], fill=255))
            else:
                inner = aa(w, h, lambda d, k: d.rectangle([(x0 + ins) * k, (y0 + ins) * k, (x1 - ins) * k, (y1 - ins) * k], fill=255))
            return [(np.clip(outer - inner + L * inner, 0, 1).astype(F32), {})]
        return [((outer * (1 - L)).astype(F32), {})]
    if kind == 'underline':
        weight = c.get('weight', 9) * SS
        sag = min(c.get('curve', 16) * SS, bh * 0.45)
        pts = bezier((x0, cy - sag * 0.6), (x0 + bw * 0.28, cy + sag * 1.6), (x0 + bw * 0.62, cy - sag * 1.2), (x1, cy + sag * 0.2), 260)
        if c.get('curl', True):
            E, P2 = pts[-1], pts[-8]
            Tn = (E - P2) / max(1e-6, np.linalg.norm(E - P2))
            r0 = sag * 0.9 + 2 * SS
            C = E + np.array([Tn[1], -Tn[0]]) * r0
            ph0 = math.atan2(E[1] - C[1], E[0] - C[0])
            ts = np.linspace(0, 1, 90)[1:]
            spiral = np.stack([C[0] + r0 * (1 - 0.75 * ts) * np.cos(ph0 - ts * 1.3 * 2 * math.pi),
                               C[1] + r0 * (1 - 0.75 * ts) * np.sin(ph0 - ts * 1.3 * 2 * math.pi)], 1)
            pts = np.concatenate([pts, spiral])
        t = np.linspace(0, 1, len(pts))
        radii = weight / 2 * np.sin(np.pi * np.clip(t * 1.02, 0, 1)) ** 0.6 + 0.4 * SS
        return [(stroke_path(w, h, pts, radii), {})]
    if kind == 'rule':
        t = c.get('thickness', 3) * SS
        size = c.get('size', 16) * SS
        center = c.get('center')
        gap = size * 1.1 if center else 0
        parts = []
        for yy in ([cy] if not c.get('double') else [cy - c['double'] * SS / 2, cy + c['double'] * SS / 2]):
            for (a, b) in (((x0, cx - gap), (cx + gap, x1)) if center else ((x0, x1),)):
                if c.get('taper', True):
                    n = 64
                    xs = np.linspace(a, b, n)
                    u = (xs - a) / max(1, b - a)
                    prof = np.sin(np.pi * u) ** 0.5 if not center else (u if a < cx else 1 - u) ** 0.8
                    pts = [(x, yy - t / 2 * pr) for x, pr in zip(xs, prof)] + [(x, yy + t / 2 * pr) for x, pr in zip(xs[::-1], prof[::-1])]
                    parts.append(poly_mask(w, h, pts))
                else:
                    parts.append(poly_mask(w, h, [(a, yy - t / 2), (b, yy - t / 2), (b, yy + t / 2), (a, yy + t / 2)]))
        if center == 'diamond':
            parts.append(poly_mask(w, h, diamond_pts(cx, cy, size * 0.5, size * 0.75)))
        elif center == 'star':
            parts.append(poly_mask(w, h, star_pts(cx, cy, size)))
        elif center == 'dot':
            parts.append(aa(w, h, lambda d, k: d.ellipse([(cx - size / 2) * k, (cy - size / 2) * k, (cx + size / 2) * k, (cy + size / 2) * k], fill=255)))
        for e in ([x0, x1] if c.get('ends') else []):
            r = size * 0.35
            if c['ends'] == 'diamond':
                parts.append(poly_mask(w, h, diamond_pts(e, cy, r, r * 1.3)))
            else:
                parts.append(aa(w, h, lambda d, k, e=e: d.ellipse([(e - r) * k, (cy - r) * k, (e + r) * k, (cy + r) * k], fill=255)))
        return [(np.clip(sum(parts), 0, 1).astype(F32), {})]
    if kind == 'flourish':
        weight = c.get('weight', 5) * SS
        half = bw / 2
        up = c.get('curl', 'up') == 'up'
        acc = np.zeros((int(h), int(w)), F32)
        for sgn in (1, -1):
            def X(v):
                return cx + sgn * v
            P0, P1, P2, E = (X(bh * 0.25), cy), (X(half * 0.32), cy + bh * 0.42), (X(half * 0.55), cy - bh * 0.42), (X(half * 0.80), cy - bh * 0.02)
            path = bezier(P0, P1, P2, E, 160)
            Tn = np.array(E) - np.array(P2)
            Tn /= np.linalg.norm(Tn)
            r0 = min(bh * 0.26, half * 0.16)
            nrm = np.array([Tn[1], -Tn[0]]) if (up ^ (sgn < 0)) else np.array([-Tn[1], Tn[0]])
            C = np.array(E) + nrm * r0
            ph0 = math.atan2(E[1] - C[1], E[0] - C[0])
            dirn = -1 if (up ^ (sgn < 0)) else 1
            ts = np.linspace(0, 1, 120)[1:]
            ph = ph0 + dirn * ts * 1.55 * 2 * math.pi
            rr = r0 * (1 - 0.82 * ts)
            spiral = np.stack([C[0] + rr * np.cos(ph), C[1] + rr * np.sin(ph)], 1)
            pts = np.concatenate([path, spiral])
            t = np.linspace(0, 1, len(pts))
            radii = weight / 2 * (0.3 + 0.7 * np.sin(np.pi * np.clip(t * 1.6, 0, 1)) ** 0.8) * (1 - 0.8 * smoothstep(0.45, 1.0, t)) + 0.35 * SS
            acc = np.maximum(acc, stroke_path(w, h, pts, radii))
        acc = np.maximum(acc, poly_mask(w, h, diamond_pts(cx, cy, bh * 0.13, bh * 0.2)))
        return [(acc, {})]
    if kind == 'star':
        return [(poly_mask(w, h, star_pts(cx, cy, min(bw, bh) / 2, c.get('points', 4), c.get('inner', 0.22))), {})]
    if kind == 'sparkles':
        acc = np.zeros((int(h), int(w)), F32)
        for fx, fy, sz in c.get('points', [[0.5, 0.5, 24]]):
            acc = np.maximum(acc, poly_mask(w, h, star_pts(x0 + bw * fx, y0 + bh * fy, sz * SS / 2, 4, c.get('inner', 0.2))))
        return [(acc, {})]
    if kind == 'diamond':
        return [(poly_mask(w, h, diamond_pts(cx, cy, bw / 2, bh / 2)), {})]
    if kind in ('dot', 'ellipse'):
        return [(aa(w, h, lambda d, k: d.ellipse([x0 * k, y0 * k, x1 * k, y1 * k], fill=255)), {})]
    if kind == 'polygon':
        return [(poly_mask(w, h, [(x0 + bw * fx, y0 + bh * fy) for fx, fy in c['points']]), {})]
    if kind == 'brackets':
        t = c.get('thickness', 4) * SS
        ln = c.get('len', 28) * SS
        style = c.get('style', 'corners')

        def fn(d, k):
            if style == 'corners':
                for ax, ay, sx_, sy_ in ((x0, y0, 1, 1), (x1, y0, -1, 1), (x0, y1, 1, -1), (x1, y1, -1, -1)):
                    d.line([((ax + sx_ * ln) * k, ay * k), (ax * k, ay * k), (ax * k, (ay + sy_ * ln) * k)], fill=255, width=int(t * k), joint='curve')
            elif style == 'square':
                for ax, sx_ in ((x0, 1), (x1, -1)):
                    d.line([((ax + sx_ * ln) * k, y0 * k), (ax * k, y0 * k), (ax * k, y1 * k), ((ax + sx_ * ln) * k, y1 * k)], fill=255, width=int(t * k), joint='curve')
            else:
                hh = bh * 0.32
                for ax, sx_ in ((x0, 1), (x1, -1)):
                    for o in (0, ln * 0.45):
                        d.line([((ax + sx_ * (ln * 0.5 + o)) * k, (cy - hh) * k), ((ax + sx_ * o) * k, cy * k), ((ax + sx_ * (ln * 0.5 + o)) * k, (cy + hh) * k)],
                               fill=255, width=int(t * k), joint='curve')
        return [(aa(w, h, fn), {})]
    if kind == 'burst':
        n = c.get('rays', 18)
        reach = c.get('reach', 1.0) * math.hypot(bw, bh) / 2
        inner = c.get('inner', 0.0) * reach
        spread = c.get('spread', 0.45)
        pts_all = []
        for i in range(n):
            a = 2 * math.pi * i / n + rng.uniform(-0.08, 0.08)
            ln = reach * (1.0 if i % 2 == 0 else 0.72) * rng.uniform(0.88, 1.0)
            da = math.pi / n * spread
            pts_all.append([(cx + math.cos(a - da * 0.15) * inner, cy + math.sin(a - da * 0.15) * inner),
                            (cx + math.cos(a - da) * ln, cy + math.sin(a - da) * ln), (cx + math.cos(a + da) * ln, cy + math.sin(a + da) * ln),
                            (cx + math.cos(a + da * 0.15) * inner, cy + math.sin(a + da * 0.15) * inner)])
        return [(aa(w, h, lambda d, k: [d.polygon([(x * k, y * k) for x, y in pp], fill=255) for pp in pts_all], k=2), {})]
    if kind == 'speedlines':
        acc = np.zeros((int(h), int(w)), F32)
        for i in range(c.get('count', 14)):
            yy = rng.uniform(y0, y1)
            a = x0 + rng.uniform(0, 0.4) * bw
            b = a + rng.uniform(0.35, 0.6) * bw
            t = c.get('thickness', 3) * SS * rng.uniform(0.5, 1.2)
            xs = np.linspace(a, b, 40)
            u = (xs - a) / (b - a)
            pts = [(x, yy - t / 2 * pr) for x, pr in zip(xs, u ** 0.7)] + [(x, yy + t / 2 * pr) for x, pr in zip(xs[::-1], (u ** 0.7)[::-1])]
            acc = np.maximum(acc, poly_mask(w, h, pts, k=2))
        return [(acc, {})]
    fail(f'shape {kind!r} is not known')


SHAPE_SIZE = {'seal': (110, 110), 'star': (44, 44), 'diamond': (22, 30), 'dot': (14, 14), 'rule': (None, 24), 'flourish': (None, 70),
              'underline': (None, 40), 'sparkles': (None, None)}


def build_shape(c, box, ctx, key):
    """A shape filling `box` (x0, y0, x1, y1 in the parent's SS px): its body in local px and local->parent matrix."""
    c = merge(SHAPE_DEFAULTS.get(c['shape'], {}), resolve(c, ctx))
    bw, bh = max(2.0, box[2] - box[0]), max(2.0, box[3] - box[1])
    strokes = c.get('strokes') or []
    sw = sum(s['width'] for s in strokes) + max([abs(v) for s in strokes for v in s.get('offset', [0, 0])] + [0])
    over_x = {'banner': c.get('depth', bh * 0.45 / SS) * SS, 'ribbon': (c.get('tail', bh / SS * 0.9) + 4) * SS}.get(c['shape'], 0)
    p = int((sw + 10) * SS + over_x + (c.get('drop', bh / SS * 0.3) * SS + abs(c.get('arc', 0)) * SS if c['shape'] == 'ribbon' else 0))
    if c['shape'] == 'burst':
        p = int(max(p, math.hypot(bw, bh) * 0.5 * c.get('reach', 1.0) - min(bw, bh) / 2 + 10))
    rng = ctx.rng(*key)
    parts = shape_parts(c, int(round(bw)), int(round(bh)), p, ctx, rng)
    body = None
    for m, ov in parts:
        st = {k: v for k, v in merge(c, ov).items() if v is not None}
        shade = st.pop('_shade', None)
        b = paint_body(m, st, ctx, rng)
        if shade is not None:
            b[..., :3] *= shade
        body = b if body is None else over(body, b)
    M = T(box[0] - p, box[1] - p)
    cx, cy = (box[0] + box[2]) / 2, (box[1] + box[3]) / 2
    if c.get('rotate') or c.get('slant'):
        M = around(R(c.get('rotate', 0)) @ shear(c.get('slant', 0)), cx, cy) @ M
    return body, M, c


def pad_box(box, pad):
    if pad is None:
        pad = 0
    if isinstance(pad, (int, float)):
        pad = [pad] * 4
    elif len(pad) == 2:
        pad = [pad[0], pad[1], pad[0], pad[1]]
    return (box[0] - pad[0] * SS, box[1] - pad[1] * SS, box[2] + pad[2] * SS, box[3] + pad[3] * SS)


def place_box(c, ref):
    """The box a shape fills, from a reference box (SS px): padded ref, or w x h placed by to/anchor."""
    kind = c['shape']
    if 'to' not in c and 'w' not in c and 'h' not in c:
        return pad_box(ref, c.get('pad', 0))
    dw, dh = SHAPE_SIZE.get(kind, (None, None))
    w = (c.get('w') or dw or (ref[2] - ref[0]) / SS) * SS
    h = (c.get('h') or dh or (ref[3] - ref[1]) / SS) * SS
    tx, ty = anch(c.get('to', 'mc'))
    ax, ay = anch(c.get('anchor', 'mc'))
    px = ref[0] + (ref[2] - ref[0]) * tx + c.get('dx', 0) * SS
    py = ref[1] + (ref[3] - ref[1]) * ty + c.get('dy', 0) * SS
    return (px - w * ax, py - h * ay, px - w * ax + w, py - h * ay + h)


# ---------------------------------------------------------------- items


class Elem:
    def __init__(self, rgba, x, y, screen=None, ink=None, blend='normal'):
        self.rgba, self.x, self.y, self.screen, self.ink, self.blend = rgba, x, y, screen, ink, blend


def finish(body, M, st, ctx, key):
    """Warp a local body into canvas space and add its outer effects."""
    pad = fx_pad(st)
    out, x, y = warp(body, M, pad)
    if st.get('knockout'):
        return Elem(out, x, y, ink=None, blend='erase')
    normal, screen, sil = outer_effects(out, st, ctx, ctx.rng(*key, 'fx'))
    return Elem(normal, x, y, screen=screen, ink=sil)


def text_item(item, ctx, idx, scale=1.0):
    base = resolve(item.get('style', {}), ctx)
    lines = [build_line(l, base, ctx, (idx, li)) for li, l in enumerate(item['lines'])]
    align = item.get('align', 'center')
    gap = item.get('gap', 0) * SS
    y = 0.0
    for i, lo in enumerate(lines):
        bx = lo['box']
        ln = lo['line'] if isinstance(lo['line'], dict) else {}
        top = y + (ln.get('gap', gap / SS) * SS if i > 0 else 0)
        al = ln.get('align', align)
        tx = {'left': -bx[0], 'center': -(bx[0] + bx[2]) / 2, 'right': -bx[2]}[al] + ln.get('dx', 0) * SS
        ty = top - bx[1] + ln.get('dy', 0) * SS
        lo['M'] = T(tx, ty) @ lo['L0']
        lo['bbox'] = (bx[0] + tx, bx[1] + ty, bx[2] + tx, bx[3] + ty)
        y = top + (bx[3] - bx[1])

    def ref_box(of):
        if of in (None, 'block', 'all'):
            return union([lo['bbox'] for lo in lines])
        ids = of if isinstance(of, list) else [of]
        return union([lines[i]['bbox'] for i in ids])
    parts = []  # (z, body, M, style, key)
    backs = list(item.get('backing', []))
    if item.get('backingEach'):
        backs += [merge(item['backingEach'], {'of': i}) for i in range(len(lines))]
    def ref(c):
        # a shape tied to one line lives in that line's own space, so it turns and slants with the line
        of = c.get('of')
        if isinstance(of, int) or (isinstance(of, list) and len(of) == 1):
            lo = lines[of if isinstance(of, int) else of[0]]
            return lo['ink_local'], lo['M']
        return ref_box(of), np.eye(3)
    def line_z(i):
        ln = lines[i]['line']
        return ln.get('z', 1) if isinstance(ln, dict) else 1

    def z_of(c, default):
        z = c.get('z', default)
        if z in ('front', 'back'):
            return 9 if z == 'front' else -9
        of = c.get('of')
        if 'z' not in c and (isinstance(of, int) or (isinstance(of, list) and len(of) == 1)):
            i = of if isinstance(of, int) else of[0]
            return line_z(i) + (-0.5 if default < 1 else 0.5)  # just under (backing) or over (ornament) its line
        return z
    for bi, c in enumerate(backs):
        box, PM = ref(c)
        body, M, st = build_shape(c, place_box(c, box), ctx, (idx, 'b', bi))
        parts.append((z_of(c, 0), body, PM @ M, st, (idx, 'b', bi)))
    for li, lo in enumerate(lines):
        for body, st, ri in lo['bodies']:
            parts.append((line_z(li), body, lo['M'], st, (idx, li, ri)))
    for oi, c in enumerate(item.get('ornaments', [])):
        box, PM = ref(c)
        body, M, st = build_shape(c, place_box(c, box), ctx, (idx, 'o', oi))
        parts.append((z_of(c, 2), body, PM @ M, st, (idx, 'o', oi)))
    parts.sort(key=lambda p: p[0])
    boxes = [tbox(M, bbox(body[..., 3], 0.25) or (0, 0, 1, 1)) for _, body, M, _, _ in parts]
    ub = union(boxes)
    sc = item.get('scale', 1.0) * scale
    if item.get('maxWidth') and (ub[2] - ub[0]) * sc > item['maxWidth'] * SS:
        sc = item['maxWidth'] * SS / (ub[2] - ub[0])
    if item.get('maxHeight') and (ub[3] - ub[1]) * sc > item['maxHeight'] * SS:
        sc = min(sc, item['maxHeight'] * SS / (ub[3] - ub[1]))
    ax, ay = anch(item.get('anchor', 'mc'))
    P = (ub[0] + (ub[2] - ub[0]) * ax, ub[1] + (ub[3] - ub[1]) * ay)
    at = item.get('at', [0.5, 0.5])
    B = T(at[0] * W * SS + item.get('dx', 0) * SS, at[1] * H * SS + item.get('dy', 0) * SS) @ R(item.get('rotate', 0)) @ S(sc) @ T(-P[0], -P[1])
    elems = [finish(body, B @ M, st, ctx, key) for _, body, M, st, key in parts]
    return elems, ' '.join(lo['text'] for lo in lines)


def shape_item(item, ctx, idx, inks):
    if item.get('of'):
        ref = inks.get(item['of']) or fail(f'shape refers to {item["of"]!r}, which is not an earlier text item')
        box = place_box(item, tuple(v * SS for v in ref))
    elif item.get('box'):
        fx0, fy0, fx1, fy1 = item['box']
        box = (fx0 * W * SS, fy0 * H * SS, fx1 * W * SS, fy1 * H * SS)
    else:
        dw, dh = SHAPE_SIZE.get(item['shape'], (100, 100))
        w, h = item.get('w', dw or 100) * SS, item.get('h', dh or 100) * SS
        ax, ay = anch(item.get('anchor', 'mc'))
        px, py = item['at'][0] * W * SS + item.get('dx', 0) * SS, item['at'][1] * H * SS + item.get('dy', 0) * SS
        box = (px - w * ax, py - h * ay, px - w * ax + w, py - h * ay + h)
    body, M, st = build_shape(item, box, ctx, (idx, 's'))
    return [finish(body, M, st, ctx, (idx, 's'))]


def ink_box(elems):
    boxes = []
    for e in elems:
        if e.ink is None:
            continue
        b = bbox(e.ink, 0.3)
        if b:
            boxes.append((e.x + b[0], e.y + b[1], e.x + b[2], e.y + b[3]))
    b = union(boxes)
    return None if b is None else tuple(v / SS for v in b)


def composite(art, elems):
    """Composite canvas-space SS elements onto the 1x art (float RGB), in place. Returns the 1x ink alpha."""
    xs = [e.x for e in elems] + [e.x + e.rgba.shape[1] for e in elems]
    ys = [e.y for e in elems] + [e.y + e.rgba.shape[0] for e in elems]
    X0, Y0, X1, Y1 = min(xs), min(ys), max(xs), max(ys)
    X0, Y0 = max(0, X0 - X0 % SS), max(0, Y0 - Y0 % SS)
    X1, Y1 = min(W * SS, X1 + (-X1) % SS), min(H * SS, Y1 + (-Y1) % SS)
    if X1 <= X0 or Y1 <= Y0:
        return np.zeros((H, W), F32)
    nw, nh = X1 - X0, Y1 - Y0
    normal = np.zeros((nh, nw, 4), F32)
    screen = np.zeros((nh, nw, 4), F32)
    ink = np.zeros((nh, nw), F32)
    for e in elems:
        h, w = e.rgba.shape[:2]
        ox, oy = e.x - X0, e.y - Y0
        sx0, sy0 = max(0, -ox), max(0, -oy)
        dx0, dy0 = max(0, ox), max(0, oy)
        dx1, dy1 = min(nw, ox + w), min(nh, oy + h)
        if dx1 <= dx0 or dy1 <= dy0:
            continue
        src = (slice(sy0, sy0 + dy1 - dy0), slice(sx0, sx0 + dx1 - dx0))
        dst = (slice(dy0, dy1), slice(dx0, dx1))
        if e.blend == 'erase':
            normal[dst] *= (1 - e.rgba[src][..., 3:4])
            ink[dst] *= (1 - e.rgba[src][..., 3])
            continue
        if e.screen is not None:
            screen[dst] = 1 - (1 - screen[dst]) * (1 - e.screen[src])
        normal[dst] = over(normal[dst], e.rgba[src])
        if e.ink is not None:
            ink[dst] = np.maximum(ink[dst], e.ink[src])

    def down(a):
        return a.reshape(nh // SS, SS, nw // SS, SS, *a.shape[2:]).mean(axis=(1, 3))
    n1, s1, i1 = down(normal), down(screen), down(ink)
    y0, x0 = Y0 // SS, X0 // SS
    reg = art[y0:y0 + n1.shape[0], x0:x0 + n1.shape[1]]
    reg[:] = 1 - (1 - reg) * (1 - s1[..., :3])
    reg[:] = reg * (1 - n1[..., 3:4]) + n1[..., :3]
    full = np.zeros((H, W), F32)
    full[y0:y0 + i1.shape[0], x0:x0 + i1.shape[1]] = i1
    return full


def apply_scrim(art, it, ctx):
    yy, xx = np.mgrid[0:H, 0:W].astype(F32)
    c = col(it.get('color', '#000000'), ctx)
    if it['type'] == 'spot':
        rx, ry = (it['r'], it['r']) if isinstance(it.get('r', 300), (int, float)) else it['r']
        d = np.sqrt(((xx - it['at'][0] * W) / rx) ** 2 + ((yy - it['at'][1] * H) / ry) ** 2)
        a = (1 - smoothstep(0, 1, d)) * it.get('opacity', 0.5)
    else:
        edge = it.get('edge', 'bottom')
        u = {'bottom': yy / H, 'top': 1 - yy / H, 'right': xx / W, 'left': 1 - xx / W}[edge]
        a = smoothstep(it.get('from', 0.6), it.get('to', 1.0), u) * it.get('opacity', 0.6)
    a = a[..., None] * c[3]
    blend = it.get('blend', 'normal')
    if blend == 'screen':
        art[:] = 1 - (1 - art) * (1 - c[:3] * a)
    elif blend == 'multiply':
        art[:] = art * (1 - a + a * c[:3])
    else:
        art[:] = art * (1 - a) + c[:3] * a


def apply_frame(art, it, ctx):
    img = Image.new('L', (W * 2, H * 2), 0)
    d = ImageDraw.Draw(img)
    ins = it.get('inset', 22) * 2
    wd = int(it.get('width', 2) * 2)
    style = it.get('style', 'thin')
    if style in ('thin', 'double'):
        d.rectangle([ins, ins, W * 2 - ins, H * 2 - ins], outline=255, width=wd)
        if style == 'double':
            g = ins + wd + 10
            d.rectangle([g, g, W * 2 - g, H * 2 - g], outline=255, width=max(1, wd // 2))
    else:
        ln = it.get('len', 80) * 2
        for ax, ay, sx, sy in ((ins, ins, 1, 1), (W * 2 - ins, ins, -1, 1), (ins, H * 2 - ins, 1, -1), (W * 2 - ins, H * 2 - ins, -1, -1)):
            d.line([(ax + sx * ln, ay), (ax, ay), (ax, ay + sy * ln)], fill=255, width=wd)
    a = np.asarray(img.resize((W, H), Image.Resampling.BOX), F32)[..., None] / 255 * it.get('opacity', 0.85)
    c = col(it.get('color', '#ffffff'), ctx)
    art[:] = art * (1 - a) + c[:3] * a


# ---------------------------------------------------------------- spec -> cover


def fixture_title(story_id):
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
    return None


def letters(s):
    return re.sub(r'[^0-9a-z]+', '', s.casefold())


def out_path(spec_path, spec):
    if spec.get('out'):
        return os.path.join(ROOT, spec['out']) if not os.path.isabs(spec['out']) else spec['out']
    d = os.path.dirname(os.path.abspath(spec_path))
    name = os.path.splitext(os.path.basename(spec_path))[0]
    if os.path.basename(d) == 'samples':
        return os.path.join(OUT, 'samples', name + '.png')
    return os.path.join(OUT, spec['storyId'] + '.png')


def render(spec_path, write=True, debug=False, out=None):
    with open(spec_path, encoding='utf-8') as f:
        spec = json.load(f)
    sid = spec.get('storyId') or fail('spec has no storyId')
    raw = spec.get('raw') or os.path.join(RAW, sid + '.png')
    raw = raw if os.path.isabs(raw) else os.path.join(ROOT, raw) if not os.path.exists(raw) else raw
    crop = tuple(spec.get('crop', [0.5, 0.5]))
    art_img = ImageOps.fit(Image.open(raw).convert('RGB'), (W, H), Image.Resampling.LANCZOS, centering=crop)
    art = np.asarray(art_img, F32) / 255
    ctx = Ctx(art.copy(), spec.get('seed', 7), spec.get('styles', {}))
    art = art.copy()
    safe = spec.get('safe', 28)
    fit = spec.get('fit', 'error')
    inks, spelled, report, problems = {}, [], [], []
    all_ink = np.zeros((H, W), F32)
    for idx, it in enumerate(spec['layers']):
        kind = it.get('type', 'text')
        if kind in ('scrim', 'spot'):
            apply_scrim(art, it, ctx)
            continue
        if kind == 'frame':
            apply_frame(art, it, ctx)
            continue
        iid = it.get('id', f'{kind}{idx}')
        scale = 1.0
        for attempt in range(6):
            if kind == 'text':
                elems, text = text_item(it, ctx, idx, scale)
            elif kind == 'shape':
                elems, text = shape_item(it, ctx, idx, inks), ''
            else:
                fail(f'layer type {kind!r} is not text, shape, scrim, spot or frame')
            b = ink_box(elems)
            if b is None or it.get('bleed'):
                break
            over_l, over_t = safe - b[0], safe - b[1]
            over_r, over_b = b[2] - (W - safe), b[3] - (H - safe)
            if max(over_l, over_t, over_r, over_b) <= 0.5:
                break
            if fit == 'shrink' and kind == 'text':
                k = min((W - 2 * safe) / max(1, b[2] - b[0]), (H - 2 * safe) / max(1, b[3] - b[1]), 1.0)
                if k < 0.999:
                    scale *= k * 0.995
                    continue
            if fit in ('nudge', 'shrink'):
                dx = (over_l if over_l > 0 else -over_r if over_r > 0 else 0)
                dy = (over_t if over_t > 0 else -over_b if over_b > 0 else 0)
                for e in elems:
                    e.x += math.ceil(dx * SS) if dx > 0 else math.floor(dx * SS)
                    e.y += math.ceil(dy * SS) if dy > 0 else math.floor(dy * SS)
                report.append(f'  {iid}: nudged {dx:+.0f},{dy:+.0f} px into the safe area')
                b = ink_box(elems)
                break
            problems.append(f'{iid}: ink {b[0]:.0f},{b[1]:.0f} - {b[2]:.0f},{b[3]:.0f} leaves the safe area '
                            f'({safe}px): left {over_l:+.0f} top {over_t:+.0f} right {over_r:+.0f} bottom {over_b:+.0f}')
            break
        if kind == 'text' and it.get('role', 'title') == 'title':
            spelled.append(text)
        if b:
            inks[iid] = b
            report.append(f'  {iid}: ink x {b[0]:.0f}-{b[2]:.0f}  y {b[1]:.0f}-{b[3]:.0f}  ({(b[3] - b[1]) / H:.0%} of the height)')
        ink = composite(art, elems)
        if not it.get('avoidOk'):
            all_ink = np.maximum(all_ink, ink)
    title = fixture_title(sid)
    if title is None:
        report.append(f'  (no fixture title found for {sid}; spelling not checked)')
    elif letters(' '.join(spelled)) != letters(title):
        problems.append(f'title spells {" ".join(spelled)!r}; the fixture title is {title!r}')
    for box in spec.get('avoid', []):
        x0, y0, x1, y1 = (int(v) for v in box[:4])
        hit = int((all_ink[max(0, y0):y1, max(0, x0):x1] > 0.3).sum())
        if hit:
            problems.append(f'title ink covers {hit} px of avoid box {box}')
    if ctx.samples:
        report.append('  sampled: ' + ', '.join(f'{c} @ {x:.2f},{y:.2f}' for x, y, c in ctx.samples))
    dst = out or out_path(spec_path, spec)
    if problems:
        raise SpecError(f'{os.path.relpath(spec_path, ROOT)}:\n  ' + '\n  '.join(problems))
    img = Image.fromarray((np.clip(art, 0, 1) * 255 + 0.5).astype(np.uint8))
    if write:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        img.save(dst, optimize=True)
        if debug:
            dbg = img.copy()
            d = ImageDraw.Draw(dbg)
            d.rectangle([safe, safe, W - safe, H - safe], outline=(255, 220, 0), width=2)
            for box in spec.get('avoid', []):
                d.rectangle(box[:4], outline=(255, 40, 40), width=3)
            for b in inks.values():
                d.rectangle(b, outline=(0, 230, 255), width=2)
            dbg.save(os.path.splitext(dst)[0] + '.debug.png')
    print(f'{os.path.relpath(dst, ROOT)}' + ('' if write else ' (checked, not written)'))
    for line in report:
        print(line)
    return dst


# ---------------------------------------------------------------- sheet, fonts, cli


def contact_sheet(paths, out, cols=3, tile=384, labels=None):
    shelf = 160
    th = round(tile * H / W)
    sh = round(shelf * H / W)
    cw, chh = tile + shelf + 36, th + 56
    rows = math.ceil(len(paths) / cols)
    sheet = Image.new('RGB', (cols * cw + 24, rows * chh + 24), (16, 16, 18))
    d = ImageDraw.Draw(sheet)
    f, _ = load_font('Oswald', 22, 500)
    for i, p in enumerate(paths):
        im = Image.open(p).convert('RGB')
        x, y = 24 + (i % cols) * cw, 24 + (i // cols) * chh
        sheet.paste(im.resize((tile, th), Image.Resampling.LANCZOS), (x, y))
        sheet.paste(im.resize((shelf, sh), Image.Resampling.LANCZOS), (x + tile + 8, y))
        d.text((x + tile + 8, y + sh + 8), 'shelf size', font=f, fill=(120, 120, 128))
        lab = (labels[i] if labels else os.path.splitext(os.path.basename(p))[0])
        d.text((x, y + th + 10), lab, font=f, fill=(225, 225, 230))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    sheet.save(out, optimize=True)
    print(os.path.relpath(out, ROOT))


def fetch_all():
    for e in font_table().values():
        rels = {e['file']} | set((e.get('static') or {}).values()) | set((e.get('staticItalic') or {}).values())
        if e.get('italic'):
            rels.add(e['italic'])
        for rel in sorted(rels):
            fetch(rel)
    print(f'{len(font_table())} families in {os.path.relpath(FONT_DIR, ROOT)}')


def specimen(out):
    """Every family in fonts.json on one sheet: its name, a sample title and its tags."""
    fams = list(font_table().values())
    cols, cw, rh = 3, 760, 132
    rows = math.ceil(len(fams) / cols)
    sheet = Image.new('RGB', (cols * cw + 40, rows * rh + 40), (18, 18, 22))
    d = ImageDraw.Draw(sheet)
    small, _ = load_font('Oswald', 19, 500)
    for i, e in enumerate(fams):
        x, y = 20 + (i % cols) * cw, 20 + (i // cols) * rh
        f, _ = load_font(e['family'], 58, e.get('weight'))
        sample = 'Wyvern Slayer 99' if 'pixel' not in e['tags'] else 'WYVERN 99'
        b = f.getbbox(sample, anchor='ls')
        if b[2] - b[0] > cw - 30:
            f, _ = load_font(e['family'], 58 * (cw - 30) / (b[2] - b[0]), e.get('weight'))
        d.text((x, y + 70), sample, font=f, fill=(240, 236, 228), anchor='ls')
        d.text((x, y + 84), f'{e["family"]}  ·  ' + ', '.join(e['tags'][:5]), font=small, fill=(150, 150, 160))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    sheet.save(out, optimize=True)
    print(os.path.relpath(out, ROOT))


def list_fonts(tag=None):
    for e in font_table().values():
        if tag and tag not in e['tags']:
            continue
        print(f'{e["family"]:24} {", ".join(e["tags"]):70} {e["vibe"]}')


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('specs', nargs='*')
    ap.add_argument('--all', action='store_true')
    ap.add_argument('--samples', action='store_true')
    ap.add_argument('--sheet')
    ap.add_argument('--fetch-fonts', action='store_true')
    ap.add_argument('--fonts', nargs='?', const='')
    ap.add_argument('--specimen', action='store_true')
    ap.add_argument('--check', action='store_true')
    ap.add_argument('--debug', action='store_true')
    ap.add_argument('--out')
    a = ap.parse_args()
    if a.fetch_fonts:
        return fetch_all()
    if a.specimen:
        return specimen(os.path.join(TITLES, 'fonts.png'))
    if a.fonts is not None:
        return list_fonts(a.fonts or None)
    if a.sheet:
        return contact_sheet(a.specs, a.sheet)
    specs = list(a.specs)
    if a.all:
        specs += sorted(glob.glob(os.path.join(TITLES, 'story_*.json')))
    if a.samples:
        specs += sorted(glob.glob(os.path.join(TITLES, 'samples', '*.json')))
    if not specs:
        ap.error('no specs (pass paths, --all or --samples)')
    outs, bad = [], 0
    for s in specs:
        try:
            outs.append(render(s, write=not a.check, debug=a.debug, out=a.out if len(specs) == 1 else None))
        except SpecError as e:
            bad += 1
            msg = str(e)
            print(f'FAIL {msg if msg.startswith(os.path.relpath(s, ROOT)) else os.path.relpath(s, ROOT) + ": " + msg}', file=sys.stderr)
    if a.samples and not a.check and outs:
        contact_sheet(outs, os.path.join(TITLES, 'samples.png'))
    if bad:
        sys.exit(f'{bad} of {len(specs)} specs failed')


if __name__ == '__main__':
    main()
