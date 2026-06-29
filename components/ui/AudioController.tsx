"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { usePortfolioStore } from "@/lib/store";

const AUDIO_TRACKS: Record<string, string> = {
  hub: "/assets/audio/hub.mp3",
  fs: "/assets/audio/fs.mp3",
  ds: "/assets/audio/ds.mp3",
  ai: "/assets/audio/ai.mp3",
  about: "/assets/audio/about.mp3",
  connect: "/assets/audio/connect.mp3",
};

export const AudioController = () => {
  const { activeRealmId } = usePortfolioStore();
  const tracksRef = useRef<Record<string, Howl>>({});
  const activeTrackRef = useRef<string | null>(null);

  useEffect(() => {
    // Initialize Howls if not already done
    if (Object.keys(tracksRef.current).length === 0) {
      Object.entries(AUDIO_TRACKS).forEach(([realmId, src]) => {
        tracksRef.current[realmId] = new Howl({
          src: [src],
          loop: true,
          volume: 0, // start at 0 for fade in
          preload: true,
        });
      });
    }

    const currentTrackId = activeRealmId || "hub";
    const previousTrackId = activeTrackRef.current;

    // Crossfade logic
    if (previousTrackId !== currentTrackId) {
      // Fade out previous track
      if (previousTrackId && tracksRef.current[previousTrackId]) {
        const prevHowl = tracksRef.current[previousTrackId];
        if (prevHowl.playing()) {
          prevHowl.fade(prevHowl.volume(), 0, 1000);
          // Pause once fade is complete to save resources
          setTimeout(() => {
            if (activeTrackRef.current !== previousTrackId) {
              prevHowl.pause();
            }
          }, 1000);
        }
      }

      // Fade in new track
      if (tracksRef.current[currentTrackId]) {
        const currentHowl = tracksRef.current[currentTrackId];
        if (!currentHowl.playing()) {
          currentHowl.play();
        }
        currentHowl.fade(currentHowl.volume(), 1, 1000);
      }

      activeTrackRef.current = currentTrackId;
    }
  }, [activeRealmId]);

  return null; // This is a headless component for audio
};
