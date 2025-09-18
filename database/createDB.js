import dotenv from 'dotenv';
import { Client } from 'pg';
import { logger } from '../logger';

dotenv.config();

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
});


async function main() {
  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${client.database}`);
    logger.info(`Banco de dados "${client.database}" criado com sucesso!`);
  } catch (error) {
    console.error('Erro ao criar banco:', error.message);
  } finally {
    await client.end(); 
  }
}

main();
