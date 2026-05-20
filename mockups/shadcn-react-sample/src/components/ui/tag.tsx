import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  removable?: boolean;
  onRemove?: () => void;
}

export function Tag({ className, children, removable, onRemove, ...props }: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-flex h-5 max-w-full items-center gap-1 rounded-sm border border-border bg-card px-1.5 text-xs font-medium leading-4 text-foreground",
        className
      )}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="-mr-0.5 grid size-4 place-items-center rounded-sm hover:bg-muted"
          aria-label="Remove tag"
        >
          ×
        </button>
      )}
    </span>
  );
}
