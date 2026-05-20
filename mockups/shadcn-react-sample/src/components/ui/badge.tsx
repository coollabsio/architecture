import type { HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const badgeVariants = tv({
  base: "inline-flex h-5 max-w-full items-center gap-1 rounded-sm border px-1.5 text-xs font-medium leading-4",
  variants: {
    variant: {
      default:
        "border-neutral-200 bg-neutral-100 text-black dark:border-coolgray-300 dark:bg-coolgray-200 dark:text-white",
      success:
        "border-green-700 bg-green-600 text-white dark:border-green-500 dark:bg-green-700 dark:text-white",
      warning:
        "border-yellow-500 bg-warning text-black dark:border-warning dark:bg-warning dark:text-black",
      error:
        "border-red-700 bg-error text-white dark:border-red-500 dark:bg-red-800 dark:text-white",
      destructive:
        "border-red-700 bg-error text-white dark:border-red-500 dark:bg-red-800 dark:text-white",
      outline:
        "border-neutral-300 bg-transparent text-black dark:border-coolgray-300 dark:text-white",
      info:
        "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      accent:
        "border-coollabs bg-coollabs-50 text-coollabs-200 dark:border-coollabs-100 dark:bg-coollabs/20 dark:text-white"
    }
  },
  defaultVariants: { variant: "default" }
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & BadgeVariants) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export function DeprecatedBadge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <Badge variant="warning" className={cn("uppercase tracking-wide", className)} {...props}>
      deprecated
    </Badge>
  );
}
