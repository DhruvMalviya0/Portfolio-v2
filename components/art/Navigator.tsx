import Image from "next/image";

/*
  The navigator — pixiv's VRM sample avatar (redistribution and
  modification allowed by its VRM licence), rendered once to small
  transparent WebP cut-ins. Realm colour is applied with CSS, so one
  image serves every realm.
*/

const SOURCES = {
  full: { src: "/images/navigator/full.webp", w: 332, h: 1099 },
  bust: { src: "/images/navigator/bust.webp", w: 603, h: 800 },
  eyes: { src: "/images/navigator/eyes.webp", w: 1200, h: 360 },
} as const;

interface NavigatorProps {
  variant: keyof typeof SOURCES;
  className?: string;
  sizes?: string;
  priority?: boolean;
  alt?: string;
}

export function Navigator({
  variant,
  className,
  sizes = "(max-width: 768px) 60vw, 30vw",
  priority = false,
  alt = "Navigator — an anime-style guide character",
}: NavigatorProps) {
  const s = SOURCES[variant];
  return (
    <div className={`navigator navigator-${variant} ${className ?? ""}`}>
      <Image
        src={s.src}
        width={s.w}
        height={s.h}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
      />
    </div>
  );
}
