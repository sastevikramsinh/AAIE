import React, { useCallback, useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { getWindowScrollY, subscribeToGlobalScroll } from "../utils/scroll.js";

const SCROLL_THRESHOLD_PX = 300;

/**
 * Fixed floating control — appears after scrolling down, smooth-scrolls to top.
 */
export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(getWindowScrollY() >= SCROLL_THRESHOLD_PX);
    };
    return subscribeToGlobalScroll(onScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className={`fixed z-40 transition-[opacity,transform] duration-200 ease-in-out ${
        visible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-2"
      }`}
      style={{ bottom: 32, right: 24 }}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-neutral-900 text-white shadow-none outline-none transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-white/40 active:scale-95 dark:bg-neutral-950 dark:hover:bg-neutral-800"
      >
        <ChevronUp size={22} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </div>
  );
}
