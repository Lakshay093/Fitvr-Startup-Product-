import {
  Code2,
  KeyRound,
  PackagePlus,
  ShieldCheck,
  Webhook,
  type LucideIcon
} from "lucide-react";
import { MarketingNav } from "@/components/marketing/MarketingNav";

const docNavItems: { label: string; icon: LucideIcon }[] = [
  { label: "JavaScript SDK", icon: Code2 },
  { label: "REST API", icon: KeyRound },
  { label: "Product setup", icon: PackagePlus },
  { label: "Webhooks", icon: Webhook },
  { label: "Privacy controls", icon: ShieldCheck }
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f3] text-[#292d26]">
      <MarketingNav />
      <section className="fit-container grid gap-10 py-16 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <p className="metric text-sm">DEVELOPER DOCS</p>
          <h1 className="mt-3 text-4xl font-semibold">Integrate Fit.VR into any commerce stack.</h1>
          <div className="mt-6 grid gap-3">
            {docNavItems.map(({ icon: Icon, label }) => {
              return (
                <div key={label} className="surface flex items-center gap-3 p-4">
                  <Icon className="size-5 text-[#697f51]" aria-hidden />
                  {label}
                </div>
              );
            })}
          </div>
        </aside>
        <div className="grid gap-6">
          <DocBlock
            title="Product page widget"
            code={`<script src="https://cdn.fitvr.com/sdk.js"></script>
<button data-fitvr-product-id="123">Try with Fit.VR</button>
<script>
  window.FitVR.init({
    brandId: "apex-athletics",
    apiKey: "fitvr_live_xxx",
    mode: "modal",
    onRecommendation(result) {
      selectSize(result.recommendedSize);
    }
  });
</script>`}
          />
          <DocBlock
            title="Create fit session"
            code={`POST /v1/fit-sessions
Authorization: Bearer fitvr_live_xxx

{
  "productId": "prod_123",
  "temporaryMode": true,
  "measurements": {
    "heightCm": 180,
    "weightKg": 84,
    "ageRange": "25-34",
    "genderPreference": "unisex",
    "bodyType": "athletic",
    "shoulderWidthCm": 51,
    "chestCm": 110,
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
}`}
          />
          <DocBlock
            title="Recommendation response"
            code={`{
  "sessionId": "fit_123",
  "recommendation": {
    "recommendedSize": "L",
    "alternativeSize": "XL",
    "overallFitScore": 87,
    "fitConfidence": 88,
    "fitStatus": "perfect fit",
    "returnRiskLevel": "low",
    "reason": "Size L is recommended because chest and shoulders match the chart.",
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
}`}
          />
          <DocBlock
            title="Product setup"
            code={`POST /v1/products

{
  "name": "Apex Compression Tee",
  "sku": "APX-COMP-001",
  "category": "compressionTop",
  "intendedFit": "compression",
  "fabricType": "Nylon spandex blend",
  "stretchPercent": 8,
  "compressionLevel": 4,
  "productLengthCm": 72,
  "sleeveLengthCm": 22,
  "modelReferenceSize": "L",
  "modelReferenceHeightCm": 183,
  "modelReferenceWeightKg": 86
}`}
          />
          <DocBlock
            title="Webhook event"
            code={`{
  "event": "fit_session.completed",
  "brandId": "brand_123",
  "sessionId": "fit_123",
  "recommendation": {
    "recommendedSize": "L",
    "overallFitScore": 87,
    "returnRiskLevel": "low"
  }
}`}
          />
          <DocBlock
            title="Privacy endpoints"
            code={`POST   /v1/consent
GET    /v1/body-profiles
PATCH  /v1/body-profiles/:id
DELETE /v1/body-profiles/:id
POST   /v1/data-export
POST   /v1/delete-request`}
          />
        </div>
      </section>
    </main>
  );
}

function DocBlock({ title, code }: { title: string; code: string }) {
  return (
    <section className="surface overflow-hidden">
      <div className="border-b border-[#dce3d3] p-5">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-7 text-[#46543a]">
        <code>{code}</code>
      </pre>
    </section>
  );
}
