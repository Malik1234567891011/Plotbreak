import json, subprocess, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont
REPO = '/Users/omarlahmimi/Documents/Plotbreak'
D = REPO + '/docs/design-v3/tabbar-icons'
S = os.path.dirname(os.path.abspath(__file__))
BACK = REPO + '/docs/design-v3/gaps-shots/final-home-continue.png'
PAPER, PAPER3 = '#F3EFE8', '#948E85'
TABS = ['discover', 'library', 'create', 'profile']
LABELS = {'discover': 'Discover', 'library': 'Library', 'create': 'Create', 'profile': 'Profile'}
# measured on the 3x screenshot: capsule x 60..1145, y 2316..2507, 1pt hairline
CX0, CX1, CY0, CY1 = 60, 1146, 2316, 2508
TABW = (CX1 - CX0) / 4
centers = [CX0 + TABW * (i + .5) for i in range(4)]
ICON_CY = 2387          # centre of the 24pt icon frame (labelled bar)
LABEL_TOP = 2432        # label png top so the baseline lands on 2464, as today

def gblur(a, sigma):
    r = int(sigma * 3); x = np.arange(-r, r + 1); k = np.exp(-x**2 / (2 * sigma**2)); k /= k.sum()
    pad = np.pad(a, ((r, r), (r, r)) + ((0, 0),) * (a.ndim - 2), mode='edge')
    out = np.apply_along_axis(lambda v: np.convolve(v, k, 'valid'), 0, pad)
    return np.apply_along_axis(lambda v: np.convolve(v, k, 'valid'), 1, out)

def clean_backdrop():
    """The screenshot with today's icons and labels lifted off the glass capsule."""
    cache = S + '/backdrop-clean.png'
    if os.path.exists(cache): return Image.open(cache).convert('RGB')
    im = Image.open(BACK).convert('RGB'); a = np.asarray(im).astype(float)
    y0, y1, x0, x1 = CY0 - 4, CY1 + 4, CX0 - 4, CX1 + 4
    reg = a[y0:y1, x0:x1].copy()
    # interior of the capsule (shrunk 5px so the hairline is untouched)
    m = Image.new('L', (x1 - x0, y1 - y0), 0)
    ImageDraw.Draw(m).rounded_rectangle([4 + 5, 4 + 5, (CX1 - CX0) + 4 - 6, (CY1 - CY0) + 4 - 6], radius=96 - 5, fill=255)
    inner = np.asarray(m) > 0
    lum = reg.mean(axis=2)
    rowmed = np.array([np.median(lum[r][inner[r]]) if inner[r].any() else 0 for r in range(lum.shape[0])])
    fg = (lum > rowmed[:, None] + 3.5) & inner
    fgi = Image.fromarray((fg * 255).astype(np.uint8)).filter(__import__('PIL.ImageFilter').ImageFilter.MaxFilter(19))
    fg = np.asarray(fgi) > 0
    keep = (inner & ~fg).astype(float)
    num = gblur(reg * keep[:, :, None], 14); den = gblur(keep, 14)[:, :, None]
    num2 = gblur(reg * keep[:, :, None], 45); den2 = gblur(keep, 45)[:, :, None]
    w = np.clip(den / 0.25, 0, 1)
    fill = w * (num / np.maximum(den, 1e-6)) + (1 - w) * (num2 / np.maximum(den2, 1e-6))
    out = reg.copy(); sel = inner & fg
    out[sel] = fill[sel]
    a[y0:y1, x0:x1] = out
    res = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)); res.save(cache); return res

def render_svgs(jobs):
    json.dump(jobs, open(S + '/compose-jobs.json', 'w'))
    subprocess.run(['node', S + '/raster.js', S + '/compose-jobs.json'], check=True, stdout=subprocess.DEVNULL)

def icon_png(set_, tab, sel, size_pt):
    """RGBA icon centred on its canvas, 3x."""
    if set_ == 'A':
        return Image.open(f'{S}/r/A-{tab}-{"s" if sel else "u"}.png').convert('RGBA')
    name = f'{tab}{"-selected" if sel else ""}'
    out = f'{S}/r/{set_}-{name}-{size_pt}.png'
    return out

def build_bar(base, set_, selected):
    im = base.copy()
    labels = set_ in ('A', 'B')
    size_pt = 24          # B and C are both drawn one unit to the point; C's glyphs fill more of the frame
    cy = ICON_CY if labels else (CY0 + CY1) / 2
    jobs = []
    if set_ != 'A':
        for t in TABS:
            for sel in (False, True):
                name = f'{t}{"-selected" if sel else ""}'
                jobs.append(dict(svg=f'{D}/{set_}/{name}.svg', color=PAPER if sel else PAPER3,
                                 scale=3 * size_pt / 24, out=f'{S}/r/{set_}-{name}-{size_pt}.png'))
        render_svgs(jobs)
    for i, t in enumerate(TABS):
        sel = t == selected
        ic = icon_png(set_, t, sel, size_pt)
        if isinstance(ic, str): ic = Image.open(ic).convert('RGBA')
        im.paste(ic, (round(centers[i] - ic.width / 2), round(cy - ic.height / 2)), ic)
        if labels:
            lb = Image.open(f'{S}/r/L-{LABELS[t]}-{"s" if sel else "u"}.png').convert('RGBA')
            im.paste(lb, (round(centers[i] - lb.width / 2), LABEL_TOP), lb)
    return im

if __name__ == '__main__':
    base = clean_backdrop()
    base.crop((0, 2200, 1206, 2622)).save(S + '/clean-check.png')
    print('backdrop ok')
