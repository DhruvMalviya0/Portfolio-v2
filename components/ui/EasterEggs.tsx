"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePortfolioStore } from "@/lib/store";

// Web Audio API Synthesizer Helper
function playSound(
  type:
    | "codec"
    | "ds_discover"
    | "pacman_eat"
    | "hades_thunder"
    | "beat_hit"
    | "vn_click",
) {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();

    if (type === "codec") {
      const playBeep = (time: number, freq: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.04, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.15);
      };
      playBeep(ctx.currentTime, 880);
      playBeep(ctx.currentTime + 0.12, 880);
    } else if (type === "hades_thunder") {
      // Noise buffer for thunder crack
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.setValueAtTime(1, ctx.currentTime);
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 1.2);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      // Low rumble osc
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(60, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(30, ctx.currentTime + 1.0);
      oscGain.gain.setValueAtTime(0.15, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.0);
    } else if (type === "pacman_eat") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "beat_hit") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "vn_click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === "ds_discover") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(65, ctx.currentTime);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(80, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(250, ctx.currentTime + 2.0);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    }
  } catch (e) {
    console.warn("Web Audio API not allowed or failed to initialize", e);
  }
}

const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEggs() {
  const { activeEgg, setActiveEgg } = usePortfolioStore();
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [typedBuffer, setTypedBuffer] = useState("");

  // Listen for keyboard codes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside input/textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      // Check Konami Code
      const key = e.key;
      const targetKey = konamiCode[konamiIdx];

      if (key.toLowerCase() === targetKey.toLowerCase()) {
        const nextIdx = konamiIdx + 1;
        setKonamiIdx(nextIdx);
        if (nextIdx === konamiCode.length) {
          setKonamiIdx(0);
          if (!activeEgg) {
            playSound("codec");
            setActiveEgg("mgs");
          }
        }
      } else {
        // Reset if key mismatch, but check if it's the start of the code
        if (key.toLowerCase() === konamiCode[0].toLowerCase()) {
          setKonamiIdx(1);
        } else {
          setKonamiIdx(0);
        }
      }

      // Track typed letters for "DHRUV" code
      if (key.length === 1) {
        const buffer = (typedBuffer + key.toLowerCase()).slice(-5);
        setTypedBuffer(buffer);
        if (buffer === "dhruv") {
          setTypedBuffer("");
          if (!activeEgg) {
            playSound("pacman_eat");
            setActiveEgg("pacman");
          }
        }
      }

      // Check Hades Boon (Key R)
      if ((key === "r" || key === "R") && !activeEgg) {
        playSound("hades_thunder");
        setActiveEgg("hades");
      }

      // Escape key to dismiss active egg
      if (key === "Escape" && activeEgg) {
        setActiveEgg(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIdx, typedBuffer, activeEgg, setActiveEgg]);

  return (
    <AnimatePresence>
      {activeEgg === "mgs" && (
        <MgsCodecOverlay onClose={() => setActiveEgg(null)} />
      )}
      {activeEgg === "pacman" && (
        <PacmanArcadeOverlay onClose={() => setActiveEgg(null)} />
      )}
      {activeEgg === "hades" && (
        <HadesBoonOverlay onClose={() => setActiveEgg(null)} />
      )}
      {activeEgg === "vn" && <VnOverlay onClose={() => setActiveEgg(null)} />}
    </AnimatePresence>
  );
}

