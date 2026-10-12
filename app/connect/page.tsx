import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Connect" };

export default function HubConnectPage() {
  return <SectionPage realm={null} section="connect" />;
}
