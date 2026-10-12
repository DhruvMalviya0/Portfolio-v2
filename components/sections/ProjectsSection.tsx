"use client";

import { AnimatePresence, motion } from "framer-motion";
import { projectsFor } from "@/lib/content";
import type { RealmId } from "@/lib/realmConfig";
import { sfx } from "@/lib/sfx";
import { useMenuNav } from "@/lib/useMenuNav";

const KIND_LABEL = {
  PERSONAL: "SOLO",
  HACKATHON: "HACKATHON",
  TEAM: "TEAM",
} as const;

export function ProjectsSection({ realm }: { realm: RealmId | null }) {
  const projects = projectsFor(realm);
  const [active, setActive] = useMenuNav({
    count: projects.length,
    onConfirm: (i) => {
      const url = projects[i].repo;
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    },
  });
  const p = projects[active];

  return (
    <div className="confidants">
      <ul className="confidant-list" aria-label="Projects">
        {projects.map((proj, i) => (
          <li
            key={proj.id}
            className="intro-item"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <button
              type="button"
              className={`confidant ${i === active ? "active" : ""}`}
              onClick={() => {
                sfx.confirm();
                setActive(i);
              }}
              onMouseEnter={() => {
                if (i !== active) sfx.move();
                setActive(i);
              }}
              aria-pressed={i === active}
            >
              <span className="confidant-arcana">{proj.codename}</span>
              <span className="confidant-title">
                {proj.title.split(" —")[0]}
              </span>
              <span className="confidant-rank">
                {proj.rank === 10 ? "MAX" : `RANK ${proj.rank}`}
              </span>
              {proj.kind !== "PERSONAL" && (
                <span className="confidant-kind">{KIND_LABEL[proj.kind]}</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence mode="wait">
        <motion.article
          key={p.id}
          className="confidant-detail"
          initial={{ x: 40, opacity: 0, rotate: 1.5 }}
          animate={{ x: 0, opacity: 1, rotate: -1 }}
          exit={{ x: -30, opacity: 0, rotate: -3 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="detail-top">
            <span className="detail-codename">{p.codename}</span>
            <span className="detail-period">{p.period}</span>
          </div>
          <h2 className="detail-title">{p.title}</h2>
          <div
            className="detail-rank"
            role="img"
            aria-label={`Confidant rank ${p.rank} of 10`}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <i key={`r-${i}`} className={i < p.rank ? "on" : ""} />
            ))}
            <span>{p.rank === 10 ? "RANK MAX" : `RANK ${p.rank}`}</span>
          </div>
          {p.badge && <p className="detail-badge">★ {p.badge}</p>}
          <p className="detail-summary">{p.summary}</p>
          <ul className="detail-highlights">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <div className="detail-stack">
            {p.stack.map((s) => (
              <span key={s} className="skill-tag">
                {s}
              </span>
            ))}
          </div>
          <div className="detail-links">
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-btn"
              >
                SOURCE ↗
              </a>
            )}
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-btn alt"
              >
                {p.live.includes("github.com") ? "COMPANION ↗" : "LIVE ↗"}
              </a>
            )}
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
