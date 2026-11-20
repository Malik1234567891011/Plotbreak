/**
 * Chibi characters, drawn in code: flat anime colour, dark outline, big eyes.
 * Units: a character is ~100 units tall, feet at y = 0, facing +x.
 */
import type { EnemyLook } from '@tower';

export type Eyes = 'normal' | 'angry' | 'closed' | 'hurt' | 'smug' | 'shock' | 'dead' | 'glow';

export interface Pose {
  /** Vertical bob, units. */
  bob: number;
  /** Body lean, radians (+ leans forward). */
  lean: number;
  /** Weapon-arm angle, radians: 0 = forward, -1.6 = raised overhead, 1 = low. */
  arm: number;
  /** Horizontal squash (1 = none). */
  squash: number;
  eyes: Eyes;
  /** 0..1 white flash over the body. */
  flash: number;
  /** Colour tint over the body (hit red, heavy red glow, stance blue). */
  tint: string | null;
  tintAmount: number;
  /** Scarf / hair streaming back, 0..1. */
  wind: number;
  /** 0..1 how far a fallen character has toppled. */
  fall: number;
  /** For floating things (lantern, drone). */
  float: number;
  time: number;
}

export const basePose = (time: number): Pose => ({
  bob: 0, lean: 0, arm: -0.4, squash: 1, eyes: 'normal', flash: 0, tint: null, tintAmount: 0, wind: 0, fall: 0, float: 0, time,
});

const INK = '#1a1222';
const LW = 2.6;

function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt)));
  r = f(r); g = f(g); b = f(b);
  return `rgb(${r},${g},${b})`;
}

function fillStroke(ctx: CanvasRenderingContext2D, fill: string, lw = LW): void {
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.lineWidth = lw;
  ctx.strokeStyle = INK;
  ctx.stroke();
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export interface Look extends EnemyLook {}



/** Draws a character. `dir` 1 faces right, -1 faces left. */
/** The player's extra kit. Enemies have none. */
export interface Gear { readonly scarf: string | null; readonly headband: string | null }

export function drawChar(ctx: CanvasRenderingContext2D, look: EnemyLook, x: number, y: number, scale: number, dir: 1 | -1, pose: Pose, gear: Gear | null = null): void {
  const tinted = pose.flash > 0 || (pose.tint !== null && pose.tintAmount > 0);
  if (!tinted) {
    paint(ctx, look, x, y, scale, dir, pose, gear);
    return;
  }
  // A tint must cover the character only, so it is painted on its own layer first.
  const dpr = ctx.getTransform().a || 1;
  const W = Math.ceil(240 * scale), H = Math.ceil(230 * scale);
  const layer = scratch(Math.ceil(W * dpr), Math.ceil(H * dpr));
  const g = layer.getContext('2d')!;
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, layer.width, layer.height);
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  paint(g, look, W / 2, H - 20 * scale, scale, dir, pose, gear);
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = 'source-atop';
  if (pose.tint && pose.tintAmount > 0) {
    g.globalAlpha = Math.min(0.85, pose.tintAmount);
    g.fillStyle = pose.tint;
    g.fillRect(0, 0, layer.width, layer.height);
  }
  if (pose.flash > 0) {
    g.globalAlpha = Math.min(1, pose.flash);
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, layer.width, layer.height);
  }
  g.globalAlpha = 1;
  g.globalCompositeOperation = 'source-over';
  ctx.drawImage(layer, 0, 0, layer.width, layer.height, x - W / 2, y - (H - 20 * scale), W, H);
}

const layers: HTMLCanvasElement[] = [];
let layerIndex = 0;
function scratch(w: number, h: number): HTMLCanvasElement {
  // Two layers in rotation: the hero and the enemy can both be tinted in one frame.
  layerIndex = (layerIndex + 1) % 2;
  let c = layers[layerIndex];
  if (!c) { c = document.createElement('canvas'); layers[layerIndex] = c; }
  if (c.width < w || c.height < h) { c.width = Math.max(c.width, w); c.height = Math.max(c.height, h); }
  return c;
}

function paint(ctx: CanvasRenderingContext2D, look: EnemyLook, x: number, y: number, scale: number, dir: 1 | -1, pose: Pose, gear: Gear | null): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale * dir, scale);
  ctx.translate(0, -pose.bob);
  if (pose.fall > 0) {
    ctx.translate(-10 * pose.fall, 0);
    ctx.rotate(-pose.fall * 1.35);
  }
  ctx.scale(pose.squash, 2 - pose.squash);
  ctx.rotate(pose.lean * 0.5);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const style = look.style;
  if (style === 'lantern') drawLantern(ctx, look, pose);
  else if (style === 'drone') drawDrone(ctx, look, pose);
  else if (style === 'mecha') drawMecha(ctx, look, pose);
  else drawHumanoid(ctx, look, pose, gear);
  ctx.restore();
}

// ── humanoids ────────────────────────────────────────────────────────────

