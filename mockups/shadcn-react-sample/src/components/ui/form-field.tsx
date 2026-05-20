import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /** htmlFor target. Alias `forId` kept for parity with Coolify spec. */
  forId?: string;
  htmlFor?: string;
  label?: ReactNode;
  required?: boolean;
  helper?: ReactNode;
  description?: ReactNode;
  /** Legacy alias for `description`. */
  hint?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
}

export function FormField({
  className,
  forId,
  htmlFor,
  label,
  required,
  helper,
  description,
  hint,
  error,
  success,
  children,
  ...props
}: FormFieldProps) {
  const labelFor = forId ?? htmlFor;
  const sub = description ?? hint;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div data-slot="form-field" className={cn("space-y-1", className)} {...props}>
      {(label || helper || required) && (
        <div className="mb-1 flex items-center gap-1">
          {label && (
            <label htmlFor={labelFor} className="text-sm font-medium text-foreground">
              {label}
            </label>
          )}
          {required && (
            <span className="font-bold text-primary" aria-hidden="true">
              *
            </span>
          )}
          {helper && (
            <div className="relative inline-flex">
              <button
                type="button"
                className="inline-flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={typeof label === "string" ? `${label} help` : "Help"}
                aria-expanded={tooltipOpen}
                onMouseEnter={() => setTooltipOpen(true)}
                onMouseLeave={() => setTooltipOpen(false)}
                onFocus={() => setTooltipOpen(true)}
                onBlur={() => setTooltipOpen(false)}
                onClick={() => setTooltipOpen((v) => !v)}
              >
                <span className="text-[10px] font-bold leading-none" aria-hidden="true">
                  i
                </span>
              </button>
              {tooltipOpen && (
                <div className="absolute left-5 top-1/2 z-50 min-w-max max-w-[min(20rem,calc(100vw-2rem))] -translate-y-1/2 whitespace-normal rounded-sm border border-border bg-popover px-2 py-1.5 text-xs leading-4 text-popover-foreground shadow-sm">
                  {helper}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {children}

      {error ? (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      ) : success ? (
        <p className="mt-1 text-xs text-green-600 dark:text-green-400">{success}</p>
      ) : sub ? (
        <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
      ) : null}
    </div>
  );
}
