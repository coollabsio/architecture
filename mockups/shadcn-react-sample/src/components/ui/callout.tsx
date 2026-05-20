import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
}

export function Callout({ className, title, children, ...props }: CalloutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1rem_1fr] gap-2 rounded-sm border border-neutral-200 bg-white p-3 text-sm text-neutral-700 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-neutral-400",
        className
      )}
      {...props}
    >
      <div
        className="mt-0.5 grid size-4 place-items-center rounded-full bg-coollabs text-xs font-bold text-white dark:bg-warning dark:text-app-base"
        aria-hidden="true"
      >
        i
      </div>
      <div className="min-w-0 space-y-1">
        {title && <div className="font-bold text-black dark:text-white">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}