// 1. MGS CODEC OVERLAY
function MgsCodecOverlay({ onClose }: { onClose: () => void }) {
  const [dialogIdx, setDialogIdx] = useState(0);
  const [printedText, setPrintedText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dialogLines = [
    {
      speaker: "DHRUV",
      text: "LEAF, do you copy? I've initialized the portfolio v2 core.",
    },
    {
      speaker: "L.E.A.F.",
      text: "Loud and clear, Dhruv. The halftone patterns are running at maximum density.",
    },
    {
      speaker: "DHRUV",
      text: "Excellent. Let's hope the user discovers all the hidden compartments.",
    },
    {
      speaker: "L.E.A.F.",
      text: "Affirmative. Ready to execute code updates on your command. Stay safe.",
    },
  ];

  const currentLine = dialogLines[dialogIdx];

  // Typing effect
  useEffect(() => {
    setPrintedText("");
    let charIdx = 0;
    const text = currentLine.text;
    const interval = setInterval(() => {
      setPrintedText((prev) => prev + text.charAt(charIdx));
      charIdx++;
      if (charIdx >= text.length) {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [currentLine.text]);

  // Codec signal wave canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#39FF14";
      ctx.lineWidth = 2;
      ctx.beginPath();

      const midY = canvas.height / 2;
      ctx.moveTo(0, midY);

      for (let x = 0; x < canvas.width; x++) {
        const factor =
          Math.sin(x * 0.05 + time) * Math.cos(x * 0.02 + time * 0.5);
        const y = midY + factor * 14 * Math.sin(time * 2);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      time += 0.1;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleNext = () => {
    playSound("vn_click");
    if (dialogIdx + 1 < dialogLines.length) {
      setDialogIdx(dialogIdx + 1);
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9990] flex items-center justify-center"
      style={{
        background: "rgba(10, 16, 10, 0.85)",
        backdropFilter: "blur(4px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-4xl p-6 border-2 border-[#39FF14] bg-[#0c140c] text-[#39FF14] font-mono shadow-[0_0_20px_rgba(57,255,20,0.3)]">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#39FF14] pb-2 mb-6">
          <span className="text-sm font-bold tracking-wider">
            MEMORY CARD CORE CONSOLE
          </span>
          <span className="text-xl font-bold">140.96 MHz</span>
        </div>

        {/* Portraits and Wave */}
        <div className="grid grid-cols-3 gap-6 items-center mb-6">
          {/* Left Portrait: Dhruv */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-40 border-2 border-[#39FF14] relative bg-[#152515] overflow-hidden flex items-end justify-center">
              {/* Halftone / scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.1)_50%,transparent_50%)] bg-[length:100%_4px]" />
              <svg
                width="100%"
                height="85%"
                viewBox="0 0 100 100"
                fill="none"
                className="opacity-80"
              >
                <title>Dhruv Portrait</title>
                <path
                  d="M50,15 C38,15 28,25 28,38 C28,50 35,55 35,62 L32,80 L68,80 L65,62 C65,55 72,50 72,38 C72,25 62,15 50,15 Z"
                  fill="#39FF14"
                />
                <rect x="42" y="32" width="16" height="4" fill="#152515" />
                <circle cx="50" cy="45" r="2" fill="#39FF14" />
              </svg>
            </div>
            <span className="mt-2 text-xs font-bold bg-[#39FF14] text-[#0c140c] px-2 py-0.5 skew-x-[-10deg]">
              DHRUV
            </span>
          </div>

          {/* Center Signal Wave */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-xs text-center mb-2 uppercase opacity-75">
              TRANSCEIVER CHANNEL
            </div>
            <canvas
              ref={canvasRef}
              width={200}
              height={60}
              className="w-full border border-dashed border-[#39FF14]/50"
            />
            <div className="text-[10px] text-center mt-2 opacity-50">
              STABLE SIGNAL ACTIVE
            </div>
          </div>

          {/* Right Portrait: L.E.A.F. */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-40 border-2 border-[#39FF14] relative bg-[#152515] overflow-hidden flex items-end justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.1)_50%,transparent_50%)] bg-[length:100%_4px]" />
              <svg
                width="100%"
                height="85%"
                viewBox="0 0 100 100"
                fill="none"
                className="opacity-80"
              >
                <title>L.E.A.F. Portrait</title>
                <path
                  d="M50,12 C40,12 32,20 32,32 L36,55 L32,80 L68,80 L64,55 L68,32 C68,20 60,12 50,12 Z"
                  fill="#39FF14"
                />
                <circle cx="50" cy="30" r="4" fill="#152515" />
                <path d="M45,45 L55,45 L50,55 Z" fill="#39FF14" />
              </svg>
            </div>
            <span className="mt-2 text-xs font-bold bg-[#39FF14] text-[#0c140c] px-2 py-0.5 skew-x-[-10deg]">
              L.E.A.F.
            </span>
          </div>
        </div>

        {/* Textbox */}
        <div className="border-2 border-[#39FF14] p-4 min-h-[90px] bg-[#070b07] relative">
          <div className="text-xs opacity-60 mb-1">{currentLine.speaker}:</div>
          <div className="text-sm font-semibold tracking-wide leading-relaxed">
            {printedText}
            <span className="inline-block w-2 h-4 bg-[#39FF14] ml-0.5 animate-pulse" />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-between items-center mt-4 text-xs">
          <span>[ESC] TO EXIT CODEC</span>
          <button
            type="button"
            onClick={handleNext}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNext();
              }
            }}
            className="border border-[#39FF14] hover:bg-[#39FF14] hover:text-[#0c140c] px-3 py-1 font-bold transition-colors cursor-pointer"
          >
            {dialogIdx + 1 < dialogLines.length ? "NEXT >>" : "DISCONNECT"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// 2. PAC-MAN RETRO ARCADE OVERLAY
interface PacmanState {
  x: number;
  y: number;
  dir: string;
}

interface GhostState {
  x: number;
  y: number;
  color: string;
}

function PacmanArcadeOverlay({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const pacmanRef = useRef<PacmanState>({ x: 40, y: 120, dir: "right" });
  const ghostRef = useRef<GhostState>({ x: 240, y: 120, color: "#FF0000" });

  // Custom simple maze representation (0 = empty, 1 = wall, 2 = pellet)
  const mazeRef = useRef<number[][]>([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]);

  const TILE_SIZE = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouthAngle = 0.2;
    let mouthDir = 0.05;

    // Movement handler
    const handleKeyDown = (e: KeyboardEvent) => {
      const p = pacmanRef.current;
      if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") p.dir = "up";
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") p.dir = "down";
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") p.dir = "left";
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
        p.dir = "right";
    };
    window.addEventListener("keydown", handleKeyDown);

    const checkWall = (newX: number, newY: number) => {
      const tileX = Math.floor(newX / TILE_SIZE);
      const tileY = Math.floor(newY / TILE_SIZE);
      if (
        tileY < 0 ||
        tileY >= mazeRef.current.length ||
        tileX < 0 ||
        tileX >= mazeRef.current[0].length
      )
        return true;
      return mazeRef.current[tileY][tileX] === 1;
    };

    const updateGame = () => {
      const p = pacmanRef.current;
      const g = ghostRef.current;

      let nextX = p.x;
      let nextY = p.y;
      const speed = 2;

      // Update pacman pos
      if (p.dir === "right") nextX += speed;
      if (p.dir === "left") nextX -= speed;
      if (p.dir === "up") nextY -= speed;
      if (p.dir === "down") nextY += speed;

      // Wall collision check
      if (!checkWall(nextX, nextY) && !checkWall(nextX + 15, nextY + 15)) {
        p.x = nextX;
        p.y = nextY;
      }

      // Check eating pellet
      const centerPacX = Math.floor((p.x + 8) / TILE_SIZE);
      const centerPacY = Math.floor((p.y + 8) / TILE_SIZE);
      if (
        centerPacY >= 0 &&
        centerPacY < mazeRef.current.length &&
        centerPacX >= 0 &&
        centerPacX < mazeRef.current[0].length &&
        mazeRef.current[centerPacY][centerPacX] === 2
      ) {
        mazeRef.current[centerPacY][centerPacX] = 0;
        setScore((s) => s + 10);
        playSound("pacman_eat");
      }

      // Dumb ghost movement chasing Pacman
      const gDx = p.x - g.x;
      const gDy = p.y - g.y;
      const gSpeed = 1;
      let gNextX = g.x;
      let gNextY = g.y;

      if (Math.abs(gDx) > Math.abs(gDy)) {
        gNextX += gDx > 0 ? gSpeed : -gSpeed;
      } else {
        gNextY += gDy > 0 ? gSpeed : -gSpeed;
      }

      if (!checkWall(gNextX, gNextY) && !checkWall(gNextX + 15, gNextY + 15)) {
        g.x = gNextX;
        g.y = gNextY;
      }

      // Catch collision
      const dist = Math.hypot(p.x - g.x, p.y - g.y);
      if (dist < 15) {
        // Reset Pacman
        p.x = 40;
        p.y = 120;
        setScore((s) => Math.max(0, s - 50));
      }

      // Pacman mouth wiggle
      mouthAngle += mouthDir;
      if (mouthAngle > 0.45 || mouthAngle < 0.05) {
        mouthDir = -mouthDir;
      }
    };

    const drawGame = () => {
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Maze
      const maze = mazeRef.current;
      for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
          if (maze[y][x] === 1) {
            ctx.fillStyle = "#1A10FF";
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          } else if (maze[y][x] === 2) {
            ctx.fillStyle = "#FFAAA0";
            ctx.beginPath();
            ctx.arc(
              x * TILE_SIZE + TILE_SIZE / 2,
              y * TILE_SIZE + TILE_SIZE / 2,
              3,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
        }
      }

      // Draw Pac-Man
      const p = pacmanRef.current;
      ctx.fillStyle = "#FFFF00";
      ctx.beginPath();
      let rot = 0;
      if (p.dir === "right") rot = 0;
      if (p.dir === "down") rot = Math.PI * 0.5;
      if (p.dir === "left") rot = Math.PI;
      if (p.dir === "up") rot = Math.PI * 1.5;

      ctx.arc(
        p.x + 8,
        p.y + 8,
        8,
        rot + mouthAngle * Math.PI,
        rot + (2 - mouthAngle) * Math.PI,
      );
      ctx.lineTo(p.x + 8, p.y + 8);
      ctx.fill();

      // Draw Ghost
      const g = ghostRef.current;
      ctx.fillStyle = g.color;
      ctx.beginPath();
      ctx.arc(g.x + 8, g.y + 6, 8, Math.PI, 0, false);
      ctx.lineTo(g.x + 16, g.y + 16);
      ctx.lineTo(g.x + 12, g.y + 12);
      ctx.lineTo(g.x + 8, g.y + 16);
      ctx.lineTo(g.x + 4, g.y + 12);
      ctx.lineTo(g.x, g.y + 16);
      ctx.fill();

      // Ghost eyes
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(g.x + 5, g.y + 5, 2.5, 0, Math.PI * 2);
      ctx.arc(g.x + 11, g.y + 5, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#0000FF";
      ctx.beginPath();
      ctx.arc(g.x + 5.5, g.y + 5, 1, 0, Math.PI * 2);
      ctx.arc(g.x + 11.5, g.y + 5, 1, 0, Math.PI * 2);
      ctx.fill();
    };

    const gameLoop = () => {
      updateGame();
      drawGame();
      animId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9990] flex items-center justify-center"
      style={{
        background: "rgba(10, 10, 20, 0.88)",
        backdropFilter: "blur(6px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative border-4 border-yellow-500 bg-[#050510] p-6 text-yellow-400 font-mono shadow-[0_0_30px_rgba(234,179,8,0.4)] max-w-md w-full">
        <div className="flex justify-between items-center border-b border-yellow-500 pb-2 mb-4">
          <span className="font-bold tracking-widest text-lg">
            DHRUV-MAN ARCADE
          </span>
          <span className="font-bold">SCORE: {score}</span>
        </div>

        <div className="flex justify-center border-2 border-blue-900 bg-black p-2">
          <canvas ref={canvasRef} width={300} height={140} className="block" />
        </div>

        <div className="mt-4 text-xs leading-relaxed text-yellow-500/80">
          <p className="font-bold text-yellow-400">CONTROLS:</p>
          <p>• Use Arrow keys or WASD to navigate</p>
          <p>• Avoid the red ghost chasing you</p>
          <p>• Eat all pellets to power the core</p>
        </div>

        <div className="mt-6 flex justify-between items-center text-xs">
          <span>[ESC] TO EXIT PORTABLE DECK</span>
          <button
            type="button"
            onClick={onClose}
            className="border border-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-3 py-1 transition-colors cursor-pointer"
          >
            QUIT
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// 3. HADES BOON OVERLAY
function HadesBoonOverlay({ onClose }: { onClose: () => void }) {
  const boons = [
    {
      title: "ATHENA'S REFACTOR",
      realm: "Full-Stack (Forge)",
      desc: "Instantly clean 30% lines of code and optimize layout rendering speeds.",
      rarity: "EPIC",
      color: "border-[#00FFFF] text-[#00FFFF]",
      icon: "⬡",
    },
    {
      title: "DIONYSUS' PREDICTOR",
      realm: "Data Science (Oracle)",
      desc: "Gain 20% statistical precision on target features and reveal pattern flows.",
      rarity: "RARE",
      color: "border-[#FFB800] text-[#FFB800]",
      icon: "◈",
    },
    {
      title: "ZEUS' STACK SYNC",
      realm: "AI / ML (Neuron)",
      desc: "Double compile performance and accelerate backprop epochs by 40%.",
      rarity: "HEROIC",
      color: "border-[#39FF14] text-[#39FF14]",
      icon: "⬟",
    },
  ];

  const handleSelectBoon = (_bTitle: string) => {
    playSound("hades_thunder");

    // Quick flash effect
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.zIndex = "9999";
    flash.style.background = "#FFFFFF";
    flash.style.opacity = "0.8";
    flash.style.transition = "opacity 0.5s ease-out";
    document.body.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 500);
    }, 50);

    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(circle, rgba(20,8,8,0.92) 0%, rgba(5,2,2,0.98) 100%)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-yellow-600 font-display font-semibold tracking-[0.3em] text-xs">
          CHOOSE YOUR BLESSING
        </span>
        <h2 className="text-amber-100 font-display font-bold text-4xl mt-1 tracking-wider text-shadow-glow">
          THE BOON ACQUISITION
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {boons.map((boon, idx) => (
          <motion.div
            key={boon.title}
            onClick={() => handleSelectBoon(boon.title)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelectBoon(boon.title);
              }
            }}
            tabIndex={0}
            className={`border-2 ${boon.color} bg-black/45 hover:bg-black/90 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 relative group overflow-hidden outline-none`}
            style={{
              clipPath: "polygon(0 4%, 100% 0, 97% 100%, 3% 96%)",
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            {/* Background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl">{boon.icon}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 border border-current tracking-widest bg-black/80">
                  {boon.rarity}
                </span>
              </div>
              <h3 className="font-display font-bold text-xl tracking-wider mb-1">
                {boon.title}
              </h3>
              <p className="text-[10px] text-amber-600 font-mono mb-4 uppercase tracking-wider">
                {boon.realm}
              </p>
              <p className="text-sm text-gray-300 font-body leading-relaxed">
                {boon.desc}
              </p>
            </div>

            <div className="mt-8 text-right text-[10px] font-bold text-gray-500 group-hover:text-amber-500 uppercase tracking-widest transition-colors">
              SELECT BOON +
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-xs text-gray-500 font-mono">
        [ESC] TO CLOSE SELECTOR WITHOUT SELECTING
      </div>
    </motion.div>
  );
}

// 5. VISUAL NOVEL OVERLAY
function VnOverlay({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);

  const dialogSequence = [
    {
      speaker: "NEURON",
      text: "A portfolio is essentially a dimensional gateway between developers and scouts.",
      choices: [
        { text: "What's the meaning behind LEAF.EXE?", next: 1 },
        { text: "Are there any hidden details here?", next: 2 },
      ],
    },
    {
      speaker: "NEURON",
      text: "L.E.A.F. represents the localized ecosystem of logic and front-end architectures that I control.",
      choices: [
        { text: "Tell me about the design style.", next: 3 },
        { text: "Let's reset.", next: 0 },
      ],
    },
    {
      speaker: "NEURON",
      text: "Naturally. Type D-H-R-U-V for an arcade loop, R for Olympus boons, or look at my code rain transitions.",
      choices: [
        { text: "Awesome. I'll search around.", next: 4 },
        { text: "Go back.", next: 0 },
      ],
    },
    {
      speaker: "NEURON",
      text: "Persona menu rules apply: Flat colors, skewed panels, micro-animations, and strict halftone overlays.",
      choices: [{ text: "Makes sense. Let's finish.", next: 4 }],
    },
    {
      speaker: "NEURON",
      text: "Understood. The matrix lock remains active. Explore carefully.",
      choices: [],
    },
  ];

  const current = dialogSequence[step];

  const handleChoice = (next: number) => {
    playSound("vn_click");
    setStep(next);
  };

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 z-[9990] p-6 flex flex-col items-center justify-end"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)",
        height: "60vh",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-4xl flex gap-6 items-end relative">
        {/* Sprite silhouette breathing */}
        <div className="w-64 h-96 relative flex items-end justify-center">
          <motion.div
            animate={{ scale: [1, 1.02, 1], y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full opacity-45 relative flex items-end"
          >
            <svg width="100%" height="90%" viewBox="0 0 100 100" fill="none">
              <title>Neuron Silhouette</title>
              <path
                d="M50,10 C42,10 35,18 35,28 C35,36 38,40 34,50 L20,70 L25,95 L75,95 L80,70 L66,50 C62,40 65,36 65,28 C65,18 58,10 50,10 Z"
                fill="#39FF14"
              />
              {/* Halftone matrix texture */}
              <circle cx="50" cy="28" r="3" fill="#000000" />
            </svg>
          </motion.div>
        </div>

        {/* Textbox block */}
        <div
          className="flex-1 bg-black/90 border-2 border-[#39FF14] text-[#e8e3d8] font-body p-6 relative flex flex-col justify-between"
          style={{
            clipPath: "polygon(0 0, 100% 4%, 98% 100%, 2% 96%)",
            minHeight: "150px",
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-4 z-10 w-7 h-7 flex items-center justify-center text-[#39FF14] hover:bg-[#39FF14] hover:text-black border border-[#39FF14] font-bold text-sm transition-colors cursor-pointer"
            aria-label="Close dialogue"
          >
            ✕
          </button>
          <div>
            <div className="text-xs font-bold text-[#39FF14] uppercase tracking-wider mb-2 font-display">
              {current.speaker}
            </div>
            <p className="text-base leading-relaxed font-medium">
              {current.text}
            </p>
          </div>

          {/* Choices links */}
          <div className="mt-6 flex flex-col gap-2">
            {current.choices.length > 0 ? (
              current.choices.map((choice) => (
                <button
                  type="button"
                  key={choice.text}
                  onClick={() => handleChoice(choice.next)}
                  className="w-full text-left bg-zinc-900/80 hover:bg-[#39FF14] hover:text-black border border-zinc-800 text-xs font-mono font-bold py-2 px-4 transition-colors cursor-pointer"
                >
                  &gt; {choice.text}
                </button>
              ))
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="self-end border border-[#39FF14] hover:bg-[#39FF14] hover:text-black text-xs font-bold px-4 py-1.5 transition-colors cursor-pointer"
              >
                DISMISS
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
