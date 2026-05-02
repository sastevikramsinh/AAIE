import React from "react";
import { Check } from "lucide-react";

/**
 * Minimal "What's Coming" roadmap — single milestone, flat nonprofit / edu-tech aesthetic.
 */
export default function RoadmapSection() {
  return (
    <section
      id="roadmap"
      className="border-t border-neutral-200/80 bg-neutral-50 dark:border-white/10 dark:bg-[#0c0c0c]"
      aria-labelledby="whats-coming-heading"
    >
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-16 text-center md:px-6 md:pb-28 md:pt-24">
        <p className="font-english text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
          ROADMAP
        </p>
        <h2
          id="whats-coming-heading"
          className="mt-5 font-serif text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          What&apos;s Coming
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-english text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
          Milestones that keep AAIE moving forward.
        </p>

        <div className="mx-auto mt-14 max-w-xl text-left md:mt-16">
          <div className="flex gap-5 md:gap-6">
            {/* Timeline dot */}
            <div className="flex shrink-0 flex-col items-center pt-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
            </div>

            <article className="min-w-0 flex-1 rounded-2xl border border-sky-200 bg-white px-6 py-8 dark:border-sky-800/70 dark:bg-neutral-950 md:px-10 md:py-10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 font-english text-xs font-medium text-neutral-600 dark:bg-neutral-800/80 dark:text-neutral-300">
                  Q2 2026
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-english text-xs font-semibold text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <Check
                    className="h-3.5 w-3.5 shrink-0 stroke-[2.5]"
                    aria-hidden="true"
                  />
                  Done
                </span>
              </div>

              <h3 className="mt-8 font-marathi text-xl font-semibold leading-snug text-neutral-900 dark:text-neutral-50 md:text-2xl">
                वेबसाइट + कम्युनिटी लॉन्च
              </h3>
              <p className="mt-2 font-english text-sm font-medium text-neutral-700 dark:text-neutral-300 md:text-base">
                Website + Community Launch ✅
              </p>
              <p className="mt-5 font-marathi text-[15px] leading-[1.75] text-neutral-600 dark:text-neutral-400 md:text-base md:leading-[1.8]">
                AAIE च्या पहिल्या कम्युनिटी सर्कलसह अधिकृत सुरुवात.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
