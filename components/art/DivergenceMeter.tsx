"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Steins;Gate divergence meter — nixie tubes that scramble whenever the
 * world line (realm) changes, then settle on the new reading.
 */
export function DivergenceMeter({
  value,
  label = "WORLD LINE",
}: {
  value: string;
  label?: string;
}) {
  const [shown, setShown] = useState(value);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let ticks = 0;
    const id = setInterval(() => {
      ticks++;
      if (ticks > 9) {
        setShown(value);
        clearInterval(id);
        return;
      }
      // Lock digits left-to-right as the scramble resolves
      setShown(
        value
          .split("")
          .map((c, i) =>
            c === "." || i < ticks - 2 ? c : String((Math.random() * 10) | 0),
          )
          .join(""),
      );
    }, 45);
    return () => clearInterval(id);
  }, [value]);

  return (
    <div className="divergence" role="img" aria-label={`${label} ${value}`}>
      <span className="divergence-label">{label}</span>
      <div className="divergence-tubes">
        {shown.split("").map((c, i) => (
          <span key={i} className={`nixie ${c === "." ? "nixie-dot" : ""}`}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
