import { z } from "zod";

export const fitPreferenceSchema = z.enum([
  "slim",
  "regular",
  "oversized",
  "compression",
  "relaxed"
]);

export const bodyMeasurementSchema = z.object({
  heightCm: z.coerce.number().min(120).max(230),
  weightKg: z.coerce.number().min(35).max(220),
  ageRange: z.enum(["16-24", "25-34", "35-44", "45+"]),
  genderPreference: z.enum(["male", "female", "unisex", "custom"]),
  bodyType: z.enum(["athletic", "bodybuilder", "lean", "powerlifter", "standard"]),
  shoulderWidthCm: z.coerce.number().min(25).max(75),
  chestCm: z.coerce.number().min(60).max(180),
  waistCm: z.coerce.number().min(50).max(170),
  hipCm: z.coerce.number().min(60).max(180),
  armLengthCm: z.coerce.number().min(40).max(90),
  bicepCm: z.coerce.number().min(18).max(75),
  neckCm: z.coerce.number().min(25).max(65),
  thighCm: z.coerce.number().min(35).max(100),
  calfCm: z.coerce.number().min(20).max(70),
  inseamCm: z.coerce.number().min(50).max(105),
  preferredFit: fitPreferenceSchema
});

export const productInputSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  category: z.string().min(2),
  intendedFit: fitPreferenceSchema,
  fabricType: z.string().min(2).default("Nylon spandex blend"),
  stretchPercent: z.coerce.number().min(0).max(40),
  compressionLevel: z.coerce.number().int().min(0).max(5).default(0),
  productLengthCm: z.coerce.number().min(20).max(160).optional(),
  sleeveLengthCm: z.coerce.number().min(0).max(100).optional(),
  waistFit: fitPreferenceSchema.optional(),
  thighFit: fitPreferenceSchema.optional(),
  modelReferenceSize: z.string().optional(),
  modelReferenceHeightCm: z.coerce.number().min(120).max(230).optional(),
  modelReferenceWeightKg: z.coerce.number().min(35).max(220).optional()
});

export const fitSessionInputSchema = z.object({
  productId: z.string().min(1),
  temporaryMode: z.boolean().default(true),
  measurements: bodyMeasurementSchema
});

export type FitPreference = z.infer<typeof fitPreferenceSchema>;
export type BodyMeasurementInput = z.infer<typeof bodyMeasurementSchema>;
export type ProductInput = z.infer<typeof productInputSchema>;
export type FitSessionInput = z.infer<typeof fitSessionInputSchema>;

export type FitStatus =
  | "too tight"
  | "perfect fit"
  | "slightly loose"
  | "oversized"
  | "not recommended";

export type ReturnRiskLevel = "low" | "medium" | "high";

export type MovementStatus = "pass" | "caution" | "fail";

export type AreaFitAnalysis = {
  area: string;
  measurementKey: string;
  score: number;
  status: FitStatus;
  severity: "good" | "notice" | "warning";
  measuredCm: number;
  targetRange: string;
  message: string;
};

export type MovementTestResult = {
  key: string;
  label: string;
  score: number;
  status: MovementStatus;
  message: string;
};

export type SizeRecommendation = {
  bestSize: string;
  recommendedSize: string;
  alternativeSize: string;
  confidence: number;
  fitConfidence: number;
  overallFitScore: number;
  expectedFit: string;
  fitType: FitPreference;
  fitStatus: FitStatus;
  returnRiskScore: number;
  returnRiskLevel: ReturnRiskLevel;
  reason: string;
  warnings: {
    area: string;
    severity: "good" | "notice" | "warning";
    message: string;
  }[];
  areaAnalysis: AreaFitAnalysis[];
  movementTests: MovementTestResult[];
};
