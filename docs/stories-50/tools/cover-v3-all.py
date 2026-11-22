"""Cover v3: the all-50 shelf sheet, every final at once.

    python3 -I docs/stories-50/tools/cover-v3-all.py                       # cover-style-v3/all-50.png
    python3 -I docs/stories-50/tools/cover-v3-all.py --final-dir <dir> --out <png>

One tile per cover-style-v3/manifest/<storyId>.json, alphabetical by fixture title (case-folded), 10 per row.
Each tile is the final (cover-style-v3/final/<storyId>.png, the --out of cover-title-v3.py) at 210x318, about a
shelf cover, with the fixture title and the manifest's recipe id under it in Oswald. A missing final stops the
run: the sheet is for checking the whole set.
"""
import argparse
import glob
import importlib.util
import json
import os
import sys

from PIL import Image, ImageDraw

sys.dont_write_bytecode = True  # the sibling tools are loaded by path; keep docs/ free of __pycache__

TOOLS = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(TOOLS, '../../..'))
V3 = os.path.join(ROOT, 'docs/stories-50/cover-style-v3')
COLS, PAD, GAP, TW, TH, LABEL = 10, 8, 8, 210, 318, 44
BG, INK, DIM = (17, 17, 17), (230, 230, 230), (150, 150, 150)


def title_tool():
    spec = importlib.util.spec_from_file_location('cover_title_v3', os.path.join(TOOLS, 'cover-title-v3.py'))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--final-dir', default=os.path.join(V3, 'final'))
    ap.add_argument('--out', default=os.path.join(V3, 'all-50.png'))
    args = ap.parse_args()
    T = title_tool()
    items = []
    for path in glob.glob(os.path.join(V3, 'manifest', '*.json')):
        with open(path, encoding='utf-8') as f:
            m = json.load(f)
        items.append((T.fixture_title(m['storyId']), m['storyId'], m['recipe']))
    items.sort(key=lambda t: t[0].lower())
    missing = [sid for _, sid, _ in items if not os.path.exists(os.path.join(args.final_dir, sid + '.png'))]
    if missing:
        sys.exit(f'no final for {", ".join(missing)} in {args.final_dir}')
    rows = (len(items) + COLS - 1) // COLS
    sheet = Image.new('RGB', (PAD + COLS * (TW + GAP), PAD + rows * (TH + LABEL)), BG)
    d = ImageDraw.Draw(sheet)
    f = T.load_font('Oswald', 14, 400)
    for i, (title, sid, recipe) in enumerate(items):
        x = PAD + (i % COLS) * (TW + GAP)
        y = PAD + (i // COLS) * (TH + LABEL)
        cover = Image.open(os.path.join(args.final_dir, sid + '.png')).convert('RGB')
        sheet.paste(cover.resize((TW, TH), Image.LANCZOS), (x, y))
        d.text((x, y + TH + 4), title, font=f, fill=INK)
        d.text((x, y + TH + 22), recipe, font=f, fill=DIM)
    sheet.save(args.out)
    print(f'{os.path.relpath(args.out, ROOT)}: {len(items)} covers, {sheet.size[0]}x{sheet.size[1]}')


if __name__ == '__main__':
    main()