function drawHumanoid(ctx: CanvasRenderingContext2D, look: EnemyLook, pose: Pose, gear: Gear | null): void {
  const s = look.style;
  const t = pose.time;
  const big = s === 'knight' || s === 'general' || s === 'oni';
  if (big) ctx.scale(1.12, 1.12);

  // Things behind the body.
  if (s === 'kitsune') drawTails(ctx, look, t, s === 'kitsune' && look.hair === '#e8f3ff' ? 1 : 3);
  if (gear?.scarf) drawScarf(ctx, gear.scarf, t, pose.wind);
  else if (!gear && s === 'rival') drawScarf(ctx, look.accent, t, pose.wind);
  if (s === 'general' || s === 'president' || s === 'author') drawCape(ctx, s === 'general' ? '#5a0d14' : s === 'author' ? '#2b2440' : '#1d2340', t, pose.wind);
  if (s === 'delinquent' && look.hair === '#111111') drawCape(ctx, '#15151c', t, pose.wind * 0.6, true);
  drawBackHair(ctx, look);

  // Back arm.
  ctx.save();
  ctx.translate(-6, -38);
  ctx.rotate(0.5 + Math.sin(t * 2) * 0.05);
  rrect(ctx, -4, 0, 8, 18, 4);
  fillStroke(ctx, shade(look.outfit, -0.25));
  ctx.restore();

  // Legs.
  const step = Math.sin(t * 3) * 1.2;
  rrect(ctx, -11, -16 + step * 0.2, 9, 17, 4);
  fillStroke(ctx, shade(legColor(look), -0.15));
  rrect(ctx, 2, -16 - step * 0.2, 9, 17, 4);
  fillStroke(ctx, legColor(look));
  // Shoes.
  rrect(ctx, -13, -3, 12, 5, 2.5);
  fillStroke(ctx, '#2a2230');
  rrect(ctx, 1, -3, 13, 5, 2.5);
  fillStroke(ctx, '#2a2230');

  // Body.
  ctx.beginPath();
  ctx.moveTo(-15, -14);
  ctx.quadraticCurveTo(-17, -32, -12, -44);
  ctx.lineTo(12, -44);
  ctx.quadraticCurveTo(17, -32, 15, -14);
  ctx.closePath();
  fillStroke(ctx, look.outfit);
  // Shading down the back.
  ctx.save();
  ctx.clip();
  ctx.fillStyle = shade(look.outfit, -0.22);
  ctx.fillRect(-18, -46, 10, 34);
  ctx.restore();
  drawOutfitDetail(ctx, look, gear);

  // Head.
  drawHead(ctx, look, pose, gear);

  // Front arm + weapon.
  ctx.save();
  ctx.translate(7, -38);
  ctx.rotate(pose.arm);
  drawWeapon(ctx, look.weapon, look, t);
  rrect(ctx, -4.5, -3, 9, 19, 4.5);
  fillStroke(ctx, look.outfit);
  ctx.beginPath();
  ctx.arc(0, 17, 4.6, 0, Math.PI * 2);
  fillStroke(ctx, look.skin);
  ctx.restore();
}

function legColor(look: EnemyLook): string {
  if (look.style === 'kitsune' || look.style === 'kunoichi' || look.style === 'president' || look.style === 'monitor') return look.skin;
  return shade(look.outfit, -0.1);
}

function drawOutfitDetail(ctx: CanvasRenderingContext2D, look: EnemyLook, gear: Gear | null): void {
  const s = look.style;
  ctx.lineWidth = 1.8;
  ctx.strokeStyle = INK;
  if (s === 'monitor' || s === 'president') {
    // Sailor collar + ribbon.
    ctx.beginPath();
    ctx.moveTo(-12, -44); ctx.lineTo(0, -32); ctx.lineTo(12, -44); ctx.closePath();
    fillStroke(ctx, '#f2f2f6', 1.8);
    ctx.beginPath();
    ctx.moveTo(-5, -35); ctx.lineTo(0, -31); ctx.lineTo(5, -35); ctx.lineTo(3, -28); ctx.lineTo(-3, -28); ctx.closePath();
    fillStroke(ctx, look.accent, 1.6);
    // Armband.
    if (s === 'president') { rrect(ctx, -16, -38, 6, 6, 1); fillStroke(ctx, look.accent, 1.4); }
  } else if (s === 'delinquent' || s === 'rival') {
    // Gakuran buttons / open jacket.
    ctx.fillStyle = gear ? '#d9b34a' : look.accent;
    for (const yy of [-38, -30, -22]) { ctx.beginPath(); ctx.arc(2, yy, 1.6, 0, Math.PI * 2); ctx.fill(); }
  } else if (s === 'ninja' || s === 'kunoichi') {
    // Belt + wrap.
    rrect(ctx, -15, -24, 30, 5, 2);
    fillStroke(ctx, look.accent, 1.6);
  } else if (s === 'knight' || s === 'general') {
    // Breastplate.
    ctx.beginPath();
    ctx.moveTo(-12, -42); ctx.lineTo(12, -42); ctx.lineTo(9, -24); ctx.lineTo(0, -18); ctx.lineTo(-9, -24); ctx.closePath();
    fillStroke(ctx, shade(look.outfit, 0.25), 1.8);
    ctx.fillStyle = look.eye;
    ctx.beginPath(); ctx.arc(0, -32, 2.4, 0, Math.PI * 2); ctx.fill();
  } else if (s === 'cyborg') {
    ctx.strokeStyle = look.accent;
    ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(-10, -40); ctx.lineTo(-4, -30); ctx.lineTo(8, -30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, -22); ctx.lineTo(3, -22); ctx.stroke();
  } else if (s === 'kitsune') {
    // Shrine-maiden obi.
    rrect(ctx, -15, -26, 30, 6, 2);
    fillStroke(ctx, look.accent, 1.6);
  } else if (s === 'author') {
    // Tie.
    ctx.beginPath(); ctx.moveTo(-2, -43); ctx.lineTo(2, -43); ctx.lineTo(3, -26); ctx.lineTo(0, -22); ctx.lineTo(-3, -26); ctx.closePath();
    fillStroke(ctx, look.accent, 1.4);
  }
}

