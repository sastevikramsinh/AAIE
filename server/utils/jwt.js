import jwt from "jsonwebtoken";

export function signJwt(payload, { expiresIn = "7d" } = {}) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");

  return jwt.sign(payload, secret, { expiresIn });
}

