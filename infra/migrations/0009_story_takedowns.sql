-- A reason on a moderation case.
--
-- `moderation_cases` recorded that something was acted on and how severely,
-- but not why, which is the one field a takedown needs: "we removed this
-- world" is not an audit trail, and App Review asks a user-generated-content
-- app to show it responds to reports rather than only that it received them.
--
-- Additive and defaulted, so every existing row stays valid.
ALTER TABLE moderation_cases ADD COLUMN IF NOT EXISTS reason text NOT NULL DEFAULT '';
