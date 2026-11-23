import type { ReactNode } from 'react';

export function InkText({ children }: { children: ReactNode }) {
  return <span className="brush-lettering">{children}</span>;
}
