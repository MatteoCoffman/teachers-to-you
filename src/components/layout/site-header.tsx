import Link from "next/link";
import { Menu, Music } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/teachers", label: "Teachers" },
  { href: "/lessons", label: "Lessons" },
  { href: "/packages", label: "Packages" },
  { href: "/policies", label: "Policies" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold">
          <Music className="size-5 text-primary" aria-hidden />
          Teachers To You
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/book">Book a Lesson</Link>
          </Button>
        </nav>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle className="font-heading">Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2">
                <Link href="/book">Book a Lesson</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
