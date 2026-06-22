"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export function OrbBurstTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const colors = ["#FFB800", "#C0392B", "#FF6B35", "#FFE000"];

    const orbs: Orb[] = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 18 + 6;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 18 + 4,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    let fillAlpha = 0;
    let animId: number;

    const draw = () => {
      // Gradually fill screen with dark color
      ctx.fillStyle = `rgba(26, 16, 64, ${fillAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      fillAlpha = Math.min(fillAlpha + 0.02, 0.15);

      for (const orb of orbs) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.alpha -= 0.012;
        orb.radius *= 0.99;

        if (orb.alpha <= 0) continue;

        ctx.save();
        ctx.globalAlpha = orb.alpha;

        // Glow
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius * 2,
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
        background: "#1A1040",
      }}
    />
  );
}
