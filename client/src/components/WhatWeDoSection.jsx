import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Cpu,
  Download,
  Handshake,
  MessageCircle,
  Users,
} from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionDivider from "./SectionDivider.jsx";

function FeatureVisual({ kind }) {
  const reducedMotion = useReducedMotion();

  if (kind === "youtube") {
    return (
      <div className="relative h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 grid place-items-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.35),transparent_60%)]"
          animate={reducedMotion ? undefined : { opacity: [0.65, 1, 0.65] }}
          transition={
            reducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <div className="relative z-10 h-10 w-10 rounded-xl bg-surface/60 backdrop-blur-xl border border-secondary/10 grid place-items-center">
          <div
            className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[12px] border-t-transparent border-b-transparent border-l-primary"
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }

  if (kind === "calendar") {
    return (
      <div className="relative h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 overflow-hidden grid place-items-center">
        <div className="h-[64px] w-[54px] rounded-xl border border-secondary/10 bg-surface/60 backdrop-blur-xl p-2 flex flex-col gap-1">
          <div className="h-2 w-full rounded bg-primary/25" />
          <div className="h-2 w-4/5 rounded bg-primary/35" />
          <div className="flex gap-1 mt-auto">
            <div className="h-2 w-1/2 rounded bg-accent/40" />
            <div className="h-2 w-1/2 rounded bg-primary/25" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-14 w-14 rounded-2xl bg-accent/15 border border-accent/30 grid place-items-center overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="h-10 w-10 rounded-2xl bg-accent/20 border border-accent/30"
        animate={reducedMotion ? undefined : { rotate: [0, 12, 0], scale: [0.96, 1, 0.96] }}
        transition={
          reducedMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}

function FeatureCard({ feature, index, layoutClass }) {
  return (
    <div className={layoutClass}>
      <Reveal delay={0.06 * index} onceMargin="-90px" className="h-full">
        <motion.article
          className="card-premium relative h-full rounded-3xl border border-secondary/10 bg-surface/60 backdrop-blur-xl p-6 shadow-sm transition-all overflow-hidden group ripple-surface"
          whileHover={{ y: -3 }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[linear-gradient(120deg,rgba(220,38,38,0.18),rgba(245,158,11,0.12),rgba(244,114,182,0.10))] pointer-events-none" />
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-2xl opacity-70 pointer-events-none" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                <feature.icon size={20} />
              </div>
              <FeatureVisual kind={feature.visual} />
            </div>

            <div className="mt-5">
              <h3 className="font-marathi text-secondary text-xl font-extrabold leading-[1.2] tracking-[-0.01em]">
                {feature.title}
              </h3>
              <p className="mt-2 font-marathi text-secondary/80 leading-[1.7] text-sm">
                {feature.description}
              </p>
            </div>

            <div className="mt-auto pt-5">
              <a
                href="#"
                aria-label={`Learn more about ${feature.title}`}
                className="interactive-link group inline-flex min-h-11 items-center gap-2 font-english font-semibold text-secondary/90 hover:text-primary transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <span className="text-sm">Learn more →</span>
                <span className="inline-flex transition-transform group-hover:translate-x-1" aria-hidden="true">
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </motion.article>
      </Reveal>
    </div>
  );
}

export default function WhatWeDoSection() {
  const features = useMemo(
    () => [
      {
        title: "मराठीत AI Tutorials",
        description: "ChatGPT, Gemini पासून advanced concepts पर्यंत — सगळं मराठीत",
        icon: BookOpen,
        visual: "youtube",
        layout:
          "lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1",
      },
      {
        title: "Live Workshops",
        description: "शिक्षकांसाठी, विद्यार्थ्यांसाठी आणि सामान्य लोकांसाठी",
        icon: Users,
        visual: "calendar",
        layout:
          "lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-1",
      },
      {
        title: "Marathi AI Community",
        description: "WhatsApp + Discord groups",
        icon: MessageCircle,
        visual: "geo",
        layout:
          "lg:col-span-2 lg:row-span-1 lg:col-start-1 lg:row-start-3",
      },
      {
        title: "Real Projects",
        description: "विद्यार्थ्यांचे robots आणि AI projects",
        icon: Cpu,
        visual: "geo",
        layout:
          "lg:col-span-2 lg:row-span-1 lg:col-start-3 lg:row-start-3",
      },
      {
        title: "मोफत Resources",
        description: "Downloadable Marathi AI packs + templates",
        icon: Download,
        visual: "geo",
        layout: "lg:col-span-1 lg:row-span-1 lg:col-start-1 lg:row-start-4",
      },
      {
        title: "भागीदारी (CSR & Schools)",
        description: "CSR & Schools",
        icon: Handshake,
        visual: "geo",
        layout: "lg:col-span-1 lg:row-span-1 lg:col-start-4 lg:row-start-4",
      },
    ],
    [],
  );

  return (
    <section id="offers" className="relative">
      <SectionDivider className="opacity-60" />

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
        <div className="text-center">
          <div className="font-english text-xs tracking-[0.18em] text-secondary/70">
            WHAT WE OFFER
          </div>
          <h2 className="mt-3 font-marathi text-secondary text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.2] tracking-[-0.02em]">
            आम्ही काय देतो
          </h2>
          <p className="mt-3 font-english text-secondary/70">What We Offer</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[184px_92px_92px_92px] lg:auto-rows-[92px]">
          {features.map((f, idx) => (
            <FeatureCard key={f.title} feature={f} index={idx} layoutClass={f.layout} />
          ))}
        </div>
      </div>
    </section>
  );
}

