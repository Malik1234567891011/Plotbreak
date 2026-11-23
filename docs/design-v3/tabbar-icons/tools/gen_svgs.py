import math, os
OUT = '/Users/omarlahmimi/Documents/Plotbreak/docs/design-v3/tabbar-icons'
def f(v): 
    s = ('%.3f' % v).rstrip('0').rstrip('.')
    return '0' if s in ('-0', '') else s
def pt(p): return f(p[0]) + ' ' + f(p[1])

LINE = 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"'
def svg(body, vb='0 0 24 24', size=24, title=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="{vb}">\n'
            + (f'  <title>{title}</title>\n' if title else '') + body + '</svg>\n')
def write(path, s):
    with open(os.path.join(OUT, path), 'w') as fh: fh.write(s)

# ---------------------------------------------------------------- B: story line set
# B1 Discover: a manga page. Three tiers cut on opposing slants, the last one split.
g1 = ((4.5, 7.31), (19.5, 10.49))       # gutters extended past the frame (for the mask)
g2 = ((4.5, 15.9), (19.5, 12.6))
def yat(g, x): return g[0][1] + (x - g[0][0]) * (g[1][1] - g[0][1]) / (g[1][0] - g[0][0])
sp = ((12.6, yat(g2, 12.6)), (11.6, 21.125))
B1u = svg(f'''  <g {LINE}>
    <rect x="5.875" y="2.875" width="12.25" height="18.25" rx="2"/>
    <path d="M5.875 {f(yat(g1, 5.875))}L18.125 {f(yat(g1, 18.125))}M5.875 {f(yat(g2, 5.875))}L18.125 {f(yat(g2, 18.125))}M{pt(sp[0])}L{pt(sp[1])}"/>
  </g>
''', title='Discover')
B1s = svg(f'''  <defs>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <path d="M{pt(g1[0])}L{pt(g1[1])}M{pt(g2[0])}L{pt(g2[1])}M{pt(sp[0])}L11.45 22.5" stroke="#000" stroke-width="1.75"/>
    </mask>
  </defs>
  <rect mask="url(#cut)" x="5" y="2" width="14" height="20" rx="2.875" fill="currentColor"/>
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

# B3 Create: a quill over the line it is writing.
base, tip = (8.6, 15.4), (20.6, 3.4)
L = math.dist(base, tip); u = ((tip[0]-base[0])/L, (tip[1]-base[1])/L)
nUL = (u[1], -u[0])
if nUL[0] > 0: nUL = (-nUL[0], -nUL[1])
nDR = (-nUL[0], -nUL[1])
def P(t, o, side): n = nUL if side == 'ul' else nDR; return (base[0]+u[0]*t+n[0]*o, base[1]+u[1]*t+n[1]*o)
# wide, curved side up-left with one split in it; narrow side down-right
vane = (f'M{pt(base)}'
        f'C{pt(P(1.0,3.0,"ul"))} {pt(P(4.0,4.6,"ul"))} {pt(P(7.2,4.5,"ul"))}'
        f'L{pt(P(8.2,2.5,"ul"))}L{pt(P(9.0,4.35,"ul"))}'
        f'C{pt(P(12.6,3.6,"ul"))} {pt(P(15.6,1.6,"ul"))} {pt(tip)}'
        f'C{pt(P(14.2,2.6,"dr"))} {pt(P(5.0,2.7,"dr"))} {pt(base)}Z')
shaft = f'M{pt(base)}L4.1 19.9'
rachis = f'M{pt(P(1.2,0,"ul"))}C{pt(P(6,0.5,"ul"))} {pt(P(11,0.6,"ul"))} {pt(P(15.2,0,"ul"))}'
B3u = svg(f'''  <g {LINE}>
    <path d="{vane}"/>
    <path d="{shaft}M12.75 21.125H20.25"/>
  </g>
''', title='Create')
B3s = svg(f'''  <defs>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <path d="{rachis}" fill="none" stroke="#000" stroke-width="1.1" stroke-linecap="round"/>
    </mask>
  </defs>
  <path mask="url(#cut)" d="{vane}" fill="currentColor" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
  <path d="{shaft}M12.75 21.125H20.25" {LINE}/>
''', title='Create')

# B4 Profile: the face card every speaker gets in a story (rounded square, bust cropped by the frame).
frame_r = 'M8.75 4.125H15.25C17.85 4.125 19.875 6.15 19.875 8.75V15.25C19.875 17.85 17.85 19.875 15.25 19.875H8.75C6.15 19.875 4.125 17.85 4.125 15.25V8.75C4.125 6.15 6.15 4.125 8.75 4.125Z'
B4u = svg(f'''  <g {LINE}>
    <path d="{frame_r}"/>
    <circle cx="12" cy="10.35" r="2.85"/>
    <path d="M7.05 19.6C7.8 17 9.65 15.6 12 15.6C14.35 15.6 16.2 17 16.95 19.6"/>
  </g>
''', title='Profile')
B4s = svg(f'''  <defs>
    <mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <rect width="24" height="24" fill="#fff"/>
      <circle cx="12" cy="10.35" r="2.6" fill="#000"/>
      <path d="M7.75 19.0C8.45 17.35 9.95 16.35 12 16.35C14.05 16.35 15.55 17.35 16.25 19.0Z" fill="#000" stroke="#000" stroke-width="0.6" stroke-linejoin="round"/>
    </mask>
  </defs>
  <path mask="url(#cut)" d="{frame_r}" fill="currentColor" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
''', title='Profile')

for name, (u_, s_) in {'discover': (B1u, B1s), 'library': (B2u, B2s), 'create': (B3u, B3s), 'profile': (B4u, B4s)}.items():
    write(f'B/{name}.svg', u_); write(f'B/{name}-selected.svg', s_)

# ---------------------------------------------------------------- C: bold glyph set
def rot(p, ang, c):
    a = math.radians(ang); x, y = p[0]-c[0], p[1]-c[1]
    return (c[0] + x*math.cos(a) - y*math.sin(a), c[1] + x*math.sin(a) + y*math.cos(a))

# C1 Discover: a hand of three covers, fanned to the left (covers are 2:3, near-square corners).
cw, ch, cr = 8.6, 13.4, 1.5
pv = (12, ch + 4.5)           # the hand holds them below the cards
angs = (-32, -12, 8)          # back, middle, front
pts = [rot(p, a, pv) for a in angs for p in [(12-cw/2, 0), (12+cw/2, 0), (12+cw/2, ch), (12-cw/2, ch)]]
minx, maxx = min(p[0] for p in pts), max(p[0] for p in pts)
miny, maxy = min(p[1] for p in pts), max(p[1] for p in pts)
tx, ty = 12 - (minx + maxx) / 2, 12 - (miny + maxy) / 2
cy0 = 0
card = (f'M{f(12-cw/2+cr)} 0H{f(12+cw/2-cr)}A{cr} {cr} 0 0 1 {f(12+cw/2)} {f(cr)}V{f(ch-cr)}'
        f'A{cr} {cr} 0 0 1 {f(12+cw/2-cr)} {f(ch)}H{f(12-cw/2+cr)}A{cr} {cr} 0 0 1 {f(12-cw/2)} {f(ch-cr)}V{f(cr)}'
        f'A{cr} {cr} 0 0 1 {f(12-cw/2+cr)} 0Z')
def T(a): return f'translate({f(tx)} {f(ty)}) rotate({a} {f(pv[0])} {f(pv[1])})'
C1 = lambda: f'''  <defs>
    <mask id="front" maskUnits="userSpaceOnUse" x="-2" y="-2" width="28" height="28">
      <rect x="-2" y="-2" width="28" height="28" fill="#fff"/>
      <path d="{card}" transform="{T(angs[2])}" fill="#000" stroke="#000" stroke-width="3.2" stroke-linejoin="round"/>
    </mask>
    <mask id="middle" maskUnits="userSpaceOnUse" x="-2" y="-2" width="28" height="28">
      <rect x="-2" y="-2" width="28" height="28" fill="#fff"/>
      <path d="{card}" transform="{T(angs[1])}" fill="#000" stroke="#000" stroke-width="3.2" stroke-linejoin="round"/>
    </mask>
  </defs>
  <g fill="currentColor">
    <g mask="url(#middle)"><g mask="url(#front)"><path d="{card}" transform="{T(angs[0])}"/></g></g>
    <g mask="url(#front)"><path d="{card}" transform="{T(angs[1])}"/></g>
    <path d="{card}" transform="{T(angs[2])}"/>
  </g>
'''
# C2 Library: a closed book with its ribbon hanging out.
C2 = lambda: '''  <defs>
    <mask id="book" maskUnits="userSpaceOnUse" x="-2" y="-2" width="28" height="28">
      <rect x="-2" y="-2" width="28" height="28" fill="#fff"/>
      <path d="M8.6 1V20" stroke="#000" stroke-width="1.6"/>
      <path d="M13.1 17.6H17.1V23.6L15.1 21.75L13.1 23.6Z" fill="#000" stroke="#000" stroke-width="3" stroke-linejoin="round"/>
    </mask>
  </defs>
  <g fill="currentColor">
    <path mask="url(#book)" d="M7.5 1.75H16.75A2.5 2.5 0 0 1 19.25 4.25V17.5A2.5 2.5 0 0 1 16.75 20H7.5A2.75 2.75 0 0 1 4.75 17.25V4.5A2.75 2.75 0 0 1 7.5 1.75Z"/>
    <path d="M13.1 17.6H17.1V23.1L15.1 21.35L13.1 23.1Z" stroke="currentColor" stroke-width="0.8" stroke-linejoin="round"/>
  </g>
'''
# C3 Create: the crystal, cut as a pen nib.
def kite():
    top, wid, half, bot = -10.6, -1.4, 6.1, 10.6
    return [(0, top), (half, wid), (0, bot), (-half, wid)]
def xform(p, ang=45, s=0.97, c=(12, 12)):
    a = math.radians(ang); x, y = p[0]*s, p[1]*s
    return (c[0] + x*math.cos(a) - y*math.sin(a), c[1] + x*math.sin(a) + y*math.cos(a))
K = [xform(p) for p in kite()]
hole_c = xform((0, 2.4)); slit_end = xform((0, 10.6 + 1))
facL0, facL1 = xform((-3.6, -0.9)), xform((0, -0.9))
facR0, facR1 = xform((3.6, -0.9)), xform((0, -0.9))
nib = f'M{pt(K[0])}L{pt(K[1])}L{pt(K[2])}L{pt(K[3])}Z'
C3 = lambda: f'''  <defs>
    <mask id="nib" maskUnits="userSpaceOnUse" x="-2" y="-2" width="28" height="28">
      <rect x="-2" y="-2" width="28" height="28" fill="#fff"/>
      <circle cx="{f(hole_c[0])}" cy="{f(hole_c[1])}" r="1.6" fill="#000"/>
      <path d="M{pt(hole_c)}L{pt(slit_end)}" stroke="#000" stroke-width="1.2"/>
    </mask>
  </defs>
  <path mask="url(#nib)" d="{nib}" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
'''
# C4 Profile: you, with an ahoge.
C4 = lambda: '''  <g fill="currentColor">
    <circle cx="12" cy="9.4" r="4.35"/>
    <path d="M11.35 5.3C11.05 3.05 12.75 1.15 15.6 1.55C13.85 2.2 12.95 3.4 12.95 5.15Z"/>
    <path d="M4.6 21.75Q3.75 21.75 3.75 20.9C3.75 17.35 7.4 15.25 12 15.25C16.6 15.25 20.25 17.35 20.25 20.9Q20.25 21.75 19.4 21.75Z"/>
  </g>
'''
# manga emphasis marks, the selected state: three strokes off the top-right corner
def marks():
    c = (19.9, 4.1); out = []
    for a, r0, r1 in [(-80, 3.2, 5.0), (-44, 3.2, 5.6), (-8, 3.2, 5.0)]:
        t = math.radians(a)
        p0 = (c[0] + r0*math.cos(t), c[1] + r0*math.sin(t)); p1 = (c[0] + r1*math.cos(t), c[1] + r1*math.sin(t))
        out.append(f'M{pt(p0)}L{pt(p1)}')
    return ''.join(out)
MARKS = f'  <path d="{marks()}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>\n'
for name, body in {'discover': C1, 'library': C2, 'create': C3, 'profile': C4}.items():
    t = name.capitalize()
    write(f'C/{name}.svg', svg(body(), vb='-2 -2 28 28', size=28, title=t))
    write(f'C/{name}-selected.svg', svg(body() + MARKS, vb='-2 -2 28 28', size=28, title=t))
print('ok')
