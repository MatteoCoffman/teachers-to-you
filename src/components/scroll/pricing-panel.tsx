"use client";

import { PricingCards } from "@/components/sections/pricing-cards";

export function PricingPanel() {
  return (
    <section
      id="section-pricing"
      data-section
      className="home-snap-panel relative py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
            Pricing
          </p>
          <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
            Simple, transparent rates
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Singles or 4-week packages — no hidden fees.
          </p>
        </div>
        <PricingCards staticLayout />
      </div>
    </section>
  );
}
