import type { ReactNode } from "react";

export default function AILayout({ children }: { children: ReactNode }) {
  return (
    <div data-realm="ai" style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
