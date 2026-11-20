import { describe, expect, it } from 'vitest';
import { CHARACTER_PRICE, ENTRY_FEE, PRACTICE_DAILY_CAP, TowerSim, dailyTower, payoutFor, payoutWithStreak } from '@plotbreak/tower';
import { BotDriver, SKILLS, playBotInto } from '@plotbreak/tower/bots';
import { MemoryRepository } from './repo/memory.js';
import { TowerService, isFreeDay, parseInputs, towerEnabledFor } from './tower.js';
import { WalletService } from './wallet.js';

const USER = '00000000-0000-4000-8000-000000000001';

function setup(start = '2026-11-20T15:00:00Z', seed = 424242) {
  let now = new Date(start);
  const clock = () => now;
  const repo = new MemoryRepository();
  const wallet = new WalletService(repo, clock);
  const tower = new TowerService(repo, wallet, clock, () => seed);
  return { repo, wallet, tower, advance: (ms: number) => { now = new Date(now.getTime() + ms); }, set: (iso: string) => { now = new Date(iso); } };
}

/** Plays today's seed with a bot and returns the inputs it made. */
function play(seed: number, skill: number, day = '2026-11-20') {
  const sim = new TowerSim(seed, dailyTower(day));
  const r = playBotInto(sim, skill, 3);
  return { inputs: sim.inputs, result: r };
}

