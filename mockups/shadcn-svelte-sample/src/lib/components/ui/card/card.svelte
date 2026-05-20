<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLDivElement>;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div data-slot="card" class={cn("rounded-sm border border-border bg-card p-4 text-sm text-muted-foreground", className)} {...$$restProps}>
  <slot />
</div>
