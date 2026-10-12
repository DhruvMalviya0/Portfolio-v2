import type { Metadata } from "next";
import { RealmMenu } from "@/components/realm/RealmMenu";

export const metadata: Metadata = { title: "NEURON · AI / ML Realm" };

export default function AILandingPage() {
  return <RealmMenu realm="ai" />;
}
