"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { Navigator } from "@/components/art/Navigator";
import { PersonaCalendar } from "@/components/art/PersonaCalendar";
import { useTransitionNav } from "@/components/ui/TransitionLink";
import { SECTIONS } from "@/lib/content";
import {
  REALM_IDS,
  REALMS,
  type RealmId,
  realmFromPath,
} from "@/lib/realmConfig";
import { sfx } from "@/lib/sfx";
import { usePortfolioStore } from "@/lib/store";
import { useMenuNav } from "@/lib/useMenuNav";

interface Item {
  key: string;
  label: string;
  hint: string;
  href?: string;
  realm?: RealmId | null;
  action?: "resume" | "sfx";
  group?: string;
}

const SECTION_HINTS: Record<string, string> = {
  about: "Status — stats, skills and the person behind the code.",
  projects: "Confidants — every completed build, ranked.",
  achievements: "Bankai — hackathon releases and milestones.",
  education: "Calendar — where the grind happens.",
  connect: "Wanted — send a calling card.",
};

// Each row gets its own tilt + offset so the list feels hand-cut, not a table
const TILTS = [-4, 2, -2, 3, -3, 1, -1, 2.5, -2.5, 1.5, -1.5];
const OFFSETS = [0, 28, 8, 40, 16, 48, 4, 32, 12, 44, 20];

function buildItems(pathname: string, sfxOn: boolean): Item[] {
  const realm = realmFromPath(pathname);
  const items: Item[] = [
    {
      key: "resume",
      label: "RESUME",
      hint: "Back to where you were.",
      action: "resume",
    },
  ];

  if (realm) {
    const r = REALMS[realm];
    for (const s of SECTIONS) {
      items.push({
        key: s.id,
        label: s.label,
        hint: SECTION_HINTS[s.id],
        href: `/${realm}/${s.id}`,
        realm,
        group: r.character,
      });
    }
    items.push({
      key: "realm-home",
      label: `${r.character} MENU`,
      hint: `${r.subtitle}.`,
      href: `/${realm}`,
      realm,
    });
    for (const other of REALM_IDS.filter((id) => id !== realm)) {
      items.push({
        key: `realm-${other}`,
        label: `→ ${REALMS[other].label}`,
        hint: `Shift world line to ${REALMS[other].character} (${REALMS[other].worldLine}).`,
        href: `/${other}`,
        realm: other,
        group: "WORLD LINES",
      });
    }
  } else {
    for (const id of REALM_IDS) {
      items.push({
        key: `realm-${id}`,
        label: REALMS[id].label,
        hint: `${REALMS[id].subtitle}.`,
        href: `/${id}`,
        realm: id,
        group: "REALMS",
      });
    }
    items.push(
      {
        key: "about",
        label: "ABOUT",
        hint: SECTION_HINTS.about,
        href: "/about",
        realm: null,
      },
      {
        key: "connect",
        label: "CONNECT",
        hint: SECTION_HINTS.connect,
        href: "/connect",
        realm: null,
      },
    );
  }

  items.push(
    {
      key: "hub",
      label: "TITLE SCREEN",
      hint: "Return to realm select.",
      href: "/",
      realm: null,
    },
    {
      key: "sfx",
      label: `SFX: ${sfxOn ? "ON" : "OFF"}`,
      hint: "Toggle menu sound effects.",
      action: "sfx",
    },
  );
  return items;
}

