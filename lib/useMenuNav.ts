"use client";

import { useEffect, useRef, useState } from "react";
import { sfx } from "./sfx";
import { usePortfolioStore } from "./store";

interface Options {
  count: number;
  onConfirm: (index: number) => void;
  /** Disable while another menu (e.g. the ESC menu) owns the keyboard */
  enabled?: boolean;
  initial?: number;
  /** Also bind ←/→ (for horizontal lists) */
  horizontal?: boolean;
  /** Ignore the global pause menu state (used by the pause menu itself) */
  ignoreMenu?: boolean;
}

const isTyping = (e: KeyboardEvent) => {
  const el = e.target as HTMLElement | null;
  return (
    !!el &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.isContentEditable)
  );
};

/**
 * Persona-style keyboard menu: ↑/↓ or W/S (or J/K) to move,
 * Enter/Space to confirm, number keys to jump.
 */
export function useMenuNav({
  count,
  onConfirm,
  enabled = true,
  initial = 0,
  horizontal = false,
  ignoreMenu = false,
}: Options) {
  const [active, setActive] = useState(initial);
  const confirmRef = useRef(onConfirm);
  confirmRef.current = onConfirm;
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (isTyping(e)) return;
      const st = usePortfolioStore.getState();
      if (st.isTransitioning) return;
      if (!ignoreMenu && st.menuOpen) return;

      const k = e.key;
      const prev =
        k === "ArrowUp" ||
        k === "w" ||
        k === "W" ||
        k === "k" ||
        (horizontal && k === "ArrowLeft");
      const next =
        k === "ArrowDown" ||
        k === "s" ||
        k === "S" ||
        k === "j" ||
        (horizontal && k === "ArrowRight");

      if (prev || next) {
        e.preventDefault();
        sfx.move();
        setActive((a) => (a + (next ? 1 : -1) + count) % count);
      } else if (k === "Enter" || k === " ") {
        // Let native buttons/links handle their own activation
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === "A" || tag === "BUTTON") return;
        e.preventDefault();
        confirmRef.current(activeRef.current);
      } else if (/^[1-9]$/.test(k)) {
        const i = Number(k) - 1;
        if (i < count) {
          e.preventDefault();
          sfx.move();
          setActive(i);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, enabled, horizontal, ignoreMenu]);

  return [active, setActive] as const;
}
