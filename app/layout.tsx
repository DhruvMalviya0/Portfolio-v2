import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Rajdhani, Space_Grotesk } from "next/font/google";
import { PauseMenu } from "@/components/menu/PauseMenu";
import { TransitionManager } from "@/components/transitions/TransitionManager";
import "./globals.css";

// Self-hosted at build time — no render-blocking Google Fonts request
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LEAF.EXE — Dhruv Malviya",
    template: "%s · LEAF.EXE",
  },
  description:
    "Dhruv Malviya — Full-Stack · Data Science · AI/ML. A Persona-style portfolio: pick a realm, press ESC anywhere.",
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
    >
      <body>
        <TransitionManager />
        <PauseMenu />
        {children}
      </body>
    </html>
  );
}
