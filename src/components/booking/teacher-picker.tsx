"use client";

import Image from "next/image";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TeacherPublic } from "@/lib/teachers";

type TeacherPickerProps = {
  teachers: TeacherPublic[];
  value: string;
  onChange: (slug: string) => void;
};

export function TeacherPicker({ teachers, value, onChange }: TeacherPickerProps) {
  const selected = teachers.find((t) => t.slug === value);

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Choose your teacher</Label>
      <Select value={value} onValueChange={(v) => v && onChange(v)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a teacher" />
        </SelectTrigger>
        <SelectContent>
          {teachers.map((teacher) => (
            <SelectItem key={teacher.slug} value={teacher.slug}>
              {teacher.name} — {teacher.instruments.join(", ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selected && (
        <div className="flex items-center gap-4 rounded-lg border border-border/70 bg-card/50 p-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={selected.photoUrl}
              alt={selected.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <p className="text-sm text-muted-foreground">{selected.bio}</p>
        </div>
      )}
    </div>
  );
}
