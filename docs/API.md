# Fit.VR API Reference

Base URL:

```text
https://api.fitvr.com/v1
```

Authentication:

```http
Authorization: Bearer fitvr_live_xxx
```

## Create Fit Session

```http
POST /fit-sessions
```

```json
{
  "productId": "prod_123",
  "temporaryMode": true,
  "measurements": {
    "heightCm": 180,
    "weightKg": 84,
    "ageRange": "25-34",
    "genderPreference": "unisex",
    "bodyType": "athletic",
    "shoulderWidthCm": 49,
    "chestCm": 108,
    "waistCm": 84,
    "hipCm": 98,
    "armLengthCm": 63,
    "bicepCm": 39,
    "neckCm": 40,
    "thighCm": 62,
    "calfCm": 42,
    "inseamCm": 81,
    "preferredFit": "compression"
  }
}
```

Response:

```json
{
  "sessionId": "fit_01J...",
  "recommendation": {
    "bestSize": "L",
    "recommendedSize": "L",
    "alternativeSize": "XL",
    "confidence": 88,
    "fitConfidence": 88,
    "overallFitScore": 87,
    "expectedFit": "Athletic compression",
    "fitType": "compression",
    "fitStatus": "perfect fit",
    "returnRiskScore": 24,
    "returnRiskLevel": "low",
    "reason": "Size L is recommended because chest and shoulders match the brand size chart.",
    "warnings": [
      {
        "area": "Biceps",
        "severity": "notice",
        "message": "Biceps may feel close in L."
      }
    ],
    "areaAnalysis": [
      {
        "area": "Biceps",
        "measurementKey": "bicepCm",
        "score": 82,
        "status": "perfect fit",
        "measuredCm": 39,
        "targetRange": "up to 42 cm"
      }
    ],
    "movementTests": [
      {
        "key": "bicep_flex",
        "label": "Bicep flex preview",
        "score": 82,
        "status": "pass"
      }
    ]
  }
}
```

## Products

```http
GET /products
POST /products
GET /products/:id
PATCH /products/:id
```

Product setup fields include category, images, optional 3D model assets, size chart, fabric type, stretch level, intended fit, product length, sleeve length, waist fit, thigh fit, compression level, and model reference data.

## Size Charts

```http
POST /size-charts
GET /size-charts/:productId
```

## Analytics

```http
GET /analytics/overview
GET /analytics/products/:id
```

Analytics include total virtual try-ons, conversion after try-on, most recommended sizes, average Fit Score, common tight/loose areas, return-risk products, body type trends, device mix, region demand, and funnel drop-off.

## Body Profiles and Privacy

```http
POST /consent
GET /body-profiles
PATCH /body-profiles/:id
DELETE /body-profiles/:id
POST /data-export
POST /delete-request
```

Fit.VR supports guest try-on mode, saved Body Profiles, multiple shopper profiles, update/delete controls, and data export requests.

## Webhooks

Events:

- `fit_session.completed`
- `fit_recommendation.created`
- `body_profile.deleted`
- `api_key.rotated`

Webhook payloads include `brandId`, `eventId`, `createdAt`, and an HMAC signature header named `x-fitvr-signature`.
