"""Cover v3 sheets: the before/after test sheet, and the contact sheet of title samples.

    python3 -I docs/stories-50/tools/cover-v3-sheet.py                 # cover-style-v3/test-sheet.png
    python3 -I docs/stories-50/tools/cover-v3-sheet.py --ids story_a,story_b
    python3 -I docs/stories-50/tools/cover-v3-sheet.py --samples       # cover-style-v3/title-samples.png
    ... [--final-dir <dir>] [--out <png>]                                # read finals from / write the sheet elsewhere

Test sheet: one row per test story (every cover-style-v3/manifest/<storyId>.json, or --ids), the v2 cover
on the left (infra/seed/assets/<id>/cover.png, else cover.webp) and the v3 final on the right
(cover-style-v3/final/<storyId>.png, the --out of cover-title-v3.py), labelled with the story title and the
recipe name from the manifest. A missing image is drawn as an empty, labelled slot.

Samples: a 5x2 grid of cover-style-v3/title-samples/<recipe>.png (made by cover-title-v3.py --samples),
in recipes.json order, each labelled with the recipe name, model and title font.
"""
import argparse
import glob
import importlib.util
import json
import os
import sys

from PIL import Image, ImageDraw, ImageOps

sys.dont_write_bytecode = True  # the sibling tools are loaded by path; keep docs/ free of __pycache__

TOOLS = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(TOOLS, '../../..'))
V3 = os.path.join(ROOT, 'docs/stories-50/cover-style-v3')
ASSETS = os.path.join(ROOT, 'infra/seed/assets')
BG, INK, DIM = (18, 18, 20), (232, 232, 236), (150, 150, 158)


def title_tool():
    spec = importlib.util.spec_from_file_location('cover_title_v3', os.path.join(TOOLS, 'cover-title-v3.py'))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


T = title_tool()


def recipes():
    with open(os.path.join(V3, 'recipes.json'), encoding='utf-8') as f:
        return json.load(f)['recipes']


def thumb(path, size):
    if path and os.path.exists(path):
        return ImageOps.fit(Image.open(path).convert('RGB'), size, Image.LANCZOS)
    im = Image.new('RGB', size, (34, 34, 38))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 0, size[0] - 1, size[1] - 1], outline=(70, 70, 76), width=2)
    d.text((size[0] / 2, size[1] / 2), 'not drawn yet', font=T.load_font('Oswald', 20, 400), fill=DIM, anchor='mm')
    return im


def wrap(text, f, width):
    lines, line = [], ''
    for word in text.split():
        if line and f.getlength(f'{line} {word}') > width:
            lines.append(line)
            line = word
        else:
            line = f'{line} {word}'.strip()
    return lines + [line]


def v2_cover(story_id):
    for ext in ('png', 'webp'):
        p = os.path.join(ASSETS, story_id, f'cover.{ext}')
        if os.path.exists(p):
            return p
    return None


def test_sheet(ids, out, final_dir, cw=300):
    names = {r['id']: r['name'] for r in recipes()}
    ch = int(cw * T.H / T.W)
    pad, gap, head, label = 24, 16, 44, 64
    width = pad * 2 + 2 * cw + gap
    height = pad * 2 + head + len(ids) * (ch + label + gap)
    im = Image.new('RGB', (width, height), BG)
    d = ImageDraw.Draw(im)
    fh = T.load_font('Oswald', 24, 600)
    fl = T.load_font('Oswald', 18, 500)
    fs = T.load_font('Oswald', 15, 400)
    d.text((pad + cw / 2, pad + 14), 'v2 (today)', font=fh, fill=INK, anchor='mm')
    d.text((pad + cw + gap + cw / 2, pad + 14), 'v3 test', font=fh, fill=INK, anchor='mm')
    y = pad + head
    for sid in ids:
        manifest = {}
        mpath = os.path.join(V3, 'manifest', f'{sid}.json')
        if os.path.exists(mpath):
            with open(mpath, encoding='utf-8') as f:
                manifest = json.load(f)
        im.paste(thumb(v2_cover(sid), (cw, ch)), (pad, y))
        im.paste(thumb(os.path.join(final_dir, f'{sid}.png'), (cw, ch)), (pad + cw + gap, y))
        title = T.fixture_title(sid)
        recipe = names.get(manifest.get('recipe'), manifest.get('recipe', 'no manifest'))
        model = manifest.get('model', '')
        line = wrap(title, fl, width - 2 * pad)[0]
        d.text((pad, y + ch + 8), line, font=fl, fill=INK)
        d.text((pad, y + ch + 32), f'{recipe}  ·  {model}{":" + manifest["mode"] if manifest.get("mode") else ""}', font=fs, fill=DIM)
        y += ch + label + gap
    im.save(out)
    print(os.path.relpath(out, ROOT), im.size, len(ids), 'stories')


def samples_sheet(out, cw=300, per_row=5):
    rs = recipes()
    ch = int(cw * T.H / T.W)
    pad, gap, label = 24, 16, 58
    rows = (len(rs) + per_row - 1) // per_row
    width = pad * 2 + per_row * cw + (per_row - 1) * gap
    height = pad * 2 + rows * (ch + label) + (rows - 1) * gap
    im = Image.new('RGB', (width, height), BG)
    d = ImageDraw.Draw(im)
    fl = T.load_font('Oswald', 19, 600)
    fs = T.load_font('Oswald', 14, 400)
    for i, r in enumerate(rs):
        x = pad + (i % per_row) * (cw + gap)
        y = pad + (i // per_row) * (ch + label + gap)
        im.paste(thumb(os.path.join(V3, 'title-samples', f'{r["id"]}.png'), (cw, ch)), (x, y))
        t = r['title']
        font = t.get('font')
        if t.get('kicker') and t['kicker'].get('font') not in (None, font):
            font = f'{t["kicker"]["font"]} + {font}'
        note = f'{r["model"]["model"]}{":" + r["model"]["mode"] if r["model"].get("mode") else ""} · {font}'
        if t.get('mode') == 'painted':
            note += ' · painted (fallback shown)'
        d.text((x, y + ch + 6), f'{i + 1}. {r["name"]}', font=fl, fill=INK)
        d.text((x, y + ch + 32), note, font=fs, fill=DIM)
    im.save(out)
    print(os.path.relpath(out, ROOT), im.size, len(rs), 'recipes')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--ids', help='comma-separated storyIds (default: every manifest)')
    ap.add_argument('--samples', action='store_true', help='write title-samples.png instead')
    ap.add_argument('--final-dir', default=os.path.join(V3, 'final'), help='where the v3 finals are')
    ap.add_argument('--out', help='the sheet to write (default: in cover-style-v3)')
    args = ap.parse_args()
    if args.samples:
        samples_sheet(args.out or os.path.join(V3, 'title-samples.png'))
        return
    if args.ids:
        ids = [s.strip() for s in args.ids.split(',') if s.strip()]
    else:
        ids = sorted(os.path.basename(p)[:-5] for p in glob.glob(os.path.join(V3, 'manifest', 'story_*.json')))
    if not ids:
        sys.exit('no test stories: no cover-style-v3/manifest/*.json and no --ids')
    test_sheet(ids, args.out or os.path.join(V3, 'test-sheet.png'), args.final_dir)


if __name__ == '__main__':
    main()
