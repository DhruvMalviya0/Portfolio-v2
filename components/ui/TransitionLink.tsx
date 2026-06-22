"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { REALMS, type RealmId } from "@/lib/realmConfig";
import { usePortfolioStore } from "@/lib/store";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  targetRealm?: RealmId | null;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
}

export function TransitionLink({
  href,
  children,
  className,
  targetRealm,
  style,
  onMouseEnter,
}: TransitionLinkProps) {
  const router = useRouter();
  const { triggerTransition, endTransition } = usePortfolioStore();

  const getTransitionType = () => {
    if (targetRealm && REALMS[targetRealm]) {
      return REALMS[targetRealm].transitionType;
    }
    return "fade";
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const type = getTransitionType();

    triggerTransition(href, type, () => {
      router.push(href);
      // Small delay so page mounts before we end the transition
      setTimeout(() => {
        endTransition();
      }, 300);
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </a>
  );
}
