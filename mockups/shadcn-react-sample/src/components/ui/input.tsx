import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const inputBaseClass =
  "block w-full rounded-sm border-0 bg-white px-3 py-1.5 text-sm text-black placeholder:text-neutral-300 focus-visible:outline-none disabled:bg-neutral-200 disabled:text-neutral-700 read-only:bg-neutral-200 read-only:text-neutral-700 dark:bg-app-base dark:text-white dark:placeholder:text-neutral-700 dark:disabled:bg-coolgray-100/40 dark:read-only:bg-coolgray-100/40 dark:read-only:text-neutral-500";

export const inputShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#e5e5e5] dark:[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#242424] focus-visible:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:focus-visible:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424] data-[dirty=true]:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:data-[dirty=true]:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424] disabled:[box-shadow:none] read-only:[box-shadow:none]";

export const inputStickyShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_1px_#e5e5e5] dark:[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_1px_#242424] focus-visible:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_1px_#e5e5e5] dark:focus-visible:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_1px_#242424] data-[dirty=true]:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_1px_#e5e5e5] dark:data-[dirty=true]:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_1px_#242424] disabled:[box-shadow:none] read-only:[box-shadow:none]";

export const inputGhostClass =
  "!border-0 !bg-transparent !shadow-none ![box-shadow:none] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-coollabs focus-visible:![box-shadow:none] data-[dirty=true]:![box-shadow:none] disabled:!bg-transparent read-only:!bg-transparent dark:!bg-transparent dark:focus-visible:outline-warning dark:disabled:!bg-transparent dark:read-only:!bg-transparent";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  dirty?: boolean;
  sticky?: boolean;
  ghost?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, dirty, sticky, ghost, ...props }, ref) => (
    <input
      ref={ref}
      data-dirty={dirty ? "true" : undefined}
      data-sticky={sticky ? "true" : undefined}
      data-ghost={ghost ? "true" : undefined}
      className={cn(
        inputBaseClass,
        ghost ? inputGhostClass : sticky ? inputStickyShadowClass : inputShadowClass,
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export interface PasswordInputProps extends Omit<InputProps, "type"> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    return (
      <div className="relative">
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn("pr-[2.4rem]", className)}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2 text-neutral-500 outline-none hover:text-black focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 dark:hover:text-white dark:focus-visible:ring-warning dark:focus-visible:ring-offset-app-base"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
              <path d="M16.681 16.673A8.717 8.717 0 0 1 12 18c-3.6 0-6.6-2-9-6 1.272-2.12 2.712-3.678 4.32-4.674m2.86-1.146A9.055 9.055 0 0 1 12 6c3.6 0 6.6 2 9 6-.666 1.11-1.379 2.067-2.138 2.87" />
              <path d="M3 3l18 18" />
            </svg>
          ) : (
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
              <path d="M21 12c-2.4 4-5.4 6-9 6s-6.6-2-9-6c2.4-4 5.4-6 9-6s6.6 2 9 6" />
            </svg>
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
