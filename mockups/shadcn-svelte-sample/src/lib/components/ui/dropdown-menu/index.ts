import { tv, type VariantProps } from "tailwind-variants";
import DropdownMenu from "./dropdown-menu.svelte";

export const dropdownMenuContentClass =
  "absolute top-full z-50 mt-1 min-w-max max-w-[calc(100vw-1rem)] max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain rounded-sm border border-neutral-300 bg-white p-1 shadow-sm outline-none dark:border-coolgray-300 dark:bg-coolgray-200";

export const dropdownMenuItemVariants = tv({
  base: "relative flex w-full cursor-pointer select-none items-center justify-start gap-2 rounded-sm py-1 pl-2 pr-4 text-xs text-black outline-none transition-colors [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-neutral-100 focus-visible:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 dark:text-white dark:hover:bg-coollabs dark:focus-visible:bg-coollabs",
  variants: {
    variant: {
      default: "",
      danger: "text-error dark:text-red-300 dark:hover:text-white",
      label: "cursor-default font-bold text-neutral-500 hover:bg-transparent focus-visible:bg-transparent dark:text-neutral-400 dark:hover:bg-transparent dark:focus-visible:bg-transparent"
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

export const dropdownMenuSeparatorClass = "my-1 h-px bg-neutral-200 dark:bg-coolgray-300";

export type DropdownMenuItemVariants = VariantProps<typeof dropdownMenuItemVariants>;
export { DropdownMenu };
