import Link from "next/link";

import { Button } from "@/components/ui/button";

type CtaBannerProps = {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
};

export function CtaBanner({
  title = "Ready to start playing?",
  description = "Book a single lesson or lock in four weekly sessions with your favorite teacher.",
  href = "/book",
  label = "Book Now",
}: CtaBannerProps) {
  return (
    <section className="section-alt border-y border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
        </div>
        <Button asChild size="lg">
          <Link href={href}>{label}</Link>
        </Button>
      </div>
    </section>
  );
}
