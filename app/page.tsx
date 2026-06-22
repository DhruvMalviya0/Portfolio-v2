import { PersonaMenu } from "@/components/hub/PersonaMenu";
import { CanvasEffects } from "@/components/ui/CanvasEffects";

export default function HubPage() {
  return (
    <main className="persona-stage">
      {/* Halftone texture overlay */}
      <div className="halftone" />

      {/* Background static & dust effects */}
      <CanvasEffects />

      {/* Layered Slabs */}
      <div className="slab slab-1" />
      <div className="slab slab-2" />
      <div className="slab slab-3" />
      <div className="stitch" />

      {/* Photo Strip duotone placeholder */}
      <div className="photo-strip" />

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
