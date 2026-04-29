import { isAnimationEffectivelyEnabled } from "./animationPreferences.js";

export function smoothScrollToElement(element, options = {}) {
  if (!element) return;

  const lenis = window.__aaieLenis;
  const enabled = isAnimationEffectivelyEnabled();

  if (lenis && enabled) {
    lenis.scrollTo(element, {
      duration: options.duration ?? 1.2,
      immediate: false,
      offset: options.offset ?? 0,
      lock: false,
    });
    return;
  }

  element.scrollIntoView({
    behavior: enabled ? "smooth" : "auto",
    block: options.block ?? "start",
  });
}

export function smoothScrollToId(id, options = {}) {
  const element = document.getElementById(id);
  if (!element) return;
  smoothScrollToElement(element, options);
}

