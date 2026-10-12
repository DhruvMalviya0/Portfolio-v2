import type { Metadata } from "next";
import { RealmMenu } from "@/components/realm/RealmMenu";

export const metadata: Metadata = { title: "ORACLE · Data Science Realm" };

export default function DSLandingPage() {
  return <RealmMenu realm="ds" />;
}
