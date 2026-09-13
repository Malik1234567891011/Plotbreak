#!/usr/bin/env python3
"""Typed prompt-box overlay (transparent PNG sequence) mimicking the OOC ad's prompt pill.
usage: make_overlay.py out_dir fps duration windows.json
windows.json: [{"start":s,"end":e,"text":"...","cps":16,"empty":false}, ...]
"""
import sys, json, os, math
from PIL import Image, ImageDraw, ImageFont
W,H=1280,720
out,fps,dur,wins=sys.argv[1],int(sys.argv[2]),float(sys.argv[3]),json.load(open(sys.argv[4]))
os.makedirs(out,exist_ok=True)
FONT='/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf'
if not os.path.exists(FONT): FONT='/usr/share/fonts/truetype/lato/Lato-Medium.ttf'
font=ImageFont.truetype(FONT,30)
BOX_H=72; PAD=28; BTN=40
def draw_box(d, txt, cursor_on, blank=False):
    tw=d.textlength(txt,font=font) if txt else 0
    minw=420
    bw=max(minw, PAD+tw+18+PAD+BTN+PAD)
    bw=min(bw, W-80)
    x0=(W-bw)//2; y0=H-BOX_H-54; x1=x0+bw; y1=y0+BOX_H
    d.rounded_rectangle([x0,y0,x1,y1],radius=BOX_H//2,fill=(18,18,26,205),outline=(255,255,255,70),width=1)
    ty=y0+(BOX_H-36)//2
    d.text((x0+PAD,ty),txt,font=font,fill=(245,245,250,255))
    if cursor_on:
        cx=x0+PAD+tw+4
        d.rectangle([cx,ty+4,cx+2,ty+34],fill=(245,245,250,255))
    # play button
    bx=x1-PAD-BTN; by=y0+(BOX_H-BTN)//2
    d.rounded_rectangle([bx,by,bx+BTN,by+BTN],radius=10,fill=(255,255,255,235))
    cx,cy=bx+BTN/2+2,by+BTN/2
    d.polygon([(cx-7,cy-9),(cx-7,cy+9),(cx+8,cy)],fill=(18,18,26,255))
n=int(round(dur*fps))
blank=Image.new('RGBA',(W,H),(0,0,0,0))
for i in range(n):
    t=i/fps
    im=None
    for w in wins:
        if w['start']<=t<w['end']:
            im=blank.copy(); d=ImageDraw.Draw(im)
            cps=w.get('cps',16); txt=w.get('text','')
            k=min(len(txt), int((t-w['start'])*cps)) if not w.get('empty') else 0
            shown=txt[:k]
            # fade in/out 0.2s
            cursor_on = (int(t*2)%2==0) or k<len(txt)
            draw_box(d,shown,cursor_on)
            a=1.0
            if t-w['start']<0.2: a=(t-w['start'])/0.2
            if w['end']-t<0.2: a=(w['end']-t)/0.2
            if a<1.0:
                r,g,b,al=im.split(); al=al.point(lambda v: int(v*a)); im=Image.merge('RGBA',(r,g,b,al))
            break
    (im or blank).save(f'{out}/f{i:05d}.png',compress_level=1)
print('frames',n)
