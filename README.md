# FitVR

## Redesigned fitting experience

The customer UI now follows **body setup → profile review → wardrobe** with an ivory and sage visual system, responsive navigation, illustrated garment previews, and an interactive fitting room.

- `/` introduces the mobile body-scan concept and demo collection.
- `/try-on` offers sample-scan animation, editable manual measurements, and optional camera framing with explicit consent.
- `/try-on?mode=demo` opens the sample wardrobe directly. Add `&garment=oversized`, `compression`, or `joggers` to select a garment.
- The fitting room supports garment, colour, size, front/back, mesh view, JSON export, and session reset. Measurements are held only in React memory.
- Brand, pricing, docs, and privacy pages share the updated palette; the brand console remains a scaffold with demo data.

**Capture status:** Native LiDAR capture, full-body mesh reconstruction, and physically accurate garment simulation are not implemented. The browser camera is a framing preview only. The sample scan is labelled as a demo, and the SVG model illustrates silhouettes rather than predicting actual fit. Apple ARKit's `sceneDepth` requires supported native hardware and a capability check; see [Apple documentation](https://developer.apple.com/documentation/arkit/arconfiguration/framesemantics-swift.struct/scenedepth).

To connect real scanning next, implement a native capture client with device support checks and guided multi-view capture, reconstruct and validate a body mesh, and provide real garment meshes, size charts, and material parameters to the fitting renderer.

Fit.VR is a B2B virtual fitting and body measurement platform for gym wear, fitness apparel, and athleisure brands. Brands add a `Try with Fit.VR` button to product pages, then Fit.VR handles consent, body measurements, AR-style fitting, size recommendation, and analytics.

## What Is Included

- Premium Next.js App Router web app with landing, pricing, signup, brand dashboard, product upload, size charts, analytics, docs, admin, privacy, and try-on flows.
- Express REST API scaffold with tenant-aware auth, products, fit sessions, analytics, and webhook routes.
- Prisma multi-tenant database schema covering users, brands, products, measurements, sessions, API keys, billing, webhooks, analytics, and audit logs.
- Embeddable JavaScript SDK plus a product page example.
- Fit recommendation engine with Fit Score, confidence, area analysis, movement testing, return-risk score, and recommendation reasoning.
- Fit.VR Body Profile concept with guest, temporary, saved, delete/export/update, and multiple-profile modes.
- Brand product setup for fabric type, stretch, compression level, model reference data, fit rules, size charts, and 3D assets.
- Camera consent and no-recording-by-default AR fitting demo.
- SDK/API integration flow for product page widgets, white-label modal usage, Shopify, and WooCommerce readiness.
- Docker Compose for Postgres, Redis, and S3-compatible storage.
- Unit and E2E test scaffolding.

## Quick Start

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:generate
npm run db:migrate
npm run dev
```

Web app: `http://localhost:3000`

API: `http://localhost:4000`

### Windows Launcher

Double-click `run-fitvr-local.bat` or run:

```bat
run-fitvr-local.bat
```

The launcher starts the API and web app in separate terminal windows. By default it tries `http://localhost:3000` for the web app and automatically moves to the next free port if that port is busy. To choose ports:

```bat
run-fitvr-local.bat 3020 4000
```

## MVP Routes

- `/` B2B landing page
- `/signup` brand signup
- `/pricing` SaaS pricing
- `/dashboard` brand dashboard
- `/dashboard/products/new` product upload
- `/dashboard/size-charts` size chart management
- `/dashboard/analytics` try-on analytics
- `/try-on` embedded fitting modal experience
- `/try-on/ar` camera-based fitting studio
- `/docs` SDK and API docs
- `/admin` platform admin panel
- `/privacy` consent and privacy center

## Integration Example

```html
<script src="https://cdn.fitvr.com/sdk.js"></script>
<button data-fitvr-product-id="123">Try with Fit.VR</button>
```

The SDK opens a secure Fit.VR modal, collects consent and measurements, starts the camera only after permission, and returns recommended size, Fit Score, fit confidence, area analysis, movement tests, and return-risk signals to the brand page.

## Production Notes

This repo is structured as a production MVP, but the first local run uses mocked dashboard data and stateless API examples. Replace mock repositories with Prisma-backed services, connect object storage, configure billing, and provision observability before customer launch.

See:

- [System Design](./docs/SYSTEM_DESIGN.md)
- [Product Plan](./docs/PRODUCT_PLAN.md)
- [API Reference](./docs/API.md)
- [Security and Privacy](./docs/SECURITY_PRIVACY.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
