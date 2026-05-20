import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const selectBaseClass =
  "block w-full appearance-none rounded-sm border-0 bg-background px-2 py-1.5 pr-10 text-sm text-foreground outline-none focus-visible:outline-none disabled:bg-muted disabled:text-muted-foreground";

export const selectShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_var(--input)] focus-visible:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] data-[dirty=true]:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] disabled:[box-shadow:none]";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  dirty?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, dirty, children, ...props }, ref) => (
    <div className="relative w-full" data-slot="select">
      <select
        ref={ref}
        data-dirty={dirty ? "true" : undefined}
        className={cn(selectBaseClass, selectShadowClass, className)}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-foreground"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9L12 5.25 15.75 9" />
      </svg>
    </div>
  )
);
Select.displayName = "Select";

export const NativeSelect = Select;
