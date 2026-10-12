import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Projects · FORGE" };

export default function FSProjectsPage() {
  return <SectionPage realm="fs" section="projects" />;
}
