import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "About · FORGE" };

export default function FSAboutPage() {
  return <SectionPage realm="fs" section="about" />;
}
