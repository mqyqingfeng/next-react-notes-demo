#!/bin/sh

MIGRATION_STATUS=$(npx prisma migrate status)

if echo "$MIGRATION_STATUS" | grep -q "Database schema is up to date"; then
    echo "No migrations needed."
else
    echo "Running migrations..."
    npx prisma migrate deploy
fi

npx prisma generate

if [ -f yarn.lock ]; then 
    yarn dev;
elif [ -f package-lock.json ]; then 
    npm run dev;
elif [ -f pnpm-lock.yaml ]; then 
    pnpm dev;
else 
    npm run dev;
fi