import { z } from "zod";

export const measurementSchema = z.object({
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
  preferredFit: z.enum(["slim", "regular", "oversized", "compression", "relaxed"])
});

export const productSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  category: z.string().min(2),
  intendedFit: z.enum(["slim", "regular", "oversized", "compression", "relaxed"]),
  fabricType: z.string().min(2).default("Nylon spandex blend"),
  stretchPercent: z.coerce.number().min(0).max(40),
  compressionLevel: z.coerce.number().int().min(0).max(5).default(0),
  productLengthCm: z.coerce.number().min(20).max(160).optional(),
  sleeveLengthCm: z.coerce.number().min(0).max(100).optional(),
  waistFit: z.enum(["slim", "regular", "oversized", "compression", "relaxed"]).optional(),
  thighFit: z.enum(["slim", "regular", "oversized", "compression", "relaxed"]).optional(),
  modelReferenceSize: z.string().optional(),
  modelReferenceHeightCm: z.coerce.number().min(120).max(230).optional(),
  modelReferenceWeightKg: z.coerce.number().min(35).max(220).optional()
});
