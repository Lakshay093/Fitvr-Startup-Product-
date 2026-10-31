import { NextResponse, type NextRequest } from "next/server";
import {
  defaultFitRules,
  demoSizeChart,
  recommendSize
} from "@/lib/fit-engine";
import { measurementSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = measurementSchema.safeParse(payload.measurements ?? payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid measurements",
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

  return NextResponse.json({ recommendation });
}
