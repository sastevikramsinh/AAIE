import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionDivider from "./SectionDivider.jsx";
import { smoothScrollToId } from "../utils/scroll.js";

function scrollToId(id) {
  smoothScrollToId(id);
}

export default function CTASection() {
  const reducedMotion = useReducedMotion();
  const particles = useMemo(
    () => [
      { left: "10%", top: "25%", size: 14, kind: "circle", delay: 0.0 },
      { left: "25%", top: "60%", size: 10, kind: "triangle", delay: 0.35 },
      { left: "52%", top: "30%", size: 18, kind: "circle", delay: 0.15 },
      { left: "72%", top: "65%", size: 12, kind: "triangle", delay: 0.55 },
      { left: "86%", top: "40%", size: 10, kind: "circle", delay: 0.25 },
      { left: "40%", top: "78%", size: 9, kind: "circle", delay: 0.5 },
    ],
    [],
  );

  return (
    <section id="cta" className="relative overflow-hidden">
      <SectionDivider className="opacity-60" />

      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--brand-primary), var(--accent))",
        }}
      />

      {/* geometric pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(circle at 50% 30%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 30%, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-10 pointer-events-none"
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-marathi font-black text-white text-[120px] leading-none tracking-[-0.06em]">
          AAIE
        </div>
        <div className="absolute bottom-0 left-1/4 font-marathi font-black text-white text-[64px] leading-none tracking-[-0.06em] opacity-70">
          AAIE
        </div>
      </div>

      {/* floating particles (desktop) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none -z-10">
        {particles.map((p, i) => {
          const common =
            "absolute bg-white/18 blur-[1px] border border-white/20";
          const baseClass =
            p.kind === "circle"
              ? `${common} rounded-full`
              : `${common} rounded-[6px]`;

          return (
            <motion.div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              aria-hidden="true"
              className={baseClass}
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                clipPath: p.kind === "triangle"
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : undefined,
              }}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      y: [0, -18, 0],
                      x: [0, 10, 0],
                      opacity: [0.35, 0.75, 0.35],
                    }
              }
              transition={
                reducedMotion
                  ? undefined
                  : {
                      duration: 6.5 + i * 0.7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: p.delay,
                    }
              }
            />
          );
        })}
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 py-16 md:py-24">
        <div className="text-center">
          <Reveal delay={0.05}>
            <h2 className="font-marathi font-extrabold text-white text-[clamp(2.1rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.02em]">
              आजच आमच्यासोबत जोडा
            </h2>
            <p className="mt-4 font-english text-white/85 text-base md:text-lg leading-relaxed">
              Join the Marathi AI revolution
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => scrollToId("email-signup")}
                className="btn-premium-secondary ripple-surface inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-english font-semibold text-primary"
              >
                Subscribe Newsletter <ArrowRight size={18} />
              </button>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="btn-premium-ghost ripple-surface inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-transparent px-6 py-3 font-english font-semibold text-white/95"
              >
                Follow on LinkedIn <Linkedin size={18} />
              </a>
            </div>

            <div className="mt-5 font-english text-white/85 text-sm">
              Free forever. No spam. Made with ❤️ in Pune.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

