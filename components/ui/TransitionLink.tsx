"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useCallback } from "react";
import { REALMS, type RealmId, realmFromPath } from "@/lib/realmConfig";
import { sfx } from "@/lib/sfx";
import { type TransitionType, usePortfolioStore } from "@/lib/store";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  targetRealm?: RealmId | null;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onFocus?: () => void;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
}

/**
 * Realm entry from outside the realm gets the realm's signature effect;
 * every other hop gets the quick shard wipe.
 */
const pickTransition = (
  from: string,
  href: string,
  targetRealm?: RealmId | null,
): TransitionType => {
  const dest = targetRealm ?? realmFromPath(href);
  if (dest && realmFromPath(from) !== dest && href === `/${dest}`) {
    return REALMS[dest].transitionType;
  }
  return "fade";
};

/** Programmatic navigation with the same transition (used by keyboard menus). */
export function useTransitionNav() {
  const router = useRouter();
  const pathname = usePathname();
  const triggerTransition = usePortfolioStore((s) => s.triggerTransition);

  return useCallback(
    (href: string, targetRealm?: RealmId | null) => {
      if (href === pathname) {
        usePortfolioStore.getState().setMenuOpen(false);
        return;
      }
      sfx.confirm();
      router.prefetch(href);
      triggerTransition(href, pickTransition(pathname, href, targetRealm), () =>
        router.push(href),
      );
    },
    [pathname, router, triggerTransition],
  );
}

export function TransitionLink({
  href,
  children,
  className,
  targetRealm,
  style,
  onMouseEnter,
  onFocus,
  ...aria
}: TransitionLinkProps) {
  const router = useRouter();
  const navigate = useTransitionNav();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle new-tab / new-window clicks
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    navigate(href, targetRealm);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      onMouseEnter={() => {
        router.prefetch(href);
        onMouseEnter?.();
      }}
      onFocus={() => {
        router.prefetch(href);
        onFocus?.();
      }}
      {...aria}
    >
      {children}
    </Link>
  );
}
