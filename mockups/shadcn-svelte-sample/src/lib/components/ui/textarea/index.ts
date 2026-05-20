import Textarea from "./textarea.svelte";

export const textareaBaseClass =
  "block min-h-32 w-full resize-y rounded-sm border-0 bg-background px-3 py-1.5 font-mono text-sm text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground transition-[box-shadow,color] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 read-only:cursor-default";

export const textareaShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_var(--input)] focus-visible:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] data-[dirty=true]:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] disabled:[box-shadow:inset_0_0_0_2px_var(--input)] read-only:[box-shadow:inset_0_0_0_2px_var(--input)] aria-invalid:[box-shadow:inset_4px_0_0_var(--destructive),inset_0_0_0_2px_var(--destructive)]";

export const textareaGhostClass =
  "!resize-none !bg-transparent !shadow-none ![box-shadow:none] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-(--ring) focus-visible:![box-shadow:none] data-[dirty=true]:![box-shadow:none] disabled:!bg-transparent read-only:!bg-transparent";

export { Textarea };
