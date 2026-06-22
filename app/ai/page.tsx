"use client";

import { motion } from "framer-motion";
import { Fragment, useState } from "react";
import { CanvasEffects } from "@/components/ui/CanvasEffects";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { REALMS } from "@/lib/realmConfig";

export default function AILandingPage() {
  const realm = REALMS.ai;
  const [activeIndex, setActiveIndex] = useState(0);

  // Tooltip interactive state
  const [hpTooltip, setHpTooltip] = useState<string | null>(null);
  const [mpTooltip, setMpTooltip] = useState<string | null>(null);

  const menuItems = [
    { label: "ABOUT", href: "/ai/about" },
    { label: "PROJECTS", href: "/ai/projects" },
    { label: "ACHIEVEMENTS", href: "/ai/achievements" },
    { label: "EDUCATION", href: "/ai/education" },
    { label: "CONNECT", href: "/ai/connect" },
    { label: "RETURN TO HUB", href: "/" },
  ];

  const springConfig = { type: "spring" as const, stiffness: 450, damping: 17 };

  return (
    <main className="persona-stage">
      {/* Halftone texture overlay */}
      <div className="halftone" />

      {/* Background static & dust effects */}
      <CanvasEffects />

      {/* Layered Slabs */}
      <div className="slab slab-1" />
      <div className="slab slab-2" />
      <div className="slab slab-3" />
      <div className="stitch" />

      {/* Photo Strip duotone placeholder */}
      <div className="photo-strip" />

      {/* Title block */}
      <div className="title-block">
        <span className="eyebrow">{realm.subtitle.toUpperCase()}</span>
        <div className="title font-display">{realm.character}</div>
      </div>

      {/* HP/MP segmented stats */}
      <div className="stats">
        <div
          className="stat-row"
          onMouseEnter={() =>
            setHpTooltip(
              "HP: 60% — Weights initialized. Backprop loss minimizing.",
            )
          }
          onMouseLeave={() => setHpTooltip(null)}
          style={{ position: "relative" }}
        >
          <span className="stat-label">HP</span>
          <div className="stat-bar">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`hp-${i}`}
                className={`stat-seg ${i < 6 ? "fill" : ""}`}
              />
            ))}
          </div>
          {hpTooltip && (
            <div className="stat-tooltip font-mono">{hpTooltip}</div>
          )}
        </div>
        <div
          className="stat-row"
          onMouseEnter={() =>
            setMpTooltip("MP: 80% — Neural architecture is optimized.")
          }
          onMouseLeave={() => setMpTooltip(null)}
          style={{ position: "relative" }}
        >
          <span className="stat-label">MP</span>
          <div className="stat-bar">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`mp-${i}`}
                className={`stat-seg ${i < 8 ? "fill mp" : ""}`}
              />
            ))}
          </div>
          {mpTooltip && (
            <div className="stat-tooltip font-mono">{mpTooltip}</div>
          )}
        </div>
      </div>

      {/* Menu block */}
      <div className="menu">
        {menuItems.map((item, idx) => {
          const numStr = String(idx + 1).padStart(2, "0");
          const isActive = idx === activeIndex;

          return (
            <Fragment key={item.href}>
              {idx === 5 && <div className="menu-divider" />}
              <TransitionLink
                href={item.href}
                className={`menu-item ${isActive ? "active" : ""}`}
                style={{ outline: "none" }}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <span className="menu-num">{numStr}</span>
                <motion.span
                  className="menu-label font-display"
                  animate={{ x: isActive ? 10 : 0 }}
                  transition={springConfig}
                >
                  {item.label}
                </motion.span>
              </TransitionLink>
            </Fragment>
          );
        })}
      </div>

      {/* Metadata footer */}
      <div className="meta">DHRUV MALVIYA — {realm.label} REALM</div>

      {/* Corner ticks */}
      <div className="tick tl" />
      <div className="tick br" />
    </main>
  );
}
