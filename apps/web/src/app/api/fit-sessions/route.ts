import { randomUUID } from "crypto";
import { NextResponse, type NextRequest } from "next/server";
import {
  defaultFitRules,
  demoSizeChart,
  recommendSize
} from "@/lib/fit-engine";
import { measurementSchema } from "@/lib/validators";

export async function GET() {
  return NextResponse.json({
    sessions: [
      {
        id: "fit_demo_001",
        productId: "prod_apex_compression",
        bestSize: "L",
        confidence: 88,
        createdAt: new Date().toISOString()
      }
    ]
  });
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = measurementSchema.safeParse(payload.measurements);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid fit session payload",
        details: parsed.error.flatten().fieldErrors
      },
      { status: 422 }
    );
  }

  const recommendation = recommendSize({
    measurements: parsed.data,
    chart: payload.sizeChart ?? demoSizeChart,
    rules: payload.fitRules ?? defaultFitRules
  });

  return NextResponse.json(
    {
      sessionId: `fit_${randomUUID()}`,
      productId: payload.productId,
      recommendation,
      privacyMode: payload.temporaryMode === false ? "saved-profile" : "temporary"
    },
    { status: 201 }
  );
}
