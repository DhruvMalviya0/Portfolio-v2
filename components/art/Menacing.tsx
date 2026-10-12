/** JoJo's ゴゴゴゴ — drifts beside whatever is selected. */
export function Menacing({ className }: { className?: string }) {
  return (
    <span className={`menacing ${className ?? ""}`} aria-hidden>
      <span>ゴ</span>
      <span>ゴ</span>
      <span>ゴ</span>
      <span>ゴ</span>
    </span>
  );
}

/** JoJo's "To Be Continued" arrow — used for every "go back" action. */
export function ToBeContinuedArrow() {
  return (
    <svg
      className="tbc-arrow"
      viewBox="0 0 260 44"
      aria-hidden
      role="presentation"
    >
      <path
        d="M0 22 L26 2 L26 12 L252 12 Q258 12 258 18 L258 26 Q258 32 252 32 L26 32 L26 42 Z"
        fill="currentColor"
      />
      <text
        x="142"
        y="28"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        letterSpacing="2"
        fill="var(--tbc-ink, #0c0c0c)"
        fontFamily="var(--font-display)"
      >
        TO BE CONTINUED
      </text>
    </svg>
  );
}
