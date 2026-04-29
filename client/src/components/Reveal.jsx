import React, { useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useInViewOnce from "../utils/useInViewOnce.js";
import useAnimationPreferences from "../hooks/useAnimationPreferences.js";
import { EASINGS } from "../utils/animationPreferences.js";

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  onceMargin = "-80px",
}) {
  const reducedMotion = useReducedMotion();
  const { effectiveEnabled } = useAnimationPreferences();
  const ref = useRef(null);

  const options = useMemo(
    () => ({
      root: null,
      rootMargin: onceMargin,
      threshold: 0.2,
    }),
    [onceMargin],
  );

  const inView = useInViewOnce(ref, options);

  const animateTo =
    reducedMotion || !effectiveEnabled || inView
      ? { opacity: 1, y: 0, scale: 1 }
      : {};

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, scale: 0.95 }}
      animate={animateTo}
      transition={{ duration: 0.6, delay, ease: EASINGS.gentle }}
    >
      {children}
    </motion.div>
  );
}

