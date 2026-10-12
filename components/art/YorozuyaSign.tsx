/** Gintama's Yorozuya signboard — "we take any job". Full-stack, data, AI: odd jobs. */
export function YorozuyaSign({ className }: { className?: string }) {
  return (
    <div className={`yorozuya ${className ?? ""}`}>
      <span className="yorozuya-kanji" lang="ja">
        万事屋
      </span>
      <span className="yorozuya-text">
        LEAF-CHAN
        <small>ODD JOBS · WEB · DATA · AI</small>
      </span>
    </div>
  );
}
