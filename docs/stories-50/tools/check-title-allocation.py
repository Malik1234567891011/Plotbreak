"""Check cover-style-v3/titles/ALLOCATION.md against the v4 title rules.

    python3 -I docs/stories-50/tools/check-title-allocation.py

Reads the allocation table (one row per story, shelf order = sorted by title), the fixtures, the v3 manifests
(for each cover's recipe, i.e. its art style) and titles/fonts.json, then checks:

  ids        50 rows, one per manifest, no duplicates
  titles     the Title column is the fixture title, character for character
  order      rows are in shelf order (title, case-insensitive) and numbered 1..50
  fonts      every family is in fonts.json; the 50 primaries are 50 different families
  per-font   no family on more than 3 covers (primary or accent)
  recipe     no family on two covers that share a v3 recipe (the same art style)
  neighbours shelf neighbours share no family at all, and never the same placement
  placement  codes are known, none used more than 8 times
  faces      every title zone stays inside the canvas and clear of every face box
  upright    no vertical or sideways title: the brief never asks for one, and no tilt is over 12 deg
  treatment  every treatment key is used once
Exits 1 on any failure.
"""
import collections
import glob
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
V3 = os.path.join(HERE, '..', 'cover-style-v3')
ALLOC = os.path.join(V3, 'titles', 'ALLOCATION.md')
FONTS = os.path.join(V3, 'titles', 'fonts.json')
MANIFEST = os.path.join(V3, 'manifest')
FIXTURES = os.path.join(HERE, '..', '..', '..', 'packages', 'test-fixtures', 'src')

PLACEMENTS = {
    'TB': 'top band', 'BT': 'bottom third, centred', 'UL': 'upper-left block', 'UR': 'upper-right block',
    'LL': 'lower-left block', 'LR': 'lower-right block', 'DG': 'slight diagonal (6-12 deg)',
    'CG': 'centre over a gap', 'CW': 'corner logo + giant word', 'WR': 'wrapped around the figure',
}
MAX_PER_PLACEMENT = 8
MAX_COVERS_PER_FONT = 3
MAX_TILT = 12
COLUMNS = ['#', 'storyId', 'Title', 'Recipe', 'Genre / tone', 'Primary', 'Accent', 'Place', 'Treatment',
           'Zone', 'Face', 'Brief']


def rows():
    out, header = [], None
    for line in open(ALLOC, encoding='utf-8'):
        if not line.startswith('|'):
            continue
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        if header is None:
            header = cells
            if header != COLUMNS:
                sys.exit(f'ALLOCATION.md header is {header}, expected {COLUMNS}')
            continue
        if set(cells[0]) <= set('-: '):
            continue
        if len(cells) != len(COLUMNS):
            sys.exit(f'row has {len(cells)} cells, expected {len(COLUMNS)}: {line[:80]}')
        out.append(dict(zip(COLUMNS, cells)))
    return out


def fixture_titles():
    titles = {}
    for path in glob.glob(os.path.join(FIXTURES, '*.ts')):
        if path.endswith('.spec.ts'):
            continue
        src = open(path, encoding='utf-8').read()
        for m in re.finditer(r"\n  storyId: '(story_[a-z0-9_]+)',", src):
            t = re.search(r"\n  title: (['\"])(.*?)\1,\n", src[m.end():])
            if t:
                titles[m.group(1)] = t.group(2).replace("\\'", "'")
    return titles


def boxes(spec):
    out = []
    for part in spec.split(';'):
        xs, ys = part.strip().split(',')
        x0, x1 = (float(v) for v in xs.split('-'))
        y0, y1 = (float(v) for v in ys.split('-'))
        out.append((x0, y0, x1, y1))
    return out


def families(row):
    fams = [row['Primary']]
    if row['Accent'].lower() != 'none':
        fams += [re.sub(r'\(.*?\)', '', a).strip() for a in row['Accent'].split('+')]
    return fams


