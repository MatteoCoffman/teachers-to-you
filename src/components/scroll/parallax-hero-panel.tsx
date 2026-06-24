"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { FloatingNotes } from "@/components/motion/floating-notes";
import { Button } from "@/components/ui/button";

type ParallaxHeroPanelProps = {
  onScrollNext: () => void;
};

export function ParallaxHeroPanel({ onScrollNext }: ParallaxHeroPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 48]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  return (
    <section
      ref={sectionRef}
      id="section-hero"
      data-section
      className="home-snap-panel relative flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center overflow-hidden sm:min-h-[calc(100dvh-4rem)]"
    >
      <div className="hero-mesh absolute inset-0" />
      <div className="hero-grain absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-primary/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 bottom-1/4 size-96 rounded-full bg-accent/25 blur-2xl" />
      <FloatingNotes />

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-4 will-change-transform sm:px-6"
        style={prefersReducedMotion ? undefined : { y, opacity }}
      >
        <motion.p
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Austin, Texas
        </motion.p>

        <motion.h1
          className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.05]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          Music lessons that{" "}
          <span className="bg-gradient-to-r from-primary to-amber-700 bg-clip-text text-transparent">
            come to you
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          Teachers To You connects Austin students with working musicians for
          in-person guitar and bass lessons.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button asChild size="lg" className="shadow-lg shadow-primary/25">
            <Link href="/book">Book a Lesson</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/teachers">Meet Our Teachers</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={onScrollNext}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        aria-label="Scroll to next section"
      >
        <span>Scroll</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5" />
        </motion.span>
      </motion.button>
    </section>
  );
}
