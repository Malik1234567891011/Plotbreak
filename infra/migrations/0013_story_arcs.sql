-- A closed arc: what the player reads, and what the model must not forget.
--
-- Every turn re-sends the whole transcript, and past 272K input tokens the
-- provider charges 2x input and 1.5x output for the full request. That is
-- where three of the four tiers stop making money. Closing an arc replaces a
-- long stretch of transcript with a short recap, and puts the session back on
-- the cheap side of the step. See `docs/arcs.md`.
--
-- This table is additive and nothing else is destructive: `pure_conversation`
-- keeps every row forever. Closing an arc only changes which rows the next
-- request replays, so deleting a row here restores full replay on the next
-- turn with nothing lost.
CREATE TABLE IF NOT EXISTS story_arcs (
  session_id   text NOT NULL REFERENCES story_sessions(session_id) ON DELETE CASCADE,
  -- 1-based, in the order they closed. Arc 1 is the first stretch to end, not
  -- the one the player is in.
  arc_index    integer NOT NULL,
  title        text NOT NULL,
  -- Prose. The only part the player ever sees.
  recap        text NOT NULL,
  -- Continuity for the model, never rendered: standing, bonds, established,
  -- open. Shaped by `ArcCarry` in @plotbreak/contracts.
  carried      jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- The turn range this arc covers, inclusive. `to_turn` is the settled beat
  -- the story chose to end on.
  from_turn    integer NOT NULL,
  to_turn      integer NOT NULL,
  -- What the context measured when it closed, for cost telemetry.
  closed_at_tokens integer,
  created_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (session_id, arc_index)
);

-- Every read is "the closed arcs of one session, in order".
CREATE INDEX IF NOT EXISTS story_arcs_session_idx
  ON story_arcs (session_id, arc_index ASC);

ALTER TABLE story_arcs ENABLE ROW LEVEL SECURITY;
