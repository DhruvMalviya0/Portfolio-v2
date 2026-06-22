"use client";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Fragment, useEffect, useRef, useState } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { HUB_MENU_ITEMS, type RealmId } from "@/lib/realmConfig";

export function PersonaMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Interactive tooltips state (E2 easter egg)
  const [hpTooltip, setHpTooltip] = useState<string | null>(null);
  const [mpTooltip, setMpTooltip] = useState<string | null>(null);

  useEffect(() => {
    const items = menuRef.current?.querySelectorAll(".menu-item");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Title slides in from left
    tl.fromTo(
      titleRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 },
    );

    // Menu items stagger in
    if (items) {
      tl.fromTo(
        items,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
        "-=0.2",
      );
    }

    // Stats fade in
    tl.fromTo(
      statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 },
      "-=0.3",
    );
  }, []);

  const springConfig = { type: "spring" as const, stiffness: 450, damping: 17 };

  return (
    <div style={{ display: "contents" }}>
      {/* Title block */}
      <div ref={titleRef} className="title-block">
        <span className="eyebrow">SELECT REALM</span>
        <div className="title font-display">
          LEAF
          <br />
          .EXE
        </div>
      </div>

      {/* HP/MP segmented stats */}
      <div ref={statsRef} className="stats">
        <div
          className="stat-row"
          onMouseEnter={() =>
            setHpTooltip(
              "HP: 70% — Stance intact. Fatigued by compiler errors.",
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
                className={`stat-seg ${i < 7 ? "fill" : ""}`}
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
            setMpTooltip("MP: 40% — Drained by CSS specificity battles.")
          }
          onMouseLeave={() => setMpTooltip(null)}
          style={{ position: "relative" }}
        >
          <span className="stat-label">MP</span>
          <div className="stat-bar">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`mp-${i}`}
                className={`stat-seg ${i < 4 ? "fill mp" : ""}`}
              />
            ))}
          </div>
          {mpTooltip && (
            <div className="stat-tooltip font-mono">{mpTooltip}</div>
          )}
        </div>
      </div>

      {/* Menu block */}
      <div ref={menuRef} className="menu">
        {HUB_MENU_ITEMS.map((item, idx) => {
          const numStr = String(idx + 1).padStart(2, "0");
          const isActive = idx === activeIndex;

          return (
            <Fragment key={item.href}>
              {idx === 3 && <div className="menu-divider" />}
              <TransitionLink
                href={item.href}
                targetRealm={item.realm as RealmId}
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
    </div>
  );
}
