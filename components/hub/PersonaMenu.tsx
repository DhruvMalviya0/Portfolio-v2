"use client";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Fragment, useEffect, useRef, useState } from "react";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { HUB_MENU_ITEMS, type RealmId } from "@/lib/realmConfig";
import { usePortfolioStore } from "@/lib/store";

// Clean Web Audio API Synthesizer for Sequencer
function playSequencerSound(type: "kick" | "chime") {
  if (typeof window === "undefined") return;
  const AudioContextClass =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === "kick") {
      // Deep bass kick
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);
    } else {
      // Crisp high chime
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (_e) {}
}

export function PersonaMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Interactive tooltips state
  const [hpTooltip, setHpTooltip] = useState<string | null>(null);
  const [mpTooltip, setMpTooltip] = useState<string | null>(null);

  const { setHoveredRealm, setActiveEgg, setActiveRealmId } = usePortfolioStore();

  // Track whether the "ABOUT" intro VN has already been shown
  const hasShownIntroRef = useRef(false);

  // Tap Sequencer States
  const [sequencerActive, setSequencerActive] = useState(false);
  const [hpSteps, setHpSteps] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
  ]);
  const [mpSteps, setMpSteps] = useState([
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [playhead, setPlayhead] = useState(0);

  const hpStepsRef = useRef(hpSteps);
  const mpStepsRef = useRef(mpSteps);

  useEffect(() => {
    hpStepsRef.current = hpSteps;
  }, [hpSteps]);

  useEffect(() => {
    mpStepsRef.current = mpSteps;
  }, [mpSteps]);

  // Sequencer loop scanning
  useEffect(() => {
    if (!sequencerActive) return;

    const interval = setInterval(() => {
      setPlayhead((p) => {
        const nextP = (p + 1) % 10;
        if (hpStepsRef.current[nextP]) {
          playSequencerSound("chime");
        }
        if (mpStepsRef.current[nextP]) {
          playSequencerSound("kick");
        }
        return nextP;
      });
    }, 280); // steady rhythm loop

    return () => clearInterval(interval);
  }, [sequencerActive]);

  useEffect(() => {
    const items = menuRef.current?.querySelectorAll(".menu-item");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Title slides in from left
    tl.fromTo(
      titleRef.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 },
    );

    // Menu items stagger in
    if (items) {
      tl.fromTo(
        items,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
        "-=0.2",
      );
    }

    // Stats fade in
    tl.fromTo(
      statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 },
      "-=0.3",
    );
  }, []);

  const springConfig = { type: "spring" as const, stiffness: 450, damping: 17 };

  return (
    <div style={{ display: "contents" }}>
      {/* Title block */}
      <div ref={titleRef} className="title-block">
        <span className="eyebrow">SELECT REALM</span>
        <div className="title font-display">
          LEAF
          <br />
          .EXE
        </div>
      </div>

      {/* HP/MP segmented stats */}
      <div ref={statsRef} className="stats">
        {sequencerActive && (
          <div className="text-[8px] font-mono text-zinc-400 mb-2 uppercase tracking-widest animate-pulse">
            [ SEQUENCER ACTIVE — CLICK SEGS TO EDIT PATTERN ]
          </div>
        )}
        <div
          className="stat-row cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => setSequencerActive(!sequencerActive)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSequencerActive(!sequencerActive);
            }
          }}
          onMouseEnter={() =>
            setHpTooltip(
              sequencerActive
                ? "Click segments to edit hi-hat. Click stat row to Pause."
                : "HP: 70%. Click to start interactive drum machine.",
            )
          }
          onMouseLeave={() => setHpTooltip(null)}
          style={{ position: "relative", outline: "none" }}
        >
          <span className="stat-label">HP</span>
          <div className="stat-bar">
            {hpSteps.map((isFilled, i) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: step sequencer segment toggle
              <div
                key={`hp-${i}`}
                onClick={(e) => {
                  if (sequencerActive) {
                    e.stopPropagation(); // prevent pausing loop
                    setHpSteps((prev) => {
                      const next = [...prev];
                      next[i] = !next[i];
                      return next;
                    });
                    playSequencerSound("chime");
                  }
                }}
                className={`stat-seg ${isFilled ? "fill" : ""}`}
                style={{
                  cursor: sequencerActive ? "pointer" : "inherit",
                  boxShadow:
                    sequencerActive && i === playhead
                      ? "0 0 10px #ffffff, inset 0 0 10px #ffffff"
                      : undefined,
                  borderColor:
                    sequencerActive && i === playhead ? "#ffffff" : undefined,
                  borderWidth:
                    sequencerActive && i === playhead ? "1px" : undefined,
                  transform:
                    sequencerActive && i === playhead
                      ? "scale(1.1) skewX(-20deg)"
                      : undefined,
                  transition: "transform 0.1s, box-shadow 0.1s",
                }}
              />
            ))}
          </div>
          {hpTooltip && (
            <div className="stat-tooltip font-mono">{hpTooltip}</div>
          )}
        </div>
        <div
          className="stat-row cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => setSequencerActive(!sequencerActive)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSequencerActive(!sequencerActive);
            }
          }}
          onMouseEnter={() =>
            setMpTooltip(
              sequencerActive
                ? "Click segments to edit bass kick. Click stat row to Pause."
                : "MP: 40%. Click to start interactive drum machine.",
            )
          }
          onMouseLeave={() => setMpTooltip(null)}
          style={{ position: "relative", outline: "none" }}
        >
          <span className="stat-label">MP</span>
          <div className="stat-bar">
            {mpSteps.map((isFilled, i) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: step sequencer segment toggle
              <div
                key={`mp-${i}`}
                onClick={(e) => {
                  if (sequencerActive) {
                    e.stopPropagation(); // prevent pausing loop
                    setMpSteps((prev) => {
                      const next = [...prev];
                      next[i] = !next[i];
                      return next;
                    });
                    playSequencerSound("kick");
                  }
                }}
                className={`stat-seg ${isFilled ? "fill mp" : ""}`}
                style={{
                  cursor: sequencerActive ? "pointer" : "inherit",
                  boxShadow:
                    sequencerActive && i === playhead
                      ? "0 0 10px #ffffff, inset 0 0 10px #ffffff"
                      : undefined,
                  borderColor:
                    sequencerActive && i === playhead ? "#ffffff" : undefined,
                  borderWidth:
                    sequencerActive && i === playhead ? "1px" : undefined,
                  transform:
                    sequencerActive && i === playhead
                      ? "scale(1.1) skewX(-20deg)"
                      : undefined,
                  transition: "transform 0.1s, box-shadow 0.1s",
                }}
              />
            ))}
          </div>
          {mpTooltip && (
            <div className="stat-tooltip font-mono">{mpTooltip}</div>
          )}
        </div>
      </div>

      {/* Menu block */}
      <div
        ref={menuRef}
        className="menu"
        onMouseLeave={() => {
          setHoveredRealm(null);
          setActiveRealmId("hub");
        }}
      >
        {HUB_MENU_ITEMS.map((item, idx) => {
          const numStr = String(idx + 1).padStart(2, "0");
          const isActive = idx === activeIndex;

          return (
            <Fragment key={item.href}>
              {idx === 3 && <div className="menu-divider" />}
              <TransitionLink
                href={item.href}
                targetRealm={item.realm as RealmId}
                className={`menu-item ${isActive ? "active" : ""}`}
                style={{ outline: "none" }}
                onMouseEnter={() => {
                  setActiveIndex(idx);
                  setHoveredRealm(item.realm as RealmId);
                  setActiveRealmId((item.realm as string) || "hub");
                  if (item.label === "ABOUT" && !hasShownIntroRef.current) {
                    hasShownIntroRef.current = true;
                    setActiveEgg("vn");
                  }
                }}
              >
                <span className="menu-num">{numStr}</span>
                <motion.span
                  className="menu-label font-display"
                  animate={{ x: isActive ? 10 : 0 }}
                  transition={springConfig}
                >
                  {item.label}
                </motion.span>
              </TransitionLink>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
