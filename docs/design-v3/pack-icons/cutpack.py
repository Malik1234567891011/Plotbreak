# usage: python3 cutpack.py in.png out.png  -> 512x512 transparent cutout, specks removed
import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
a = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(np.int16); mx = a.max(2); T = 22
lab, n = ndimage.label(mx < T)
border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bg = np.isin(lab, list(border))
alpha = np.where(bg, 0, 255).astype(np.float32)
near = ndimage.binary_dilation(bg, iterations=2) & ~bg
ramp = np.clip((mx - T * 0.4) / (T * 1.6) * 255, 0, 255); alpha[near] = np.minimum(alpha[near], ramp[near])
fg = alpha > 90; fl, fn = ndimage.label(fg); sizes = ndimage.sum(fg, fl, range(1, fn + 1))
keep = np.isin(fl, [i + 1 for i, s in enumerate(sizes) if s >= 600])
keep = ndimage.binary_dilation(keep, iterations=3); alpha = np.where(keep, alpha, 0)
im = Image.fromarray(a.astype(np.uint8)).convert('RGBA'); im.putalpha(Image.fromarray(alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7)))
bb = im.getchannel('A').point(lambda v: 255 if v > 10 else 0).getbbox(); im = im.crop(bb)
side = int(max(im.size) * 1.08); can = Image.new('RGBA', (side, side), (0, 0, 0, 0))
can.alpha_composite(im, ((side - im.width) // 2, side - im.height - int(side * 0.04)))
can.resize((512, 512), Image.LANCZOS).save(sys.argv[2]); print(sys.argv[2], bb)
