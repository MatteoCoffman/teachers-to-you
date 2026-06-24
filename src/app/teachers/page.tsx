import type { Metadata } from "next";

import { CtaBanner } from "@/components/sections/cta-banner";
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
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-semibold">Our Teachers</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Each teacher brings a unique background in performance and education.
            Browse profiles and book directly with the teacher that fits your
            goals.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.slug} teacher={teacher} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
