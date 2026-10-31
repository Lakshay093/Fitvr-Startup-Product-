export type FitPreference =
  | "slim"
  | "regular"
  | "oversized"
  | "compression"
  | "relaxed";

export type MeasurementMode = "manual" | "camera_scan" | "hybrid";

export type ProfileMode =
  | "guest"
  | "saved_profile"
  | "temporary"
  | "multi_profile";

export type GarmentCategory =
  | "tshirt"
  | "tank"
  | "stringer"
  | "hoodie"
  | "compressionTop"
  | "joggers"
  | "shorts"
  | "leggings"
  | "compressionPants";

export type MeasurementKey =
  | "shoulderWidthCm"
  | "chestCm"
  | "waistCm"
  | "hipCm"
  | "bicepCm"
  | "thighCm"
  | "calfCm"
  | "inseamCm";

export type FitStatus =
  | "too tight"
  | "perfect fit"
  | "slightly loose"
  | "oversized"
  | "not recommended";

export type MovementStatus = "pass" | "caution" | "fail";

export type BodyMeasurements = {
  heightCm: number;
  weightKg: number;
  ageRange: "16-24" | "25-34" | "35-44" | "45+";
  genderPreference: "male" | "female" | "unisex" | "custom";
  bodyType: "athletic" | "bodybuilder" | "lean" | "powerlifter" | "standard";
  shoulderWidthCm: number;
  chestCm: number;
  waistCm: number;
  hipCm: number;
  armLengthCm: number;
  bicepCm: number;
  neckCm: number;
  thighCm: number;
  calfCm: number;
  inseamCm: number;
  preferredFit: FitPreference;
};

export type SizeChartRow = {
  size: string;
  shoulderMin: number;
  shoulderMax: number;
  chestMin: number;
  chestMax: number;
  waistMin: number;
  waistMax: number;
  hipMin: number;
  hipMax: number;
  bicepMax: number;
  thighMax: number;
  calfMax: number;
  inseamMin: number;
  inseamMax: number;
};

export type ProductFitRules = {
  category: GarmentCategory;
  intendedFit: FitPreference;
  fabricType: string;
  stretchPercent: number;
  compressionLevel: 0 | 1 | 2 | 3 | 4 | 5;
  priorityZones: MeasurementKey[];
  athleticAdjustmentCm: number;
  productLengthCm?: number;
  sleeveLengthCm?: number;
  waistFit?: FitPreference;
  thighFit?: FitPreference;
  modelReferenceSize?: string;
  modelReferenceHeightCm?: number;
  modelReferenceWeightKg?: number;
  historicalReturnRate?: number;
};

export type AreaWarning = {
  area: string;
  severity: "good" | "notice" | "warning";
  message: string;
};

export type AreaFitAnalysis = AreaWarning & {
  measurementKey: MeasurementKey;
  score: number;
  status: FitStatus;
  measuredCm: number;
  targetRange: string;
};

export type MovementTestResult = {
  key:
    | "standing_front"
    | "side_view"
    | "arm_raise"
    | "shoulder_stretch"
    | "chest_expansion"
    | "bicep_flex"
    | "squat_comfort"
    | "walking_preview"
    | "compression_tightness";
  label: string;
  score: number;
  status: MovementStatus;
  message: string;
};

export type ReturnRiskLevel = "low" | "medium" | "high";

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
  warnings: AreaWarning[];
  areaAnalysis: AreaFitAnalysis[];
  movementTests: MovementTestResult[];
};

const zoneLabels: Record<MeasurementKey, string> = {
  shoulderWidthCm: "Shoulders",
  chestCm: "Chest",
  waistCm: "Waist",
  hipCm: "Hips",
  bicepCm: "Biceps",
  thighCm: "Thighs",
  calfCm: "Calves",
  inseamCm: "Inseam"
};

const preferenceOffsets: Record<FitPreference, number> = {
  compression: -3,
  slim: -1.5,
  regular: 0,
  relaxed: 2,
  oversized: 5
};

