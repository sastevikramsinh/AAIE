import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import AnimationToggle from "./AnimationToggle.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { smoothScrollToId } from "../utils/scroll.js";
import { EASINGS } from "../utils/animationPreferences.js";
import mainLogo from "../assets/aaie-main-logo-transparent.png";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Mission", id: "mission" },
  { label: "Contact", id: "cta" },
];

function scrollToSection(id) {
  smoothScrollToId(id);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-shadow ${
        scrolled
          ? "border-secondary/10 shadow-sm bg-surface/85 backdrop-blur-xl"
          : "border-secondary/5 bg-surface/75 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            scrollToSection("home");
          }}
          className="text-left"
          aria-label="Go to top"
        >
          <div className="flex items-center gap-2">
            <img
              src={mainLogo}
              alt="AAIE Logo"
              className="h-10 w-auto md:h-12"
              loading="eager"
              decoding="async"
            />
          </div>
        </button>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="interactive-link px-3 py-2 rounded-md text-sm text-secondary"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden sm:inline-flex">
            <AnimationToggle />
          </div>
          <ThemeToggle />

          <button
            type="button"
            className="icon-button-premium md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASINGS.gentle }}
            className="fixed inset-0 z-[999] md:hidden"
          >
            <button
              type="button"
              aria-label="Close mobile menu overlay"
              className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: EASINGS.gentle }}
              className="absolute right-0 top-0 z-[1000] h-full w-[88%] max-w-[340px] border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex h-full flex-col px-5 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={mainLogo}
                      alt="AAIE Logo"
                      className="h-10 w-auto"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-6 font-english text-xs font-semibold tracking-[0.16em] text-white/70">
                  NAVIGATION
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        scrollToSection(item.id);
                      }}
                      className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left font-english text-base font-medium text-white transition-all hover:bg-white/10 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 active:bg-red-500/15 active:text-red-400 active:border-red-500/20"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-6">
                  <AnimationToggle />
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

