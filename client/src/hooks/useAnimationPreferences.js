import { useEffect, useState } from "react";
import {
  ANIMATION_EVENT_NAME,
  getStoredAnimationPreference,
  prefersReducedMotion,
  setStoredAnimationPreference,
} from "../utils/animationPreferences.js";

export default function useAnimationPreferences() {
  const [enabled, setEnabled] = useState(() => getStoredAnimationPreference());
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    const onPreferenceEvent = (event) => {
      const next = event?.detail?.enabled;
      if (typeof next === "boolean") setEnabled(next);
      else setEnabled(getStoredAnimationPreference());
    };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMediaChange = () => setReducedMotion(media.matches);

    window.addEventListener(ANIMATION_EVENT_NAME, onPreferenceEvent);
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onMediaChange);
    } else {
      media.addListener(onMediaChange);
    }

    return () => {
      window.removeEventListener(ANIMATION_EVENT_NAME, onPreferenceEvent);
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", onMediaChange);
      } else {
        media.removeListener(onMediaChange);
      }
    };
  }, []);

  return {
    enabled,
    reducedMotion,
    effectiveEnabled: enabled && !reducedMotion,
    setEnabled: setStoredAnimationPreference,
  };
}

