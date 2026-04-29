import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { http } from "../api/http.js";
import { EASINGS } from "../utils/animationPreferences.js";

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`fixed right-4 top-20 z-30 w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border ${
        toast.type === "success"
          ? "border-primary/30 bg-surface"
          : "border-red-500/30 bg-surface"
      } shadow-lg px-4 py-3`}
    >
      <div className="font-english font-semibold text-secondary">
        {toast.type === "success" ? "Success" : "Oops"}
      </div>
      <div className="mt-1 font-english text-sm text-secondary/80">
        {toast.message}
      </div>
    </motion.div>
  );
}

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [toast, setToast] = useState(null);

  const emailRegex = useMemo(
    () => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    [],
  );

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(t);
  }, [toast]);

  async function onSubmit(e) {
    e.preventDefault();
    if (isLoading) return;

    setError("");
    setSuccessMessage("");

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email required.");
      setToast({ type: "error", message: "Please enter your email." });
      return;
    }
    if (!emailRegex.test(trimmed)) {
      setError("Invalid email format.");
      setToast({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setStatus("loading");
    try {
      // Next prompt will implement this backend endpoint.
      await http.post("/api/subscribe", { email: trimmed });
      setStatus("success");
      setSuccessMessage("धन्यवाद! आम्ही लवकरच भेटू.");
      setToast({ type: "success", message: "Thanks! 🌱" });
      setEmail("");
    } catch (err) {
      setStatus("idle");
      setToast({
        type: "error",
        message:
          "सध्या सब्सक्रिप्शन उपलब्ध नाही. कृपया नंतर पुन्हा प्रयत्न करा.",
      });
      setError("Could not submit. Please try again later.");
    }
  }

  return (
    <div id="email-signup" className="w-full">
      <div className="mx-auto w-full max-w-[480px] rounded-2xl border border-secondary/20 bg-surface/60 backdrop-blur-xl px-4 py-4 shadow-sm sm:px-5 sm:py-5">
        <div className="sr-only" aria-live="polite">
          {isSuccess ? "Subscription successful." : ""}
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex-1">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>

              <motion.div
                animate={
                  error
                    ? { x: [0, -6, 6, -4, 4, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.35, ease: EASINGS.snappy }}
                className={`field-shell ripple-surface relative flex min-h-12 items-center gap-2 rounded-xl border px-3 py-3 transition-colors ${
                  isSuccess
                    ? "field-shell-success"
                    : error
                      ? "field-shell-error"
                      : ""
                }`}
              >
                <Mail size={18} className="text-secondary/70" aria-hidden />
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "email-error" : undefined}
                  disabled={isSuccess}
                  className="w-full bg-transparent text-[16px] font-english outline-none placeholder:text-secondary/50 disabled:opacity-60"
                  placeholder="तुमचा email / your@email.com"
                />
                {isSuccess ? (
                  <CheckCircle2 size={18} className="text-emerald-500" aria-hidden="true" />
                ) : null}
              </motion.div>

              <AnimatePresence initial={false}>
                {(isSuccess || error) && (
                  <motion.div
                    id="email-error"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className={`mt-2 text-sm font-english ${
                      isSuccess ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {isSuccess ? successMessage : error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="sm:pt-0">
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className="btn-premium-primary ripple-surface inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[16px] font-english font-semibold text-white sm:w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Thanks! 🌱</span>
                  </>
                ) : (
                  <>
                    <span>Notify Me →</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-3 text-xs font-english text-secondary/70 leading-relaxed">
          <div>Launch होताच पहिले update मिळेल</div>
          <div>No spam, unsubscribe anytime</div>
        </div>
      </div>

      <AnimatePresence>
        <Toast toast={toast} />
      </AnimatePresence>
    </div>
  );
}