function drawHead(ctx: CanvasRenderingContext2D, look: EnemyLook, pose: Pose, gear: Gear | null): void {
  const s = look.style;
  ctx.save();
  ctx.translate(2, -66);
  // Horns behind the hair line.
  if (s === 'oni' || s === 'general' || (s === 'kitsune' && look.hair === '#5a1a6b')) {
    const c = s === 'oni' ? '#f2e6c8' : '#2a2030';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(side * 10, -20);
      ctx.quadraticCurveTo(side * 16, -36, side * 8, -44);
      ctx.quadraticCurveTo(side * 9, -32, side * 3, -22);
      ctx.closePath();
      fillStroke(ctx, c);
    }
  }
  // Ears (fox).
  if (s === 'kitsune' && look.hair !== '#5a1a6b') {
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(side * 6, -22); ctx.lineTo(side * 18, -42); ctx.lineTo(side * 22, -16); ctx.closePath();
      fillStroke(ctx, look.hair);
      ctx.beginPath();
      ctx.moveTo(side * 10, -22); ctx.lineTo(side * 18, -35); ctx.lineTo(side * 19, -19); ctx.closePath();
      ctx.fillStyle = '#ffd9e0'; ctx.fill();
    }
  }

  if (s === 'knight' || (s === 'general' && false)) {
    drawHelmet(ctx, look, pose);
    ctx.restore();
    return;
  }

  // Face.
  ctx.beginPath();
  ctx.ellipse(0, 0, 25, 23, 0, 0, Math.PI * 2);
  fillStroke(ctx, look.skin);
  // Cheek shadow on the far side.
  ctx.save();
  ctx.clip();
  ctx.fillStyle = shade(look.skin, -0.12);
  ctx.beginPath(); ctx.ellipse(-22, 4, 8, 22, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  if (s === 'foxmask') {
    drawFoxMask(ctx, look);
  } else {
    drawFace(ctx, look, pose, gear);
  }
  if (s === 'ninja' && look.hair !== '#d9d9e0') {
    // Face wrap over mouth and nose.
    ctx.beginPath();
    ctx.moveTo(-24, 4); ctx.quadraticCurveTo(0, 0, 24, 4); ctx.lineTo(22, 16); ctx.quadraticCurveTo(0, 26, -22, 16); ctx.closePath();
    fillStroke(ctx, look.outfit);
  }
  drawFrontHair(ctx, look, pose, gear);
  if (gear?.headband) drawHeadband(ctx, gear.headband, pose.time, pose.wind, true);
  else if (s === 'ninja' && !gear) drawHeadband(ctx, look.accent, pose.time, pose.wind, false);
  if (s === 'cyborg') {
    // Visor.
    rrect(ctx, -6, -9, 30, 9, 4);
    ctx.fillStyle = look.accent; ctx.globalAlpha = 0.85; ctx.fill(); ctx.globalAlpha = 1;
    ctx.lineWidth = 2; ctx.strokeStyle = INK; ctx.stroke();
    ctx.fillStyle = '#ffffff'; ctx.fillRect(2, -7, 10, 2);
  }
  if (s === 'author' || s === 'president') drawGlasses(ctx, s === 'author');
  if (s === 'author') drawBeret(ctx, look);
  if (s === 'general') drawCrown(ctx, look);
  ctx.restore();
}

