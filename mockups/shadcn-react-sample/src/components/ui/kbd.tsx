import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 items-center rounded-sm border border-neutral-200 bg-white px-1.5 font-mono text-xs font-medium leading-4 text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white",
        className
      )}
      {...props}
    />
  );
}
