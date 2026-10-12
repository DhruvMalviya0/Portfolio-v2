import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Achievements · FORGE" };

export default function FSAchievementsPage() {
  return <SectionPage realm="fs" section="achievements" />;
}
