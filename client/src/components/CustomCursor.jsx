import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAnimationPreferences from "../hooks/useAnimationPreferences.js";
import { EASINGS } from "../utils/animationPreferences.js";

export default function CustomCursor() {
  const { effectiveEnabled } = useAnimationPreferences();
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const onMedia = () => setDesktop(media.matches);
    onMedia();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", onMedia);
      return () => media.removeEventListener("change", onMedia);
    }

    media.addListener(onMedia);
    return () => media.removeListener(onMedia);
  }, []);

  useEffect(() => {
    if (!effectiveEnabled || !desktop) return undefined;

    const onMove = (event) => {
      setVisible(true);
      setPosition({ x: event.clientX, y: event.clientY });
      const interactiveEl = event.target.closest(
        'a, button, input, textarea, select, [role="button"], .card-premium',
      );
      setInteractive(Boolean(interactiveEl));
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    document.body.classList.add("cursor-none");

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.body.classList.remove("cursor-none");
    };
  }, [desktop, effectiveEnabled]);

  if (!effectiveEnabled || !desktop) return null;

  const size = interactive ? 34 : 16;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[100] pointer-events-none mix-blend-difference"
      animate={{
        x: position.x - size / 2,
        y: position.y - size / 2,
        opacity: visible ? 1 : 0,
        width: size,
        height: size,
        scale: pressed ? 0.82 : 1,
      }}
      transition={{
        x: { duration: 0.18, ease: EASINGS.gentle },
        y: { duration: 0.18, ease: EASINGS.gentle },
        width: { duration: 0.16, ease: EASINGS.smooth },
        height: { duration: 0.16, ease: EASINGS.smooth },
        scale: { duration: 0.12, ease: EASINGS.snappy },
        opacity: { duration: 0.12 },
      }}
      style={{
        borderRadius: "999px",
        background: "rgba(255,255,255,0.92)",
      }}
    />
  );
}

