"use client";

import Link from "next/link";
import { Calendar, MapPin, Music, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  formatPrice,
  getPackageBasePrice,
  LESSON_PRICES,
  PACKAGE_LESSON_COUNT,
  TRAVEL_FEE_PER_LESSON,
} from "@/lib/pricing";

type PricingTier = {
  icon: LucideIcon;
  title: string;
  description: string;
  price: React.ReactNode;
  href: string;
  label: string;
  featured?: boolean;
};

function PricingCard({ tier }: { tier: PricingTier }) {
  const prefersReducedMotion = useReducedMotion();
  const { icon: Icon, title, description, price, href, label, featured } = tier;

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="h-full"
    >
      <Card
        className={`relative h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10 ${
          featured
            ? "border-primary/40 bg-gradient-to-b from-primary/10 to-card shadow-md shadow-primary/10"
            : ""
        }`}
      >
        {featured && (
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              <Sparkles className="size-3" />
              Popular
            </span>
          </div>
        )}
        <CardHeader className={featured ? "pt-10" : undefined}>
          <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
            <Icon className="size-5" />
          </div>
          <CardTitle className="font-heading">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{price}</CardContent>
        <CardFooter>
          <Button asChild className="w-full" variant={featured ? "default" : "outline"}>
            <Link href={href}>{label}</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function PricingCards() {
  const tiers: PricingTier[] = [
    {
      icon: Music,
      title: "30-Minute Lesson",
      description: "Great for focused practice and technique",
      price: (
        <>
          <p className="text-3xl font-semibold">{formatPrice(LESSON_PRICES[30])}</p>
          <p className="mt-2 text-sm text-muted-foreground">per lesson</p>
        </>
      ),
      href: "/book",
      label: "Book Single",
    },
    {
      icon: Music,
      title: "45-Minute Lesson",
      description: "More time for songs, theory, and creativity",
      price: (
        <>
          <p className="text-3xl font-semibold">{formatPrice(LESSON_PRICES[45])}</p>
          <p className="mt-2 text-sm text-muted-foreground">per lesson</p>
        </>
      ),
      href: "/book",
      label: "Book Single",
    },
    {
      icon: Calendar,
      title: "4-Week Package",
      description: `Same weekly day & time — ${PACKAGE_LESSON_COUNT} lessons, one checkout`,
      featured: true,
      price: (
        <div className="space-y-2">
          <p>
            <span className="text-3xl font-semibold">
              {formatPrice(getPackageBasePrice(30))}
            </span>
            <span className="text-sm text-muted-foreground"> / 30 min</span>
          </p>
          <p>
            <span className="text-3xl font-semibold">
              {formatPrice(getPackageBasePrice(45))}
            </span>
            <span className="text-sm text-muted-foreground"> / 45 min</span>
          </p>
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            +{formatPrice(TRAVEL_FEE_PER_LESSON)}/lesson if your location is &gt;15
            min away
          </p>
        </div>
      ),
      href: "/packages",
      label: "Book Package",
    },
  ];

  return (
    <Stagger className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <StaggerItem key={tier.title} className="h-full">
          <PricingCard tier={tier} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
