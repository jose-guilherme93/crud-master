import { config } from "dotenv"
config({quiet:true})
import { Pool } from "pg"
import { logger } from "../logger.js"


export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// Loga quando a conexão é estabelecida
pool.on('connect', () => {
  logger.info('🟢 Conexão com o banco de dados estabelecida');
});

// Loga erros de conexão
pool.on('error', (err) => {
  logger.error(`🔴 Erro na conexão com o banco: ${err.message}`);
});