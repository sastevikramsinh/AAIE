import React, { Suspense, lazy } from "react";
import Hero from "../components/Hero.jsx";

const AboutSection = lazy(() => import("../components/AboutSection.jsx"));
const WhatWeDoSection = lazy(() => import("../components/WhatWeDoSection.jsx"));
const VisionSection = lazy(() => import("../components/VisionSection.jsx"));
const FounderSection = lazy(() => import("../components/FounderSection.jsx"));
const RoadmapSection = lazy(() => import("../components/RoadmapSection.jsx"));
const CTASection = lazy(() => import("../components/CTASection.jsx"));
const Footer = lazy(() => import("../components/Footer.jsx"));

function SectionSkeleton({ minHeight = 280 }) {
  return (
    <div
      aria-hidden="true"
      style={{ minHeight }}
      className="mx-auto max-w-[1200px] px-4 py-10"
    >
      <div className="h-6 w-40 rounded-xl bg-secondary/10" />
      <div className="mt-4 h-4 w-72 rounded-xl bg-secondary/10" />
      <div className="mt-8 h-40 w-full rounded-3xl bg-secondary/10" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionSkeleton minHeight={360} />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={420} />}>
        <WhatWeDoSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={420} />}>
        <VisionSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={420} />}>
        <FounderSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={420} />}>
        <RoadmapSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={320} />}>
        <CTASection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton minHeight={420} />}>
        <Footer />
      </Suspense>
    </>
  );
}

