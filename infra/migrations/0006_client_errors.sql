-- Crashes, from the phone.
--
-- There was no crash reporting of any kind. The way we found the Hermes
-- `Intl.RelativeTimeFormat` segfault was that somebody happened to open a story
-- on a device we were holding. Everyone else's app just died, and we would
-- never have known.
--
-- This table is the JavaScript half. A React error boundary catches a render
-- throw, posts it here, and the player gets a screen they can retry from
-- instead of a white rectangle.
--
-- It is explicitly *not* the whole answer. A Hermes segfault kills the process
-- before any JavaScript runs, so the crash that motivated this table could not
-- have written a row in it. Native crashes come from App Store Connect's
-- organiser, which needs dSYMs uploaded with the build. Both halves are in
-- docs/crash-reporting.md.

CREATE TABLE IF NOT EXISTS client_errors (
  error_id        text PRIMARY KEY,
  -- Null for a crash before sign-in, which is the case that matters most:
  -- onboarding is where a new player is least willing to try twice.
  user_id         uuid REFERENCES profiles (user_id) ON DELETE SET NULL,
  -- A stable per-install id, so a crash loop on one handset is one bug rather
  -- than four hundred reports.
  install_id      text NOT NULL,
  platform        text NOT NULL,
  app_version     text NOT NULL DEFAULT '',
  os_version      text NOT NULL DEFAULT '',
  locale          text NOT NULL DEFAULT '',
  -- Where in the app, so a report is actionable without a stack that minifies
  -- to nothing useful.
  screen          text NOT NULL DEFAULT '',
  message         text NOT NULL,
  stack           text NOT NULL DEFAULT '',
  -- sha256 of message + the first frames. Groups repeats of one bug.
  fingerprint     text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- The two questions worth asking: what is breaking most, and is the build we
-- just shipped worse than the one before it.
CREATE INDEX IF NOT EXISTS client_errors_fingerprint_idx
  ON client_errors (fingerprint, created_at DESC);
CREATE INDEX IF NOT EXISTS client_errors_recent_idx
  ON client_errors (created_at DESC);

-- Written by the API with the service role, read by nobody through PostgREST.
-- A table of stack traces keyed by user id is exactly the sort of thing that
-- should not be one misconfigured anon key away from public.
ALTER TABLE client_errors ENABLE ROW LEVEL SECURITY;
