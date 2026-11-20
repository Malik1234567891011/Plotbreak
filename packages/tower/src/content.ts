/**
 * Everything the Tower is made of: the payout ladder, the 30 floors, the
 * enemies and the power-ups. Numbers are in ticks (60 per second).
 *
 * Tuned with `npm run tune -w @plotbreak/tower` against simulated players, not
 * by feel. See docs/tower.md for the targets.
 */

export const TPS = 60;
export const FLOORS = 30;
export const ENTRY_FEE = 30;
/** 0 = Sunday, in UTC — the same day boundary the daily claim uses. */
export const FREE_WEEKDAY = 0;

/** Credits paid for falling on a floor (1..30); index 31 = cleared the tower. */
export const PAYOUT_TIERS: readonly { from: number; to: number; credits: number }[] = [
  { from: 1, to: 5, credits: 5 },
  { from: 6, to: 10, credits: 30 },
  { from: 11, to: 15, credits: 60 },
  { from: 16, to: 20, credits: 120 },
  { from: 21, to: 25, credits: 150 },
  { from: 26, to: 30, credits: 200 },
];
export const CLEAR_PAYOUT = 300;

export function payoutFor(fellOn: number, cleared: boolean): number {
  if (cleared) return CLEAR_PAYOUT;
  const f = Math.max(1, Math.min(FLOORS, Math.trunc(fellOn)));
  return PAYOUT_TIERS.find((t) => f >= t.from && f <= t.to)?.credits ?? 0;
}

/**
 * One letter per attack in a pattern:
 * s slash · k kunai · h heavy (swipe) · f feint, then the real slash · d delayed slash
 */
export type PatternWeights = Readonly<Record<string, number>>;

export interface ArcDef {
  readonly id: string;
  readonly name: string;
  readonly jp: string;
  /** Sky gradient top, bottom, and the ground / silhouette colour. */
  readonly sky: readonly [string, string];
  readonly ground: string;
  readonly far: string;
}

export const ARCS: readonly ArcDef[] = [
  { id: 'rooftop', name: 'School Rooftop', jp: '屋上', sky: ['#ffb6a3', '#ffe7c2'], ground: '#5b6b8a', far: '#c7a3b8' },
  { id: 'forest', name: 'Ninja Forest', jp: '忍の森', sky: ['#1f3b3a', '#5f8f6b'], ground: '#1b2a22', far: '#2d4a3c' },
  { id: 'shrine', name: 'Spirit Shrine', jp: '霊の社', sky: ['#1a1238', '#5a2f6b'], ground: '#21142b', far: '#3a2350' },
  { id: 'neon', name: 'Neon City', jp: 'ネオン街', sky: ['#07091c', '#2a1050'], ground: '#0d0f22', far: '#1c1f4a' },
  { id: 'castle', name: 'Demon Castle', jp: '魔王城', sky: ['#2a0608', '#7a1a12'], ground: '#1a0607', far: '#3d0d0c' },
  { id: 'final', name: 'The Final Arc', jp: '最終章', sky: ['#0b0b10', '#3b3550'], ground: '#0a0a0e', far: '#24212f' },
];

export interface EnemyLook {
  /** Hair, outfit, skin, eye, accent. */
  readonly hair: string;
  readonly outfit: string;
  readonly skin: string;
  readonly eye: string;
  readonly accent: string;
  /** Silhouette features the renderer knows how to draw. */
  readonly style:
    | 'delinquent' | 'monitor' | 'president'
    | 'ninja' | 'kunoichi' | 'foxmask'
    | 'kitsune' | 'lantern' | 'oni'
    | 'cyborg' | 'drone' | 'mecha'
    | 'knight' | 'general'
    | 'rival' | 'author' | 'theauthor';
  readonly weapon: 'fist' | 'bokken' | 'katana' | 'kunai' | 'claw' | 'club' | 'blade' | 'greatsword' | 'pen';
}

export interface EnemyDef {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly look: EnemyLook;
}

