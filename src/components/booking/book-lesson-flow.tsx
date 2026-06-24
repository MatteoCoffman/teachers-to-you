"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";

import { LocationSelector } from "@/components/booking/location-selector";
import { SquareBookingEmbed } from "@/components/booking/square-booking-embed";
import { TeacherPicker } from "@/components/booking/teacher-picker";
import { TravelFeeCheck } from "@/components/booking/travel-fee-check";
import { TRAVEL_FEE_PER_LESSON, type LocationType } from "@/lib/pricing";
import type { TeacherPublic } from "@/lib/teachers";

type BookLessonFlowProps = {
  teachers: TeacherPublic[];
  defaultTeacherSlug?: string;
};

export function BookLessonFlow({
  teachers,
  defaultTeacherSlug,
}: BookLessonFlowProps) {
  const searchParams = useSearchParams();
  const teacherFromUrl = searchParams.get("teacher");
  const [teacherOverride, setTeacherOverride] = useState<string | null>(null);

  const teacherSlug =
    teacherOverride ??
    teacherFromUrl ??
    defaultTeacherSlug ??
    teachers[0]?.slug ??
    "";
  const [locationType, setLocationType] = useState<LocationType>("teacher");
  const [studentAddress, setStudentAddress] = useState("");
  const [travelApplies, setTravelApplies] = useState(false);
  const [driveTimeMinutes, setDriveTimeMinutes] = useState(0);
  const [step, setStep] = useState<"location" | "booking">("location");

  const selectedTeacher = teachers.find((t) => t.slug === teacherSlug);

  const handleTravelResult = useCallback(
    (result: { travelApplies: boolean; driveTimeMinutes: number }) => {
      setTravelApplies(result.travelApplies);
      setDriveTimeMinutes(result.driveTimeMinutes);
    },
    [],
  );

  const travelNote =
    locationType === "student"
      ? travelApplies
        ? `Travel fee: +$${TRAVEL_FEE_PER_LESSON} (your location is about ${driveTimeMinutes} min away). Mention this when booking if the widget does not add it automatically.`
        : studentAddress
          ? `No travel fee — your location is about ${driveTimeMinutes} min away.`
          : undefined
      : "Lesson at teacher's location — no travel fee.";

  return (
    <div className="space-y-8">
      <TeacherPicker
        teachers={teachers}
        value={teacherSlug}
        onChange={(slug) => {
          setTeacherOverride(slug);
          setStep("location");
        }}
      />

      {step === "location" ? (
        <div className="space-y-6">
          <LocationSelector value={locationType} onChange={setLocationType} />

          {locationType === "student" && (
            <TravelFeeCheck
              teacherSlug={teacherSlug}
              address={studentAddress}
              onAddressChange={setStudentAddress}
              onResult={handleTravelResult}
            />
          )}

          <button
            type="button"
            onClick={() => setStep("booking")}
            disabled={locationType === "student" && !studentAddress.trim()}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            Continue to booking
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setStep("location")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Change location
          </button>

          <SquareBookingEmbed
            teacherName={selectedTeacher?.name ?? "your teacher"}
            embedUrl={selectedTeacher?.squareEmbedUrl}
            travelNote={travelNote}
          />
        </div>
      )}
    </div>
  );
}
