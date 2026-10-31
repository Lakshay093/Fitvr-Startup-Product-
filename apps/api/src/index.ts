import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import {
  contentSecurityPolicy,
  crossOriginOpenerPolicy,
  crossOriginResourcePolicy,
  originAgentCluster,
  referrerPolicy,
  strictTransportSecurity,
  xContentTypeOptions,
  xDnsPrefetchControl,
  xDownloadOptions,
  xFrameOptions,
  xPermittedCrossDomainPolicies,
  xPoweredBy,
  xXssProtection
} from "helmet";
import { pinoHttp } from "pino-http";
import { analyticsRouter } from "./routes/analytics.js";
import { authRouter } from "./routes/auth.js";
import { fitSessionsRouter } from "./routes/fit-sessions.js";
import { productsRouter } from "./routes/products.js";
import { webhooksRouter } from "./routes/webhooks.js";
import { errorHandler } from "./middleware/error.js";
import { requestTenant } from "./middleware/request-tenant.js";
import { logger } from "./lib/logger.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

// Vercel terminates TLS and forwards the client IP through its proxy.
if (process.env.VERCEL === "1") app.set("trust proxy", 1);

// Named exports avoid default-import interop differences in the serverless compiler.
// These are the same middleware enabled by Helmet's default configuration.
app.use(
  contentSecurityPolicy(), crossOriginOpenerPolicy(), crossOriginResourcePolicy(),
  originAgentCluster(), referrerPolicy(), strictTransportSecurity(),
  xContentTypeOptions(), xDnsPrefetchControl(), xDownloadOptions(),
  xFrameOptions(), xPermittedCrossDomainPolicies(), xPoweredBy(), xXssProtection()
);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",").map(origin => origin.trim()).filter(Boolean) ?? ["http://localhost:3000"],
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 60_000,
    limit: 180,
    standardHeaders: true,
    legacyHeaders: false
  })
);
app.use(pinoHttp({ logger }));
app.use(requestTenant);

app.get("/", (_request, response) => {
  response.json({ service: "fitvr-api", mode: "demo", health: "/health", endpoints: ["/v1/products", "/v1/fit-sessions", "/v1/analytics"] });
});

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "fitvr-api", mode: "demo", storage: "stateless" });
});

app.use("/v1/auth", authRouter);
app.use("/v1/products", productsRouter);
app.use("/v1/fit-sessions", fitSessionsRouter);
app.use("/v1/analytics", analyticsRouter);
app.use("/v1/webhooks", webhooksRouter);
app.use(errorHandler);

if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info({ port }, "Fit.VR API listening");
  });
}

export default app;
