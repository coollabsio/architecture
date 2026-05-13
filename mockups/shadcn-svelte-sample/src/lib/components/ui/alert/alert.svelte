<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { alertVariants, type AlertVariants } from "./index.js";

  type $$Props = HTMLAttributes<HTMLDivElement> & AlertVariants & { title?: string };
  export let variant: $$Props["variant"] = "default";
  export let title: string | undefined = undefined;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div class={cn(alertVariants({ variant }), className)} {...$$restProps}>
  <div class="alert-icon mt-0.5 size-4 shrink-0" aria-hidden="true">
    <slot name="icon">!</slot>
  </div>
  <div class="min-w-0 space-y-1">
    {#if title}<div class="font-bold text-black dark:text-white">{title}</div>{/if}
    <div class="text-sm"><slot /></div>
  </div>
</div>
