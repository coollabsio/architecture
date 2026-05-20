<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLElement>;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<kbd data-slot="kbd" class={cn("inline-flex h-5 items-center rounded-sm border border-border bg-card px-1.5 font-mono text-xs font-medium leading-4 text-foreground", className)} {...$$restProps}><slot /></kbd>
