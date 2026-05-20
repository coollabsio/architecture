import type { HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const bannerVariants = tv({
  base: "rounded-sm border px-3 py-2 text-sm",
  variants: {
    variant: {
      info: "border-border bg-muted text-muted-foreground",
      warning:
        "border-yellow-300 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-200",
      success:
        "border-green-300 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/30 dark:text-green-200",
      destructive:
        "border-destructive/50 bg-destructive/10 text-destructive dark:border-destructive dark:bg-destructive/20 dark:text-destructive-foreground"
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
    <div
      role="status"
      data-slot="banner"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    />
  );
}
