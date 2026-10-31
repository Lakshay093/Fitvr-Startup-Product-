import type { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {
  interface Request {
    tenant?: {
      brandId: string;
      apiKeyId?: string;
      role: "brand_admin" | "brand_member" | "platform_admin" | "sdk";
    };
  }
}

export function requestTenant(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const apiKey = request.header("authorization")?.replace("Bearer ", "");
  const brandId = request.header("x-fitvr-brand-id") ?? "brand_demo_apex";

  request.tenant = {
    brandId,
    apiKeyId: apiKey ? "key_resolved_from_hash" : undefined,
    role: apiKey ? "sdk" : "brand_admin"
  };

  next();
}
