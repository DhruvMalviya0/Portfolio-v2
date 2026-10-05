import { Navigator } from "@/components/art/Navigator";
import { YorozuyaSign } from "@/components/art/YorozuyaSign";
import { PROFILE, PROJECTS, SKILLS, SOCIAL_STATS } from "@/lib/content";
import { REALM_IDS, REALMS, type RealmId } from "@/lib/realmConfig";

export function AboutSection({ realm }: { realm: RealmId | null }) {
  const stats = SOCIAL_STATS[realm ?? "hub"];
  const r = realm ? REALMS[realm] : null;
  const skillGroups = realm
    ? SKILLS[realm]
    : REALM_IDS.map((id) => ({
        label: REALMS[id].character,
        items: SKILLS[id].flatMap((g) => g.items).slice(0, 7),
      }));

  return (
    <div className="about-grid">
      <section className="status-card intro-left" aria-label="Profile">
        <div className="status-portrait">
          <Navigator
            variant="bust"
            sizes="(max-width: 768px) 60vw, 22vw"
            alt=""
          />
          <span className="status-lv">
            LV<b>02</b>
          </span>
        </div>
        <div className="status-id">
          <h2 className="status-name">{PROFILE.name.toUpperCase()}</h2>
          <p className="status-code">
            CODENAME <b>{PROFILE.handle}</b>
            {r && (
              <>
                {" "}
                · PERSONA <b>{r.character}</b>
              </>
            )}
          </p>
          <p className="status-bio">{PROFILE.bio}</p>
          {r && <p className="status-quote">“{r.quote}”</p>}
          <ul className="status-facts">
            <li>
              <span>BASE</span>
              {PROFILE.location}
            </li>
            <li>
              <span>QUESTS</span>
              {PROJECTS.length} completed builds
            </li>
            <li>
              <span>STATUS</span>
              {PROFILE.status}
            </li>
          </ul>
        </div>
      </section>

      <section className="social-stats intro-up" aria-label="Social stats">
        <h3 className="panel-title">SOCIAL STATS</h3>
        {stats.map((s, i) => (
          <div
            key={s.stat}
            className="social-row"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <span className="social-name">{s.stat}</span>
            <span
              className="social-pips"
              role="img"
              aria-label={`${s.level} of 5`}
            >
              {Array.from({ length: 5 }).map((_, p) => (
                <i key={`p-${p}`} className={p < s.level ? "on" : ""} />
              ))}
            </span>
            <span className="social-rank">{s.rank}</span>
          </div>
        ))}
      </section>

      <section className="skills-panel intro-up" aria-label="Skills">
        <h3 className="panel-title">
          {realm ? "SKILL TREE" : "SKILLS BY REALM"}
        </h3>
        {skillGroups.map((g) => (
          <div key={g.label} className="skill-group">
            <span className="skill-label">{g.label}</span>
            <div className="skill-tags">
              {g.items.map((t) => (
                <span key={t} className="skill-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
        {!realm && <YorozuyaSign className="about-yorozuya" />}
      </section>
    </div>
  );
}
