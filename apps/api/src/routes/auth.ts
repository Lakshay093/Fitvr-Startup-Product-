import { SignJWT } from "jose";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/brand-login", async (request, response) => {
  if (process.env.NODE_ENV === "production") {
    response.status(503).json({ error: "Demo login is disabled on the public deployment. Production authentication is not configured." });
    return;
  }
  const email = String(request.body.email ?? "founder@apex.test");
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET ?? "development-fitvr-secret-change-me"
  );

  const token = await new SignJWT({
    email,
    brandId: request.tenant?.brandId,
    role: "brand_admin"
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret);

  response.json({ token });
});
