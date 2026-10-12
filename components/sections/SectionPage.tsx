import type { SectionId } from "@/lib/content";
import type { RealmId } from "@/lib/realmConfig";
import { AboutSection } from "./AboutSection";
import { AchievementsSection } from "./AchievementsSection";
import { ConnectSection } from "./ConnectSection";
import { EducationSection } from "./EducationSection";
import { ProjectsSection } from "./ProjectsSection";
import { SectionShell } from "./SectionShell";

/** One template for every /<realm>/<section> route (and hub /about, /connect). */
export function SectionPage({
  realm,
  section,
}: {
  realm: RealmId | null;
  section: SectionId;
}) {
  return (
    <SectionShell realm={realm} section={section}>
      {section === "about" && <AboutSection realm={realm} />}
      {section === "projects" && <ProjectsSection realm={realm} />}
      {section === "achievements" && <AchievementsSection realm={realm} />}
      {section === "education" && <EducationSection />}
      {section === "connect" && <ConnectSection realm={realm} />}
    </SectionShell>
  );
}
