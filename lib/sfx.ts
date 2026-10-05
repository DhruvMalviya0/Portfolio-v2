"use client";

import { usePortfolioStore } from "./store";

/*
  Tiny synthesized menu sounds — no audio files to download.
  Everything is gated behind the SFX toggle (off by default).
*/

let ctx: AudioContext | null = null;

const audio = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
};

const blip = (
  freq: number,
  dur: number,
  type: OscillatorType = "square",
  gain = 0.04,
  slideTo?: number,
) => {
  if (!usePortfolioStore.getState().sfxEnabled) return;
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
};

export const sfx = {
  move: () => blip(880, 0.05, "square", 0.025),
  confirm: () => {
    blip(660, 0.08, "square", 0.035);
    setTimeout(() => blip(1320, 0.12, "square", 0.03), 60);
  },
  open: () => blip(220, 0.18, "sawtooth", 0.04, 880),
  close: () => blip(880, 0.14, "sawtooth", 0.03, 220),
  back: () => blip(440, 0.09, "triangle", 0.05, 220),
};
