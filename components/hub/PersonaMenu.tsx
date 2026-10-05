"use client";

import { Fragment, useEffect, useRef } from "react";
import { DivergenceMeter } from "@/components/art/DivergenceMeter";
import { Menacing } from "@/components/art/Menacing";
import { YorozuyaSign } from "@/components/art/YorozuyaSign";
import {
  TransitionLink,
  useTransitionNav,
} from "@/components/ui/TransitionLink";
import { HUB_MENU_ITEMS, REALMS, type RealmId } from "@/lib/realmConfig";
import { sfx } from "@/lib/sfx";
import { usePortfolioStore } from "@/lib/store";
import { useMenuNav } from "@/lib/useMenuNav";

const HUB_HINTS: Record<string, string> = {
  "/fs": "React · Next · Node · Postgres · Three.js",
  "/ds": "Forecasting · ML · statistical truth",
  "/ai": "LLMs · agents · vision · embodied AI",
  "/about": "Who is LEAF?",
  "/connect": "Send a calling card",
};

export function PersonaMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useTransitionNav();

  const [activeIndex, setActiveIndex] = useMenuNav({
    count: HUB_MENU_ITEMS.length,
    onConfirm: (i) => navigate(HUB_MENU_ITEMS[i].href, HUB_MENU_ITEMS[i].realm),
  });

  // Jotaro strikes a new pose whenever the selection moves
  const setMenuFocus = usePortfolioStore((s) => s.setMenuFocus);
  useEffect(() => {
    setMenuFocus(`hub:${activeIndex}`);
  }, [activeIndex, setMenuFocus]);

  const activeItem = HUB_MENU_ITEMS[activeIndex];
  const previewRealm = activeItem.realm;

  // Let the slabs behind the menu preview the hovered realm's palette
  useEffect(() => {
    const stage = menuRef.current?.closest(
      ".persona-stage",
    ) as HTMLElement | null;
    if (!stage) return;
    if (previewRealm) stage.dataset.preview = previewRealm;
    else delete stage.dataset.preview;
  }, [previewRealm]);

  return (
    <div style={{ display: "contents" }}>
      {/* Title block */}
      <div className="title-block intro-left">
        <span className="eyebrow">SELECT REALM</span>
        <h1 className="title font-display">
          LEAF
          <br />
          .EXE
        </h1>
        <p className="hub-name">DHRUV MALVIYA</p>
      </div>

      <div className="hub-meter intro-left" style={{ animationDelay: "120ms" }}>
        <DivergenceMeter
          value={previewRealm ? REALMS[previewRealm].worldLine : "0.000000"}
        />
      </div>

      <YorozuyaSign className="hub-yorozuya intro-left" />

      {/* HP/MP segmented stats */}
      <div className="stats intro-up">
        <div className="stat-row">
          <span className="stat-label">HP</span>
          <div className="stat-bar">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`hp-${i}`}
                className={`stat-seg ${i < 7 ? "fill" : ""}`}
              />
            ))}
          </div>
        </div>
        <div className="stat-row">
          <span className="stat-label">MP</span>
          <div className="stat-bar">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`mp-${i}`}
                className={`stat-seg ${i < 4 ? "fill mp" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Menu block */}
      <nav ref={menuRef} className="menu" aria-label="Realm select">
        {HUB_MENU_ITEMS.map((item, idx) => {
          const numStr = String(idx + 1).padStart(2, "0");
          const isActive = idx === activeIndex;

          return (
            <Fragment key={item.href}>
              {idx === 3 && <div className="menu-divider" />}
              <TransitionLink
                href={item.href}
                targetRealm={item.realm as RealmId}
                className={`menu-item intro-item ${isActive ? "active" : ""}`}
                style={{ animationDelay: `${200 + idx * 60}ms` }}
                onMouseEnter={() => {
                  if (!isActive) sfx.move();
                  setActiveIndex(idx);
                }}
                onFocus={() => setActiveIndex(idx)}
              >
                <span className="menu-num">{numStr}</span>
                <span className="menu-label font-display">{item.label}</span>
                {isActive && <Menacing className="menu-menacing" />}
              </TransitionLink>
            </Fragment>
          );
        })}
        <p className="menu-hint" aria-live="polite">
          {HUB_HINTS[activeItem.href]}
        </p>
      </nav>
    </div>
  );
}
