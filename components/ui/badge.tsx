import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "primary" | "success";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide",
        variant === "default" && "bg-surface-muted text-text-secondary",
        variant === "primary" && "bg-primary-soft text-primary-text",
        variant === "success" && "bg-success-soft text-success",
        className
      )}
    >
      {children}
    </span>
  );
}
