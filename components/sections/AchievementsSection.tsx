import { achievementsFor } from "@/lib/content";
import type { RealmId } from "@/lib/realmConfig";

/** Bleach-style releases: hover / focus a card to call out its Bankai. */
export function AchievementsSection({ realm }: { realm: RealmId | null }) {
  const list = achievementsFor(realm);
  return (
    <div className="bankai">
      <p className="bankai-count intro-left">
        RELEASES UNLOCKED <b>{String(list.length).padStart(2, "0")}</b>
      </p>
      <ul className="bankai-grid">
        {list.map((a, i) => (
          <li
            key={a.title}
            className="bankai-card intro-item"
            style={{
              animationDelay: `${i * 70}ms`,
              rotate: `${i % 2 ? 1.5 : -1.5}deg`,
            }}
            // biome-ignore lint/a11y/noNoninteractiveTabindex: focus reveals the release, same as hover
            tabIndex={0}
          >
            <span className="bankai-kanji" lang="ja" aria-hidden>
              {a.kanji}
            </span>
            <div className="bankai-body">
              <span className="bankai-year">{a.year}</span>
              <h2 className="bankai-title">{a.title}</h2>
              <p className="bankai-detail">{a.detail}</p>
            </div>
            <span className="bankai-release" aria-hidden>
              <small>BANKAI</small>
              {a.release}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
