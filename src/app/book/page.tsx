import type { Metadata } from "next";
import { Suspense } from "react";

import { BookLessonFlow } from "@/components/booking/book-lesson-flow";
import { getTeachersPublic } from "@/lib/teachers";

export const metadata: Metadata = {
  title: "Book a Lesson",
  description: "Book a single in-person guitar or bass lesson in Austin.",
};

type PageProps = {
  searchParams: Promise<{ teacher?: string }>;
};

export default async function BookPage({ searchParams }: PageProps) {
  const teachers = getTeachersPublic();
  const params = await searchParams;

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-semibold">Book a Lesson</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose your teacher, pick where the lesson happens, then select your
            time below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
          <BookLessonFlow
            teachers={teachers}
            defaultTeacherSlug={params.teacher}
          />
        </Suspense>
      </section>
    </>
  );
}
