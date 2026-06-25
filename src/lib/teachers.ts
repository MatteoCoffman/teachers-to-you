import { teachers, type Teacher } from "@/data/teachers";

export type TeacherPublic = Omit<Teacher, "distanceOrigin">;

function toPublic(teacher: Teacher): TeacherPublic {
  return {
    slug: teacher.slug,
    name: teacher.name,
    instruments: teacher.instruments,
    bio: teacher.bio,
    photoUrl: teacher.photoUrl,
    squareTeamMemberId: teacher.squareTeamMemberId,
  };
}

export function getTeachersPublic(): TeacherPublic[] {
  return teachers.map(toPublic);
}

export function getTeacherBySlugPublic(
  slug: string,
): TeacherPublic | undefined {
  const teacher = teachers.find((t) => t.slug === slug);
  return teacher ? toPublic(teacher) : undefined;
}

/** Server-only: returns distance origin for travel-fee calculation */
export function getTeacherDistanceOrigin(slug: string): string | undefined {
  return teachers.find((t) => t.slug === slug)?.distanceOrigin;
}
