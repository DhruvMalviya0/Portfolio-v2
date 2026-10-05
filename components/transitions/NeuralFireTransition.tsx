"use client";

import { useEffect, useRef } from "react";

/**
 * NEURON's entry effect: a field of neurons, with impulses firing
 * outward from the centre along synapses.
 */
export function NeuralFireTransition({
  color = "#39FF14",
}: {
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, w, h);

    const N = Math.min(90, Math.round((w * h) / 16000));
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      fired: -1,
    }));
    // Seed impulse at the centre
    nodes.push({ x: w / 2, y: h / 2, fired: 0 });

    // Connect each node to its 3 nearest neighbours
    const edges: [number, number][] = [];
    nodes.forEach((a, i) => {
      nodes
        .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, 3)
        .forEach((o) => {
          edges.push([i, o.j]);
        });
    });

    let frame = 0;
    let animId = 0;
    const draw = () => {
      frame++;
      ctx.fillStyle = "rgba(5,5,5,0.25)";
      ctx.fillRect(0, 0, w, h);

      // Propagate: any node touching a node that fired 4+ frames ago fires
      for (const [a, b] of edges) {
        const na = nodes[a];
        const nb = nodes[b];
        if (na.fired >= 0 && nb.fired < 0 && frame - na.fired > 3)
          nb.fired = frame;
        if (nb.fired >= 0 && na.fired < 0 && frame - nb.fired > 3)
          na.fired = frame;
      }

      ctx.lineWidth = 1.5;
      for (const [a, b] of edges) {
        const na = nodes[a];
        const nb = nodes[b];
        const lit = na.fired >= 0 && nb.fired >= 0;
        const age = lit ? frame - Math.max(na.fired, nb.fired) : 99;
        ctx.strokeStyle = lit && age < 10 ? "#FFFFFF" : lit ? color : "#143d0b";
        ctx.globalAlpha = lit ? Math.max(0.35, 1 - age / 30) : 0.5;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      for (const n of nodes) {
        const lit = n.fired >= 0;
        ctx.fillStyle = lit ? color : "#1f5a12";
        const r = lit && frame - n.fired < 6 ? 5 : 2.5;
        ctx.fillRect(n.x - r, n.y - r, r * 2, r * 2);
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [color]);

  return <canvas ref={canvasRef} className="fx-canvas" aria-hidden />;
}
