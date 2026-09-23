-- The Discord quest: a player posts their code in the community server and the
-- bot unlocks `discord_hello`. See docs/discord-quest.md.
--
-- One row per Plotbreak account, created the first time they open the badge.
-- `discord_user_id` is unique so one Discord account cannot unlock the badge
-- on a stack of throwaway Plotbreak accounts.
BEGIN;

CREATE TABLE IF NOT EXISTS discord_links (
  user_id          uuid PRIMARY KEY REFERENCES profiles (user_id) ON DELETE CASCADE,
  code             text NOT NULL UNIQUE,
  discord_user_id  text UNIQUE,
  linked_at        timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- Written by the server alone, through the service role. Nobody reads it
-- directly: the code comes back through `/v1/community/discord`.
ALTER TABLE discord_links ENABLE ROW LEVEL SECURITY;

COMMIT;
