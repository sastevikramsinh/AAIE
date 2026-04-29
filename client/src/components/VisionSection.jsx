import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import useInViewOnce from "../utils/useInViewOnce.js";
import Reveal from "./Reveal.jsx";
import SectionDivider from "./SectionDivider.jsx";

function CountUp({ to, start, format, duration = 1.1 }) {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    if (reducedMotion) {
      setValue(to);
      return;
    }

    const obj = { v: 0 };
    const controls = animate(obj, { v: to }, {
      duration,
      easing: [0.22, 1, 0.36, 1],
      onUpdate: () => setValue(obj.v),
    });

    return () => controls.stop();
  }, [start, to, duration, reducedMotion]);

  const rendered = useMemo(() => {
    const rounded = Math.round(value);
    return format ? format(rounded) : String(rounded);
  }, [format, value]);

  return <span>{rendered}</span>;
}

export default function VisionSection() {
  const statsRef = useRef(null);
  const statsInView = useInViewOnce(statsRef, { rootMargin: "-80px", threshold: 0.15 });

  const stats = useMemo(
    () => [
      {
        value: 12,
        format: (v) => `${v} कोटी`,
        label: "मराठी बोलणारे लोक",
      },
      {
        value: 85,
        format: (v) => `${v}%`,
        label: "इंग्रजीत AI शिकू न शकणारे विद्यार्थी",
      },
      {
        value: 0,
        format: (v) => `${v}`,
        label: "सध्या गुणवत्ता AI शिक्षण देणाऱ्या संस्था",
      },
    ],
    [],
  );

  return (
    <section id="mission" className="relative">
      <SectionDivider className="opacity-60" />

      {/* background distinct from hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 12%, rgba(220,38,38,0.14), transparent 55%), radial-gradient(circle at 85% 18%, rgba(245,158,11,0.10), transparent 52%), radial-gradient(circle at 50% 95%, rgba(16,185,129,0.10), transparent 55%)",
        }}
      />

      <div className="mx-auto max-w-[1000px] px-4 py-16 md:py-24">
        {/* Stats */}
        <div ref={statsRef} className="grid gap-8 md:grid-cols-3 text-center">
          {stats.map((s, idx) => (
            <Reveal key={s.label} delay={0.05 * idx} onceMargin="-60px">
              <div className="space-y-3">
                <div className="font-english font-black text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.04em]">
                  <span className="bg-gradient-to-r from-primary via-highlight to-accent bg-clip-text text-transparent">
                    <CountUp
                      to={s.value}
                      start={statsInView}
                      format={s.format}
                    />
                  </span>
                </div>
                <div className="font-marathi text-secondary text-base md:text-lg leading-[1.8]">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Problem / Solution */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <Reveal delay={0.05} onceMargin="-70px">
            <div className="h-full rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur p-7">
              <div className="font-english text-xs tracking-[0.18em] text-secondary/70">
                आज (Today)
              </div>
              <h3 className="mt-3 font-marathi text-secondary text-2xl font-extrabold leading-[1.2]">
                AI शिक्षण फक्त इंग्रजीत
              </h3>
              <ul className="mt-5 space-y-3 font-marathi text-secondary/85 leading-[1.8]">
                <li>• जटिल जargon</li>
                <li>• ग्रामीण भागात पोचत नाही</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12} onceMargin="-70px">
            <div className="h-full rounded-3xl border border-emerald-400/20 bg-emerald-500/5 backdrop-blur p-7">
              <div className="font-english text-xs tracking-[0.18em] text-secondary/70">
                उद्या (Tomorrow with AAIE)
              </div>
              <h3 className="mt-3 font-marathi text-secondary text-2xl font-extrabold leading-[1.2]">
                मराठीत सोपं AI शिक्षण
              </h3>
              <ul className="mt-5 space-y-3 font-marathi text-secondary/85 leading-[1.8]">
                <li>• रोजच्या भाषेत</li>
                <li>• गावापासून शहरापर्यंत</li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Quote */}
        <Reveal delay={0.18} onceMargin="-70px">
          <div className="mt-12 rounded-3xl border border-secondary/10 bg-surface/50 backdrop-blur p-8">
            <blockquote className="font-marathi text-secondary text-xl md:text-2xl italic leading-[1.8]">
              “इंग्रजीचा अडथळा कोणाच्या तरी स्वप्नांना थांबवू शकत नाही.”
            </blockquote>
            <div className="mt-5 font-english text-sm text-secondary/70">
              — विक्रमसिंह सास्ते, Founder
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

