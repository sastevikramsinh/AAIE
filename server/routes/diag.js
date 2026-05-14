import { Router } from "express";
import { createClient } from "@supabase/supabase-js";

const router = Router();

router.get("/_diag", async (req, res) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  const mongoUri = process.env.MONGODB_URI;

  const envSample = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
    MONGODB_URI: Boolean(process.env.MONGODB_URI),
  };

  let supabaseReachable = null;
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      // lightweight check: attempt a harmless select on waitlist (limit 1). Does not expose data.
      const { error } = await supabase.from("waitlist").select("id").limit(1);
      supabaseReachable = error ? false : true;
    } catch (err) {
      supabaseReachable = false;
    }
  }

  return res.json({
    ok: true,
    envSample,
    supabaseConfigured: Boolean(supabaseUrl && supabaseKey),
    supabaseReachable,
    resendConfigured: Boolean(resendKey),
    mongoConfigured: Boolean(mongoUri && !mongoUri.includes("...")),
  });
});

export default router;
