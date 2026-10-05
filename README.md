# LEAF.EXE — Portfolio v2

Dhruv Malviya's portfolio as a Persona-style game menu. Pick a realm on the
title screen — **FORGE** (Full-Stack), **ORACLE** (Data Science) or
**NEURON** (AI/ML) — and press **ESC** anywhere to open the pause menu.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # all 22 routes prerender as static pages
pnpm check      # biome lint + format
```

## Controls

| Key | Action |
| --- | --- |
| `ESC` | Open / close the pause menu (the **MENU** button on touch) |
| `↑ ↓` / `W S` / `1–9` | Move through any menu |
| `Enter` | Confirm |
| `Q` / `E` (or `← →`) | Flip between sections inside a realm |
| `Backspace` | Back to the realm menu |

## Structure

```
app/                     routes — /, /about, /connect, /<realm>, /<realm>/<section>
components/
  hub/PersonaMenu        title screen menu
  realm/RealmMenu        shared realm landing (FORGE / ORACLE / NEURON)
  sections/              SectionShell + About, Projects, Achievements, Education, Connect
  menu/PauseMenu         the ESC menu
  transitions/           shard wipe + code rain / orb burst / neural fire
  three/NavigatorAvatar  lazy 3D VRM navigator (NEURON realm, desktop only)
  art/                   divergence meter, Yorozuya sign, ゴゴゴ, arcana card, …
lib/
  content.ts             ALL portfolio content — edit this to update the site
  realmConfig.ts         realm palettes, arcana, world lines
  store.ts               transition / menu / SFX state
```

Every route file is a thin wrapper around a shared template, so content only
lives in `lib/content.ts`.

## References

- **Persona 5** — pause menu, realm arcana, confidant ranks, social stats, calendar, calling card
- **Steins;Gate** — divergence meter on the title screen (each realm is a world line)
- **JoJo** — ゴゴゴ beside the selected item, "To Be Continued" back arrow
- **Bleach** — achievements are Bankai releases
- **One Piece** — wanted poster on Connect
- **Gintama** — the Yorozuya signboard
- **Grand Blue** — the 404 page (you dove too deep)

All artwork for these is original SVG/CSS — no copyrighted images are used.

## Performance notes

- Fonts are self-hosted with `next/font` (no render-blocking Google Fonts request).
- Transitions cover → navigate → reveal as soon as the next route mounts; links prefetch on hover/focus.
- Navigator cut-ins are ~65 KB of WebP total, served through `next/image` (AVIF/WebP).
- The 3D avatar only loads on desktop, after idle, and pauses when off-screen.

## Credits

Navigator avatar: **VRM1_Constraint_Twist_Sample** © 2022 pixiv Inc.
(VRM licence: redistribution and modification allowed, commercial use allowed,
credit not required). Textures were recompressed to WebP and the file gzipped
(10.8 MB → 1.2 MB) — see `public/models/navigator.vrmz`.
