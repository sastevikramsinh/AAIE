import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import EmailSignup from "./EmailSignup.jsx";
import { smoothScrollToId } from "../utils/scroll.js";

function useIsMobile(breakpointPx = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [breakpointPx]);

  return isMobile;
}

function CountUp({ to, start }) {
  const reducedMotion = useReducedMotion();
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (reducedMotion) {
      setDisplay(to);
      return;
    }

    const unsubscribe = mv.on("change", (v) => {
      setDisplay(Math.round(v));
    });

    const controls = animate(mv, to, {
      duration: 1,
      easing: [0.22, 1, 0.36, 1],
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [mv, start, to, reducedMotion]);

  return <span>{display}</span>;
}

function HeroBackground({
  enableMesh,
  reducedMotion,
  float1Y,
  float2Y,
  float3Y,
  float4X,
  float4Y,
}) {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Animated gradient mesh */}
      <motion.div
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
        className="absolute inset-0"
      >
        {enableMesh ? (
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="meshBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="48" />
              </filter>
            </defs>

            <g filter="url(#meshBlur)">
              <path
                fill="var(--brand-primary)"
                style={{ opacity: "var(--hero-mesh-opacity)" }}
                d="M 220 230 C 320 120 470 120 560 220 C 650 320 610 460 490 520 C 370 580 240 520 180 410 C 120 300 120 280 220 230 Z"
              >
                <animate
                  attributeName="d"
                  dur="72s"
                  repeatCount="indefinite"
                  values="M 220 230 C 320 120 470 120 560 220 C 650 320 610 460 490 520 C 370 580 240 520 180 410 C 120 300 120 280 220 230 Z;
                          M 200 250 C 300 140 480 130 580 240 C 680 350 620 500 480 550 C 340 600 220 530 170 420 C 120 310 90 320 200 250 Z;
                          M 230 220 C 330 110 470 140 560 230 C 650 320 600 470 500 520 C 400 570 240 520 190 420 C 140 320 130 280 230 220 Z"
                />
              </path>

              <path
                fill="var(--accent)"
                style={{ opacity: "var(--hero-mesh-opacity)" }}
                d="M 770 160 C 850 120 980 160 1030 250 C 1080 340 1030 450 920 500 C 810 550 710 520 670 440 C 630 360 690 200 770 160 Z"
              >
                <animate
                  attributeName="d"
                  dur="78s"
                  repeatCount="indefinite"
                  values="M 770 160 C 850 120 980 160 1030 250 C 1080 340 1030 450 920 500 C 810 550 710 520 670 440 C 630 360 690 200 770 160 Z;
                          M 750 190 C 830 140 960 170 1010 260 C 1060 350 1000 480 900 520 C 800 560 700 510 660 430 C 620 350 670 240 750 190 Z;
                          M 780 150 C 860 120 990 160 1040 250 C 1090 340 1040 460 930 510 C 820 560 720 520 680 440 C 640 360 700 190 780 150 Z"
                />
              </path>

              <path
                fill="var(--hero-soft-pink)"
                style={{ opacity: "var(--hero-mesh-opacity)" }}
                d="M 520 610 C 590 560 700 560 770 620 C 840 680 850 770 760 790 C 670 810 520 780 470 710 C 420 640 450 660 520 610 Z"
              >
                <animate
                  attributeName="d"
                  dur="84s"
                  repeatCount="indefinite"
                  values="M 520 610 C 590 560 700 560 770 620 C 840 680 850 770 760 790 C 670 810 520 780 470 710 C 420 640 450 660 520 610 Z;
                          M 510 590 C 590 530 710 550 780 620 C 850 690 840 790 740 800 C 640 810 520 770 470 700 C 420 630 430 650 510 590 Z;
                          M 530 620 C 600 560 720 570 790 630 C 860 690 860 770 760 790 C 660 810 520 780 470 710 C 420 640 460 670 530 620 Z"
                />
              </path>
            </g>
          </svg>
        ) : (
          // Reduced motion / mobile: static mesh (no SMIL morph animation)
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="meshBlurStatic" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="48" />
              </filter>
            </defs>
            <g filter="url(#meshBlurStatic)">
              <path
                fill="var(--brand-primary)"
                style={{ opacity: "var(--hero-mesh-opacity)" }}
                d="M 220 230 C 320 120 470 120 560 220 C 650 320 610 460 490 520 C 370 580 240 520 180 410 C 120 300 120 280 220 230 Z"
              />
              <path
                fill="var(--accent)"
                style={{ opacity: "var(--hero-mesh-opacity)" }}
                d="M 770 160 C 850 120 980 160 1030 250 C 1080 340 1030 450 920 500 C 810 550 710 520 670 440 C 630 360 690 200 770 160 Z"
              />
              <path
                fill="var(--hero-soft-pink)"
                style={{ opacity: "var(--hero-mesh-opacity)" }}
                d="M 520 610 C 590 560 700 560 770 620 C 840 680 850 770 760 790 C 670 810 520 780 470 710 C 420 640 450 660 520 610 Z"
              />
            </g>
          </svg>
        )}
      </motion.div>

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--grid-dot) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 70%)",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 70%)",
          opacity: 0.9,
        }}
      />

      {/* Floating elements (slow parallax) */}
      {enableMesh ? (
        <>
          <motion.div
            className="absolute left-4 top-[22%] h-16 w-16 rounded-full bg-[var(--brand-primary)]/30 blur-2xl"
            style={{ y: float1Y }}
          />
          <motion.div
            className="absolute right-10 top-[30%] h-20 w-20 bg-[var(--accent)]/30 blur-2xl"
            style={{
              y: float2Y,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
          <motion.div
            className="absolute left-1/3 bottom-[18%] h-14 w-14 rounded-xl bg-[var(--hero-soft-pink)]/25 blur-2xl"
            style={{ y: float3Y }}
          />
          <motion.div
            className="absolute right-2 top-[58%] h-10 w-10 rounded-full bg-[var(--brand-primary)]/20 blur-2xl"
            style={{ x: float4X, y: float4Y }}
          />
        </>
      ) : null}
    </div>
  );
}

