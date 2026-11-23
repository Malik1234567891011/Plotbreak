"""Writes the B and C icon SVGs. Every unit is one point: render at 24pt and an edge on a whole unit
lands on a whole pixel at 2x and 3x.

Both sets follow the shape rule in DESIGN-SYSTEM.md ("square is the story, round is you"): the story
objects (page, covers, book) have tight print corners, and Profile, the only icon that is the player,
is a circle.
"""
import math, os
OUT = '/Users/omarlahmimi/Documents/Plotbreak/docs/design-v3/tabbar-icons'
def f(v):
    s = ('%.3f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s
def pt(p): return f(p[0]) + ' ' + f(p[1])

LINE = 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"'
def svg(body, title=''):
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n'
            + (f'  <title>{title}</title>\n' if title else '') + body + '</svg>\n')
def write(path, s):
    with open(os.path.join(OUT, path), 'w') as fh: fh.write(s)
def rot(p, ang, c=(0, 0)):
    a = math.radians(ang); x, y = p[0] - c[0], p[1] - c[1]
    return (c[0] + x*math.cos(a) - y*math.sin(a), c[1] + x*math.sin(a) + y*math.cos(a))
def rrect(x, y, w, h, r):
    return (f'M{f(x+r)} {f(y)}H{f(x+w-r)}A{f(r)} {f(r)} 0 0 1 {f(x+w)} {f(y+r)}V{f(y+h-r)}A{f(r)} {f(r)} 0 0 1 {f(x+w-r)} {f(y+h)}'
            f'H{f(x+r)}A{f(r)} {f(r)} 0 0 1 {f(x)} {f(y+h-r)}V{f(y+r)}A{f(r)} {f(r)} 0 0 1 {f(x+r)} {f(y)}Z')

# ---------------------------------------------------------------- B: story line set
# B1 Discover: a manga page. Three tiers cut on opposing slants, the last one split.
# The page is the 16x20 portrait keyline with print corners (outer radius 1.875): at rx 2 on a
# 14pt-wide page it had phone corners and read as a phone.
g1 = ((2, 7), (22, 10.6))        # gutters, run past the page edge so the mask cuts clean through
g2 = ((2, 16.3), (22, 12.7))
def yat(g, x): return g[0][1] + (x - g[0][0]) * (g[1][1] - g[0][1]) / (g[1][0] - g[0][0])
sp = ((12.75, yat(g2, 12.75)), (11.7, 21.125))
B1u = svg(f'''  <g {LINE}>
    <rect x="4.875" y="2.875" width="14.25" height="18.25" rx="1"/>
    <path d="M4.875 {f(yat(g1, 4.875))}L19.125 {f(yat(g1, 19.125))}M4.875 {f(yat(g2, 4.875))}L19.125 {f(yat(g2, 19.125))}M{pt(sp[0])}L{pt(sp[1])}"/>
  </g>
''', title='Discover')
B1s = svg(f'''  <defs>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <path d="M{pt(g1[0])}L{pt(g1[1])}M{pt(g2[0])}L{pt(g2[1])}M{pt(sp[0])}L11.5 22.75" stroke="#000" stroke-width="1.75"/>
    </mask>
  </defs>
  <rect mask="url(#cut)" x="4" y="2" width="16" height="20" rx="1.875" fill="currentColor"/>
''', title='Discover')

# B2 Library: an open book, a ribbon marking your place.
pages = ('M12 6.9C10.35 5.55 7.85 4.95 4.3 5Q3.25 5.02 3.25 6.05V17.25Q3.25 18.2 4.3 18.15C7.85 18 10.35 18.55 12 19.9'
         'M12 6.9C13.65 5.55 16.15 4.95 19.7 5Q20.75 5.02 20.75 6.05V17.25Q20.75 18.2 19.7 18.15C16.15 18 13.65 18.55 12 19.9')
