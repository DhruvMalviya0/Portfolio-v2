import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Education · NEURON" };

export default function AIEducationPage() {
  return <SectionPage realm="ai" section="education" />;
}
