import {
  defaultFitRules,
  demoMeasurements,
  demoSizeChart,
  recommendSize
} from "./fit-engine";

export const navigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Try-on", href: "/try-on" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" }
];

export const products = [
  {
    id: "prod_apex_compression",
    name: "Apex Compression Tee",
    category: "Compression shirt",
    tryOns: 18420,
    confidence: 88,
    fitScore: 87,
    mismatchRate: 8.4,
    returnReduction: 31,
    returnRisk: "low",
    topRecommendedSize: "L",
    commonTightArea: "Biceps",
    commonLooseArea: "Waist",
    fitType: "Compression",
    assetStatus: "GLB ready"
  },
  {
    id: "prod_pump_cover",
    name: "Oversized Pump Cover",
    category: "Oversized tee",
    tryOns: 14380,
    confidence: 91,
    fitScore: 90,
    mismatchRate: 6.8,
    returnReduction: 27,
    returnRisk: "low",
    topRecommendedSize: "XL",
    commonTightArea: "Shoulders",
    commonLooseArea: "Length",
    fitType: "Oversized",
    assetStatus: "Image overlay"
  },
  {
    id: "prod_squat_jogger",
    name: "Squat-Proof Jogger",
    category: "Joggers",
    tryOns: 11760,
    confidence: 86,
    fitScore: 82,
    mismatchRate: 9.1,
    returnReduction: 24,
    returnRisk: "medium",
    topRecommendedSize: "L",
    commonTightArea: "Thighs",
    commonLooseArea: "Calves",
    fitType: "Relaxed",
    assetStatus: "GLB review"
  }
];

export const analytics = {
  totalTryOns: 48720,
  conversionLift: 18.6,
  returnReduction: 28.4,
  averageConfidence: 88,
  dropOff: [
    { stage: "Consent", value: 5 },
    { stage: "Measurements", value: 14 },
    { stage: "Camera", value: 19 },
    { stage: "Recommendation", value: 3 }
  ],
  fitPreferences: [
    { label: "Compression", value: 34 },
    { label: "Oversized", value: 29 },
    { label: "Regular", value: 20 },
    { label: "Slim", value: 12 },
    { label: "Relaxed", value: 5 }
  ],
  bodyDemand: [
    { label: "Athletic", value: 38 },
    { label: "Bodybuilder", value: 22 },
    { label: "Lean", value: 19 },
    { label: "Powerlifter", value: 13 },
    { label: "Standard", value: 8 }
  ],
  tightAreas: [
    { label: "Biceps", value: 31 },
    { label: "Shoulders", value: 24 },
    { label: "Thighs", value: 19 },
    { label: "Chest", value: 15 },
    { label: "Calves", value: 11 }
  ],
  looseAreas: [
    { label: "Waist", value: 27 },
    { label: "Length", value: 22 },
    { label: "Hip", value: 18 },
    { label: "Sleeve", value: 17 },
    { label: "Calves", value: 16 }
  ],
  deviceTypes: [
    { label: "Mobile", value: 64 },
    { label: "Desktop", value: 26 },
    { label: "Tablet", value: 10 }
  ],
  regions: [
    { label: "North America", value: 36 },
    { label: "India", value: 28 },
    { label: "Europe", value: 21 },
    { label: "Middle East", value: 15 }
  ]
};

export const demoRecommendation = recommendSize({
  measurements: demoMeasurements,
  chart: demoSizeChart,
  rules: defaultFitRules
});

