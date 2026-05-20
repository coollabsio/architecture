import NativeSelect from "./native-select.svelte";

export const selectBaseClass =
  "block w-full appearance-none rounded-sm border-0 bg-background px-2 py-1.5 pr-10 text-sm text-foreground transition-[box-shadow,color] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

export const selectShadowClass =
  "[box-shadow:inset_4px_0_0_transparent,inset_0_0_0_2px_var(--input)] focus-visible:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] data-[dirty=true]:[box-shadow:inset_4px_0_0_var(--ring),inset_0_0_0_2px_var(--input)] disabled:[box-shadow:inset_0_0_0_2px_var(--input)] aria-invalid:[box-shadow:inset_4px_0_0_var(--destructive),inset_0_0_0_2px_var(--destructive)]";

export { NativeSelect };
