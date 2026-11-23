"""Cover v4: the all-50 shelf sheet, every v4 final at once.

    python3 -I docs/stories-50/tools/cover-v4-all.py                       # cover-style-v3/all-50-v4.png
    python3 -I docs/stories-50/tools/cover-v4-all.py --final-dir <dir> --out <png>

Same layout as cover-v3-all.py: one tile per cover-style-v3/manifest/<storyId>.json, alphabetical by fixture
title (case-folded), 10 per row, each final (cover-style-v3/final-v4/<storyId>.png, the output of
cover-title-v4.py) at 210x318, about a shelf cover. Under it: the fixture title, then the fonts its title spec
(cover-style-v3/titles/<storyId>.json) sets, hero font first (the line with the biggest size or cap). A missing
final stops the run: the sheet is for checking the whole set.
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
TITLES = os.path.join(V3, 'titles')
COLS, PAD, GAP, TW, TH, LABEL = 10, 8, 8, 210, 318, 44
BG, INK, DIM = (17, 17, 17), (230, 230, 230), (150, 150, 150)


def title_tool():
    spec = importlib.util.spec_from_file_location('cover_title_v4', os.path.join(TOOLS, 'cover-title-v4.py'))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def spec_fonts(spec):
    """Fonts the title text uses, biggest line first (deco text and shapes count too, after the title)."""
    styles = spec.get('styles', {})

    def resolve(*dicts):
        out = {}
        for d in dicts:
            if not isinstance(d, dict):
                continue
            uses = d.get('use')
            for u in ([uses] if isinstance(uses, str) else uses or []):
                out.update(resolve(styles.get(u, {})))
            out.update({k: v for k, v in d.items() if k != 'use'})
        return out

    seen = {}
    order = 0

    def note(font, size, deco):
        nonlocal order
        if not font:
            return
        rank = (1 if deco else 0, -(size or 0))
        if font not in seen or rank < seen[font][0]:
            seen[font] = (rank, seen.get(font, (None, order))[1])
        order += 1

    def walk_shapes(shapes, base):
        for s in shapes or []:
            st = resolve(base, s)
            if s.get('text') or s.get('shape') == 'seal':
                note(st.get('font'), st.get('size') or st.get('cap'), True)

    for item in spec.get('layers', []):
        if item.get('type') == 'shape':
            walk_shapes([item], {})
        if item.get('type') != 'text':
            continue
        deco = item.get('role') == 'deco'
        block = resolve(item.get('style', {}))
        for line in item.get('lines', []):
            line = {'text': line} if isinstance(line, str) else line
            lst = resolve(block, line)
            size = lst.get('size') or (lst.get('cap', 0) * 1.4)
            if lst.get('width'):
                size = max(size or 0, lst['width'] / 4)
            if line.get('runs'):
                for r in line['runs']:
                    rst = resolve(lst, r)
                    note(rst.get('font'), rst.get('size') or size, deco)
            else:
                note(lst.get('font'), size, deco)
        walk_shapes(item.get('backing'), block)
        walk_shapes(item.get('ornaments'), block)
    return [f for f, _ in sorted(seen.items(), key=lambda kv: kv[1])]


def fit(d, text, font, width):
    if d.textlength(text, font=font) <= width:
        return text
    while text and d.textlength(text + '...', font=font) > width:
        text = text[:-1]
    return text.rstrip(' +') + '...'


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--final-dir', default=os.path.join(V3, 'final-v4'))
    ap.add_argument('--out', default=os.path.join(V3, 'all-50-v4.png'))
    args = ap.parse_args()
    T = title_tool()
    items = []
    for path in glob.glob(os.path.join(V3, 'manifest', '*.json')):
        with open(path, encoding='utf-8') as f:
            sid = json.load(f)['storyId']
        spec_path = os.path.join(TITLES, sid + '.json')
        fonts = []
        if os.path.exists(spec_path):
            with open(spec_path, encoding='utf-8') as f:
                fonts = spec_fonts(json.load(f))
        items.append((T.fixture_title(sid), sid, fonts))
    items.sort(key=lambda t: t[0].lower())
    missing = [sid for _, sid, _ in items if not os.path.exists(os.path.join(args.final_dir, sid + '.png'))]
    if missing:
        sys.exit(f'no final for {", ".join(missing)} in {args.final_dir}')
    rows = (len(items) + COLS - 1) // COLS
    sheet = Image.new('RGB', (PAD + COLS * (TW + GAP), PAD + rows * (TH + LABEL)), BG)
    d = ImageDraw.Draw(sheet)
    f, _ = T.load_font('Oswald', 14, 400)
    for i, (title, sid, fonts) in enumerate(items):
        x = PAD + (i % COLS) * (TW + GAP)
        y = PAD + (i // COLS) * (TH + LABEL)
        cover = Image.open(os.path.join(args.final_dir, sid + '.png')).convert('RGB')
        sheet.paste(cover.resize((TW, TH), Image.LANCZOS), (x, y))
        d.text((x, y + TH + 4), fit(d, title, f, TW), font=f, fill=INK)
        d.text((x, y + TH + 22), fit(d, ' + '.join(fonts) or '(no spec)', f, TW), font=f, fill=DIM)
    sheet.save(args.out)
    print(f'{os.path.relpath(args.out, ROOT)}: {len(items)} covers, {sheet.size[0]}x{sheet.size[1]}')


if __name__ == '__main__':
    main()
