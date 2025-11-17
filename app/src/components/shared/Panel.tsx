// app/src/components/shared/Panel.tsx

import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export function Panel({ title, children }: Props) {
  return (
    <section
      className="panel"
      style={{
        borderRadius: "12px",
        padding: "12px 16px",
        background:
          "linear-gradient(145deg, rgba(24,24,36,0.9), rgba(12,12,20,0.9))",
        border: "1px solid rgba(148, 163, 184, 0.35)",
        boxShadow:
          "0 18px 45px rgba(15,23,42,0.8), 0 0 0 1px rgba(148,163,184,0.18)",
        backdropFilter: "blur(16px)",
      }}
    >
      {title && (
        <header
          style={{
            marginBottom: "8px",
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#9ca3af",
          }}
        >
          {title}
        </header>
      )}
      {children}
    </section>
  );
}
