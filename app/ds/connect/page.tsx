import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Connect · ORACLE" };

export default function DSConnectPage() {
  return <SectionPage realm="ds" section="connect" />;
}
