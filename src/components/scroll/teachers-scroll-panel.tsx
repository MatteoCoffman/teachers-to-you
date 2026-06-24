import Link from "next/link";

import { TeacherCard } from "@/components/sections/teacher-card";
import type { TeacherPublic } from "@/lib/teachers";

type TeachersScrollPanelProps = {
  teachers: TeacherPublic[];
};

export function TeachersScrollPanel({ teachers }: TeachersScrollPanelProps) {
  return (
    <section
      id="section-teachers"
      data-section
      className="home-snap-panel relative flex min-h-[calc(100dvh-3.5rem)] items-center bg-secondary/40 py-16 sm:min-h-[calc(100dvh-4rem)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.14_65/0.08),transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <TeachersHeader />
        <div className="grid gap-6 md:grid-cols-3">
          {teachers.map((teacher, index) => (
            <TeacherCard
              key={teacher.slug}
              teacher={teacher}
              index={index}
              animateIn={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeachersHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
          Our team
        </p>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
          Meet our teachers
        </h2>
        <p className="mt-2 max-w-lg text-muted-foreground">
          Three musicians, one shared passion for helping students grow.
        </p>
      </div>
      <Link
        href="/teachers"
        className="shrink-0 text-sm font-medium text-primary hover:underline"
      >
        View all →
      </Link>
    </div>
  );
}
