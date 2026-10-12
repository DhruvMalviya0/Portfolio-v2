import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Achievements · NEURON" };

export default function AIAchievementsPage() {
  return <SectionPage realm="ai" section="achievements" />;
}
