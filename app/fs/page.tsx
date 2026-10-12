import type { Metadata } from "next";
import { RealmMenu } from "@/components/realm/RealmMenu";

export const metadata: Metadata = { title: "FORGE · Full-Stack Realm" };

export default function FSLandingPage() {
  return <RealmMenu realm="fs" />;
}
