import Link from "next/link";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-secondary/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-lg font-semibold">Teachers To You</p>
          <p className="mt-1 text-sm text-muted-foreground">
            In-person guitar & bass lessons in Austin, TX
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-8">
          <Link href="/book" className="transition-colors hover:text-foreground">
            Book a lesson
          </Link>
          <Link href="/packages" className="transition-colors hover:text-foreground">
            4-week packages
          </Link>
          <a
            href="https://instagram.com/teacherstoyouatx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <InstagramIcon className="size-4" />
            @teacherstoyouatx
          </a>
        </div>
      </div>
    </footer>
  );
}
