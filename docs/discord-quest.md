# Discord quest: 250 credits for joining and saying hi

## How it works

1. The Badges screen shows a **Say Hi on Discord** badge (250 credits) with a
   personal code like `PB-7K2Q9M`, a copy button and the Discord invite.
2. The player joins the server and posts the code as a message.
3. The bot (running inside the API process) sees the code, links that Discord
   account to the Plotbreak account, unlocks the `discord_hello` badge, and
   reacts ✅ with a reply telling them to claim in the app.
4. The player taps **Claim** on the badge. The existing badge claim route pays
   250 via a `PROMO_GRANT` ledger entry keyed `badge:<user>:discord_hello`, so
   it cannot pay twice.

Anti-abuse:
- One Discord account can link to one Plotbreak account (`discord_user_id` is unique).
- Discord accounts younger than 7 days are refused. The age comes from the
  snowflake id, so this costs nothing.
- A code only ever links once.

## Pieces

| Piece | Where |
| --- | --- |
| Badge definition | `packages/contracts/src/game/badges.ts` (`discord_hello`) |
| Table | `infra/migrations/0012_discord_links.sql` |
| Repo | `getOrCreateDiscordCode`, `linkDiscord` in `services/api/src/repo/*` |
| Route | `GET /v1/community/discord` returns `{ code, linked }` |
| Bot | `services/api/src/discord-bot.ts`, starts only when `DISCORD_BOT_TOKEN` is set |
| Analytics | `discord_linked` (bot), `badge_claimed` (claim route) |
| iOS | `BadgesScreen` shows the code and invite on the `discord_hello` row |

## Setup (one time, Omar)

1. https://discord.com/developers/applications → New Application → Bot → Reset Token → copy it.
2. Same Bot page: turn on **Message Content Intent**.
3. OAuth2 → URL Generator → scope `bot`, permissions: View Channels, Send Messages,
   Add Reactions, Read Message History. Open the URL and add the bot to the server.
4. Railway → API service → Variables:
   - `DISCORD_BOT_TOKEN` = the token
   - `DISCORD_CLAIM_CHANNEL_ID` = the channel id where codes are posted (optional;
     unset means any channel). Right-click the channel → Copy Channel ID (turn on Developer Mode first).
5. Apply `infra/migrations/0012_discord_links.sql` to production **before** deploying the API.
   Check `schema_migrations` first: 0012 may already be taken.

## Status (2026-09-23)

- [x] Server: badge, migration, repo, route, bot, analytics
- [x] iOS: code, copy button and invite on the `discord_hello` row; the screen reloads when the app comes back to the foreground
- [x] Tests: `services/api/src/discord-bot.spec.ts`; typecheck, full vitest run, iOS build and unit tests all pass
- [x] Production `schema_migrations` checked: 0012 is free (latest is 0011)
- [ ] Omar: bot setup (above), apply 0012, deploy API, ship an iOS build
- [ ] Badge art: the row shows the 💬 emoji until `npm run badge-art` draws one
