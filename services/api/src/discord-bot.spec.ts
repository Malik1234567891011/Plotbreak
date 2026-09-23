import { describe, expect, it } from 'vitest';
import { NoopSink } from '@plotbreak/analytics';
import { discordAccountCreatedAt, handleDiscordMessage, newDiscordCode } from './discord-bot.js';
import { syncBadges, type PlayerRecord } from './badges.js';
import { MemoryRepository } from './repo/memory.js';
import type { AppContext } from './context.js';

const NOW = new Date('2026-09-23T12:00:00Z');
/** A Discord id minted `days` before NOW. */
const discordIdAged = (days: number): string =>
  ((BigInt(NOW.getTime() - days * 86_400_000) - 1_420_070_400_000n) << 22n).toString();
const OLD = discordIdAged(400);
const OTHER_OLD = discordIdAged(300);

const empty: PlayerRecord = {
  runs: [], genresPlayed: 0, daysPlayed: 0, endingsReached: 0, rareEndings: 0,
  hasFreeformed: false, hasReturned: false, apexTurns: 0,
};

function setup() {
  const repo = new MemoryRepository();
  const ctx = { repo, analytics: new NoopSink(), config: { environment: 'dev' } } as unknown as AppContext;
  const say = (authorId: string, content: string) => handleDiscordMessage(ctx, { authorId, content }, NOW);
  return { repo, say };
}

describe('discord codes', () => {
  it('look like PB- and six unambiguous characters', () => {
    for (let i = 0; i < 50; i++) expect(newDiscordCode()).toMatch(/^PB-[A-HJ-NP-Z2-9]{6}$/);
  });

  it('read an account age off the snowflake', () => {
    expect(discordAccountCreatedAt(discordIdAged(10)).getTime()).toBeCloseTo(NOW.getTime() - 10 * 86_400_000, -3);
  });
});

describe('the Discord quest bot', () => {
  it('ignores a message with no code in it', async () => {
    const { say } = setup();
    expect(await say(OLD, 'hi everyone!')).toBeNull();
  });

  it('links the account and unlocks the badge, keeping it unlocked after a badge sync', async () => {
    const { repo, say } = setup();
    const { code } = await repo.getOrCreateDiscordCode('u1', 'PB-ABCDEF');
    const reply = await say(OLD, `hey! my code is ${code.toLowerCase()}`);
    expect(reply?.reaction).toBe('✅');

    const { progress } = await syncBadges(repo, 'u1', empty);
    expect(progress.find((p) => p.badgeId === 'discord_hello')?.unlockedAt).not.toBeNull();
    expect(await repo.claimBadge('u1', 'discord_hello', NOW.toISOString())).toBe(true);
  });

  it('keeps the first code a player was given', async () => {
    const { repo } = setup();
    await repo.getOrCreateDiscordCode('u1', 'PB-ABCDEF');
    expect((await repo.getOrCreateDiscordCode('u1', 'PB-ZZZZZZ')).code).toBe('PB-ABCDEF');
  });

  it('refuses a Discord account younger than a week', async () => {
    const { repo, say } = setup();
    await repo.getOrCreateDiscordCode('u1', 'PB-ABCDEF');
    expect((await say(discordIdAged(2), 'PB-ABCDEF'))?.reaction).toBe('⏳');
    expect((await syncBadges(repo, 'u1', empty)).progress.find((p) => p.badgeId === 'discord_hello')?.unlockedAt)
      .toBeNull();
  });

  it('refuses a code nobody was given', async () => {
    const { say } = setup();
    expect((await say(OLD, 'PB-QQQQQQ'))?.reaction).toBe('❓');
  });

  it('lets one Discord account unlock one Plotbreak account', async () => {
    const { repo, say } = setup();
    await repo.getOrCreateDiscordCode('u1', 'PB-AAAAAA');
    await repo.getOrCreateDiscordCode('u2', 'PB-BBBBBB');
    expect((await say(OLD, 'PB-AAAAAA'))?.reaction).toBe('✅');
    expect((await say(OLD, 'PB-BBBBBB'))?.reaction).toBe('❌');
  });

  it('refuses a code somebody else already used, and is friendly to the one who used it', async () => {
    const { repo, say } = setup();
    await repo.getOrCreateDiscordCode('u1', 'PB-AAAAAA');
    await say(OLD, 'PB-AAAAAA');
    expect((await say(OLD, 'PB-AAAAAA'))?.reaction).toBe('✅');
    expect((await say(OTHER_OLD, 'PB-AAAAAA'))?.reaction).toBe('❌');
  });
});
