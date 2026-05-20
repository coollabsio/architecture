import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function HighlightedText({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <mark
      data-slot="highlighted-text"
      className={cn(
        "rounded-sm bg-primary/15 px-1 py-0.5 font-medium text-primary",
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
        data-slot="required-asterisk"
        className={cn("font-bold text-primary", className)}
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
