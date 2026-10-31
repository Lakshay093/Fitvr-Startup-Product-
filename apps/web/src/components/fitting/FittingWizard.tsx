"use client";

import {
  Activity,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  LockKeyhole,
  Ruler,
  Save,
  ScanLine,
  Sparkles,
  UserRound,
  Users
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  defaultFitRules,
  demoSizeChart,
  recommendSize,
  type BodyMeasurements,
  type FitPreference,
  type MeasurementMode,
  type ProfileMode
} from "@/lib/fit-engine";
import { useFitStore } from "@/lib/use-fit-store";
import { CameraFittingStudio } from "./CameraFittingStudio";

const numericFields: {
  key: keyof Pick<
    BodyMeasurements,
    | "heightCm"
    | "weightKg"
    | "shoulderWidthCm"
    | "chestCm"
    | "waistCm"
    | "hipCm"
    | "armLengthCm"
    | "bicepCm"
    | "neckCm"
    | "thighCm"
    | "calfCm"
    | "inseamCm"
  >;
  label: string;
  suffix: string;
}[] = [
  { key: "heightCm", label: "Height", suffix: "cm" },
  { key: "weightKg", label: "Weight", suffix: "kg" },
  { key: "shoulderWidthCm", label: "Shoulder width", suffix: "cm" },
  { key: "chestCm", label: "Chest", suffix: "cm" },
  { key: "waistCm", label: "Waist", suffix: "cm" },
  { key: "hipCm", label: "Hip", suffix: "cm" },
  { key: "armLengthCm", label: "Arm length", suffix: "cm" },
  { key: "bicepCm", label: "Bicep", suffix: "cm" },
  { key: "neckCm", label: "Neck", suffix: "cm" },
  { key: "thighCm", label: "Thigh", suffix: "cm" },
  { key: "calfCm", label: "Calf", suffix: "cm" },
  { key: "inseamCm", label: "Inseam", suffix: "cm" }
];

const fitPreferences: FitPreference[] = [
  "compression",
  "slim",
  "regular",
  "oversized",
  "relaxed"
];

const measurementModes: {
  mode: MeasurementMode;
  title: string;
  copy: string;
  icon: typeof Ruler;
}[] = [
  {
    mode: "manual",
    title: "Manual",
    copy: "Typed body measurements.",
    icon: Ruler
  },
  {
    mode: "camera_scan",
    title: "Camera scan",
    copy: "Pose-estimated measurements.",
    icon: ScanLine
  },
  {
    mode: "hybrid",
    title: "Hybrid",
    copy: "Height and weight plus camera refinement.",
    icon: Camera
  }
];

const profileModes: {
  mode: ProfileMode;
  label: string;
  copy: string;
}[] = [
  {
    mode: "temporary",
    label: "Guest try-on",
    copy: "No saved profile"
  },
  {
    mode: "saved_profile",
    label: "Saved profile",
    copy: "Reuse across brands"
  },
  {
    mode: "multi_profile",
    label: "Shop for others",
    copy: "Multiple body profiles"
  },
  {
    mode: "guest",
    label: "Delete-ready",
    copy: "Export or erase later"
  }
];

