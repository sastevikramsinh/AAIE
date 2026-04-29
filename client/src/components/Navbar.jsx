import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import AnimationToggle from "./AnimationToggle.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { smoothScrollToId } from "../utils/scroll.js";
import { EASINGS } from "../utils/animationPreferences.js";

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
      className={`sticky top-0 z-20 border-b transition-shadow ${
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
          {/* Logo height: 40px desktop, 32px mobile */}
          <div className="flex items-center gap-2">
            <div className="grid place-items-center rounded-full bg-primary text-white font-extrabold h-8 w-8 md:h-10 md:w-10">
              AA
            </div>
            <div className="leading-tight ml-2">
              <div className="font-english font-bold text-secondary text-base md:text-lg">
                AAIE
              </div>
              <div className="hidden sm:block font-marathi text-secondary/80 text-[10px] md:text-xs">
                AI शिक्षण संस्था
              </div>
            </div>
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
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
            className="fixed inset-0 z-30 md:hidden"
          >
            <button
              type="button"
              aria-label="Close mobile menu overlay"
              className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
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
              className="absolute right-0 top-0 h-full w-full max-w-[320px] border-l border-secondary/10 bg-surface/95 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex h-full flex-col px-5 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white font-extrabold">
                      AA
                    </div>
                    <div>
                      <div className="font-english font-bold text-secondary">AAIE</div>
                      <div className="font-marathi text-secondary/70 text-xs">Menu</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="icon-button-premium"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        scrollToSection(item.id);
                      }}
                      className="min-h-11 rounded-xl px-4 py-3 text-left font-english text-base text-secondary hover:bg-surface-elevated"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-3 pt-6">
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

