"use client";

import { FeatureCards } from "@/components/sections/feature-cards";

export function FeaturesPanel() {
  return (
    <section
      id="section-features"
      data-section
      className="home-snap-panel relative flex min-h-[calc(100dvh-3.5rem)] items-center py-16 sm:min-h-[calc(100dvh-4rem)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            Why Teachers To You
          </p>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
            Lessons built around your life
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Real musicians, flexible locations, and booking that actually makes
            sense.
          </p>
        </div>
        <FeatureCards staticLayout />
      </div>
    </section>
  );
}
