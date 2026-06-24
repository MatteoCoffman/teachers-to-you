"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { FloatingNotes } from "@/components/motion/floating-notes";
import { Button } from "@/components/ui/button";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  compact?: boolean;
};

export function Hero({
  title,
  subtitle,
  primaryCta = { href: "/book", label: "Book a Lesson" },
  secondaryCta = { href: "/teachers", label: "Meet Our Teachers" },
  compact = false,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="hero-mesh absolute inset-0" />
      <div className="hero-grain absolute inset-0 opacity-40" />
      <FloatingNotes />

      <div
        className={`relative mx-auto max-w-6xl px-4 sm:px-6 ${
          compact ? "py-14 sm:py-20" : "py-20 sm:py-28 lg:py-32"
        }`}
      >
        <motion.p
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Austin, Texas
        </motion.p>

        <motion.h1
          className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease }}
        >
          <Button asChild size="lg" className="shadow-md shadow-primary/20">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          {secondaryCta &&
            (secondaryCta.href.startsWith("http") ? (
              <Button asChild variant="outline" size="lg">
                <a href={secondaryCta.href} target="_blank" rel="noopener noreferrer">
                  {secondaryCta.label}
                </a>
              </Button>
            ) : (
              <Button asChild variant="outline" size="lg">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ))}
        </motion.div>

        {!compact && (
          <motion.div
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-border/50 pt-8"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            {[
              { value: "3", label: "Teachers" },
              { value: "$55+", label: "Per lesson" },
              { value: "4-wk", label: "Packages" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-2xl font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