const defaultPriorityZones: Record<GarmentCategory, MeasurementKey[]> = {
  tshirt: ["shoulderWidthCm", "chestCm", "waistCm", "bicepCm"],
  tank: ["chestCm", "shoulderWidthCm", "waistCm"],
  stringer: ["chestCm", "waistCm", "bicepCm"],
  hoodie: ["shoulderWidthCm", "chestCm", "waistCm"],
  compressionTop: ["chestCm", "shoulderWidthCm", "bicepCm", "waistCm"],
  joggers: ["waistCm", "hipCm", "thighCm", "calfCm", "inseamCm"],
  shorts: ["waistCm", "hipCm", "thighCm"],
  leggings: ["waistCm", "hipCm", "thighCm", "calfCm", "inseamCm"],
  compressionPants: ["waistCm", "hipCm", "thighCm", "calfCm", "inseamCm"]
};

const upperBodyCategories: GarmentCategory[] = [
  "tshirt",
  "tank",
  "stringer",
  "hoodie",
  "compressionTop"
];

export const demoSizeChart: SizeChartRow[] = [
  {
    size: "S",
    shoulderMin: 38,
    shoulderMax: 43,
    chestMin: 86,
    chestMax: 96,
    waistMin: 72,
    waistMax: 82,
    hipMin: 86,
    hipMax: 94,
    bicepMax: 34,
    thighMax: 55,
    calfMax: 38,
    inseamMin: 73,
    inseamMax: 79
  },
  {
    size: "M",
    shoulderMin: 43,
    shoulderMax: 47,
    chestMin: 96,
    chestMax: 106,
    waistMin: 82,
    waistMax: 90,
    hipMin: 94,
    hipMax: 102,
    bicepMax: 38,
    thighMax: 60,
    calfMax: 41,
    inseamMin: 77,
    inseamMax: 82
  },
  {
    size: "L",
    shoulderMin: 47,
    shoulderMax: 51,
    chestMin: 106,
    chestMax: 116,
    waistMin: 90,
    waistMax: 98,
    hipMin: 102,
    hipMax: 110,
    bicepMax: 42,
    thighMax: 66,
    calfMax: 44,
    inseamMin: 80,
    inseamMax: 85
  },
  {
    size: "XL",
    shoulderMin: 51,
    shoulderMax: 56,
    chestMin: 116,
    chestMax: 128,
    waistMin: 98,
    waistMax: 108,
    hipMin: 110,
    hipMax: 120,
    bicepMax: 47,
    thighMax: 72,
    calfMax: 48,
    inseamMin: 82,
    inseamMax: 88
  }
];

export const demoMeasurements: BodyMeasurements = {
  heightCm: 180,
  weightKg: 84,
  ageRange: "25-34",
  genderPreference: "unisex",
  bodyType: "athletic",
  shoulderWidthCm: 51,
  chestCm: 116,
  waistCm: 90,
  hipCm: 99,
  armLengthCm: 63,
  bicepCm: 42,
  neckCm: 40,
  thighCm: 66,
  calfCm: 43,
  inseamCm: 81,
  preferredFit: "compression"
};

function rangeFor(row: SizeChartRow, key: MeasurementKey) {
  switch (key) {
    case "shoulderWidthCm":
      return [row.shoulderMin, row.shoulderMax] as const;
    case "chestCm":
      return [row.chestMin, row.chestMax] as const;
    case "waistCm":
      return [row.waistMin, row.waistMax] as const;
    case "hipCm":
      return [row.hipMin, row.hipMax] as const;
    case "bicepCm":
      return [0, row.bicepMax] as const;
    case "thighCm":
      return [0, row.thighMax] as const;
    case "calfCm":
      return [0, row.calfMax] as const;
    case "inseamCm":
      return [row.inseamMin, row.inseamMax] as const;
  }
}

function scoreZone({
  value,
  min,
  max,
  preferredFit,
  stretchPercent,
  athleticAdjustmentCm
}: {
  value: number;
  min: number;
  max: number;
  preferredFit: FitPreference;
  stretchPercent: number;
  athleticAdjustmentCm: number;
}) {
  const preference = preferenceOffsets[preferredFit];
  const stretchAllowance = (max * stretchPercent) / 100;
  const adjustedMin = Math.max(0, min + preference - athleticAdjustmentCm / 2);
  const adjustedMax = max + preference + stretchAllowance + athleticAdjustmentCm;

  if (value >= adjustedMin && value <= adjustedMax) {
    const targetMid = (adjustedMin + adjustedMax) / 2;
    const distanceFromMid = Math.abs(value - targetMid);
    const range = Math.max(1, adjustedMax - adjustedMin);
    return Math.round(Math.max(88, 100 - (distanceFromMid / range) * 14));
  }

  const distance =
    value < adjustedMin ? adjustedMin - value : value - adjustedMax;
  return Math.round(Math.max(18, 100 - distance * 9));
}