function drawFace(ctx: CanvasRenderingContext2D, look: EnemyLook, pose: Pose, gear: Gear | null): void {
  const e = pose.eyes;
  const blink = Math.sin(pose.time * 1.7 + (gear ? 0 : 2)) > 0.985;
  const eyes = blink && e === 'normal' ? 'closed' : e;
  // Two eyes, the near one larger (3/4 view toward +x).
  drawEye(ctx, 10, -2, 1, look.eye, eyes);
  drawEye(ctx, -9, -2, 0.82, look.eye, eyes);
  // Brows.
  ctx.strokeStyle = INK;
  ctx.lineWidth = 2.2;
  const angry = eyes === 'angry' || eyes === 'glow';
  ctx.beginPath();
  ctx.moveTo(4, angry ? -14 : -15); ctx.lineTo(16, angry ? -10 : -15);
  ctx.moveTo(-14, angry ? -11 : -14); ctx.lineTo(-5, angry ? -14 : -14);
  ctx.stroke();
  // Mouth.
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (eyes === 'hurt' || eyes === 'shock') {
    ctx.ellipse(4, 11, 3, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#7a2230'; ctx.fill(); ctx.stroke();
  } else if (eyes === 'smug') {
    ctx.moveTo(-1, 10); ctx.quadraticCurveTo(5, 14, 10, 8); ctx.stroke();
  } else if (angry) {
    ctx.moveTo(0, 12); ctx.lineTo(9, 10); ctx.stroke();
  } else {
    ctx.moveTo(1, 11); ctx.quadraticCurveTo(4, 13, 8, 11); ctx.stroke();
  }
  // Blush.
  if (!angry && eyes !== 'dead') {
    ctx.fillStyle = 'rgba(255,110,130,0.35)';
    ctx.beginPath(); ctx.ellipse(15, 6, 4.5, 2.4, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(-13, 6, 3.6, 2, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Sweat drop when shocked.
  if (eyes === 'shock' || eyes === 'hurt') {
    ctx.beginPath();
    ctx.moveTo(22, -14); ctx.quadraticCurveTo(28, -4, 22, -2); ctx.quadraticCurveTo(17, -4, 22, -14);
    ctx.fillStyle = '#9fd8ff'; ctx.fill(); ctx.lineWidth = 1.4; ctx.stroke();
  }
}

function drawEye(ctx: CanvasRenderingContext2D, x: number, y: number, k: number, iris: string, e: Eyes): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(k, k);
  if (e === 'closed') {
    ctx.strokeStyle = INK; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(-6, 1); ctx.quadraticCurveTo(0, 5, 6, 1); ctx.stroke();
    ctx.restore();
    return;
  }
  if (e === 'dead') {
    ctx.strokeStyle = INK; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(-5, -5); ctx.lineTo(5, 5); ctx.moveTo(5, -5); ctx.lineTo(-5, 5); ctx.stroke();
    ctx.restore();
    return;
  }
  const h = e === 'angry' || e === 'glow' ? 7 : e === 'smug' ? 6 : 9;
  // Sclera.
  ctx.beginPath(); ctx.ellipse(0, 0, 6.5, h, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; ctx.fill();
  // Iris.
  const g = ctx.createLinearGradient(0, -h, 0, h);
  g.addColorStop(0, shade(iris, -0.45));
  g.addColorStop(1, shade(iris, 0.25));
  ctx.beginPath(); ctx.ellipse(1, e === 'shock' ? 0 : 1, e === 'shock' ? 2.6 : 5, e === 'shock' ? 3 : h - 1, 0, 0, Math.PI * 2);
  ctx.fillStyle = e === 'glow' ? iris : g; ctx.fill();
  if (e !== 'shock') {
    ctx.beginPath(); ctx.ellipse(1, 1.5, 2.2, 3.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#120a18'; ctx.fill();
  }
  // Highlights.
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.ellipse(-1.5, -3, 2.2, 2.6, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(3, 4, 1.1, 0, Math.PI * 2); ctx.fill();
  // Upper lash line.
  ctx.strokeStyle = INK; ctx.lineWidth = 3;
  ctx.beginPath();
  if (e === 'angry' || e === 'glow') { ctx.moveTo(-7, -h + 3); ctx.lineTo(7, -h + 0.5); }
  else { ctx.ellipse(0, 0, 6.8, h, 0, Math.PI * 1.08, Math.PI * 1.95); }
  ctx.stroke();
  if (e === 'glow') {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = iris;
    ctx.beginPath(); ctx.ellipse(0, 0, 11, h + 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function drawBackHair(ctx: CanvasRenderingContext2D, look: EnemyLook): void {
  const s = look.style;
  if (s === 'knight' || s === 'ninja' && look.hair !== '#d9d9e0') return;
  ctx.save();
  ctx.translate(2, -66);
  const long = s === 'president' || s === 'kunoichi' || s === 'kitsune' || s === 'author' && false;
  if (long) {
    ctx.beginPath();
    ctx.moveTo(-26, -6);
    ctx.quadraticCurveTo(-34, 30, -24, 56);
    ctx.lineTo(10, 54);
    ctx.quadraticCurveTo(20, 30, 24, -4);
    ctx.closePath();
    fillStroke(ctx, shade(look.hair, -0.18));
  }
  if (s === 'kunoichi' || s === 'monitor' && look.hair === '#2a1e3a') {
    // Ponytail.
    ctx.beginPath();
    ctx.moveTo(-18, -16);
    ctx.quadraticCurveTo(-44, -10, -40, 22);
    ctx.quadraticCurveTo(-30, 6, -14, -4);
    ctx.closePath();
    fillStroke(ctx, look.hair);
  }
  // Base skull of hair.
  ctx.beginPath();
  ctx.ellipse(-1, -6, 27, 25, 0, 0, Math.PI * 2);
  fillStroke(ctx, look.hair);
  ctx.restore();
}

function drawFrontHair(ctx: CanvasRenderingContext2D, look: EnemyLook, pose: Pose, gear: Gear | null): void {
  const s = look.style;
  const c = look.hair;
  const w = pose.wind * 4;
  if (s === 'knight') return;
  ctx.save();
  if (s === 'rival' || s === 'ninja' && look.hair === '#d9d9e0' || s === 'cyborg' && look.hair !== '#ff4fd8') {
    // Spiky shonen hair.
    ctx.beginPath();
    ctx.moveTo(-28, 2);
    const spikes: [number, number][] = [[-34, -20], [-22, -18], [-26, -40], [-10, -28], [-6, -48], [4, -30], [14, -46], [16, -26], [30, -32], [24, -14], [34, -8]];
    for (const [px, py] of spikes) ctx.lineTo(px - w * (py < -30 ? 1 : 0.4), py);
    ctx.lineTo(24, -6);
    // Bangs.
    ctx.lineTo(20, -10); ctx.lineTo(16, 2); ctx.lineTo(10, -10); ctx.lineTo(4, 0); ctx.lineTo(-2, -12); ctx.lineTo(-10, -2); ctx.lineTo(-14, -14);
    ctx.lineTo(-24, -4);
    ctx.closePath();
    fillStroke(ctx, c);
  } else if (s === 'delinquent') {
    // Pompadour.
    ctx.beginPath();
    ctx.moveTo(-26, -2);
    ctx.quadraticCurveTo(-30, -32, 2, -34);
    ctx.quadraticCurveTo(40, -38, 40, -22);
    ctx.quadraticCurveTo(30, -16, 18, -16);
    ctx.lineTo(12, -12);
    ctx.quadraticCurveTo(-6, -18, -20, -6);
    ctx.closePath();
    fillStroke(ctx, c);
  } else if (s === 'foxmask') {
    ctx.beginPath();
    ctx.moveTo(-28, 4); ctx.lineTo(-30, -18); ctx.lineTo(-14, -30); ctx.lineTo(8, -32); ctx.lineTo(26, -20); ctx.lineTo(28, -6);
    ctx.lineTo(18, -16); ctx.lineTo(-10, -20); ctx.closePath();
    fillStroke(ctx, c);
  } else if (s === 'oni') {
    ctx.beginPath();
    ctx.moveTo(-28, 0); ctx.lineTo(-30, -24); ctx.lineTo(-18, -18); ctx.lineTo(-16, -34); ctx.lineTo(-4, -22); ctx.lineTo(4, -36); ctx.lineTo(10, -22);
    ctx.lineTo(22, -32); ctx.lineTo(22, -16); ctx.lineTo(30, -12); ctx.lineTo(16, -12); ctx.lineTo(8, -16); ctx.lineTo(-12, -14); ctx.closePath();
    fillStroke(ctx, c);
  } else {
    // Straight bangs (bob / long).
    ctx.beginPath();
    ctx.moveTo(-27, 6);
    ctx.quadraticCurveTo(-30, -30, 0, -31);
    ctx.quadraticCurveTo(30, -30, 27, 2);
    ctx.lineTo(22, -8); ctx.lineTo(18, -2); ctx.lineTo(14, -12); ctx.lineTo(8, -4); ctx.lineTo(2, -13); ctx.lineTo(-4, -4); ctx.lineTo(-10, -12); ctx.lineTo(-16, -2); ctx.lineTo(-21, -10);
    ctx.closePath();
    fillStroke(ctx, c);
    if (s === 'monitor' || s === 'cyborg') {
      // Side locks to the jaw.
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(side * 22, -8); ctx.quadraticCurveTo(side * 30, 10, side * 22, 22); ctx.lineTo(side * 18, 6); ctx.closePath();
        fillStroke(ctx, c);
      }
    }
  }
  // Shine on the hair.
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.arc(-2, -6, 20, Math.PI * 1.15, Math.PI * 1.45); ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawHeadband(ctx: CanvasRenderingContext2D, color: string, t: number, wind: number, hero: boolean): void {
  rrect(ctx, -26, -22, 52, 7, 3);
  fillStroke(ctx, color, 2);
  if (!hero) {
    rrect(ctx, 4, -23, 14, 9, 2);
    fillStroke(ctx, '#c9ced9', 1.6);
  }
  // Tails flapping.
  const f = Math.sin(t * 9) * 3;
  ctx.beginPath();
  ctx.moveTo(-25, -19);
  ctx.quadraticCurveTo(-40 - wind * 8, -24 + f, -50 - wind * 14, -14 + f);
  ctx.lineTo(-46 - wind * 12, -10 + f);
  ctx.quadraticCurveTo(-36, -14, -25, -15);
  ctx.closePath();
  fillStroke(ctx, color, 1.8);
}

function drawScarf(ctx: CanvasRenderingContext2D, color: string, t: number, wind: number): void {
  const f = Math.sin(t * 7) * 3;
  ctx.beginPath();
  ctx.moveTo(-4, -46);
  ctx.quadraticCurveTo(-26 - wind * 14, -46 + f, -40 - wind * 20, -36 + f * 1.5);
  ctx.lineTo(-38 - wind * 18, -28 + f);
  ctx.quadraticCurveTo(-22, -36, -6, -38);
  ctx.closePath();
  fillStroke(ctx, color);
  rrect(ctx, -14, -49, 28, 9, 4);
  fillStroke(ctx, color);
}

function drawCape(ctx: CanvasRenderingContext2D, color: string, t: number, wind: number, coat = false): void {
  const f = Math.sin(t * 4) * 2;
  ctx.beginPath();
  ctx.moveTo(-12, -44);
  ctx.quadraticCurveTo(-30 - wind * 10, -20, -26 - wind * 16, coat ? 0 : 2 + f);
  ctx.lineTo(10, coat ? 0 : 2);
  ctx.lineTo(12, -44);
  ctx.closePath();
  fillStroke(ctx, color);
}

function drawTails(ctx: CanvasRenderingContext2D, look: EnemyLook, t: number, n: number): void {
  for (let i = 0; i < n; i++) {
    const a = -0.9 + i * 0.45 + Math.sin(t * 2 + i) * 0.08;
    ctx.save();
    ctx.translate(-8, -22);
    ctx.rotate(a - 1.2);
    ctx.beginPath();
    ctx.ellipse(0, -22, 9, 24, 0, 0, Math.PI * 2);
    fillStroke(ctx, look.hair);
    ctx.beginPath();
    ctx.ellipse(0, -40, 5, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();
  }
}

function drawFoxMask(ctx: CanvasRenderingContext2D, look: EnemyLook): void {
  ctx.beginPath();
  ctx.moveTo(-20, -12); ctx.lineTo(-16, -30); ctx.lineTo(-6, -16); ctx.lineTo(10, -16); ctx.lineTo(20, -30); ctx.lineTo(24, -10);
  ctx.quadraticCurveTo(28, 8, 30, 14);
  ctx.quadraticCurveTo(8, 22, -18, 14);
  ctx.quadraticCurveTo(-24, 2, -20, -12);
  ctx.closePath();
  fillStroke(ctx, '#f7f4ee');
  ctx.strokeStyle = look.accent;
  ctx.lineWidth = 2.6;
  // Eye slits and markings.
  ctx.beginPath(); ctx.moveTo(4, -4); ctx.lineTo(16, -8); ctx.moveTo(-12, -4); ctx.lineTo(-4, -6); ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-6, 4); ctx.lineTo(-14, 8); ctx.moveTo(18, 2); ctx.lineTo(26, 6); ctx.stroke();
  ctx.fillStyle = look.accent;
  ctx.beginPath(); ctx.arc(28, 12, 2.4, 0, Math.PI * 2); ctx.fill();
}

function drawHelmet(ctx: CanvasRenderingContext2D, look: EnemyLook, pose: Pose): void {
  ctx.beginPath();
  ctx.moveTo(-26, 16); ctx.quadraticCurveTo(-30, -26, 0, -30); ctx.quadraticCurveTo(30, -28, 26, 16); ctx.quadraticCurveTo(0, 26, -26, 16);
  fillStroke(ctx, shade(look.outfit, 0.15));
  // Crest.
  ctx.beginPath(); ctx.moveTo(-4, -30); ctx.quadraticCurveTo(-6, -48, 10, -50); ctx.quadraticCurveTo(2, -40, 4, -29); ctx.closePath();
  fillStroke(ctx, look.accent);
  // Visor slit with glowing eyes.
  rrect(ctx, -14, -4, 38, 7, 3);
  ctx.fillStyle = '#0a0608'; ctx.fill();
  ctx.fillStyle = look.eye;
  ctx.shadowColor = look.eye; ctx.shadowBlur = 8;
  ctx.fillRect(4, -2.5, 8, 3);
  ctx.fillRect(-9, -2.5, 6, 3);
  ctx.shadowBlur = 0;
  void pose;
}

function drawGlasses(ctx: CanvasRenderingContext2D, round: boolean): void {
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  if (round) { ctx.arc(10, -2, 7.5, 0, Math.PI * 2); ctx.moveTo(-1.5, -2); ctx.arc(-9, -2, 6.5, 0, Math.PI * 2); }
  else { ctx.rect(3, -8, 15, 11); ctx.rect(-15, -8, 12, 11); }
  ctx.moveTo(3, -3); ctx.lineTo(-3, -3);
  ctx.stroke();
  // Glint.
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.moveTo(6, -8); ctx.lineTo(10, -8); ctx.lineTo(5, 2); ctx.lineTo(2, 2); ctx.closePath(); ctx.fill();
  ctx.globalAlpha = 1;
}

function drawBeret(ctx: CanvasRenderingContext2D, look: EnemyLook): void {
  ctx.beginPath();
  ctx.ellipse(-2, -26, 26, 9, -0.15, 0, Math.PI * 2);
  fillStroke(ctx, '#2b2440');
  ctx.beginPath(); ctx.moveTo(-2, -35); ctx.lineTo(0, -40); ctx.lineTo(2, -35); ctx.stroke();
  void look;
}

function drawCrown(ctx: CanvasRenderingContext2D, look: EnemyLook): void {
  ctx.beginPath();
  ctx.moveTo(-14, -24); ctx.lineTo(-10, -36); ctx.lineTo(-4, -28); ctx.lineTo(2, -40); ctx.lineTo(8, -28); ctx.lineTo(14, -36); ctx.lineTo(16, -24); ctx.closePath();
  fillStroke(ctx, look.accent, 2);
}

// ── weapons ──────────────────────────────────────────────────────────────

function drawWeapon(ctx: CanvasRenderingContext2D, weapon: EnemyLook['weapon'], look: EnemyLook, t: number): void {
  ctx.save();
  ctx.translate(0, 17);
  // Blades are drawn along -y; turn them so they leave the fist forward, a little up.
  ctx.rotate(1.35);
  switch (weapon) {
    case 'katana':
    case 'bokken': {
      const wood = weapon === 'bokken';
      // Handle.
      rrect(ctx, -2.5, -4, 5, 14, 2);
      fillStroke(ctx, wood ? '#6b4423' : '#2a1d2e', 1.8);
      // Guard.
      if (!wood) { ctx.beginPath(); ctx.ellipse(0, -5, 6, 2.4, 0, 0, Math.PI * 2); fillStroke(ctx, '#c9a227', 1.6); }
      // Blade, slightly curved, pointing forward/up along -y then rotated.
      ctx.beginPath();
      ctx.moveTo(-2, -6);
      ctx.quadraticCurveTo(-3, -40, 4, -66);
      ctx.lineTo(5, -62);
      ctx.quadraticCurveTo(3, -36, 2.5, -6);
      ctx.closePath();
      fillStroke(ctx, wood ? '#a87b4f' : '#e9eef5', 1.8);
      if (!wood) {
        ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(1.5, -10); ctx.quadraticCurveTo(1, -38, 4, -60); ctx.stroke();
      }
      break;
    }
    case 'greatsword': {
      rrect(ctx, -3, -4, 6, 16, 2); fillStroke(ctx, '#2a1d2e', 1.8);
      rrect(ctx, -11, -8, 22, 5, 2); fillStroke(ctx, look.accent, 1.8);
      ctx.beginPath(); ctx.moveTo(-7, -8); ctx.lineTo(-6, -76); ctx.lineTo(0, -86); ctx.lineTo(6, -76); ctx.lineTo(7, -8); ctx.closePath();
      fillStroke(ctx, '#9aa0b0', 2);
      ctx.strokeStyle = look.eye; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.7;
      ctx.beginPath(); ctx.moveTo(0, -14); ctx.lineTo(0, -74); ctx.stroke(); ctx.globalAlpha = 1;
      break;
    }
    case 'blade': {
      rrect(ctx, -2.5, -4, 5, 12, 2); fillStroke(ctx, '#2a2f45', 1.8);
      ctx.shadowColor = look.accent; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.moveTo(-2, -6); ctx.lineTo(-1, -58); ctx.lineTo(3, -64); ctx.lineTo(3, -6); ctx.closePath();
      ctx.fillStyle = look.accent; ctx.fill();
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, -56, 1.5, 48);
      ctx.shadowBlur = 0;
      break;
    }
    case 'kunai': {
      rrect(ctx, -2, -2, 4, 9, 1.5); fillStroke(ctx, '#3a2f2a', 1.6);
      ctx.beginPath(); ctx.arc(0, 9, 3, 0, Math.PI * 2); ctx.strokeStyle = INK; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-4, -2); ctx.lineTo(0, -20); ctx.lineTo(4, -2); ctx.closePath();
      fillStroke(ctx, '#c9ced9', 1.6);
      break;
    }
    case 'club': {
      ctx.beginPath(); ctx.moveTo(-3, 6); ctx.lineTo(-7, -52); ctx.quadraticCurveTo(0, -60, 7, -52); ctx.lineTo(3, 6); ctx.closePath();
      fillStroke(ctx, '#3a2a22', 2);
      ctx.fillStyle = '#c9ced9';
      for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(i % 2 ? 4 : -4, -16 - i * 6, 1.8, 0, Math.PI * 2); ctx.fill(); }
      break;
    }
    case 'claw': {
      ctx.shadowColor = look.accent; ctx.shadowBlur = 10;
      ctx.fillStyle = look.accent; ctx.globalAlpha = 0.8 + Math.sin(t * 8) * 0.15;
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath(); ctx.moveTo(i * 4, 0); ctx.quadraticCurveTo(i * 7, -12, i * 3 + 2, -22); ctx.lineTo(i * 4 + 1, -2); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      break;
    }
    case 'pen': {
      rrect(ctx, -3.5, -40, 7, 50, 3); fillStroke(ctx, '#15131c', 2);
      rrect(ctx, -3.5, -40, 7, 6, 2); fillStroke(ctx, look.accent, 1.6);
      ctx.beginPath(); ctx.moveTo(-3.5, -40); ctx.lineTo(0, -56); ctx.lineTo(3.5, -40); ctx.closePath(); fillStroke(ctx, '#d4af37', 1.6);
      ctx.fillStyle = '#0b0b10'; ctx.beginPath(); ctx.arc(0, -54, 1.6, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case 'fist':
    default:
      break;
  }
  ctx.restore();
}

// ── non-humanoids ────────────────────────────────────────────────────────

function drawLantern(ctx: CanvasRenderingContext2D, look: EnemyLook, pose: Pose): void {
  const y = -54 + Math.sin(pose.time * 2.4) * 4 - pose.float;
  ctx.save();
  ctx.translate(0, y);
  // Glow.
  const g = ctx.createRadialGradient(0, 0, 4, 0, 0, 60);
  g.addColorStop(0, 'rgba(255,190,90,0.45)');
  g.addColorStop(1, 'rgba(255,190,90,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 60, 0, Math.PI * 2); ctx.fill();
  // Paper body.
  ctx.beginPath(); ctx.ellipse(0, 0, 28, 38, 0, 0, Math.PI * 2);
  fillStroke(ctx, '#f6e7c8');
  ctx.strokeStyle = 'rgba(120,80,40,0.5)'; ctx.lineWidth = 1.4;
  for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.ellipse(0, i * 9, 27 - Math.abs(i) * 3, 2, 0, 0, Math.PI); ctx.stroke(); }
  rrect(ctx, -14, -42, 28, 7, 2); fillStroke(ctx, '#2a1d1a', 2);
  rrect(ctx, -14, 35, 28, 7, 2); fillStroke(ctx, '#2a1d1a', 2);
  // Tear (mouth) and tongue.
  ctx.beginPath(); ctx.moveTo(-14, 10); ctx.quadraticCurveTo(4, 26, 20, 8); ctx.quadraticCurveTo(4, 16, -14, 10);
  ctx.fillStyle = '#3a0d10'; ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(4, 16); ctx.quadraticCurveTo(10, 40 + Math.sin(pose.time * 5) * 4, 0, 44); ctx.quadraticCurveTo(-2, 30, 0, 16);
  fillStroke(ctx, '#e8506a', 1.8);
  // One big eye.
  drawEye(ctx, 4, -10, 1.6, look.eye, pose.eyes === 'normal' ? 'normal' : pose.eyes);
  ctx.restore();
}

function drawDrone(ctx: CanvasRenderingContext2D, look: EnemyLook, pose: Pose): void {
  const y = -62 + Math.sin(pose.time * 3) * 5 - pose.float;
  ctx.save();
  ctx.translate(0, y);
  // Rotors.
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.translate(side * 30, -16);
    ctx.fillStyle = 'rgba(200,220,255,0.35)';
    ctx.beginPath(); ctx.ellipse(0, 0, 18, 3 + Math.abs(Math.sin(pose.time * 40)) * 2, 0, 0, Math.PI * 2); ctx.fill();
    rrect(ctx, -2, -2, 4, 14, 2); fillStroke(ctx, '#3a3f55', 1.6);
    ctx.restore();
  }
  ctx.beginPath(); ctx.ellipse(0, 0, 30, 22, 0, 0, Math.PI * 2);
  fillStroke(ctx, look.skin);
  ctx.beginPath(); ctx.ellipse(0, 6, 30, 12, 0, 0, Math.PI);
  ctx.fillStyle = shade(look.skin, -0.3); ctx.fill();
  // Lens.
  ctx.beginPath(); ctx.arc(8, -2, 11, 0, Math.PI * 2);
  fillStroke(ctx, '#11131f', 2.4);
  ctx.shadowColor = look.eye; ctx.shadowBlur = 14;
  ctx.beginPath(); ctx.arc(9, -2, 5, 0, Math.PI * 2); ctx.fillStyle = look.eye; ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(6, -5, 1.8, 0, Math.PI * 2); ctx.fill();
  // Under-gun.
  rrect(ctx, 6, 18, 22, 5, 2); fillStroke(ctx, '#2a2f45', 1.6);
  ctx.restore();
}

function drawMecha(ctx: CanvasRenderingContext2D, look: EnemyLook, pose: Pose): void {
  ctx.save();
  ctx.scale(1.05, 1.05);
  // Legs.
  rrect(ctx, -16, -26, 12, 26, 3); fillStroke(ctx, shade(look.outfit, -0.15));
  rrect(ctx, 4, -26, 12, 26, 3); fillStroke(ctx, look.outfit);
  rrect(ctx, -19, -6, 18, 7, 2); fillStroke(ctx, look.hair);
  rrect(ctx, 1, -6, 18, 7, 2); fillStroke(ctx, look.hair);
  // Torso.
  ctx.beginPath(); ctx.moveTo(-22, -26); ctx.lineTo(-26, -62); ctx.lineTo(26, -62); ctx.lineTo(22, -26); ctx.closePath();
  fillStroke(ctx, look.outfit);
  rrect(ctx, -12, -54, 24, 14, 3); fillStroke(ctx, look.hair);
  ctx.shadowColor = look.eye; ctx.shadowBlur = 12;
  ctx.beginPath(); ctx.arc(0, -47, 4, 0, Math.PI * 2); ctx.fillStyle = look.eye; ctx.fill();
  ctx.shadowBlur = 0;
  // Shoulders.
  for (const side of [-1, 1]) { rrect(ctx, side * 24 - 9, -66, 18, 14, 4); fillStroke(ctx, look.hair); }
  // Head.
  ctx.beginPath(); ctx.moveTo(-12, -62); ctx.lineTo(-14, -80); ctx.lineTo(0, -88); ctx.lineTo(14, -80); ctx.lineTo(12, -62); ctx.closePath();
  fillStroke(ctx, look.outfit);
  // V-fin.
  ctx.beginPath(); ctx.moveTo(0, -82); ctx.lineTo(-16, -98); ctx.lineTo(-4, -84); ctx.lineTo(4, -84); ctx.lineTo(16, -98); ctx.closePath();
  fillStroke(ctx, '#f2c14e', 1.8);
  rrect(ctx, -8, -76, 18, 5, 2);
  ctx.fillStyle = '#0a0a12'; ctx.fill();
  ctx.fillStyle = pose.eyes === 'dead' ? '#444' : look.eye; ctx.shadowColor = look.eye; ctx.shadowBlur = 10;
  ctx.fillRect(-4, -75, 12, 3);
  ctx.shadowBlur = 0;
  // Arm + greatsword.
  ctx.save();
  ctx.translate(20, -58);
  ctx.rotate(pose.arm);
  drawWeapon(ctx, 'greatsword', look, pose.time);
  rrect(ctx, -6, -4, 12, 24, 4); fillStroke(ctx, look.outfit);
  ctx.restore();
  ctx.restore();
}
