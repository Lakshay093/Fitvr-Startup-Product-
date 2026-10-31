# Security and Privacy

Fit.VR handles sensitive body data and camera access. The default product posture is privacy-preserving.

## Principles

- No raw camera recording by default.
- Camera access only after explicit consent.
- Temporary processing mode is available for shoppers who do not want saved measurements.
- Body profiles can be updated, exported, and deleted by the user.
- Camera-based measurement is presented as an estimate with a confidence score.
- Measurements should be encrypted at rest in production.
- Raw landmarks and scan metadata should be minimized and retained only when useful.
- Brand admins only see aggregate analytics unless the user explicitly shares a saved profile.
- Each brand is isolated as a tenant with scoped API keys, analytics, products, sessions, and webhooks.

## Production Controls

- JWT authentication for brand admins.
- API key authentication for SDK and server integrations.
- Role-based access control.
- Brand-level query scoping.
- API key rotation.
- Rate limiting and abuse protection.
- Audit logs for admin actions and sensitive data access.
- Consent records for measurement processing, camera access, saved profiles, and analytics.
- Webhook HMAC signatures.
- GDPR-style export and deletion workflows.
- Data processing agreement support for enterprise brands.

## Camera Data

The AR fitting studio uses the browser camera stream locally. Fit.VR should store only:

- Consent timestamp.
- Device class.
- Product ID.
- Chosen fit preference.
- Size recommendation result.
- Area-wise fit analysis and movement-test scores.
- Optional saved measurements when the user opts in.

The platform must not store camera frames, video, or screenshots unless a separate explicit consent path is added.
