import { PersonaMenu } from "@/components/hub/PersonaMenu";

export default function HubPage() {
  return (
    <main className="hub-root">
      {/* Ambient background — will be replaced with Three.js in Phase 2 */}
      <div className="hub-bg-ambient" aria-hidden="true">
        <div className="hub-bg-orb hub-bg-orb--1" />
        <div className="hub-bg-orb hub-bg-orb--2" />
        <div className="hub-bg-orb hub-bg-orb--3" />
      </div>

      <PersonaMenu />
    </main>
  );
}
