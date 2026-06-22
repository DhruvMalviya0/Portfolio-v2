import type { ReactNode } from "react";

export default function DSLayout({ children }: { children: ReactNode }) {
  return (
    <div data-realm="ds" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
