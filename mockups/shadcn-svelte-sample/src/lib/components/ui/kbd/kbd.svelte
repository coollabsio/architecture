<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLElement>;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<kbd class={cn("inline-flex h-5 items-center rounded-sm border border-neutral-200 bg-white px-1.5 font-mono text-xs font-medium leading-4 text-black dark:border-coolgray-300 dark:bg-coolgray-100 dark:text-white", className)} {...$$restProps}><slot /></kbd>
