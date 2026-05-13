<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLSpanElement> & { removable?: boolean };
  export let removable = false;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<span class={cn("inline-flex h-5 max-w-full items-center gap-1 rounded-sm border border-neutral-200 bg-white px-1.5 text-xs font-medium leading-4 text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white", className)} {...$$restProps}>
  <slot />
  {#if removable}<button type="button" class="-mr-0.5 grid size-4 place-items-center rounded-sm hover:bg-neutral-100 dark:hover:bg-coolgray-200" aria-label="Remove tag">×</button>{/if}
</span>
