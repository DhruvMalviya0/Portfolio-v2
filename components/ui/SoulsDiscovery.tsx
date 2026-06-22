"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SoulsDiscoveryProps {
  realmId: "fs" | "ds" | "ai";
  title: string;
  subtitle: string;
}

export function SoulsDiscovery({
  realmId,
  title,
  subtitle,
}: SoulsDiscoveryProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check session storage so it only triggers once per session
    const storageKey = `discovered-${realmId}`;
    const alreadyDiscovered = sessionStorage.getItem(storageKey);

    if (!alreadyDiscovered) {
      setShow(true);
      sessionStorage.setItem(storageKey, "true");

      // Play synthesized discovery sound
      if (typeof window !== "undefined") {
        const AudioContextClass =
          window.AudioContext ||
          (window as Window & { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (AudioContextClass) {
          try {
            const ctx = new AudioContextClass();
            // Drone oscillators
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const oscGain = ctx.createGain();

            osc1.type = "sawtooth";
            osc1.frequency.setValueAtTime(55, ctx.currentTime); // Low A1

            osc2.type = "sine";
            osc2.frequency.setValueAtTime(110, ctx.currentTime); // Low A2

            const filter = ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.Q.setValueAtTime(1, ctx.currentTime);
            filter.frequency.setValueAtTime(80, ctx.currentTime);
            filter.frequency.linearRampToValueAtTime(
              320,
              ctx.currentTime + 1.8,
            );

            oscGain.gain.setValueAtTime(0.12, ctx.currentTime);
            oscGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.6);
            oscGain.gain.exponentialRampToValueAtTime(
              0.0001,
              ctx.currentTime + 3.0,
            );

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(oscGain);
            oscGain.connect(ctx.destination);

            osc1.start();
            osc2.start();
            osc1.stop(ctx.currentTime + 3.0);
            osc2.stop(ctx.currentTime + 3.0);
          } catch (e) {
            console.warn("AudioContext failed for discovery", e);
          }
        }
      }

      // Hide after 3.2s
      const timer = setTimeout(() => {
        setShow(false);
      }, 3200);

      return () => clearTimeout(timer);
    }
  }, [realmId]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9995] flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Letterbox bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[15vh] bg-black/95 border-b border-amber-600/30"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Golden glow banner backing */}
          <motion.div
            className="w-full py-8 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(194,120,3,0.15)_0%,rgba(0,0,0,0)_70%)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1
              className="font-serif text-3xl md:text-5xl font-bold tracking-[0.35em] text-[#e8e3d8] text-center select-none uppercase drop-shadow-[0_2px_10px_rgba(194,120,3,0.4)]"
              initial={{ letterSpacing: "0.2em", opacity: 0 }}
              animate={{ letterSpacing: "0.35em", opacity: 1 }}
              transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
              style={{
                fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
              }}
            >
              {title}
            </motion.h1>

            <motion.div
              className="h-[1px] w-64 bg-gradient-to-r from-transparent via-amber-500/80 to-transparent my-3"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 1.0 }}
            />

            <motion.p
              className="font-display font-medium text-[10px] md:text-xs tracking-[0.4em] text-amber-500 text-center select-none uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          {/* Bottom Letterbox bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[15vh] bg-black/95 border-t border-amber-600/30"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
