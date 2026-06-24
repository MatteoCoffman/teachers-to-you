import { NextResponse } from "next/server";

import { getTeacherDistanceOrigin } from "@/lib/teachers";
import { calculateTravelFee } from "@/lib/travel/distance";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      teacherSlug?: string;
      studentAddress?: string;
    };

    const { teacherSlug, studentAddress } = body;

    if (!teacherSlug || !studentAddress?.trim()) {
      return NextResponse.json(
        { error: "teacherSlug and studentAddress are required" },
        { status: 400 },
      );
    }

    const origin = getTeacherDistanceOrigin(teacherSlug);
    if (!origin) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    const result = await calculateTravelFee(origin, studentAddress.trim());

    return NextResponse.json(result);
  } catch (error) {
    console.error("Travel fee calculation failed:", error);
    return NextResponse.json(
      { error: "Could not calculate travel fee. Please check the address." },
      { status: 422 },
    );
  }
}
