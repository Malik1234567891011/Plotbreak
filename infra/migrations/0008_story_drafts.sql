-- The creator's working document.
--
-- Separate from `story_versions` on purpose. A published version is immutable
-- and must parse against the StoryVersion contract; a draft is neither, because
-- somebody four sentences into an idea does not yet have a world. Publishing
-- compiles one into the other, and the draft stays behind as the thing they
-- edit next time.
--
-- Kept as one jsonb document because it is read whole and written whole — a
-- creator edits a step, not a column — and because the shape is owned by the
-- StoryDraft contract, which is where it should change.
CREATE TABLE IF NOT EXISTS story_drafts (
  draft_id             text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  owner_id             uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  -- Set on first publish. A second publish makes a new version of this story
  -- rather than a second story, which is what keeps a creator's play counts.
  story_id             text REFERENCES stories (story_id) ON DELETE SET NULL,
  published_version_id text REFERENCES story_versions (story_version_id) ON DELETE SET NULL,
  document             jsonb NOT NULL,
  -- Denormalised out of the document so the dashboard can list without parsing.
  title                text NOT NULL DEFAULT '',
  visibility           text NOT NULL DEFAULT 'PRIVATE'
                         CHECK (visibility IN ('PRIVATE','UNLISTED','PUBLIC')),
  published_at         timestamptz,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now()
);

-- Every read is "this creator's titles, newest first".
CREATE INDEX IF NOT EXISTS story_drafts_owner_idx
  ON story_drafts (owner_id, updated_at DESC);

-- One draft per published story, so re-publishing cannot fork a creator's
-- own world into two rows that both claim it.
CREATE UNIQUE INDEX IF NOT EXISTS story_drafts_story_idx
  ON story_drafts (story_id) WHERE story_id IS NOT NULL;

-- Reached only through the API, which checks ownership on every call. No
-- policies, same as every other table here.
ALTER TABLE story_drafts ENABLE ROW LEVEL SECURITY;
