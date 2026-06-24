import { NextResponse } from "next/server";

import { getTeacherBySlug } from "@/data/teachers";
import type { LessonDuration } from "@/data/teachers";
import {
  getPackageTotal,
  TRAVEL_FEE_PER_LESSON,
  type LocationType,
} from "@/lib/pricing";
import {
  createPackageBookings,
  createPackagePaymentLink,
} from "@/lib/square/bookings";
import { getTeacherDistanceOrigin } from "@/lib/teachers";
import { calculateTravelFee } from "@/lib/travel/distance";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      teacherSlug?: string;
      duration?: LessonDuration;
      locationType?: LocationType;
      studentAddress?: string;
      startAt?: string;
      customerEmail?: string;
      customerGivenName?: string;
      customerFamilyName?: string;
      customerPhone?: string;
    };

    const {
      teacherSlug,
      duration,
      locationType,
      studentAddress,
      startAt,
      customerEmail,
      customerGivenName,
      customerFamilyName,
      customerPhone,
    } = body;

    if (
      !teacherSlug ||
      !duration ||
      !locationType ||
      !startAt ||
      !customerEmail ||
      !customerGivenName ||
      !customerFamilyName
    ) {
      return NextResponse.json(
        { error: "Missing required booking fields" },
        { status: 400 },
      );
    }

    if (locationType === "student" && !studentAddress?.trim()) {
      return NextResponse.json(
        { error: "Student address is required for at-home lessons" },
        { status: 400 },
      );
    }

    const teacher = getTeacherBySlug(teacherSlug);
    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    let travelApplies = false;
    let driveTimeMinutes: number | undefined;

    if (locationType === "student" && studentAddress) {
      const origin = getTeacherDistanceOrigin(teacherSlug);
      if (!origin) {
        return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
      }
      const travel = await calculateTravelFee(origin, studentAddress.trim());
      travelApplies = travel.travelApplies;
      driveTimeMinutes = travel.driveTimeMinutes;
    }

    const total = getPackageTotal(duration, locationType, travelApplies);
    const amountCents = total * 100;

    const locationNote =
      locationType === "student"
        ? `At student location: ${studentAddress}${travelApplies ? ` (+$${TRAVEL_FEE_PER_LESSON}/lesson travel)` : ""}`
        : "At teacher's location";

    const serviceVariationId =
      duration === 45
        ? process.env.SQUARE_SERVICE_45MIN_ID
        : process.env.SQUARE_SERVICE_30MIN_ID;

    const teamMemberId =
      teacher.squareTeamMemberId ?? process.env.SQUARE_DEFAULT_TEAM_MEMBER_ID;

    const bookingResult = await createPackageBookings({
      teamMemberId: teamMemberId ?? "mock",
      serviceVariationId: serviceVariationId ?? "mock",
      customerEmail,
      customerGivenName,
      customerFamilyName,
      customerPhone,
      startAt,
      locationNote,
    });

    const origin = request.headers.get("origin") ?? "http://localhost:3000";
    const payment = await createPackagePaymentLink({
      amountCents,
      description: `4-lesson package with ${teacher.name} (${duration} min)`,
      redirectUrl: `${origin}/packages?success=true`,
    });

    return NextResponse.json({
      total,
      travelApplies,
      driveTimeMinutes,
      bookingIds: bookingResult.bookingIds,
      paymentUrl: payment.url,
      mock: bookingResult.mock || payment.mock,
    });
  } catch (error) {
    console.error("Package checkout failed:", error);
    return NextResponse.json(
      { error: "Failed to create package booking" },
      { status: 500 },
    );
  }
}
