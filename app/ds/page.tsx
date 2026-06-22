import { TransitionLink } from "@/components/ui/TransitionLink";
import { REALMS } from "@/lib/realmConfig";

export default function DSLandingPage() {
  const realm = REALMS.ds;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        padding: "40px",
      }}
    >
      <h1
        className="font-display glow"
        style={{ fontSize: "56px", fontWeight: 700, textAlign: "center" }}
      >
        {realm.character}
      </h1>
      <p
        className="font-mono"
        style={{
          color: "var(--text-muted)",
          letterSpacing: "0.2em",
          fontSize: "12px",
        }}
      >
        {realm.subtitle.toUpperCase()}
      </p>
      <p style={{ maxWidth: "480px", textAlign: "center", lineHeight: 1.7 }}>
        {realm.description}
      </p>

      {/* Sub-page nav */}
      <nav
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        {["about", "projects", "achievements", "education", "connect"].map(
          (sub) => (
            <TransitionLink
              key={sub}
              href={`/ds/${sub}`}
              className="font-display"
              style={{
                padding: "10px 24px",
                border: "1px solid var(--accent-1)",
                color: "var(--accent-1)",
                textDecoration: "none",
                fontSize: "14px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              {sub}
            </TransitionLink>
          ),
        )}
      </nav>

      {/* Back to hub */}
      <TransitionLink
        href="/"
        style={{
          marginTop: "24px",
          color: "var(--text-muted)",
          fontSize: "12px",
          fontFamily: "var(--font-mono)",
          textDecoration: "none",
          letterSpacing: "0.2em",
        }}
      >
        ← RETURN TO HUB
      </TransitionLink>
    </main>
  );
}