function fitStatusFromScore(
  score: number,
  value: number,
  min: number,
  max: number,
  stretchPercent: number,
  preferredFit: FitPreference,
  key: MeasurementKey
): FitStatus {
  const stretchAllowance = (max * stretchPercent) / 100;
  const lowerBound = key === "bicepCm" || key === "thighCm" || key === "calfCm" ? 0 : min;

  if (value > max + stretchAllowance + 2) {
    return score < 58 ? "not recommended" : "too tight";
  }

  if (preferredFit === "oversized" && value <= max + stretchAllowance && score >= 72) {
    return "oversized";
  }

  if (value < lowerBound - 6) {
    return "oversized";
  }

  if (value < lowerBound - 2) {
    return "slightly loose";
  }

  if (score < 62) {
    return "not recommended";
  }

  return "perfect fit";
}

function severityFromStatus(status: FitStatus): AreaWarning["severity"] {
  if (status === "too tight" || status === "not recommended") {
    return "warning";
  }

  if (status === "slightly loose" || status === "oversized") {
    return "notice";
  }

  return "good";
}

function messageForStatus(
  label: string,
  status: FitStatus,
  row: SizeChartRow,
  rules: ProductFitRules
) {
  switch (status) {
    case "too tight":
      return `${label} may feel tight in ${row.size}, especially during training movement.`;
    case "slightly loose":
      return `${label} has extra room in ${row.size} for a relaxed feel.`;
    case "oversized":
      return `${label} supports an oversized pump-cover drape in ${row.size}.`;
    case "not recommended":
      return `${label} is outside the safe fit range for ${row.size}.`;
    case "perfect fit":
      return rules.intendedFit === "compression"
        ? `${label} sits in the target compression range.`
        : `${label} fit looks dialed in.`;
  }
}

function areaAnalysis(
  key: MeasurementKey,
  value: number,
  row: SizeChartRow,
  measurements: BodyMeasurements,
  rules: ProductFitRules
): AreaFitAnalysis {
  const [min, max] = rangeFor(row, key);
  const score = scoreZone({
    value,
    min,
    max,
    preferredFit: measurements.preferredFit,
    stretchPercent: rules.stretchPercent,
    athleticAdjustmentCm: rules.athleticAdjustmentCm
  });
  const status = fitStatusFromScore(
    score,
    value,
    min,
    max,
    rules.stretchPercent,
    measurements.preferredFit,
    key
  );
  const label = zoneLabels[key];

  return {
    area: label,
    measurementKey: key,
    score,
    status,
    severity: severityFromStatus(status),
    measuredCm: value,
    targetRange: min > 0 ? `${min}-${max} cm` : `up to ${max} cm`,
    message: messageForStatus(label, status, row, rules)
  };
}

function movementStatus(score: number): MovementStatus {
  if (score < 64) {
    return "fail";
  }

  if (score < 80) {
    return "caution";
  }

  return "pass";
}

function movementMessage(label: string, score: number, status: MovementStatus) {
  if (status === "pass") {
    return `${label} should feel comfortable for normal workout movement.`;
  }

  if (status === "caution") {
    return `${label} may need attention if the shopper prefers more mobility.`;
  }

  return `${label} is a high-friction movement for this size.`;
}

function scoreByArea(areas: AreaFitAnalysis[], key: MeasurementKey) {
  return areas.find((area) => area.measurementKey === key)?.score ?? 82;
}

