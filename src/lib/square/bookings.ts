import { createSquareClient } from "./client";
import { getSquareConfig } from "./config";

export type AvailabilitySlot = {
  startAt: string;
  teamMemberId?: string;
};

export async function searchAvailability(params: {
  teamMemberId: string;
  serviceVariationId: string;
  startAt: string;
  endAt: string;
}): Promise<AvailabilitySlot[]> {
  const client = createSquareClient();
  const config = getSquareConfig();
  if (!client || !config) return getMockAvailability(params.startAt);

  try {
    const response = await client.bookings.searchAvailability({
      query: {
        filter: {
          locationId: config.locationId,
          startAtRange: {
            startAt: params.startAt,
            endAt: params.endAt,
          },
          segmentFilters: [
            {
              serviceVariationId: params.serviceVariationId,
              teamMemberIdFilter: {
                any: [params.teamMemberId],
              },
            },
          ],
        },
      },
    });

    return (
      response.availabilities?.map((slot) => ({
        startAt: slot.startAt ?? "",
        teamMemberId: params.teamMemberId,
      })) ?? []
    );
  } catch (error) {
    console.error("Square SearchAvailability failed:", error);
    return getMockAvailability(params.startAt);
  }
}

function getMockAvailability(startAt: string): AvailabilitySlot[] {
  const base = new Date(startAt);
  const slots: AvailabilitySlot[] = [];

  for (let day = 0; day < 14; day++) {
    for (const hour of [10, 14, 16, 18]) {
      const slot = new Date(base);
      slot.setDate(base.getDate() + day);
      slot.setHours(hour, 0, 0, 0);
      if (slot > new Date()) {
        slots.push({ startAt: slot.toISOString() });
      }
    }
  }

  return slots.slice(0, 20);
}

export type CreatePackageBookingInput = {
  teamMemberId: string;
  serviceVariationId: string;
  customerEmail: string;
  customerGivenName: string;
  customerFamilyName: string;
  customerPhone?: string;
  startAt: string;
  locationNote: string;
  lessonCount?: number;
};

export type PackageBookingResult = {
  bookingIds: string[];
  mock: boolean;
};

export async function createPackageBookings(
  input: CreatePackageBookingInput,
): Promise<PackageBookingResult> {
  const client = createSquareClient();
  const config = getSquareConfig();
  const lessonCount = input.lessonCount ?? 4;

  if (!client || !config) {
    return {
      bookingIds: Array.from({ length: lessonCount }, (_, i) => `mock-${i + 1}`),
      mock: true,
    };
  }

  const bookingIds: string[] = [];
  const startDate = new Date(input.startAt);

  for (let week = 0; week < lessonCount; week++) {
    const lessonStart = new Date(startDate);
    lessonStart.setDate(startDate.getDate() + week * 7);

    const response = await client.bookings.create({
      booking: {
        locationId: config.locationId,
        startAt: lessonStart.toISOString(),
        customerNote: input.locationNote,
        appointmentSegments: [
          {
            teamMemberId: input.teamMemberId,
            serviceVariationId: input.serviceVariationId,
            durationMinutes: 30,
          },
        ],
      },
      idempotencyKey: crypto.randomUUID(),
    });

    if (response.booking?.id) {
      bookingIds.push(response.booking.id);
    }
  }

  return { bookingIds, mock: false };
}

export async function createPackagePaymentLink(params: {
  amountCents: number;
  description: string;
  redirectUrl: string;
}): Promise<{ url: string; mock: boolean }> {
  const client = createSquareClient();
  const config = getSquareConfig();

  if (!client || !config) {
    return {
      url: `${params.redirectUrl}?mockPayment=true&amount=${params.amountCents}`,
      mock: true,
    };
  }

  const response = await client.checkout.paymentLinks.create({
    idempotencyKey: crypto.randomUUID(),
    quickPay: {
      name: params.description,
      priceMoney: {
        amount: BigInt(params.amountCents),
        currency: "USD",
      },
      locationId: config.locationId,
    },
    checkoutOptions: {
      redirectUrl: params.redirectUrl,
    },
  });

  const url = response.paymentLink?.url;
  if (!url) {
    throw new Error("Failed to create payment link");
  }

  return { url, mock: false };
}
