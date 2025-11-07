#!/bin/bash
set -e

echo "Waiting for postgres at $PGHOST:$PGPORT..."
while ! nc -z "$PGHOST" "$PGPORT"; do
  sleep 0.5
done

echo "Postgres is up - executing migrations"
pnpm run migrate

echo "Migrations completed. Starting application server"
exec "$@"
