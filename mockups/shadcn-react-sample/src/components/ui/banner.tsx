import type { HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const bannerVariants = tv({
  base: "rounded-sm border px-3 py-2 text-sm",
  variants: {
    variant: {
      info: "border-neutral-200 bg-neutral-100 text-neutral-700 dark:border-coolgray-300 dark:bg-coolgray-200 dark:text-neutral-300",
      warning:
        "border-yellow-300 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200",
      success:
        "border-green-300 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200",
      destructive:
        "border-red-300 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200"
    }
  },
  defaultVariants: { variant: "info" }
});

export type BannerVariants = VariantProps<typeof bannerVariants>;

export function Banner({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & BannerVariants) {
  return (
    <div role="status" className={cn(bannerVariants({ variant }), className)} {...props} />
  );
}