export interface FloorSpec {
  readonly floor: number;
  readonly arc: number;
  readonly enemy: EnemyDef;
  readonly boss: boolean;
  /** Guard breaks needed. */
  readonly breaks: number;
  /** Guard to fill per break, in parries (×10 internally). */
  readonly guardParries: number;
  readonly patterns: PatternWeights;
  /** Parry window before / after impact, and the perfect half-width. */
  readonly early: number;
  readonly late: number;
  readonly perfect: number;
  /** Ticks from the "!" to the first impact. */
  readonly lead: readonly [number, number];
  /** Ticks between hits inside a combo. */
  readonly spacing: number;
  /** Quiet ticks between patterns. */
  readonly gap: readonly [number, number];
  /** Ticks you can't act after a whiff. */
  readonly lockout: number;
  /** Per mille: after you dodge a heavy, the enemy takes a counter stance instead of leaving an opening. */
  readonly stance: number;
  /** Floor 30's last phase: telegraph colours lie for some attacks. */
  readonly twist: boolean;
}

const E = (id: string, name: string, title: string, look: EnemyLook): EnemyDef => ({ id, name, title, look });

export const ENEMIES = {
  slacker: E('slacker', 'Kenta the Slacker', 'Skipped class to fight you', { hair: '#3a2a22', outfit: '#2b3a67', skin: '#f6d2b8', eye: '#3a2a22', accent: '#e8e8f0', style: 'delinquent', weapon: 'fist' }),
  monitor: E('monitor', 'Hall Monitor Aoi', 'No running in the halls', { hair: '#1d2433', outfit: '#3b4f8f', skin: '#f8dcc4', eye: '#2d6cdf', accent: '#d8343a', style: 'monitor', weapon: 'bokken' }),
  banchou: E('banchou', 'Banchō Goro', 'Long coat. Longer grudge.', { hair: '#111111', outfit: '#1a1a22', skin: '#efc9a8', eye: '#111111', accent: '#c9a227', style: 'delinquent', weapon: 'fist' }),
  kendo: E('kendo', 'Kendo Captain Rin', 'Has never lost a bout', { hair: '#2a1e3a', outfit: '#25306b', skin: '#f6d6bf', eye: '#6b3fa0', accent: '#f0f0f0', style: 'monitor', weapon: 'bokken' }),
  president: E('president', 'Council President Reika', 'Your transfer request is denied', { hair: '#e8d7a8', outfit: '#2a2f4a', skin: '#fae2cf', eye: '#b0283a', accent: '#d4af37', style: 'president', weapon: 'katana' }),
  shadow: E('shadow', 'Shadow Ninja', 'You never heard him', { hair: '#20242c', outfit: '#232833', skin: '#e9c7a8', eye: '#d23b3b', accent: '#5a6375', style: 'ninja', weapon: 'kunai' }),
  hayate: E('hayate', 'Hayate', 'Faster than his own shadow', { hair: '#6b8f3a', outfit: '#2f3b2a', skin: '#efcfb0', eye: '#e0b13a', accent: '#a83232', style: 'ninja', weapon: 'katana' }),
  kunoichi: E('kunoichi', 'Kunoichi Suzu', 'Smiles before she throws', { hair: '#7a2f5a', outfit: '#2a2238', skin: '#f6d6c0', eye: '#e04f8a', accent: '#f2c14e', style: 'kunoichi', weapon: 'kunai' }),
  twin: E('twin', 'The Twin Blades', 'Two swords, one temper', { hair: '#d9d9e0', outfit: '#34303f', skin: '#f2d3bd', eye: '#4fb3e0', accent: '#4fb3e0', style: 'ninja', weapon: 'blade' }),
  foxmask: E('foxmask', 'The Fox Mask', 'Nobody has seen the face', { hair: '#f0f0f0', outfit: '#3a1f2a', skin: '#f0e6e0', eye: '#d23b3b', accent: '#d23b3b', style: 'foxmask', weapon: 'katana' }),
  kitsune: E('kitsune', 'Kitsune Hana', 'Nine tails, zero mercy', { hair: '#f2a03a', outfit: '#f2f0ea', skin: '#fae3d2', eye: '#e0b13a', accent: '#d23b3b', style: 'kitsune', weapon: 'claw' }),
  lantern: E('lantern', 'Lantern Ghost', 'Lights the way down', { hair: '#cfd8ff', outfit: '#e8eaf6', skin: '#e9eeff', eye: '#4a5cff', accent: '#ffb347', style: 'lantern', weapon: 'claw' }),
  tengu: E('tengu', 'Tengu Kurama', 'Laughs from the treetops', { hair: '#1b1b1b', outfit: '#3a2f6b', skin: '#d9534f', eye: '#f5d742', accent: '#f5d742', style: 'oni', weapon: 'katana' }),
  yuki: E('yuki', 'Yuki-onna', 'Her breath is winter', { hair: '#e8f3ff', outfit: '#cfe6ff', skin: '#f3f8ff', eye: '#6ab8ff', accent: '#6ab8ff', style: 'kitsune', weapon: 'claw' }),
  oni: E('oni', 'Oni Captain Gōki', 'Breaks swords for fun', { hair: '#1a1a1a', outfit: '#5a1d1d', skin: '#d94a3c', eye: '#ffd23f', accent: '#ffd23f', style: 'oni', weapon: 'club' }),
  cyborg: E('cyborg', 'Unit K-07', 'Combat protocol: on', { hair: '#2b2f3a', outfit: '#2a2f45', skin: '#d7dbe6', eye: '#29e3ff', accent: '#29e3ff', style: 'cyborg', weapon: 'blade' }),
  drone: E('drone', 'Hunter Drone', 'Target acquired', { hair: '#3a3f55', outfit: '#1f2233', skin: '#9aa3b8', eye: '#ff2d6f', accent: '#ff2d6f', style: 'drone', weapon: 'kunai' }),
  hacker: E('hacker', 'Netrunner Mio', 'Already in your system', { hair: '#ff4fd8', outfit: '#1e1b33', skin: '#f6d6c4', eye: '#9b5cff', accent: '#29e3ff', style: 'cyborg', weapon: 'blade' }),
  ronin: E('ronin', 'Chrome Ronin', 'Sold his heart for speed', { hair: '#c0c6d6', outfit: '#20253a', skin: '#e6c8b0', eye: '#ff7a29', accent: '#ff7a29', style: 'cyborg', weapon: 'katana' }),
  mecha: E('mecha', 'The Prototype', 'Pilot not found', { hair: '#e04a3a', outfit: '#e9ecf2', skin: '#c9ced9', eye: '#ffd23f', accent: '#e04a3a', style: 'mecha', weapon: 'greatsword' }),
  knight: E('knight', 'Demon Knight', 'Sworn to the Demon Lord', { hair: '#2b0b0e', outfit: '#2c2c34', skin: '#8f8fa0', eye: '#ff3b3b', accent: '#7a1a12', style: 'knight', weapon: 'greatsword' }),
  succubus: E('succubus', 'Lilith of the Gate', 'Bored of heroes', { hair: '#5a1a6b', outfit: '#2a0f2f', skin: '#f2cfd8', eye: '#ff3b8a', accent: '#ff3b8a', style: 'kitsune', weapon: 'claw' }),
  reaper: E('reaper', 'Castle Reaper', 'Collects on time', { hair: '#101014', outfit: '#16161c', skin: '#dcdce6', eye: '#8ad4ff', accent: '#8ad4ff', style: 'knight', weapon: 'blade' }),
  champion: E('champion', 'Fallen Champion', 'Was a hero, once', { hair: '#d8c27a', outfit: '#3a2f2a', skin: '#ecc7a6', eye: '#7ad48a', accent: '#d8c27a', style: 'knight', weapon: 'katana' }),
  general: E('general', 'Demon General Vexis', 'The last wall before the end', { hair: '#e8e8f0', outfit: '#1a0a0c', skin: '#b8a8c8', eye: '#ff3b3b', accent: '#ffd23f', style: 'general', weapon: 'greatsword' }),
  rival: E('rival', 'Your Rival, Ren', 'Said you would never make it', { hair: '#1c2a5a', outfit: '#1a1d2b', skin: '#f2d2bb', eye: '#4fb3e0', accent: '#4fb3e0', style: 'rival', weapon: 'katana' }),
  darkrival: E('darkrival', 'Ren, Awakened', 'Second form. Of course.', { hair: '#101018', outfit: '#0d0d14', skin: '#d9c2c8', eye: '#ff2d4a', accent: '#ff2d4a', style: 'rival', weapon: 'katana' }),
  editor: E('editor', 'The Editor', 'Cuts whatever is unnecessary', { hair: '#3a3a44', outfit: '#d8d8e0', skin: '#f0dccb', eye: '#222222', accent: '#d23b3b', style: 'author', weapon: 'pen' }),
  narrator: E('narrator', 'The Narrator', 'Already knows how this ends', { hair: '#6b5a8f', outfit: '#1a1828', skin: '#efd8c8', eye: '#c9a2ff', accent: '#c9a2ff', style: 'author', weapon: 'pen' }),
  author: E('author', 'THE AUTHOR', 'Wrote you into this tower', { hair: '#f2f2f2', outfit: '#0b0b10', skin: '#f5e6da', eye: '#ffd23f', accent: '#ffd23f', style: 'theauthor', weapon: 'pen' }),
} as const satisfies Record<string, EnemyDef>;