export const pricingPlans = [
  {
    name: "Starter",
    price: "$149",
    description: "Small gym brands testing virtual fitting.",
    features: [
      "5,000 monthly try-ons",
      "Basic widget",
      "Manual size chart upload",
      "Core analytics",
      "Email support"
    ]
  },
  {
    name: "Growth",
    price: "$599",
    description: "Growing fitness apparel brands scaling conversion.",
    features: [
      "50,000 monthly try-ons",
      "Advanced analytics",
      "REST API access",
      "Shopify integration",
      "Custom branding"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Large brands with custom data and security needs.",
    features: [
      "Custom try-on volume",
      "White-label SDK",
      "Custom ML fit model",
      "SLA and dedicated support",
      "Security reviews"
    ]
  }
];

export const fitScoreStates = [
  {
    label: "Too tight",
    copy: "High pressure in muscle zones or low movement comfort.",
    tone: "border-[#ff4d6d]/50 text-[#ff9bad]"
  },
  {
    label: "Perfect fit",
    copy: "Measurements, preferred fit, and movement tests align.",
    tone: "border-[#b7ff3c]/50 text-[#d8ff8a]"
  },
  {
    label: "Slightly loose",
    copy: "Extra room is visible but still purchase-safe.",
    tone: "border-[#48f4ff]/50 text-[#bafaff]"
  },
  {
    label: "Oversized",
    copy: "Intentional pump-cover drape with safe shoulder/chest room.",
    tone: "border-[#ffb13b]/50 text-[#ffd79a]"
  },
  {
    label: "Not recommended",
    copy: "Fit or movement risk is too high for this product.",
    tone: "border-white/20 text-[#c8ddd8]"
  }
];

export const movementTests = [
  "Standing front view",
  "Side view",
  "Arm raise test",
  "Shoulder stretch test",
  "Chest expansion test",
  "Bicep flex preview",
  "Squat comfort test",
  "Walking preview",
  "Compression tightness preview"
];

export const brandDashboardModules = [
  "Product management",
  "Size chart management",
  "3D model upload",
  "Fit rule configuration",
  "API key generation",
  "SDK integration guide",
  "Try-on analytics",
  "Conversion analytics",
  "Return-risk analytics",
  "Customer body type insights",
  "Billing and subscriptions",
  "Team roles and audit logs",
  "Webhook settings",
  "Brand customization"
];

export const brandSetupFields = [
  "Product name",
  "Category",
  "Product images",
  "3D model file",
  "Size chart",
  "Fabric type",
  "Fabric stretch level",
  "Fit type",
  "Product length",
  "Sleeve length",
  "Waist fit",
  "Thigh fit",
  "Compression level",
  "Model reference size",
  "Model reference height and weight"
];

export const integrationFlow = [
  "Brand adds the Fit.VR SDK, React component, Shopify app block, or WooCommerce plugin.",
  "A product page button opens the white-label Fit.VR modal with brand and product context.",
  "The shopper chooses guest, saved profile, manual, camera, or hybrid measurement mode.",
  "Fit.VR calculates size, Fit Score, movement comfort, return risk, and area warnings.",
  "The recommended size returns to the storefront and analytics events stream into the dashboard."
];

export const bodyProfileFields = [
  "Height",
  "Weight",
  "Chest",
  "Shoulder width",
  "Waist",
  "Hip",
  "Arm length",
  "Bicep size",
  "Thigh size",
  "Calf size",
  "Inseam",
  "Preferred fit style",
  "Saved scan data when allowed"
];

export const roadmap = [
  {
    phase: "MVP",
    items: [
      "Landing page",
      "Brand signup and dashboard",
      "Product and size chart upload",
      "Manual measurement form",
      "Basic camera permission flow",
      "Fit Score and size recommendation engine",
      "SDK button demo",
      "Analytics dashboard"
    ]
  },
  {
    phase: "Version 2",
    items: [
      "Camera body scan",
      "Pose detection confidence",
      "Movement testing",
      "Reusable Body Profile",
      "Shopify integration",
      "Advanced analytics",
      "Fabric stretch logic"
    ]
  },
  {
    phase: "Version 3",
    items: [
      "3D body avatar",
      "Full AR try-on",
      "AI personal stylist",
      "Return prediction model",
      "Mobile app",
      "White-label enterprise",
      "In-store AR mirror integration"
    ]
  }
];
