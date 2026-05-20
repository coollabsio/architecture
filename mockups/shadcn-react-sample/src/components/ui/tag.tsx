import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  removable?: boolean;
  onRemove?: () => void;
}

export function Tag({ className, children, removable, onRemove, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 max-w-full items-center gap-1 rounded-sm border border-neutral-200 bg-white px-1.5 text-xs font-medium leading-4 text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="-mr-0.5 grid size-4 place-items-center rounded-sm hover:bg-neutral-100 dark:hover:bg-coolgray-200"
          aria-label="Remove tag"
        >
          ×
        </button>
      )}
    </span>
  );
}
