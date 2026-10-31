# Deployment Guide

## Current hosted demo

- Frontend: https://fitvr-frontend.vercel.app
- Backend: https://fitvr-backend.vercel.app
- API health: https://fitvr-backend.vercel.app/health
- Same-origin API proxy: https://fitvr-frontend.vercel.app/backend/health

Both services run on Vercel with Node.js 22. The frontend project uses `apps/web` as its root and the backend uses `apps/api`. Both include source files outside the root directory so npm workspaces and `packages/shared` are available. Each app has a checked-in `vercel.json` defining its build and install commands.

Production environment:

| Project | Variable | Value |
| --- | --- | --- |
| fitvr-frontend | FITVR_API_URL | https://fitvr-backend.vercel.app |
| fitvr-frontend | NEXT_PUBLIC_API_URL | https://fitvr-backend.vercel.app |
| fitvr-frontend | NEXT_PUBLIC_APP_URL | https://fitvr-frontend.vercel.app |
| fitvr-backend | CORS_ORIGIN | https://fitvr-frontend.vercel.app |

The web app forwards `/backend/*` to the deployed API. Existing `/api/*` Next.js demo handlers remain available. The fitting preview still keeps measurements in browser memory; deployment does not add body-data uploads.

This release deploys the existing stateless prototype: sample products, analytics, fit-session responses, and a fit recommendation engine. It has no connected database, persistent user accounts, native LiDAR capture, payment processing, or garment simulation. The development token-issuing login and production API-key generation are disabled in production.

Deploy from the repository root with the Vercel CLI:

```powershell
vercel link --yes --project fitvr-backend --scope lakshays-projects-b4abdc57
vercel deploy --prod --yes
vercel link --yes --project fitvr-frontend --scope lakshays-projects-b4abdc57
vercel deploy --prod --yes
```

The first deployment uses the authenticated Vercel CLI. Automatic deployments on GitHub pushes are not connected: Vercel requires a GitHub login connection for this account. After connecting GitHub in Vercel account settings, connect `Lakshay093/Fitvr-Startup-Product-` to both projects, retaining the roots and environment variables above.

## Local

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:generate
npm run db:migrate
npm run dev
```

## Web App

Deploy `apps/web` to Vercel or another Next.js host.

The hosted demo uses the environment variables in the table above. Future production integrations may require:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_URL`
- `JWT_SECRET`
- `DATABASE_URL`
- `REDIS_URL`
- `SENTRY_DSN`

## API

Deploy `apps/api` as a Node.js service.

Production requirements:

- TLS termination.
- API gateway or WAF.
- Redis-backed rate limiting.
- S3-compatible asset storage.
- Centralized logging.
- Sentry or OpenTelemetry tracing.
- Database migrations in CI/CD.

## CI/CD

Recommended pipeline:

1. Install dependencies.
2. Generate Prisma client.
3. Run type checks.
4. Run unit tests.
5. Run Playwright smoke tests.
6. Build API and web app.
7. Run database migrations.
8. Deploy.

## Asset CDN

Product images and GLB/GLTF clothing models should be uploaded to S3-compatible storage and served from a CDN. Keep signed upload URLs short-lived and scoped by brand.
