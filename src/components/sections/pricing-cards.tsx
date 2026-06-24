import Link from "next/link";
import { Calendar, MapPin, Music } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatPrice,
  getPackageBasePrice,
  LESSON_PRICES,
  PACKAGE_LESSON_COUNT,
  TRAVEL_FEE_PER_LESSON,
} from "@/lib/pricing";

export function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <Music className="mb-2 size-5 text-primary" />
          <CardTitle className="font-heading">30-Minute Lesson</CardTitle>
          <CardDescription>Great for focused practice and technique</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{formatPrice(LESSON_PRICES[30])}</p>
          <p className="mt-2 text-sm text-muted-foreground">per lesson</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/book">Book Single</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <Music className="mb-2 size-5 text-primary" />
          <CardTitle className="font-heading">45-Minute Lesson</CardTitle>
          <CardDescription>More time for songs, theory, and creativity</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold">{formatPrice(LESSON_PRICES[45])}</p>
          <p className="mt-2 text-sm text-muted-foreground">per lesson</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/book">Book Single</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <Calendar className="mb-2 size-5 text-primary" />
          <CardTitle className="font-heading">4-Week Package</CardTitle>
          <CardDescription>
            Same weekly day & time — {PACKAGE_LESSON_COUNT} lessons, one checkout
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
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
            +{formatPrice(TRAVEL_FEE_PER_LESSON)}/lesson if your location is &gt;15 min away
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/packages">Book Package</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
