import { forwardRef, type ReactNode } from "react";
import * as RC from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

export const checkboxClass =
  "grid size-4 shrink-0 cursor-pointer place-items-center rounded-sm border border-neutral-200 bg-white text-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-700 data-[state=checked]:bg-coollabs data-[state=checked]:text-white dark:border-neutral-700 dark:data-[state=checked]:bg-warning dark:data-[state=checked]:text-black dark:bg-coolgray-100 dark:disabled:bg-app-base dark:disabled:text-neutral-400 dark:focus-visible:ring-warning dark:focus-visible:ring-offset-app-base";

export const checkboxRowClass =
  "flex max-w-full flex-row items-center gap-4 py-1 pr-2 cursor-pointer dark:hover:bg-coolgray-100";

export const Checkbox = forwardRef<
  React.ElementRef<typeof RC.Root>,
  React.ComponentPropsWithoutRef<typeof RC.Root>
>(({ className, ...props }, ref) => (
  <RC.Root ref={ref} className={cn(checkboxClass, className)} {...props}>
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
      <span className="flex min-w-0 grow flex-col break-words text-sm text-black dark:text-white">
        <span>{label}</span>
        {description && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400">{description}</span>
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
