-- The picture drawn at the top of a beat (a character's face, or a story's
-- opening panel). Nullable and additive: every existing turn has none, and the
-- API writes it with its own UPDATE after the turn commits, so a deploy that
-- lands before this migration loses the picture, never the turn.
ALTER TABLE turns ADD COLUMN IF NOT EXISTS panel jsonb;
