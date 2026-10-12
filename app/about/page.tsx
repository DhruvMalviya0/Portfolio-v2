import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "About" };

export default function HubAboutPage() {
  return <SectionPage realm={null} section="about" />;
}
