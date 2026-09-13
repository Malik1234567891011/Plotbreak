-- The model conversation, stored exactly as it was sent.
--
-- Append-only prompt caching matches a request against the longest previous
-- request that is a strict prefix of it. That only holds if every historical
-- message comes back byte-identical, so the text is stored rather than
-- re-rendered from `turns` — a re-render is one formatting tweak away from
-- silently costing every cached token in every live session.
--
-- This is not a memory system and not a second representation of the story. It
-- is the transcript of what was sent, and nothing reads it except the next call.
CREATE TABLE IF NOT EXISTS pure_conversation (
  session_id      text NOT NULL REFERENCES story_sessions(session_id) ON DELETE CASCADE,
  turn_index      integer NOT NULL,
  user_text       text NOT NULL,
  assistant_text  text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (session_id, turn_index)
);

-- Every read is "the whole conversation for one session, in order".
CREATE INDEX IF NOT EXISTS pure_conversation_session_idx
  ON pure_conversation (session_id, turn_index ASC);

ALTER TABLE pure_conversation ENABLE ROW LEVEL SECURITY;
