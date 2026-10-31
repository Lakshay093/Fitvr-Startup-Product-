import { NextResponse } from "next/server";
import { createApiKey, hashApiKey, redactApiKey } from "@/lib/security";

export async function GET() {
  return NextResponse.json({
    keys: [
      {
        id: "key_demo_live",
        name: "Production storefront",
        prefix: "fitvr_live",
        lastUsedAt: new Date().toISOString(),
        createdAt: "2026-05-12T10:00:00.000Z"
      }
    ]
  });
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Production key management is not configured in this demo." }, { status: 503 });
  }
  const apiKey = createApiKey("live");

  return NextResponse.json(
    {
      apiKey,
      redacted: redactApiKey(apiKey),
      hashPreview: hashApiKey(apiKey).slice(0, 12)
    },
    { status: 201 }
  );
}
