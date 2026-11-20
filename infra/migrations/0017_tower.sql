-- The Tower: a daily mini game that pays credits. See docs/tower.md.
BEGIN;

-- One row per run; at most one run per player per UTC day. The inputs are kept
-- so a payout can always be re-derived by replaying the sim, and so we can see
-- how people actually play.
CREATE TABLE IF NOT EXISTS tower_runs (
  run_id        text PRIMARY KEY,
  user_id       uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  day           date NOT NULL,
  seed          bigint NOT NULL,
  fee           integer NOT NULL,
  free          boolean NOT NULL,
  started_at    timestamptz NOT NULL DEFAULT now(),
  last_seen_at  timestamptz,
  finished_at   timestamptz,
  last_floor    integer NOT NULL DEFAULT 1,
  fell_on       integer,
  cleared       boolean,
  reward        integer,
  -- Settled from its last checkpoint because the app never sent a finish.
  abandoned     boolean NOT NULL DEFAULT false,
  -- Finished faster than the sim's own clock allows. Paid the minimum.
  suspicious    boolean NOT NULL DEFAULT false,
  ticks         integer,
  real_ms       integer,
  app_version   text,
  boons         text[],
  floors        jsonb,
  inputs        jsonb,
  UNIQUE (user_id, day)
);

CREATE INDEX IF NOT EXISTS tower_runs_day_idx ON tower_runs (day);
CREATE INDEX IF NOT EXISTS tower_runs_user_idx ON tower_runs (user_id, started_at DESC);

ALTER TABLE tower_runs ENABLE ROW LEVEL SECURITY;

ALTER TABLE wallet_ledger DROP CONSTRAINT IF EXISTS wallet_ledger_type_check;
ALTER TABLE wallet_ledger ADD CONSTRAINT wallet_ledger_type_check CHECK (type IN (
  'PURCHASE','BONUS','DAILY_GRANT','NEW_USER_GRANT',
  'TURN_RESERVE','TURN_FINALIZE','TURN_RELEASE',
  'MEDIA_RESERVE','MEDIA_FINALIZE','MEDIA_RELEASE',
  'REFUND','ADMIN_ADJUST','CREATOR_GRANT','PROMO_GRANT','FORK_FEE','CREATE_FEE',
  'SUBSCRIPTION_GRANT','TOWER_ENTRY','TOWER_REWARD'));

COMMIT;
