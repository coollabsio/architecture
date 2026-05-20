import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HelperTooltipProps {
  text?: ReactNode;
  content?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable Coolify info-icon tooltip. Either pass `text`/`content`, or use
 * children for backward compatibility.
 */
export function HelperTooltip({ text, content, className, children }: HelperTooltipProps) {
  const [open, setOpen] = useState(false);
  const body = text ?? content ?? children;
  return (
    <span className={cn("relative inline-flex", className)}>
      <button
        type="button"
        className="inline-flex size-4 items-center justify-center rounded-full bg-coollabs text-[10px] font-bold leading-none text-white outline-none focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:bg-warning dark:text-app-base dark:focus-visible:ring-warning dark:focus-visible:ring-offset-app-base"
        aria-label="Show help"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        i
      </button>
      {open && (
        <span className="absolute left-1/2 top-6 z-50 min-w-max max-w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 whitespace-normal rounded-sm bg-coolgray-400 px-2 py-1.5 text-xs leading-4 text-white shadow-sm">
          {body}
        </span>
      )}
    </span>
  );
}
