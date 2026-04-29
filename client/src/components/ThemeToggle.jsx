import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import {
  applyTheme,
  getSystemThemePreference,
  getStoredThemePreference,
  resolveTheme,
  setStoredThemePreference,
} from "../utils/theme.js";
import { EASINGS } from "../utils/animationPreferences.js";

const modes = ["light", "dark", "system"];

function modeLabel(mode) {
  if (mode === "system") return "System";
  return mode === "dark" ? "Dark" : "Light";
}

function nextMode(current) {
  const idx = modes.indexOf(current);
  return modes[(idx + 1) % modes.length];
}

export default function ThemeToggle() {
  const [preference, setPreference] = useState(() => getStoredThemePreference());
  const [rippling, setRippling] = useState(false);
  const resolvedTheme = useMemo(
    () => resolveTheme(preference),
    [preference],
  );

  useEffect(() => {
    // Apply resolved theme whenever preference changes.
    applyTheme(preference);

    // If user selected "system", keep in sync with OS changes.
    if (preference !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");

    // Safari fallback
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [preference]);

  function cycleTheme() {
    const next = nextMode(preference);
    setRippling(true);
    setPreference(next);
    setStoredThemePreference(next);
    window.setTimeout(() => setRippling(false), 320);
  }

  const tooltip = useMemo(() => {
    if (preference === "system") {
      const sys = getSystemThemePreference();
      return `Theme: ${modeLabel(preference)} (prefers ${sys})`;
    }
    return `Theme: ${modeLabel(preference)}`;
  }, [preference]);

  const ariaLabel = `Toggle theme. Current mode: ${modeLabel(preference)}. Click to change.`;

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="icon-button-premium relative overflow-hidden"
      aria-label={ariaLabel}
      title={tooltip}
    >
      <span className="sr-only">{tooltip}</span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-xl bg-primary/12"
        animate={{
          scale: rippling ? 2.2 : 0,
          opacity: rippling ? 0.35 : 0,
        }}
        transition={{ duration: 0.3, ease: EASINGS.gentle }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === "dark" ? (
          <motion.span
            key="dark"
            initial={{ opacity: 0, rotate: -15, y: 4 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, rotate: 15, y: -4 }}
            transition={{ duration: 0.22, ease: EASINGS.gentle }}
            aria-hidden="true"
            className="relative z-10"
          >
            <Moon size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="light"
            initial={{ opacity: 0, rotate: 15, y: 4 }}
            animate={{ opacity: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, rotate: -15, y: -4 }}
            transition={{ duration: 0.22, ease: EASINGS.gentle }}
            aria-hidden="true"
            className="relative z-10"
          >
            <Sun size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

