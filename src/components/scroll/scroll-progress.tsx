"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-14 z-[60] h-0.5 origin-left bg-primary sm:top-16"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}
