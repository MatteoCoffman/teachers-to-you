import type { LessonDuration } from "@/data/teachers";

export const LESSON_PRICES: Record<LessonDuration, number> = {
  30: 55,
  45: 80,
};

export const PACKAGE_LESSON_COUNT = 4;
export const TRAVEL_FEE_PER_LESSON = 10;
export const TRAVEL_THRESHOLD_MINUTES = 15;

export type LocationType = "student" | "teacher";

export function getLessonPrice(duration: LessonDuration): number {
  return LESSON_PRICES[duration];
}

export function getPackageBasePrice(duration: LessonDuration): number {
  return LESSON_PRICES[duration] * PACKAGE_LESSON_COUNT;
}

export function getTravelFee(
  duration: LessonDuration,
  locationType: LocationType,
  travelApplies: boolean,
): number {
  if (locationType !== "student" || !travelApplies) return 0;
  return TRAVEL_FEE_PER_LESSON * PACKAGE_LESSON_COUNT;
}

export function getSingleTravelFee(
  locationType: LocationType,
  travelApplies: boolean,
): number {
  if (locationType !== "student" || !travelApplies) return 0;
  return TRAVEL_FEE_PER_LESSON;
}

export function getPackageTotal(
  duration: LessonDuration,
  locationType: LocationType,
  travelApplies: boolean,
): number {
  return (
    getPackageBasePrice(duration) +
    getTravelFee(duration, locationType, travelApplies)
  );
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
