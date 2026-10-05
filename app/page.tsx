import { Navigator } from "@/components/art/Navigator";
import { PersonaCalendar } from "@/components/art/PersonaCalendar";
import { PersonaMenu } from "@/components/hub/PersonaMenu";

export default function HubPage() {
  return (
    <main className="persona-stage hub-stage">
      {/* Halftone texture overlay */}
      <div className="halftone" />

      {/* Layered Slabs */}
      <div className="slab slab-1" />
      <div className="slab slab-2" />
      <div className="slab slab-3" />
      <div className="stitch" />

      {/* Navigator cut-in (fills the old duotone photo-strip slot) */}
      <div className="photo-strip hub-navigator intro-up">
        <Navigator
          variant="full"
          priority
          sizes="(max-width: 768px) 40vw, 22vw"
        />
      </div>

      <PersonaCalendar className="hub-calendar" />

      {/* Main menu contents (Title, Stats, Links) */}
      <PersonaMenu />

      {/* Metadata footer */}
      <div className="meta">DHRUV MALVIYA — PORTFOLIO V2</div>

      {/* Corner ticks */}
      <div className="tick tl" />
      <div className="tick br" />
    </main>
  );
}
