import { forwardRef } from "react";
import * as D from "@radix-ui/react-dropdown-menu";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const DropdownMenu = D.Root;
export const DropdownMenuTrigger = D.Trigger;
export const DropdownMenuGroup = D.Group;
export const DropdownMenuPortal = D.Portal;
export const DropdownMenuSub = D.Sub;
export const DropdownMenuRadioGroup = D.RadioGroup;

export const dropdownMenuContentClass =
  "z-50 mt-1 min-w-max max-w-[calc(100vw-1rem)] max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain rounded-sm border border-border bg-popover p-1 text-popover-foreground shadow-sm outline-none";

export const dropdownMenuItemVariants = tv({
  base: "relative flex w-full cursor-pointer select-none items-center justify-start gap-2 rounded-sm py-1 pl-2 pr-4 text-xs text-foreground outline-none transition-colors [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  variants: {
    variant: {
      default: "",
      danger: "text-destructive hover:text-destructive focus-visible:text-destructive data-[highlighted]:text-destructive",
      label:
        "cursor-default font-bold text-muted-foreground hover:bg-transparent hover:text-muted-foreground focus-visible:bg-transparent focus-visible:text-muted-foreground data-[highlighted]:bg-transparent data-[highlighted]:text-muted-foreground"
    },
    size: {
      default: "",
      touch: "min-h-10 px-3 py-2 text-sm"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

export const dropdownMenuSeparatorClass = "my-1 h-px bg-border";

export type DropdownMenuItemVariants = VariantProps<typeof dropdownMenuItemVariants>;

export const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof D.Content>,
  React.ComponentPropsWithoutRef<typeof D.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <D.Portal>
    <D.Content
      ref={ref}
      data-slot="dropdown-menu-content"
      sideOffset={sideOffset}
      className={cn(dropdownMenuContentClass, className)}
      {...props}
    />
  </D.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof D.Item> & {
  danger?: boolean;
  variant?: DropdownMenuItemVariants["variant"];
  size?: DropdownMenuItemVariants["size"];
};

export const DropdownMenuItem = forwardRef<React.ElementRef<typeof D.Item>, DropdownMenuItemProps>(
  ({ className, danger, variant, size, ...props }, ref) => (
    <D.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      className={cn(
        dropdownMenuItemVariants({ variant: danger ? "danger" : variant, size }),
        className
      )}
      {...props}
    />
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof D.Label>,
  React.ComponentPropsWithoutRef<typeof D.Label>
>(({ className, ...props }, ref) => (
  <D.Label
    ref={ref}
    data-slot="dropdown-menu-label"
    className={cn(dropdownMenuItemVariants({ variant: "label" }), className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof D.Separator>,
  React.ComponentPropsWithoutRef<typeof D.Separator>
>(({ className, ...props }, ref) => (
  <D.Separator ref={ref} data-slot="dropdown-menu-separator" className={cn(dropdownMenuSeparatorClass, className)} {...props} />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
