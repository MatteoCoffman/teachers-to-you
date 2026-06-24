import { NextResponse } from "next/server";

import { getTeacherBySlug } from "@/data/teachers";
import { searchAvailability } from "@/lib/square/bookings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teacherSlug = searchParams.get("teacherSlug");
  const duration = searchParams.get("duration");

  if (!teacherSlug || !duration) {
    return NextResponse.json(
      { error: "teacherSlug and duration are required" },
      { status: 400 },
    );
  }

  const teacher = getTeacherBySlug(teacherSlug);
  if (!teacher) {
    return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
  }

  const serviceVariationId =
    duration === "45"
      ? process.env.SQUARE_SERVICE_45MIN_ID
      : process.env.SQUARE_SERVICE_30MIN_ID;

  const teamMemberId =
    teacher.squareTeamMemberId ?? process.env.SQUARE_DEFAULT_TEAM_MEMBER_ID;

  if (!teamMemberId) {
    const now = new Date();
    const end = new Date(now);
    end.setDate(end.getDate() + 21);

    const slots = await searchAvailability({
      teamMemberId: "mock",
      serviceVariationId: serviceVariationId ?? "mock",
      startAt: now.toISOString(),
      endAt: end.toISOString(),
    });

    return NextResponse.json({ slots, mock: true });
  }

  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 21);

  const slots = await searchAvailability({
    teamMemberId,
    serviceVariationId: serviceVariationId ?? "",
    startAt: now.toISOString(),
    endAt: end.toISOString(),
  });

  return NextResponse.json({ slots, mock: false });
}
