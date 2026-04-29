export const ANIMATION_STORAGE_KEY = "aaie-animations-enabled";
export const ANIMATION_EVENT_NAME = "aaie:animation-preference";

export const EASINGS = {
  smooth: [0.4, 0, 0.2, 1],
  snappy: [0.4, 0, 0, 1],
  bouncy: [0.68, -0.55, 0.265, 1.55],
  gentle: [0.16, 1, 0.3, 1],
};

export function getStoredAnimationPreference() {
  if (typeof window === "undefined") return true;
  try {
    const raw = localStorage.getItem(ANIMATION_STORAGE_KEY);
    return raw === null ? true : raw === "true";
  } catch {
    return true;
  }
}

export function setStoredAnimationPreference(enabled) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ANIMATION_STORAGE_KEY, String(enabled));
  } catch {
    // ignore
  }

  window.dispatchEvent(
    new CustomEvent(ANIMATION_EVENT_NAME, {
      detail: { enabled },
    }),
  );
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function isAnimationEffectivelyEnabled() {
  return getStoredAnimationPreference() && !prefersReducedMotion();
}

