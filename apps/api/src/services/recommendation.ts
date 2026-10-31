import type {
  AreaFitAnalysis,
  BodyMeasurementInput,
  FitStatus,
  MovementStatus,
  MovementTestResult,
  ReturnRiskLevel,
  SizeRecommendation
} from "@fitvr/shared";

type SizeRow = {
  size: string;
  chestMax: number;
  waistMax: number;
  shoulderMax: number;
  bicepMax: number;
  thighMax: number;
  calfMax: number;
};

const sizeRows: SizeRow[] = [
  {
    size: "S",
    chestMax: 96,
    waistMax: 82,
    shoulderMax: 43,
    bicepMax: 34,
    thighMax: 55,
    calfMax: 38
  },
  {
    size: "M",
    chestMax: 106,
    waistMax: 90,
    shoulderMax: 47,
    bicepMax: 38,
    thighMax: 60,
    calfMax: 41
  },
  {
    size: "L",
    chestMax: 116,
    waistMax: 98,
    shoulderMax: 51,
    bicepMax: 42,
    thighMax: 66,
    calfMax: 44
  },
  {
    size: "XL",
    chestMax: 128,
    waistMax: 108,
    shoulderMax: 56,
    bicepMax: 47,
    thighMax: 72,
    calfMax: 48
  }
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function scoreDistance(value: number, max: number, multiplier: number) {
  return clamp(100 - Math.abs(max - value) * multiplier, 20, 98);
}

function statusFor(value: number, max: number, score: number): FitStatus {
  if (value > max + 4) {
    return score < 58 ? "not recommended" : "too tight";
  }

  if (value < max - 12) {
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

function movementStatus(score: number): MovementStatus {
  if (score < 64) {
    return "fail";
  }

  if (score < 80) {
    return "caution";
  }

  return "pass";
}

function createArea(
  area: string,
  measurementKey: string,
  measuredCm: number,
  max: number,
  score: number
): AreaFitAnalysis {
  const status = statusFor(measuredCm, max, score);
  const severity =
    status === "too tight" || status === "not recommended"
      ? "warning"
      : status === "slightly loose" || status === "oversized"
        ? "notice"
        : "good";

  return {
    area,
    measurementKey,
    score: Math.round(score),
    status,
    severity,
    measuredCm,
    targetRange: `up to ${max} cm`,
    message:
      severity === "warning"
        ? `${area} may feel tight in this size.`
        : severity === "notice"
          ? `${area} has extra room in this size.`
          : `${area} fit is in range.`
  };
}

function createMovementTests(areas: AreaFitAnalysis[]): MovementTestResult[] {
  const score = (area: string) =>
    areas.find((item) => item.area === area)?.score ?? 84;
  const tests = [
    {
      key: "standing_front",
      label: "Standing front view",
      score: Math.round((score("Chest") + score("Waist")) / 2)
    },
    {
      key: "arm_raise",
      label: "Arm raise test",
      score: Math.round((score("Shoulders") + score("Biceps")) / 2)
    },
    {
      key: "bicep_flex",
      label: "Bicep flex preview",
      score: score("Biceps")
    },
    {
      key: "squat_comfort",
      label: "Squat comfort test",
      score: Math.round((score("Thighs") + score("Calves")) / 2)
    },
    {
      key: "compression_tightness",
      label: "Compression tightness preview",
      score: Math.round((score("Chest") + score("Biceps")) / 2)
    }
  ];

  return tests.map((test) => {
    const safeScore = clamp(test.score, 30, 98);
    const status = movementStatus(safeScore);

    return {
      ...test,
      score: safeScore,
      status,
      message:
        status === "pass"
          ? `${test.label} should feel comfortable.`
          : status === "caution"
            ? `${test.label} may need more room.`
            : `${test.label} has high movement risk.`
    };
  });
}

export function createRecommendation(
  measurements: BodyMeasurementInput
): SizeRecommendation {
  const score = (row: SizeRow) => {
    const chest = scoreDistance(measurements.chestCm, row.chestMax, 4);
    const waist = scoreDistance(measurements.waistCm, row.waistMax, 3);
    const shoulders = scoreDistance(
      measurements.shoulderWidthCm,
      row.shoulderMax,
      7
    );
    const biceps = measurements.bicepCm > row.bicepMax ? 68 : 96;
    const thighs = measurements.thighCm > row.thighMax ? 70 : 94;
    const calves = measurements.calfCm > row.calfMax ? 72 : 94;
    const preferenceBoost = measurements.preferredFit === "oversized" ? 4 : 0;

    return (
      (chest + waist + shoulders + biceps + thighs + calves) / 6 +
      preferenceBoost
    );
  };

  const ranked = [...sizeRows].sort((a, b) => score(b) - score(a));
  const best = ranked[0] ?? sizeRows[2]!;
  const alternative = ranked[1] ?? best;
  const fitConfidence = Math.round(clamp(score(best), 58, 95));
  const areaAnalysis = [
    createArea(
      "Chest",
      "chestCm",
      measurements.chestCm,
      best.chestMax,
      scoreDistance(measurements.chestCm, best.chestMax, 4)
    ),
    createArea(
      "Shoulders",
      "shoulderWidthCm",
      measurements.shoulderWidthCm,
      best.shoulderMax,
      scoreDistance(measurements.shoulderWidthCm, best.shoulderMax, 7)
    ),
    createArea(
      "Waist",
      "waistCm",
      measurements.waistCm,
      best.waistMax,
      scoreDistance(measurements.waistCm, best.waistMax, 3)
    ),
    createArea("Biceps", "bicepCm", measurements.bicepCm, best.bicepMax, measurements.bicepCm > best.bicepMax ? 68 : 96),
    createArea("Thighs", "thighCm", measurements.thighCm, best.thighMax, measurements.thighCm > best.thighMax ? 70 : 94),
    createArea("Calves", "calfCm", measurements.calfCm, best.calfMax, measurements.calfCm > best.calfMax ? 72 : 94)
  ];
  const movementTests = createMovementTests(areaAnalysis);
  const movementAverage =
    movementTests.reduce((total, test) => total + test.score, 0) /
    movementTests.length;
  const overallFitScore = Math.round(fitConfidence * 0.78 + movementAverage * 0.22);
  const warningLoad = areaAnalysis.filter((area) => area.severity === "warning").length;
  const returnRiskScore = Math.round(clamp(100 - overallFitScore + warningLoad * 12, 8, 95));
  const fitStatus: FitStatus = areaAnalysis.some(
    (area) => area.status === "not recommended"
  )
    ? "not recommended"
    : areaAnalysis.some((area) => area.status === "too tight")
      ? "too tight"
      : measurements.preferredFit === "oversized"
        ? "oversized"
        : "perfect fit";

  return {
    bestSize: best.size,
    recommendedSize: best.size,
    alternativeSize: alternative.size,
    confidence: fitConfidence,
    fitConfidence,
    overallFitScore,
    expectedFit:
      measurements.preferredFit === "oversized"
        ? "Oversized pump-cover"
        : measurements.preferredFit === "compression"
          ? "Athletic compression"
          : "Athletic regular",
    fitType: measurements.preferredFit,
    fitStatus,
    returnRiskScore,
    returnRiskLevel: riskLevel(returnRiskScore),
    reason: `Size ${best.size} is recommended because chest, shoulders, and athletic movement zones best match this size chart.`,
    warnings: areaAnalysis.map(({ area, severity, message }) => ({
      area,
      severity,
      message
    })),
    areaAnalysis,
    movementTests
  };
}
