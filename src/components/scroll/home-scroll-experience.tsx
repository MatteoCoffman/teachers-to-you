"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import { CtaPanel } from "@/components/scroll/cta-panel";
import { FeaturesPanel } from "@/components/scroll/features-panel";
import { ParallaxHeroPanel } from "@/components/scroll/parallax-hero-panel";
import { PricingPanel } from "@/components/scroll/pricing-panel";
import { ScrollProgress } from "@/components/scroll/scroll-progress";
import { SectionDots } from "@/components/scroll/section-dots";
import { TeachersScrollPanel } from "@/components/scroll/teachers-scroll-panel";
import type { TeacherPublic } from "@/lib/teachers";

const SECTIONS = [
  { id: "section-hero", label: "Home" },
  { id: "section-features", label: "Why us" },
  { id: "section-teachers", label: "Teachers" },
  { id: "section-pricing", label: "Pricing" },
  { id: "section-cta", label: "Book" },
];

type HomeScrollExperienceProps = {
  teachers: TeacherPublic[];
};

export function HomeScrollExperience({ teachers }: HomeScrollExperienceProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    document.documentElement.classList.add("home-snap-scroll");
    return () => document.documentElement.classList.remove("home-snap-scroll");
  }, [prefersReducedMotion]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;

        const id = visible[0].target.id;
        const index = SECTIONS.findIndex((s) => s.id === id);
        if (index >= 0) {
          setActiveIndex((prev) => (prev === index ? prev : index));
        }
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback(
    (index: number) => {
      const target = document.querySelector(`#${SECTIONS[index].id}`);
      target?.scrollIntoView({ behavior: "auto" });
    },
    [],
  );

  const scrollToNext = useCallback(() => {
    scrollToSection(Math.min(activeIndex + 1, SECTIONS.length - 1));
  }, [activeIndex, scrollToSection]);

  return (
    <>
      <ScrollProgress />
      <SectionDots
        sections={SECTIONS}
        activeIndex={activeIndex}
        onSelect={scrollToSection}
      />

      <ParallaxHeroPanel onScrollNext={scrollToNext} />
      <FeaturesPanel />
      <TeachersScrollPanel teachers={teachers} />
      <PricingPanel />
      <CtaPanel />
    </>
  );
}
