import Checkbox from "./checkbox.svelte";
import CheckboxRow from "./checkbox-row.svelte";

export const checkboxClass =
  "grid size-4 shrink-0 cursor-pointer place-items-center rounded-sm border border-neutral-200 bg-white text-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-700 data-[checked=true]:bg-coollabs data-[checked=true]:text-white dark:border-neutral-700 dark:data-[checked=true]:bg-warning dark:data-[checked=true]:text-black dark:bg-coolgray-100 dark:disabled:bg-base dark:disabled:text-neutral-400 dark:focus-visible:ring-warning dark:focus-visible:ring-offset-base";

export const checkboxRowClass =
  "flex max-w-full flex-row items-center gap-4 py-1 pr-2 cursor-pointer dark:hover:bg-coolgray-100";

export { Checkbox, CheckboxRow };
