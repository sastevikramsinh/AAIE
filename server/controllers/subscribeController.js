import { body } from "express-validator";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { clearCache } from "../utils/cache.js";
import { logError } from "../utils/logger.js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const subscribeValidation = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("language").optional().isIn(["mr", "en"]).withMessage("Invalid language"),
];

export const subscribe = asyncHandler(async (req, res) => {
  const { email, language = "en" } = req.body;

  if (!supabase) {
    throw new ApiError(
      500,
      "Waitlist service is not configured. Missing Supabase environment variables.",
    );
  }

  const { error } = await supabase.from("waitlist").insert([
    {
      email,
      language,
    },
  ]);

  if (error) {
    if (error.code === "23505") {
      throw new ApiError(409, "Already registered");
    }
    logError("Supabase waitlist insert failed", error, { email });
    throw new ApiError(500, "Could not save email");
  }

  if (resend) {
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "no-reply@aaie.org.in",
        to: email,
        subject: "🎉 AAIE Waitlist मध्ये स्वागत आहे!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
            <h2>आईच्या मायेने — AI Education for Everyone</h2>
            <p>नमस्कार! 🙏</p>
            <p>तुम्ही AAIE च्या waitlist मध्ये successfully join केले आहे.</p>
            <p>Launch होताच तुम्हाला सर्वात आधी कळवले जाईल.</p>
            <br/>
            <p>— AAIE Team</p>
            <hr/>
            <small>महाराष्ट्रातील पहिली मराठी AI शिक्षण संस्था</small>
          </div>
        `,
      });
    } catch (emailError) {
      // Do not fail subscription if email sending fails.
      logError("Resend welcome email failed", emailError, { email });
    }
  }

  clearCache("public-stats");

  return res.status(200).json({ success: true });
});

