import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TeacherPublic } from "@/lib/teachers";

type TeacherCardProps = {
  teacher: TeacherPublic;
};

export function TeacherCard({ teacher }: TeacherCardProps) {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/80">
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={teacher.photoUrl}
          alt={`${teacher.name} — placeholder photo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap gap-2">
          {teacher.instruments.map((instrument) => (
            <Badge key={instrument} variant="secondary">
              {instrument}
            </Badge>
          ))}
        </div>
        <CardTitle className="font-heading text-xl">{teacher.name}</CardTitle>
        <CardDescription className="line-clamp-3">{teacher.bio}</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter className="gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/teachers/${teacher.slug}`}>View Profile</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href={`/book?teacher=${teacher.slug}`}>Book</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
