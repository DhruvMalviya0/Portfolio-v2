import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Education · FORGE" };

export default function FSEducationPage() {
  return <SectionPage realm="fs" section="education" />;
}
