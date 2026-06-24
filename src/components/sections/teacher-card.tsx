"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TeacherPublic } from "@/lib/teachers";

type TeacherCardProps = {
  teacher: TeacherPublic;
  index?: number;
};

export function TeacherCard({ teacher, index = 0 }: TeacherCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="group overflow-hidden border-border/70 bg-card/80 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={teacher.photoUrl}
            alt={`${teacher.name} — placeholder photo`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-white">
              View profile <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            {teacher.instruments.map((instrument) => (
              <Badge
                key={instrument}
                variant="secondary"
                className="transition-colors group-hover:bg-primary/10 group-hover:text-primary"
              >
                {instrument}
              </Badge>
            ))}
          </div>
          <CardTitle className="font-heading text-xl">{teacher.name}</CardTitle>
          <CardDescription className="line-clamp-3 leading-relaxed">
            {teacher.bio}
          </CardDescription>
        </CardHeader>
        <CardFooter className="gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/teachers/${teacher.slug}`}>View Profile</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href={`/book?teacher=${teacher.slug}`}>Book</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
