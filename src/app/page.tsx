import Link from "next/link";

import { CtaBanner } from "@/components/sections/cta-banner";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Hero } from "@/components/sections/hero";
import { PricingCards } from "@/components/sections/pricing-cards";
import { SectionHeading } from "@/components/sections/section-heading";
import { TeacherCard } from "@/components/sections/teacher-card";
import { Reveal } from "@/components/motion/reveal";
import { getTeachersPublic } from "@/lib/teachers";

export default function HomePage() {
  const teachers = getTeachersPublic();

  return (
    <>
      <Hero
        title="Music lessons that come to you — or meet us where you play"
        subtitle="Teachers To You connects Austin students with working musicians for in-person guitar and bass lessons. Book a single session or reserve four weeks at once."
      />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <FeatureCards />
      </section>

      <section className="section-alt border-y border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Our team"
              title="Meet our teachers"
              description="Three musicians, one shared passion for helping students grow."
            />
            <Reveal delay={0.1} className="shrink-0">
              <Link
                href="/teachers"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                View all teachers →
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {teachers.map((teacher, index) => (
              <TeacherCard key={teacher.slug} teacher={teacher} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10">
          <SectionHeading
            eyebrow="Pricing"
            title="Lesson pricing"
            description="Transparent rates for singles and 4-week packages."
          />
        </div>
        <PricingCards />
      </section>

      <CtaBanner />
    </>
  );
}
