import { describe, expect, it } from "vitest";
import {
  defaultFitRules,
  demoMeasurements,
  demoSizeChart,
  recommendSize
} from "./fit-engine";

describe("recommendSize", () => {
  it("returns a confident gym apparel size recommendation", () => {
    const recommendation = recommendSize({
      measurements: demoMeasurements,
      chart: demoSizeChart,
      rules: defaultFitRules
    });

    expect(recommendation.bestSize).toBe("L");
    expect(recommendation.confidence).toBeGreaterThan(75);
    expect(recommendation.overallFitScore).toBeGreaterThan(75);
    expect(recommendation.returnRiskLevel).toBe("low");
    expect(recommendation.movementTests.length).toBeGreaterThan(0);
    expect(recommendation.warnings.some((warning) => warning.area === "Chest")).toBe(true);
  });

  it("moves oversized preference toward a larger fit", () => {
    const recommendation = recommendSize({
      measurements: {
        ...demoMeasurements,
        preferredFit: "oversized"
      },
      chart: demoSizeChart,
      rules: {
        ...defaultFitRules,
        intendedFit: "oversized",
        stretchPercent: 2
      }
    });

    expect(["L", "XL"]).toContain(recommendation.bestSize);
    expect(recommendation.expectedFit).toContain("Oversized");
  });
});
