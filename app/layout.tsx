import type { Metadata } from "next";
import { TransitionManager } from "@/components/transitions/TransitionManager";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEAF.EXE — Portfolio",
  description: "Full-Stack · Data Science · AI/ML",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TransitionManager />
        {children}
      </body>
    </html>
  );
}
