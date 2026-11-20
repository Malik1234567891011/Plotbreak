import { describe, expect, it } from 'vitest';
import { BotDriver, ENTRY_FEE, SKILLS, TowerSim, daySeed, payoutFor, playBotInto } from '@plotbreak/tower';
import { MemoryRepository } from './repo/memory.js';
import { TowerService, isFreeDay, parseInputs, towerEnabledFor } from './tower.js';
import { WalletService } from './wallet.js';

const USER = '00000000-0000-4000-8000-000000000001';

function setup(start = '2026-11-20T15:00:00Z') {
  let now = new Date(start);
  const clock = () => now;
  const repo = new MemoryRepository();
  const wallet = new WalletService(repo, clock);
  const tower = new TowerService(repo, wallet, clock);
  return { repo, wallet, tower, advance: (ms: number) => { now = new Date(now.getTime() + ms); }, set: (iso: string) => { now = new Date(iso); } };
}

/** Plays today's seed with a bot and returns the inputs it made. */
function play(seed: number, skill: number) {
  const sim = new TowerSim(seed);
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
    expect(done.reward).toBe(payoutFor(result.fellOn, result.cleared));
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
    expect(done.reward).toBe(30);
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
    const sim = new TowerSim(run.seed);
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

  it('everyone climbs the same tower each day', async () => {
    const { wallet, tower } = setup();
    await wallet.grant(USER, 'PROMO_GRANT', 100, 'seed');
    expect((await tower.start(USER, null)).seed).toBe(daySeed('2026-11-20'));
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
