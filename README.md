# Българска Туристическа Агенция

Minimalist tourist agency site for Bulgaria-focused tours.

Stack:
- **Frontend**: Angular 17 (standalone components), deployed as static build on Vercel
- **Backend**: Node + Express as Vercel serverless functions (`/api`)
- **DB**: Postgres (Neon / Supabase / Vercel Postgres)

## Local development

```bash
# 1. Install deps
cd frontend && npm install
cd ../api && npm install

# 2. Set env vars (copy .env.example -> .env at repo root)
#    DATABASE_URL=postgres://...
#    ADMIN_TOKEN=some-long-random-string

# 3. Create DB schema + seed
psql "$DATABASE_URL" -f db/schema.sql
psql "$DATABASE_URL" -f db/seed.sql

# 4. Run backend (port 3001)
cd api && npm run dev

# 5. Run frontend (port 4200, proxies /api to 3001)
cd frontend && npm start
```

## Deploy to Vercel

1. Push repo to GitHub.
2. Import project in Vercel. It auto-detects `vercel.json`.
3. Set env vars in Vercel dashboard: `DATABASE_URL`, `ADMIN_TOKEN`.
4. Frontend build command: `cd frontend && npm install && npm run build`
   Output directory: `frontend/dist/tourist-agency/browser`
5. `/api/*` routes map to the serverless function defined in `api/index.ts`.

Contributor: **Alexander Vesely**
