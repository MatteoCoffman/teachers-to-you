"use client";

import { motion, useReducedMotion } from "motion/react";

type SectionDotsProps = {
  sections: { id: string; label: string }[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function SectionDots({
  sections,
  activeIndex,
  onSelect,
}: SectionDotsProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <nav
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Page sections"
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          onClick={() => onSelect(index)}
          className="group flex items-center justify-end gap-2"
          aria-label={`Go to ${section.label}`}
          aria-current={activeIndex === index ? "true" : undefined}
        >
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium transition-all duration-300 ${
              activeIndex === index
                ? "translate-x-0 opacity-100 text-foreground"
                : "translate-x-2 opacity-0 text-muted-foreground group-hover:translate-x-0 group-hover:opacity-100"
            }`}
          >
            {section.label}
          </span>
          <motion.span
            className="block size-2.5 rounded-full border-2 border-primary"
            animate={{
              scale: activeIndex === index ? 1.35 : 1,
              backgroundColor:
                activeIndex === index
                  ? "oklch(0.55 0.14 65)"
                  : "transparent",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
        </button>
      ))}
    </nav>
  );
}
