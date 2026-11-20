/**
 * Draws the run. Reads the sim; never writes to it. Everything visual that is
 * not in the sim (shake, particles, hit-stop) lives here, so the game can look
 * as loud as it likes without touching determinism.
 */
import {
  ARCS, BOONS_BY_ID, BREAK_TICKS, CHARACTERS, type CharacterDef, FLOORS, PAYOUT_TIERS, CLEAR_PAYOUT, payoutFor,
  type Attack, type SimEvent, type TowerSim,
} from '@tower';
import { basePose, drawChar, type Gear, type Pose } from './chars';

const TPS = 60;
const TAUGHT_KEY = 'tower-taught-v1';
export function leftHanded(): boolean {
  try { return localStorage.getItem('tower-left') === '1'; } catch { return false; }
}
function loadTaught(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(TAUGHT_KEY) ?? '[]') as string[]); } catch { return new Set(); }
}
const FONT = '-apple-system, "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", system-ui, sans-serif';

interface Particle { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number; kind: 'spark' | 'petal' | 'dust' | 'shard' | 'ink'; rot: number; vr: number }
interface Pop { text: string; x: number; y: number; life: number; max: number; color: string; size: number; jp: boolean; rot: number }
interface Slash { x1: number; y1: number; x2: number; y2: number; life: number; max: number; color: string; width: number }

export interface Layout {
  w: number; h: number; dpr: number; top: number; bottom: number;
  ground: number; heroX: number; enemyX: number; strikeX: number; scale: number;
  dodge: { x: number; y: number; w: number; h: number };
}

