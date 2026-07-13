import { ReactNode } from "react";
import Link from "next/link";

interface ForwardRefProps {
  module: string;
  title: string;
  href?: string;
}

export function ForwardRef({ module, title, href }: ForwardRefProps) {
  const content = (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-soft px-2 py-1 text-sm font-medium text-primary-text transition-colors hover:bg-primary-soft/80">
      <span className="text-primary-text/60">→</span>
      <span className="font-mono text-xs">{module}</span>
      <span className="text-primary-text/40">·</span>
      <span>{title}</span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline hover:no-underline">
        {content}
      </Link>
    );
  }

  return content;
}
