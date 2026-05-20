import { forwardRef, type ReactNode } from "react";
import * as RC from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

export const checkboxClass =
  "grid size-4 shrink-0 cursor-pointer place-items-center rounded-sm border border-border bg-background text-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary";

export const checkboxRowClass =
  "flex max-w-full flex-row items-center gap-4 py-1 pr-2 cursor-pointer hover:bg-muted";

export const Checkbox = forwardRef<
  React.ElementRef<typeof RC.Root>,
  React.ComponentPropsWithoutRef<typeof RC.Root>
>(({ className, ...props }, ref) => (
  <RC.Root ref={ref} data-slot="checkbox" className={cn(checkboxClass, className)} {...props}>
    <RC.Indicator className="flex items-center justify-center">
      <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
      </svg>
    </RC.Indicator>
  </RC.Root>
));
Checkbox.displayName = "Checkbox";

export interface CheckboxRowProps {
  label: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function CheckboxRow({
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
}: CheckboxRowProps) {
  return (
    <label
      className={cn(
        disabled
          ? "flex max-w-full flex-row items-center gap-4 py-1 pr-2 cursor-default opacity-60"
          : checkboxRowClass,
        className
      )}
    >
      <span className="flex min-w-0 grow flex-col break-words text-sm text-foreground">
        <span>{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </span>
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(v) => onCheckedChange?.(v === true)}
        disabled={disabled}
      />
    </label>
  );
}
