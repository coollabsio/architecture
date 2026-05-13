<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLDivElement>;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div class={cn("rounded-sm border border-neutral-200 bg-white p-4 text-sm text-neutral-600 dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-neutral-400", className)} {...$$restProps}>
  <slot />
</div>
