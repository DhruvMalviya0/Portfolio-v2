"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import SubtleHologram from "./SubtleHologram";
import { Suspense } from "react";
import { usePortfolioStore } from "@/lib/store";

export default function Scene() {
  const { currentRealm, activeRealmId } = usePortfolioStore();

  // Match the fog color to the realm's background color.
  // Default to Persona red/hub background if not matched.
  let fogColor = "#0c0c0c";
  if (currentRealm === "fs") fogColor = "#0a0a1a";
  if (currentRealm === "ds") fogColor = "#1a1040";
  if (currentRealm === "ai") fogColor = "#050505";

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={[fogColor, 15, 40]} />
        <Suspense fallback={null}>
          <SubtleHologram position={[0, 5, -25]} color="#FF2D55" activeRealmId={activeRealmId} />
        </Suspense>
        
        {/* Ambient data shards / cyber-sakura petals */}
        <Sparkles 
          position={[0, -5, -15]} 
          count={50} 
          scale={15} 
          size={2} 
          speed={0.2} 
          color="#FF2D55" 
          opacity={0.3} 
        />
      </Canvas>
    </div>
  );
}
