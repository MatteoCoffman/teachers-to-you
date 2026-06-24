"use client";

import type { LucideIcon } from "lucide-react";
import { Calendar, MapPin, Music } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Music,
    title: "Experienced teachers",
    description:
      "Learn from active Austin musicians who perform and teach across genres.",
  },
  {
    icon: MapPin,
    title: "Flexible location",
    description:
      "Lessons at your home or at your teacher's location — you choose what works best.",
  },
  {
    icon: Calendar,
    title: "Easy booking",
    description:
      "Book one lesson online or lock in four weekly sessions with a single checkout.",
  },
];

function FeatureCard({
  icon: Icon,
  title,
  description,
}: (typeof features)[number]) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5"
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/15">
          <Icon className="size-6" />
        </div>
        <h3 className="font-heading text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function FeatureCards({ staticLayout = false }: { staticLayout?: boolean }) {
  const grid = (
    <>
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </>
  );

  if (staticLayout) {
    return <div className="grid gap-6 md:grid-cols-3">{grid}</div>;
  }

  return (
    <Stagger className="grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <StaggerItem key={feature.title}>
          <FeatureCard {...feature} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
