import Checkbox from "./checkbox.svelte";
import CheckboxRow from "./checkbox-row.svelte";

export const checkboxClass =
  "grid size-4 shrink-0 cursor-pointer place-items-center rounded-sm border border-border bg-background text-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 data-[checked=true]:bg-primary data-[checked=true]:text-primary-foreground data-[checked=true]:border-primary";

export const checkboxRowClass =
  "flex max-w-full flex-row items-center gap-4 py-1 pr-2 cursor-pointer hover:bg-muted";

export { Checkbox, CheckboxRow };
