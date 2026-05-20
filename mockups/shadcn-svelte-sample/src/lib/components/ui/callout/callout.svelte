<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  type $$Props = HTMLAttributes<HTMLDivElement> & { title?: string };
  export let title: string | undefined = undefined;
  let className: $$Props["class"] = undefined;
  export { className as class };
</script>
<div data-slot="callout" class={cn("grid grid-cols-[1rem_1fr] gap-2 rounded-sm border border-border bg-card p-3 text-sm text-muted-foreground", className)} {...$$restProps}>
  <div class="mt-0.5 grid size-4 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground" aria-hidden="true">i</div>
  <div class="min-w-0 space-y-1">{#if title}<div class="font-bold text-foreground">{title}</div>{/if}<slot /></div>
</div>
