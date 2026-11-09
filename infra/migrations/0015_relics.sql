-- Relics: collectible items that drop from moments inside a story.
-- See docs/relics.md and packages/contracts/src/game/relics.ts.
BEGIN;

-- One row per roll, including the empty ones, because "this run already rolled
-- that moment" is the rule and an empty roll counts. Owned relics are the rows
-- with a relic_id.
--
-- No foreign key on session_id on purpose: deleting a run deletes its turns,
-- and a player must not lose what they found by tidying their library.
CREATE TABLE IF NOT EXISTS relic_rolls (
  user_id     uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  session_id  text NOT NULL,
  story_id    text NOT NULL,
  moment_id   text NOT NULL,
  relic_id    text,
  turn_index  integer NOT NULL,
  rolled_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (session_id, moment_id)
);

CREATE INDEX IF NOT EXISTS relic_rolls_user_idx ON relic_rolls (user_id, rolled_at DESC);

ALTER TABLE relic_rolls ENABLE ROW LEVEL SECURITY;

COMMIT;
