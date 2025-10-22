
import { Pool } from "pg"
import { logger } from "../logger.js"


export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// Loga quando a conexão é estabelecida
pool.on('connect', () => {
  logger.info('Database connected');
});

// Loga erros de conexão
pool.on('error', (err) => {
  logger.error(`🔴 error on connect to database: ${err.message}`);
});