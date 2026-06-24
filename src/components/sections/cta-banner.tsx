"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

type CtaBannerProps = {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
};

export function CtaBanner({
  title = "Ready to start playing?",
  description = "Book a single lesson or lock in four weekly sessions with your favorite teacher.",
  href = "/book",
  label = "Book Now",
}: CtaBannerProps) {
  const prefersReducedMotion = useReducedMotion();
  const isExternal = href.startsWith("http");

  return (
    <section className="relative overflow-hidden border-y border-border/60">
      <div className="cta-glow absolute inset-0" />
      <div className="section-alt relative">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <Button asChild size="lg" className="group shadow-lg shadow-primary/20">
                {isExternal ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <Link href={href}>
                    {label}
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </Button>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
