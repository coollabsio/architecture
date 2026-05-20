import type { HTMLAttributes, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

export const alertVariants = tv({
  base: "grid grid-cols-[1rem_1fr] gap-2 rounded-sm border p-3 text-sm",
  variants: {
    variant: {
      default:
        "border-border bg-card text-muted-foreground [&_.alert-icon]:text-primary",
      success:
        "border-green-600 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950/40 dark:text-green-200 [&_.alert-icon]:text-green-600",
      warning:
        "border-yellow-500 bg-yellow-50 text-yellow-950 dark:border-warning dark:bg-yellow-950/30 dark:text-yellow-100 [&_.alert-icon]:text-yellow-600 dark:[&_.alert-icon]:text-warning",
      destructive:
        "border-destructive/60 bg-destructive/10 text-destructive dark:border-destructive dark:bg-destructive/20 dark:text-destructive-foreground [&_.alert-icon]:text-destructive"
    }
  },
  defaultVariants: { variant: "default" }
});

export type AlertVariants = VariantProps<typeof alertVariants>;

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    AlertVariants {
  title?: ReactNode;
  showIcon?: boolean;
  icon?: ReactNode;
}

export function Alert({
  className,
  variant = "default",
  title,
  showIcon = true,
  icon,
  children,
  ...props
}: AlertProps) {
  const defaultIcon =
    variant === "success" ? "✓" : variant === "warning" ? "!" : variant === "destructive" ? "×" : "!";
  return (
    <div
      data-slot="alert"
      className={cn(alertVariants({ variant }), !showIcon && "grid-cols-1", className)}
      {...props}
    >
      {showIcon && (
        <div className="alert-icon mt-0.5 size-4 shrink-0" aria-hidden="true">
          {icon ?? defaultIcon}
        </div>
      )}
      <div className="min-w-0 space-y-1">
        {title && <div className="font-bold text-foreground">{title}</div>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
