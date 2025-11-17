import { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export function Panel({ title, children }: Props) {
  return (
    <section className="panel">
      {title && <header className="panel-header">{title}</header>}
      <div className="panel-body">{children}</div>
    </section>
  );
}
