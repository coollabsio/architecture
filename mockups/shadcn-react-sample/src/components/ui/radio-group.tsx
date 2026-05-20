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
  <RG.Root ref={ref} data-slot="radio-group" className={cn("space-y-1", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RG.Item>,
  React.ComponentPropsWithoutRef<typeof RG.Item>
>(({ className, ...props }, ref) => (
  <RG.Item
    ref={ref}
    data-slot="radio-group-item"
    className={cn(
      "grid size-4 shrink-0 place-items-center rounded-full border border-input bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed data-[state=checked]:border-primary",
      className
    )}
    {...props}
  >
    <RG.Indicator className="flex h-full w-full items-center justify-center after:block after:size-2 after:rounded-full after:bg-primary" />
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
        disabled ? "cursor-default opacity-60" : "cursor-pointer hover:bg-muted",
        className
      )}
    >
      <span className="min-w-0 grow">
        <span className="block break-words text-foreground">{label}</span>
        {description && (
          <span className="block break-words text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      <RadioGroupItem value={value} id={id} disabled={disabled} />
    </label>
  );
}