ribbon = 'M15.35 5.6L18.05 5.25V11.4L16.7 10.15L15.35 11.4Z'
B2u = svg(f'''  <g {LINE}>
    <path d="{pages}M12 6.9V19.9"/>
  </g>
  <path d="{ribbon}" fill="currentColor" stroke="currentColor" stroke-width="0.75" stroke-linejoin="round"/>
''', title='Library')
pages_closed = ('M12 6.9C10.35 5.55 7.85 4.95 4.3 5Q3.25 5.02 3.25 6.05V17.25Q3.25 18.2 4.3 18.15C7.85 18 10.35 18.55 12 19.9Z'
                'M12 6.9C13.65 5.55 16.15 4.95 19.7 5Q20.75 5.02 20.75 6.05V17.25Q20.75 18.2 19.7 18.15C16.15 18 13.65 18.55 12 19.9Z')
B2s = svg(f'''  <defs>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <path d="M12 4V21" stroke="#000" stroke-width="1.5"/>
      <path d="M15.1 3.5L18.3 3.1V11.9L16.7 10.45L15.1 11.9Z" fill="#000" stroke="#000" stroke-width="0.6" stroke-linejoin="round"/>
    </mask>
  </defs>
  <path mask="url(#cut)" d="{pages_closed}" fill="currentColor" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
''', title='Library')

# B3 Create: a fountain-pen nib writing a line. Replaces the quill: the feather was a stock
# "feather" glyph, carried two thirds of its neighbours' ink, sat 1.25pt right of centre, and its
# selected state barely changed.
def nib(cx, cy, s, ang=45):
    """Upright nib (tip down) in local units, scaled by s, turned so the tip points down-left."""
    T = lambda p: (lambda q: (cx + q[0], cy + q[1]))(rot((p[0]*s, p[1]*s), ang))
    tw, top, sh, tip = 3.1, -9, (5.2, -3.2), 9.6
    a, b = T((-tw, top)), T((tw, top))
    d = (f'M{pt(a)}L{pt(b)}L{pt(T(sh))}C{pt(T((sh[0], sh[1] + 5)))} {pt(T((sh[0]/2, tip - 3.6)))} {pt(T((0, tip)))}'
         f'C{pt(T((-sh[0]/2, tip - 3.6)))} {pt(T((-sh[0], sh[1] + 5)))} {pt(T((-sh[0], sh[1])))}Z')
    return d, T
nibd, NT = nib(11.4, 11, 0.95)
hole = NT((0, -0.4)); tipB = NT((0, 9.6))
writeln = f'M{f(tipB[0] + 3.9)} 21.125H19.75'
B3u = svg(f'''  <g {LINE}>
    <path d="{nibd}"/>
    <circle cx="{f(hole[0])}" cy="{f(hole[1])}" r="1.575"/>
    <path d="M{pt(NT((0, 1.6)))}L{pt(NT((0, 6.6)))}{writeln}"/>
  </g>
''', title='Create')
B3s = svg(f'''  <defs>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <circle cx="{f(hole[0])}" cy="{f(hole[1])}" r="1.5" fill="#000"/>
      <path d="M{pt(hole)}L{pt(NT((0, 12)))}" stroke="#000" stroke-width="1.3"/>
    </mask>
  </defs>
  <path mask="url(#cut)" d="{nibd}" fill="currentColor" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
  <path d="{writeln}" {LINE}/>
''', title='Create')

# B4 Profile: you, in your circle. The face card was the character square, which the shape rule
# keeps for characters; the player is the only round thing in the app.
B4u = svg(f'''  <g {LINE}>
    <circle cx="12" cy="12" r="9.125"/>
    <circle cx="12" cy="9.9" r="3.05"/>
    <path d="M6.35 18.85C7.45 16.45 9.5 15.25 12 15.25C14.5 15.25 16.55 16.45 17.65 18.85"/>
  </g>
''', title='Profile')
B4s = svg('''  <defs>
    <clipPath id="inner"><circle cx="12" cy="12" r="8.4"/></clipPath>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <circle cx="12" cy="9.9" r="2.75" fill="#000"/>
      <path clip-path="url(#inner)" d="M5 22V19.6C6.2 17.2 8.9 16.05 12 16.05C15.1 16.05 17.8 17.2 19 19.6V22Z" fill="#000"/>
    </mask>
  </defs>
  <circle mask="url(#cut)" cx="12" cy="12" r="10" fill="currentColor"/>
''', title='Profile')

