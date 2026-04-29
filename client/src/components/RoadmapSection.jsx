import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Clock3,
  Loader2,
  MinusCircle,
} from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionDivider from "./SectionDivider.jsx";

function StatusPill({ status }) {
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-english font-bold text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 size={14} aria-hidden="true" />
        Done
      </span>
    );
  }
  if (status === "progress") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/12 px-3 py-1 text-xs font-english font-bold text-amber-600 dark:text-amber-300">
        <Clock3 size={14} aria-hidden="true" />
        In Progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-surface/40 px-3 py-1 text-xs font-english font-bold text-secondary/70">
      <Circle size={14} aria-hidden="true" />
      Upcoming
    </span>
  );
}

export default function RoadmapSection() {
  const reducedMotion = useReducedMotion();
  const items = useMemo(
    () => [
      {
        key: "q2-2026",
        date: "Q2 2026",
        status: "done",
        title: "Website + Community Launch ✅",
        titleMar: "वेबसाइट + कम्युनिटी लॉन्च",
        description: "AAIE च्या पहिल्या कम्युनिटी सर्कलसह अधिकृत सुरुवात.",
      },
      {
        key: "q3-2026",
        date: "Q3 2026",
        status: "progress",
        title: "First 10 Marathi AI Tutorials",
        titleMar: "पहिले 10 मराठी AI Tutorials",
        description: "मार्गदर्शक कंटेंट — समजून, करून, शिकण्यासाठी.",
        progress: 46,
      },
      {
        key: "q4-2026",
        date: "Q4 2026",
        status: "upcoming",
        title: "Free Online Workshops Begin",
        titleMar: "फ्री ऑनलाइन वर्कशॉप्स सुरु",
        description: "शिक्षक, विद्यार्थी आणि पालकांसाठी hands-on सत्रे.",
      },
      {
        key: "q1-2027",
        date: "Q1 2027",
        status: "upcoming",
        title: "AAIE Foundation Registration",
        titleMar: "AAIE Foundation नोंदणी",
        description: "शाश्वत प्रभावासाठी foundation संरचना.",
      },
      {
        key: "q2-2027",
        date: "Q2 2027",
        status: "upcoming",
        title: "First Paid Course Launch",
        titleMar: "पहिला Paid Course लॉन्च",
        description: "मेंटर्ड courses — AI mastery build करण्यासाठी.",
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  useEffect(() => {
    if (!hasMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (!visible) return;
        const idx = Number(visible.target.getAttribute("data-index"));
        if (!Number.isNaN(idx)) setActiveIndex(idx);
      },
      {
        root: null,
        threshold: [0.1, 0.2, 0.35],
        rootMargin: "-25% 0px -55% 0px",
      },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length, hasMounted]);

  const progress = items.length <= 1 ? 1 : activeIndex / (items.length - 1);

  return (
    <section id="roadmap" className="relative">
      <SectionDivider className="opacity-60" />

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
        <div className="text-center">
          <div className="font-english text-xs tracking-[0.18em] text-secondary/70">
            ROADMAP
          </div>
          <h2 className="mt-3 font-marathi text-secondary text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.2] tracking-[-0.02em]">
            What's Coming
          </h2>
          <p className="mt-3 font-english text-secondary/70">
            Milestones that keep AAIE moving forward.
          </p>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="mt-10 lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory px-1">
            {items.map((it, idx) => (
              <div key={it.key} className="snap-start min-w-[86%] sm:min-w-[340px]">
                <Reveal delay={0.05 * idx} onceMargin="-40px">
                  <RoadmapCard item={it} isActive={idx === activeIndex} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: vertical timeline */}
        <div className="mt-10 hidden lg:block relative">
          <div className="absolute left-[26px] top-1 bottom-1 w-px bg-secondary/10" />
          <motion.div
            className="absolute left-[26px] top-1 w-px bg-primary"
            style={{ height: "calc(100% - 8px)", transformOrigin: "top" }}
            animate={
              reducedMotion
                ? undefined
                : { scaleY: Math.max(0.08, progress) }
            }
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          />

          <div className="space-y-6">
            {items.map((it, idx) => (
              <div
                key={it.key}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                data-index={idx}
                className="relative"
              >
                <div className="grid grid-cols-[62px_1fr] gap-6 items-start">
                  <div className="relative">
                    <div className="absolute left-[14px] top-2">
                      <div
                        className={`grid h-7 w-7 place-items-center rounded-full border ${
                          idx <= activeIndex
                            ? "border-primary/30 bg-primary/15 text-primary"
                            : "border-secondary/10 bg-surface/50 text-secondary/50"
                        }`}
                        aria-hidden="true"
                      >
                        {it.status === "done" ? (
                          <CheckCircle2 size={16} />
                        ) : it.status === "progress" ? (
                          <Clock3 size={16} />
                        ) : (
                          <MinusCircle size={16} />
                        )}
                      </div>
                    </div>
                    <div className="h-full w-full" aria-hidden="true" />
                  </div>

                  <Reveal delay={0.05 * idx} onceMargin="-80px">
                    <RoadmapCard item={it} isActive={idx === activeIndex} />
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoadmapCard({ item, isActive }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      className={`card-premium ripple-surface relative rounded-3xl border border-secondary/10 bg-surface/60 backdrop-blur-xl p-6 shadow-sm transition-all ${
        isActive ? "ring-2 ring-primary/25 border-primary/25" : ""
      }`}
      whileHover={reducedMotion ? undefined : { y: -3 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-full border border-secondary/10 bg-surface/70 px-4 py-2 text-xs font-english font-bold text-secondary/70">
          {item.date}
        </div>
        <StatusPill status={item.status} />
      </div>

      <h3 className="mt-4 font-marathi text-secondary text-2xl font-extrabold leading-[1.2] tracking-[-0.02em]">
        {item.titleMar}
      </h3>
      <div className="mt-2 font-english text-secondary/70 font-semibold">
        {item.title}
      </div>
      <p className="mt-4 font-marathi text-secondary/90 leading-[1.8]">
        {item.description}
      </p>

      {item.status === "progress" && typeof item.progress === "number" && (
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-english text-secondary/70">
            <span>Progress</span>
            <span>{item.progress}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-secondary/10 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )}
    </motion.article>
  );
}

