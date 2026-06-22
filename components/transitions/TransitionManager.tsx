"use client";

import { usePortfolioStore } from "@/lib/store";
import { CodeRainTransition } from "./CodeRainTransition";
import { OrbBurstTransition } from "./OrbBurstTransition";

export function TransitionManager() {
  const { isTransitioning, transitionType } = usePortfolioStore();

  if (!isTransitioning) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "all",
      }}
    >
      {transitionType === "codeRain" && <CodeRainTransition />}
      {transitionType === "orbBurst" && <OrbBurstTransition />}
      {transitionType === "neuralFire" && (
        // Phase 2 — for now, reuse CodeRain with green tint
        <CodeRainTransition color="#39FF14" />
      )}
      {transitionType === "fade" && (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#080810",
            animation: "fadeInOut 0.6s ease",
          }}
        />
      )}
    </div>
  );
}
