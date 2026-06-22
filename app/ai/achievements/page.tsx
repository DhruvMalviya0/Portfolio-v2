import { TransitionLink } from "@/components/ui/TransitionLink";

export default function AIAchievementsPage() {
  return (
    <main className="persona-stage">
      <div className="halftone" />
      <div className="slab slab-1" />
      <div className="slab slab-2" />
      <div className="slab slab-3" />
      <div className="stitch" />

      <div className="title-block">
        <span className="eyebrow">AI / ML REALM · ACHIEVEMENTS</span>
        <div className="title font-display">ACHIEVEMENTS</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "6%",
          top: "32%",
          width: "50%",
          zIndex: 20,
          background: "rgba(232, 227, 216, 0.05)",
          borderLeft: "4px solid var(--accent-1)",
          padding: "24px 32px",
          transform: "skewX(-6deg)",
        }}
      >
        <p
          className="font-mono"
          style={{
            fontSize: "18px",
            lineHeight: 1.6,
            color: "var(--accent-2)",
          }}
        >
          Content coming in Phase 3. The path of NEURON.
        </p>
      </div>

      <div className="menu" style={{ top: "65%" }}>
        <TransitionLink
          href="/ai"
          className="menu-item active"
          style={{ width: "fit-content", padding: "14px 32px" }}
        >
          <span className="menu-num">←</span>
          <span className="menu-label font-display">RETURN TO NEURON</span>
        </TransitionLink>
      </div>

      <div className="tick tl" />
      <div className="tick br" />
    </main>
  );
}
