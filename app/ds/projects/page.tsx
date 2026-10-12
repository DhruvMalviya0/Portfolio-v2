import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Projects · ORACLE" };

export default function DSProjectsPage() {
  return <SectionPage realm="ds" section="projects" />;
}
