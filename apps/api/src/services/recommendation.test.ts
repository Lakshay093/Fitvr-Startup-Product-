import { describe, expect, it } from "vitest";
import { createRecommendation } from "./recommendation.js";

describe("createRecommendation", () => {
  it("creates a recommendation with body-area warnings", () => {
    const result = createRecommendation({
      heightCm: 180,
      weightKg: 84,
      ageRange: "25-34",
      genderPreference: "unisex",
      bodyType: "athletic",
      shoulderWidthCm: 49,
      chestCm: 110,
      waistCm: 84,
      hipCm: 99,
      armLengthCm: 63,
      bicepCm: 39,
      neckCm: 40,
      thighCm: 63,
      calfCm: 42,
      inseamCm: 81,
      preferredFit: "compression"
    });

    expect(result.bestSize).toBeTruthy();
    expect(result.confidence).toBeGreaterThan(50);
    expect(result.overallFitScore).toBeGreaterThan(50);
    expect(result.movementTests.length).toBeGreaterThan(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});
