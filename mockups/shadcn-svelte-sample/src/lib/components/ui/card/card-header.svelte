<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLDivElement>;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div data-slot="card-header" class={cn("mb-3 space-y-1 border-b border-border pb-3", className)} {...$$restProps}><slot /></div>
