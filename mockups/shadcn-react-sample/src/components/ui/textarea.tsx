import { forwardRef, useCallback, type KeyboardEvent, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const textareaBaseClass =
  "block min-h-32 w-full resize-y rounded-sm border-0 bg-white px-3 py-1.5 font-mono text-sm text-black placeholder:text-neutral-300 focus-visible:outline-none disabled:bg-neutral-200 disabled:text-neutral-700 read-only:bg-neutral-200 read-only:text-neutral-700 dark:bg-app-base dark:text-white dark:placeholder:text-neutral-700 dark:disabled:bg-coolgray-100/40 dark:disabled:text-neutral-400 dark:read-only:bg-coolgray-100/40 dark:read-only:text-neutral-500";

export const textareaShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#e5e5e5] dark:[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_#242424] focus-visible:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:focus-visible:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424] data-[dirty=true]:[box-shadow:inset_4px_0_0_#6b16ed,inset_0_0_0_2px_#e5e5e5] dark:data-[dirty=true]:[box-shadow:inset_4px_0_0_#fcd452,inset_0_0_0_2px_#242424] disabled:[box-shadow:none] read-only:[box-shadow:none]";

export const textareaGhostClass =
  "!resize-none !border-0 !bg-transparent !shadow-none ![box-shadow:none] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-coollabs focus-visible:![box-shadow:none] data-[dirty=true]:![box-shadow:none] disabled:!bg-transparent read-only:!bg-transparent dark:!bg-transparent dark:focus-visible:outline-warning dark:disabled:!bg-transparent dark:read-only:!bg-transparent";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  dirty?: boolean;
  ghost?: boolean;
  allowTab?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, dirty, ghost, allowTab, onKeyDown, ...props }, ref) => {
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (allowTab && event.key === "Tab") {
          const textarea = event.currentTarget;
          event.preventDefault();
          textarea.setRangeText("  ", textarea.selectionStart, textarea.selectionEnd, "end");
        }
        onKeyDown?.(event);
      },
      [allowTab, onKeyDown]
    );

    return (
      <textarea
        ref={ref}
        data-dirty={dirty ? "true" : undefined}
        data-ghost={ghost ? "true" : undefined}
        className={cn(textareaBaseClass, ghost ? textareaGhostClass : textareaShadowClass, className)}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
