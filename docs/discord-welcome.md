# Discord welcome cards

The existing Plotbreak bot sends one bilingual English/French embed when a
person joins the Plotbreak community server. It mentions only that person,
shows their avatar, attaches the reusable anime welcome illustration, and links
to rules, conversation and support. It also explains the optional 250-credit
Discord badge. Bots and joins in other servers are ignored.

## Configuration

1. In the [Plotbreak bot settings](https://discord.com/developers/applications/1552444250439028822/bot),
   enable **Server Members Intent**. Keep the existing Message Content Intent.
   Presence Intent is not needed.
2. Give the bot **View Channel**, **Send Messages**, **Embed Links**, and
   **Attach Files** in `👋-welcome-bienvenue`. Administrator is not needed.
3. On the existing Railway `plotbreak-api` service set:
   `DISCORD_WELCOME_CHANNEL_ID=1550615471693373552`.
4. Deploy the API. The ready log includes `welcomeChannelId`.

Welcomes are disabled when the variable is absent. In that case the bot does not
request GuildMembers, and the existing code-reward flow keeps working as before.
The membership event is delivered when a person joins, even if Discord membership
screening is still pending. This does not grant any roles or bypass screening.
Keep the existing single replica. A stable Discord message nonce deduplicates the
same join during Discord's recent-message deduplication window, including a short
overlap during a redeploy. A later rejoin gets a new nonce. Joins while the bot is
offline and cannot resume its session are not backfilled.

## Preview and verification

A member with **Manage Server** can send `!welcome-preview` in the configured
welcome channel. The bot sends the exact card with that member's avatar, labels it
as a preview, and suppresses mentions. The command works only in that channel and
only in the Plotbreak server. No one has to leave/rejoin for this visual check.

Real joins log `Discord welcome sent` with `preview: false`; previews have
`preview: true`. Delivery errors log `Discord welcome failed` (or the preview
variant) without stopping the rewards bot or API.

Disable Discord's built-in random join messages in Server Settings → Overview
if the custom welcome should be the only greeting. This is independent of the
welcome channel and the bot.

## Files and art

- `services/api/src/discord-welcome.ts`: welcome copy, server links, join handler,
  moderator preview, and restricted mention policy.
- `services/api/src/discord-welcome.spec.ts`: event delivery, ignored joins,
  preview access, failures, nonce behavior, asset packaging, and intent gating.
- `services/api/assets/discord-welcome.png`: original AI-generated banner,
  included by the existing Dockerfile's `COPY services ./services`.

The artwork was generated once with the built-in image generation tool. Each join
reuses that file; no image-generation request or fee occurs when someone joins.
The card labels the illustration as AI-generated, following the community rules.

Discord references:
- [Guild Member Add](https://docs.discord.com/developers/events/gateway-events#guild-member-add)
- [Gateway intents](https://docs.discord.com/developers/events/gateway#privileged-intents)
