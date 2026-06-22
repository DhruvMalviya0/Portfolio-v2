import type { ReactNode } from "react";

export default function FSLayout({ children }: { children: ReactNode }) {
  return (
    <div data-realm="fs" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
