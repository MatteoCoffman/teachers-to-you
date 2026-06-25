/** Shared Square Appointments embed (Channels) — students pick teacher in the widget. */
export const SQUARE_BOOKING_EMBED_URL =
  "https://square.site/appointments/buyer/widget/e4t1d2z22vq6e2/LFD3VG7HSPPYE.js";

export function getSquareBookingEmbedUrl(): string {
  return process.env.NEXT_PUBLIC_SQUARE_EMBED_URL ?? SQUARE_BOOKING_EMBED_URL;
}
