import { TRAVEL_THRESHOLD_MINUTES } from "@/lib/pricing";

type GeocodeResult = {
  lat: number;
  lon: number;
};

async function geocodeNominatim(address: string): Promise<GeocodeResult | null> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", address);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "us");

  const response = await fetch(url.toString(), {
    headers: { "User-Agent": "TeachersToYou/1.0 (booking site)" },
    next: { revalidate: 86400 },
  });

  if (!response.ok) return null;

  const results = (await response.json()) as Array<{ lat: string; lon: string }>;
  if (!results.length) return null;

  return {
    lat: parseFloat(results[0].lat),
    lon: parseFloat(results[0].lon),
  };
}

async function getDriveTimeMinutesOpenRoute(
  origin: GeocodeResult,
  destination: GeocodeResult,
): Promise<number | null> {
  const apiKey = process.env.OPENROUTESERVICE_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates: [
          [origin.lon, origin.lat],
          [destination.lon, destination.lat],
        ],
      }),
    },
  );

  if (!response.ok) return null;

  const data = (await response.json()) as {
    routes?: Array<{ summary?: { duration?: number } }>;
  };
  const seconds = data.routes?.[0]?.summary?.duration;
  if (typeof seconds !== "number") return null;

  return Math.round(seconds / 60);
}

function estimateDriveTimeMinutes(
  origin: GeocodeResult,
  destination: GeocodeResult,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const earthRadiusMiles = 3958.8;

  const dLat = toRad(destination.lat - origin.lat);
  const dLon = toRad(destination.lon - origin.lon);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(origin.lat)) *
      Math.cos(toRad(destination.lat)) *
      Math.sin(dLon / 2) ** 2;
  const miles = 2 * earthRadiusMiles * Math.asin(Math.sqrt(a));
  const roadMiles = miles * 1.3;
  const avgSpeedMph = 28;

  return Math.round((roadMiles / avgSpeedMph) * 60);
}

export type TravelFeeResult = {
  driveTimeMinutes: number;
  travelApplies: boolean;
  method: "openrouteservice" | "estimate";
};

export async function calculateTravelFee(
  teacherOrigin: string,
  studentAddress: string,
): Promise<TravelFeeResult> {
  const [originCoords, destCoords] = await Promise.all([
    geocodeNominatim(teacherOrigin),
    geocodeNominatim(studentAddress),
  ]);

  if (!originCoords || !destCoords) {
    throw new Error("Could not geocode one or both addresses");
  }

  const orsMinutes = await getDriveTimeMinutesOpenRoute(
    originCoords,
    destCoords,
  );

  const driveTimeMinutes =
    orsMinutes ?? estimateDriveTimeMinutes(originCoords, destCoords);

  return {
    driveTimeMinutes,
    travelApplies: driveTimeMinutes > TRAVEL_THRESHOLD_MINUTES,
    method: orsMinutes !== null ? "openrouteservice" : "estimate",
  };
}
