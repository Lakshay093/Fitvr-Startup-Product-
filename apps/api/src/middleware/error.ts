import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../lib/logger.js";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    return response.status(422).json({
      error: "Validation failed",
      details: error.flatten().fieldErrors
    });
  }

  logger.error({ error }, "Unhandled API error");

  return response.status(500).json({
    error: "Internal server error"
  });
}