export function PauseMenu() {
  const pathname = usePathname();
  const open = usePortfolioStore((s) => s.menuOpen);
  const setOpen = usePortfolioStore((s) => s.setMenuOpen);
  const isTransitioning = usePortfolioStore((s) => s.isTransitioning);
  const sfxEnabled = usePortfolioStore((s) => s.sfxEnabled);
  const setSfxEnabled = usePortfolioStore((s) => s.setSfxEnabled);
  const navigate = useTransitionNav();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const items = useMemo(
    () => buildItems(pathname, sfxEnabled),
    [pathname, sfxEnabled],
  );
  const realm = realmFromPath(pathname);

  // Restore saved SFX preference
  useEffect(() => {
    try {
      if (localStorage.getItem("leaf-sfx") === "1") setSfxEnabled(true);
    } catch {}
  }, [setSfxEnabled]);

  const activate = (i: number) => {
    const item = items[i];
    if (!item) return;
    if (item.action === "resume") {
      sfx.close();
      setOpen(false);
    } else if (item.action === "sfx") {
      setSfxEnabled(!sfxEnabled);
      // Plays only if it was just switched on
      setTimeout(sfx.confirm, 0);
    } else if (item.href) {
      navigate(item.href, item.realm);
    }
  };

  const [active, setActive] = useMenuNav({
    count: items.length,
    onConfirm: activate,
    enabled: open,
    ignoreMenu: true,
  });

  // ESC toggles the menu from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const st = usePortfolioStore.getState();
      if (st.isTransitioning) return;
      e.preventDefault();
      if (st.menuOpen) sfx.close();
      else sfx.open();
      st.toggleMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus handling + scroll lock while open
  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setActive(0);
      requestAnimationFrame(() => panelRef.current?.focus());
      document.documentElement.classList.add("menu-locked");
    } else {
      document.documentElement.classList.remove("menu-locked");
      returnFocus.current?.focus?.();
    }
  }, [open, setActive]);

  // Close if the route changes underneath (e.g. browser back)
  // biome-ignore lint/correctness/useExhaustiveDependencies: run on path change only
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const current = items[active] ?? items[0];
  const accentRealm = current.realm ?? realm;

  return (
    <>
      {!isTransitioning && !open && (
        <button
          type="button"
          className="menu-fab"
          onClick={() => {
            sfx.open();
            setOpen(true);
          }}
          aria-label="Open menu (Escape)"
        >
          <span className="menu-fab-key">ESC</span>
          <span className="menu-fab-label">MENU</span>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            className="pause"
            data-realm={accentRealm ?? undefined}
            role="dialog"
            aria-modal="true"
            aria-label="Pause menu"
            tabIndex={-1}
            initial={{
              clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            }}
            animate={{
              clipPath: "polygon(-20% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
            exit={{
              clipPath: "polygon(100% 0, 100% 0, 120% 100%, 120% 100%)",
              transition: { duration: 0.22, ease: [0.7, 0, 0.84, 0] },
            }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pause-bg" />
            <motion.div
              className="pause-band"
              initial={{ x: "-110%", rotate: -14 }}
              animate={{ x: "0%", rotate: -14 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.05,
              }}
            />
            <div className="halftone" />

            <motion.div
              className="pause-eyes"
              initial={{ x: "60%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              transition={{
                duration: 0.35,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Navigator
                variant="eyes"
                sizes="(max-width: 768px) 100vw, 60vw"
                alt=""
              />
            </motion.div>

            <motion.div
              className="pause-character"
              initial={{ y: "30%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.45,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Navigator
                variant="bust"
                sizes="(max-width: 768px) 50vw, 28vw"
                alt=""
              />
            </motion.div>

            <PersonaCalendar className="pause-calendar" />

            <div className="pause-title" aria-hidden>
              <span>P</span>
              <span>A</span>
              <span>U</span>
              <span>S</span>
              <span>E</span>
            </div>

            <ul className="pause-list">
              {items.map((item, i) => {
                const isActive = i === active;
                const showGroup =
                  item.group && item.group !== items[i - 1]?.group;
                return (
                  <motion.li
                    key={item.key}
                    initial={{ x: 120, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.06 + i * 0.025,
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      marginLeft: OFFSETS[i % OFFSETS.length],
                      rotate: `${TILTS[i % TILTS.length]}deg`,
                    }}
                  >
                    {showGroup && (
                      <span className="pause-group">{item.group}</span>
                    )}
                    <button
                      type="button"
                      className={`pause-item ${isActive ? "active" : ""}`}
                      onMouseEnter={() => {
                        if (!isActive) sfx.move();
                        setActive(i);
                      }}
                      onFocus={() => setActive(i)}
                      onClick={() => activate(i)}
                      aria-current={item.href === pathname ? "page" : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="pause-highlight"
                          className="pause-highlight"
                          transition={{
                            type: "spring",
                            stiffness: 700,
                            damping: 38,
                          }}
                        />
                      )}
                      <span className="pause-item-label">{item.label}</span>
                      {item.href === pathname && (
                        <span className="pause-here">HERE</span>
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            <AnimatePresence mode="wait">
              <motion.p
                key={current.key}
                className="pause-hint"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                transition={{ duration: 0.14 }}
              >
                {current.hint}
              </motion.p>
            </AnimatePresence>

            <div className="pause-keys" aria-hidden>
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> SELECT
              </span>
              <span>
                <kbd>ENTER</kbd> CONFIRM
              </span>
              <span>
                <kbd>ESC</kbd> CLOSE
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
