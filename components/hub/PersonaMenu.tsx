"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { HUB_MENU_ITEMS, REALMS, type RealmId } from "@/lib/realmConfig";

export function PersonaMenu() {
  const menuRef = useRef<HTMLUListElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = menuRef.current?.querySelectorAll("li");
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
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
        "-=0.2",
      );
    }
  }, []);

  return (
    <div className="persona-menu-wrapper">
      {/* Angled background panels */}
      <div className="persona-panel-bg" />

      <div className="persona-menu-inner">
        {/* Game title header */}
        <div ref={titleRef} className="persona-title">
          <span className="persona-title-sub font-mono">▸ SELECT REALM</span>
          <h1 className="persona-title-main font-display glow">LEAF.EXE</h1>
          <div className="persona-title-divider" />
        </div>

        {/* Menu items */}
        <ul ref={menuRef} className="persona-menu-list">
          {HUB_MENU_ITEMS.map((item) => (
            <li key={item.href} className="persona-menu-item">
              <TransitionLink
                href={item.href}
                targetRealm={item.realm as RealmId}
                className="persona-menu-link font-display"
              >
                <span className="persona-menu-icon">
                  {item.realm ? REALMS[item.realm as RealmId].menuIcon : "▸"}
                </span>
                <span className="persona-menu-label">{item.label}</span>
                <span className="persona-menu-arrow">›</span>
              </TransitionLink>
            </li>
          ))}
        </ul>

        {/* HUD bar at bottom */}
        <div className="persona-hud">
          <div className="hud-bar">
            <span className="hud-label font-mono">HP</span>
            <div
              className="hud-fill"
              style={{ "--fill": "100%" } as React.CSSProperties}
            />
          </div>
          <div className="hud-bar">
            <span className="hud-label font-mono">MP</span>
            <div
              className="hud-fill hud-fill--mp"
              style={{ "--fill": "75%" } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