for name, (u_, s_) in {'discover': (B1u, B1s), 'library': (B2u, B2s), 'create': (B3u, B3s), 'profile': (B4u, B4s)}.items():
    write(f'B/{name}.svg', u_); write(f'B/{name}-selected.svg', s_)

# ---------------------------------------------------------------- C: bold glyph set
# Solid, no labels, so each silhouette has to be told apart from the other three by shape alone:
# a portrait pair, a landscape book, a diagonal nib, a disc. Selected is paper, idle paper.3, and
# nothing else (OOC's rule; the emphasis marks read as the banned sparkle).

# C1 Discover: two 2:3 covers, the one behind tilted out. Three fanned from a pivot read as a hand
# of playing cards.
cw, ch, cr = 11, 17, 1.5
cx0, cy0 = 9, 4                          # front cover, upright, edges on whole points
front = rrect(cx0, cy0, cw, ch, cr)
C1 = f'''  <defs>
    <mask id="gap" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <path d="{front}" fill="#000" stroke="#000" stroke-width="3" stroke-linejoin="round"/>
    </mask>
    <clipPath id="left"><rect width="{f(cx0)}" height="24"/></clipPath>
  </defs>
  <g fill="currentColor">
    <g mask="url(#gap)" clip-path="url(#left)"><path d="{front}" transform="translate(-3.2 0) rotate(-13 {f(cx0)} {f(cy0 + ch)})"/></g>
    <path d="{front}"/>
  </g>
'''
# C2 Library: an open book, its ribbon down the gutter and out of the spine. The closed book was a second
# upright slab next to the covers, and without labels the two were the same shape.
C2 = f'''  <defs>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <path d="M12 3V21" stroke="#000" stroke-width="1.5"/>
      <path d="M10.75 12H13.25V23.25L12 22L10.75 23.25Z" fill="#000" stroke="#000" stroke-width="2.4" stroke-linejoin="round"/>
    </mask>
  </defs>
  <g transform="translate(0 -1.25)">
    <path mask="url(#cut)" d="{pages_closed}" fill="currentColor" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
    <path d="M10.75 12H13.25V23.25L12 22L10.75 23.25Z" fill="currentColor" stroke="currentColor" stroke-width="0.6" stroke-linejoin="round"/>
  </g>
'''
# C3 Create: the nib, cut as a tall rhombus, now 18pt corner to corner (it was the lightest glyph).
def kite_pt(p, s=1.2, c=(12, 12)):
    q = rot((p[0]*s, p[1]*s), 45)
    return (c[0] + q[0], c[1] + q[1])
K = [kite_pt(p) for p in [(0, -10.6), (6.1, -1.4), (0, 10.6), (-6.1, -1.4)]]
hole_c, slit_end = kite_pt((0, 2.4)), kite_pt((0, 11.6))
C3 = f'''  <defs>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <circle cx="{f(hole_c[0])}" cy="{f(hole_c[1])}" r="1.75" fill="#000"/>
      <path d="M{pt(hole_c)}L{pt(slit_end)}" stroke="#000" stroke-width="1.3"/>
    </mask>
  </defs>
  <path mask="url(#cut)" d="M{pt(K[0])}L{pt(K[1])}L{pt(K[2])}L{pt(K[3])}Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
'''
# C4 Profile: you, in your circle. The bust with an ahoge read as a cherry, or a bomb with a fuse,
# at bar size; the circle is what the rest of the app already uses for the player.
C4 = '''  <defs>
    <clipPath id="inner"><circle cx="12" cy="12" r="8"/></clipPath>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <circle cx="12" cy="9.6" r="3.2" fill="#000"/>
      <path clip-path="url(#inner)" d="M4 23V19.4C5.4 16.9 8.4 15.6 12 15.6C15.6 15.6 18.6 16.9 20 19.4V23Z" fill="#000"/>
    </mask>
  </defs>
  <circle mask="url(#cut)" cx="12" cy="12" r="9.75" fill="currentColor"/>
'''
for name, body in {'discover': C1, 'library': C2, 'create': C3, 'profile': C4}.items():
    t = name.capitalize()
    write(f'C/{name}.svg', svg(body, title=t))
    write(f'C/{name}-selected.svg', svg(body, title=t))   # same glyph: selected is the colour alone
print('ok')
