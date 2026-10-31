# Deployment Guide

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

Required environment variables:

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
