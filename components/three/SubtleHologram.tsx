"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Float, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";

const VIDEO_PATHS: Record<string, string> = {
  hub: "/assets/videos/hub.webm",
  fs: "/assets/videos/fs.webm",
  ds: "/assets/videos/ds.webm",
  ai: "/assets/videos/ai.webm",
  about: "/assets/videos/about.webm",
  connect: "/assets/videos/connect.webm",
};

interface SubtleHologramProps {
  position?: [number, number, number];
  color?: string;
  activeRealmId: string;
}

export default function SubtleHologram({
  position = [0, 8, -25],
  color = "#FF2D55",
  activeRealmId = "hub",
}: SubtleHologramProps) {
  return (
    <Float position={position} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Billboard>
        {Object.entries(VIDEO_PATHS).map(([id, path]) => (
          <HologramLayer key={id} id={id} path={path} activeRealmId={activeRealmId} color={color} />
        ))}
      </Billboard>
    </Float>
  );
}

function HologramLayer({ id, path, activeRealmId, color }: { id: string; path: string; activeRealmId: string; color: string }) {
  // useVideoTexture suspends until the video is loaded and ready
  const texture = useVideoTexture(path, {
    loop: true,
    muted: true,
    start: true,
  });
  
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      const isActive = id === activeRealmId;
      const targetOpacity = isActive ? 0.25 : 0;
      
      // Smoothly lerp the opacity (using a factor like 2.0 to crossfade over ~1 second)
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        targetOpacity,
        delta * 2.0
      );

      // Optional: Add a subtle flickering glitch effect to the active hologram
      if (isActive && materialRef.current.opacity > 0.1) {
        const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05;
        materialRef.current.opacity = targetOpacity + pulse;
      }
    }
  });

  return (
    <mesh>
      <planeGeometry args={[15, 20]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent={true}
        color={color}
        opacity={0} // Start invisible
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
