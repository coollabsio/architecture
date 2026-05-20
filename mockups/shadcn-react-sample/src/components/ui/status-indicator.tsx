import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const dotByVariant = {
  success: "bg-green-600",
  warning: "bg-warning",
  error: "bg-destructive",
  muted: "bg-muted-foreground"
} as const;

const dotByStatus = {
  running: "bg-green-600",
  stopped: "bg-muted-foreground",
  degraded: "bg-warning",
  deploying: "bg-primary animate-pulse",
  error: "bg-destructive"
} as const;

export type StatusVariant = keyof typeof dotByVariant;
export type Status = keyof typeof dotByStatus;

interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Operational status; drives dot color and is used by mock data. */
  status?: Status;
  /** Semantic visual variant; overrides `status` color mapping. */
  variant?: StatusVariant;
  label?: string;
  detail?: string;
}

export function StatusIndicator({
  className,
  status,
  variant,
  label,
  detail,
  ...props
}: Props) {
  const dot = variant
    ? dotByVariant[variant]
    : status
    ? dotByStatus[status]
    : dotByVariant.success;

  return (
    <span
      data-slot="status-indicator"
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 text-sm font-medium text-foreground",
        className
      )}
      {...props}
    >
      <span className={cn("size-2 shrink-0 rounded-full", dot)} aria-hidden="true" />
      {label && <span>{label}</span>}
      {detail && (
        <span className="text-xs font-normal text-muted-foreground">{detail}</span>
      )}
    </span>
  );
}
