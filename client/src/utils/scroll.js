import { isAnimationEffectivelyEnabled } from "./animationPreferences.js";

/** Current vertical scroll (works with Lenis when active). */
export function getWindowScrollY() {
  const lenis = window.__aaieLenis;
  if (lenis && typeof lenis.scroll === "number") {
    return lenis.scroll;
  }
  return window.scrollY;
}

/**
 * Subscribe to scroll updates from window and Lenis (when it mounts).
 * @param {() => void} onScroll
 * @returns {() => void} cleanup
 */
export function subscribeToGlobalScroll(onScroll) {
  const run = () => onScroll();
  run();
  window.addEventListener("scroll", run, { passive: true });

  let lenisAttached = false;
  let attempts = 0;
  const pollId = window.setInterval(() => {
    attempts += 1;
    const lenis = window.__aaieLenis;
    if (lenis?.on && !lenisAttached) {
      lenis.on("scroll", run);
      lenisAttached = true;
      run();
      window.clearInterval(pollId);
    } else if (attempts > 80) {
      window.clearInterval(pollId);
    }
  }, 50);

  return () => {
    window.removeEventListener("scroll", run);
    window.clearInterval(pollId);
    const lenis = window.__aaieLenis;
    if (lenisAttached && typeof lenis?.off === "function") {
      lenis.off("scroll", run);
    }
  };
}

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

