import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const selectBaseClass =
  "block w-full appearance-none rounded-sm border-0 bg-white px-2 py-1.5 pr-10 text-sm text-black focus-visible:outline-none disabled:bg-neutral-200 disabled:text-neutral-700 dark:bg-app-base dark:text-white dark:disabled:bg-coolgray-100/40 dark:disabled:text-neutral-400";

export const selectShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#e5e5e5] dark:[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#242424] focus-visible:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:focus-visible:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424] data-[dirty=true]:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:data-[dirty=true]:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424] disabled:[box-shadow:none]";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  dirty?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, dirty, children, ...props }, ref) => (
    <div className="relative w-full">
      <select
        ref={ref}
        data-dirty={dirty ? "true" : undefined}
        className={cn(selectBaseClass, selectShadowClass, className)}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-black dark:text-white"
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
