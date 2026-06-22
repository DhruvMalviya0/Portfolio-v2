import { create } from "zustand";
import type { RealmId } from "./realmConfig";

type TransitionType = "codeRain" | "orbBurst" | "neuralFire" | "fade" | null;

interface PortfolioStore {
  // Current realm
  currentRealm: RealmId | null;
  setRealm: (realm: RealmId | null) => void;

  // Transition state
  isTransitioning: boolean;
  transitionType: TransitionType;
  transitionDestination: string | null;

  // Start a transition — resolves when animation is done
  triggerTransition: (
    href: string,
    type: TransitionType,
    onComplete: () => void,
  ) => void;
  endTransition: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  currentRealm: null,
  setRealm: (realm) => set({ currentRealm: realm }),

  isTransitioning: false,
  transitionType: null,
  transitionDestination: null,

  triggerTransition: (href, type, onComplete) => {
    set({
      isTransitioning: true,
      transitionType: type,
      transitionDestination: href,
    });

    // The TransitionManager calls onComplete when its animation ends
    // Duration is set per animation type inside the component
    const durations: Record<NonNullable<TransitionType>, number> = {
      codeRain: 1800,
      orbBurst: 1600,
      neuralFire: 2000,
      fade: 600,
    };
    setTimeout(onComplete, durations[type ?? "fade"]);
  },

  endTransition: () =>
    set({
      isTransitioning: false,
      transitionType: null,
      transitionDestination: null,
    }),
}));