interface ArcTiming {
  early: number; late: number; perfect: number;
  lead: [number, number]; spacing: number; gap: [number, number];
  lockout: number; stance: number;
}

const ARC_TIMING: readonly ArcTiming[] = [
  { early: 36, late: 18, perfect: 8, lead: [60, 72], spacing: 32, gap: [30, 50], lockout: 0, stance: 0 },
  { early: 34, late: 22, perfect: 7, lead: [56, 70], spacing: 30, gap: [28, 48], lockout: 0, stance: 0 },
  { early: 11, late: 9, perfect: 4, lead: [42, 58], spacing: 24, gap: [30, 52], lockout: 16, stance: 0 },
  { early: 8, late: 7, perfect: 3, lead: [36, 50], spacing: 20, gap: [26, 46], lockout: 18, stance: 150 },
  { early: 4, late: 4, perfect: 2, lead: [30, 46], spacing: 18, gap: [24, 42], lockout: 20, stance: 400 },
  { early: 3, late: 3, perfect: 1, lead: [26, 42], spacing: 16, gap: [22, 40], lockout: 22, stance: 500 },
];

type Row = [EnemyDef, number /* guardParries */, PatternWeights, number? /* breaks */];

const ROWS: readonly Row[] = [
  [ENEMIES.slacker, 3, { s: 1 }],
  [ENEMIES.monitor, 3, { s: 1 }],
  [ENEMIES.banchou, 3, { s: 3, ss: 1 }],
  [ENEMIES.kendo, 4, { s: 2, ss: 2 }],
  [ENEMIES.president, 4, { s: 2, ss: 3 }, 2],
  [ENEMIES.shadow, 4, { k: 3, s: 2, kk: 1 }],
  [ENEMIES.hayate, 4, { s: 3, h: 2 }],
  [ENEMIES.kunoichi, 4, { s: 3, ss: 2, h: 1, k: 1, kk: 1 }],
  [ENEMIES.twin, 4, { ss: 2, sh: 2, kk: 2, h: 1 }],
  [ENEMIES.foxmask, 5, { s: 2, ss: 3, kk: 2, sh: 1, h: 1 }, 2],
  [ENEMIES.kitsune, 6, { f: 3, s: 2, ss: 1 }],
  [ENEMIES.lantern, 6, { f: 2, d: 2, ss: 2, h: 1 }],
  [ENEMIES.tengu, 7, { sss: 1, f: 2, d: 2, sh: 2, kk: 1 }],
  [ENEMIES.yuki, 7, { fs: 2, sss: 2, hs: 2, d: 2, kkk: 1 }],
  [ENEMIES.oni, 8, { sss: 2, fs: 2, hsh: 1, d: 2, kkk: 1, f: 1 }, 2],
  [ENEMIES.cyborg, 9, { sss: 3, shs: 2, kkk: 2, fs: 2 }],
  [ENEMIES.drone, 9, { ssss: 2, shs: 2, kkkk: 2, f: 2, d: 1 }],
  [ENEMIES.hacker, 10, { ssss: 2, hsh: 2, sfs: 2, kkk: 2 }],
  [ENEMIES.ronin, 10, { sssss: 1, shsh: 2, sfs: 2, kkkk: 2, d: 1 }],
  [ENEMIES.mecha, 9, { ssss: 2, shsh: 2, kkkk: 2, sfs: 2, hh: 1 }, 3],
  [ENEMIES.knight, 13, { sfs: 2, hs: 2, ssss: 2, kkkk: 1, d: 1 }],
  [ENEMIES.succubus, 13, { sfsf: 1, shsh: 2, ssss: 2, fd: 1 }],
  [ENEMIES.reaper, 14, { sssss: 2, hsfs: 2, kkkkk: 1, fsh: 2, d: 1 }],
  [ENEMIES.champion, 14, { sfssf: 1, hshs: 2, sssss: 2, dfs: 1, kkkk: 1 }],
  [ENEMIES.general, 12, { sssss: 2, hshs: 2, sfsfs: 1, kkkkk: 1, hdh: 1 }, 3],
  [ENEMIES.rival, 16, { sssss: 2, sfssh: 2, hshs: 2, kkkkk: 1, dfd: 1 }],
  [ENEMIES.editor, 16, { ssssss: 1, sfsfs: 2, hshsh: 1, kkkkk: 1, fdf: 1 }],
  [ENEMIES.narrator, 17, { sssss: 2, shsfs: 2, fsfsf: 1, kkkkkk: 1, dhd: 1 }],
  [ENEMIES.darkrival, 17, { ssssss: 2, sfshs: 2, hshsh: 2, kkkkkk: 1, fdfd: 1 }],
  [ENEMIES.author, 28, { ssssss: 2, sfshsf: 2, hshshs: 1, kkkkkk: 1, dfdfd: 1, shhs: 1 }, 3],
];

