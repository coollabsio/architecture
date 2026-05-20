import { tv, type VariantProps } from "tailwind-variants";
import DropdownMenu from "./dropdown-menu.svelte";

export const dropdownMenuContentClass =
  "absolute top-full z-50 mt-1 min-w-max max-w-[calc(100vw-1rem)] max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain rounded-sm border border-border bg-popover p-1 text-popover-foreground shadow-sm outline-none";

export const dropdownMenuItemVariants = tv({
  base: "relative flex w-full cursor-pointer select-none items-center justify-start gap-2 rounded-sm py-1 pl-2 pr-4 text-xs text-foreground outline-none transition-colors [&_svg]:size-4 [&_svg]:shrink-0 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
  variants: {
    variant: {
      default: "",
      danger: "text-destructive data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:bg-destructive/10 focus-visible:text-destructive",
      label: "cursor-default font-bold text-muted-foreground hover:bg-transparent hover:text-muted-foreground focus-visible:bg-transparent focus-visible:text-muted-foreground"
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
export { DropdownMenu };
