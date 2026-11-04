#!/usr/bin/env bash
#
# Backs up the CMS database (the `payload` schema: every page, news item,
# schedule, user and media record) to ../backups/ (next to both projects, outside their git repos).
#
# Uploaded files themselves live in Supabase Storage (bucket `media`), not in
# the database — this does not copy them.
#
# Run from the CMS folder:   npm run backup:db
# Needs pg_dump 15+:         brew install libpq
#
# Restore into an empty database (destructive — only into a fresh project):
#   /opt/homebrew/opt/libpq/bin/pg_restore --no-owner --no-privileges \
#     --dbname "<session-pooler URL, port 5432>" <file>.dump
#
set -euo pipefail

cd "$(dirname "$0")/.."

PG_DUMP="$(command -v pg_dump || echo /opt/homebrew/opt/libpq/bin/pg_dump)"
if [ ! -x "$PG_DUMP" ]; then
  echo "pg_dump not found — install it with: brew install libpq" >&2
  exit 1
fi

DATABASE_URL="$(grep -E '^DATABASE_URL=' .env | head -1 | cut -d= -f2-)"
if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL is not set in .env" >&2
  exit 1
fi

# The app uses Supabase's transaction pooler (port 6543), which pg_dump cannot
# work through. The session pooler on the same host (port 5432) can.
DUMP_URL="${DATABASE_URL/:6543\//:5432/}"

OUT_DIR="../backups"
mkdir -p "$OUT_DIR"
OUT_FILE="$OUT_DIR/sveti-marko-cms-$(date +%Y-%m-%d-%H%M).dump"

"$PG_DUMP" "$DUMP_URL" \
  --schema=payload \
  --format=custom \
  --no-owner \
  --no-privileges \
  --file="$OUT_FILE"

echo "Backup written: $OUT_FILE ($(du -h "$OUT_FILE" | cut -f1))"
