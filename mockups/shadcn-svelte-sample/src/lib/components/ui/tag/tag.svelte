<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLSpanElement> & { removable?: boolean };
  export let removable = false;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<span data-slot="tag" class={cn("inline-flex h-5 max-w-full items-center gap-1 rounded-sm border border-border bg-card px-1.5 text-xs font-medium leading-4 text-foreground", className)} {...$$restProps}>
  <slot />
  {#if removable}<button type="button" class="-mr-0.5 grid size-4 place-items-center rounded-sm hover:bg-muted" aria-label="Remove tag">×</button>{/if}
</span>
