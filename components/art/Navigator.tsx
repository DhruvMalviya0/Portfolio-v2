import Image from "next/image";

/*
  The navigator — Jotaro Kujo, rendered from the same rigged model as the
  live 3D avatar to small transparent WebP cut-ins. Realm colour is
  applied with CSS, so one image serves every realm.
*/

const SOURCES = {
  full: { src: "/images/navigator/jotaro-full.webp", w: 380, h: 1100 },
  bust: { src: "/images/navigator/jotaro-bust.webp", w: 543, h: 800 },
  eyes: { src: "/images/navigator/jotaro-eyes.webp", w: 1200, h: 360 },
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
  alt = "Jotaro Kujo",
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
