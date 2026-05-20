import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
}

export function Callout({ className, title, children, ...props }: CalloutProps) {
  return (
    <div
      data-slot="callout"
      className={cn(
        "grid grid-cols-[1rem_1fr] gap-2 rounded-sm border border-border bg-card p-3 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      <div
        className="mt-0.5 grid size-4 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
        aria-hidden="true"
      >
        i
      </div>
      <div className="min-w-0 space-y-1">
        {title && <div className="font-bold text-foreground">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
}