// ── the daily tower ──────────────────────────────────────────────────────

export type ModifierId = 'none' | 'kunai_festival' | 'blood_moon' | 'trickster' | 'training_day' | 'lucky_day' | 'glass_cannon';

export interface ModifierDef {
  readonly id: ModifierId;
  readonly name: string;
  readonly jp: string;
  readonly text: string;
}

/** Each day's twist. Mild on purpose: the floor targets still hold on every one. */
export const MODIFIERS: readonly ModifierDef[] = [
  { id: 'none', name: 'A Quiet Day', jp: '平穏', text: 'No twist today. Just you and thirty floors.' },
  { id: 'kunai_festival', name: 'Kunai Festival', jp: '苦無祭', text: 'Kunai fly far more often from floor 6.' },
  { id: 'blood_moon', name: 'Blood Moon', jp: '血の月', text: 'Red 危 attacks come more often from floor 7.' },
  { id: 'trickster', name: 'Trickster Day', jp: '騙し合い', text: 'Feints everywhere from floor 11.' },
  { id: 'training_day', name: 'Training Day', jp: '稽古日', text: 'Timing windows are a little wider up to floor 20.' },
  { id: 'lucky_day', name: 'Lucky Day', jp: '大吉', text: 'Epic power-ups turn up much more often.' },
  { id: 'glass_cannon', name: 'Glass Cannon', jp: '紙一重', text: 'Two hearts only, but every parry hits 50% harder.' },
];
export const MODIFIERS_BY_ID: Readonly<Record<ModifierId, ModifierDef>> = Object.fromEntries(MODIFIERS.map((m) => [m.id, m])) as Record<ModifierId, ModifierDef>;

