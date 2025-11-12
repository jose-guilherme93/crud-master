
import { Pool } from "pg"
import { logger } from "../scripts/logger.ts";

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// Loga quando a conexão é estabelecida
pool.on('connect', () => {
  logger.info('Database connected');
});


pool.on('error', (err) => {
  logger.error(`🔴 error on connect to database: ${err.message}`);
});