# Deployment Guide

## Local development
- `npm install`
- `npx prisma generate`
- `npx prisma migrate dev` (creates `prisma/dev.db`)
- Seed initial admin + content: `./node_modules/.bin/tsx scripts/seed.ts`
- `npm run dev`
- Admin login: `http://localhost:3000/admin/login` — credentials from `.env`
  (defaults: `admin@akintola.local` / `changeme123`).

## Required env vars
```
DATABASE_URL          # SQLite file:./dev.db locally; Postgres URL on Vercel
NEXTAUTH_SECRET       # any 32+ char random string (openssl rand -hex 32)
NEXTAUTH_URL          # https://yourdomain.com in production
ADMIN_EMAIL           # used by seed script to create the admin user
ADMIN_PASSWORD        # used by seed script (CHANGE BEFORE PROD!)
```

## Vercel deployment (Postgres)

1. **Switch the Prisma datasource to Postgres** in `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Provision a database (Vercel Postgres, Neon, or Supabase) and copy its
   connection string.
3. **Re-create the migration for Postgres** locally:
   ```
   rm -rf prisma/migrations
   DATABASE_URL="<postgres-url>" npx prisma migrate dev --name init
   ```
4. Push to GitHub and import the project in Vercel.
5. Add env vars in Vercel project settings (the five listed above).
   `NEXTAUTH_URL` must match the production URL.
6. In Vercel build settings set the build command to:
   ```
   prisma generate && prisma migrate deploy && next build
   ```
7. After the first deploy, run the seed once against the prod DB:
   ```
   DATABASE_URL="<postgres-url>" ./node_modules/.bin/tsx scripts/seed.ts
   ```
   Or trigger it from a one-off Vercel CLI shell.
8. Visit `/admin/login`, sign in, and change the password from the admin UI
   (or update via `prisma studio`).

## What the admin can edit
- **Hero & Copy** — eyebrow lines, hero headline (line 1 / line 2), body, both
  CTA labels & links, about bio.
- **Projects** — full CRUD (title, year, tags, image, venue, role, link, order,
  publish toggle).
- **Research** — full CRUD with publish toggle.
- **Expertise** — six tiles with lucide icon names
  (`Building2`, `Leaf`, `Brain`, `Calculator`, `Handshake`, `CircleDashed`).
- **Stats & Marquee** — the four hero stats and the marquee strip.

## Notes
- All public pages (`/`, `/about`, `/portfolio`) are `force-dynamic`, so edits
  appear immediately with no rebuild.
- The contact page and the figure-gallery on the home page are still hardcoded
  by design — extend `SiteContent` keys + the page if more fields need to be
  editable.
