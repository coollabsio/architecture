import { forwardRef, type ReactNode } from "react";
import * as T from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export const TooltipProvider = T.Provider;
export const TooltipRoot = T.Root;
export const TooltipTrigger = T.Trigger;

export const TooltipContent = forwardRef<
  React.ElementRef<typeof T.Content>,
  React.ComponentPropsWithoutRef<typeof T.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <T.Portal>
    <T.Content
      ref={ref}
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "pointer-events-none z-30 max-w-xs whitespace-nowrap rounded-sm border border-border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-sm",
        className
      )}
      {...props}
    />
  </T.Portal>
));
TooltipContent.displayName = "TooltipContent";

interface TooltipProps {
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
  delayDuration?: number;
}

/**
 * Convenience wrapper for the Coolify `<Tooltip content side>` shorthand.
 * Wraps children in Radix Root/Trigger/Content with Coolify defaults.
 */
export function Tooltip({ content, side = "top", children, delayDuration = 150 }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
