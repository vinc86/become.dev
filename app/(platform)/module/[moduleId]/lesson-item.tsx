import { IconCheck, IconChevronRight, IconLock } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { LessonLockState } from "@/types/content";
import Link from "next/link";

type LessonStatus = "completed" | "in-progress" | "locked" | "available";

interface LessonItemProps {
  lessonNumber: number;
  title: string;
  exerciseCount: number;
  status: LessonStatus;
  lockState?: LessonLockState;
  href: string;
}

export function LessonItem({
  lessonNumber,
  title,
  exerciseCount,
  status,
  lockState,
  href
}: LessonItemProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const isInProgress = status === "in-progress";

  return (
    <Link
      href={isLocked ? "#" : href}
      className={cn(
        "group flex items-center gap-4 rounded-lg border border-border-default bg-surface p-4 transition-colors",
        !isLocked && "hover:border-border-strong hover:bg-surface-muted",
        isLocked && "cursor-not-allowed opacity-60"
      )}
      aria-disabled={isLocked}
      tabIndex={isLocked ? -1 : undefined}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-medium",
          isCompleted && "bg-success text-white",
          isInProgress && "bg-primary-soft text-primary-text",
          !isCompleted && !isInProgress && "bg-surface-muted text-text-secondary"
        )}
      >
        {isCompleted ? (
          <IconCheck className="size-5" />
        ) : isLocked && lockState === "purchase-locked" ? (
          <IconLock className="size-4" />
        ) : (
          lessonNumber
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-text-primary truncate">{title}</h3>
        <p className="text-sm text-text-secondary">
          {isCompleted ? "completed" : isInProgress ? "in progress" : ""}
          {(isCompleted || isInProgress) && " · "}
          {exerciseCount} exercises
        </p>
      </div>

      {!isLocked && (
        <IconChevronRight className="size-5 text-text-tertiary transition-transform group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
