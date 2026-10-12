"use client";

import { useEffect, useRef } from "react";

interface CodeRainProps {
  color?: string;
  background?: string;
}

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF";

export function CodeRainTransition({
  color = "#00FFFF",
  background = "#080810",
}: CodeRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Opaque context is cheaper to composite
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Render at CSS pixel size (DPR 1) — it's a 0.7s effect, not a poster
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const fontSize = 16;
    const columns = Math.ceil(canvas.width / fontSize);
    // Start drops staggered above the screen so it doesn't look like a wall
    const drops = Array.from(
      { length: columns },
      () => -Math.random() * (canvas.height / fontSize) * 0.6,
    );
    const speeds = Array.from({ length: columns }, () => 1 + Math.random());
    ctx.font = `${fontSize}px ui-monospace, monospace`;

    let animId = 0;
    const draw = () => {
      ctx.fillStyle = `${background}22`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < columns; i++) {
        const y = drops[i] * fontSize;
        if (y > 0) {
          const char = CHARS[(Math.random() * CHARS.length) | 0];
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(char, i * fontSize, y);
          ctx.fillStyle = color;
          ctx.fillText(
            CHARS[(Math.random() * CHARS.length) | 0],
            i * fontSize,
            y - fontSize,
          );
        }
        drops[i] += speeds[i];
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animId);
  }, [color, background]);

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden />;
}
