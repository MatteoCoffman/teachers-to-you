export type SquareConfig = {
  accessToken: string;
  locationId: string;
  applicationId: string;
  environment: "sandbox" | "production";
};

export function getSquareConfig(): SquareConfig | null {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const applicationId = process.env.SQUARE_APPLICATION_ID;
  const environment =
    process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox";

  if (!accessToken || !locationId || !applicationId) {
    return null;
  }

  return { accessToken, locationId, applicationId, environment };
}

export function isSquareConfigured(): boolean {
  return getSquareConfig() !== null;
}
