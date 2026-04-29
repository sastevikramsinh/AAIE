import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import Reveal from "./Reveal.jsx";
import SectionDivider from "./SectionDivider.jsx";

function SocialPill({ Icon, label, href, variant = "secondary" }) {
  const base =
    "inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 text-base sm:text-sm font-english font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30";

  const style =
    variant === "primary"
      ? "bg-primary text-white border-primary/30 hover:opacity-95"
      : "bg-surface/60 text-secondary border-secondary/10 hover:border-primary/25 hover:text-primary";

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className={`${base} ${style}`}
    >
      <Icon size={18} aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-secondary/10 bg-surface/60 px-3 py-1 text-xs font-english text-secondary/80">
      {children}
    </span>
  );
}

export default function FounderSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="founder" className="relative">
      <SectionDivider className="opacity-60" />

      <div className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Photo */}
          <div className="lg:col-span-5">
            <Reveal delay={0.05}>
              <motion.div
                whileHover={reducedMotion ? undefined : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="card-premium relative overflow-hidden rounded-3xl border border-secondary/10 bg-surface/60 shadow-sm"
              >
                <div
                  className="aspect-square w-full"
                  role="img"
                  aria-label="Founder photo placeholder"
                >
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 20%, rgba(220,38,38,0.25), transparent 45%), radial-gradient(circle at 80% 30%, rgba(245,158,11,0.18), transparent 45%), radial-gradient(circle at 50% 100%, rgba(244,114,182,0.18), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.15))",
                    }}
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                    <div className="font-english font-black text-secondary text-4xl sm:text-5xl tracking-[-0.04em]">
                      Vikram
                    </div>
                    <div className="mt-2 font-marathi text-secondary/80 text-lg">
                      विक्रमसिंह
                    </div>
                    <div className="mt-1 font-english text-secondary/60 text-sm sm:text-xs">
                      Professional photo (placeholder)
                    </div>
                  </div>
                </div>

                {/* corner badges */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  <div className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-english font-bold text-primary">
                    Founder
                  </div>
                  <div className="rounded-full bg-accent/15 border border-accent/30 px-3 py-1 text-xs font-english font-bold text-secondary">
                    AI Educator
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* Story */}
          <div className="lg:col-span-7">
            <div className="max-w-[620px]">
              <Reveal delay={0.1}>
                <div className="font-english text-xs tracking-[0.18em] text-secondary/70">
                  MEET THE FOUNDER
                </div>
                <h2 className="mt-4 font-marathi text-secondary text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
                  विक्रमसिंह सास्ते
                </h2>
                <div className="mt-2 font-english text-secondary/80 font-semibold">
                  Founder, AAIE | HOD - AIML Department
                </div>

                <div className="mt-6 space-y-4 font-marathi text-secondary/90 leading-[1.8]">
                  <p>
                    गावापासून सुरुवात — ग्रामीण भागातील विद्यार्थ्यांच्या
                    क्षमतेवर विश्वास ठेवला, आणि शिक्षणाची वाट सोपी केली.
                  </p>
                  <p>
                    शिक्षक म्हणून प्रवास — वर्गात शिकवताना नेहमीच “समजेल अशा
                    भाषेत” शिकवण्यावर भर दिला.
                  </p>
                  <p>
                    AAIE चं स्वप्न — AAI (आई) + AI यांची जोड घडवून मराठीत
                    quality AI education सर्वांपर्यंत पोहोचवणं.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Chip>Educator</Chip>
                  <Chip>Poet</Chip>
                  <Chip>Comedian</Chip>
                  <Chip>Engineer</Chip>
                  <Chip>Robotics</Chip>
                </div>

                <div className="mt-7">
                  <div className="font-english text-sm font-bold text-secondary">
                    Trust Indicators
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip>10+ years teaching experience</Chip>
                    <Chip>1000+ students mentored</Chip>
                    <Chip>Robotics projects: 25+</Chip>
                  </div>
                </div>

                <div className="mt-7">
                  <div className="font-english text-sm font-bold text-secondary">
                    Connect
                  </div>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <SocialPill
                      Icon={Linkedin}
                      label="LinkedIn"
                      href="https://www.linkedin.com/"
                      variant="primary"
                    />
                    <SocialPill
                      Icon={Youtube}
                      label="YouTube"
                      href="https://www.youtube.com/"
                    />
                    <SocialPill
                      Icon={Instagram}
                      label="Instagram"
                      href="https://www.instagram.com/"
                    />
                    <SocialPill
                      Icon={Twitter}
                      label="X"
                      href="https://x.com/"
                    />
                    <SocialPill
                      Icon={Mail}
                      label="Email"
                      href="mailto:founder@aaie.org.in"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

