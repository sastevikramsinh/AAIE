import { body } from "express-validator";
import { Subscriber } from "../models/Subscriber.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { sendEmail } from "../services/emailService.js";
import { getWelcomeTemplate } from "../services/emailTemplates.js";
import { clearCache } from "../utils/cache.js";

export const subscribeValidation = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("source")
    .optional()
    .isIn(["hero", "footer", "cta"])
    .withMessage("Invalid source"),
  body("preferences.language").optional().isString(),
  body("preferences.topics").optional().isArray(),
];

export const subscribe = asyncHandler(async (req, res) => {
  const { email, source = "hero", preferences } = req.body;

  const existing = await Subscriber.findOne({ email }).lean();
  if (existing && !existing.unsubscribed) {
    throw new ApiError(409, "This email is already subscribed.");
  }

  const subscriber = await Subscriber.findOneAndUpdate(
    { email },
    {
      email,
      source,
      preferences: {
        language: preferences?.language || "mr",
        topics: preferences?.topics || [],
      },
      subscribedAt: new Date(),
      unsubscribed: false,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  const welcome = getWelcomeTemplate({ email: subscriber.email });
  await sendEmail({ to: subscriber.email, subject: welcome.subject, html: welcome.html });

  clearCache("public-stats");

  return res.status(201).json({
    message: "Subscription successful.",
    data: { id: subscriber._id, email: subscriber.email, source: subscriber.source },
  });
});

