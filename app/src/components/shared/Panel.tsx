// /workspaces/toolkit/app/src/components/shared/Panel.tsx
import type { ReactNode } from "react";

type PanelProps = {
  title?: string;
  children: ReactNode;
};

export function Panel({ title, children }: PanelProps) {
  return (
    <section className="panel">
      {title && <header className="panel__header">{title}</header>}
      <div className="panel__body">{children}</div>
    </section>
  );
}
