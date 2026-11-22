import random
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw
import numpy as np
C = Image.open('crystal.png')
def sprite(h, ang, br):
    w = int(C.width * h / C.height); s = C.resize((w, h), Image.LANCZOS)
    if br != 1:
        rgb = ImageEnhance.Brightness(s.convert('RGB')).enhance(br).convert('RGBA'); rgb.putalpha(s.getchannel('A')); s = rgb
    return s.rotate(ang, resample=Image.BICUBIC, expand=True)
def mound(rows, seed):
    R = random.Random(seed); spec = []
    for (yb, n, h, width, tilt, br, lying) in rows:
        xs = np.linspace(.5 - width / 2, .5 + width / 2, n) if n > 1 else [.5]
        for i, x in enumerate(xs):
            x += R.uniform(-.015, .015)
            if lying: ang = (1 if x < .5 else -1) * R.uniform(58, 80) if abs(x - .5) > .04 else R.choice([-1, 1]) * R.uniform(62, 78)
            else: ang = (.5 - x) * tilt + R.uniform(-7, 7)
            spec.append((x, yb + R.uniform(-.012, .012), h * R.uniform(.92, 1.04), ang, br))
    return spec
def compose(spec, N=1024):
    can = Image.new('RGBA', (N, N), (0, 0, 0, 0))
    sh = Image.new('L', (N, N), 0); d = ImageDraw.Draw(sh)
    xs = [p[0] for p in spec]; w = (max(xs) - min(xs)) * N + 160; cy = max(p[1] for p in spec) * N
    d.ellipse([N / 2 - w / 2, cy - 26, N / 2 + w / 2, cy + 22], fill=120)
    sh = sh.filter(ImageFilter.GaussianBlur(24)); blk = Image.new('RGBA', (N, N), (0, 0, 0, 255)); blk.putalpha(sh)
    can = Image.alpha_composite(can, blk)
    for (x, yb, h, ang, br) in sorted(spec, key=lambda p: p[1]):
        s = sprite(int(h * N), ang, br); can.alpha_composite(s, (int(x * N - s.width / 2), int(yb * N - s.height)))
    return can
T = {
 'pack-1000':   [(.50, .90, .80, 0, 1)],
 'pack-2000':   [(.40, .85, .70, 9, .9), (.64, .91, .54, -16, 1)],
 'pack-10000':  mound([(.74, 1, .56, 0, 0, .86, 0), (.86, 2, .46, .40, 70, .93, 0), (.95, 1, .40, 0, 0, 1, 1)], 3),
 'pack-20000':  mound([(.70, 2, .48, .20, 60, .84, 0), (.82, 3, .44, .50, 80, .9, 0), (.95, 2, .38, .34, 0, 1, 1)], 5),
 'pack-50000':  mound([(.62, 2, .42, .18, 40, .78, 0), (.73, 3, .40, .44, 70, .84, 0), (.84, 4, .37, .64, 90, .9, 0), (.95, 3, .33, .50, 0, 1, 1)], 7),
 'pack-100000': mound([(.54, 1, .40, 0, 0, .72, 0), (.63, 3, .38, .36, 50, .76, 0), (.74, 4, .36, .58, 70, .83, 0), (.85, 5, .33, .76, 90, .9, 0), (.95, 4, .30, .62, 0, 1, 1)], 11),
}
T['first-purchase'] = T['pack-2000']
for k, spec in T.items(): compose(spec).resize((512, 512), Image.LANCZOS).save(f'{k}.png')
keys = ['pack-1000', 'pack-2000', 'pack-10000', 'pack-20000', 'pack-50000', 'pack-100000']
pv = Image.new('RGB', (6 * 210 + 10, 420), (34, 32, 29))
for i, k in enumerate(keys):
    im = Image.open(f'{k}.png')
    r = im.resize((200, 200), Image.LANCZOS); pv.paste(r, (10 + i * 210, 10), r)
    s = [62, 66, 74, 82, 88, 92][i] * 2; r = im.resize((s, s), Image.LANCZOS); pv.paste(r, (10 + i * 210 + (200 - s) // 2, 220 + (200 - s)), r)
pv.save('piles_check.jpg', quality=90)
