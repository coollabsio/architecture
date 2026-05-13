import { tv, type VariantProps } from "tailwind-variants";
import Button from "./button.svelte";

export const buttonVariants = tv({
  base: "inline-flex min-w-fit shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm border-2 border-transparent bg-clip-padding px-2 text-sm font-medium normal-case outline-none transition-colors select-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100 disabled:border-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-600 dark:disabled:border-coolgray-300 dark:disabled:bg-coolgray-100/60 dark:disabled:text-neutral-400 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coollabs dark:focus-visible:ring-warning focus-visible:ring-offset-2 dark:focus-visible:ring-offset-base",
  variants: {
    variant: {
      default:
        "border-neutral-200 bg-white text-black hover:bg-neutral-100 hover:text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white dark:hover:bg-coolgray-200 dark:hover:text-white",
      highlighted:
        "border-coollabs bg-coollabs-50 text-coollabs-200 hover:bg-coollabs hover:text-white dark:border-coollabs-100 dark:bg-coollabs/20 dark:text-white dark:hover:bg-coollabs-100 dark:hover:text-white",
      destructive:
        "border-red-300 bg-red-50 text-red-800 hover:bg-error hover:text-white dark:border-red-800 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800 dark:hover:text-white",
      ghost:
        "border-transparent bg-transparent text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-coolgray-200",
      link:
        "border-transparent bg-transparent px-0 text-coollabs hover:underline dark:text-warning"
    },
    size: {
      default: "h-8",
      sm: "h-8 px-2 text-sm",
      lg: "h-10 px-3",
      icon: "size-8",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export { Button };
