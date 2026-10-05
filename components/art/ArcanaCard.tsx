/** Persona tarot card — numeral + arcana name, inked in realm colours. */
export function ArcanaCard({
  numeral,
  name,
  className,
}: {
  numeral: string;
  name: string;
  className?: string;
}) {
  return (
    <svg
      className={`arcana-card ${className ?? ""}`}
      viewBox="0 0 120 200"
      role="img"
      aria-label={`Arcana ${numeral}: ${name}`}
    >
      <rect
        x="2"
        y="2"
        width="116"
        height="196"
        rx="6"
        fill="var(--bg-primary)"
      />
      <rect
        x="8"
        y="8"
        width="104"
        height="184"
        rx="3"
        fill="none"
        stroke="var(--accent-1)"
        strokeWidth="2"
      />
      <text
        x="60"
        y="38"
        textAnchor="middle"
        fill="var(--accent-1)"
        fontSize="22"
        fontWeight="700"
        fontFamily="var(--font-display)"
      >
        {numeral}
      </text>
      {/* Star / eye sigil */}
      <g transform="translate(60 100)">
        <circle r="30" fill="none" stroke="var(--accent-2)" strokeWidth="2" />
        <path
          d="M0 -40 L9 -9 L40 0 L9 9 L0 40 L-9 9 L-40 0 L-9 -9 Z"
          fill="var(--accent-1)"
          opacity="0.9"
        />
        <circle r="7" fill="var(--bg-primary)" />
        <circle r="3" fill="var(--accent-2)" />
      </g>
      <text
        x="60"
        y="178"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="11"
        fontWeight="700"
        letterSpacing="2"
        fontFamily="var(--font-display)"
      >
        {name}
      </text>
    </svg>
  );
}
