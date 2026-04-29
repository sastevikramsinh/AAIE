import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal.jsx";
import SectionDivider from "./SectionDivider.jsx";

function Eyebrow({ children }) {
  return (
    <div className="font-english text-xs tracking-[0.18em] text-secondary/70">
      {children}
    </div>
  );
}

function TransformationIllustration() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[520px] sm:h-[420px] lg:h-[520px]">
      {/* subtle floating wrapper */}
      <motion.div
        className="absolute inset-0"
        animate={
          reducedMotion ? undefined : { y: [0, -10, 0], x: [0, 6, 0] }
        }
        transition={
          reducedMotion ? undefined : { duration: 18, ease: "easeInOut", repeat: Infinity }
        }
      />

      <div className="absolute inset-0 rounded-3xl border border-secondary/10 bg-surface/40 backdrop-blur-xl shadow-sm overflow-hidden">
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(220,38,38,0.22), transparent 48%), radial-gradient(circle at 80% 30%, rgba(245,158,11,0.20), transparent 40%), radial-gradient(circle at 40% 80%, rgba(244,114,182,0.18), transparent 52%)" }} />

        {/* Cards stack */}
        <div className="relative h-full w-full">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              x: -18,
              y: -10,
              rotate: -6,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="absolute left-[4%] top-[10%] w-[78%] max-w-[320px] rounded-3xl border border-secondary/10 bg-surface/60 backdrop-blur-xl p-4 shadow-sm sm:left-[10%] sm:top-[16%] sm:w-[70%] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <Eyebrow>AAI</Eyebrow>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-english text-primary font-semibold">
                आई
              </div>
            </div>
            <div className="mt-6">
              <div className="font-english font-black text-[44px] leading-none tracking-[-0.04em] text-secondary sm:text-[64px]">
                AAI
              </div>
              <div className="mt-2 font-marathi text-secondary/80 text-base leading-[1.8]">
                आई आपल्याला बोट धरून शिकवते.
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-[43%] -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="grid place-items-center rounded-full border border-secondary/10 bg-surface/60 backdrop-blur-xl w-14 h-14 shadow-sm">
              <span className="font-english font-black text-primary text-2xl">→</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              x: 18,
              y: -6,
              rotate: 6,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="absolute right-[2%] top-[44%] w-[82%] max-w-[330px] rounded-3xl border border-secondary/10 bg-surface/60 backdrop-blur-xl p-4 shadow-sm sm:right-[8%] sm:top-[40%] sm:w-[72%] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <Eyebrow>AI</Eyebrow>
              <div className="rounded-full bg-accent/20 px-3 py-1 text-xs font-english text-secondary font-semibold">
                Education
              </div>
            </div>
            <div className="mt-6">
              <div className="font-english font-black text-[44px] leading-none tracking-[-0.04em] text-secondary sm:text-[64px]">
                AI
              </div>
              <div className="mt-2 font-marathi text-secondary/80 text-base leading-[1.8]">
                AI तुमच्या भाषेत समजेल.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative">
      <SectionDivider className="opacity-60" />

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal delay={0.05} className="inline-block">
              <Eyebrow>OUR STORY</Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-4 font-marathi text-secondary text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.2] tracking-[-0.02em]">
                AAIE — एक नाव, दोन अर्थ
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 font-english text-secondary/80 text-base md:text-lg">
                AAI (आई) + AI = AAIE
              </p>
            </Reveal>

            <div className="mt-6 space-y-5">
              <Reveal delay={0.22}>
                <p className="font-marathi text-secondary/90 leading-[1.8] text-base">
                  कथा — आई आपल्याला बोट धरून शिकवते. प्रत्येक पाऊल
                  सावरते. तसंच AAIE आपल्याला AI शिकायला बोट धरून नेईल.
                </p>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="rounded-2xl border border-secondary/10 bg-surface/50 backdrop-blur-xl p-5">
                  <div className="font-marathi font-bold text-secondary leading-[1.8]">
                    मिशन
                  </div>
                  <p className="mt-1 font-marathi text-secondary/90 leading-[1.8]">
                    मराठीत AI शिक्षण सोपं करून, गावापासून शहरापर्यंत
                    आत्मविश्वास वाढवणं.
                  </p>
                  <p className="mt-2 font-english text-secondary/80 leading-[1.6] text-sm md:text-base">
                    Build practical, Marathi-first AI education so anyone can learn
                    AI in their own language.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <TransformationIllustration />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

