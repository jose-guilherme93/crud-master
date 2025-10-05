-- Migration: create-game-status-type
-- Created at 2025-10-05T02:33:40.064Z

CREATE TYPE game_status AS ENUM ('Jogando','Zerado','Quero jogar','Abandonado')