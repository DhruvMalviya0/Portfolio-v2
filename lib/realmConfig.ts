export type RealmId = "fs" | "ds" | "ai";

export interface Realm {
  id: RealmId;
  label: string;
  subtitle: string;
  character: string;
  description: string;
  accent1: string;
  accent2: string;
  bgPrimary: string;
  transitionType: "codeRain" | "orbBurst" | "neuralFire";
  menuIcon: string; // emoji or unicode for now
}

export const REALMS: Record<RealmId, Realm> = {
  fs: {
    id: "fs",
    label: "FULL-STACK",
    subtitle: "FORGE · Architect of Interfaces",
    character: "FORGE",
    description:
      "Where systems breathe and UIs come alive. The realm of React, Node, Postgres, and distributed architecture.",
    accent1: "#00FFFF",
    accent2: "#7B2FBE",
    bgPrimary: "#0A0A1A",
    transitionType: "codeRain",
    menuIcon: "⬡",
  },
  ds: {
    id: "ds",
    label: "DATA SCIENCE",
    subtitle: "ORACLE · Reader of Patterns",
    character: "ORACLE",
    description:
      "Where numbers become stories and patterns become predictions. The realm of Python, ML, and statistical truth.",
    accent1: "#FFB800",
    accent2: "#C0392B",
    bgPrimary: "#1A1040",
    transitionType: "orbBurst",
    menuIcon: "◈",
  },
  ai: {
    id: "ai",
    label: "AI / ML",
    subtitle: "NEURON · Builder of Minds",
    character: "NEURON",
    description:
      "Where models learn, agents reason, and intelligence is engineered. The realm of LLMs, embeddings, and neural architecture.",
    accent1: "#39FF14",
    accent2: "#FFFFFF",
    bgPrimary: "#050505",
    transitionType: "neuralFire",
    menuIcon: "⬟",
  },
};

export const HUB_MENU_ITEMS = [
  { label: "FULL-STACK REALM", href: "/fs", realm: "fs" as RealmId },
  { label: "DATA SCIENCE REALM", href: "/ds", realm: "ds" as RealmId },
  { label: "AI / ML REALM", href: "/ai", realm: "ai" as RealmId },
  { label: "ABOUT", href: "/fs/about", realm: null },
  { label: "CONNECT", href: "/fs/connect", realm: null },
];
