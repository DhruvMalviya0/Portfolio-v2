"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  sprite: HTMLCanvasElement;
}

const COLORS = ["#FFB800", "#C0392B", "#FF6B35", "#FFE000"];

/** Pre-render one soft glow per colour; drawing a bitmap is far cheaper
 *  than building a radial gradient per orb per frame. */
const makeSprite = (color: string) => {
  const s = document.createElement("canvas");
  s.width = s.height = 64;
  const c = s.getContext("2d");
  if (c) {
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, color);
    g.addColorStop(0.35, `${color}aa`);
    g.addColorStop(1, `${color}00`);
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
  }
  return s;
};

export function OrbBurstTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#1A1040";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const sprites = COLORS.map(makeSprite);

    const orbs: Orb[] = Array.from({ length: 70 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 18 + 6;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 22 + 8,
        alpha: 1,
        sprite: sprites[(Math.random() * sprites.length) | 0],
      };
    });

    let animId = 0;
    const draw = () => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(26, 16, 64, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.alpha -= 0.014;
        orb.radius *= 0.99;
        if (orb.alpha <= 0) continue;
        const d = orb.radius * 4;
        ctx.globalAlpha = orb.alpha;
        ctx.drawImage(orb.sprite, orb.x - d / 2, orb.y - d / 2, d, d);
      }
      ctx.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden />;
}
