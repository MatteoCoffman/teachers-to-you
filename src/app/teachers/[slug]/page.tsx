import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BookLessonFlow } from "@/components/booking/book-lesson-flow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatPrice,
  LESSON_PRICES,
  TRAVEL_FEE_PER_LESSON,
} from "@/lib/pricing";
import { getTeacherBySlugPublic, getTeachersPublic } from "@/lib/teachers";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getTeachersPublic().map((teacher) => ({ slug: teacher.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const teacher = getTeacherBySlugPublic(slug);
  if (!teacher) return { title: "Teacher Not Found" };

  return {
    title: teacher.name,
    description: teacher.bio,
  };
}

export default async function TeacherProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const teacher = getTeacherBySlugPublic(slug);
  if (!teacher) notFound();

  const teachers = getTeachersPublic();

  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[280px_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src={teacher.photoUrl}
                alt={`${teacher.name} — placeholder photo`}
                fill
                className="object-cover"
                sizes="280px"
                priority
              />
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {teacher.instruments.map((instrument) => (
                  <Badge key={instrument} variant="secondary">
                    {instrument}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-4 text-4xl font-semibold">{teacher.name}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{teacher.bio}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={`/book?teacher=${teacher.slug}`}>
                    Book a Lesson
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/packages">4-Week Package</Link>
                </Button>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border/70 p-4">
                  <p className="text-sm text-muted-foreground">30 min</p>
                  <p className="text-2xl font-semibold">
                    {formatPrice(LESSON_PRICES[30])}
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 p-4">
                  <p className="text-sm text-muted-foreground">45 min</p>
                  <p className="text-2xl font-semibold">
                    {formatPrice(LESSON_PRICES[45])}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                +{formatPrice(TRAVEL_FEE_PER_LESSON)}/lesson travel fee if your
                location is more than 15 minutes away.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="mb-6 text-2xl font-semibold">Book with {teacher.name}</h2>
        <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
          <BookLessonFlow teachers={teachers} defaultTeacherSlug={teacher.slug} />
        </Suspense>
      </section>
    </>
  );
}
