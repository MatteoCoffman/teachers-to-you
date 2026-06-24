import { SquareClient, SquareEnvironment } from "square";

import { getSquareConfig } from "./config";

export function createSquareClient(): SquareClient | null {
  const config = getSquareConfig();
  if (!config) return null;

  return new SquareClient({
    token: config.accessToken,
    environment:
      config.environment === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });
}
