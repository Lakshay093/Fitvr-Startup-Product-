# Fit.VR System Design

## Architecture

Fit.VR is organized as a multi-tenant SaaS platform:

- `apps/web`: Next.js product surface, brand dashboard, docs, admin, and try-on UI.
- `apps/api`: Express REST API for brand integrations, product metadata, fit sessions, analytics, webhooks, and admin operations.
- `packages/sdk`: browser SDK that brands load on product pages.
- `packages/shared`: shared schemas and types.
- `prisma`: database schema for tenants, users, products, size charts, body profiles, fit sessions, analytics, billing, and audit logging.

## Core Flow

1. A brand loads the SDK on a product page.
2. The SDK reads `data-fitvr-product-id` and opens the Fit.VR fitting modal.
3. The shopper grants privacy consent and enters measurements or starts camera-assisted measurement.
4. Fit.VR compares body measurements, fit preference, garment rules, fabric stretch, movement-test rules, and brand-specific size chart rows.
5. The recommendation engine returns recommended size, alternative size, Fit Score, confidence score, fit status, area analysis, movement tests, return-risk score, and a plain-language reason.
6. The try-on session is logged as an analytics event without storing raw video by default.
7. The brand receives a recommended size event and can preselect the right size in its commerce UI.

## Multi-Tenancy

Every tenant-owned record references `brandId`. API keys resolve to a single brand and all queries are scoped to that brand. Admin routes require platform roles and audited access.

## Measurement and AR Pipeline

The MVP supports:

- Manual body measurements.
- Hybrid mode with height, weight, body type, and camera refinement.
- Saved profile readiness.
- Camera permission flow.
- Camera preview with garment overlays.
- Optional pose-estimation hook point for MediaPipe or MoveNet.
- Gym-specific movement tests: arm raise, shoulder stretch, chest expansion, bicep flex, squat comfort, walking preview, and compression tightness.

Future production versions should add:

- Calibrated camera measurement with known-distance checks.
- GLB garment deformation based on pose landmarks.
- Per-brand ML fit models trained on returns and post-purchase feedback.
- Mobile-native ARKit/ARCore companion SDKs.

## Recommendation Engine

Inputs:

- User measurements.
- Preferred fit: slim, regular, oversized, compression, relaxed.
- Product category and garment zones.
- Brand-specific size chart rows.
- Fabric type, stretch percentage, compression level, model reference data, and fit rules.
- Historical return data when available.

Outputs:

- Recommended size.
- Alternative size.
- Fit confidence and overall Fit Score.
- Fit type and fit status.
- Area-level warnings for chest, shoulders, waist, hips, biceps, thighs, calves, and inseam.
- Movement-test results for gym-specific comfort.
- Return-risk score and recommendation reason.

## Product Data Model

Brands configure:

- Product name, SKU, category, images, and optional 3D model assets.
- Size charts with shoulder, chest, waist, hip, bicep, thigh, calf, and inseam ranges.
- Fabric type, stretch level, compression level, intended fit, product length, sleeve length, waist fit, and thigh fit.
- Model reference size, height, and weight for shopper comparison.
- Fit rules for muscle-fit zones, pump-cover drape, compression pressure, and squat comfort.

## Analytics

The brand dashboard should expose:

- Total virtual try-ons, try-ons per product, and conversion after try-on.
- Most recommended sizes and most selected fit preferences.
- Common tight areas, common loose areas, and return-risk products.
- Average Fit Score, funnel drop-off, device type, region demand, and body type trends.

## Data Retention

Raw camera video is never stored by default. Body profiles can be temporary, saved, or deleted. Fit sessions keep only analytics-safe metadata unless a user explicitly agrees to save a body profile.

Consent records, deletion requests, data export requests, and audit logs are first-class records so privacy controls can be implemented across shopper and brand workflows.
