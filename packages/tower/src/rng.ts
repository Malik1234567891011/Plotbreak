/** Small deterministic PRNG (mulberry32). Integer maths only, so it agrees across JS engines. */
export class Rng {
  #s: number;

  constructor(seed: number) {
    this.#s = seed >>> 0 || 0x9e3779b9;
  }

  next(): number {
    this.#s = (this.#s + 0x6d2b79f5) >>> 0;
    let z = this.#s;
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return (z ^ (z >>> 14)) >>> 0;
  }

  /** Inclusive range. */
  range(min: number, max: number): number {
    if (max <= min) return min;
    return min + (this.next() % (max - min + 1));
  }

  /** True with probability perMille / 1000. */
  chance(perMille: number): boolean {
    return this.next() % 1000 < perMille;
  }

  weighted(weights: Readonly<Record<string, number>>): string {
    const keys = Object.keys(weights);
    let total = 0;
    for (const k of keys) total += weights[k]!;
    let r = this.next() % total;
    for (const k of keys) {
      r -= weights[k]!;
      if (r < 0) return k;
    }
    return keys[keys.length - 1]!;
  }
}

/** The seed everyone climbs on a given UTC day (YYYY-MM-DD). */
export function daySeed(day: string): number {
  let h = 2166136261;
  for (let i = 0; i < day.length; i++) {
    h ^= day.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
