import { tv, type VariantProps } from "tailwind-variants";
import Badge from "./badge.svelte";

export const badgeVariants = tv({
  base: "inline-flex h-5 max-w-full items-center gap-1 rounded-sm border px-1.5 text-xs font-medium leading-4",
  variants: {
    variant: {
      default: "border-border bg-muted text-foreground",
      success: "border-green-700 bg-green-600 text-white dark:border-green-500 dark:bg-green-700 dark:text-white",
      warning: "border-yellow-500 bg-warning text-black dark:border-warning dark:bg-warning dark:text-black",
      error: "border-red-700 bg-error text-white dark:border-red-500 dark:bg-red-800 dark:text-white",
      outline: "border-border bg-transparent text-foreground",
      accent: "border-coollabs bg-coollabs-50 text-coollabs-200 dark:border-coollabs-100 dark:bg-coollabs/20 dark:text-white"
    }
  },
  defaultVariants: { variant: "default" }
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
export { Badge };
