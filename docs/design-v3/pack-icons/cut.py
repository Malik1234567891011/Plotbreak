import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
src, out, T = sys.argv[1], sys.argv[2], int(sys.argv[3])
a = np.asarray(Image.open(src).convert('RGB')).astype(np.int16)
mx = a.max(2)
dark = mx < T
lab, n = ndimage.label(dark)
border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
bg = np.isin(lab, list(border))
# soft edge: pixels near bg get alpha by brightness ramp
near = ndimage.binary_dilation(bg, iterations=2) & ~bg
alpha = np.where(bg, 0, 255).astype(np.float32)
ramp = np.clip((mx - T * 0.4) / (T * 1.6) * 255, 0, 255)
alpha[near] = np.minimum(alpha[near], ramp[near])
al = Image.fromarray(alpha.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
im = Image.fromarray(a.astype(np.uint8)).convert('RGBA'); im.putalpha(al)
bb = im.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox(); im = im.crop(bb)
im.save(out); print(out, im.size)