export interface DailyTower {
  /** UTC day, YYYY-MM-DD. */
  readonly day: string;
  readonly modifier: ModifierId;
  /** For each floor (index 0 = floor 1), which floor's enemy stands there. Bosses never move. */
  readonly lineup: readonly number[];
}

function hashDay(day: string, salt: string): number {
  let h = 2166136261;
  for (const c of `${salt}:${day}`) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/** The same tower for everyone on a given day: who stands on each floor, and the day's twist. */
export function dailyTower(day: string): DailyTower {
  let h = hashDay(day, 'lineup');
  const next = () => { h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0; h = (h ^ (h >>> 13)) >>> 0; return h; };
  const lineup: number[] = [];
  for (let arc = 0; arc < 6; arc++) {
    const slots = [1, 2, 3, 4].map((i) => arc * 5 + i);
    // Floor 1 is the tutorial: it keeps its slacker.
    const movable = arc === 0 ? slots.slice(1) : slots;
    const shuffled = [...movable];
    for (let i = shuffled.length - 1; i > 0; i--) { const j = next() % (i + 1); [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]; }
    if (arc === 0) lineup.push(1);
    lineup.push(...shuffled, arc * 5 + 5);
  }
  const mods = MODIFIERS.map((m) => m.id);
  return { day, modifier: mods[hashDay(day, 'modifier') % mods.length]!, lineup };
}

/** A neutral tower: practice on an old build, tests. */
export const PLAIN_TOWER: DailyTower = { day: '', modifier: 'none', lineup: Array.from({ length: FLOORS }, (_, i) => i + 1) };

export function floorSpec(floor: number, tower: DailyTower = PLAIN_TOWER): FloorSpec {
  const base = baseFloorSpec(floor);
  const f = base.floor;
  const shown = ROWS[(tower.lineup[f - 1] ?? f) - 1]![0];
  const m = tower.modifier;
  const patterns: Record<string, number> = { ...base.patterns };
  if (m === 'kunai_festival' && f >= 6) { patterns.kkk = (patterns.kkk ?? 0) + 2; patterns.k = (patterns.k ?? 0) + 1; }
  if (m === 'blood_moon' && f >= 7) { patterns.h = (patterns.h ?? 0) + 2; patterns.hs = (patterns.hs ?? 0) + 1; }
  if (m === 'trickster' && f >= 11) { patterns.f = (patterns.f ?? 0) + 2; patterns.fs = (patterns.fs ?? 0) + 1; }
  const wide = m === 'training_day' && f <= 20 ? 1 : 0;
  return { ...base, enemy: shown, patterns, early: base.early + wide, late: base.late + wide };
}

function baseFloorSpec(floor: number): FloorSpec {
  const f = Math.max(1, Math.min(FLOORS, floor));
  const arc = Math.floor((f - 1) / 5);
  const row = ROWS[f - 1]!;
  const t = ARC_TIMING[arc]!;
  const boss = f % 5 === 0;
  return {
    floor: f,
    arc,
    enemy: row[0],
    boss,
    breaks: row[3] ?? 1,
    guardParries: row[1],
    patterns: row[2],
    early: t.early,
    late: t.late,
    perfect: t.perfect,
    lead: t.lead,
    spacing: t.spacing,
    gap: t.gap,
    // Floor 11 is where whiffs start to cost something; 6–10 stay forgiving.
    lockout: t.lockout,
    stance: t.stance,
    twist: f === FLOORS,
  };
}

/** Floors after which a power-up is offered (bosses included). */
export const BOON_AFTER: ReadonlySet<number> = new Set([2, 5, 7, 10, 12, 15, 17, 20, 22, 25, 27]);

export type BoonId =
  | 'training_arc' | 'plot_armor' | 'friendship' | 'beach_episode' | 'filler_episode'
  | 'second_form' | 'flashback' | 'rivals_respect' | 'glasses_glint' | 'battle_cry'
  | 'time_skip' | 'chuunibyou' | 'truck_kun' | 'bento';

export interface BoonDef {
  readonly id: BoonId;
  readonly name: string;
  readonly jp: string;
  readonly text: string;
  readonly rarity: 'common' | 'rare' | 'epic';
  /** Can be taken more than once. */
  readonly repeat: boolean;
}

export const BOONS: readonly BoonDef[] = [
  { id: 'training_arc', name: 'Training Arc', jp: '修行編', text: 'Parry window +25%.', rarity: 'common', repeat: false },
  { id: 'bento', name: 'Homemade Bento', jp: '弁当', text: 'Heal 1 heart now, and 1 more after every boss.', rarity: 'common', repeat: false },
  { id: 'beach_episode', name: 'Beach Episode', jp: '水着回', text: 'Heal to full right now.', rarity: 'common', repeat: true },
  { id: 'battle_cry', name: 'Battle Cry', jp: '気合', text: 'Perfect parry window doubled.', rarity: 'common', repeat: false },
  { id: 'time_skip', name: 'Time Skip', jp: '時間跳躍', text: 'Enemies wind up 12% slower.', rarity: 'rare', repeat: false },
  { id: 'glasses_glint', name: 'Glasses Glint', jp: '眼鏡キラーン', text: 'Feints and counter stances show their tell early.', rarity: 'common', repeat: false },
  { id: 'rivals_respect', name: "Rival's Respect", jp: '好敵手', text: '+1 max heart, and heal it.', rarity: 'rare', repeat: false },
  { id: 'second_form', name: 'Second Form', jp: '第二形態', text: 'On your last heart, every parry hits twice as hard.', rarity: 'rare', repeat: false },
  { id: 'chuunibyou', name: 'Chuunibyou', jp: '中二病', text: 'Counters after a dodge hit twice as hard. A whiff costs half a heart.', rarity: 'rare', repeat: false },
  { id: 'flashback', name: 'Flashback', jp: '回想', text: 'Once: the next hit you take never happened.', rarity: 'rare', repeat: false },
  { id: 'truck_kun', name: 'Truck-kun', jp: 'トラック', text: 'The next two non-boss enemies start with half their guard broken.', rarity: 'rare', repeat: false },
  { id: 'friendship', name: 'Power of Friendship', jp: '友情パワー', text: 'On every boss floor, a friend jumps in and blocks the first hit.', rarity: 'epic', repeat: false },
  { id: 'plot_armor', name: 'Plot Armor', jp: '主人公補正', text: 'Once: a hit that would end your run leaves you on one heart.', rarity: 'epic', repeat: false },
  { id: 'filler_episode', name: 'Filler Episode', jp: '総集編', text: 'Skip the next non-boss floor. It still counts.', rarity: 'epic', repeat: false },
];

export const BOONS_BY_ID: Readonly<Record<BoonId, BoonDef>> = Object.fromEntries(BOONS.map((b) => [b.id, b])) as Record<BoonId, BoonDef>;

// ── playable characters ──────────────────────────────────────────────────

export interface CharacterDef {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly look: EnemyLook;
  /** Extra kit drawn on the player: a scarf and headband, in these colours. */
  readonly scarf: string | null;
  readonly headband: string | null;
  /** Credits; 0 is the free starter. */
  readonly price: number;
  /** Shouted in the finisher cut-in. */
  readonly cry: string;
}

export const CHARACTER_PRICE = 500;

export const CHARACTERS: readonly CharacterDef[] = [
  { id: 'kaito', name: 'Kaito', title: 'The new kid with a borrowed sword', price: 0, cry: '必殺!', scarf: '#e8443a', headband: '#e8443a',
    look: { hair: '#1b2340', outfit: '#20263a', skin: '#f7d7bf', eye: '#e8443a', accent: '#e8443a', style: 'rival', weapon: 'katana' } },
  { id: 'hikari', name: 'Hikari', title: 'Magical girl, off duty', price: CHARACTER_PRICE, cry: '星光斬!', scarf: '#ff8fc8', headband: null,
    look: { hair: '#ff9ccf', outfit: '#3b4f8f', skin: '#fbe3d6', eye: '#ff4fa3', accent: '#ff4fa3', style: 'monitor', weapon: 'blade' } },
  { id: 'kage', name: 'Kage', title: 'Never seen, never late', price: CHARACTER_PRICE, cry: '影縫い!', scarf: '#3a3f55', headband: null,
    look: { hair: '#15171f', outfit: '#1c2030', skin: '#ecd0b6', eye: '#7ad4ff', accent: '#7ad4ff', style: 'ninja', weapon: 'kunai' } },
  { id: 'mai', name: 'Mai', title: 'Fox spirit who got bored of shrines', price: CHARACTER_PRICE, cry: '狐火!', scarf: null, headband: null,
    look: { hair: '#f2a03a', outfit: '#f2f0ea', skin: '#fae3d2', eye: '#e0b13a', accent: '#d23b3b', style: 'kitsune', weapon: 'claw' } },
  { id: 'zero', name: 'Unit Zero', title: 'Deleted the safety limits', price: CHARACTER_PRICE, cry: 'OVERDRIVE!', scarf: '#29e3ff', headband: null,
    look: { hair: '#d7dbe6', outfit: '#1e2236', skin: '#e9d2c2', eye: '#29e3ff', accent: '#29e3ff', style: 'cyborg', weapon: 'blade' } },
  { id: 'tetsu', name: 'Tetsu', title: 'Oni who quit the bad guys', price: CHARACTER_PRICE, cry: '鬼神撃!', scarf: '#ffd23f', headband: null,
    look: { hair: '#1a1a1a', outfit: '#3a1d1d', skin: '#e05a4a', eye: '#ffd23f', accent: '#ffd23f', style: 'oni', weapon: 'club' } },
  { id: 'lilith', name: 'Lilith', title: 'Demon queen on holiday', price: CHARACTER_PRICE, cry: '魔王降臨!', scarf: '#ff3b8a', headband: null,
    look: { hair: '#5a1a6b', outfit: '#2a0f2f', skin: '#f2cfd8', eye: '#ff3b8a', accent: '#ff3b8a', style: 'kitsune', weapon: 'claw' } },
  { id: 'ren', name: 'Ren', title: 'Your rival. Fine. Teammate.', price: CHARACTER_PRICE, cry: '蒼天斬!', scarf: '#4fb3e0', headband: null,
    look: { hair: '#1c2a5a', outfit: '#1a1d2b', skin: '#f2d2bb', eye: '#4fb3e0', accent: '#4fb3e0', style: 'rival', weapon: 'katana' } },
];
export const CHARACTERS_BY_ID: Readonly<Record<string, CharacterDef>> = Object.fromEntries(CHARACTERS.map((c) => [c.id, c]));
export const DEFAULT_CHARACTER = 'kaito';

// ── streak ───────────────────────────────────────────────────────────────

/** +5% per day in a row, up to day 20 (+100%). */
export const STREAK_STEP = 5;
export const STREAK_CAP = 20;
export function streakBonusPercent(streak: number): number {
  return STREAK_STEP * Math.max(0, Math.min(STREAK_CAP, Math.trunc(streak)));
}
export function payoutWithStreak(fellOn: number, cleared: boolean, streak: number): number {
  return Math.round((payoutFor(fellOn, cleared) * (100 + streakBonusPercent(streak))) / 100);
}

// ── practice ─────────────────────────────────────────────────────────────

/** Practice pays 1 credit per floor cleared, up to this many a day. */
export const PRACTICE_PER_FLOOR = 1;
export const PRACTICE_DAILY_CAP = 10;
