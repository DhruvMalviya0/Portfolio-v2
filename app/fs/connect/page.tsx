import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Connect · FORGE" };

export default function FSConnectPage() {
  return <SectionPage realm="fs" section="connect" />;
}
