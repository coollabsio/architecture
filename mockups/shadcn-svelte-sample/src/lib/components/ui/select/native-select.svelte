<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { selectBaseClass, selectShadowClass } from "./index.js";

  type $$Props = HTMLSelectAttributes & {
    dirty?: boolean;
  };

  export let dirty: boolean = false;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div class="relative w-full">
  <select
    data-dirty={dirty ? "true" : undefined}
    class={cn(selectBaseClass, selectShadowClass, className)}
    {...$$restProps}
  >
    <slot />
  </select>

  <svg
    class="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-black dark:text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9L12 5.25 15.75 9" />
  </svg>
</div>
