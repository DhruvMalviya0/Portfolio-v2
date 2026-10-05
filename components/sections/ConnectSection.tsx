import { PROFILE } from "@/lib/content";
import type { RealmId } from "@/lib/realmConfig";
import { REALMS } from "@/lib/realmConfig";

const LINKS = [
  {
    label: "GITHUB",
    href: PROFILE.links.github,
    note: "Where the bodies are buried",
  },
  {
    label: "LINKEDIN",
    href: PROFILE.links.linkedin,
    note: "The respectable channel",
  },
  { label: "DISCORD", href: PROFILE.links.discord, note: "Fastest reply" },
  {
    label: "PORTFOLIO V1",
    href: PROFILE.links.v1,
    note: "The particle solar system",
  },
];

/** One Piece wanted poster + Persona calling card. */
export function ConnectSection({ realm }: { realm: RealmId | null }) {
  const r = realm ? REALMS[realm] : null;
  return (
    <div className="connect-layout">
      <figure className="wanted intro-left" aria-label="Wanted poster">
        <span className="wanted-head">WANTED</span>
        <div className="wanted-photo">
          <svg viewBox="0 0 200 150" aria-hidden role="presentation">
            <rect width="200" height="150" fill="#2a2016" />
            {/* Leaf emblem in place of a photo */}
            <path
              d="M100 18 C150 30 168 78 140 118 C120 140 86 138 70 120 C48 92 60 40 100 18 Z"
              fill="#5c7a3a"
              stroke="#1a1209"
              strokeWidth="4"
            />
            <path
              d="M70 122 C92 92 112 64 132 40"
              stroke="#1a1209"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M92 92 L118 98 M104 74 L128 74 M84 106 L102 118"
              stroke="#1a1209"
              strokeWidth="3"
            />
          </svg>
        </div>
        <span className="wanted-dead">DEAD OR ALIVE</span>
        <span className="wanted-name">
          “{r ? r.character : PROFILE.handle}” DHRUV
        </span>
        <span className="wanted-bounty">
          <span className="berry">฿</span>1,048,596,000-
        </span>
        <span className="wanted-marine">INTERNSHIP DIVISION</span>
      </figure>

      <section className="calling-card intro-up" aria-label="Contact links">
        <p className="cc-eyebrow">CALLING CARD</p>
        <h2 className="cc-title">
          TAKE YOUR TIME —<br />
          <span>BUT DON'T TAKE TOO LONG.</span>
        </h2>
        <p className="cc-body">
          {PROFILE.status}. Full-stack, data science or AI/ML — if it ships, I'm
          interested. {PROFILE.location}, remote-friendly.
        </p>
        <ul className="cc-links">
          {LINKS.map((l, i) => (
            <li
              key={l.label}
              style={{ rotate: `${[-1.5, 1, -0.5, 1.5][i]}deg` }}
            >
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cc-link"
              >
                <span className="cc-link-label">{l.label}</span>
                <span className="cc-link-note">{l.note}</span>
                <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="cc-sign">— THE PHANTOM DEV</p>
      </section>
    </div>
  );
}
