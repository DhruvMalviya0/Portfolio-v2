import type { Metadata } from "next";
import { TransitionLink } from "@/components/ui/TransitionLink";

export const metadata: Metadata = { title: "Lost at depth" };

/** Grand Blue: you dove too deep. Peek-a-Boo diving club rescues you. */
export default function NotFound() {
  return (
    <main className="persona-stage abyss">
      <div className="abyss-rays" />
      <div className="abyss-bubbles" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i * 0.7) % 5}s`,
              animationDuration: `${5 + (i % 4)}s`,
              width: `${6 + (i % 5) * 4}px`,
              height: `${6 + (i % 5) * 4}px`,
            }}
          />
        ))}
      </div>

      <div className="abyss-depth" aria-hidden>
        <span>DEPTH</span>
        <b>-404 m</b>
        <span>O₂ LOW</span>
      </div>

      <div className="abyss-card">
        <span className="eyebrow">
          PEEK-A-BOO DIVING CLUB · INCIDENT REPORT
        </span>
        <h1 className="title font-display">404</h1>
        <p className="abyss-copy">
          You dove too deep. This page sank to the ocean floor — or never
          existed.
          <br />
          The club's rule: <b>always surface with your buddy.</b>
        </p>
        <TransitionLink href="/" className="p-btn">
          ⬆ SURFACE TO TITLE SCREEN
        </TransitionLink>
      </div>
    </main>
  );
}
