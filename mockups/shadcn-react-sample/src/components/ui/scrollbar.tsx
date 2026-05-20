import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const scrollbarClass =
  "scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent";

export function Scrollbar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="scrollbar"
      className={cn(
        "overflow-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb:hover]:bg-primary",
        className
      )}
      {...props}
    />
  );
}
