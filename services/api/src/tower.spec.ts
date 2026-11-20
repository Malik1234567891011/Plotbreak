import { describe, expect, it } from 'vitest';
import { CHARACTER_PRICE, ENTRY_FEE, PRACTICE_DAILY_CAP, TowerSim, dailyTower, payoutFor, payoutWithStreak } from '@plotbreak/tower';
import { BotDriver, SKILLS, playBotInto } from '@plotbreak/tower/bots';
import { MemoryRepository } from './repo/memory.js';
import { REVIVE_COSTS, TowerService, isFreeClimb, localDay, nextLocalMidnight, parseInputs, towerEnabledFor } from './tower.js';
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
    expect(a.fee).toBe(0); // the first climb of the week
    expect(await wallet.getBalance(USER)).toBe(100);
    const again = await tower.start(USER, '1.0.10');
    expect(again.runId).toBe(a.runId);
    expect(again.resumed).toBe(true);
    expect(await wallet.getBalance(USER)).toBe(100);

    const { inputs, result } = play(a.seed, 2);
    advance(result.ticks * 17 + 5_000);
    const done = await tower.finish(USER, a.runId, inputs, 300_000);
    expect(done.fellOn).toBe(result.cleared ? 30 : result.fellOn);
    expect(done.reward).toBe(payoutWithStreak(result.fellOn, result.cleared, 1));
    expect(done.base).toBe(payoutFor(result.fellOn, result.cleared));
    expect(done.balance).toBe(100 + done.reward);
    await expect(tower.start(USER, '1.0.10')).rejects.toThrow(/done/);
    // Finishing twice pays once.
    const twice = await tower.finish(USER, a.runId, inputs, 1);
    expect(twice.reward).toBe(done.reward);
    expect(await wallet.getBalance(USER)).toBe(100 + done.reward);
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

  it('makes the first climb of each week free, and charges the rest', async () => {
    // 2026-11-16 is a Monday.
    const { tower, wallet, set, advance } = setup('2026-11-17T15:00:00Z');
    expect(isFreeClimb('2026-11-17', [])).toBe(true);
    const first = await tower.start(USER, null);
    expect(first.fee).toBe(0);
    advance(60_000);
    await tower.finish(USER, first.runId, [], 0);
    set('2026-11-18T15:00:00Z');
    expect((await tower.status(USER)).free).toBe(false);
    await expect(tower.start(USER, null)).rejects.toThrow(/Insufficient/);
    await wallet.grant(USER, 'PROMO_GRANT', 40, 'seed');
    expect((await tower.start(USER, null)).fee).toBe(ENTRY_FEE);
    // A new week: free again.
    set('2026-11-23T15:00:00Z');
    expect((await tower.status(USER)).free).toBe(true);
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
    expect(await wallet.getBalance(USER)).toBe(100 - run.fee + (settled.reward ?? 0));
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

  it('revives a dead streak for 5, 20 or 50 depending on how long it has been dead', async () => {
    const { wallet, tower, set, advance } = setup('2026-11-16T15:00:00Z');
    await wallet.grant(USER, 'PROMO_GRANT', 1000, 'seed');
    const climb = async () => {
      const run = await tower.start(USER, null);
      const { inputs } = play(run.seed, 0, run.day);
      advance(10 * 60_000);
      return tower.finish(USER, run.runId, inputs, 0);
    };
    await climb();
    set('2026-11-17T15:00:00Z');
    await climb();
    set('2026-11-18T15:00:00Z');
    await climb();
    // Missed the 19th and 20th: dead for two days, so ◆20.
    set('2026-11-21T15:00:00Z');
    const dead = await tower.status(USER);
    expect(dead.streak.alive).toBe(false);
    expect(dead.revive).toEqual({ days: 3, cost: REVIVE_COSTS[1], nextCost: REVIVE_COSTS[2] });
    const before = await wallet.getBalance(USER);
    const r = await tower.revive(USER);
    expect(r.cost).toBe(20);
    expect(await wallet.getBalance(USER)).toBe(before - 20);
    const alive = await tower.status(USER);
    expect(alive.revive).toBeNull();
    expect(alive.streak.days).toBe(3);
    expect(alive.streak.todayBonusPercent).toBe(20);
    expect((await tower.start(USER, null)).streak).toBe(4);
  });

  it('lets a streak go for good after three dead days', async () => {
    const { wallet, tower, set, advance } = setup('2026-11-10T15:00:00Z');
    await wallet.grant(USER, 'PROMO_GRANT', 1000, 'seed');
    const run = await tower.start(USER, null);
    advance(60_000);
    await tower.finish(USER, run.runId, play(run.seed, 0, run.day).inputs, 0);
    set('2026-11-12T15:00:00Z');
    expect((await tower.status(USER)).revive?.cost).toBe(5);
    set('2026-11-14T15:00:00Z');
    expect((await tower.status(USER)).revive?.cost).toBe(50);
    set('2026-11-15T15:00:00Z');
    expect((await tower.status(USER)).revive).toBeNull();
    await expect(tower.revive(USER)).rejects.toThrow(/no streak/);
  });

  it('resets at the player’s own midnight, and only lets the zone move once a week', async () => {
    // 03:00 UTC on the 21st is still the 20th in Miami.
    const { wallet, tower, set } = setup('2026-11-21T03:00:00Z');
    await wallet.grant(USER, 'PROMO_GRANT', 100, 'seed');
    const s = await tower.status(USER, 'America/New_York');
    expect(s.day).toBe('2026-11-20');
    expect(s.timezone).toBe('America/New_York');
    expect(s.nextAt).toBe('2026-11-21T05:00:00.000Z');
    // A day later, trying to hop to Tokyo is ignored.
    set('2026-11-22T03:00:00Z');
    expect((await tower.status(USER, 'Asia/Tokyo')).timezone).toBe('America/New_York');
    set('2026-11-29T03:00:00Z');
    expect((await tower.status(USER, 'Asia/Tokyo')).timezone).toBe('Asia/Tokyo');
    expect(localDay(new Date('2026-11-21T03:00:00Z'), 'Asia/Tokyo')).toBe('2026-11-21');
    expect(nextLocalMidnight(new Date('2026-03-08T12:00:00Z'), 'America/New_York').toISOString()).toBe('2026-03-09T04:00:00.000Z');
    expect((await tower.status(USER, 'Not/AZone')).timezone).toBe('Asia/Tokyo');
  });

  it('practises from any floor up to your best, and pays only floors cleared from there', async () => {
    const { wallet, tower, advance } = setup();
    await wallet.grant(USER, 'PROMO_GRANT', 100, 'seed');
    await expect(tower.startPractice(USER, null, 5)).rejects.toThrow(/floor 1 to 1/);
    const run = await tower.start(USER, null);
    advance(10 * 60_000);
    const done = await tower.finish(USER, run.runId, play(run.seed, 3, run.day).inputs, 0);
    const best = (await tower.status(USER)).practice.maxFloor;
    expect(best).toBe(Math.min(30, done.fellOn));
    const p = await tower.startPractice(USER, null, best);
    expect(p.startFloor).toBe(best);
    const sim = new TowerSim(p.seed, dailyTower(p.day), p.startFloor);
    const live = playBotInto(sim, 3, 4);
    advance(10 * 60_000);
    const pd = await tower.finish(USER, p.runId, sim.inputs, 0);
    expect(pd.fellOn).toBe(live.cleared ? 30 : live.fellOn);
    expect(pd.reward).toBe(Math.min(PRACTICE_DAILY_CAP, live.cleared ? 31 - best : live.fellOn - best));
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
