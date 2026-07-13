import { ReactNode } from "react";
import { Lightbulb } from "lucide-react";
export function SimplyPut({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 rounded-xl border-2 border-info/30 bg-info-soft p-5">
      <p className="mb-2 flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--info-lighter)' }}>
        <span>
          <Lightbulb />
        </span>
        <span className="font-bold text-lg">Simply put</span>
      </p>
      <div style={{ color: 'var(--info-lighter)' }}>{children}</div>
    </aside>
  );
}
