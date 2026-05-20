<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLHeadingElement>;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<h2 data-slot="card-title" class={cn("text-base font-bold text-foreground", className)} {...$$restProps}><slot /></h2>
