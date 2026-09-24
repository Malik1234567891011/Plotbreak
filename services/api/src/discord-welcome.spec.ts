import { access, stat } from 'node:fs/promises';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Client, GatewayIntentBits, type ClientEvents, type GuildMember } from 'discord.js';
import { startDiscordBot } from './discord-bot.js';
import type { AppContext } from './context.js';
import { PLOTBREAK_DISCORD, registerDiscordWelcome, WELCOME_ART_PATH, welcomeMessage } from './discord-welcome.js';

const MEMBER_ID = '695510639690645605';

function setup() {
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
  const send = vi.fn().mockResolvedValue({ id: 'sent' });
  const fetch = vi.fn().mockResolvedValue({ isTextBased: () => true, isSendable: () => true, send });
  const log = { info: vi.fn(), warn: vi.fn() };
  const member = {
    id: MEMBER_ID,
    user: { bot: false },
    joinedTimestamp: 1_790_287_200_000,
    displayAvatarURL: () => 'https://cdn.discordapp.com/embed/avatars/0.png',
    guild: { id: PLOTBREAK_DISCORD.guildId, channels: { fetch } },
    permissions: { has: vi.fn().mockReturnValue(true) },
  };
  registerDiscordWelcome(client, PLOTBREAK_DISCORD.welcome, log);
  return { client, send, fetch, log, member };
}

afterEach(() => vi.restoreAllMocks());

describe('Discord member welcomes', () => {
  it('delivers a bilingual illustrated welcome to the configured channel on a real join event', async () => {
    const { client, member, send, fetch } = setup();
    client.emit('guildMemberAdd', member as unknown as GuildMember);
    await vi.waitFor(() => expect(send).toHaveBeenCalledOnce());
    expect(fetch).toHaveBeenCalledWith(PLOTBREAK_DISCORD.welcome);
    const payload = send.mock.calls[0]![0];
    expect(payload.allowedMentions).toEqual({ parse: [], users: [MEMBER_ID], repliedUser: false });
    expect(payload.embeds[0].fields.map((field: { name: string }) => field.name)).toEqual([
      '🇬🇧 Welcome to the playable anime!', '🇫🇷 Bienvenue dans l’anime jouable !',
    ]);
    expect(payload.embeds[0].image.url).toBe('attachment://discord-welcome.png');
    expect(payload.files[0].attachment).toBe(WELCOME_ART_PATH);
    await access(payload.files[0].attachment);
    expect((await stat(WELCOME_ART_PATH)).size).toBeLessThan(10 * 1024 * 1024);
    for (const field of payload.embeds[0].fields) expect(field.value.length).toBeLessThanOrEqual(1024);
  });

  it('ignores bots and joins in other servers', async () => {
    const { client, member, fetch } = setup();
    client.emit('guildMemberAdd', { ...member, user: { bot: true } } as unknown as GuildMember);
    client.emit('guildMemberAdd', { ...member, guild: { ...member.guild, id: 'another-server' } } as unknown as GuildMember);
    await new Promise<void>((resolve) => setImmediate(resolve));
    expect(fetch).not.toHaveBeenCalled();
  });

  it('uses the same Discord deduplication key for a repeated join and a new one for a rejoin', () => {
    const { member } = setup();
    const first = welcomeMessage(member);
    expect(welcomeMessage(member).nonce).toBe(first.nonce);
    expect(first.enforceNonce).toBe(true);
    expect(String(first.nonce).length).toBeLessThanOrEqual(25);
    expect(welcomeMessage({ ...member, joinedTimestamp: member.joinedTimestamp + 60_000 }).nonce).not.toBe(first.nonce);
  });

  it('allows a manager to preview in the welcome channel without pinging anyone', async () => {
    const { client, member, send } = setup();
    client.emit('messageCreate', {
      author: member.user, guildId: member.guild.id, channelId: PLOTBREAK_DISCORD.welcome,
      content: '!welcome-preview', member,
    } as unknown as ClientEvents['messageCreate'][0]);
    await vi.waitFor(() => expect(send).toHaveBeenCalledOnce());
    expect(member.permissions.has).toHaveBeenCalledWith('ManageGuild');
    expect(send.mock.calls[0]![0]).toMatchObject({
      content: expect.stringContaining('Welcome preview / Aperçu'),
      allowedMentions: { parse: [], users: [] },
    });
    expect(send.mock.calls[0]![0].nonce).toBeUndefined();
  });

  it('does not let ordinary members or another channel trigger a welcome preview', async () => {
    const { client, member, fetch } = setup();
    const message = {
      author: member.user, guildId: member.guild.id, channelId: PLOTBREAK_DISCORD.welcome,
      content: '!welcome-preview', member,
    };
    client.emit('messageCreate', { ...message, channelId: PLOTBREAK_DISCORD.english } as unknown as ClientEvents['messageCreate'][0]);
    member.permissions.has.mockReturnValue(false);
    client.emit('messageCreate', message as unknown as ClientEvents['messageCreate'][0]);
    await new Promise<void>((resolve) => setImmediate(resolve));
    expect(fetch).not.toHaveBeenCalled();
  });

  it('logs a delivery failure without throwing from the gateway event handler', async () => {
    const { client, member, send, log } = setup();
    send.mockRejectedValue(new Error('Missing Permissions'));
    client.emit('guildMemberAdd', member as unknown as GuildMember);
    await vi.waitFor(() => expect(log.warn).toHaveBeenCalledWith(expect.any(Error), 'Discord welcome failed'));
  });

  it('requests member events only when welcomes are configured, preserving quest-only deployments', async () => {
    const login = vi.spyOn(Client.prototype, 'login').mockResolvedValue('test-token');
    const log = { info: vi.fn(), warn: vi.fn() };
    for (const enabled of [false, true]) {
      const bot = await startDiscordBot({} as AppContext, log, {
        DISCORD_BOT_TOKEN: 'test-token',
        ...(enabled ? { DISCORD_WELCOME_CHANNEL_ID: PLOTBREAK_DISCORD.welcome } : {}),
      });
      const client = login.mock.contexts.at(-1) as Client;
      expect(client.options.intents.has(GatewayIntentBits.GuildMembers)).toBe(enabled);
      expect(client.listenerCount('guildMemberAdd')).toBe(enabled ? 1 : 0);
      expect(client.options.intents.has(GatewayIntentBits.MessageContent)).toBe(true);
      await bot?.stop();
    }
  });
});
