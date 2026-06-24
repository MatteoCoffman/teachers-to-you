import type { Metadata } from "next";

import { CtaBanner } from "@/components/sections/cta-banner";
import { Hero } from "@/components/sections/hero";
import { TeacherCard } from "@/components/sections/teacher-card";
import { getTeachersPublic } from "@/lib/teachers";

export const metadata: Metadata = {
  title: "Teachers",
  description:
    "Meet Mason Fischer, Matteo Coffman, and Jack — guitar and bass teachers in Austin, TX.",
};

export default function TeachersPage() {
  const teachers = getTeachersPublic();

  return (
    <>
      <Hero
        compact
        title="Our Teachers"
        subtitle="Each teacher brings a unique background in performance and education. Browse profiles and book directly with the teacher that fits your goals."
        primaryCta={{ href: "/book", label: "Book a Lesson" }}
        secondaryCta={{ href: "/lessons", label: "View Pricing" }}
      />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {teachers.map((teacher, index) => (
            <TeacherCard key={teacher.slug} teacher={teacher} index={index} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
