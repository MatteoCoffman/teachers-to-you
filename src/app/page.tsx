import Link from "next/link";
import { Calendar, MapPin, Music } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { Hero } from "@/components/sections/hero";
import { PricingCards } from "@/components/sections/pricing-cards";
import { TeacherCard } from "@/components/sections/teacher-card";
import { getTeachersPublic } from "@/lib/teachers";

export default function HomePage() {
  const teachers = getTeachersPublic();

  return (
    <>
      <Hero
        title="Music lessons that come to you — or meet us where you play"
        subtitle="Teachers To You connects Austin students with working musicians for in-person guitar and bass lessons. Book a single session or reserve four weeks at once."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-card/60 p-6">
            <Music className="mb-3 size-6 text-primary" />
            <h3 className="font-heading text-lg font-semibold">Experienced teachers</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn from active Austin musicians who perform and teach across
              genres.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/60 p-6">
            <MapPin className="mb-3 size-6 text-primary" />
            <h3 className="font-heading text-lg font-semibold">Flexible location</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Lessons at your home or at your teacher&apos;s location — you choose
              what works best.
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/60 p-6">
            <Calendar className="mb-3 size-6 text-primary" />
            <h3 className="font-heading text-lg font-semibold">Easy booking</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Book one lesson online or lock in four weekly sessions with a
              single checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="section-alt border-y border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">Meet our teachers</h2>
              <p className="mt-2 text-muted-foreground">
                Three musicians, one shared passion for helping students grow.
              </p>
            </div>
            <Link
              href="/teachers"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all teachers →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {teachers.map((teacher) => (
              <TeacherCard key={teacher.slug} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-3xl font-semibold">Lesson pricing</h2>
        <PricingCards />
      </section>

      <CtaBanner />
    </>
  );
}
