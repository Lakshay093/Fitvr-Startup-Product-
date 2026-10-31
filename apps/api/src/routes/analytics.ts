import { Router } from "express";

export const analyticsRouter = Router();

analyticsRouter.get("/overview", (request, response) => {
  response.json({
    brandId: request.tenant?.brandId,
    totalTryOns: 48720,
    conversionLift: 18.6,
    returnReduction: 28.4,
    averageFitConfidence: 88,
    averageFitScore: 87,
    returnRiskProducts: 3,
    fitPreferences: {
      compression: 34,
      oversized: 29,
      regular: 20,
      slim: 12,
      relaxed: 5
    },
    commonTightAreas: {
      biceps: 31,
      shoulders: 24,
      thighs: 19,
      chest: 15,
      calves: 11
    },
    commonLooseAreas: {
      waist: 27,
      length: 22,
      hip: 18,
      sleeve: 17,
      calves: 16
    },
    funnelDropOff: {
      consent: 5,
      measurements: 14,
      camera: 19,
      recommendation: 3
    }
  });
});
