"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CtaPanel() {
  return (
    <section
      id="section-cta"
      data-section
      className="relative overflow-hidden py-24 sm:py-28"
    >
      <div className="cta-glow absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
      <div className="relative mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
          Get started
        </p>
        <h2 className="font-heading text-4xl font-semibold sm:text-5xl lg:text-6xl">
          Ready to start playing?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Book a single lesson or lock in four weekly sessions with your
          favorite teacher.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="group shadow-xl shadow-primary/25">
            <Link href="/book">
              Book a Lesson
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/packages">4-Week Package</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
