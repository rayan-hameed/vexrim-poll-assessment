-- Run once against your PostgreSQL database (see README for instructions).
-- Stores each completed poll submission. Answers are kept as JSONB so the
-- schema never has to change when steps in the frontend config are added,
-- removed, or renamed.

CREATE TABLE IF NOT EXISTS poll_responses (
  id          SERIAL PRIMARY KEY,
  answers     JSONB NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_poll_responses_created_at
  ON poll_responses (created_at DESC);