def main():
    R = rows()
    fails = []

    def check(ok, msg):
        if not ok:
            fails.append(msg)

    # ids
    ids = [r['storyId'] for r in R]
    manifest = sorted(os.path.basename(p)[:-5] for p in glob.glob(os.path.join(MANIFEST, 'story_*.json')))
    check(len(R) == 50, f'ids: {len(R)} rows, expected 50')
    check(len(set(ids)) == len(ids), 'ids: duplicate storyId')
    check(sorted(ids) == manifest, f'ids: rows do not match the manifests: '
          f'missing {sorted(set(manifest) - set(ids))}, extra {sorted(set(ids) - set(manifest))}')

    # titles
    fx = fixture_titles()
    for r in R:
        check(fx.get(r['storyId']) == r['Title'], f"titles: {r['storyId']} is {r['Title']!r}, fixture says {fx.get(r['storyId'])!r}")

    # order
    want = sorted(R, key=lambda r: r['Title'].lower())
    check([r['storyId'] for r in want] == ids, 'order: rows are not in shelf order (sorted by title)')
    check([r['#'] for r in R] == [str(i) for i in range(1, len(R) + 1)], 'order: # is not 1..50')

    # recipes
    recipe = {sid: json.load(open(os.path.join(MANIFEST, sid + '.json')))['recipe'] for sid in manifest}
    for r in R:
        check(recipe.get(r['storyId']) == r['Recipe'], f"recipe: {r['storyId']} says {r['Recipe']}, manifest says {recipe.get(r['storyId'])}")

    # fonts
    library = {f['family'] for f in json.load(open(FONTS))['fonts']}
    prim = [r['Primary'] for r in R]
    dup = [f for f, n in collections.Counter(prim).items() if n > 1]
    check(not dup, f'fonts: primary used twice: {dup}')
    for r in R:
        for f in families(r):
            check(f in library, f"fonts: {r['storyId']}: {f!r} is not in fonts.json")
    use = collections.defaultdict(list)
    for i, r in enumerate(R, 1):
        for f in set(families(r)):
            use[f].append(i)
    for f, where in use.items():
        check(len(where) <= MAX_COVERS_PER_FONT, f'per-font: {f} is on {len(where)} covers {where}')
    by_recipe = collections.defaultdict(list)
    for i, r in enumerate(R, 1):
        by_recipe[r['Recipe']].append(i)
    for rec, members in by_recipe.items():
        c = collections.Counter(f for i in members for f in set(families(R[i - 1])))
        for f, n in c.items():
            check(n == 1, f'recipe: {f} appears on {n} {rec} covers')

    # neighbours + placement
    counts = collections.Counter(r['Place'] for r in R)
    for r in R:
        check(r['Place'] in PLACEMENTS, f"placement: {r['storyId']} has unknown code {r['Place']!r}")
    for code, n in counts.items():
        check(n <= MAX_PER_PLACEMENT, f'placement: {code} used {n} times (max {MAX_PER_PLACEMENT})')
    for a, b in zip(R, R[1:]):
        shared = set(families(a)) & set(families(b))
        check(not shared, f"neighbours: #{a['#']} and #{b['#']} share {sorted(shared)}")
        check(a['Place'] != b['Place'], f"neighbours: #{a['#']} and #{b['#']} are both {a['Place']}")

    # faces
    for r in R:
        zs, fs = boxes(r['Zone']), boxes(r['Face'])
        for z in zs:
            check(0 <= z[0] < z[2] <= 1 and 0 <= z[1] < z[3] <= 1, f"faces: {r['storyId']} zone {z} leaves the canvas")
            for f in fs:
                hit = z[0] < f[2] and f[0] < z[2] and z[1] < f[3] and f[1] < z[3]
                check(not hit, f"faces: {r['storyId']} zone {z} overlaps face {f}")

    # upright
    for r in R:
        b = r['Brief'].lower()
        for word in ('vertical', 'sideways', 'rotate 90', 'rotated 90', 'top to bottom', 'stacked letters'):
            check(word not in b, f"upright: {r['storyId']} brief mentions {word!r}")
        for deg in re.findall(r'([+-]?\d+(?:\.\d+)?) ?deg', r['Brief']):
            check(abs(float(deg)) <= MAX_TILT, f"upright: {r['storyId']} tilts {deg} deg (max {MAX_TILT})")

    # treatment
    tdup = [t for t, n in collections.Counter(r['Treatment'] for r in R).items() if n > 1]
    check(not tdup, f'treatment: used twice: {tdup}')

    print(f'{len(R)} stories, {len(set(prim))} distinct primary families, '
          f'{len(use)} families in use of {len(library)} in the library')
    print('placements: ' + ', '.join(f'{c} {counts[c]}' for c in PLACEMENTS))
    busiest = sorted(use.items(), key=lambda kv: -len(kv[1]))[:6]
    print('busiest families: ' + ', '.join(f'{f} {len(w)}' for f, w in busiest))
    print('unused as primary: ' + ', '.join(sorted(library - set(prim))))
    if fails:
        print(f'FAIL ({len(fails)})')
        for f in fails:
            print('  ' + f)
        sys.exit(1)
    print('PASS: ids, titles, order, fonts, per-font <= 3, recipe, neighbours, placement <= 8, faces, upright, treatment')


if __name__ == '__main__':
    main()
