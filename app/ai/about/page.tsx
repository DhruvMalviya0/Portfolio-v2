import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "About · NEURON" };

export default function AIAboutPage() {
  return <SectionPage realm="ai" section="about" />;
}