function createMovementTests(
  areas: AreaFitAnalysis[],
  rules: ProductFitRules
): MovementTestResult[] {
  const isUpper = upperBodyCategories.includes(rules.category);
  const commonTests: { key: MovementTestResult["key"]; label: string; score: number }[] = [
    {
      key: "standing_front",
      label: "Standing front view",
      score: Math.round(
        (scoreByArea(areas, "chestCm") + scoreByArea(areas, "waistCm")) / 2
      )
    },
    {
      key: "side_view",
      label: "Side view",
      score: Math.round(
        (scoreByArea(areas, "chestCm") + scoreByArea(areas, "hipCm")) / 2
      )
    }
  ];

  const upperTests: typeof commonTests = [
    {
      key: "arm_raise",
      label: "Arm raise test",
      score: Math.round(
        (scoreByArea(areas, "shoulderWidthCm") + scoreByArea(areas, "bicepCm")) / 2
      )
    },
    {
      key: "shoulder_stretch",
      label: "Shoulder stretch test",
      score: scoreByArea(areas, "shoulderWidthCm")
    },
    {
      key: "chest_expansion",
      label: "Chest expansion test",
      score: Math.round(
        (scoreByArea(areas, "chestCm") + rules.stretchPercent * 2) / 1.08
      )
    },
    {
      key: "bicep_flex",
      label: "Bicep flex preview",
      score: Math.round(
        scoreByArea(areas, "bicepCm") - Math.max(0, 5 - rules.stretchPercent)
      )
    }
  ];

  const lowerTests: typeof commonTests = [
    {
      key: "squat_comfort",
      label: "Squat comfort test",
      score: Math.round(
        (scoreByArea(areas, "hipCm") + scoreByArea(areas, "thighCm")) / 2
      )
    },
    {
      key: "walking_preview",
      label: "Walking preview",
      score: Math.round(
        (scoreByArea(areas, "thighCm") + scoreByArea(areas, "calfCm")) / 2
      )
    }
  ];

  const compressionTest: typeof commonTests =
    rules.intendedFit === "compression"
      ? [
          {
            key: "compression_tightness",
            label: "Compression tightness preview",
            score: Math.round(
              (scoreByArea(areas, isUpper ? "chestCm" : "thighCm") +
                scoreByArea(areas, isUpper ? "bicepCm" : "calfCm")) /
                2 -
                rules.compressionLevel * 1.5
            )
          }
        ]
      : [];

  return [
    ...commonTests,
    ...(isUpper ? upperTests : lowerTests),
    ...compressionTest
  ].map((test) => {
    const safeScore = Math.max(30, Math.min(98, test.score));
    const status = movementStatus(safeScore);

    return {
      ...test,
      score: safeScore,
      status,
      message: movementMessage(test.label, safeScore, status)
    };
  });
}

function overallStatus(
  score: number,
  measurements: BodyMeasurements,
  warnings: AreaFitAnalysis[]
): FitStatus {
  if (warnings.some((warning) => warning.status === "not recommended")) {
    return "not recommended";
  }

  if (warnings.some((warning) => warning.status === "too tight")) {
    return "too tight";
  }

  if (measurements.preferredFit === "oversized" && score >= 72) {
    return "oversized";
  }

  if (warnings.some((warning) => warning.status === "slightly loose")) {
    return "slightly loose";
  }

  return "perfect fit";
}

function riskLevel(score: number): ReturnRiskLevel {
  if (score >= 68) {
    return "high";
  }

  if (score >= 38) {
    return "medium";
  }

  return "low";
}

function recommendationReason({
  bestSize,
  alternativeSize,
  areas,
  rules,
  measurements
}: {
  bestSize: string;
  alternativeSize: string;
  areas: AreaFitAnalysis[];
  rules: ProductFitRules;
  measurements: BodyMeasurements;
}) {
  const strongAreas = areas
    .filter((area) => area.severity === "good")
    .slice(0, 2)
    .map((area) => area.area.toLowerCase());
  const caution = areas.find((area) => area.severity !== "good");
  const base = `Size ${bestSize} is recommended because ${strongAreas.join(" and ") || "your key measurements"} match the brand size chart for a ${measurements.preferredFit} fit.`;

  if (!caution) {
    return `${base} ${alternativeSize} is kept as an alternative if the shopper wants a different feel.`;
  }

  return `${base} However, ${caution.area.toLowerCase()} needs attention because this ${rules.fabricType.toLowerCase()} garment has ${rules.stretchPercent}% stretch.`;
}

