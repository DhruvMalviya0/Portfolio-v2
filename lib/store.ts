import { create } from "zustand";
import type { RealmId } from "./realmConfig";

export type TransitionType =
  | "codeRain"
  | "orbBurst"
  | "neuralFire"
  | "fade"
  | null;

/**
 * cover  → shards / realm effect slam in over the old page
 * hold   → screen is covered, router is navigating
 * reveal → shards fly out over the new page
 */
export type TransitionPhase = "idle" | "cover" | "hold" | "reveal";

/** How long the cover animation runs before we navigate (ms). */
export const COVER_DURATIONS: Record<NonNullable<TransitionType>, number> = {
  codeRain: 720,
  orbBurst: 680,
  neuralFire: 760,
  fade: 300,
};

export const REVEAL_DURATION = 380;

interface PortfolioStore {
  // Current realm
  currentRealm: RealmId | null;
  setRealm: (realm: RealmId | null) => void;

  // Transition state
  isTransitioning: boolean;
  transitionType: TransitionType;
  transitionDestination: string | null;
  transitionPhase: TransitionPhase;

  // Start a transition — onComplete fires once the screen is covered
  triggerTransition: (
    href: string,
    type: TransitionType,
    onComplete: () => void,
  ) => void;
  endTransition: () => void;

  // Pause (ESC) menu
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;

  // Sound effects (off by default)
  sfxEnabled: boolean;
  setSfxEnabled: (on: boolean) => void;
}

let coverTimer: ReturnType<typeof setTimeout> | undefined;
let revealTimer: ReturnType<typeof setTimeout> | undefined;

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  currentRealm: null,
  setRealm: (realm) => set({ currentRealm: realm }),

  isTransitioning: false,
  transitionType: null,
  transitionDestination: null,
  transitionPhase: "idle",

  triggerTransition: (href, type, onComplete) => {
    // Ignore double clicks while a transition is already running
    if (get().isTransitioning) return;
    clearTimeout(revealTimer);

    set({
      isTransitioning: true,
      transitionType: type,
      transitionDestination: href,
      transitionPhase: "cover",
      menuOpen: false,
    });

    coverTimer = setTimeout(
      () => {
        set({ transitionPhase: "hold" });
        onComplete();
      },
      COVER_DURATIONS[type ?? "fade"],
    );
  },

  endTransition: () => {
    const { transitionPhase } = get();
    if (transitionPhase === "idle" || transitionPhase === "reveal") return;
    clearTimeout(coverTimer);
    set({ transitionPhase: "reveal" });
    revealTimer = setTimeout(
      () =>
        set({
          isTransitioning: false,
          transitionType: null,
          transitionDestination: null,
          transitionPhase: "idle",
        }),
      REVEAL_DURATION,
    );
  },

  menuOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),

  sfxEnabled: false,
  setSfxEnabled: (on) => {
    try {
      localStorage.setItem("leaf-sfx", on ? "1" : "0");
    } catch {}
    set({ sfxEnabled: on });
  },
}));
