"use client";

import { useEffect, useState } from "react";
import { EDUCATION } from "@/lib/content";

const START = new Date("2024-08-01");
const END = new Date("2028-06-30");
const DAY = 86_400_000;

/** Persona calendar — how far through the degree we are, counted in days. */
export function EducationSection() {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const total = Math.round((END.getTime() - START.getTime()) / DAY);
  const day = today
    ? Math.min(
        total,
        Math.max(0, Math.round((today.getTime() - START.getTime()) / DAY)),
      )
    : 0;
  const pct = Math.round((day / total) * 100);
  const year = Math.min(4, Math.floor(day / 365) + 1);

  return (
    <div className="calendar-layout">
      {EDUCATION.map((e) => (
        <article key={e.school} className="calendar-card intro-left">
          <div className="calendar-range">
            <span className="calendar-year">2024</span>
            <span className="calendar-arrow" aria-hidden>
              ▶
            </span>
            <span className="calendar-year future">2028</span>
          </div>
          <h2 className="calendar-school">{e.school}</h2>
          <p className="calendar-program">{e.program}</p>
          <p className="calendar-via">{e.via}</p>

          <div
            className="calendar-progress"
            role="progressbar"
            aria-label="Degree progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={today ? pct : 0}
          >
            <div className="calendar-bar">
              <span style={{ width: today ? `${pct}%` : "0%" }} />
            </div>
            <p className="calendar-day">
              <span className="calendar-day-count">
                DAY <b>{today ? day : "—"}</b> / {total}
              </span>
              <span>
                YEAR {today ? year : "—"} · {today ? pct : "—"}%
              </span>
            </p>
          </div>

          <ul className="calendar-notes">
            {e.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className="calendar-place">{e.place}</p>
        </article>
      ))}

      <aside className="calendar-week intro-up" aria-label="This week">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, i) => (
          <div
            key={d}
            className={`calendar-cell ${today && (today.getDay() + 6) % 7 === i ? "today" : ""}`}
          >
            <span>{d}</span>
            <b>
              {["CLASS", "BUILD", "CLASS", "DSA", "CLASS", "HACK", "REST?"][i]}
            </b>
          </div>
        ))}
      </aside>
    </div>
  );
}
