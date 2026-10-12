import type { Metadata } from "next";
import { SectionPage } from "@/components/sections/SectionPage";

export const metadata: Metadata = { title: "Connect · NEURON" };

export default function AIConnectPage() {
  return <SectionPage realm="ai" section="connect" />;
}
