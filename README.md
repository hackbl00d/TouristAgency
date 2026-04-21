# Българска Туристическа Агенция

Minimalist tourist agency site for Bulgaria-focused tours.

Stack:
- **Frontend**: Angular 21 (standalone components)
- **Data**: static JSON files in `frontend/src/assets/data/`
- **Hosting**: Vercel (pure static SPA — no server, no DB)

## Local development

```bash
cd frontend
npm install
npm start        # http://localhost:4200
```

## Deploy to Vercel

1. Push repo to GitHub.
2. Import project in Vercel (the root `vercel.json` drives build + SPA rewrites).
3. No env vars needed.

## Editing content

Tours, hotels, sightseeing, transportation and team data all live as JSON in
`frontend/src/assets/data/`. Edit a file → rebuild → redeploy.

Contributor: **Alexander Vesely**
