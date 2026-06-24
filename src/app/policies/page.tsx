import type { Metadata } from "next";

import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Cancellation, rescheduling, travel fees, and lesson policies for Teachers To You.",
};

export default function PoliciesPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl font-semibold">Policies</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Everything you need to know before booking. Full cancellation policy
            details are being finalized — contact us if you have questions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <FaqSection />
      </section>

      <CtaBanner
        title="Questions about policies?"
        description="Reach out on Instagram @teacherstoyouatx or book a lesson and we'll follow up."
        href="https://instagram.com/teacherstoyouatx"
        label="Contact on Instagram"
      />
    </>
  );
}
