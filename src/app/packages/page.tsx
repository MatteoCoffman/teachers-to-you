import type { Metadata } from "next";
import { Suspense } from "react";

import { PackageBookingForm } from "@/components/booking/package-booking-form";
import { getTeachersPublic } from "@/lib/teachers";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Book four weekly guitar or bass lessons at once. Same price as four single lessons — just one convenient checkout.",
};

type PageProps = {
  searchParams: Promise<{ teacher?: string; success?: string }>;
};

export default async function PackagesPage({ searchParams }: PageProps) {
  const teachers = getTeachersPublic();
  const params = await searchParams;

  return (
    <>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-semibold">4-Week Packages</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Reserve four weekly lessons at the same day and time with one
            payment. Same rate as booking four singles — just easier.
          </p>
          {params.success && (
            <p className="mt-4 rounded-lg bg-primary/10 px-4 py-3 text-sm text-foreground">
              Thank you! Your package booking is being processed. You&apos;ll
              receive a confirmation email shortly.
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
          <PackageBookingForm
            teachers={teachers}
            defaultTeacherSlug={params.teacher}
          />
        </Suspense>
      </section>
    </>
  );
}
