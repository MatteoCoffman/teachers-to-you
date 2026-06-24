import { HomeScrollExperience } from "@/components/scroll/home-scroll-experience";
import { getTeachersPublic } from "@/lib/teachers";

export default function HomePage() {
  const teachers = getTeachersPublic();

  return <HomeScrollExperience teachers={teachers} />;
}
