"use client";

import dynamic from "next/dynamic";
import { Navigator } from "@/components/art/Navigator";

// three.js only loads on the client, behind the static cut-in
export const LazyJotaro = dynamic(
  () => import("@/components/three/JotaroAvatar").then((m) => m.JotaroAvatar),
  {
    ssr: false,
    loading: () => (
      <Navigator
        variant="full"
        priority
        sizes="(max-width: 768px) 40vw, 22vw"
      />
    ),
  },
);
