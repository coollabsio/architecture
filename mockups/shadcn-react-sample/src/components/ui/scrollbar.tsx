import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const scrollbarClass =
  "scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent dark:scrollbar-thumb-coolgray-300";

export function Scrollbar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-coolgray-400 [&::-webkit-scrollbar-thumb:hover]:bg-coollabs dark:[&::-webkit-scrollbar-thumb:hover]:bg-warning",
        className
      )}
      {...props}
    />
  );
}
