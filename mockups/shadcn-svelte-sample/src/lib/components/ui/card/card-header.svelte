<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLDivElement>;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div class={cn("mb-3 space-y-1 border-b border-neutral-200 pb-3 dark:border-coolgray-200", className)} {...$$restProps}><slot /></div>
