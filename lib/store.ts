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

  // Active Egg state (mutex)
  activeEgg: string | null;
  setActiveEgg: (egg: string | null) => void;

  // Hovered Realm state (for characters & monitor preview)
  hoveredRealm: RealmId | null;
  setHoveredRealm: (realm: RealmId | null) => void;

  // Active realm state for holograms and audio (hub, fs, ds, ai, about, connect)
  activeRealmId: string;
  setActiveRealmId: (id: string) => void;

  // Monitor channel override index
  monitorChannelOverride: number | null;
  setMonitorChannelOverride: (channel: number | null) => void;

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

  activeEgg: null,
  setActiveEgg: (egg) => set({ activeEgg: egg }),

  hoveredRealm: null,
  setHoveredRealm: (realm) => set({ hoveredRealm: realm }),

  activeRealmId: "hub",
  setActiveRealmId: (id) => set({ activeRealmId: id }),

  monitorChannelOverride: null,
  setMonitorChannelOverride: (channel) =>
    set({ monitorChannelOverride: channel }),

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
