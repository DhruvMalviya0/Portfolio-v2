"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  vy: number;
  depth: number;
  opacity: number;
}

export function CanvasEffects() {
  const [isBooting, setIsBooting] = useState(true);
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Handle CRT static timer (once per session)
  useEffect(() => {
    const hasBooted = sessionStorage.getItem("leaf_booted");
    if (hasBooted) {
      setIsBooting(false);
    } else {
      const timer = setTimeout(() => {
        setIsBooting(false);
        sessionStorage.setItem("leaf_booted", "true");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 1. Render Loop for CRT static noise (when booting)
  useEffect(() => {
    if (!isBooting) return;
    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animId: number;

    const drawStatic = () => {
      const width = canvas.width;
      const height = canvas.height;
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;

      // Draw random black/white/gray static pixels
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val; // R
        data[i + 1] = val; // G
        data[i + 2] = val; // B
        data[i + 3] = 255; // A
      }

      ctx.putImageData(imgData, 0, 0);

      // Overlay horizontal scanlines
      ctx.fillStyle = "rgba(12, 12, 12, 0.15)";
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 2);
      }

      // Vignette effect
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.3,
        width / 2,
        height / 2,
        width * 0.7,
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.85)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(drawStatic);
    };

    drawStatic();

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
  }, [isBooting]);

  // 2. Render Loop for Drifting Parallax Particles
  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const canvas = dustCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animId: number;

    // Initialize 40 particles
    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1, // 1 to 3 px
      vy: -(Math.random() * 0.4 + 0.1), // upward drift velocity
      depth: Math.random() * 0.8 + 0.2, // depth factor for parallax
      opacity: Math.random() * 0.2 + 0.05,
    }));

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        // Drifting translation
        if (!prefersReducedMotion) {
          p.y += p.vy;
          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
        }

        // Mouse parallax offsets
        const parallaxX = mouseRef.current.x * p.depth * 0.05;
        const parallaxY = mouseRef.current.y * p.depth * 0.05;

        // Render square particles
        ctx.fillStyle = `rgba(232, 227, 216, ${p.opacity})`;
        ctx.fillRect(p.x + parallaxX, p.y + parallaxY, p.size, p.size);
      }

      animId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

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
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: isBooting ? 99999 : 2, // Dust sits behind text content (z-index: 2), Static noise covers all (z-index: 99999)
      }}
    >
      {isBooting && (
        <canvas
          ref={staticCanvasRef}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            background: "#0c0c0c",
          }}
        />
      )}
      <canvas
        ref={dustCanvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: isBooting ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />
    </div>
  );
}