export function FittingWizard({ compact = false }: { compact?: boolean }) {
  const {
    measurements,
    consentAccepted,
    temporaryMode,
    recommendation,
    setMeasurements,
    setConsentAccepted,
    setTemporaryMode,
    setRecommendation
  } = useFitStore();
  const [step, setStep] = useState<"profile" | "recommendation" | "camera">(
    "profile"
  );
  const [measurementMode, setMeasurementMode] =
    useState<MeasurementMode>("manual");
  const [profileMode, setProfileMode] = useState<ProfileMode>("temporary");

  const confidenceTone = useMemo(() => {
    if (!recommendation) {
      return "text-[#748068]";
    }

    return recommendation.fitConfidence >= 85
      ? "text-[#697f51]"
      : "text-[#a27a36]";
  }, [recommendation]);

  function updateMeasurement(
    key: keyof BodyMeasurements,
    value: string | number
  ) {
    setMeasurements({
      ...measurements,
      [key]: typeof value === "number" ? value : Number(value)
    });
  }

  function calculateRecommendation() {
    const nextRecommendation = recommendSize({
      measurements,
      chart: demoSizeChart,
      rules: defaultFitRules
    });
    setRecommendation(nextRecommendation);
    window.parent?.postMessage(
      {
        type: "fitvr:recommendation",
        recommendation: {
          productId: "prod_apex_compression",
          recommendedSize: nextRecommendation.recommendedSize,
          bestSize: nextRecommendation.bestSize,
          alternativeSize: nextRecommendation.alternativeSize,
          confidence: nextRecommendation.confidence,
          fitConfidence: nextRecommendation.fitConfidence,
          overallFitScore: nextRecommendation.overallFitScore,
          fitStatus: nextRecommendation.fitStatus,
          returnRiskLevel: nextRecommendation.returnRiskLevel,
          areaAnalysis: nextRecommendation.areaAnalysis,
          movementTests: nextRecommendation.movementTests
        }
      },
      "*"
    );
    setStep("recommendation");
  }

  return (
    <div className={`grid gap-6 ${compact ? "" : "xl:grid-cols-[0.95fr_1.05fr]"}`}>
      <section className="surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Ruler className="size-5 text-[#697f51]" aria-hidden />
            <div>
              <h2 className="text-xl font-semibold">Body profile</h2>
              <p className="text-sm text-[#748068]">Manual entry, AI estimate, or camera scan.</p>
            </div>
          </div>
          <div className="flex rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-1">
            {(["profile", "recommendation", "camera"] as const).map((item) => (
              <button
                key={item}
                className={`rounded-[6px] px-3 py-2 text-xs font-semibold capitalize ${step === item ? "bg-[#d9e6c7] text-black" : "text-[#748068]"}`}
                onClick={() => setStep(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {measurementModes.map(({ icon: Icon, mode, title, copy }) => (
            <button
              key={mode}
              className={`rounded-[10px] border p-4 text-left transition ${
                measurementMode === mode
                  ? "border-[#b6c9a0] bg-[#d9e6c7]/10"
                  : "border-[#dce3d3] bg-black/20 hover:border-white/25"
              }`}
              onClick={() => setMeasurementMode(mode)}
              type="button"
            >
              <Icon
                className={`size-5 ${
                  measurementMode === mode ? "text-[#697f51]" : "text-[#648575]"
                }`}
                aria-hidden
              />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#748068]">{copy}</p>
              {mode !== "manual" ? (
                <p className="mt-3 text-xs text-[#a27a36]">
                  Estimate confidence shown after scan
                </p>
              ) : null}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {profileModes.map((mode) => (
            <button
              key={mode.mode}
              className={`rounded-[10px] border px-3 py-3 text-left text-sm ${
                profileMode === mode.mode
                  ? "border-[#b4cbbd] bg-[#d8e9df]/10"
                  : "border-[#dce3d3] bg-[#f7f9f2]"
              }`}
              onClick={() => {
                setProfileMode(mode.mode);
                setTemporaryMode(
                  mode.mode === "temporary" || mode.mode === "guest"
                );
              }}
              type="button"
            >
              <span className="font-semibold">{mode.label}</span>
              <span className="mt-1 block text-xs text-[#748068]">
                {mode.copy}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Age range
            <select
              className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]"
              value={measurements.ageRange}
              onChange={(event) =>
                setMeasurements({
                  ...measurements,
                  ageRange: event.target.value as BodyMeasurements["ageRange"]
                })
              }
            >
              <option>16-24</option>
              <option>25-34</option>
              <option>35-44</option>
              <option>45+</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Body type
            <select
              className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]"
              value={measurements.bodyType}
              onChange={(event) =>
                setMeasurements({
                  ...measurements,
                  bodyType: event.target.value as BodyMeasurements["bodyType"]
                })
              }
            >
              <option value="athletic">Athletic</option>
              <option value="bodybuilder">Bodybuilder</option>
              <option value="lean">Lean</option>
              <option value="powerlifter">Powerlifter</option>
              <option value="standard">Standard</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Gender/body preference
            <select
              className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]"
              value={measurements.genderPreference}
              onChange={(event) =>
                setMeasurements({
                  ...measurements,
                  genderPreference:
                    event.target.value as BodyMeasurements["genderPreference"]
                })
              }
            >
              <option value="unisex">Unisex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Preferred fit
            <select
              className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]"
              value={measurements.preferredFit}
              onChange={(event) =>
                setMeasurements({
                  ...measurements,
                  preferredFit: event.target.value as FitPreference
                })
              }
            >
              {fitPreferences.map((fit) => (
                <option key={fit} value={fit}>
                  {fit}
                </option>
              ))}
            </select>
          </label>
          {numericFields.map((field) => (
            <label key={field.key} className="grid gap-2 text-sm">
              {field.label}
              <span className="flex rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] focus-within:border-[#b4cbbd]">
                <input
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none"
                  inputMode="decimal"
                  type="number"
                  value={measurements[field.key]}
                  onChange={(event) =>
                    updateMeasurement(field.key, event.target.value)
                  }
                />
                <span className="grid w-12 place-items-center border-l border-[#dce3d3] text-xs text-[#748068]">
                  {field.suffix}
                </span>
              </span>
            </label>
          ))}
        </div>

        <div className="mt-6 grid gap-3">
          <label className="flex items-start gap-3 rounded-[10px] border border-[#dce3d3] bg-[#f7f9f2] p-3 text-sm">
            <input
              className="mt-1"
              type="checkbox"
              checked={consentAccepted}
              onChange={(event) => setConsentAccepted(event.target.checked)}
            />
            <span>
              I agree to camera permission prompts and body measurement processing.
              Raw camera video is not stored by default.
            </span>
          </label>
          <label className="flex items-center gap-3 rounded-[10px] border border-[#dce3d3] bg-[#f7f9f2] p-3 text-sm">
            <input
              type="checkbox"
              checked={temporaryMode}
              onChange={(event) => setTemporaryMode(event.target.checked)}
            />
            Use temporary mode
          </label>
          <div className="grid gap-2 rounded-[10px] border border-[#dce3d3] bg-[#f7f9f2] p-3 text-sm sm:grid-cols-2">
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[10px] border border-[#dce3d3] px-3 text-[#46543a]"
              type="button"
            >
              <Users className="size-4" aria-hidden />
              Add profile
            </button>
            <button
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[10px] border border-[#dce3d3] px-3 text-[#46543a]"
              type="button"
            >
              <ClipboardList className="size-4" aria-hidden />
              Export data
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#d9e6c7] px-4 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!consentAccepted}
            onClick={calculateRecommendation}
            type="button"
          >
            <Sparkles className="size-4" aria-hidden />
            Generate fit
          </button>
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#dce3d3] px-4 text-sm font-semibold text-[#292d26] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!consentAccepted}
            onClick={() => setStep("camera")}
            type="button"
          >
            <Camera className="size-4" aria-hidden />
            Camera scan
          </button>
          <button
            className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#dce3d3] px-4 text-sm font-semibold text-[#292d26]"
            type="button"
          >
            <Save className="size-4" aria-hidden />
            Save profile
          </button>
        </div>
      </section>

      <section className="grid gap-6">
        {step === "camera" ? (
          <CameraFittingStudio consentAccepted={consentAccepted} />
        ) : (
          <div className="surface grid min-h-[520px] content-between overflow-hidden p-5">
            <div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="metric text-xs">APEX COMPRESSION TEE</p>
                  <h2 className="mt-2 text-2xl font-semibold">Fit recommendation</h2>
                </div>
                <div className="flex items-center gap-2 rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-2 text-xs capitalize text-[#46543a]">
                  <Activity className="size-4 text-[#648575]" aria-hidden />
                  {recommendation?.fitStatus ?? "ready"}
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4">
                  <p className="text-xs text-[#748068]">Recommended</p>
                  <p className="mt-2 text-4xl font-semibold">
                    {recommendation?.recommendedSize ?? "--"}
                  </p>
                </div>
                <div className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4">
                  <p className="text-xs text-[#748068]">Alternative</p>
                  <p className="mt-2 text-4xl font-semibold">
                    {recommendation?.alternativeSize ?? "--"}
                  </p>
                </div>
                <div className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4">
                  <p className="text-xs text-[#748068]">Fit Score</p>
                  <p className="mt-2 text-4xl font-semibold text-[#697f51]">
                    {recommendation ? `${recommendation.overallFitScore}%` : "--"}
                  </p>
                </div>
                <div className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4">
                  <p className="text-xs text-[#748068]">Confidence</p>
                  <p className={`mt-2 text-4xl font-semibold ${confidenceTone}`}>
                    {recommendation ? `${recommendation.fitConfidence}%` : "--"}
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4">
                <div className="flex items-center gap-3">
                  <UserRound className="size-5 text-[#697f51]" aria-hidden />
                  <p className="font-semibold">
                    {recommendation?.expectedFit ?? "Ready for measurement"}
                  </p>
                </div>
                {recommendation ? (
                  <div className="mt-4 rounded-[10px] border border-[#b4cbbd]/25 bg-[#d8e9df]/10 p-3 text-sm leading-6 text-[#46543a]">
                    {recommendation.reason}
                  </div>
                ) : null}
                {recommendation ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-3">
                      <p className="text-xs text-[#748068]">Fit type</p>
                      <p className="mt-2 text-sm font-semibold capitalize">
                        {recommendation.fitType}
                      </p>
                    </div>
                    <div className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-3">
                      <p className="text-xs text-[#748068]">Return risk</p>
                      <p className="mt-2 text-sm font-semibold capitalize">
                        {recommendation.returnRiskLevel} ·{" "}
                        {recommendation.returnRiskScore}%
                      </p>
                    </div>
                    <div className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-3">
                      <p className="text-xs text-[#748068]">Mode</p>
                      <p className="mt-2 text-sm font-semibold capitalize">
                        {measurementMode.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                ) : null}
                <div className="mt-4 grid gap-3">
                  {(recommendation?.areaAnalysis ?? []).map((warning) => (
                    <div
                      key={`${warning.area}-${warning.message}`}
                      className="grid gap-3 rounded-[10px] border border-[#dce3d3] bg-[#f7f9f2] p-3 text-sm sm:grid-cols-[1fr_auto]"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className={`mt-0.5 size-4 ${
                            warning.severity === "warning"
                              ? "text-[#b85b57]"
                              : warning.severity === "notice"
                                ? "text-[#a27a36]"
                                : "text-[#697f51]"
                          }`}
                          aria-hidden
                        />
                        <div>
                          <p className="font-semibold">
                            {warning.area}:{" "}
                            <span className="capitalize">{warning.status}</span>
                          </p>
                          <p className="mt-1 text-[#748068]">{warning.message}</p>
                        </div>
                      </div>
                      <div className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-2 text-right">
                        <p className="metric text-lg">{warning.score}%</p>
                        <p className="text-xs text-[#748068]">
                          {warning.measuredCm} cm / {warning.targetRange}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {recommendation ? (
                <div className="mt-6 rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="size-5 text-[#648575]" aria-hidden />
                    <p className="font-semibold">Gym movement testing</p>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {recommendation.movementTests.map((test) => (
                      <div
                        key={test.key}
                        className="rounded-[10px] border border-[#dce3d3] bg-[#f7f9f2] p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold">{test.label}</p>
                          <span
                            className={`rounded-[10px] px-2 py-1 text-xs font-semibold ${
                              test.status === "pass"
                                ? "bg-[#d9e6c7] text-black"
                                : test.status === "caution"
                                  ? "bg-[#ecdfc8] text-black"
                                  : "bg-[#f0d8d5] text-[#292d26]"
                            }`}
                          >
                            {test.score}%
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[#748068]">
                          {test.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#dce3d3] pt-5">
              <div className="flex items-center gap-2 text-sm text-[#748068]">
                <LockKeyhole className="size-4" aria-hidden />
                {temporaryMode
                  ? "Temporary session"
                  : `${profileMode.replace("_", " ")} enabled`}
              </div>
              <button
                className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#b4cbbd]/40 px-4 text-sm font-semibold text-[#46543a] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!recommendation}
                onClick={() => setStep("camera")}
                type="button"
              >
                Open AR preview
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
