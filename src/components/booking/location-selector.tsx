"use client";

import { MapPin, Home } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { LocationType } from "@/lib/pricing";

type LocationSelectorProps = {
  value: LocationType;
  onChange: (value: LocationType) => void;
};

export function LocationSelector({ value, onChange }: LocationSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Where will the lesson take place?</Label>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as LocationType)}
        className="grid gap-3 sm:grid-cols-2"
      >
        <label
          htmlFor="location-student"
          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
            value === "student"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40"
          }`}
        >
          <RadioGroupItem value="student" id="location-student" className="mt-1" />
          <div>
            <span className="flex items-center gap-2 font-medium">
              <Home className="size-4 text-primary" />
              At my location
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              We come to you. Travel fee may apply if you are more than 15 minutes away.
            </p>
          </div>
        </label>

        <label
          htmlFor="location-teacher"
          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
            value === "teacher"
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40"
          }`}
        >
          <RadioGroupItem value="teacher" id="location-teacher" className="mt-1" />
          <div>
            <span className="flex items-center gap-2 font-medium">
              <MapPin className="size-4 text-primary" />
              At teacher&apos;s location
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              No travel fee. Your teacher will confirm the meeting location.
            </p>
          </div>
        </label>
      </RadioGroup>
    </div>
  );
}
