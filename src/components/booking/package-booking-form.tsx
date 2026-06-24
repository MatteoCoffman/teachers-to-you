"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { LocationSelector } from "@/components/booking/location-selector";
import { TeacherPicker } from "@/components/booking/teacher-picker";
import { TravelFeeCheck } from "@/components/booking/travel-fee-check";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LessonDuration } from "@/data/teachers";
import {
  formatPrice,
  getPackageTotal,
  type LocationType,
} from "@/lib/pricing";
import type { TeacherPublic } from "@/lib/teachers";

type AvailabilitySlot = { startAt: string };

type PackageBookingFormProps = {
  teachers: TeacherPublic[];
  defaultTeacherSlug?: string;
};

export function PackageBookingForm({
  teachers,
  defaultTeacherSlug,
}: PackageBookingFormProps) {
  const [teacherSlug, setTeacherSlug] = useState(
    defaultTeacherSlug ?? teachers[0]?.slug ?? "",
  );
  const [duration, setDuration] = useState<LessonDuration>(30);
  const [locationType, setLocationType] = useState<LocationType>("teacher");
  const [studentAddress, setStudentAddress] = useState("");
  const [travelApplies, setTravelApplies] = useState(false);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleTravelResult = useCallback(
    (result: { travelApplies: boolean; driveTimeMinutes: number }) => {
      setTravelApplies(result.travelApplies);
    },
    [],
  );

  useEffect(() => {
    if (!teacherSlug) return;

    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) {
        setLoadingSlots(true);
        setSelectedSlot("");
      }
    });

    fetch(
      `/api/packages/availability?teacherSlug=${teacherSlug}&duration=${duration}`,
    )
      .then((res) => res.json())
      .then((data: { slots?: AvailabilitySlot[] }) => {
        setSlots(data.slots ?? []);
      })
      .catch(() => {
        if (!cancelled) setSlots([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });

    return () => {
      cancelled = true;
    };
  }, [teacherSlug, duration]);

  const total = getPackageTotal(duration, locationType, travelApplies);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/packages/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherSlug,
          duration,
          locationType,
          studentAddress:
            locationType === "student" ? studentAddress : undefined,
          startAt: selectedSlot,
          customerGivenName: givenName,
          customerFamilyName: familyName,
          customerEmail: email,
          customerPhone: phone || undefined,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
        paymentUrl?: string;
        mock?: boolean;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Booking failed");
      }

      if (data.paymentUrl) {
        if (data.mock) {
          setError(
            "Square is not configured yet — bookings were created in demo mode. Configure SQUARE_* env vars for live payments.",
          );
        }
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  function formatSlot(iso: string) {
    const date = new Date(iso);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <TeacherPicker
        teachers={teachers}
        value={teacherSlug}
        onChange={setTeacherSlug}
      />

      <div className="space-y-3">
        <Label className="text-base font-medium">Lesson length</Label>
        <Select
          value={String(duration)}
          onValueChange={(v) => v && setDuration(Number(v) as LessonDuration)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 minutes — $220 package</SelectItem>
            <SelectItem value="45">45 minutes — $320 package</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <LocationSelector value={locationType} onChange={setLocationType} />

      {locationType === "student" && (
        <TravelFeeCheck
          teacherSlug={teacherSlug}
          address={studentAddress}
          onAddressChange={setStudentAddress}
          onResult={handleTravelResult}
        />
      )}

      <div className="space-y-3">
        <Label className="text-base font-medium">Starting time (week 1)</Label>
        {loadingSlots ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" />
            Loading available times...
          </p>
        ) : (
          <Select
            value={selectedSlot}
            onValueChange={(v) => v && setSelectedSlot(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose your weekly slot" />
            </SelectTrigger>
            <SelectContent>
              {slots.map((slot) => (
                <SelectItem key={slot.startAt} value={slot.startAt}>
                  {formatSlot(slot.startAt)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <p className="text-sm text-muted-foreground">
          We&apos;ll book the same day and time for 4 consecutive weeks.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Your details</CardTitle>
          <CardDescription>Required for booking confirmation</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="givenName">First name</Label>
            <Input
              id="givenName"
              required
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="familyName">Last name</Label>
            <Input
              id="familyName"
              required
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Package total</p>
          <p className="text-3xl font-semibold">{formatPrice(total)}</p>
          {travelApplies && (
            <p className="text-sm text-muted-foreground">
              Includes travel fee for 4 at-home lessons
            </p>
          )}
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={
            submitting ||
            !selectedSlot ||
            !givenName ||
            !familyName ||
            !email ||
            (locationType === "student" && !studentAddress.trim())
          }
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Continue to Payment"
          )}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