export function recommendSize({
  measurements,
  chart,
  rules
}: {
  measurements: BodyMeasurements;
  chart: SizeChartRow[];
  rules: ProductFitRules;
}): SizeRecommendation {
  if (chart.length === 0) {
    throw new Error("A size chart with at least one row is required.");
  }

  const priorityZones =
    rules.priorityZones.length > 0
      ? rules.priorityZones
      : defaultPriorityZones[rules.category];

  const scoredRows = chart.map((row, rowIndex) => {
    const zoneScores = priorityZones.map((zone) => {
      const [min, max] = rangeFor(row, zone);
      return scoreZone({
        value: measurements[zone],
        min,
        max,
        preferredFit: measurements.preferredFit,
        stretchPercent: rules.stretchPercent,
        athleticAdjustmentCm: rules.athleticAdjustmentCm
      });
    });

    const score =
      zoneScores.reduce((total, value) => total + value, 0) / zoneScores.length;
    const drapeBoost =
      measurements.preferredFit === "oversized"
        ? rowIndex * 10
        : measurements.preferredFit === "relaxed"
          ? rowIndex * 4
          : 0;
    const compressionPenalty =
      measurements.preferredFit === "compression" && rules.stretchPercent < 6
        ? rowIndex * 1.5
        : 0;

    return { row, score: score + drapeBoost - compressionPenalty };
  });

  scoredRows.sort((a, b) => b.score - a.score);

  const best = scoredRows[0]?.row ?? chart[0]!;
  const alternative = scoredRows[1]?.row ?? best;
  const rawConfidence = scoredRows[0]?.score ?? 72;
  const fitConfidence = Math.round(Math.min(96, Math.max(52, rawConfidence)));
  const areaAnalysisResults = priorityZones.map((zone) =>
    areaAnalysis(zone, measurements[zone], best, measurements, rules)
  );
  const movementTests = createMovementTests(areaAnalysisResults, rules);
  const movementAverage =
    movementTests.reduce((total, test) => total + test.score, 0) /
    movementTests.length;
  const overallFitScore = Math.round(
    Math.min(98, Math.max(42, fitConfidence * 0.76 + movementAverage * 0.24))
  );
  const warningLoad = areaAnalysisResults.filter(
    (area) => area.severity === "warning"
  ).length;
  const noticeLoad = areaAnalysisResults.filter(
    (area) => area.severity === "notice"
  ).length;
  const returnRiskScore = Math.round(
    Math.min(
      95,
      Math.max(
        8,
        100 -
          overallFitScore +
          warningLoad * 14 +
          noticeLoad * 6 +
          (rules.historicalReturnRate ?? 0) * 1.4
      )
    )
  );
  const fitStatus = overallStatus(
    overallFitScore,
    measurements,
    areaAnalysisResults
  );
  const compressionLanguage =
    measurements.preferredFit === "compression"
      ? "Athletic compression"
      : measurements.preferredFit === "oversized"
        ? "Oversized pump-cover"
        : `${measurements.preferredFit[0]?.toUpperCase()}${measurements.preferredFit.slice(1)} athletic`;

  return {
    bestSize: best.size,
    recommendedSize: best.size,
    alternativeSize: alternative.size,
    confidence: fitConfidence,
    fitConfidence,
    overallFitScore,
    expectedFit: compressionLanguage,
    fitType: measurements.preferredFit,
    fitStatus,
    returnRiskScore,
    returnRiskLevel: riskLevel(returnRiskScore),
    reason: recommendationReason({
      bestSize: best.size,
      alternativeSize: alternative.size,
      areas: areaAnalysisResults,
      rules,
      measurements
    }),
    warnings: areaAnalysisResults.map(({ area, severity, message }) => ({
      area,
      severity,
      message
    })),
    areaAnalysis: areaAnalysisResults,
    movementTests
  };
}

export const defaultFitRules: ProductFitRules = {
  category: "compressionTop",
  intendedFit: "compression",
  fabricType: "Nylon spandex blend",
  stretchPercent: 8,
  compressionLevel: 4,
  priorityZones: ["shoulderWidthCm", "chestCm", "bicepCm", "waistCm"],
  athleticAdjustmentCm: 1.5,
  productLengthCm: 72,
  sleeveLengthCm: 22,
  modelReferenceSize: "L",
  modelReferenceHeightCm: 183,
  modelReferenceWeightKg: 86,
  historicalReturnRate: 8.4
};
