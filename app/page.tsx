"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PersonaMenu } from "@/components/hub/PersonaMenu";
import { CanvasEffects } from "@/components/ui/CanvasEffects";
import { usePortfolioStore } from "@/lib/store";

// Audio click helper
function playClickSound() {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (_e) {}
}

export default function HubPage() {
  const { hoveredRealm } = usePortfolioStore();
  const [channel, setChannel] = useState(0);

  const cycleChannel = () => {
    playClickSound();
    setChannel((c) => (c + 1) % 5);
  };

  const channelLabels = [
    "CH-00: CRT STATIC",
    "CH-01: COMPILER FEED",
    "CH-02: WAVE ANALYZER",
    "CH-03: CORE STRUCTURE",
    "CH-04: CODE WATERFALL",
  ];

  return (
    <main className="persona-stage">
      {/* Halftone texture overlay */}
      <div className="halftone" />

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

      {/* ZONE B: INTERACTIVE CRT MONITOR */}
      <div
        className="monitor-frame"
        role="button"
        tabIndex={0}
        onClick={cycleChannel}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            cycleChannel();
          }
        }}
      >
        <div className="monitor-screen">
          <div className="monitor-header">
            <span>{channelLabels[channel]}</span>
            <span className="ml-auto font-mono text-[8px] animate-pulse">
              ● LIVE
            </span>
          </div>

          <div className="relative flex-1">
            <MonitorScreen channel={channel} />
          </div>

          <div className="monitor-scanlines" />
          <div className="monitor-flicker" />
        </div>
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

// Monitor Screen Subcomponent to handle different screens
function MonitorScreen({ channel }: { channel: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Channel 0: CRT Static
  useEffect(() => {
    if (channel !== 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const render = () => {
      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [channel]);

  // Channel 1: Compiler logs
  useEffect(() => {
    if (channel !== 1) return;
    setLogs([
      "INITIALIZING COMPILER CORE...",
      "FETCHING DEPS & STACK ALIGNMENT...",
      "SYSTEM STATUS: ONLINE",
    ]);

    const feeds = [
      "GET /fs/about - 200 OK",
      "GET /ds/projects - 200 OK",
      "GET /ai/connect - 200 OK",
      "Compiling Shaders for CodeRain...",
      "Loaded Forge core modules.",
      "Oracle reading data vectors...",
      "Neuron sync weights ready.",
      "Garbage collection executed (18ms)",
      "Database status: CONNECTED",
      "Memory usage: 42% | Load: 0.12",
      "Configuring biometric handshakes...",
    ];

    const timer = setInterval(() => {
      setLogs((prev) => {
        const nextVal = feeds[Math.floor(Math.random() * feeds.length)];
        return [
          ...prev.slice(-8),
          `[${new Date().toLocaleTimeString()}] ${nextVal}`,
        ];
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [channel]);

  // Channel 2: Wave Analyzer
  useEffect(() => {
    if (channel !== 2) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let time = 0;

    const render = () => {
      ctx.fillStyle = "#020202";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(57, 255, 20, 0.8)";

      // Apply accent variables colors if available in root style
      const compStyle = getComputedStyle(document.documentElement);
      const accent =
        compStyle.getPropertyValue("--accent-1").trim() || "#39FF14";
      ctx.strokeStyle = accent;

      // Draw Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 15) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < canvas.height; j += 15) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
      }

      // Draw wave
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const midY = canvas.height / 2;
      ctx.moveTo(0, midY);

      for (let x = 0; x < canvas.width; x++) {
        const y =
          midY +
          Math.sin(x * 0.06 + time) * 15 * Math.cos(x * 0.02 + time * 0.5);
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      time += 0.08;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [channel]);

  // Channel 4: Matrix rain
  useEffect(() => {
    if (channel !== 4) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const cols = Math.floor(canvas.width / 6);
    const yPos = Array(cols).fill(0);

    const render = () => {
      ctx.fillStyle = "rgba(2, 2, 2, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const compStyle = getComputedStyle(document.documentElement);
      ctx.fillStyle =
        compStyle.getPropertyValue("--accent-1").trim() || "#39FF14";
      ctx.font = "8px monospace";

      for (let i = 0; i < cols; i++) {
        const text = String.fromCharCode(33 + Math.random() * 93);
        const x = i * 6;
        const y = yPos[i];
        ctx.fillText(text, x, y);

        if (y > 80 + Math.random() * 10000) {
          yPos[i] = 0;
        } else {
          yPos[i] += 4;
        }
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [channel]);

  if (channel === 0) {
    return (
      <canvas
        ref={canvasRef}
        width={220}
        height={140}
        className="w-full h-full block"
      />
    );
  }

  if (channel === 1) {
    return (
      <div className="monitor-logs font-mono text-[8px] leading-normal text-current h-full overflow-hidden select-none bg-black/40">
        {logs.map((log, idx) => (
          <div key={`log-${idx}`} className="truncate">
            {log}
          </div>
        ))}
      </div>
    );
  }

  if (channel === 2) {
    return (
      <canvas
        ref={canvasRef}
        width={220}
        height={140}
        className="w-full h-full block"
      />
    );
  }

  if (channel === 3) {
    return (
      <div className="monitor-wireframe w-full h-full flex items-center justify-center bg-black/10 select-none">
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-[spin_10s_linear_infinite] opacity-80"
          style={{ transformOrigin: "center" }}
        >
          <title>Wireframe Node</title>
          <polygon points="50,15 90,50 50,85 10,50" />
          <line x1="50" y1="15" x2="50" y2="85" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="var(--bg-primary)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="15" r="3" fill="currentColor" />
          <circle cx="90" cy="50" r="3" fill="currentColor" />
          <circle cx="50" cy="85" r="3" fill="currentColor" />
          <circle cx="10" cy="50" r="3" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (channel === 4) {
    return (
      <canvas
        ref={canvasRef}
        width={220}
        height={140}
        className="w-full h-full block"
      />
    );
  }

  return null;
}
