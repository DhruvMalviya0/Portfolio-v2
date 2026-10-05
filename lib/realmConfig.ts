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
  /** Persona arcana the realm's character belongs to */
  arcana: string;
  arcanaNumeral: string;
  /** Steins;Gate-style divergence reading shown on the hub meter */
  worldLine: string;
  /** Short in-character line for the navigator cut-in */
  quote: string;
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
    arcana: "THE CHARIOT",
    arcanaNumeral: "VII",
    worldLine: "0.571024",
    quote: "Ship it. Then make it beautiful.",
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
    arcana: "THE HERMIT",
    arcanaNumeral: "IX",
    worldLine: "1.130205",
    quote: "The data already knows. I just listen.",
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
    arcana: "THE MAGICIAN",
    arcanaNumeral: "I",
    worldLine: "1.048596",
    quote: "El Psy Kongroo. The model is listening.",
  },
};

export const REALM_IDS = Object.keys(REALMS) as RealmId[];

export const isRealmId = (v: unknown): v is RealmId =>
  typeof v === "string" && v in REALMS;

/** Derive the realm from a pathname like /fs/projects */
export const realmFromPath = (path: string): RealmId | null => {
  const seg = path.split("/")[1];
  return isRealmId(seg) ? seg : null;
};

export const HUB_MENU_ITEMS = [
  { label: "FULL-STACK REALM", href: "/fs", realm: "fs" as RealmId },
  { label: "DATA SCIENCE REALM", href: "/ds", realm: "ds" as RealmId },
  { label: "AI / ML REALM", href: "/ai", realm: "ai" as RealmId },
  { label: "ABOUT", href: "/about", realm: null },
  { label: "CONNECT", href: "/connect", realm: null },
];
