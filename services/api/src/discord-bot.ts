/**
 * The Discord quest's other half. See docs/discord-quest.md.
 *
 * The app shows each player a code; the player posts it in the community
 * server; this bot sees the post, links the two accounts and unlocks
 * `discord_hello`. The credits are paid by the ordinary badge claim, so this
 * file never touches the wallet and cannot pay anybody twice.
 *
 * `handleDiscordMessage` is the whole decision and has no Discord in it, so it
 * is tested directly. `startDiscordBot` is only the wiring.
 */
import { randomInt } from 'node:crypto';
import { analyticsFor } from '@plotbreak/analytics';
import { CONTRACT_VERSION } from '@plotbreak/contracts';
import type { AppContext } from './context.js';

export const DISCORD_BADGE_ID = 'discord_hello';

/** No 0/O or 1/I, so a code read off a phone and typed survives. */
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const CODE_PATTERN = /\bPB-([A-Z2-9]{6})\b/i;

/** Discord accounts younger than this are refused, which stops fresh throwaways. */
export const MIN_DISCORD_ACCOUNT_AGE_DAYS = 7;
const DISCORD_EPOCH_MS = 1_420_070_400_000;

export function newDiscordCode(): string {
  let code = 'PB-';
  for (let i = 0; i < 6; i++) code += ALPHABET[randomInt(ALPHABET.length)];
  return code;
}

/** A Discord id is a snowflake: its top bits are the account's creation time. */
export function discordAccountCreatedAt(discordUserId: string): Date {
  return new Date(Number(BigInt(discordUserId) >> 22n) + DISCORD_EPOCH_MS);
}

export type DiscordLocale = 'en' | 'fr';

/**
 * The reply language, from the member's roles. A `Français` role (with or
 * without the ç, any case) means French; everyone else, including somebody
 * holding both roles, gets English.
 *
 * Only the letters of a role name count: the server's roles are named
 * `🇫🇷 Français` and `🇬🇧 English`, and the flag made an exact match miss.
 */
export function localeFromRoles(roleNames: readonly string[]): DiscordLocale {
  const names = roleNames.map((n) => n.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^a-z]/g, ''));
  return names.includes('francais') && !names.includes('english') ? 'fr' : 'en';
}

const REPLIES = {
  en: {
    tooNew: (days: number) => `This Discord account is too new to claim the reward. Try again once it is ${days} days old.`,
    unknown: 'I don\'t recognise that code. Copy it from Profile → Badges in Plotbreak.',
    alreadyYours: 'You\'re already linked. Open Plotbreak → Badges to claim your credits.',
    usedByOther: 'That code has already been used by someone else.',
    discordTaken: 'This Discord account is already linked to another Plotbreak account.',
    linked: 'Welcome in! Open Plotbreak → Badges and claim your 250 credits.',
  },
  fr: {
    tooNew: (days: number) => `Ce compte Discord est trop récent pour la récompense. Réessaie quand il aura ${days} jours.`,
    unknown: 'Je ne reconnais pas ce code. Copie-le depuis Profil → Badges dans Plotbreak.',
    alreadyYours: 'Ton compte est déjà lié. Ouvre Plotbreak → Badges pour récupérer tes crédits.',
    usedByOther: 'Ce code a déjà été utilisé par quelqu’un d’autre.',
    discordTaken: 'Ce compte Discord est déjà lié à un autre compte Plotbreak.',
    linked: 'Bienvenue ! Ouvre Plotbreak → Badges et récupère tes 250 crédits.',
  },
} as const;

export interface DiscordReply {
  readonly reaction: string;
  readonly text: string;
}

/**
 * What to do about one message. Null means it had no code and is ignored,
 * which is every ordinary message in the server.
 */
export async function handleDiscordMessage(
  ctx: Pick<AppContext, 'repo' | 'analytics' | 'config'>,
  message: { readonly authorId: string; readonly content: string; readonly locale?: DiscordLocale },
  now: Date = new Date(),
): Promise<DiscordReply | null> {
  const match = CODE_PATTERN.exec(message.content);
  if (!match) return null;
  const say = REPLIES[message.locale ?? 'en'];
  const code = `PB-${match[1]!.toUpperCase()}`;

  const ageDays = (now.getTime() - discordAccountCreatedAt(message.authorId).getTime()) / 86_400_000;
  if (ageDays < MIN_DISCORD_ACCOUNT_AGE_DAYS) {
    return { reaction: '⏳', text: say.tooNew(MIN_DISCORD_ACCOUNT_AGE_DAYS) };
  }

  const result = await ctx.repo.linkDiscord(code, message.authorId, now.toISOString());
  switch (result.status) {
    case 'UNKNOWN_CODE':
      return { reaction: '❓', text: say.unknown };
    case 'CODE_USED':
      return result.sameDiscordUser
        ? { reaction: '✅', text: say.alreadyYours }
        : { reaction: '❌', text: say.usedByOther };
    case 'DISCORD_TAKEN':
      return { reaction: '❌', text: say.discordTaken };
    case 'LINKED': {
      await ctx.repo.upsertBadge({
        userId: result.userId,
        badgeId: DISCORD_BADGE_ID,
        progress: 1,
        unlockedAt: now.toISOString(),
        claimedAt: null,
      });
      const user = await ctx.repo.getUser(result.userId);
      analyticsFor(ctx.analytics, {
        anonymousId: result.userId,
        userId: result.userId,
        isGuest: user?.isGuest ?? false,
        // No device made this request. 'web' is what every automated caller
        // is labelled, so this never pads the iOS numbers.
        platform: 'web',
        appVersion: 'discord-bot',
        contractVersion: CONTRACT_VERSION,
        environment: ctx.config.environment,
      }).track('discord_linked', { discordAccountAgeDays: Math.floor(ageDays) });
      return { reaction: '✅', text: say.linked };
    }
  }
}

/**
 * Connects to Discord when `DISCORD_BOT_TOKEN` is set, and does nothing
 * otherwise. A bot that fails to log in is logged and left alone: the API is
 * what players need, and the quest can wait for a restart.
 */
export async function startDiscordBot(
  ctx: AppContext,
  log: { info(obj: object, msg: string): void; warn(obj: unknown, msg: string): void },
  env: NodeJS.ProcessEnv = process.env,
): Promise<{ stop(): Promise<void> } | null> {
  const token = env.DISCORD_BOT_TOKEN;
  if (!token) return null;
  const channelId = env.DISCORD_CLAIM_CHANNEL_ID || null;

  // Loaded only when configured, so a process without a token never pays for it.
  const { Client, Events, GatewayIntentBits } = await import('discord.js');
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  });

  client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;
    if (channelId && message.channelId !== channelId) return;
    // Role names come from the guild's role cache, which the Guilds intent
    // already fills, so this needs no extra (privileged) members intent.
    const roleNames = message.member?.roles.cache.map((role) => role.name) ?? [];
    const locale = localeFromRoles(roleNames);
    void handleDiscordMessage(ctx, { authorId: message.author.id, content: message.content, locale })
      .then(async (reply) => {
        if (!reply) return;
        await message.react(reply.reaction).catch(() => undefined);
        await message.reply({ content: reply.text, allowedMentions: { repliedUser: false } });
      })
      .catch((error: unknown) => log.warn(error, 'discord quest message failed'));
  });
  client.once(Events.ClientReady, (ready) => log.info({ bot: ready.user.tag, channelId }, 'Discord quest bot ready'));

  try {
    await client.login(token);
  } catch (error) {
    log.warn(error, 'Discord quest bot could not log in');
    return null;
  }
  return { stop: () => client.destroy() };
}
