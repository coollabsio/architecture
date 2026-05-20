import { forwardRef, type ReactNode } from "react";
import * as RG from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export type RadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export const RadioGroup = forwardRef<
  React.ElementRef<typeof RG.Root>,
  React.ComponentPropsWithoutRef<typeof RG.Root>
>(({ className, ...props }, ref) => (
  <RG.Root ref={ref} className={cn("space-y-1", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RG.Item>,
  React.ComponentPropsWithoutRef<typeof RG.Item>
>(({ className, ...props }, ref) => (
  <RG.Item
    ref={ref}
    className={cn(
      "grid size-4 shrink-0 place-items-center rounded-full border border-neutral-300 bg-white outline-none focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed dark:border-neutral-700 dark:bg-coolgray-100 dark:focus-visible:ring-warning dark:focus-visible:ring-offset-app-base",
      className
    )}
    {...props}
  >
    <RG.Indicator className="flex h-full w-full items-center justify-center after:block after:size-2 after:rounded-full after:bg-coollabs dark:after:bg-warning" />
  </RG.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";

export interface RadioRowProps {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function RadioRow({ value, label, description, disabled, id, className }: RadioRowProps) {
  return (
    <label
      className={cn(
        "flex max-w-full flex-row items-center gap-4 rounded-sm px-2 py-1 text-sm",
        disabled ? "cursor-default opacity-60" : "cursor-pointer dark:hover:bg-coolgray-100",
        className
      )}
    >
      <span className="min-w-0 grow">
        <span className="block break-words text-black dark:text-white">{label}</span>
        {description && (
          <span className="block break-words text-xs text-neutral-600 dark:text-neutral-400">
            {description}
          </span>
        )}
      </span>
      <RadioGroupItem value={value} id={id} disabled={disabled} />
    </label>
  );
}
