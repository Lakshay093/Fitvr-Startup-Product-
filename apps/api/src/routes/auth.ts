import { SignJWT } from "jose";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/brand-login", async (request, response) => {
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
