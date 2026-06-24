import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Hero } from "@/components/sections/hero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Teachers To You brings experienced Austin musicians to students for in-person guitar and bass lessons.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        title="Music education rooted in Austin's creative community"
        subtitle="Teachers To You was founded to make high-quality, personalized music lessons accessible — whether at your home or at your teacher's studio."
        primaryCta={{ href: "/teachers", label: "Meet Our Teachers" }}
        secondaryCta={{ href: "/lessons", label: "View Lesson Options" }}
      />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="space-y-8">
          <Reveal>
            <p className="text-xl leading-relaxed text-foreground">
              We believe the best teachers are working musicians — people who
              perform, write, and live music every day.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-muted-foreground">
              Our team includes members of Yes Yes Yes, Groove Knight, Clarence
              James, and Mozworth. Whether you are picking up guitar for the
              first time or deepening your bass technique, we meet you where you
              are.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="leading-relaxed text-muted-foreground">
              Lessons are in-person only at launch. Choose lessons at your
              location or at your teacher&apos;s — we keep scheduling simple with
              online booking and optional 4-week packages.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
