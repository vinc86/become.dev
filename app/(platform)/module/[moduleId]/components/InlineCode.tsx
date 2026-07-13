import { ReactNode } from "react";

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-surface-muted p-1 font-code text-[0.875em] text-text-primary">
      {children}
    </code>
  );
}
