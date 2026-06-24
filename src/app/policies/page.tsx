import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { FaqSection } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Cancellation, rescheduling, travel fees, and lesson policies for Teachers To You.",
};

export default function PoliciesPage() {
  return (
    <>
      <Hero
        compact
        title="Policies"
        subtitle="Everything you need to know before booking. Full cancellation policy details are being finalized — contact us if you have questions."
        primaryCta={{ href: "/book", label: "Book a Lesson" }}
        secondaryCta={{ href: "https://instagram.com/teacherstoyouatx", label: "Contact Us" }}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Reveal>
          <FaqSection />
        </Reveal>
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
