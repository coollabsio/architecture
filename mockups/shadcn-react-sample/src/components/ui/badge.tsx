import type { HTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const badgeVariants = tv({
  base: "inline-flex h-5 max-w-full items-center gap-1 rounded-sm border px-1.5 text-xs font-medium leading-4",
  variants: {
    variant: {
      default: "border-border bg-muted text-foreground",
      success: "border-green-700 bg-green-600 text-white dark:border-green-500 dark:bg-green-700",
      warning: "border-warning bg-warning text-black",
      error: "border-destructive bg-destructive text-destructive-foreground",
      destructive: "border-destructive bg-destructive text-destructive-foreground",
      outline: "border-border bg-transparent text-foreground",
      info: "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      accent: "border-primary bg-primary/15 text-primary"
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
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export function DeprecatedBadge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <Badge
      variant="warning"
      data-slot="deprecated-badge"
      className={cn("uppercase tracking-wide", className)}
      {...props}
    >
      deprecated
    </Badge>
  );
}
