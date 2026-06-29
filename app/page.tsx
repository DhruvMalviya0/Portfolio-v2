"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PersonaMenu } from "@/components/hub/PersonaMenu";
import { CanvasEffects } from "@/components/ui/CanvasEffects";
import Scene from "@/components/three/Scene";
import { AudioController } from "@/components/ui/AudioController";
import { usePortfolioStore } from "@/lib/store";

export default function HubPage() {
  const { hoveredRealm } = usePortfolioStore();

  return (
    <main className="persona-stage">
      {/* Global Audio Controller */}
      <AudioController />

      {/* Halftone texture overlay */}
      <div className="halftone" />

      {/* R3F 3D Background Scene (Hologram, Fog, Sparkles) */}
      <Scene />

      {/* Background static & dust effects */}
      <CanvasEffects />

      {/* Layered Slabs */}
      <div className="slab slab-1" />
      <div className="slab slab-2" />
      <div className="slab slab-3" />
      <div className="stitch" />

      {/* ZONE A: CHARACTER SILHOUETTE */}
      <div className="void-silhouette-container">
        <AnimatePresence mode="wait">
          {hoveredRealm === "fs" && (
            <motion.div
              key="forge"
              className="void-sprite"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <svg
                width="220"
                height="400"
                viewBox="0 0 220 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Forge Silhouette</title>
                <path
                  d="M110 30L150 70L150 110L170 130L170 160L130 200L140 280L180 320L180 390L40 390L40 320L80 280L90 200L50 160L50 130L70 110L70 70L110 30Z"
                  fill="var(--accent-1)"
                  opacity="0.65"
                />
                <path d="M110 10L125 30L95 30L110 10Z" fill="var(--accent-1)" />
                <line
                  x1="110"
                  y1="30"
                  x2="110"
                  y2="120"
                  stroke="var(--accent-1)"
                  strokeWidth="2"
                />
                <circle
                  cx="110"
                  cy="80"
                  r="15"
                  stroke="var(--accent-1)"
                  strokeWidth="2"
                />
                <rect
                  x="65"
                  y="140"
                  width="90"
                  height="6"
                  fill="var(--accent-1)"
                  opacity="0.8"
                />
                <rect
                  x="85"
                  y="240"
                  width="50"
                  height="20"
                  rx="3"
                  stroke="var(--accent-1)"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>
          )}

          {hoveredRealm === "ds" && (
            <motion.div
              key="oracle"
              className="void-sprite"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <svg
                width="220"
                height="400"
                viewBox="0 0 220 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Oracle Silhouette</title>
                <path
                  d="M110 40C90 40 70 50 65 75C60 100 50 130 40 180L30 300L45 390L175 390L190 300L180 180C170 130 160 100 155 75C150 50 130 40 110 40Z"
                  fill="var(--accent-1)"
                  opacity="0.65"
                />
                <circle
                  cx="110"
                  cy="120"
                  r="25"
                  stroke="var(--accent-1)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <circle cx="110" cy="120" r="10" fill="var(--accent-1)" />
                <path
                  d="M110 180L140 230L80 230Z"
                  stroke="var(--accent-1)"
                  strokeWidth="2"
                />
                <line
                  x1="110"
                  y1="40"
                  x2="110"
                  y2="10"
                  stroke="var(--accent-1)"
                  strokeWidth="1"
                />
                <line
                  x1="65"
                  y1="75"
                  x2="35"
                  y2="55"
                  stroke="var(--accent-1)"
                  strokeWidth="1"
                />
                <line
                  x1="155"
                  y1="75"
                  x2="185"
                  y2="55"
                  stroke="var(--accent-1)"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          )}

          {hoveredRealm === "ai" && (
            <motion.div
              key="neuron"
              className="void-sprite"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <svg
                width="220"
                height="400"
                viewBox="0 0 220 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Neuron Silhouette</title>
                <path
                  d="M110 25C130 25 145 40 145 60C145 75 135 90 135 110L145 150L185 240L165 390L55 390L35 240L75 150L85 110C85 90 75 75 75 60C75 40 90 25 110 25Z"
                  fill="var(--accent-1)"
                  opacity="0.65"
                />
                <circle
                  cx="110"
                  cy="60"
                  r="18"
                  stroke="var(--accent-1)"
                  strokeWidth="2"
                />
                <circle cx="110" cy="60" r="4" fill="var(--accent-1)" />
                <circle cx="100" cy="52" r="2" fill="var(--accent-1)" />
                <circle cx="120" cy="52" r="2" fill="var(--accent-1)" />
                <circle cx="100" cy="68" r="2" fill="var(--accent-1)" />
                <circle cx="120" cy="68" r="2" fill="var(--accent-1)" />
                <line
                  x1="100"
                  y1="52"
                  x2="110"
                  y2="60"
                  stroke="var(--accent-1)"
                  strokeWidth="1"
                />
                <line
                  x1="120"
                  y1="52"
                  x2="110"
                  y2="60"
                  stroke="var(--accent-1)"
                  strokeWidth="1"
                />
                <line
                  x1="100"
                  y1="68"
                  x2="110"
                  y2="60"
                  stroke="var(--accent-1)"
                  strokeWidth="1"
                />
                <line
                  x1="120"
                  y1="68"
                  x2="110"
                  y2="60"
                  stroke="var(--accent-1)"
                  strokeWidth="1"
                />
                <path
                  d="M85 180H135"
                  stroke="var(--accent-1)"
                  strokeWidth="2"
                />
                <path
                  d="M90 200H130"
                  stroke="var(--accent-1)"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ZONE B: CHARACTER PORTRAIT CARD */}
      <div className="portrait-card">
        <CharacterPortraitWindow hoveredRealm={hoveredRealm} />
      </div>

      {/* Main menu contents (Title, Stats, Links) */}
      <PersonaMenu />

      {/* Metadata footer */}
      <div className="meta">DHRUV MALVIYA — PORTFOLIO V2</div>

      {/* Corner ticks */}
      <div className="tick tl" />
      <div className="tick br" />
    </main>
  );
}

function CharacterPortraitWindow({
  hoveredRealm,
}: {
  hoveredRealm: string | null;
}) {
  const { activeRealmId } = usePortfolioStore();

  if (!hoveredRealm) {
    return (
      <div className="portrait-card-back">
        {/* Rotating Tarot / Gear Design */}
        <div className="portrait-tarot-design">
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <title>Tarot Card Design</title>
            <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="30" />
            <polygon points="50,5 95,50 50,95 5,50" />
            <polygon points="50,20 80,50 50,80 20,50" />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
          </svg>
        </div>
        <div className="mt-4 font-display text-xs tracking-[0.25em] text-[#e8e3d8] font-bold text-center">
          LEAF.EXE CORE
        </div>
        <div className="text-[8px] font-mono text-zinc-500 uppercase mt-1">
          Awaiting Selection...
        </div>
        <AudioVisualizer activeRealmId={activeRealmId} />
      </div>
    );
  }

  const details = {
    fs: {
      name: "FORGE",
      role: "ARCHITECT",
      classTitle: "ENGINEER",
      stats: [
        { label: "STR", val: 90 },
        { label: "MAG", val: 70 },
        { label: "AGI", val: 85 },
        { label: "LUK", val: 60 },
      ],
      color: "#00FFFF",
      svg: (
        <svg
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Forge Profile</title>
          <path
            d="M50 15L80 45V75L90 85V110H10V85L20 75V45L50 15Z"
            fill="#00FFFF"
            opacity="0.4"
          />
          <circle cx="50" cy="50" r="12" stroke="#00FFFF" strokeWidth="2" />
          <line
            x1="50"
            y1="62"
            x2="50"
            y2="100"
            stroke="#00FFFF"
            strokeWidth="2"
          />
          <rect x="25" y="85" width="50" height="4" fill="#00FFFF" />
        </svg>
      ),
    },
    ds: {
      name: "ORACLE",
      role: "WRITER",
      classTitle: "ANALYST",
      stats: [
        { label: "STR", val: 50 },
        { label: "MAG", val: 95 },
        { label: "AGI", val: 75 },
        { label: "LUK", val: 85 },
      ],
      color: "#FFB800",
      svg: (
        <svg
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Oracle Profile</title>
          <path
            d="M50 20C35 20 20 35 20 60C20 85 10 95 10 110H90C90 95 80 85 80 60C80 35 65 20 50 20Z"
            fill="#FFB800"
            opacity="0.4"
          />
          <circle
            cx="50"
            cy="55"
            r="16"
            stroke="#FFB800"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <circle cx="50" cy="55" r="6" fill="#FFB800" />
          <line
            x1="50"
            y1="71"
            x2="50"
            y2="110"
            stroke="#FFB800"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    ai: {
      name: "NEURON",
      role: "BUILDER",
      classTitle: "SYNAPSE",
      stats: [
        { label: "STR", val: 70 },
        { label: "MAG", val: 99 },
        { label: "AGI", val: 80 },
        { label: "LUK", val: 90 },
      ],
      color: "#39FF14",
      svg: (
        <svg
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Neuron Profile</title>
          <path
            d="M50 15C65 15 75 25 75 40C75 55 85 70 85 110H15C15 70 25 55 25 40C25 25 35 15 50 15Z"
            fill="#39FF14"
            opacity="0.4"
          />
          <circle cx="50" cy="45" r="10" stroke="#39FF14" strokeWidth="1.5" />
          <path
            d="M35 80C35 80 40 70 50 70C60 70 65 80 65 80"
            stroke="#39FF14"
            strokeWidth="2"
          />
          <circle cx="50" cy="45" r="3" fill="#39FF14" />
        </svg>
      ),
    },
  }[hoveredRealm as "fs" | "ds" | "ai"];

  if (!details) {
    return (
      <div className="portrait-card-back">
        {/* Rotating Tarot / Gear Design */}
        <div className="portrait-tarot-design">
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <title>Tarot Card Design</title>
            <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="30" />
            <polygon points="50,5 95,50 50,95 5,50" />
            <polygon points="50,20 80,50 50,80 20,50" />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
          </svg>
        </div>
        <div className="mt-4 font-display text-xs tracking-[0.25em] text-[#e8e3d8] font-bold text-center">
          LEAF.EXE CORE
        </div>
        <div className="text-[8px] font-mono text-zinc-500 uppercase mt-1">
          Awaiting Selection...
        </div>
        <AudioVisualizer activeRealmId={activeRealmId} />
      </div>
    );
  }

  return (
    <div
      className="portrait-card-front"
      style={{ "--accent-1": details.color } as React.CSSProperties}
    >
      <div className="portrait-card-header">
        {details.name}
        {" // "}
        {details.role}
      </div>
      <div className="portrait-card-body">
        <div className="portrait-card-img">{details.svg}</div>
        <div className="portrait-card-info">
          <div className="portrait-card-info-row font-bold text-zinc-400">
            <span>CLASS</span>
            <span className="portrait-card-info-val">{details.classTitle}</span>
          </div>
          {details.stats.map((s) => (
            <div key={s.label} className="portrait-card-info-row">
              <span>{s.label}</span>
              <span className="portrait-card-info-val">{s.val}</span>
            </div>
          ))}
        </div>
      </div>
      <AudioVisualizer activeRealmId={activeRealmId} />
    </div>
  );
}

function AudioVisualizer({ activeRealmId }: { activeRealmId: string }) {
  const trackNames: Record<string, string> = {
    hub: "VELVET_ROOM.MP3",
    fs: "CYBER_CITY_95.MP3",
    ds: "STEINS_GATE.MP3",
    ai: "MAGI_SYS_CALC.MP3",
    about: "SPIRAL_ENERGY.MP3",
    connect: "CHILL_HOP.MP3",
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-3 w-full bg-black/30 p-2 rounded border border-white/5">
      <style>{`
        @keyframes audio-bar {
          0% { height: 20%; }
          100% { height: 100%; }
        }
        .audio-bar {
          width: 3px;
          background-color: rgba(255,255,255,0.7);
          animation: audio-bar 0.5s ease-in-out infinite alternate;
        }
      `}</style>
      <div className="flex items-end gap-[3px] h-3">
        <div className="audio-bar" style={{ animationDelay: '0s', animationDuration: '0.4s' }} />
        <div className="audio-bar" style={{ animationDelay: '0.2s', animationDuration: '0.5s' }} />
        <div className="audio-bar" style={{ animationDelay: '0.4s', animationDuration: '0.3s' }} />
        <div className="audio-bar" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }} />
      </div>
      <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest w-32 truncate">
        {trackNames[activeRealmId] || trackNames.hub}
      </div>
    </div>
  );
}