export class Stage {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  L!: Layout;
  #bg: HTMLCanvasElement | null = null;
  #bgFloor = -1;
  #prevBg: HTMLCanvasElement | null = null;
  #ascendAt = -9;
  #particles: Particle[] = [];
  #pops: Pop[] = [];
  #slashes: Slash[] = [];
  #shake = 0;
  #flash = 0;
  #flashColor = '#ffffff';
  #impact = 0;
  #hitstop = 0;
  #speedlines = 0;
  #now = 0;
  #heroAnim: { kind: 'parry' | 'perfect' | 'dodge' | 'hurt' | 'whiff' | 'counter' | 'dash' | 'none'; t: number } = { kind: 'none', t: 0 };
  #enemyAnim: { kind: 'recoil' | 'stagger' | 'grin' | 'swingthrough' | 'none'; t: number } = { kind: 'none', t: 0 };
  #enemyX = 0;
  #enemyHurt = 0;
  #breakAt = -1;
  #introAt = 0;
  #deadAt = -1;
  #floorClearedAt = -1;
  #lastHeroHit = -99;
  #hints = new Map<string, number>();
  #hint: { text: string; color: string; until: number } | null = null;
  #dodgePressed = 0;
  #redVisible = false;
  #redLastSeen = -9;
  #redSince = -9;
  #zoom = 0;
  #taught = loadTaught();
  /** Called the first time a lesson comes up; the game pauses and shows its card. */
  onTeach: ((key: string) => void) | null = null;
  #toldFeint = new Set<number>();
  #savedBy: { text: string; at: number } | null = null;
  #erased: { text: string; at: number } | null = null;
  #twistAt = -1;
  /** Tells the player which input is expected; switched off past floor 10. */
  ringsOn = true;
  /** Who the player is fighting as. */
  hero: CharacterDef = CHARACTERS[0]!;
  get #gear(): Gear { return { scarf: this.hero.scarf, headband: this.hero.headband }; }
  dpr = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false })!;
  }

  resize(w: number, h: number, dpr: number, top: number, bottom: number): void {
    this.dpr = dpr;
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    const scale = Math.min(w / 390, h / 760) * 2.0;
    const padH = Math.max(112, h * 0.17);
    const ground = h - bottom - padH - 34;
    this.L = {
      w, h, dpr, top, bottom, ground, scale,
      heroX: w * 0.28, enemyX: w * 0.79, strikeX: w * 0.28 + 56 * scale,
      // Shorter than the pad area and kept low, so it never covers the fighters' feet.
      dodge: { x: leftHanded() ? 16 : w * 0.52, y: h - bottom - (padH - 24) * 0.7 - 6, w: w * 0.48 - 16, h: (padH - 24) * 0.7 },
    };
    this.#enemyX = this.L.enemyX;
    this.#bgFloor = -1;
  }

  /** True when a pointer at (x, y) is on the DODGE pad. */
  isDodge(x: number, y: number): boolean {
    // DODGE only exists while a red attack is coming (and a beat after): the rest of the time
    // that corner is just more of the screen you tap to parry.
    if (!this.#dodgeLive()) return false;
    const d = this.L.dodge;
    return x >= d.x - 8 && x <= d.x + d.w + 8 && y >= d.y - 12 && y <= d.y + d.h + 8;
  }

  #dodgeLive(): boolean {
    return this.#redVisible || this.#now - this.#redLastSeen < 0.35;
  }

  pressDodge(): void {
    this.#dodgePressed = this.#now;
  }

  // ── events ─────────────────────────────────────────────────────────────

  onEvent(e: SimEvent, sim: TowerSim): void {
    const L = this.L;
    const s = L.scale;
    const heroChest = { x: L.heroX + 10 * s, y: L.ground - 55 * s };
    switch (e.type) {
      case 'floor':
        this.#introAt = this.#now;
        this.#breakAt = -1;
        this.#floorClearedAt = -1;
        this.#enemyX = L.enemyX + 120;
        this.#enemyAnim = { kind: 'none', t: this.#now };
        this.ringsOn = sim.floor <= 10;
        this.#hint = null;
        this.#savedBy = null;
        break;
      case 'tele': {
        const a = sim.attacks.find((x) => x.id === e.attack);
        if (a) this.#teachFor(a, sim);
        break;
      }
      case 'stance':
        this.#hintOnce('stance', 'BLUE AURA: don’t touch!', '#6ab8ff', 2);
        break;
      case 'parry': {
        const x = (heroChest.x + L.strikeX) / 2 + 14 * s;
        const y = heroChest.y - 6 * s;
        this.#heroAnim = { kind: e.perfect ? 'perfect' : 'parry', t: this.#now };
        this.#enemyAnim = { kind: 'recoil', t: this.#now };
        this.#sparks(x, y, e.perfect ? 26 : 14, e.perfect ? '#fff6b0' : '#ffffff', e.perfect ? 9 : 6);
        this.#pop(e.perfect ? 'キィン!' : 'キン!', x + 8, y - 34 * s, e.perfect ? '#fff27a' : '#ffffff', e.perfect ? 34 : 26, true);
        if (e.perfect) {
          this.#zoom = 0.06;
          this.#pop('PERFECT', x, y - 62 * s, '#ffd23f', 16, false);
          this.#impact = 2;
          this.#hitstop = 0.07;
          this.#shake = Math.max(this.#shake, 7);
          this.#speedlines = 0.25;
        } else {
          this.#hitstop = 0.035;
          this.#shake = Math.max(this.#shake, 3);
        }
        this.#enemyHurt = this.#now;
        break;
      }
      case 'dodge':
        this.#heroAnim = { kind: 'dodge', t: this.#now };
        this.#enemyAnim = { kind: 'swingthrough', t: this.#now };
        this.#pop('ヒュッ', heroChest.x - 30 * s, heroChest.y - 30 * s, '#bfe8ff', 22, true);
        for (let i = 0; i < 10; i++) this.#particles.push({ x: heroChest.x, y: L.ground - 4, vx: -60 - Math.random() * 120, vy: -Math.random() * 40, life: 0.5, max: 0.5, color: 'rgba(255,255,255,0.6)', size: 3 + Math.random() * 4, kind: 'dust', rot: 0, vr: 0 });
        break;
      case 'opening':
        this.#pop('CHANCE!', this.#enemyX, L.ground - 175 * s, '#ffd23f', 20, false);
        this.#hintOnce('opening', 'OPENING: tap to counter!', '#ffd23f', 3);
        break;
      case 'counter':
        this.#heroAnim = { kind: 'counter', t: this.#now };
        this.#enemyAnim = { kind: 'stagger', t: this.#now };
        this.#slashes.push({ x1: L.strikeX - 40 * s, y1: L.ground - 110 * s, x2: L.strikeX + 90 * s, y2: L.ground - 10 * s, life: 0.25, max: 0.25, color: '#ffffff', width: 10 });
        this.#pop('ズバッ!', L.strikeX + 30 * s, L.ground - 120 * s, '#ffffff', 34, true);
        this.#shake = Math.max(this.#shake, 9);
        this.#hitstop = 0.08;
        this.#impact = 2;
        this.#enemyHurt = this.#now;
        break;
      case 'hit':
        if (e.cause === 'graze') {
          this.#pop('GRAZED', heroChest.x + 20 * s, heroChest.y - 70 * s, '#ffb0b0', 16, false);
          this.#hintOnce('graze', 'Dodging a white strike grazes you. TAP it instead.', '#ffb0b0', 2);
          this.#heroAnim = { kind: 'hurt', t: this.#now };
          this.#shake = Math.max(this.#shake, 5);
          break;
        }
        this.#heroAnim = { kind: 'hurt', t: this.#now };
        this.#lastHeroHit = this.#now;
        this.#flash = 0.35;
        this.#flashColor = '#ff2a3a';
        this.#shake = Math.max(this.#shake, 12);
        this.#hitstop = 0.09;
        this.#pop('ドン!', heroChest.x, heroChest.y - 40 * s, '#ff5b69', 36, true);
        if (e.cause === 'crushed') this.#pop('RED = DODGE', heroChest.x + 30 * s, heroChest.y - 80 * s, '#ffb0b0', 15, false);
        if (e.cause === 'countered') this.#pop('COUNTERED', heroChest.x + 30 * s, heroChest.y - 80 * s, '#9fd0ff', 15, false);
        if (e.cause === 'feint') this.#pop('FEINT!', heroChest.x + 30 * s, heroChest.y - 80 * s, '#ffe08a', 15, false);
        this.#sparks(heroChest.x, heroChest.y, 16, '#ff5b69', 7);
        break;
      case 'bitten':
        this.#enemyAnim = { kind: 'grin', t: this.#now };
        this.#pop('FEINT!', L.strikeX + 20 * s, L.ground - 120 * s, '#ffe08a', 20, false);
        this.#hintOnce('bitten', 'Yellow edge = FEINT. Wait for the real one.', '#ffe08a', 3);
        break;
      case 'whiff':
        this.#heroAnim = { kind: 'whiff', t: this.#now };
        if (e.lockout) this.#pop('…', heroChest.x + 26 * s, heroChest.y - 54 * s, '#a7afbe', 22, false);
        break;
      case 'saved': {
        const text = e.by === 'friend' ? 'POWER OF FRIENDSHIP!' : e.by === 'flashback' ? 'FLASHBACK: never happened' : e.by === 'plot_armor' ? 'PLOT ARMOR!' : '';
        if (text) this.#savedBy = { text, at: this.#now };
        else this.#pop('MISS', heroChest.x + 20 * s, heroChest.y - 60 * s, '#ffb0b0', 18, false);
        this.#sparks(heroChest.x, heroChest.y, 18, '#ffe08a', 6);
        break;
      }
      case 'break':
        this.#breakAt = this.#now;
        this.#enemyAnim = { kind: 'stagger', t: this.#now };
        this.#speedlines = 1.4;
        break;
      case 'cleared':
        this.#floorClearedAt = this.#now;
        break;
      case 'heal':
        this.#pop('+♥', L.heroX, L.ground - 140 * s, '#ff8fa8', 24, false);
        break;
      case 'twist':
        this.#twistAt = this.#now;
        this.#shake = 14;
        this.#impact = 3;
        break;
      case 'erased':
        this.#erased = { text: BOONS_BY_ID[e.boon].name, at: this.#now };
        break;
      case 'dead':
        this.#deadAt = this.#now;
        this.#heroAnim = { kind: 'hurt', t: this.#now };
        this.#impact = 3;
        this.#shake = 16;
        this.#hitstop = 0.25;
        break;
      case 'won':
        this.#deadAt = this.#now;
        break;
      default:
        break;
    }
  }

  #teachFor(a: Attack, sim: TowerSim): void {
    const heavyLike = a.twisted ? a.kind !== 'heavy' && a.kind !== 'stance' : a.kind === 'heavy';
    if (sim.floor <= 2 && a.kind === 'slash') this.#hintOnce('slash', 'TAP when the strike lands!', '#ffffff', 4);
    if (a.kind === 'kunai') this.#hintOnce('kunai', 'KUNAI: tap when it reaches you', '#ffffff', 2);
    if (a.kind === 'heavy' && !a.twisted) this.#hintOnce('heavy', 'RED = hit DODGE!', '#ff5b69', 4);
    if (a.delayed) this.#hintOnce('delayed', 'It’s holding… wait for it', '#c9a2ff', 2);
    if (a.twisted) this.#hintOnce('twist', 'PLOT TWIST: the colours lie!', '#ffd23f', 3);
    void heavyLike;
  }

  #hintOnce(key: string, _text: string, _color: string, _times: number): void {
    // Each lesson is taught once, ever, by a card that pauses the fight. No banners over the duel.
    const k = key === 'bitten' ? 'feint' : key;
    if (this.#taught.has(k) || !this.onTeach) return;
    this.#taught.add(k);
    try { localStorage.setItem(TAUGHT_KEY, JSON.stringify([...this.#taught])); } catch { /* private mode */ }
    this.onTeach(k);
  }

  #sparks(x: number, y: number, n: number, color: string, speed: number): void {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = (0.4 + Math.random()) * speed * 60;
      this.#particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, life: 0.35 + Math.random() * 0.25, max: 0.6, color, size: 2 + Math.random() * 2.5, kind: 'spark', rot: a, vr: 0 });
    }
  }

  #pop(text: string, x: number, y: number, color: string, size: number, jp: boolean): void {
    // One big sound word and one small label on screen at a time: stacked pops read as mush.
    this.#pops = this.#pops.filter((p) => p.jp !== jp || p.max - p.life > 0.45);
    if (this.#pops.length >= 3) this.#pops.shift();
    this.#pops.push({ text, x, y, life: 0.75, max: 0.75, color, size, jp, rot: (Math.random() - 0.5) * 0.25 });
  }

  // ── draw ───────────────────────────────────────────────────────────────

  draw(sim: TowerSim, frac: number, now: number, dt: number): void {
    this.#now = now;
    const { ctx, L } = this;
    const tick = sim.tick + frac;
    const s = L.scale;

    if (this.#hitstop > 0) this.#hitstop -= dt;
    const frozen = this.#hitstop > 0;

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    // Shake.
    this.#shake *= Math.pow(0.0015, dt);
    const sx = (Math.random() - 0.5) * this.#shake;
    const sy = (Math.random() - 0.5) * this.#shake;
    ctx.translate(sx, sy);
    // Zoom-punch: a perfect parry pushes the camera in for a moment.
    if (this.#zoom > 0.001) {
      const z = 1 + this.#zoom;
      ctx.translate(L.strikeX, L.ground - 60 * s);
      ctx.scale(z, z);
      ctx.translate(-L.strikeX, -(L.ground - 60 * s));
      this.#zoom *= Math.pow(0.002, dt);
    }

    this.#drawBackground(sim);
    if (sim.twistActive) {
      // Phase three: the page goes to ink and the margins fill with rewrites.
      ctx.fillStyle = 'rgba(5,5,10,0.78)';
      ctx.fillRect(-20, -20, L.w + 40, L.ground + 20);
      ctx.save();
      ctx.globalAlpha = 0.12 + Math.sin(this.#now * 2) * 0.04;
      ctx.font = `900 ${L.w * 0.42}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffd23f';
      ctx.fillText('改稿', L.w / 2, L.ground * 0.62);
      ctx.restore();
    }
    this.#drawSpeedlines(dt);

    // Characters.
    const enemyPose = this.#enemyPose(sim, tick, frozen);
    const heroPose = this.#heroPose(sim, tick);
    const e = sim.spec.enemy;
    const eScale = s * (sim.spec.twist ? 1.05 : sim.spec.boss ? 1.12 : 1);

    // Ground shadows.
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.beginPath(); ctx.ellipse(heroPose.x, L.ground + 2, 30 * s, 7 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(this.#enemyX, L.ground + 2, 32 * eScale, 7 * eScale, 0, 0, Math.PI * 2); ctx.fill();

    this.#drawAuras(sim, tick);
    if (!this.#impact) {
      drawChar(ctx, e.look, this.#enemyX, L.ground, eScale, -1, enemyPose.pose);
      drawChar(ctx, this.hero.look, heroPose.x, L.ground, s, 1, heroPose.pose, this.#gear);
    }
    this.#drawKunai(sim, tick);
    this.#drawTelegraphs(sim, tick);
    if (this.ringsOn) this.#drawRings(sim, tick);
    this.#drawSlashes(dt);
    this.#drawParticles(dt, sim);
    this.#drawPops(dt);

    // Impact frame: a single inverted, high-contrast frame.
    if (this.#impact > 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-20, -20, L.w + 40, L.h + 40);
      const black: Pose = { ...enemyPose.pose, tint: '#000000', tintAmount: 1 };
      drawChar(ctx, e.look, this.#enemyX, L.ground, eScale, -1, black);
      drawChar(ctx, this.hero.look, heroPose.x, L.ground, s, 1, { ...heroPose.pose, tint: '#000000', tintAmount: 1 }, this.#gear);
      this.#impact -= 1;
    }

    if (this.#flash > 0) {
      ctx.globalAlpha = Math.min(1, this.#flash);
      ctx.fillStyle = this.#flashColor;
      ctx.fillRect(-20, -20, L.w + 40, L.h + 40);
      ctx.globalAlpha = 1;
      this.#flash -= dt * 2.2;
    }

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    // A red attack lights the screen's edge: you know danger is coming without looking for it.
    if (this.#redVisible) {
      const pulse = 0.35 + Math.sin(this.#now * 16) * 0.12;
      const eg = ctx.createLinearGradient(0, 0, 0, L.h);
      ctx.save();
      ctx.strokeStyle = `rgba(255,42,58,${pulse * 0.7})`;
      ctx.lineWidth = 6;
      ctx.strokeRect(5, 5, L.w - 10, L.h - 10);
      ctx.restore();
      void eg;
    }
    this.#drawBreak(sim);
    this.#drawHud(sim);
    this.#drawPads(sim);
    this.#drawHint();
    this.#drawIntro(sim);
    this.#drawBanners();
    this.#drawEnd(sim);
    // Low-health vignette.
    if (sim.hp <= 2 && !sim.over) {
      const g = ctx.createRadialGradient(L.w / 2, L.h / 2, L.h * 0.3, L.w / 2, L.h / 2, L.h * 0.75);
      g.addColorStop(0, 'rgba(255,0,40,0)');
      g.addColorStop(1, `rgba(255,0,40,${0.18 + Math.sin(now * 6) * 0.06})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, L.w, L.h);
    }
    void TPS;
  }

  // ── background ─────────────────────────────────────────────────────────

  #drawBackground(sim: TowerSim): void {
    const { ctx, L } = this;
    if (!this.#bg || this.#bgFloor !== sim.floor) {
      this.#prevBg = this.#bgFloor > 0 ? this.#bg : null;
      this.#bg = this.#paintBackground(sim.spec.arc, sim.spec.boss, sim.floor);
      this.#bgFloor = sim.floor;
      this.#ascendAt = this.#now;
    }
    // Climbing: the old floor drops away below as the new one comes down from above.
    const at = this.#now - this.#ascendAt;
    if (this.#prevBg && at < 0.5) {
      const p = easeOut(Math.min(1, at / 0.5));
      ctx.drawImage(this.#prevBg, -20, -20 + p * (L.h + 40), L.w + 40, L.h + 40);
      ctx.drawImage(this.#bg!, -20, -20 - (1 - p) * (L.h + 40), L.w + 40, L.h + 40);
    } else {
      ctx.drawImage(this.#bg!, -20, -20, L.w + 40, L.h + 40);
    }
    // Ambient particles per arc.
    const arc = sim.spec.arc;
    if (Math.random() < (arc === 3 ? 0.35 : 0.06)) {
      const kind = arc === 0 ? 'petal' : arc === 1 ? 'petal' : arc === 3 ? 'dust' : arc === 4 ? 'spark' : arc === 5 ? 'ink' : 'dust';
      const color = arc === 0 ? '#ffc4d6' : arc === 1 ? '#8fbf6b' : arc === 2 ? 'rgba(170,200,255,0.8)' : arc === 3 ? 'rgba(120,220,255,0.7)' : arc === 4 ? '#ff7a3a' : 'rgba(255,255,255,0.7)';
      this.#particles.push({
        x: Math.random() * L.w, y: arc === 4 ? L.ground : -10, vx: arc === 3 ? -30 : 20 + Math.random() * 30,
        vy: arc === 4 ? -30 - Math.random() * 40 : arc === 3 ? 380 : 30 + Math.random() * 40,
        life: 6, max: 6, color, size: arc === 3 ? 1.2 : 2 + Math.random() * 2.5, kind: arc === 3 ? 'shard' : kind, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 4,
      });
    }
  }

  #paintBackground(arc: number, boss: boolean, floor: number): HTMLCanvasElement {
    const { L } = this;
    const c = document.createElement('canvas');
    const W = L.w + 40, H = L.h + 40;
    c.width = Math.round(W * this.dpr);
    c.height = Math.round(H * this.dpr);
    const g = c.getContext('2d')!;
    g.scale(this.dpr, this.dpr);
    g.translate(20, 20);
    const a = ARCS[arc]!;
    const sky = g.createLinearGradient(0, 0, 0, L.ground);
    sky.addColorStop(0, a.sky[0]);
    sky.addColorStop(1, a.sky[1]);
    g.fillStyle = sky;
    g.fillRect(-20, -20, W, L.ground + 20);
    const rnd = mulberry(floor * 977 + 13);

    if (arc === 0) {
      // Afternoon clouds, a fence, the water tower.
      g.fillStyle = 'rgba(255,255,255,0.7)';
      for (let i = 0; i < 5; i++) cloud(g, rnd() * L.w, 60 + rnd() * L.ground * 0.35, 30 + rnd() * 30);
      g.fillStyle = a.far;
      g.fillRect(L.w * 0.08, L.ground - 150, 70, 110);
      g.beginPath(); g.ellipse(L.w * 0.08 + 35, L.ground - 150, 42, 18, 0, 0, Math.PI * 2); g.fill();
      for (let x = -10; x < L.w + 20; x += 18) g.fillRect(x, L.ground - 48, 3, 48);
      g.fillRect(-10, L.ground - 50, L.w + 30, 4);
      g.fillRect(-10, L.ground - 26, L.w + 30, 3);
    } else if (arc === 1) {
      // Bamboo / pines and moonlight.
      g.fillStyle = 'rgba(255,255,230,0.85)';
      g.beginPath(); g.arc(L.w * 0.5, L.ground * 0.42, 34, 0, Math.PI * 2); g.fill();
      const moonX = L.w * 0.5;
      for (let layer = 0; layer < 2; layer++) {
        g.fillStyle = layer ? '#12221b' : a.far;
        for (let i = 0; i < 14; i++) {
          const x = rnd() * L.w;
          const w = 10 + rnd() * 10;
          // Keep the moon whole: no stalk in front of it.
          if (x + w > moonX - 40 && x < moonX + 40) continue;
          g.fillRect(x, 0, w, L.ground);
          for (let y = 30; y < L.ground; y += 40 + rnd() * 30) g.fillRect(x - 2, y, w + 4, 3);
        }
      }
    } else if (arc === 2) {
      // Torii gate, lanterns, spirit fog.
      g.fillStyle = 'rgba(255,240,255,0.9)';
      g.beginPath(); g.arc(L.w * 0.18, L.ground * 0.4, 26, 0, Math.PI * 2); g.fill();
      for (let i = 0; i < 50; i++) { g.fillStyle = `rgba(255,255,255,${rnd() * 0.6})`; g.fillRect(rnd() * L.w, rnd() * L.ground * 0.6, 1.5, 1.5); }
      const tx = L.w * 0.5, ty = L.ground;
      g.fillStyle = '#c4243a';
      g.fillRect(tx - 110, ty - 210, 16, 210);
      g.fillRect(tx + 94, ty - 210, 16, 210);
      g.beginPath(); g.moveTo(tx - 150, ty - 222); g.quadraticCurveTo(tx, ty - 240, tx + 150, ty - 222); g.lineTo(tx + 140, ty - 205); g.quadraticCurveTo(tx, ty - 220, tx - 140, ty - 205); g.fill();
      g.fillRect(tx - 125, ty - 182, 250, 12);
      for (const lx of [L.w * 0.1, L.w * 0.9]) {
        g.fillStyle = 'rgba(255,170,80,0.35)'; g.beginPath(); g.arc(lx, ty - 80, 26, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#ffb347'; g.fillRect(lx - 9, ty - 92, 18, 24);
        g.fillStyle = '#3a2350'; g.fillRect(lx - 3, ty - 68, 6, 68);
      }
    } else if (arc === 3) {
      // Skyline with lit windows and signs.
      for (let layer = 0; layer < 2; layer++) {
        let x = -10;
        while (x < L.w + 20) {
          const w = 34 + rnd() * 50, h = 120 + rnd() * (layer ? 200 : 300);
          g.fillStyle = layer ? '#0b0d20' : '#161940';
          g.fillRect(x, L.ground - h, w, h);
          for (let wy = L.ground - h + 8; wy < L.ground - 8; wy += 9) for (let wx = x + 5; wx < x + w - 5; wx += 8) {
            if (rnd() < (layer ? 0.25 : 0.12)) { g.fillStyle = rnd() < 0.5 ? 'rgba(255,79,216,0.8)' : 'rgba(41,227,255,0.8)'; g.fillRect(wx, wy, 3, 4); }
          }
          if (layer && rnd() < 0.4) {
            g.fillStyle = rnd() < 0.5 ? '#ff4fd8' : '#29e3ff';
            g.shadowColor = g.fillStyle; g.shadowBlur = 10;
            g.fillRect(x + 6, L.ground - h + 20, 8, 50);
            g.shadowBlur = 0;
          }
          x += w + 4;
        }
      }
    } else if (arc === 4) {
      // Red moon, spires.
      g.fillStyle = 'rgba(255,90,60,0.25)'; g.beginPath(); g.arc(L.w * 0.5, L.ground * 0.42, 90, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#ff5a3c'; g.beginPath(); g.arc(L.w * 0.5, L.ground * 0.42, 52, 0, Math.PI * 2); g.fill();
      g.fillStyle = a.far;
      for (const [x, h] of [[0.12, 260], [0.3, 200], [0.5, 320], [0.86, 240]] as const) {
        const cx = L.w * x;
        g.fillRect(cx - 22, L.ground - h, 44, h);
        g.beginPath(); g.moveTo(cx - 30, L.ground - h); g.lineTo(cx, L.ground - h - 70); g.lineTo(cx + 30, L.ground - h); g.fill();
      }
    } else {
      // The final arc: pages and ink.
      for (let i = 0; i < 18; i++) {
        g.save();
        g.translate(rnd() * L.w, rnd() * L.ground * 0.9);
        g.rotate((rnd() - 0.5) * 1.2);
        g.fillStyle = `rgba(240,236,228,${0.08 + rnd() * 0.18})`;
        g.fillRect(-22, -30, 44, 60);
        g.fillStyle = 'rgba(20,20,30,0.25)';
        for (let ly = -22; ly < 24; ly += 6) g.fillRect(-16, ly, 32 * (0.5 + rnd() * 0.5), 1.5);
        g.restore();
      }
    }
    // Depth for every arc: a far silhouette band and fog that settles on the ground.
    if (arc === 0) {
      g.fillStyle = 'rgba(120,90,130,0.35)';
      let x = -10;
      while (x < L.w + 20) { const w = 30 + rnd() * 40, h = 40 + rnd() * 70; g.fillRect(x, L.ground - 50 - h, w, h); x += w + 6; }
    } else if (arc === 2) {
      for (const lx of [L.w * 0.28, L.w * 0.72]) {
        g.fillStyle = '#2a1a3a';
        g.fillRect(lx - 7, L.ground - 46, 14, 46); g.fillRect(lx - 14, L.ground - 58, 28, 12); g.fillRect(lx - 10, L.ground - 64, 20, 6);
        g.fillStyle = 'rgba(255,190,100,0.55)'; g.fillRect(lx - 5, L.ground - 56, 10, 8);
      }
      for (let i = 0; i < 18; i++) { g.fillStyle = `rgba(200,255,170,${0.3 + rnd() * 0.5})`; g.beginPath(); g.arc(rnd() * L.w, L.ground * (0.45 + rnd() * 0.5), 1.5, 0, Math.PI * 2); g.fill(); }
    } else if (arc === 4) {
      for (const bx of [L.w * 0.08, L.w * 0.92]) {
        g.fillStyle = '#5a0d14';
        g.beginPath(); g.moveTo(bx - 16, 40); g.lineTo(bx + 16, 40); g.lineTo(bx + 16, L.ground * 0.55); g.lineTo(bx, L.ground * 0.5); g.lineTo(bx - 16, L.ground * 0.55); g.closePath(); g.fill();
        g.fillStyle = '#ffd23f'; g.font = `900 18px ${FONT}`; g.textAlign = 'center'; g.fillText('魔', bx, 90);
      }
    }
    const fog = g.createLinearGradient(0, L.ground - 90, 0, L.ground);
    fog.addColorStop(0, 'rgba(255,255,255,0)');
    fog.addColorStop(1, arc === 0 ? 'rgba(255,230,210,0.35)' : arc === 4 ? 'rgba(255,80,40,0.18)' : 'rgba(180,200,255,0.12)');
    g.fillStyle = fog;
    g.fillRect(-20, L.ground - 90, W, 90);
    if (boss) {
      const v = g.createRadialGradient(L.w / 2, L.ground * 0.6, 40, L.w / 2, L.ground * 0.6, L.h);
      v.addColorStop(0, 'rgba(0,0,0,0)');
      v.addColorStop(1, 'rgba(20,0,10,0.55)');
      g.fillStyle = v;
      g.fillRect(-20, -20, W, H);
    }
    // Ground.
    g.fillStyle = a.ground;
    g.fillRect(-20, L.ground, W, H);
    g.fillStyle = 'rgba(255,255,255,0.08)';
    g.fillRect(-20, L.ground, W, 3);
    // Pad area plate.
    const pg = g.createLinearGradient(0, L.ground + 20, 0, L.h);
    pg.addColorStop(0, 'rgba(8,10,16,0)');
    pg.addColorStop(1, 'rgba(8,10,16,0.75)');
    g.fillStyle = pg;
    g.fillRect(-20, L.ground + 20, W, H);
    return c;
  }

  #drawSpeedlines(dt: number): void {
    if (this.#speedlines <= 0) return;
    const { ctx, L } = this;
    this.#speedlines -= dt;
    const a = Math.min(1, this.#speedlines * 2);
    ctx.save();
    ctx.globalAlpha = a * 0.55;
    ctx.strokeStyle = '#ffffff';
    const cx = L.w / 2, cy = L.ground - 60 * L.scale;
    for (let i = 0; i < 46; i++) {
      const ang = Math.random() * Math.PI * 2;
      const r0 = 90 + Math.random() * 60;
      const r1 = L.h;
      ctx.lineWidth = 1 + Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * r0, cy + Math.sin(ang) * r0);
      ctx.lineTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ── characters ─────────────────────────────────────────────────────────

  /** The attack that owns the enemy's body right now. */
  #active(sim: TowerSim, tick: number): Attack | undefined {
    let best: Attack | undefined;
    for (const a of sim.attacks) {
      if (a.kind === 'kunai' || a.kind === 'stance') continue;
      if (a.tele > tick) continue;
      if (a.state !== 'pending' && tick - a.resolvedAt > 10) continue;
      if (!best || a.impact < best.impact) best = a;
    }
    return best;
  }

  #enemyPose(sim: TowerSim, tick: number, frozen: boolean): { pose: Pose } {
    const L = this.L;
    const pose = basePose(this.#now);
    pose.bob = Math.sin(this.#now * 3) * 1.2;
    pose.arm = -0.4;
    pose.eyes = sim.spec.boss ? 'glow' : 'angry';
    let target = L.enemyX;
    const a = sim.phase === 'fight' ? this.#active(sim, tick) : undefined;
    const sinceAnim = this.#now - this.#enemyAnim.t;

    if (a && a.state === 'pending') {
      const span = Math.max(1, a.impact - a.tele);
      let p = Math.max(0, Math.min(1, (tick - a.tele) / span));
      if (a.delayed) p = p < 0.82 ? p * 0.55 / 0.82 : 0.55 + (p - 0.82) / 0.18 * 0.45;
      const heavy = a.twisted ? a.kind === 'slash' : a.kind === 'heavy';
      // Wind-up: lean back, weapon up. Dash: the last 35% closes the gap so it lands on the beat.
      const dashFrom = 0.62;
      if (p < dashFrom) {
        const w = p / dashFrom;
        target = L.enemyX + 10 * w;
        pose.lean = -0.25 * w;
        pose.arm = -0.4 - 2.4 * easeOut(w);
        pose.squash = 1 + 0.06 * w;
        if (a.delayed && w > 0.6) pose.bob += Math.sin(this.#now * 60) * 1.4;
      } else {
        const w = (p - dashFrom) / (1 - dashFrom);
        const stopShort = a.kind === 'fake' ? 0.55 : 1;
        target = lerp(L.enemyX + 10, L.strikeX, easeIn(Math.min(w, stopShort) / stopShort) * stopShort + (stopShort < 1 ? 0 : 0));
        pose.lean = 0.35 * w;
        pose.arm = -2.8 + 3.4 * easeIn(w);
        pose.squash = 0.92;
        pose.wind = 1;
      }
      if (heavy) { pose.tint = '#ff2a3a'; pose.tintAmount = 0.3 + Math.sin(this.#now * 20) * 0.1; pose.eyes = 'glow'; }
      if (a.kind === 'fake' && tick >= a.tell) {
        pose.tint = '#ffd23f'; pose.tintAmount = 0.45; pose.eyes = 'smug';
        if (!this.#toldFeint.has(a.id)) {
          this.#toldFeint.add(a.id);
          this.#pop('?!', this.#enemyX, L.ground - 165 * L.scale, '#ffd23f', 30, false);
          this.#hintOnce('feint', 'YELLOW = FEINT. Don\u2019t tap. Wait for the real one!', '#ffe08a', 3);
        }
      }
      this.#enemyX = target; // exact: the body *is* the timing cue
    } else {
      if (this.#enemyAnim.kind === 'recoil' && sinceAnim < 0.25) { pose.lean = -0.4; pose.eyes = 'shock'; pose.arm = -1.5; }
      else if (this.#enemyAnim.kind === 'stagger' && sinceAnim < 0.6) { pose.lean = -0.5; pose.eyes = 'hurt'; pose.squash = 1.05; }
      else if (this.#enemyAnim.kind === 'grin' && sinceAnim < 0.5) { pose.eyes = 'smug'; pose.arm = 0.2; }
      else if (this.#enemyAnim.kind === 'swingthrough' && sinceAnim < 0.3) { pose.lean = 0.5; pose.arm = 0.7; pose.eyes = 'shock'; }
      if (sim.opening && tick <= sim.opening.to) { pose.eyes = 'shock'; pose.lean = 0.45; pose.arm = 0.8; target = L.strikeX + 20; }
      const stance = sim.attacks.find((x) => x.kind === 'stance' && x.state === 'pending' && x.tele <= tick);
      if (stance) { pose.arm = -1.5; pose.lean = -0.1; pose.eyes = 'glow'; pose.tint = '#3a8bff'; pose.tintAmount = 0.25; target = L.strikeX + 30; }
      if (!frozen) this.#enemyX += (target - this.#enemyX) * 0.16;
    }
    if (this.#now - this.#enemyHurt < 0.12) pose.flash = 0.7;

    if (sim.phase === 'break' || (sim.phase === 'boon' || sim.phase === 'intro') && this.#floorClearedAt > 0) {
      const t = this.#breakAt > 0 ? this.#now - this.#breakAt : 1;
      pose.eyes = 'dead';
      pose.lean = -0.3;
      if (sim.phase !== 'break' || t > 1.0) pose.fall = Math.min(1, (t - 1.0) / 0.3);
      if (sim.phase === 'break' && t < 1.0) { pose.eyes = 'hurt'; pose.bob = -2; }
    }
    if (sim.phase === 'intro' && this.#floorClearedAt < 0) {
      this.#enemyX += (L.enemyX - this.#enemyX) * 0.1;
      pose.eyes = sim.spec.boss ? 'glow' : 'smug';
    }
    return { pose };
  }

  #heroPose(sim: TowerSim, tick: number): { x: number; pose: Pose } {
    const L = this.L;
    const pose = basePose(this.#now + 1.3);
    pose.bob = Math.sin(this.#now * 3.2 + 1) * 1.2;
    pose.arm = -0.4;
    pose.wind = 0.3;
    let x = L.heroX;
    const t = this.#now - this.#heroAnim.t;
    switch (this.#heroAnim.kind) {
      case 'parry':
      case 'perfect':
        if (t < 0.22) { pose.arm = -1.45; pose.lean = 0.2; pose.eyes = 'angry'; x -= 8 * (1 - t / 0.22); pose.wind = 1; }
        break;
      case 'counter':
        if (t < 0.3) { pose.arm = 0.8; pose.lean = 0.5; pose.eyes = 'angry'; x += 40 * (1 - t / 0.3); pose.wind = 1; }
        break;
      case 'dodge':
        if (t < 0.3) { x -= 46 * Math.sin((t / 0.3) * Math.PI); pose.bob += 18 * Math.sin((t / 0.3) * Math.PI); pose.lean = -0.3; pose.wind = 1; }
        break;
      case 'hurt':
        if (t < 0.35) { pose.eyes = 'hurt'; pose.lean = -0.4; x -= 16 * (1 - t / 0.35); pose.tint = '#ff2a3a'; pose.tintAmount = 0.5 * (1 - t / 0.35); }
        break;
      case 'whiff':
        if (t < 0.18) { pose.arm = 0.5; pose.lean = 0.25; }
        break;
      default:
        break;
    }
    if (sim.phase === 'break' && this.#breakAt > 0) {
      const bt = this.#now - this.#breakAt;
      // Finisher: dash through the enemy.
      if (bt > 0.55 && bt < 1.1) { x = lerp(L.heroX, L.enemyX + 70 * L.scale, easeOut((bt - 0.55) / 0.15)); pose.arm = 0.8; pose.lean = 0.6; pose.wind = 1; pose.eyes = 'angry'; }
      else if (bt >= 1.1) { x = lerp(L.enemyX + 70 * L.scale, L.heroX, Math.min(1, (bt - 1.1) / 0.4)); pose.eyes = 'closed'; }
    }
    if (sim.phase === 'boon' || (sim.phase === 'intro' && this.#floorClearedAt > 0)) pose.eyes = 'closed';
    // Never let a knockback push the hero off the left edge.
    if (sim.phase !== 'break') x = Math.max(L.heroX - 24, x);
    if (sim.phase === 'dead') {
      const dt = this.#now - this.#deadAt;
      pose.fall = Math.min(1, dt / 0.5);
      pose.eyes = 'dead';
    }
    if (sim.phase === 'won') pose.eyes = 'closed';
    if (this.#now - this.#lastHeroHit < 0.08) pose.flash = 0.8;
    void tick;
    return { x, pose };
  }

  #drawAuras(sim: TowerSim, tick: number): void {
    const { ctx, L } = this;
    const a = sim.phase === 'fight' ? this.#active(sim, tick) : undefined;
    if (a && a.state === 'pending') {
      // Motion lines streaming behind a dash.
      const p = (tick - a.tele) / Math.max(1, a.impact - a.tele);
      if (p > 0.62 && p < 1.05 && a.kind !== 'fake') {
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.55)';
        for (let i = 0; i < 7; i++) {
          const y = L.ground - (20 + i * 17) * L.scale * 0.6;
          const len = (40 + ((i * 37) % 50)) * L.scale * 0.6;
          ctx.lineWidth = 1.5 + (i % 3);
          ctx.beginPath(); ctx.moveTo(this.#enemyX + 30 * L.scale * 0.6, y); ctx.lineTo(this.#enemyX + 30 * L.scale * 0.6 + len, y); ctx.stroke();
        }
        ctx.restore();
      }
      const heavyLook = a.twisted ? a.kind === 'slash' : a.kind === 'heavy';
      if (heavyLook) {
        const r = 50 * L.scale + Math.sin(this.#now * 30) * 3;
        const g = ctx.createRadialGradient(this.#enemyX, L.ground - 50 * L.scale, 10, this.#enemyX, L.ground - 50 * L.scale, r);
        g.addColorStop(0, 'rgba(255,40,50,0.45)');
        g.addColorStop(1, 'rgba(255,40,50,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(this.#enemyX, L.ground - 50 * L.scale, r, 0, Math.PI * 2); ctx.fill();
      }
    }
    const stance = sim.attacks.find((x) => x.kind === 'stance' && x.state === 'pending' && x.tele <= tick);
    if (stance) {
      const r = 72 * L.scale;
      ctx.strokeStyle = `rgba(90,170,255,${0.6 + Math.sin(this.#now * 12) * 0.25})`;
      ctx.lineWidth = 4;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.ellipse(this.#enemyX, L.ground - 50 * L.scale, r - i * 10, r * 1.2 - i * 12, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      this.#bubble(this.#enemyX, L.ground - 150 * L.scale, '構', '#6ab8ff', '#0b1630');
    }
  }

  #drawTelegraphs(sim: TowerSim, tick: number): void {
    if (sim.phase !== 'fight') return;
    const L = this.L;
    for (const a of sim.attacks) {
      if (a.state !== 'pending' || a.tele > tick || a.kind === 'stance') continue;
      const age = tick - a.tele;
      if (a.kind === 'kunai') continue;
      // One bubble: the attack about to land.
      if (a !== this.#active(sim, tick)) continue;
      const heavyLook = a.twisted ? a.kind !== 'heavy' : a.kind === 'heavy';
      const pop = Math.min(1, age / 6);
      const y = L.ground - 140 * L.scale * (sim.spec.boss ? 1.12 : 1);
      const x = this.#enemyX + 4;
      const fakeTell = a.kind === 'fake' && tick >= a.tell;
      const ring = fakeTell ? '#ffd23f' : heavyLook ? '#ff2a3a' : '#ffffff';
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.scale(0.4 + 0.6 * easeOut(pop), 0.4 + 0.6 * easeOut(pop));
      this.#bubble(0, 0, heavyLook ? '危' : a.delayed ? '…!' : '!', heavyLook ? '#ff2a3a' : '#ffffff', heavyLook ? '#ffffff' : '#111111', ring);
      this.ctx.restore();
    }
  }

  #bubble(x: number, y: number, text: string, fill: string, ink: string, ring?: string): void {
    const { ctx } = this;
    const r = 22;
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    // Spiky shout bubble.
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2;
      const rr = i % 2 ? r : r * 1.32;
      ctx.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = ring && ring !== fill ? 5 : 3;
    ctx.strokeStyle = ring && ring !== fill ? ring : '#111111';
    ctx.stroke();
    ctx.fillStyle = ink;
    ctx.font = `900 ${text.length > 1 ? 18 : 28}px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 2);
    ctx.restore();
  }

  #drawKunai(sim: TowerSim, tick: number): void {
    const { ctx, L } = this;
    for (const a of sim.attacks) {
      if (a.kind !== 'kunai' || a.state !== 'pending' || a.tele > tick) continue;
      const p = Math.max(0, Math.min(1.2, (tick - a.tele) / Math.max(1, a.impact - a.tele)));
      const x = lerp(L.enemyX - 20, L.heroX + 26 * L.scale, p);
      const y = L.ground - 58 * L.scale - Math.sin(p * Math.PI) * 18;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI);
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillRect(4, -1.5, 40, 3);
      ctx.fillStyle = '#d9dee8';
      ctx.strokeStyle = '#1a1222';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(2, -5); ctx.lineTo(2, 5); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#3a2f2a';
      ctx.fillRect(2, -2, 10, 4);
      ctx.restore();
    }
  }

  /** Approach rings: floors 1-10 only. A ring closes on you exactly as the hit lands. */
  #drawRings(sim: TowerSim, tick: number): void {
    if (sim.phase !== 'fight') return;
    const { ctx, L } = this;
    const cx = L.heroX + 12 * L.scale, cy = L.ground - 52 * L.scale;
    for (const a of sim.attacks) {
      if (a.state !== 'pending' || a.tele > tick || a.kind === 'stance' || a.kind === 'fake') continue;
      const p = (tick - a.tele) / Math.max(1, a.impact - a.tele);
      if (p > 1.15) continue;
      const r = 26 * L.scale + (1 - Math.min(1, p)) * 90 * L.scale;
      const heavy = a.kind === 'heavy';
      ctx.strokeStyle = heavy ? 'rgba(255,90,100,0.85)' : 'rgba(255,255,255,0.9)';
      ctx.lineWidth = heavy ? 2 : 3;
      ctx.setLineDash(heavy ? [8, 6] : []);
      ctx.globalAlpha = Math.min(1, p * 3) * (p > 1 ? 1 - (p - 1) / 0.15 : 1);
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }
    // The target circle.
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, 26 * L.scale, 0, Math.PI * 2); ctx.stroke();
  }

  #drawSlashes(dt: number): void {
    const { ctx } = this;
    for (const sl of this.#slashes) {
      const a = sl.life / sl.max;
      ctx.strokeStyle = sl.color;
      ctx.globalAlpha = a;
      ctx.lineWidth = sl.width * a;
      ctx.beginPath(); ctx.moveTo(sl.x1, sl.y1); ctx.lineTo(sl.x2, sl.y2); ctx.stroke();
      sl.life -= dt;
    }
    ctx.globalAlpha = 1;
    this.#slashes = this.#slashes.filter((s) => s.life > 0);
  }

  #drawParticles(dt: number, sim: TowerSim): void {
    const { ctx, L } = this;
    for (const p of this.#particles) {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      if (p.kind === 'spark') p.vy += 500 * dt;
      if (p.kind === 'petal') p.vx += Math.sin(this.#now * 2 + p.rot) * 20 * dt;
      const a = Math.max(0, Math.min(1, p.life / Math.min(p.max, 0.4)));
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      if (p.kind === 'spark') {
        ctx.strokeStyle = p.color; ctx.lineWidth = p.size;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03); ctx.stroke();
      } else if (p.kind === 'petal') {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      } else if (p.kind === 'shard') {
        ctx.fillRect(p.x, p.y, p.size, 10);
      } else if (p.kind === 'ink') {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.size, -p.size * 0.3, p.size * 2, p.size * 0.6); ctx.restore();
      } else {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    this.#particles = this.#particles.filter((p) => p.life > 0 && p.y < L.h + 40 && p.x > -60 && p.x < L.w + 60);
    if (this.#particles.length > 500) this.#particles.splice(0, this.#particles.length - 500);
    void sim;
  }

  #drawPops(dt: number): void {
    const { ctx } = this;
    for (const p of this.#pops) {
      const age = 1 - p.life / p.max;
      const scale = age < 0.15 ? 0.6 + (age / 0.15) * 0.6 : 1.2 - Math.min(0.2, (age - 0.15) * 0.5);
      ctx.save();
      ctx.translate(p.x, p.y - age * 20);
      ctx.rotate(p.rot);
      ctx.scale(scale, scale);
      ctx.globalAlpha = Math.min(1, p.life / 0.25);
      ctx.font = `${p.jp ? 900 : 800} ${p.size}px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.lineWidth = p.size * 0.22;
      ctx.strokeStyle = '#120a18';
      ctx.lineJoin = 'round';
      ctx.strokeText(p.text, 0, 0);
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, 0, 0);
      ctx.restore();
      p.life -= dt;
    }
    ctx.globalAlpha = 1;
    this.#pops = this.#pops.filter((p) => p.life > 0);
  }

  // ── overlays ───────────────────────────────────────────────────────────

  #drawBreak(sim: TowerSim): void {
    if (sim.phase !== 'break' || this.#breakAt < 0) return;
    const { ctx, L } = this;
    const t = this.#now - this.#breakAt;
    const final = sim.breaksDone >= sim.spec.breaks;
    // 0.0–0.55: the cut-in band with the hero's eyes.
    if (t < 0.6) {
      const inT = Math.min(1, t / 0.12), outT = t > 0.45 ? (t - 0.45) / 0.15 : 0;
      const bandH = 110;
      const y = L.h * 0.36;
      ctx.save();
      ctx.translate(L.w / 2 + (outT * L.w), y);
      ctx.rotate(-0.12);
      ctx.translate(-L.w / 2 - (1 - inT) * L.w, 0);
      ctx.fillStyle = '#0b0b10';
      ctx.fillRect(-40, -bandH / 2 - 8, L.w + 80, bandH + 16);
      ctx.fillStyle = '#e8443a';
      ctx.fillRect(-40, -bandH / 2, L.w + 80, bandH);
      // Speed hatching.
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      for (let i = 0; i < 30; i++) { const yy = -bandH / 2 + Math.random() * bandH; ctx.lineWidth = 1 + Math.random() * 2; ctx.beginPath(); ctx.moveTo(-40, yy); ctx.lineTo(L.w + 40, yy); ctx.stroke(); }
      // Hero eyes, close up.
      ctx.save();
      ctx.beginPath(); ctx.rect(-40, -bandH / 2, L.w + 80, bandH); ctx.clip();
      const pose = basePose(this.#now); pose.eyes = 'angry';
      drawChar(ctx, this.hero.look, L.w * 0.42, 235, 4.2, 1, pose, this.#gear);
      ctx.restore();
      ctx.font = `900 30px ${FONT}`;
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#0b0b10';
      ctx.lineWidth = 6;
      ctx.textAlign = 'right';
      ctx.strokeText(this.hero.cry, L.w - 18, bandH / 2 - 14);
      ctx.fillText(this.hero.cry, L.w - 18, bandH / 2 - 14);
      ctx.restore();
    }
    // 0.55–0.75: the cut.
    if (t > 0.55 && t < 0.8) {
      const p = (t - 0.55) / 0.25;
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 14 * (1 - p) + 2;
      ctx.beginPath();
      ctx.moveTo(0, L.ground - 150 * L.scale);
      ctx.lineTo(L.w * Math.min(1, p * 2), L.ground - 150 * L.scale + L.w * 0.35 * Math.min(1, p * 2));
      ctx.stroke();
      ctx.restore();
      if (Math.abs(t - 0.6) < 0.02) { this.#impact = 2; this.#shake = 18; this.#burstPetals(); }
    }
    // Text.
    if (t > 0.7) {
      const p = Math.min(1, (t - 0.7) / 0.15);
      const text = final ? (sim.floor === FLOORS ? '完結' : '撃破!') : 'BREAK!';
      const sub = final ? (sim.floor === FLOORS ? 'THE END' : 'DEFEATED') : `${sim.spec.breaks - sim.breaksDone} MORE`;
      ctx.save();
      ctx.translate(L.w / 2, L.h * 0.3);
      ctx.scale(2 - p, 2 - p);
      ctx.globalAlpha = p;
      ctx.font = `900 64px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.lineWidth = 12;
      ctx.strokeStyle = '#0b0b10';
      ctx.strokeText(text, 0, 0);
      const g = ctx.createLinearGradient(0, -30, 0, 30);
      g.addColorStop(0, '#fff6b0'); g.addColorStop(1, '#ffb020');
      ctx.fillStyle = g;
      ctx.fillText(text, 0, 0);
      ctx.font = `800 16px ${FONT}`;
      ctx.lineWidth = 5;
      ctx.strokeText(sub, 0, 34);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(sub, 0, 34);
      ctx.restore();
    }
  }

  #burstPetals(): void {
    const L = this.L;
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = 100 + Math.random() * 300;
      this.#particles.push({ x: this.#enemyX, y: L.ground - 60 * L.scale, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 80, life: 1.4, max: 1.4, color: Math.random() < 0.5 ? '#ffc4d6' : '#ff8fb1', size: 4 + Math.random() * 3, kind: 'petal', rot: a, vr: (Math.random() - 0.5) * 8 });
    }
  }

  #drawHud(sim: TowerSim): void {
    const { ctx, L } = this;
    const top = L.top + 10;
    const arc = ARCS[sim.spec.arc]!;
    // Floor.
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    void arc; // the arc is named in each floor's intro card, not in the HUD
    ctx.font = `900 30px ${FONT}`;
    outlined(ctx, `FLOOR ${sim.floor}`, 16, top + 44, '#ffffff', 6);
    const fw = ctx.measureText(`FLOOR ${sim.floor}`).width;
    ctx.font = `800 14px ${FONT}`;
    outlined(ctx, `/${FLOORS}`, 16 + fw + 6, top + 44, 'rgba(255,255,255,0.75)', 4);

    // Hearts.
    const hearts = sim.maxHp / 2;
    for (let i = 0; i < hearts; i++) {
      const filled = sim.hp >= (i + 1) * 2 ? 1 : sim.hp === i * 2 + 1 ? 0.5 : 0;
      heart(ctx, L.w - 26 - (hearts - 1 - i) * 30, top + 24, 12, filled);
    }

    // Payout chip.
    const fall = payoutFor(sim.floor, false);
    const next = PAYOUT_TIERS.find((t) => t.from > sim.floor);
    const chip = next ? `If you fall here  +${fall}   ·   Floor ${next.from}  +${next.credits}` : `If you fall here  +${fall}   ·   Clear  +${CLEAR_PAYOUT}`;
    ctx.font = `800 13.5px ${FONT}`;
    const cw = Math.min(L.w - 32, ctx.measureText(chip).width + 24);
    ctx.fillStyle = 'rgba(10,12,20,0.78)';
    ctx.beginPath(); ctx.roundRect(16, top + 54, cw, 28, 14); ctx.fill();
    ctx.strokeStyle = 'rgba(255,210,63,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = '#ffd23f';
    ctx.fillText(chip, 28, top + 73);

    // Enemy name + guard.
    if (sim.phase === 'fight' || sim.phase === 'break') {
      const e = sim.spec.enemy;
      const y = top + 100;
      ctx.textAlign = 'right';
      ctx.font = `900 16px ${FONT}`;
      outlined(ctx, e.name, L.w - 16, y, sim.spec.boss ? '#ffd23f' : '#ffffff', 5);
      const bw = Math.min(220, L.w * 0.55), bx = L.w - 16 - bw, by = y + 8;
      ctx.fillStyle = 'rgba(10,12,20,0.7)';
      ctx.beginPath(); ctx.roundRect(bx - 2, by - 2, bw + 4, 20, 8); ctx.fill();
      const p = sim.guard / Math.max(1, sim.guardMax);
      const g = ctx.createLinearGradient(bx, 0, bx + bw, 0);
      g.addColorStop(0, '#ffd23f'); g.addColorStop(1, '#ff6b3a');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.roundRect(bx + bw * (1 - p), by, Math.max(0, bw * p), 16, 6); ctx.fill();
      // Chunks: one per normal parry, so you can count what's left.
      ctx.strokeStyle = 'rgba(10,12,20,0.75)';
      ctx.lineWidth = 2;
      for (let i = 1; i < sim.spec.guardParries; i++) {
        const x = bx + (bw * i) / sim.spec.guardParries;
        ctx.beginPath(); ctx.moveTo(x, by); ctx.lineTo(x, by + 16); ctx.stroke();
      }
      ctx.font = `800 10px ${FONT}`;
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText('GUARD', bx - 8, by + 9);
      // Break pips for bosses.
      if (sim.spec.breaks > 1) {
        for (let i = 0; i < sim.spec.breaks; i++) {
          ctx.beginPath(); ctx.arc(L.w - 24 - i * 20, by + 32, 7, 0, Math.PI * 2);
          ctx.fillStyle = i < sim.breaksDone ? 'rgba(255,255,255,0.2)' : '#ff6b3a';
          ctx.fill();
        }
      }
    }

    // Kiai meter.
    const ky = L.ground + 26;
    ctx.textAlign = 'left';
    ctx.font = `900 12px ${FONT}`;
    ctx.fillStyle = sim.kiai >= 100 ? '#ffd23f' : 'rgba(255,255,255,0.7)';
    ctx.font = `900 13px ${FONT}`;
    ctx.fillText('KIAI 気合', 16, ky + 12);
    const kw = L.w - 16 - 100;
    ctx.fillStyle = 'rgba(10,12,20,0.75)';
    ctx.beginPath(); ctx.roundRect(100, ky, kw, 16, 8); ctx.fill();
    ctx.fillStyle = sim.kiai >= 100 ? `hsl(${(this.#now * 400) % 360},90%,65%)` : '#7c6cff';
    ctx.beginPath(); ctx.roundRect(100, ky, Math.max(0.01, (kw * sim.kiai) / 100), 16, 8); ctx.fill();
    if (sim.kiai >= 100) this.#hintOnce('kiai', '', '', 1);
    if (sim.kiai >= 100) { ctx.font = `900 11px ${FONT}`; ctx.fillStyle = '#0b0b10'; ctx.fillText('FULL · NEXT PARRY HITS HARD', 110, ky + 12); }

    // Power-ups held.
    if (sim.boons.length) {
      ctx.font = `800 12px ${FONT}`;
      let bx = 16;
      const by = top + 98;
      ctx.textAlign = 'left';
      for (const b of sim.boons) {
        const label = BOONS_BY_ID[b].jp;
        const w = ctx.measureText(label).width + 12;
        if (bx + w > L.w * 0.42) break;
        ctx.fillStyle = 'rgba(124,108,255,0.35)';
        ctx.beginPath(); ctx.roundRect(bx, by - 13, w, 18, 6); ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, bx + 6, by);
        bx += w + 4;
      }
    }
  }

  #drawPads(sim: TowerSim): void {
    const { ctx, L } = this;
    const d = L.dodge;
    const pressed = this.#now - this.#dodgePressed < 0.1;
    const live = sim.phase === 'fight';
    const tick = sim.tick;
    const redLive = live && sim.attacks.some((a) => a.state === 'pending' && a.tele <= tick && (a.twisted ? a.kind === 'slash' : a.kind === 'heavy'));
    if (redLive && !this.#redVisible) this.#redSince = this.#now;
    this.#redVisible = redLive;
    if (redLive) this.#redLastSeen = this.#now;

    // Parry is the whole screen, so it gets no box. The label teaches, and goes after floor 3.
    if (sim.floor <= 3) {
      ctx.save();
      ctx.globalAlpha = live ? 0.9 : 0.4;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = `900 22px ${FONT}`;
      ctx.fillText('TAP ANYWHERE', L.w / 2, d.y + d.h / 2);
      ctx.font = `700 12px ${FONT}`;
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText('to parry, as it lands', L.w / 2, d.y + d.h / 2 + 18);
      ctx.restore();
    }

    // DODGE slams in when a red attack is coming, and leaves when it's gone.
    if (!this.#dodgeLive()) return;
    const since = this.#now - this.#redSince;
    const slam = since < 0.12 ? 1.12 - (since / 0.12) * 0.12 : 1;
    const fade = redLive ? 1 : Math.max(0, 1 - (this.#now - this.#redLastSeen) / 0.35);
    ctx.save();
    ctx.globalAlpha = fade;
    ctx.translate(d.x + d.w / 2, d.y + d.h / 2);
    const pulse = 1 + Math.sin(this.#now * 18) * 0.03;
    ctx.scale((pressed ? 0.94 : 1) * pulse * slam, (pressed ? 0.94 : 1) * pulse * slam);
    ctx.fillStyle = '#ff2a3a';
    ctx.shadowColor = '#ff2a3a';
    ctx.shadowBlur = 28;
    ctx.beginPath(); ctx.roundRect(-d.w / 2, -d.h / 2, d.w, d.h, 20); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 28px ${FONT}`;
    ctx.fillText('DODGE', 0, 4);
    ctx.font = `900 13px ${FONT}`;
    ctx.fillText('危', 0, 24);
    ctx.restore();
  }

  #drawHint(): void {
    if (!this.#hint || this.#now > this.#hint.until) return;
    const { ctx, L } = this;
    const left = this.#hint.until - this.#now;
    const age = 1.8 - left;
    const a = Math.min(1, left / 0.3);
    let size = 17;
    ctx.font = `900 ${size}px ${FONT}`;
    while (size > 11 && ctx.measureText(this.#hint.text).width > L.w - 64) { size -= 1; ctx.font = `900 ${size}px ${FONT}`; }
    const w = Math.min(L.w - 24, ctx.measureText(this.#hint.text).width + 36);
    const y = L.top + 150;
    // A white pill with a thick coloured border and a shake on arrival: the most important words on screen.
    const shake = age < 0.25 ? Math.sin(age * 90) * (1 - age / 0.25) * 6 : 0;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(L.w / 2 + shake, y + 19);
    ctx.scale(age < 0.12 ? 0.8 + age / 0.6 : 1, age < 0.12 ? 0.8 + age / 0.6 : 1);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = this.#hint.color;
    ctx.shadowBlur = 16;
    ctx.beginPath(); ctx.roundRect(-w / 2, -19, w, 38, 19); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.#hint.color === '#ffffff' ? '#7c6cff' : this.#hint.color;
    ctx.stroke();
    ctx.fillStyle = '#0b0b10';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.#hint.text, 0, 1);
    ctx.restore();
    ctx.textBaseline = 'alphabetic';
  }

  #drawIntro(sim: TowerSim): void {
    if (sim.phase !== 'intro') return;
    const { ctx, L } = this;
    const t = this.#now - this.#introAt;
    if (sim.spec.twist && this.#floorClearedAt < 0) {
      // The last floor gets a film's opening: letterbox bars, then the name.
      const bar = Math.min(1, t / 0.5) * L.h * 0.16;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, L.w, bar);
      ctx.fillRect(0, L.h - bar, L.w, bar);
      ctx.save();
      ctx.textAlign = 'center';
      ctx.globalAlpha = Math.min(1, Math.max(0, (t - 0.4) / 0.5));
      ctx.font = `800 12px ${FONT}`;
      ctx.fillStyle = '#ffd23f';
      ctx.fillText('F I N A L   F L O O R', L.w / 2, L.h * 0.3 - 34);
      ctx.font = `900 46px ${FONT}`;
      outlined(ctx, 'THE AUTHOR', L.w / 2, L.h * 0.3 + 8, '#ffffff', 8);
      ctx.font = `600 14px ${FONT}`;
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText('\u201cI wrote you into this tower. I can write you out.\u201d', L.w / 2, L.h * 0.3 + 38);
      ctx.restore();
      return;
    }
    const e = sim.spec.enemy;
    const boss = sim.spec.boss;
    const inT = Math.min(1, t / 0.25);
    ctx.save();
    // Slanted title band.
    ctx.translate(L.w / 2, L.h * 0.3);
    ctx.rotate(-0.06);
    ctx.globalAlpha = Math.min(1, inT * 1.5);
    ctx.fillStyle = boss ? 'rgba(90,0,20,0.85)' : 'rgba(10,12,20,0.8)';
    ctx.fillRect(-L.w, -54, L.w * 2, 108);
    ctx.fillStyle = boss ? '#ff2a3a' : '#7c6cff';
    ctx.fillRect(-L.w, -58, L.w * 2, 4);
    ctx.fillRect(-L.w, 54, L.w * 2, 4);
    ctx.textAlign = 'center';
    ctx.font = `800 13px ${FONT}`;
    ctx.fillStyle = boss ? '#ffd23f' : 'rgba(255,255,255,0.8)';
    ctx.fillText(boss ? `BOSS  ·  FLOOR ${sim.floor}` : `FLOOR ${sim.floor}`, 0, -28);
    ctx.font = `900 ${Math.min(32, (L.w - 40) / Math.max(8, e.name.length) * 1.7)}px ${FONT}`;
    ctx.translate((1 - easeOut(inT)) * 80, 0);
    outlined(ctx, e.name, 0, 8, '#ffffff', 7);
    ctx.font = `600 13px ${FONT}`;
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText(`“${e.title}”`, 0, 34);
    ctx.restore();
    if (boss) {
      // ゴゴゴ
      ctx.save();
      ctx.font = `900 34px ${FONT}`;
      ctx.fillStyle = '#c9a2ff';
      ctx.globalAlpha = 0.85;
      for (let i = 0; i < 4; i++) {
        const jitter = Math.sin(this.#now * 30 + i) * 2;
        ctx.save();
        ctx.translate(L.w * 0.62 + i * 26 + jitter, L.ground - 160 * L.scale + i * 26);
        ctx.rotate(0.2);
        outlined(ctx, 'ゴ', 0, 0, '#c9a2ff', 6);
        ctx.restore();
      }
      ctx.restore();
    }
  }

  #drawBanners(): void {
    const { ctx, L } = this;
    const show = (text: string, at: number, color: string, y: number) => {
      const t = this.#now - at;
      if (t > 1.6) return;
      ctx.save();
      ctx.globalAlpha = Math.min(1, (1.6 - t) / 0.3);
      ctx.translate(L.w / 2, y);
      ctx.scale(Math.min(1, t / 0.12), Math.min(1, t / 0.12));
      ctx.font = `900 22px ${FONT}`;
      ctx.textAlign = 'center';
      outlined(ctx, text, 0, 0, color, 7);
      ctx.restore();
    };
    if (this.#savedBy) show(this.#savedBy.text, this.#savedBy.at, '#ffd23f', L.h * 0.42);
    if (this.#erased) {
      const t = this.#now - this.#erased.at;
      if (t < 2.4) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, (2.4 - t) / 0.4);
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(0, L.h * 0.5 - 50, L.w, 100);
        ctx.textAlign = 'center';
        ctx.font = `800 13px ${FONT}`;
        ctx.fillStyle = '#ffd23f';
        ctx.fillText('THE AUTHOR REWRITES YOU', L.w / 2, L.h * 0.5 - 16);
        ctx.font = `900 24px ${FONT}`;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(this.#erased.text, L.w / 2, L.h * 0.5 + 14);
        ctx.strokeStyle = '#ff2a3a';
        ctx.lineWidth = 4;
        const w = ctx.measureText(this.#erased.text).width;
        ctx.beginPath(); ctx.moveTo(L.w / 2 - w / 2 - 6, L.h * 0.5 + 6); ctx.lineTo(L.w / 2 + w / 2 + 6, L.h * 0.5 + 6); ctx.stroke();
        ctx.font = `700 12px ${FONT}`;
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText('…and cuts you to two hearts.', L.w / 2, L.h * 0.5 + 36);
        ctx.restore();
      }
    }
    if (this.#twistAt > 0) show('PLOT TWIST!', this.#twistAt, '#ff2a3a', L.h * 0.42);
  }

  #drawEnd(sim: TowerSim): void {
    if (!sim.over || this.#deadAt < 0) return;
    const { ctx, L } = this;
    const t = this.#now - this.#deadAt;
    if (sim.phase === 'dead') {
      // Fade to a grey manga panel.
      const a = Math.min(1, Math.max(0, (t - 0.5) / 0.6));
      ctx.save();
      ctx.globalAlpha = a * 0.8;
      ctx.fillStyle = '#0b0b10';
      ctx.fillRect(0, 0, L.w, L.h);
      ctx.globalAlpha = a * 0.18;
      ctx.fillStyle = '#ffffff';
      for (let y = 0; y < L.h; y += 6) for (let x = (y / 6) % 2 ? 3 : 0; x < L.w; x += 6) { ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    }
  }
}

// ── helpers ──────────────────────────────────────────────────────────────

function outlined(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, lw: number): void {
  ctx.lineJoin = 'round';
  ctx.lineWidth = lw;
  ctx.strokeStyle = '#0b0b10';
  ctx.strokeText(text, x, y);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function heart(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: number): void {
  const path = () => {
    ctx.beginPath();
    ctx.moveTo(x, y + r * 0.9);
    ctx.bezierCurveTo(x - r * 1.6, y - r * 0.2, x - r * 0.8, y - r * 1.3, x, y - r * 0.45);
    ctx.bezierCurveTo(x + r * 0.8, y - r * 1.3, x + r * 1.6, y - r * 0.2, x, y + r * 0.9);
    ctx.closePath();
  };
  path();
  ctx.fillStyle = 'rgba(20,10,20,0.75)';
  ctx.fill();
  if (fill > 0) {
    ctx.save();
    path();
    ctx.clip();
    ctx.fillStyle = '#ff4f6d';
    ctx.fillRect(x - r * 2, y - r * 2, fill === 1 ? r * 4 : r * 2, r * 4);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath(); ctx.ellipse(x - r * 0.55, y - r * 0.45, r * 0.3, r * 0.2, -0.6, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  path();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#0b0b10';
  ctx.stroke();
}

function cloud(g: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.arc(x + r * 0.9, y + r * 0.2, r * 0.75, 0, Math.PI * 2);
  g.arc(x - r * 0.9, y + r * 0.25, r * 0.65, 0, Math.PI * 2);
  g.fill();
}

function mulberry(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
const easeIn = (t: number) => t * t;
export { BREAK_TICKS };
