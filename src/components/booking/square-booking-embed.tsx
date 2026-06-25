"use client";

import { useEffect, useRef } from "react";
import { Calendar, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSquareBookingEmbedUrl } from "@/lib/square/embed";

type SquareBookingEmbedProps = {
  travelNote?: string;
};

export function SquareBookingEmbed({ travelNote }: SquareBookingEmbedProps) {
  const embedUrl = getSquareBookingEmbedUrl();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!embedUrl || !container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = embedUrl;
    script.async = true;
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [embedUrl]);

  if (!embedUrl) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading text-lg">
            <Calendar className="size-5 text-primary" />
            Square booking widget
          </CardTitle>
          <CardDescription>
            The Square booking widget will appear here once the embed URL is
            configured.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {travelNote && (
            <p className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">
              {travelNote}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1">NEXT_PUBLIC_SQUARE_EMBED_URL</code>{" "}
            or update{" "}
            <code className="rounded bg-muted px-1">src/lib/square/embed.ts</code>.
          </p>
          <Button asChild variant="outline">
            <a
              href="https://mason-fischer.square.site"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book on current Square site
              <ExternalLink className="ml-2 size-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {travelNote && (
        <p className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">
          {travelNote}
        </p>
      )}
      <div
        ref={containerRef}
        className="min-h-[480px] rounded-xl border border-border/70 bg-card p-4"
      />
    </div>
  );
}
