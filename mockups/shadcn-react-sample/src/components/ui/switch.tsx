import { forwardRef, type ReactNode } from "react";
import * as S from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const switchClass =
  "inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-neutral-300 p-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-coollabs dark:bg-coolgray-300 dark:focus-visible:ring-warning dark:focus-visible:ring-offset-app-base dark:data-[state=checked]:bg-warning";

export const Switch = forwardRef<
  React.ElementRef<typeof S.Root>,
  React.ComponentPropsWithoutRef<typeof S.Root>
>(({ className, ...props }, ref) => (
  <S.Root ref={ref} className={cn(switchClass, className)} {...props}>
    <S.Thumb className="pointer-events-none block size-3 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[14px] data-[state=checked]:dark:bg-app-base" />
  </S.Root>
));
Switch.displayName = "Switch";

export interface SwitchRowProps {
  label: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function SwitchRow({
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
}: SwitchRowProps) {
  return (
    <label
      className={cn(
        "flex max-w-full flex-row items-center gap-4 py-1 pr-2 text-sm",
        disabled ? "opacity-60" : "cursor-pointer dark:hover:bg-coolgray-100",
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
      <Switch
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-label={typeof label === "string" ? label : undefined}
      />
    </label>
  );
}
