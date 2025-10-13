-- Migration: create-recovery-table
-- Created at 2025-10-12T19:16:51.185Z

CREATE TABLE recovery (
    id BIGINT PRIMARY KEY,
    user_id VARCHAR(80) UNIQUE,
    code VARCHAR NULL DEFAULT NULL,
    expires_at TIMESTAMPTZ NULL DEFAULT NULL,
    attempts INT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

-- Criando índice adicional no campo userId
CREATE INDEX idx_recovery_userId ON recovery(user_id);