describe('the Tower', () => {
  it('charges the entry once and refuses a second climb the same day', async () => {
    const { wallet, tower, advance } = setup();
    await wallet.grant(USER, 'PROMO_GRANT', 100, 'seed');
    const a = await tower.start(USER, '1.0.10');
    expect(a.fee).toBe(ENTRY_FEE);
    expect(await wallet.getBalance(USER)).toBe(100 - ENTRY_FEE);
    const again = await tower.start(USER, '1.0.10');
    expect(again.runId).toBe(a.runId);
    expect(again.resumed).toBe(true);
    expect(await wallet.getBalance(USER)).toBe(100 - ENTRY_FEE);

    const { inputs, result } = play(a.seed, 2);
    advance(result.ticks * 17 + 5_000);
    const done = await tower.finish(USER, a.runId, inputs, 300_000);
    expect(done.fellOn).toBe(result.cleared ? 30 : result.fellOn);
    expect(done.reward).toBe(payoutWithStreak(result.fellOn, result.cleared, 1));
    expect(done.base).toBe(payoutFor(result.fellOn, result.cleared));
    expect(done.balance).toBe(100 - ENTRY_FEE + done.reward);
    await expect(tower.start(USER, '1.0.10')).rejects.toThrow(/done/);
    // Finishing twice pays once.
    const twice = await tower.finish(USER, a.runId, inputs, 1);
    expect(twice.reward).toBe(done.reward);
    expect(await wallet.getBalance(USER)).toBe(100 - ENTRY_FEE + done.reward);
  });

  it('decides the floor by replaying, whatever the client claims', async () => {
    const { wallet, tower, advance } = setup();
    await wallet.grant(USER, 'PROMO_GRANT', 100, 'seed');
    const run = await tower.start(USER, null);
    const { inputs, result } = play(run.seed, 0); // a toddler falls on 6–10
    advance(10 * 60_000);
    const done = await tower.finish(USER, run.runId, inputs, 0);
    expect(done.fellOn).toBe(result.fellOn);
    expect(done.reward).toBe(payoutWithStreak(result.fellOn, false, 1));
  });

  it('pays the minimum for a run finished faster than it could be played', async () => {
    const { wallet, tower, advance } = setup();
    await wallet.grant(USER, 'PROMO_GRANT', 100, 'seed');
    const run = await tower.start(USER, null);
    const { inputs } = play(run.seed, 5);
    advance(20_000);
    const done = await tower.finish(USER, run.runId, inputs, 1);
    expect(done.reward).toBe(5);
  });

  it('needs the entry fee, except on Sunday', async () => {
    const { tower, wallet, set } = setup();
    await expect(tower.start(USER, null)).rejects.toThrow(/Insufficient/);
    set('2026-11-22T15:00:00Z');
    expect(isFreeDay('2026-11-22')).toBe(true);
    const free = await tower.start(USER, null);
    expect(free.fee).toBe(0);
    expect(await wallet.getBalance(USER)).toBe(0);
  });

  it('settles yesterday’s unfinished climb from its last checkpoint', async () => {
    const { wallet, tower, set, repo } = setup();
    await wallet.grant(USER, 'PROMO_GRANT', 100, 'seed');
    const run = await tower.start(USER, null);
    const sim = new TowerSim(run.seed, dailyTower('2026-11-20'));
    const bot = new BotDriver(SKILLS[3]!, 1);
    while (sim.floor < 8 && !sim.over) { bot.beforeStep(sim); sim.step(); }
    await tower.checkpoint(USER, run.runId, sim.inputs, sim.floor);
    set('2026-11-21T09:00:00Z');
    const status = await tower.status(USER);
    expect(status.today).toBeNull();
    const settled = (await repo.getTowerRunById(run.runId))!;
    expect(settled.abandoned).toBe(true);
    expect(settled.fellOn).toBeGreaterThanOrEqual(7);
    expect(await wallet.getBalance(USER)).toBe(100 - ENTRY_FEE + (settled.reward ?? 0));
    expect(status.best).toBe(settled.fellOn);
  });

  it('pays the minimum to a run that taps dead-centre every time', async () => {
    const { wallet, tower, advance } = setup(undefined, 1);
    await wallet.grant(USER, 'PROMO_GRANT', 100, 'seed');
    const run = await tower.start(USER, null);
    // A script: an expert with no noise at all.
    const sim = new TowerSim(run.seed, dailyTower('2026-11-20'));
    const bot = new BotDriver({ ...SKILLS[5]!, sigma: 0, bias: -1, react: 0, lapse: 0, bite: 0, misread: 0, stanceBite: 0 }, 1, 0);
    while (!sim.over && sim.tick < 60 * 60 * 30) { bot.beforeStep(sim); sim.step(); }
    advance(sim.tick * 17 + 5_000);
    const done = await tower.finish(USER, run.runId, sim.inputs, sim.tick * 17);
    expect(done.reward).toBe(5);
  });

  it('grows the payout 5% a day while the streak holds, and resets after a missed day', async () => {
    const { wallet, tower, set, advance } = setup('2026-11-16T15:00:00Z');
    await wallet.grant(USER, 'PROMO_GRANT', 1000, 'seed');
    const climb = async () => {
      const run = await tower.start(USER, null);
      const day = (await tower.status(USER)).day;
      const { inputs } = play(run.seed, 0, day);
      advance(10 * 60_000);
      return { run, done: await tower.finish(USER, run.runId, inputs, 0) };
    };
    const a = await climb();
    expect(a.run.streak).toBe(1);
    set('2026-11-17T15:00:00Z');
    const b = await climb();
    expect(b.run.streak).toBe(2);
    expect(b.done.reward).toBe(Math.round(b.done.base * 1.1));
    expect((await tower.status(USER)).streak.days).toBe(2);
    set('2026-11-19T15:00:00Z'); // skipped the 18th
    const s = await tower.status(USER);
    expect(s.streak.alive).toBe(false);
    expect(s.streak.todayBonusPercent).toBe(5);
    expect((await climb()).run.streak).toBe(1);
  });

  it('pays practice 1 credit a floor, at most 10 a day, and never touches the daily try', async () => {
    const { wallet, tower, advance } = setup();
    await wallet.grant(USER, 'PROMO_GRANT', 100, 'seed');
    let total = 0;
    for (let i = 0; i < 4; i++) {
      const p = await tower.startPractice(USER, null);
      const { inputs, result } = play(p.seed, 2);
      advance(10 * 60_000);
      const done = await tower.finish(USER, p.runId, inputs, 0);
      expect(done.practice).toBe(true);
      expect(done.reward).toBeLessThanOrEqual(result.cleared ? 30 : result.fellOn - 1);
      total += done.reward;
    }
    expect(total).toBe(PRACTICE_DAILY_CAP);
    expect(await wallet.getBalance(USER)).toBe(100 + PRACTICE_DAILY_CAP);
    const s = await tower.status(USER);
    expect(s.today).toBeNull();
    expect(s.practice.earnedToday).toBe(PRACTICE_DAILY_CAP);
    expect(s.best).toBe(0);
  });

  it('sells characters for 500 once, and only lets you use what you own', async () => {
    const { wallet, tower } = setup();
    await wallet.grant(USER, 'PROMO_GRANT', 600, 'seed');
    await expect(tower.selectCharacter(USER, 'hikari')).rejects.toThrow(/Buy/);
    const bought = await tower.buyCharacter(USER, 'hikari');
    expect(bought.selected).toBe('hikari');
    expect(bought.owned).toContain('hikari');
    expect(bought.balance).toBe(600 - CHARACTER_PRICE);
    await tower.buyCharacter(USER, 'hikari');
    expect(await wallet.getBalance(USER)).toBe(600 - CHARACTER_PRICE);
    await expect(tower.buyCharacter(USER, 'kage')).rejects.toThrow(/Insufficient/);
    await tower.selectCharacter(USER, 'kaito');
    expect((await tower.status(USER)).characters.selected).toBe('kaito');
    const run = await tower.start(USER, null);
    expect(run.characterId).toBe('kaito');
  });

  it('rejects malformed inputs', () => {
    expect(() => parseInputs([{ t: 5, k: 'tap' }, { t: 4, k: 'tap' }])).toThrow();
    expect(() => parseInputs([{ t: 1, k: 'nuke' }])).toThrow();
    expect(() => parseInputs([{ t: 1, k: 'pick', v: 7 }])).toThrow();
    expect(parseInputs([{ t: 1, k: 'pick', v: 2 }])).toEqual([{ t: 1, k: 'pick', v: 2 }]);
  });

  it('is off unless switched on', () => {
    expect(towerEnabledFor(USER, {})).toBe(false);
    expect(towerEnabledFor(USER, { PLOTBREAK_TOWER: 'all' })).toBe(true);
    expect(towerEnabledFor(USER, { PLOTBREAK_TOWER: USER })).toBe(true);
    expect(towerEnabledFor(USER, { PLOTBREAK_TOWER: '0%' })).toBe(false);
    expect(towerEnabledFor(USER, { PLOTBREAK_TOWER: '100%' })).toBe(true);
  });
});
