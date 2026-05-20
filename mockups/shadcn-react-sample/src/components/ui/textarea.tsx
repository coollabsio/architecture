import { forwardRef, useCallback, type KeyboardEvent, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const textareaBaseClass =
  "block min-h-32 w-full resize-y rounded-sm border-0 bg-background px-3 py-1.5 font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:outline-none disabled:bg-muted disabled:text-muted-foreground read-only:bg-muted read-only:text-muted-foreground";

export const textareaShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_var(--input)] focus-visible:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] data-[dirty=true]:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] disabled:[box-shadow:none] read-only:[box-shadow:none]";

export const textareaGhostClass =
  "!resize-none !border-0 !bg-transparent !shadow-none ![box-shadow:none] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-(--ring) focus-visible:![box-shadow:none] data-[dirty=true]:![box-shadow:none] disabled:!bg-transparent read-only:!bg-transparent";

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
        data-slot="textarea"
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
