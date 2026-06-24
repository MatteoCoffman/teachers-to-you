import type { Metadata } from "next";
import { MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Hero } from "@/components/sections/hero";
import { PricingCards } from "@/components/sections/pricing-cards";
import { SectionHeading } from "@/components/sections/section-heading";
import {
  formatPrice,
  TRAVEL_FEE_PER_LESSON,
  TRAVEL_THRESHOLD_MINUTES,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Lessons",
  description:
    "30 and 45-minute in-person guitar and bass lessons in Austin. Travel fees apply for locations more than 15 minutes away.",
};

export default function LessonsPage() {
  return (
    <>
      <Hero
        compact
        title="Lessons & Pricing"
        subtitle="In-person guitar and bass lessons with experienced Austin musicians. Choose 30 or 45 minutes, book a single lesson, or reserve four weeks at once."
        primaryCta={{ href: "/book", label: "Book Now" }}
        secondaryCta={{ href: "/packages", label: "4-Week Packages" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10">
          <SectionHeading title="Rates" description="Simple, transparent pricing." />
        </div>
        <PricingCards />
      </section>

      <section className="section-alt border-y border-border/60">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold">
              <MapPin className="size-6 text-primary" />
              Location & travel
            </h2>
          </Reveal>
          <div className="space-y-5">
            <Reveal delay={0.05}>
              <p className="leading-relaxed text-muted-foreground">
                Lessons can take place at{" "}
                <strong className="text-foreground">your location</strong> or at{" "}
                <strong className="text-foreground">your teacher&apos;s location</strong>.
                When you book, you&apos;ll choose which works best for you.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted-foreground">
                If you choose lessons at your location and you are more than{" "}
                {TRAVEL_THRESHOLD_MINUTES} minutes away, a travel fee of{" "}
                {formatPrice(TRAVEL_FEE_PER_LESSON)} per lesson applies.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="leading-relaxed text-muted-foreground">
                Packages book four weekly lessons at the same day and time.
                Package pricing is simply 4× the single-lesson rate — no bundle
                discount, just convenience.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Find your teacher"
        description="Browse teacher profiles and book the lesson format that fits your schedule."
        href="/teachers"
        label="View Teachers"
      />
    </>
  );
}
