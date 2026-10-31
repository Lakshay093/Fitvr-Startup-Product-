import { randomUUID } from "crypto";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const productId = String(payload.productId ?? "");

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 422 });
  }

  return NextResponse.json(
    {
      sessionToken: `fitvr_widget_${randomUUID()}`,
      productId,
      iframeUrl: `/try-on?productId=${encodeURIComponent(productId)}`,
      expiresIn: 900
    },
    { status: 201 }
  );
}
