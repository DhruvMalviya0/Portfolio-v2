"use client";

import { useEffect, useState } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const timeOfDay = (h: number) =>
  h < 6
    ? "LATE NIGHT"
    : h < 12
      ? "MORNING"
      : h < 16
        ? "AFTERNOON"
        : h < 19
          ? "AFTER SCHOOL"
          : "EVENING";

/** P5-style date block in the corner. Rendered after mount (uses local time). */
export function PersonaCalendar({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now)
    return <div className={`p-calendar ${className ?? ""}`} aria-hidden />;

  return (
    <div className={`p-calendar ${className ?? ""}`}>
      <span className="p-calendar-date">
        {now.getMonth() + 1}/{now.getDate()}
      </span>
      <span className="p-calendar-day">{DAYS[now.getDay()]}</span>
      <span className="p-calendar-time">{timeOfDay(now.getHours())}</span>
    </div>
  );
}
