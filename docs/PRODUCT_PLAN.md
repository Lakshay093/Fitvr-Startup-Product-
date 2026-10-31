# Fit.VR Product Plan

Fit.VR is a B2B fit intelligence platform for gym apparel brands. It combines body measurement, virtual try-on, size recommendation, movement testing, and analytics so brands can reduce returns, improve conversion, and understand athletic body-fit demand.

## Positioning

Fit.VR is not only a virtual fitting website. It is an embeddable infrastructure layer that brands add to product pages through a JavaScript SDK, React component, REST API, Shopify app block, WooCommerce plugin, or white-label modal.

For brands, Fit.VR reduces size-related returns, improves customer confidence, lowers support questions, improves size charts, and creates body-type and return-risk intelligence.

For shoppers, Fit.VR helps choose the right size, compare slim/regular/oversized/compression fits, understand tight or loose zones, test workout movement comfort, and reuse a Body Profile across partner brands.

## Core Product

- Product page widget with consent, measurement, fitting, and size return flow.
- Fit.VR Body Profile with guest, temporary, saved, update, delete, export, and multiple-profile modes.
- Manual, camera scan, and hybrid measurement modes.
- AI size recommendation engine using body measurements, size chart, garment category, fabric stretch, preferred fit, movement rules, historical return data, and brand fit rules.
- Fit Score system with recommended size, alternative size, confidence, fit status, return-risk score, area analysis, and recommendation reason.
- Gym movement testing for arm raise, shoulder stretch, chest expansion, bicep flex, squat comfort, walking preview, and compression tightness.
- Brand dashboard for products, size charts, 3D assets, fit rules, API keys, integrations, analytics, billing, teams, roles, webhooks, and customization.

## Fit Score Output

```json
{
  "recommendedSize": "L",
  "alternativeSize": "XL",
  "overallFitScore": 87,
  "fitConfidence": 88,
  "fitType": "compression",
  "fitStatus": "perfect fit",
  "returnRiskLevel": "low",
  "reason": "Size L is recommended because chest and shoulders match the brand size chart.",
  "areaAnalysis": [
    {
      "area": "Biceps",
      "status": "too tight",
      "score": 74,
      "targetRange": "up to 42 cm"
    }
  ],
  "movementTests": [
    {
      "label": "Bicep flex preview",
      "score": 79,
      "status": "caution"
    }
  ]
}
```

## Brand Journey

1. Brand signs up and configures the workspace.
2. Brand uploads products, size charts, fabric data, compression level, model reference data, and optional 3D assets.
3. Brand installs the SDK, React component, Shopify app block, or WooCommerce plugin.
4. Shoppers use Fit.VR on product pages.
5. Fit.VR returns recommended size and logs analytics.
6. Brand reviews conversion, returns, fit issues, body trends, and size chart opportunities.

## Shopper Journey

1. Shopper clicks `Try with Fit.VR`.
2. Shopper chooses guest, saved profile, or multiple-profile mode.
3. Shopper enters manual measurements, uses camera scan, or uses hybrid mode.
4. Shopper sees recommended size, Fit Score, area warnings, movement tests, and return-risk explanation.
5. Recommended size returns to the storefront.
6. Shopper can save, update, export, or delete their Body Profile.

## Architecture

- Frontend: Next.js, TypeScript, Tailwind CSS, Framer Motion, Zustand.
- 3D and AR: Three.js, React Three Fiber, GLB/GLTF assets.
- Computer vision: MediaPipe Pose, MoveNet, TensorFlow.js, landmark detection, confidence scoring.
- Backend: Node.js, Express or NestJS, REST API, JWT, RBAC, API keys.
- Data: PostgreSQL, Prisma, Redis, BullMQ, analytics event tables.
- Infrastructure: Docker, S3-compatible storage, CDN, Sentry, rate limiting, logging, CI/CD, multi-tenant isolation.

## Monetization

- Starter: base subscription for small gymwear brands.
- Growth: higher try-on volume, advanced analytics, Shopify/WooCommerce support.
- Pro: API access, custom branding, return-risk insights, fit-rule configuration.
- Enterprise: white-label SDK, SSO, SLA, DPA, custom ML model, custom integrations.
- Usage add-on: metered overage per 1,000 try-ons or recommendations.

## Roadmap

MVP:

- Landing page, brand signup, dashboard, product upload, size chart upload.
- Manual measurements, basic Fit Score, camera permission flow.
- Basic upper/lower overlay demo, recommendation API, SDK demo, analytics dashboard.

Version 2:

- Camera-based body scan, improved pose detection, movement testing, Body Profile, Shopify integration, advanced analytics, fabric stretch logic.

Version 3:

- 3D body avatar, full AR try-on, AI stylist, return prediction model, mobile app, white-label enterprise, in-store AR mirror integration.

## Development Plan

1. Build multi-tenant foundation, auth, dashboard, product catalog, and size charts.
2. Ship manual measurement and Fit Score recommendation engine.
3. Ship SDK, modal widget, React component, and product-page callback.
4. Add analytics events, funnel tracking, body trend dashboards, and return-risk views.
5. Implement consent records, body profile update/delete/export, encryption, and audit logs.
6. Add MediaPipe/MoveNet camera scan and confidence scoring.
7. Add Shopify and WooCommerce integrations.
8. Add movement tests, fabric stretch logic, compression scoring, and return prediction.
9. Add enterprise controls: SSO, RBAC, white-label, SLAs, DPA, and custom models.
