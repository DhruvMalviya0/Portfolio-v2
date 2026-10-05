import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Achievements · ORACLE" };

export default function DSAchievementsPage() {
  return <SectionPage realm="ds" section="achievements" />;
}
