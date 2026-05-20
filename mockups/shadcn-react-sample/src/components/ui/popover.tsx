import { forwardRef } from "react";
import * as P from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

export const Popover = P.Root;
export const PopoverTrigger = P.Trigger;
export const PopoverAnchor = P.Anchor;
export const PopoverClose = P.Close;

export const PopoverContent = forwardRef<
  React.ElementRef<typeof P.Content>,
  React.ComponentPropsWithoutRef<typeof P.Content>
>(({ className, sideOffset = 8, align = "start", ...props }, ref) => (
  <P.Portal>
    <P.Content
      ref={ref}
      data-slot="popover-content"
      sideOffset={sideOffset}
      align={align}
      className={cn(
        "z-20 w-72 rounded-sm border border-border bg-popover p-3 text-sm text-popover-foreground shadow-lg outline-none",
        className
      )}
      {...props}
    />
  </P.Portal>
));
PopoverContent.displayName = "PopoverContent";
