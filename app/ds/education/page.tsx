import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Education · ORACLE" };

export default function DSEducationPage() {
  return <SectionPage realm="ds" section="education" />;
}
