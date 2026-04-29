import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import useAnimationPreferences from "../hooks/useAnimationPreferences.js";

function isMobileViewport() {
  return window.matchMedia("(max-width: 767px)").matches;
}

export default function SmoothScrollProvider({ children }) {
  const { effectiveEnabled } = useAnimationPreferences();

  useEffect(() => {
    if (!effectiveEnabled || isMobileViewport()) {
      window.__aaieLenis?.destroy?.();
      window.__aaieLenis = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      document.body.classList.remove("lenis", "lenis-smooth");
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1,
      easing: (t) => 1 - (1 - t) ** 4, // easeOutQuart
    });

    window.__aaieLenis = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    const onResize = () => {
      if (isMobileViewport()) {
        lenis.destroy();
        window.cancelAnimationFrame(rafId);
        window.__aaieLenis = null;
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.__aaieLenis === lenis) {
        window.__aaieLenis = null;
      }
    };
  }, [effectiveEnabled]);

  return children;
}