function HeroForm() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.05 }}
      className="mt-6 w-full md:mt-8"
    >
      <EmailSignup />
    </motion.div>
  );
}

function HeroStats({ statsRef, startStats }) {
  return (
    <div
      ref={statsRef}
      className="mt-6 w-full max-w-[820px] text-secondary/80"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 1.15 }}
        className="grid grid-cols-1 gap-3 font-english text-sm sm:flex sm:flex-wrap sm:items-center sm:justify-center"
      >
        <div className="flex items-center justify-center gap-1 text-base sm:text-sm">
          <CountUp to={1000} start={startStats} />
          <span>+</span>
          <span>विद्यार्थी प्रतिक्षेत</span>
        </div>
        <span aria-hidden="true" className="hidden sm:inline text-secondary/40">
          •
        </span>
        <div className="flex items-center justify-center gap-1 text-base sm:text-sm">
          <CountUp to={50} start={startStats} />
          <span>+</span>
          <span>शिक्षक आमच्यासोबत</span>
        </div>
        <span aria-hidden="true" className="hidden sm:inline text-secondary/40">
          •
        </span>
        <div className="flex items-center justify-center gap-1 text-base sm:text-sm">
          <CountUp to={10} start={startStats} />
          <span>+</span>
          <span>workshops planned</span>
        </div>
      </motion.div>
    </div>
  );
}

