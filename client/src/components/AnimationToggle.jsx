import React from "react";
import { motion } from "framer-motion";
import { Sparkles, SparklesIcon } from "lucide-react";
import useAnimationPreferences from "../hooks/useAnimationPreferences.js";
import { EASINGS } from "../utils/animationPreferences.js";

export default function AnimationToggle() {
  const { enabled, reducedMotion, setEnabled } = useAnimationPreferences();

  const tooltip = reducedMotion
    ? "Animations follow reduced-motion preference"
    : enabled
      ? "Animations enabled"
      : "Animations disabled";

  return (
    <button
      type="button"
      onClick={() => setEnabled(!enabled)}
      className="icon-button-premium relative overflow-hidden"
      aria-label={`${enabled ? "Disable" : "Enable"} animations`}
      title={tooltip}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-xl bg-primary/10"
        initial={false}
        animate={{
          scale: enabled ? 1 : 0.3,
          opacity: enabled ? 0.9 : 0,
        }}
        transition={{ duration: 0.28, ease: EASINGS.gentle }}
      />
      <motion.span
        className="relative z-10 inline-flex"
        animate={{
          rotate: enabled ? 0 : 180,
          scale: enabled ? 1 : 0.92,
        }}
        transition={{ duration: 0.28, ease: EASINGS.gentle }}
      >
        {enabled ? <Sparkles size={18} /> : <SparklesIcon size={18} />}
      </motion.span>
    </button>
  );
}

