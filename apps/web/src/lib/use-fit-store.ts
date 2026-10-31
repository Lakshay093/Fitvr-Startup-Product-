"use client";

import { create } from "zustand";
import type { BodyMeasurements, SizeRecommendation } from "./fit-engine";
import { demoMeasurements } from "./fit-engine";

type FitStore = {
  measurements: BodyMeasurements;
  consentAccepted: boolean;
  temporaryMode: boolean;
  recommendation: SizeRecommendation | null;
  setMeasurements: (measurements: BodyMeasurements) => void;
  setConsentAccepted: (value: boolean) => void;
  setTemporaryMode: (value: boolean) => void;
  setRecommendation: (recommendation: SizeRecommendation | null) => void;
};

export const useFitStore = create<FitStore>((set) => ({
  measurements: demoMeasurements,
  consentAccepted: false,
  temporaryMode: true,
  recommendation: null,
  setMeasurements: (measurements) => set({ measurements }),
  setConsentAccepted: (consentAccepted) => set({ consentAccepted }),
  setTemporaryMode: (temporaryMode) => set({ temporaryMode }),
  setRecommendation: (recommendation) => set({ recommendation })
}));
