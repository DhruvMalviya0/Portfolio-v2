"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { REALMS, realmFromPath } from "@/lib/realmConfig";
import { usePortfolioStore } from "@/lib/store";
import { CodeRainTransition } from "./CodeRainTransition";
import { NeuralFireTransition } from "./NeuralFireTransition";
import { OrbBurstTransition } from "./OrbBurstTransition";

export function TransitionManager() {
  const pathname = usePathname();
  const isTransitioning = usePortfolioStore((s) => s.isTransitioning);
  const transitionType = usePortfolioStore((s) => s.transitionType);
  const phase = usePortfolioStore((s) => s.transitionPhase);
  const destination = usePortfolioStore((s) => s.transitionDestination);
  const endTransition = usePortfolioStore((s) => s.endTransition);
  const setRealm = usePortfolioStore((s) => s.setRealm);

  // Keep <html data-realm> in sync so body, scrollbars and global
  // overlays (ESC menu, this transition) pick up the realm palette.
  useEffect(() => {
    const realm = realmFromPath(pathname);
    setRealm(realm);
    if (realm) document.documentElement.dataset.realm = realm;
    else delete document.documentElement.dataset.realm;
  }, [pathname, setRealm]);

  // Reveal as soon as the destination route has mounted and painted
  useEffect(() => {
    if (phase !== "hold" || !destination) return;
    if (pathname === destination.split(/[?#]/)[0]) {
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(endTransition);
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    // Never leave the user stuck behind the overlay
    const safety = setTimeout(endTransition, 3000);
    return () => clearTimeout(safety);
  }, [phase, pathname, destination, endTransition]);

  if (!isTransitioning) return null;

  const destRealm = destination ? realmFromPath(destination) : null;
  const isRealmEntry = transitionType !== "fade" && destRealm;
  const realm = destRealm ? REALMS[destRealm] : null;

  return (
    <div
      className={`tx tx-${phase} ${isRealmEntry ? "tx-realm" : "tx-wipe"}`}
      data-realm={destRealm ?? undefined}
      aria-hidden
    >
      {isRealmEntry && (
        <div className="tx-fx">
          {transitionType === "codeRain" && (
            <CodeRainTransition color={realm?.accent1} />
          )}
          {transitionType === "orbBurst" && <OrbBurstTransition />}
          {transitionType === "neuralFire" && (
            <NeuralFireTransition color={realm?.accent1} />
          )}
        </div>
      )}

      <div className="tx-shard tx-shard-1" />
      <div className="tx-shard tx-shard-2" />
      <div className="tx-shard tx-shard-3" />

      {isRealmEntry && realm && (
        <div className="tx-card">
          <span className="tx-card-arcana">
            {realm.arcanaNumeral} · {realm.arcana}
          </span>
          <span className="tx-card-name">{realm.character}</span>
          <span className="tx-card-sub">{realm.subtitle}</span>
        </div>
      )}
    </div>
  );
}
