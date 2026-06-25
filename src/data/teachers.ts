export type LessonDuration = 30 | 45;

export type Teacher = {
  slug: string;
  name: string;
  instruments: string[];
  bio: string;
  photoUrl: string;
  /** Square team member ID for Bookings API */
  squareTeamMemberId?: string;
  /** Server-only: used for travel-fee distance calculation. Never expose to client. */
  distanceOrigin: string;
};

export const teachers: Teacher[] = [
  {
    slug: "mason-fischer",
    name: "Mason Fischer",
    instruments: ["Guitar", "Bass"],
    bio: "Multi-instrumentalist and educator. Leads instrumental trio Yes Yes Yes; member of Groove Knight (Austin events/weddings). Lessons focus on fluency, creativity, and technique — guitar and bass, all levels.",
    photoUrl: "/teachers/placeholder-mason.svg",
    distanceOrigin: "12800 Turtle Rock Rd, Austin, TX 78729",
  },
  {
    slug: "matteo-coffman",
    name: "Matteo Coffman",
    instruments: ["Guitar"],
    bio: "Musician and educator (Sound Engineering, University of Washington). Guitarist for Clarence James. Focus on fundamentals, rhythm, and confidence — songs, technique, songwriting, and tone.",
    photoUrl: "/teachers/placeholder-matteo.svg",
    distanceOrigin: "4005 Amy Circle, Austin, TX 78759",
  },
  {
    slug: "jack",
    name: "Jack",
    instruments: ["Bass", "Guitar", "Piano"],
    bio: "Multi-instrumentalist, songwriter, and teacher. BA Music, UC Santa Cruz. Projects include Yes Yes Yes and Mozworth. Electric/upright bass (all levels); guitar and piano for beginners.",
    photoUrl: "/teachers/placeholder-jack.svg",
    distanceOrigin: "12800 Turtle Rock Rd, Austin, TX 78729",
  },
];

export function getTeacherBySlug(slug: string): Teacher | undefined {
  return teachers.find((t) => t.slug === slug);
}
