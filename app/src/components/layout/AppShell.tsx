// src/components/layout/AppShell.tsx
type Props = { children: React.ReactNode };

export function AppShell({ children }: Props) {
  return <main className="app-shell">{children}</main>;
}
