import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import type { Client, GuildMember, MessageCreateOptions } from 'discord.js';

/** The community links belong to this server, never another bot installation. */
export const PLOTBREAK_DISCORD = {
  guildId: '1539105290891304964',
  welcome: '1550615471693373552',
  rules: '1550615642904862841',
  english: '1539105293043109910',
  french: '1550615851420360805',
  support: '1539234577644519485',
  aide: '1550615952763392030',
} as const;

const ART_NAME = 'discord-welcome.png';
export const WELCOME_ART_PATH = fileURLToPath(new URL(`../assets/${ART_NAME}`, import.meta.url));
export const WELCOME_PREVIEW_COMMAND = '!welcome-preview';

type WelcomeMember = Pick<GuildMember, 'id' | 'joinedTimestamp' | 'displayAvatarURL'>;
type WelcomeLog = { info(obj: object, msg: string): void; warn(obj: unknown, msg: string): void };

/** Shared by real joins and the moderator preview, including the attachment. */
export function welcomeMessage(member: WelcomeMember, preview = false): MessageCreateOptions {
  const channels = PLOTBREAK_DISCORD;
  return {
    content: preview
      ? `🧪 Welcome preview / Aperçu du message de bienvenue — <@${member.id}>`
      : `👋 Welcome to Plotbreak, <@${member.id}> ! Bienvenue dans l’aventure !`,
    allowedMentions: { parse: [], users: preview ? [] : [member.id], repliedUser: false },
    embeds: [{
      color: 0x7c6cff,
      title: 'Your next story starts here. • Ta prochaine histoire commence ici.',
      thumbnail: { url: member.displayAvatarURL({ size: 128 }) },
      fields: [
        {
          name: '🇬🇧 Welcome to the playable anime!',
          value: [
            `You’re in! Say hi in <#${channels.english}>, read <#${channels.rules}>, and share your next adventure.`,
            `🎁 **250 free credits:** find your code in **Profile → Badges**. See the pinned guide in <#${channels.rules}> for steps and eligibility.`,
            `🛟 Need help? <#${channels.support}>.`,
          ].join('\n\n'),
        },
        {
          name: '🇫🇷 Bienvenue dans l’anime jouable !',
          value: [
            `Te voilà ! Présente-toi dans <#${channels.french}>, lis <#${channels.rules}> et raconte ta prochaine aventure.`,
            `🎁 **250 crédits gratuits :** trouve ton code dans **Profil → Badges**. Les étapes et conditions sont dans le guide épinglé de <#${channels.rules}>.`,
            `🛟 Besoin d’aide ? <#${channels.aide}>.`,
          ].join('\n\n'),
        },
      ],
      image: { url: `attachment://${ART_NAME}` },
      footer: { text: 'PLOTBREAK • AI-generated art / Illustration générée par IA' },
    }],
    files: [{ attachment: WELCOME_ART_PATH, name: ART_NAME, description: 'Plotbreak: Welcome / Bienvenue — anime city and violet portal, AI-generated illustration.' }],
    // Discord deduplicates repeated events and overlapping deploys for this join.
    // A later rejoin gets a different nonce. Previews are intentionally repeatable.
    ...(!preview && member.joinedTimestamp !== null ? {
      nonce: createHash('sha256').update(`${member.id}:${member.joinedTimestamp}`).digest('hex').slice(0, 25),
      enforceNonce: true,
    } : {}),
  };
}

export function registerDiscordWelcome(client: Client, channelId: string, log: WelcomeLog): void {
  async function send(member: GuildMember, preview = false): Promise<void> {
    if (member.user.bot || member.guild.id !== PLOTBREAK_DISCORD.guildId) return;
    const channel = await member.guild.channels.fetch(channelId);
    if (!channel?.isTextBased() || !channel.isSendable()) {
      throw new Error('Discord welcome channel is missing or cannot receive messages');
    }
    await channel.send(welcomeMessage(member, preview));
    log.info({ channelId, preview }, 'Discord welcome sent');
  }

  client.on('guildMemberAdd', (member) => {
    void send(member).catch((error: unknown) => log.warn(error, 'Discord welcome failed'));
  });

  // A server manager can verify the actual bot, image and channel permissions
  // without leaving the server or pinging a new member. No user-supplied target.
  client.on('messageCreate', (message) => {
    if (message.author.bot || message.guildId !== PLOTBREAK_DISCORD.guildId
      || message.channelId !== channelId || message.content.trim() !== WELCOME_PREVIEW_COMMAND
      || !message.member?.permissions.has('ManageGuild')) return;
    void send(message.member, true).catch((error: unknown) => log.warn(error, 'Discord welcome preview failed'));
  });
}
