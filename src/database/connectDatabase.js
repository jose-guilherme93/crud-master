import { Pool } from "pg";
import { logger } from "../../logger.js";

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

logger.info(pool)