<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  type $$Props = HTMLButtonAttributes & { checked?: boolean };

  export let checked = false;
  export let disabled = false;
  let className: $$Props["class"] = undefined;
  export { className as class };

  function toggle() {
    if (!disabled) checked = !checked;
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  {disabled}
  data-state={checked ? "checked" : "unchecked"}
  class={cn(
    "inline-flex h-4 w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-neutral-300 p-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-coollabs focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-coollabs dark:bg-coolgray-300 dark:focus-visible:ring-warning dark:focus-visible:ring-offset-app-base dark:data-[state=checked]:bg-warning",
    className
  )}
  onclick={toggle}
  {...$$restProps}
>
  <span class={cn("size-3 rounded-full bg-white transition-transform", checked && "translate-x-[14px] dark:bg-app-base")} aria-hidden="true"></span>
</button>
