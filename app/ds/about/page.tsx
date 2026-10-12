import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "About · ORACLE" };

export default function DSAboutPage() {
  return <SectionPage realm="ds" section="about" />;
}
