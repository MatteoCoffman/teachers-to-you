"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TRAVEL_FEE_PER_LESSON, TRAVEL_THRESHOLD_MINUTES } from "@/lib/pricing";

type TravelFeeCheckProps = {
  teacherSlug: string;
  address: string;
  onAddressChange: (address: string) => void;
  onResult: (result: { travelApplies: boolean; driveTimeMinutes: number }) => void;
};

export function TravelFeeCheck({
  teacherSlug,
  address,
  onAddressChange,
  onResult,
}: TravelFeeCheckProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!address.trim() || address.trim().length < 10) {
      queueMicrotask(() => {
        setStatus("idle");
        setMessage(null);
        onResult({ travelApplies: false, driveTimeMinutes: 0 });
      });
      return;
    }

    const timer = setTimeout(async () => {
      setStatus("loading");
      try {
        const response = await fetch("/api/travel-fee", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teacherSlug, studentAddress: address }),
        });

        if (!response.ok) {
          throw new Error("Failed to check travel fee");
        }

        const data = (await response.json()) as {
          travelApplies: boolean;
          driveTimeMinutes: number;
        };

        setStatus("success");
        onResult(data);

        if (data.travelApplies) {
          setMessage(
            `About ${data.driveTimeMinutes} min away — +$${TRAVEL_FEE_PER_LESSON} travel fee per lesson applies.`,
          );
        } else {
          setMessage(
            `About ${data.driveTimeMinutes} min away — no travel fee (within ${TRAVEL_THRESHOLD_MINUTES} min).`,
          );
        }
      } catch {
        setStatus("error");
        setMessage("Could not verify address. Please double-check and try again.");
        onResult({ travelApplies: false, driveTimeMinutes: 0 });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [address, teacherSlug, onResult]);

  return (
    <div className="space-y-2">
      <Label htmlFor="student-address">Your address</Label>
      <Input
        id="student-address"
        placeholder="123 Main St, Austin, TX 78701"
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
        autoComplete="street-address"
      />
      {status === "loading" && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Checking distance...
        </p>
      )}
      {message && status !== "loading" && (
        <p
          className={`text-sm ${
            status === "error" ? "text-destructive" : "text-muted-foreground"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
