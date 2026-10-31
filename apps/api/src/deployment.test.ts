import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  vi.stubEnv("CORS_ORIGIN", " https://fitvr-frontend.vercel.app\r\n");
  const { default: app } = await import("./index.js");
  server = await new Promise<Server>((resolve) => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(async () => {
  vi.unstubAllEnvs();
  await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
});

describe("deployed demo API", () => {
  it("allows the configured frontend after trimming environment whitespace", async () => {
    const response = await fetch(`${baseUrl}/v1/fit-sessions`, {
      method: "OPTIONS",
      headers: { Origin: "https://fitvr-frontend.vercel.app", "Access-Control-Request-Method": "POST" }
    });
    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-origin")).toBe("https://fitvr-frontend.vercel.app");
    const otherOrigin = await fetch(`${baseUrl}/health`, { headers: { Origin: "https://unrelated.example" } });
    expect(otherOrigin.headers.get("access-control-allow-origin")).toBeNull();
  });

  it("serves health and products without database credentials", async () => {
    const health = await fetch(`${baseUrl}/health`);
    expect(health.status).toBe(200);
    expect(await health.json()).toMatchObject({ ok: true, mode: "demo", storage: "stateless" });
    const products = await fetch(`${baseUrl}/v1/products`);
    expect(products.status).toBe(200);
    expect((await products.json()).products.length).toBeGreaterThan(0);
  });

  it("never issues development login tokens in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    try {
      const response = await fetch(`${baseUrl}/v1/auth/brand-login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "demo@example.test" }) });
      expect(response.status).toBe(503);
      expect(await response.json()).not.toHaveProperty("token");
    } finally {
      vi.unstubAllEnvs();
    }
  });
});
