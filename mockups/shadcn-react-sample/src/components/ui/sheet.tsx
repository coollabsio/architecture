import { forwardRef } from "react";
import * as D from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Sheet = D.Root;
export const SheetTrigger = D.Trigger;
export const SheetClose = D.Close;
export const SheetPortal = D.Portal;

export const SheetOverlay = forwardRef<
  React.ElementRef<typeof D.Overlay>,
  React.ComponentPropsWithoutRef<typeof D.Overlay>
>(({ className, ...props }, ref) => (
  <D.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

type SheetContentProps = React.ComponentPropsWithoutRef<typeof D.Content> & {
  side?: "right" | "left";
  hideCloseButton?: boolean;
};

export const SheetContent = forwardRef<React.ElementRef<typeof D.Content>, SheetContentProps>(
  ({ className, side = "right", children, hideCloseButton, ...props }, ref) => (
    <D.Portal>
      <SheetOverlay />
      <D.Content
        ref={ref}
        className={cn(
          "fixed inset-y-0 z-50 flex h-full w-full max-w-md flex-col bg-white p-4 shadow-xl outline-none dark:bg-coolgray-100",
          side === "right"
            ? "right-0 border-l border-neutral-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right dark:border-coolgray-300"
            : "left-0 border-r border-neutral-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left dark:border-coolgray-300",
          className
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <D.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close slide-over"
              className="absolute right-3 top-3"
            >
              ×
            </Button>
          </D.Close>
        )}
      </D.Content>
    </D.Portal>
  )
);
SheetContent.displayName = "SheetContent";

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-coolgray-200",
        className
      )}
      {...props}
    />
  );
}

export function SheetBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto py-4 text-sm text-neutral-700 dark:text-neutral-300",
        className
      )}
      {...props}
    />
  );
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("border-t border-neutral-200 pt-3 dark:border-coolgray-200", className)}
      {...props}
    />
  );
}

export const SheetTitle = forwardRef<
  React.ElementRef<typeof D.Title>,
  React.ComponentPropsWithoutRef<typeof D.Title>
>(({ className, ...props }, ref) => (
  <D.Title
    ref={ref}
    className={cn("text-xl font-bold text-black dark:text-white", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

export const SheetDescription = forwardRef<
  React.ElementRef<typeof D.Description>,
  React.ComponentPropsWithoutRef<typeof D.Description>
>(({ className, ...props }, ref) => (
  <D.Description
    ref={ref}
    className={cn("mt-1 text-sm text-neutral-600 dark:text-neutral-400", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";
