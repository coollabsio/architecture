import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * shadcn/ui-style Input primitive layered with the Coolify visual contract:
 * - 4px sharp radius (`rounded-sm` mapped via `--radius` token).
 * - Inset shadow ring using `--input` instead of a real border.
 * - 4px left dirty/focus bar painted via the same inset shadow stack.
 * - `--ring` swaps purple (light) / yellow (dark) automatically via `.dark` CSS vars.
 *
 * The class strings reference shadcn semantic tokens (`bg-background`,
 * `text-foreground`, `placeholder:text-muted-foreground`, etc.) so future
 * shadcn primitives added via `npx shadcn add ...` compose with this one.
 */

export const inputBaseClass =
  "flex h-9 w-full min-w-0 rounded-sm bg-background px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground outline-none transition-[box-shadow,color] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-60 read-only:cursor-default";

const ring2 =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_var(--input)] focus-visible:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] data-[dirty=true]:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] disabled:[box-shadow:inset_0_0_0_2px_var(--input)] read-only:[box-shadow:inset_0_0_0_2px_var(--input)] aria-invalid:[box-shadow:inset_4px_0_0_var(--destructive),inset_0_0_0_2px_var(--destructive)]";

const ring1 =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_1px_var(--input)] focus-visible:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_1px_var(--input)] data-[dirty=true]:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_1px_var(--input)] disabled:[box-shadow:inset_0_0_0_1px_var(--input)] read-only:[box-shadow:inset_0_0_0_1px_var(--input)] aria-invalid:[box-shadow:inset_4px_0_0_var(--destructive),inset_0_0_0_1px_var(--destructive)]";

const ghost =
  "!bg-transparent !shadow-none ![box-shadow:none] focus-visible:[box-shadow:none] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-(--ring) data-[dirty=true]:![box-shadow:none] disabled:!bg-transparent read-only:!bg-transparent";

export const inputShadowClass = ring2;
export const inputStickyShadowClass = ring1;
export const inputGhostClass = ghost;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  dirty?: boolean;
  sticky?: boolean;
  ghost?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, dirty, sticky, ghost: isGhost, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      data-dirty={dirty ? "true" : undefined}
      data-sticky={sticky ? "true" : undefined}
      data-ghost={isGhost ? "true" : undefined}
      className={cn(
        inputBaseClass,
        isGhost ? ghost : sticky ? ring1 : ring2,
        sticky && "rounded-none",
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
          className={cn("pr-9", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          tabIndex={-1}
        >
          {visible ? (
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
              <path d="M16.681 16.673A8.717 8.717 0 0 1 12 18c-3.6 0-6.6-2-9-6 1.272-2.12 2.712-3.678 4.32-4.674m2.86-1.146A9.055 9.055 0 0 1 12 6c3.6 0 6.6 2 9 6-.666 1.11-1.379 2.067-2.138 2.87" />
              <path d="M3 3l18 18" />
            </svg>
          ) : (
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
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
