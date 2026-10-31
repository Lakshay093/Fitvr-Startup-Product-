import { fitSessionInputSchema } from "@fitvr/shared";
import { randomUUID } from "crypto";
import { Router } from "express";
import { createRecommendation } from "../services/recommendation.js";

export const fitSessionsRouter = Router();

fitSessionsRouter.get("/", (request, response) => {
  response.json({
    brandId: request.tenant?.brandId,
    sessions: [
      {
        id: "fit_demo_001",
        productId: "prod_apex_compression",
        recommendedSize: "L",
        overallFitScore: 87,
        fitConfidence: 88,
        returnRiskLevel: "low"
      }
    ]
  });
});

fitSessionsRouter.post("/", (request, response) => {
  const input = fitSessionInputSchema.parse(request.body);
  const recommendation = createRecommendation(input.measurements);

  response.status(201).json({
    sessionId: `fit_${randomUUID()}`,
    brandId: request.tenant?.brandId,
    productId: input.productId,
    privacyMode: input.temporaryMode ? "temporary" : "saved-profile",
    recommendation
  });
});
