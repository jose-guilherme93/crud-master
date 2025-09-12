import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: 'postgres'
});

const databaseName = 'crud';

async function main() {
  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${databaseName}`);
    console.log(`Banco de dados "${databaseName}" criado com sucesso!`);
  } catch (error) {
    console.error('Erro ao criar banco:', error.message);
  } finally {
    await client.end(); 
  }
}

main();
