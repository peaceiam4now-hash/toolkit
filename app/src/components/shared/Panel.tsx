// /workspaces/toolkit/app/src/components/shared/Panel.tsx

import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export function Panel({ title, children }: Props) {
  return (
    <section
      style={{
        marginTop: "1rem",
        padding: "0.75rem 1rem",
        border: "1px solid #ccc",
        borderRadius: 4,
      }}
    >
      {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
      {children}
    </section>
  );
}