function HeroContent({
  onBadgeClick,
  reducedMotion,
  lineVariants,
}) {
  const badgeVariants = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={onBadgeClick}
        className="inline-flex items-center gap-3 rounded-full border border-secondary/20 bg-surface/60 backdrop-blur px-4 py-2 text-sm font-english text-secondary shadow-[0_0_30px_rgba(220,38,38,0.12)] hover:bg-surface/70 focus:outline-none focus:ring-2 focus:ring-primary/25"
        aria-label="Scroll to email signup"
        initial="hidden"
        animate="show"
        variants={badgeVariants}
      >
        <span className="relative inline-flex h-2.5 w-2.5">
          <motion.span
            className="absolute inset-0 rounded-full bg-primary"
            aria-hidden="true"
            animate={
              reducedMotion
                ? undefined
                : { scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }
            }
            transition={
              reducedMotion
                ? undefined
                : {
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        </span>
        <span className="leading-none">🌱 Now Live · 2026 मध्ये सुरुवात</span>
      </motion.button>

      <header className="mt-6 max-w-[980px] sm:mt-8">
        <h1
          className="font-marathi font-extrabold text-secondary tracking-[-0.02em] leading-[1.8]"
          style={{ textWrap: "balance" }}
        >
          <motion.span
            className="block text-[clamp(1.85rem,10vw,3.5rem)]"
            initial="hidden"
            animate="show"
            variants={lineVariants}
            transition={{ duration: 0.55, delay: 0.55 }}
          >
            आईच्या{" "}
            <span className="bg-gradient-to-r from-primary via-highlight to-primary bg-clip-text text-transparent">
              मायेने
            </span>
          </motion.span>

          <motion.span
            className="block mt-2 font-english text-[clamp(1.25rem,6.5vw,2.5rem)] tracking-[-0.02em] leading-[1.2] sm:mt-3"
            initial="hidden"
            animate="show"
            variants={lineVariants}
            transition={{ duration: 0.55, delay: 0.65 }}
          >
            <span className="bg-gradient-to-r from-primary via-highlight to-primary bg-clip-text text-transparent">
              AI
            </span>{" "}
            Education for Everyone
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mx-auto mt-5 max-w-[600px] sm:mt-6"
        >
          <div className="font-marathi text-secondary text-[clamp(1rem,4.5vw,1.6rem)] leading-[1.8]">
            महाराष्ट्रातील पहिली मराठी AI शिक्षण संस्था
          </div>
          <div className="mt-2 font-english text-secondary/80 text-base leading-[1.6]">
            First Marathi-medium AI education organization in India
          </div>
        </motion.div>
      </header>
    </>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile(768);
  const enableMotion = !reducedMotion && !isMobile;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax offsets for floating shapes.
  const float1Y = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const float2Y = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const float3Y = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const float4X = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const float4Y = useTransform(scrollYProgress, [0, 1], [0, -16]);

  // Animation timeline gating (matches the ~1.5s hero sequence).
  const [sequenceReady, setSequenceReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setSequenceReady(true), 1050);
    return () => window.clearTimeout(t);
  }, []);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const startStats = sequenceReady && statsInView;

  const [indicatorAllowed, setIndicatorAllowed] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setIndicatorAllowed(true), 1250);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!indicatorAllowed) return;
    const onScroll = () => setIndicatorVisible(window.scrollY < 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [indicatorAllowed]);

  function scrollToEmail() {
    smoothScrollToId("email-signup");

    // Focus input (small UX win for conversion).
    window.setTimeout(() => {
      const input = document.querySelector('input[name="email"]');
      input?.focus?.();
    }, 250);
  }

  const lineVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative isolate flex min-h-[auto] items-center overflow-hidden sm:min-h-[90vh] md:min-h-[700px] md:h-[100vh]"
    >
      {/* Background */}
      <HeroBackground
        enableMesh={enableMotion}
        reducedMotion={reducedMotion}
        float1Y={float1Y}
        float2Y={float2Y}
        float3Y={float3Y}
        float4X={float4X}
        float4Y={float4Y}
      />

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 py-20 text-center sm:py-16 md:py-0">
        <HeroContent
          onBadgeClick={scrollToEmail}
          reducedMotion={reducedMotion}
          lineVariants={lineVariants}
        />

        <HeroForm />

        <HeroStats statsRef={statsRef} startStats={startStats} />

        {/* Scroll indicator */}
        <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex justify-center">
          <AnimatePresence>
            {indicatorVisible && !reducedMotion ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center gap-2"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown size={18} className="text-secondary/70" />
                </motion.div>
                <div className="font-english text-xs text-secondary/70">Scroll</div>
              </motion.div>
            ) : indicatorVisible && reducedMotion ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <ArrowDown size={18} className="text-secondary/70" />
                <div className="font-english text-xs text-secondary/70">Scroll</div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

