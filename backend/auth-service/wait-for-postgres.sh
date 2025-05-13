#!/bin/sh
# wait-for-postgres.sh using nc
set -e
host="$1"
shift

until nc -z "$host" 5432; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - executing command"
exec "$@"
