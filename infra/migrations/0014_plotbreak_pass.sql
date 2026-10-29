-- Plotbreak Pass: a weekly subscription that pays credits daily, and the story
-- requests its holders can make and vote on. See docs/plotbreak-pass.md.
BEGIN;

-- One row per App Store subscription, keyed by Apple's original transaction id
-- because every renewal shares it. `expires_at` is the latest expiry Apple has
-- told us about; a row is active while that is in the future and it has not
-- been revoked (refunded).
CREATE TABLE IF NOT EXISTS subscriptions (
  original_transaction_id  text PRIMARY KEY,
  user_id                  uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  product_id               text NOT NULL,
  platform                 text NOT NULL,
  environment              text NOT NULL,
  expires_at               timestamptz NOT NULL,
  revoked_at               timestamptz,
  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS subscriptions_user_idx ON subscriptions (user_id, expires_at DESC);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- The Pass's daily credits are their own entry type, so "what did the Pass pay
-- out" and "what did people buy" stay separate questions.
ALTER TABLE wallet_ledger DROP CONSTRAINT IF EXISTS wallet_ledger_type_check;
ALTER TABLE wallet_ledger ADD CONSTRAINT wallet_ledger_type_check CHECK (type IN (
  'PURCHASE','BONUS','DAILY_GRANT','NEW_USER_GRANT',
  'TURN_RESERVE','TURN_FINALIZE','TURN_RELEASE',
  'MEDIA_RESERVE','MEDIA_FINALIZE','MEDIA_RELEASE',
  'REFUND','ADMIN_ADJUST','CREATOR_GRANT','PROMO_GRANT','FORK_FEE','CREATE_FEE',
  'SUBSCRIPTION_GRANT'));

-- A Pass holder's pitch for a story they want made. `status` is moved by hand
-- as we pick one each month.
CREATE TABLE IF NOT EXISTS story_requests (
  request_id  text PRIMARY KEY,
  user_id     uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  body        text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 400),
  status      text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN','PLANNED','MADE','DECLINED')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS story_requests_user_idx ON story_requests (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS story_request_votes (
  request_id  text NOT NULL REFERENCES story_requests (request_id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES profiles (user_id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (request_id, user_id)
);

ALTER TABLE story_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_request_votes ENABLE ROW LEVEL SECURITY;

COMMIT;
