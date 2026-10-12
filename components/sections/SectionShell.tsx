"use client";

import { type ReactNode, useEffect } from "react";
import { ToBeContinuedArrow } from "@/components/art/Menacing";
import {
  TransitionLink,
  useTransitionNav,
} from "@/components/ui/TransitionLink";
import { SECTIONS, type SectionId } from "@/lib/content";
import { REALMS, type RealmId } from "@/lib/realmConfig";
import { sfx } from "@/lib/sfx";
import { usePortfolioStore } from "@/lib/store";

/** Hub-level sections that exist outside any realm */
export const HUB_SECTIONS: SectionId[] = ["about", "connect"];

const hrefFor = (realm: RealmId | null, id: SectionId) =>
  realm ? `/${realm}/${id}` : `/${id}`;

export function SectionShell({
  realm,
  section,
  children,
}: {
  realm: RealmId | null;
  section: SectionId;
  children: ReactNode;
}) {
  const r = realm ? REALMS[realm] : null;
  const tabs = realm
    ? SECTIONS
    : SECTIONS.filter((s) => HUB_SECTIONS.includes(s.id));
  const index = tabs.findIndex((s) => s.id === section);
  const meta = tabs[index];
  const backHref = realm ? `/${realm}` : "/";
  const navigate = useTransitionNav();

  // Q / E (or ← / →) flip between sections, Backspace goes back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const st = usePortfolioStore.getState();
      if (
        st.menuOpen ||
        st.isTransitioning ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey
      )
        return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const k = e.key.toLowerCase();
      if (
        k === "q" ||
        k === "e" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        // Arrow keys belong to in-page lists when one is focused
        if (
          e.key.startsWith("Arrow") &&
          document.activeElement?.closest("[data-arrow-scope]")
        )
          return;
        e.preventDefault();
        const dir = k === "e" || e.key === "ArrowRight" ? 1 : -1;
        const next = tabs[(index + dir + tabs.length) % tabs.length];
        navigate(hrefFor(realm, next.id), realm);
      } else if (e.key === "Backspace") {
        e.preventDefault();
        sfx.back();
        navigate(backHref, realm);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tabs, index, realm, backHref, navigate]);

  return (
    <main className="persona-stage section-stage" data-section={section}>
      <div className="halftone" />
      <div className="slab slab-1" />
      <div className="slab slab-2" />
      <div className="slab slab-3" />
      <div className="stitch" />

      <header className="section-head">
        <div className="title-block section-title intro-left">
          <span className="eyebrow">
            {r ? `${r.label} REALM · ${r.character}` : "LEAF.EXE · HUB"} ·{" "}
            {meta.sub.toUpperCase()}
          </span>
          <h1 className="title font-display">{meta.label}</h1>
        </div>

        {tabs.length > 1 && (
          <nav className="section-tabs" aria-label="Sections">
            <kbd className="tab-key">Q</kbd>
            {tabs.map((t) => (
              <TransitionLink
                key={t.id}
                href={hrefFor(realm, t.id)}
                className={`section-tab ${t.id === section ? "active" : ""}`}
                aria-current={t.id === section ? "page" : undefined}
              >
                {t.label}
              </TransitionLink>
            ))}
            <kbd className="tab-key">E</kbd>
          </nav>
        )}
      </header>

      <div className="section-body">{children}</div>

      <TransitionLink
        href={backHref}
        className="tbc-link"
        aria-label={r ? `Return to ${r.character}` : "Return to title screen"}
      >
        <ToBeContinuedArrow />
        <span className="tbc-dest">{r ? r.character : "TITLE"}</span>
      </TransitionLink>

      <div className="tick tl" />
      <div className="tick br" />
    </main>
  );
}
