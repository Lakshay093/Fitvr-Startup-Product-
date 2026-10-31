import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import pinoHttp from "pino-http";
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

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:3000"],
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

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "fitvr-api" });
});

app.use("/v1/auth", authRouter);
app.use("/v1/products", productsRouter);
app.use("/v1/fit-sessions", fitSessionsRouter);
app.use("/v1/analytics", analyticsRouter);
app.use("/v1/webhooks", webhooksRouter);
app.use(errorHandler);

app.listen(port, () => {
  logger.info({ port }, "Fit.VR API listening");
});
