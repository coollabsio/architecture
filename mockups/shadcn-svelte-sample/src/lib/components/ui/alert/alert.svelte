<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { alertVariants, type AlertVariants } from "./index.js";

  type $$Props = HTMLAttributes<HTMLDivElement> & AlertVariants & { title?: string; showIcon?: boolean };
  export let variant: $$Props["variant"] = "default";
  export let title: string | undefined = undefined;
  export let showIcon = true;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div data-slot="alert" class={cn(alertVariants({ variant }), !showIcon && "grid-cols-1", className)} {...$$restProps}>
  {#if showIcon}
    <div class="alert-icon mt-0.5 size-4 shrink-0" aria-hidden="true">
      <slot name="icon">!</slot>
    </div>
  {/if}
  <div class="min-w-0 space-y-1">
    {#if title}<div class="font-bold text-foreground">{title}</div>{/if}
    <div class="text-sm"><slot /></div>
  </div>
</div>
