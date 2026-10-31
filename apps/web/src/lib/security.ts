import "server-only";
import { randomBytes, createHash } from "crypto";

export function createApiKey(prefix: "test" | "live" = "test") {
  const secret = randomBytes(32).toString("base64url");
  return `fitvr_${prefix}_${secret}`;
}

export function hashApiKey(apiKey: string) {
  return createHash("sha256").update(apiKey).digest("hex");
}

export function redactApiKey(apiKey: string) {
  const [vendor, mode] = apiKey.split("_");
  return `${vendor ?? "fitvr"}_${mode ?? "test"}_****${apiKey.slice(-6)}`;
}
