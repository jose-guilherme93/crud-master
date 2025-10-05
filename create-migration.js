// createMigration.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Emula __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório de migrations
const migrationsDir = path.join(__dirname, "src", "migrations");

// Gera timestamp no formato YYYYMMDDHHMMSS
function getTimestamp() {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, "0");

  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

function createMigration(name) {
  const timestamp = getTimestamp();
  const fileName = `${timestamp}_${name}.sql`;
  const filePath = path.join(migrationsDir, fileName);

  const template = `-- Migration: ${name}\n-- Created at ${new Date().toISOString()}\n\n`;

  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  fs.writeFileSync(filePath, template);
  console.log(`Migration created: ${filePath}`);
}

// Execução direta via CLI
const migrationName = process.argv[2];
if (!migrationName) {
  console.error("Use: node createMigration.js <migration_name>");
  process.exit(1);
}

createMigration(migrationName);
