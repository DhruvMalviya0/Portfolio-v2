"use client";

import { Fragment, useEffect } from "react";
import { ArcanaCard } from "@/components/art/ArcanaCard";
import { Menacing } from "@/components/art/Menacing";
import { LazyJotaro } from "@/components/three/LazyJotaro";
import {
  TransitionLink,
  useTransitionNav,
} from "@/components/ui/TransitionLink";
import { achievementsFor, projectsFor, SECTIONS } from "@/lib/content";
import { REALMS, type RealmId } from "@/lib/realmConfig";
import { sfx } from "@/lib/sfx";
import { usePortfolioStore } from "@/lib/store";
import { useMenuNav } from "@/lib/useMenuNav";

export function RealmMenu({ realm: realmId }: { realm: RealmId }) {
  const realm = REALMS[realmId];
  const projects = projectsFor(realmId);
  const achievements = achievementsFor(realmId);

  const menuItems = [
    ...SECTIONS.map((s) => ({
      label: s.label,
      sub: s.sub,
      href: `/${realmId}/${s.id}`,
    })),
    { label: "RETURN TO HUB", sub: "Title", href: "/" },
  ];

  // What the navigator says about each menu entry
  const lines: Record<string, string> = {
    ABOUT: `${realm.character}'s status screen. Stats don't lie.`,
    PROJECTS: `${projects.length} confidants in this realm. ${projects[0]?.title.split(" —")[0]} ranks highest.`,
    ACHIEVEMENTS: `${achievements.length} releases unlocked. Want to see the Bankai?`,
    EDUCATION: "Class is in session. Check the calendar.",
    CONNECT: "There's a bounty on this one. Send a calling card.",
    "RETURN TO HUB": "Leaving already? The other world lines are waiting.",
  };

  const navigate = useTransitionNav();
  const [activeIndex, setActiveIndex] = useMenuNav({
    count: menuItems.length,
    onConfirm: (i) => navigate(menuItems[i].href),
  });
  const line = lines[menuItems[activeIndex].label] ?? realm.quote;

  // Jotaro strikes a new pose whenever the selection moves
  const setMenuFocus = usePortfolioStore((s) => s.setMenuFocus);
  useEffect(() => {
    setMenuFocus(`${realmId}:${activeIndex}`);
  }, [realmId, activeIndex, setMenuFocus]);

  const seg = (n: number, of: number) =>
    Array.from({ length: 10 }).map((_, i) => (
      <div
        key={`s-${i}`}
        className={`stat-seg ${i < Math.round((n / of) * 10) ? "fill" : ""}`}
      />
    ));

  return (
    <main className="persona-stage realm-stage" data-realm-page={realmId}>
      <div className="halftone" />
      <div className="slab slab-1" />
      <div className="slab slab-2" />
      <div className="slab slab-3" />
      <div className="stitch" />

      {/* Title block */}
      <div className="title-block intro-left">
        <span className="eyebrow">{realm.subtitle.toUpperCase()}</span>
        <h1 className="title font-display">{realm.character}</h1>
        <p className="realm-arcana">
          ARCANA {realm.arcanaNumeral} — {realm.arcana}
        </p>
      </div>

      <ArcanaCard
        numeral={realm.arcanaNumeral}
        name={realm.arcana}
        className="realm-card intro-up"
      />

      {/* Navigator + speech bubble */}
      <div className="photo-strip realm-navigator intro-up">
        <LazyJotaro accent={realm.accent1} />
      </div>
      <p className="navi-bubble" key={line} aria-live="polite">
        <span className="navi-name">NAVI</span>
        {line}
      </p>

      {/* Realm stats */}
      <div className="stats intro-up">
        <div className="stat-row">
          <span className="stat-label">QST</span>
          <div className="stat-bar">{seg(projects.length, 10)}</div>
          <span className="stat-count">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
        <div className="stat-row">
          <span className="stat-label">BNK</span>
          <div className="stat-bar mp">{seg(achievements.length, 6)}</div>
          <span className="stat-count">
            {String(achievements.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Menu block */}
      <nav className="menu" aria-label={`${realm.character} menu`}>
        {menuItems.map((item, idx) => {
          const numStr = String(idx + 1).padStart(2, "0");
          const isActive = idx === activeIndex;
          return (
            <Fragment key={item.href}>
              {idx === 5 && <div className="menu-divider" />}
              <TransitionLink
                href={item.href}
                className={`menu-item intro-item ${isActive ? "active" : ""}`}
                style={{ animationDelay: `${180 + idx * 55}ms` }}
                onMouseEnter={() => {
                  if (!isActive) sfx.move();
                  setActiveIndex(idx);
                }}
                onFocus={() => setActiveIndex(idx)}
              >
                <span className="menu-num">{numStr}</span>
                <span className="menu-label font-display">{item.label}</span>
                <span className="menu-sub">{item.sub}</span>
                {isActive && <Menacing className="menu-menacing" />}
              </TransitionLink>
            </Fragment>
          );
        })}
      </nav>

      {/* Metadata footer */}
      <div className="meta">
        DHRUV MALVIYA — {realm.label} REALM · WL {realm.worldLine}
      </div>

      <div className="tick tl" />
      <div className="tick br" />
    </main>
  );
}
