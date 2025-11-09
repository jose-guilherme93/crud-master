#!/bin/bash
set -e


export PGHOST="$PGHOST"
export PGPORT="$PGPORT"
export POSTGRES_USER="$POSTGRES_USER"
export POSTGRES_PASSWORD="$POSTGRES_PASSWORD"
export POSTGRES_DB="$POSTGRES_DB"


echo "Waiting for postgres at $PGHOST:$PGPORT..."
while ! nc -z "$PGHOST" "$PGPORT"; do
  sleep 0.5
done

echo "Postgres is up - executing migrations"
pnpm run migrate

echo "Migrations completed. Starting application server"
exec "$@"