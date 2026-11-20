/** Every sound is synthesised: no files in the bundle, nothing to license. */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;

try {
  muted = localStorage.getItem('tower-muted') === '1';
} catch {
  /* private mode */
}

export function unlockAudio(): void {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.55;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(m: boolean): void {
  muted = m;
  if (master) master.gain.value = m ? 0 : 0.55;
  try {
    localStorage.setItem('tower-muted', m ? '1' : '0');
  } catch {
    /* private mode */
  }
}

function noiseBuffer(): AudioBuffer | null {
  if (!ctx) return null;
  const len = Math.floor(ctx.sampleRate * 0.6);
  const b = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
let noise: AudioBuffer | null = null;

function tone(freq: number, dur: number, type: OscillatorType, vol: number, slideTo?: number, delay = 0): void {
  if (!ctx || !master) return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function burst(dur: number, vol: number, freq: number, q: number, type: BiquadFilterType = 'bandpass', slideTo?: number, delay = 0): void {
  if (!ctx || !master) return;
  noise ??= noiseBuffer();
  if (!noise) return;
  const t = ctx.currentTime + delay;
  const s = ctx.createBufferSource();
  s.buffer = noise;
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.setValueAtTime(freq, t);
  if (slideTo) f.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f).connect(g).connect(master);
  s.start(t);
  s.stop(t + dur + 0.02);
}

export const sfx = {
  tele(heavy: boolean): void {
    if (heavy) { tone(180, 0.18, 'sawtooth', 0.12, 120); tone(90, 0.25, 'square', 0.08); }
    else tone(1320, 0.06, 'square', 0.06);
  },
  parry(perfect: boolean): void {
    // Metal on metal: two inharmonic partials and a bright click.
    tone(perfect ? 2350 : 1850, perfect ? 0.32 : 0.2, 'square', 0.11);
    tone(perfect ? 3180 : 2610, perfect ? 0.26 : 0.16, 'triangle', 0.09);
    burst(0.05, 0.5, 5000, 0.7, 'highpass');
    if (perfect) tone(4200, 0.4, 'sine', 0.06, 5200, 0.03);
  },
  kunai(): void {
    tone(2900, 0.1, 'square', 0.07);
    burst(0.04, 0.3, 6000, 1, 'highpass');
  },
  hit(): void {
    burst(0.22, 0.7, 900, 0.8, 'lowpass', 120);
    tone(140, 0.25, 'sine', 0.35, 50);
  },
  dodge(): void {
    burst(0.18, 0.35, 600, 1.4, 'bandpass', 2600);
  },
  whiff(): void {
    burst(0.12, 0.18, 1800, 2, 'bandpass', 700);
  },
  counter(): void {
    burst(0.12, 0.6, 2500, 0.8, 'bandpass', 600);
    tone(220, 0.2, 'square', 0.12, 110);
  },
  breakGuard(final: boolean): void {
    burst(0.5, 0.7, 4000, 0.6, 'bandpass', 300);
    tone(final ? 98 : 130, 0.6, 'sawtooth', 0.18, 40, 0.05);
    tone(1760, 0.5, 'triangle', 0.06, 880, 0.1);
  },
  cutin(): void {
    burst(0.35, 0.3, 300, 0.8, 'bandpass', 3000);
  },
  floor(boss: boolean): void {
    if (boss) { tone(55, 1.2, 'sawtooth', 0.16); tone(58, 1.2, 'sawtooth', 0.12); }
    else { tone(660, 0.12, 'square', 0.06); tone(990, 0.16, 'square', 0.06, undefined, 0.1); }
  },
  pick(): void {
    tone(880, 0.12, 'triangle', 0.1); tone(1320, 0.18, 'triangle', 0.1, undefined, 0.08); tone(1760, 0.3, 'sine', 0.08, undefined, 0.16);
  },
  heal(): void {
    tone(660, 0.2, 'sine', 0.1, 990); tone(990, 0.3, 'sine', 0.08, 1320, 0.1);
  },
  saved(): void {
    tone(1200, 0.3, 'triangle', 0.1, 2400);
  },
  dead(): void {
    tone(392, 0.5, 'triangle', 0.12, 196); tone(294, 0.7, 'triangle', 0.1, 98, 0.25);
  },
  won(): void {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.4, 'square', 0.07, undefined, i * 0.12));
  },
  coin(): void {
    tone(1568, 0.08, 'square', 0.05); tone(2093, 0.14, 'square', 0.05, undefined, 0.06);
  },
};
