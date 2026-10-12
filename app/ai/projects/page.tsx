import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Projects · NEURON" };

export default function AIProjectsPage() {
  return <SectionPage realm="ai" section="projects" />;
}
