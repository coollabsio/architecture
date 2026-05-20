import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function HighlightedText({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <mark
      className={cn(
        "rounded-sm bg-coollabs-50 px-1 py-0.5 font-medium text-coollabs-200 dark:bg-warning/15 dark:text-warning",
        className
      )}
      {...props}
    />
  );
}

export function RequiredAsterisk({ className }: { className?: string }) {
  return (
    <>
      <span
        className={cn("font-bold text-coollabs dark:text-warning", className)}
        aria-hidden="true"
      >
        *
      </span>
      <span className="sr-only">required</span>
    </>
  );
}

/** Backwards-compatible alias for the previous required marker export. */
export function RequiredMarker({ className }: { className?: string }) {
  return <RequiredAsterisk className={className} />;
}
