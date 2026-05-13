<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { checkboxClass } from "./index.js";

  type $$Props = Omit<HTMLInputAttributes, "type"> & {
    checked?: boolean;
  };

  export let checked = false;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<span class="relative inline-grid size-4 shrink-0 place-items-center">
  <input
    type="checkbox"
    bind:checked
    class="peer sr-only"
    {...$$restProps}
  />
  <span class={cn(checkboxClass, className)} data-checked={checked ? "true" : undefined} aria-hidden="true">
    {#if checked}
      <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="m5 12 4 4L19 6" />
      </svg>
    {/if}
  </span>
</span>
