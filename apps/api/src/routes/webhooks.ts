import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { Router } from "express";

export const webhooksRouter = Router();

webhooksRouter.post("/test", (request, response) => {
  response.status(202).json({
    eventId: `evt_${randomUUID()}`,
    accepted: true,
    payload: request.body
  });
});

export function verifyWebhookSignature({
  body,
  signature,
  secret
}: {
  body: string;
  signature: string;
  secret: string;
}) {
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, signatureBuffer);
}
