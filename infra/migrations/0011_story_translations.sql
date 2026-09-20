-- A player-made world, in the other language.
--
-- The official catalogue's French lives in `packages/test-fixtures/src/fr/*.ts`
-- and is compiled into the bundle, because somebody runs `npm run fr:adapt` and
-- reads the result. A world a stranger publishes at two in the morning has no
-- fixture and no reviewer, so its overlay has to live where the world does.
--
-- Keyed by **story_version_id**, not story_id. A published version is immutable
-- and a run pins one, so a session that started on v1 must keep reading v1's
-- French even after the creator publishes v2 — the alternative is a player
-- mid-run watching the prose change under them.
--
-- `text` is the same `WorldText.text` shape the fixtures use: dotted paths into
-- the story, addressed by id, carrying prose only. Anything absent falls back
-- to the source language, which is what makes a partial translation harmless.
CREATE TABLE IF NOT EXISTS story_version_text (
  story_version_id text    NOT NULL REFERENCES story_versions(story_version_id) ON DELETE CASCADE,
  locale           text    NOT NULL CHECK (locale IN ('en', 'fr')),
  text             jsonb   NOT NULL DEFAULT '{}'::jsonb,
  -- 'pending' the moment a version is published, so a retry can find the ones
  -- that never landed rather than having to diff the catalogue to notice.
  status           text    NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending', 'ready', 'failed')),
  -- Paths the model did not return. A short list is a slightly English world;
  -- a long one is a translation worth running again.
  missing          text[]  NOT NULL DEFAULT '{}',
  attempts         integer NOT NULL DEFAULT 0,
  error            text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (story_version_id, locale)
);

-- The retry sweep's query: everything still owed, oldest first.
CREATE INDEX IF NOT EXISTS story_version_text_pending
  ON story_version_text (status, updated_at)
  WHERE status <> 'ready';

-- Read by everybody — a world's translation is as public as the world. Writes
-- are the server's alone, through the service role, like `story_versions`.
ALTER TABLE story_version_text ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS story_version_text_read ON story_version_text;
CREATE POLICY story_version_text_read ON story_version_text
  FOR SELECT USING (true);
