import rateLimit from "express-rate-limit";

function createLimiter(windowMs, max, message) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  });
}

export const generalApiLimiter = createLimiter(
  15 * 60 * 1000,
  200,
  "Too many requests, please try again later.",
);

export const subscribeLimiter = createLimiter(
  15 * 60 * 1000,
  20,
  "Too many subscription attempts. Please wait and try again.",
);

export const contactLimiter = createLimiter(
  15 * 60 * 1000,
  10,
  "Too many contact submissions. Please try again later.",
);

export const workshopRegisterLimiter = createLimiter(
  15 * 60 * 1000,
  20,
  "Too many workshop registration attempts. Please try again later.",
);

