import { forwardRef } from "react";
import * as D from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Dialog = D.Root;
export const DialogTrigger = D.Trigger;
export const DialogClose = D.Close;
export const DialogPortal = D.Portal;

export const DialogOverlay = forwardRef<
  React.ElementRef<typeof D.Overlay>,
  React.ComponentPropsWithoutRef<typeof D.Overlay>
>(({ className, ...props }, ref) => (
  <D.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-[1px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

type DialogContentProps = React.ComponentPropsWithoutRef<typeof D.Content> & {
  size?: "sm" | "md" | "lg";
  hideCloseButton?: boolean;
};

export const DialogContent = forwardRef<React.ElementRef<typeof D.Content>, DialogContentProps>(
  ({ className, children, size = "md", hideCloseButton, ...props }, ref) => {
    const panelWidth = size === "sm" ? "max-w-md" : size === "lg" ? "max-w-2xl" : "max-w-lg";
    return (
      <D.Portal>
        <DialogOverlay />
        <D.Content
          ref={ref}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-sm border border-neutral-200 bg-white p-4 shadow-xl outline-none dark:border-coolgray-300 dark:bg-coolgray-100",
            panelWidth,
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
                aria-label="Close dialog"
                className="absolute right-3 top-3"
              >
                ×
              </Button>
            </D.Close>
          )}
        </D.Content>
      </D.Portal>
    );
  }
);
DialogContent.displayName = "DialogContent";

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
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

export function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("py-4 text-sm text-neutral-700 dark:text-neutral-300", className)}
      {...props}
    />
  );
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-end gap-2 border-t border-neutral-200 pt-3 dark:border-coolgray-200",
        className
      )}
      {...props}
    />
  );
}

export const DialogTitle = forwardRef<
  React.ElementRef<typeof D.Title>,
  React.ComponentPropsWithoutRef<typeof D.Title>
>(({ className, ...props }, ref) => (
  <D.Title
    ref={ref}
    className={cn("text-xl font-bold text-black dark:text-white", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<
  React.ElementRef<typeof D.Description>,
  React.ComponentPropsWithoutRef<typeof D.Description>
>(({ className, ...props }, ref) => (
  <D.Description
    ref={ref}
    className={cn("mt-1 text-sm text-neutral-600 dark:text-neutral-400", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
