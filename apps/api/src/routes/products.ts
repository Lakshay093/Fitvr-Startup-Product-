import { productInputSchema } from "@fitvr/shared";
import { randomUUID } from "crypto";
import { Router } from "express";

export const productsRouter = Router();

productsRouter.get("/", (request, response) => {
  response.json({
    brandId: request.tenant?.brandId,
    products: [
      {
        id: "prod_apex_compression",
        name: "Apex Compression Tee",
        category: "Compression shirt",
        intendedFit: "compression",
        fabricType: "Nylon spandex blend",
        stretchPercent: 8,
        compressionLevel: 4,
        modelReferenceSize: "L",
        assetStatus: "GLB ready"
      }
    ]
  });
});

productsRouter.post("/", (request, response) => {
  const input = productInputSchema.parse(request.body);

  response.status(201).json({
    id: `prod_${randomUUID()}`,
    brandId: request.tenant?.brandId,
    ...input,
    createdAt: new Date().toISOString()
  });
});
