import { tv, type VariantProps } from "tailwind-variants";
import Alert from "./alert.svelte";

export const alertVariants = tv({
  base: "grid grid-cols-[1rem_1fr] gap-2 rounded-sm border p-3 text-sm",
  variants: {
    variant: {
      default: "border-neutral-200 bg-white text-neutral-700 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-neutral-400 [&_.alert-icon]:text-coollabs dark:[&_.alert-icon]:text-warning",
      success: "border-green-600 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950/40 dark:text-green-200 [&_.alert-icon]:text-green-600",
      warning: "border-yellow-500 bg-yellow-50 text-yellow-950 dark:border-warning dark:bg-yellow-950/30 dark:text-yellow-100 [&_.alert-icon]:text-yellow-600 dark:[&_.alert-icon]:text-warning",
      destructive: "border-red-600 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200 [&_.alert-icon]:text-error"
    }
  },
  defaultVariants: { variant: "default" }
});

export type AlertVariants = VariantProps<typeof alertVariants>;
export { Alert };
