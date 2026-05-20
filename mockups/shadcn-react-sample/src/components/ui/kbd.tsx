import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-5 items-center rounded-sm border border-border bg-card px-1.5 font-mono text-xs font-medium leading-4 text-foreground",
        className
      )}
      {...props}
    />
  );
}
